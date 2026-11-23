import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {createBackgammonMatch, getBackgammonMatches} from 'api/backgammon';
import AuthButtons from 'components/AuthButtons';
import Loader from 'components/Loader';
import UserSearchInput from 'components/UserSearchInput';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertBackgammonMatch} from 'store/backgammon';
import {AppDispatch, UserReadSerializer} from 'types';
import {BackgammonDifficulty, BackgammonMatch, BackgammonMode} from 'types/backgammon';
import {isCancellationError} from 'utils/errors';

import Board from './Board';
import Rules from './Rules';
import * as S from './Styles';
import {getErrorMessage, getPlayerName, INITIAL_BOARD} from './utils';

const MatchOptions = ({prefix}: {prefix: string}) => (
  <S.FieldGrid>
    <S.Field htmlFor={`${prefix}-target`}>
      Match length
      <S.Select defaultValue="3" id={`${prefix}-target`} name="target_score">
        <option value="1">First to 1 point</option>
        <option value="3">First to 3 points</option>
        <option value="5">First to 5 points</option>
      </S.Select>
    </S.Field>
    <S.Field htmlFor={`${prefix}-time`}>
      Time per player, whole match
      <S.Select defaultValue="900" id={`${prefix}-time`} name="time_limit_seconds">
        <option value="300">5 minutes</option>
        <option value="600">10 minutes</option>
        <option value="900">15 minutes</option>
        <option value="1800">30 minutes</option>
      </S.Select>
    </S.Field>
  </S.FieldGrid>
);

const MatchRow = ({match, selfId}: {match: BackgammonMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.black?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.white.id === selfId;
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  return (
    <S.MatchLink to={`/backgammon/matches/${match.id}`}>
      <div>
        <S.PlayerName>
          {getPlayerName(match, 'white')} <span aria-label="versus">vs.</span> {getPlayerName(match, 'black')}
        </S.PlayerName>
        <S.Small>
          {match.status === 'pending'
            ? `First to ${match.target_score}`
            : `${match.scores.white}–${match.scores.black} · First to ${match.target_score}`}{' '}
          · {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ''}
        </S.Small>
      </div>
      <S.Badge>{label} →</S.Badge>
    </S.MatchLink>
  );
};

const Home = () => {
  const [createError, setCreateError] = useState('');
  const [creatingMode, setCreatingMode] = useState<BackgammonMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<BackgammonMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<BackgammonMatch[]>([]);
  const [opponent, setOpponent] = useState<UserReadSerializer | null>(null);
  const [publicMatches, setPublicMatches] = useState<BackgammonMatch[]>([]);
  const [retryKey, setRetryKey] = useState(0);
  const [stake, setStake] = useState('0');
  const creationLock = useRef(false);
  const creationRequest = useRef<{id: string; signature: string} | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let mounted = true;
    const load = async () => {
      try {
        const [publicPage, minePage, historyPage] = await Promise.all([
          getBackgammonMatches({mine: 'exclude', page_size: 10, status: 'active,between_games'}, controller.signal),
          isAuthenticated
            ? getBackgammonMatches(
                {mine: 'true', page_size: 100, status: 'pending,active,between_games'},
                controller.signal,
              )
            : null,
          isAuthenticated
            ? getBackgammonMatches({mine: 'true', page_size: 10, status: 'finished'}, controller.signal)
            : null,
        ]);
        if (!mounted) return;
        setPublicMatches(publicPage.results);
        setMine(minePage?.results ?? []);
        setHistory(historyPage?.results ?? []);
        setError('');
      } catch (loadError) {
        if (mounted && !isCancellationError(loadError)) setError(getErrorMessage(loadError));
      } finally {
        if (mounted) {
          setIsLoading(false);
          timer = setTimeout(load, document.hidden ? 15000 : 5000);
        }
      }
    };
    load();
    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [isAuthenticated, retryKey]);

  const handleCreate = useCallback(
    async (event: FormEvent<HTMLFormElement>, mode: BackgammonMode) => {
      event.preventDefault();
      if (creationLock.current) return;
      setCreateError('');
      if (mode === 'human' && (!opponent || opponent.id === self.id)) {
        setCreateError(opponent ? 'Choose another member to challenge.' : 'Choose a member to challenge.');
        return;
      }
      const form = new FormData(event.currentTarget);
      const amount = mode === 'human' ? Number(stake) : 0;
      if (!Number.isSafeInteger(amount) || amount < 0 || amount > 1000000000) {
        setCreateError('Enter a whole-number stake from 0 to 1,000,000,000 TNB.');
        return;
      }
      creationLock.current = true;
      setCreatingMode(mode);
      try {
        const data = {
          difficulty: (form.get('difficulty') ?? 'normal') as BackgammonDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          target_score: Number(form.get('target_score')),
          time_limit_seconds: Number(form.get('time_limit_seconds')),
        };
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createBackgammonMatch({...data, request_id: creationRequest.current.id});
        creationRequest.current = null;
        dispatch(upsertBackgammonMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/backgammon/matches/${match.id}`);
      } catch (actionError) {
        setCreateError(getErrorMessage(actionError));
      } finally {
        creationLock.current = false;
        setCreatingMode(null);
      }
    },
    [dispatch, navigate, opponent, self.id, stake],
  );

  const activeMatches = mine.filter((match) => match.status !== 'pending');
  const challenges = mine.filter((match) => match.status === 'pending');

  return (
    <S.Container>
      <S.Navigation>
        <S.TextLink to="/games">← All games</S.TextLink>
        <S.Badge>Classic strategy · A fresh rivalry</S.Badge>
      </S.Navigation>
      <S.Hero>
        <div>
          <S.Eyebrow>The backgammon club</S.Eyebrow>
          <S.Title>
            A little luck.
            <br />A lot of strategy.
          </S.Title>
          <S.HeroDescription>
            Race your checkers home. Find the right moment to double. Practice against the computer or put your skills
            to the test with the community.
          </S.HeroDescription>
          <S.Actions>
            <S.Badge>Computer & multiplayer</S.Badge>
            <S.Badge>Optional TNB stakes</S.Badge>
          </S.Actions>
        </div>
        <S.HeroBoard>
          <Board board={INITIAL_BOARD} decorative />
        </S.HeroBoard>
      </S.Hero>
      {!isAuthenticated ? (
        <S.Panel>
          <S.TitleSmall>Your seat at the board is waiting.</S.TitleSmall>
          <S.HeroDescription>
            Sign in to play free computer games, challenge a member, or join a match for TNB. You can watch live games
            below.
          </S.HeroDescription>
          <AuthButtons />
        </S.Panel>
      ) : (
        <>
          {createError && <S.Error role="alert">{createError}</S.Error>}
          <S.PanelGrid>
            <S.Panel>
              <S.Eyebrow>Find your rhythm</S.Eyebrow>
              <S.TitleSmall>Play the computer</S.TitleSmall>
              <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
                <S.Detail>Always free. Learn the board or sharpen your next move.</S.Detail>
                <S.Field htmlFor="computer-difficulty">
                  Difficulty
                  <S.Select defaultValue="normal" id="computer-difficulty" name="difficulty">
                    <option value="easy">Easy · Get comfortable</option>
                    <option value="normal">Normal · Think ahead</option>
                    <option value="hard">Hard · Take the challenge</option>
                  </S.Select>
                </S.Field>
                <MatchOptions prefix="computer" />
                <S.Actions>
                  <S.Button disabled={!!creatingMode} type="submit">
                    {creatingMode === 'computer' ? 'Setting the board…' : 'Play free →'}
                  </S.Button>
                </S.Actions>
              </S.Form>
            </S.Panel>
            <S.Panel>
              <S.Eyebrow>Make it a rivalry</S.Eyebrow>
              <S.TitleSmall>Challenge a player</S.TitleSmall>
              <S.Form onSubmit={(event) => handleCreate(event, 'human')}>
                <UserSearchInput
                  errors={{}}
                  label="Find a member"
                  name="opponent"
                  onChange={setOpponent}
                  placeholder="Search by username"
                  touched={{}}
                  value={opponent}
                />
                <MatchOptions prefix="human" />
                <S.Field htmlFor="human-stake">
                  Stake per player (TNB)
                  <S.Input
                    id="human-stake"
                    inputMode="numeric"
                    max={1000000000}
                    min={0}
                    name="stake_amount"
                    onChange={(event) => setStake(event.target.value)}
                    required
                    step={1}
                    type="number"
                    value={stake}
                  />
                </S.Field>
                <S.Detail>
                  {Number(stake) > 0
                    ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Both stakes form the match prize; the cube never increases it.`
                    : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
                </S.Detail>
                <S.Actions>
                  <S.Button disabled={!!creatingMode} type="submit">
                    {creatingMode === 'human' ? 'Sending…' : 'Send challenge →'}
                  </S.Button>
                </S.Actions>
              </S.Form>
            </S.Panel>
          </S.PanelGrid>
        </>
      )}
      {error && (
        <S.Error role="alert">
          {error}{' '}
          <S.Button $secondary onClick={() => setRetryKey((key) => key + 1)} type="button">
            Retry
          </S.Button>
        </S.Error>
      )}
      {isLoading && (
        <S.Status role="status">
          <Loader />
          <S.Detail>Finding your next match…</S.Detail>
        </S.Status>
      )}
      {challenges.length > 0 && (
        <S.Section>
          <S.TitleSmall>Challenges</S.TitleSmall>
          <S.List>
            {challenges.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      {activeMatches.length > 0 && (
        <S.Section>
          <S.TitleSmall>Your boards</S.TitleSmall>
          <S.List>
            {activeMatches.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      <S.Section>
        <S.TitleSmall>Watch live</S.TitleSmall>
        {publicMatches.length ? (
          <S.List>
            {publicMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </S.List>
        ) : (
          !isLoading && <S.Empty>No other matches are underway. Start a game and make the first move.</S.Empty>
        )}
      </S.Section>
      {history.length > 0 && (
        <S.Section>
          <S.TitleSmall>Your recent matches</S.TitleSmall>
          <S.List>
            {history.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      <Rules />
    </S.Container>
  );
};

export default Home;
