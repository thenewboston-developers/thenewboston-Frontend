import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import {createBackgammonMatch, getBackgammonMatches} from 'api/backgammon';
import AuthButtons from 'components/AuthButtons';
import UserSearchInput from 'components/UserSearchInput';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertBackgammonMatch} from 'store/backgammon';
import {AppDispatch, UserReadSerializer} from 'types';
import {BackgammonDifficulty, BackgammonMatch, BackgammonMode, BackgammonSide} from 'types/backgammon';
import {isCancellationError} from 'utils/errors';

import {DicePair, Die, PointStack, RollingDice} from '../Emblems';
import Hero from '../Hero';
import Leaderboard from '../Leaderboard';
import {getErrorMessage, getPlayerName, getPlayerSide, INITIAL_BOARD} from '../utils';

import * as S from './Styles';

const DIFFICULTIES: {description: string; die: number; label: string; value: BackgammonDifficulty}[] = [
  {description: 'Get comfortable', die: 1, label: 'Easy', value: 'easy'},
  {description: 'Think ahead', die: 3, label: 'Normal', value: 'normal'},
  {description: 'Take the challenge', die: 6, label: 'Hard', value: 'hard'},
];

const MATCH_LENGTHS = [
  {description: 'One game decides it', value: 1},
  {description: 'A classic short match', value: 3},
  {description: 'Room for a comeback', value: 5},
];

const TIME_LIMITS = [
  {minutes: 5, value: 300},
  {minutes: 10, value: 600},
  {minutes: 15, value: 900},
  {minutes: 30, value: 1800},
];

// While a double is on offer, the other player has to answer it
const getActingSide = (match: BackgammonMatch): BackgammonSide => {
  if (!match.double_offered_by) return match.active_side;
  return match.double_offered_by === 'white' ? 'black' : 'white';
};

const DifficultyOptions = () => (
  <S.Fieldset>
    <S.Legend>Difficulty</S.Legend>
    <S.ChoiceGrid>
      {DIFFICULTIES.map(({description, die, label, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 'normal'}
            id={`computer-difficulty-${value}`}
            name="difficulty"
            type="radio"
            value={value}
          />
          <S.ChoiceCard>
            <Die value={die} />
            <S.ChoiceText>
              <strong>{label}</strong> <small>{description}</small>
            </S.ChoiceText>
          </S.ChoiceCard>
        </S.Choice>
      ))}
    </S.ChoiceGrid>
  </S.Fieldset>
);

const MatchLengthOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Match length</S.Legend>
    <S.ChoiceGrid>
      {MATCH_LENGTHS.map(({description, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 3}
            id={`${prefix}-target-${value}`}
            name="target_score"
            type="radio"
            value={value}
          />
          <S.ChoiceCard>
            <PointStack count={value} />
            <S.ChoiceText>
              <strong>First to {value}</strong> <small>{description}</small>
            </S.ChoiceText>
          </S.ChoiceCard>
        </S.Choice>
      ))}
    </S.ChoiceGrid>
  </S.Fieldset>
);

const MatchRow = ({match, selfId}: {match: BackgammonMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.black?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.white.id === selfId;
  const side = getPlayerSide(match, selfId);
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  let turn = '';
  if (match.status === 'active' && side) turn = getActingSide(match) === side ? 'Your turn' : 'Their turn';
  return (
    <S.MatchLink to={`/backgammon/matches/${match.id}`}>
      <S.Thumbnail board={match.board ?? INITIAL_BOARD} dice={match.status === 'active' ? match.dice : []} />
      <S.MatchInfo>
        <S.PlayerName>
          <S.Side>
            <S.SideChecker $side="white" aria-hidden="true" />
            {getPlayerName(match, 'white')}
          </S.Side>{' '}
          <S.Versus aria-label="versus">vs.</S.Versus>{' '}
          <S.Side>
            <S.SideChecker $side="black" aria-hidden="true" />
            {getPlayerName(match, 'black')}
          </S.Side>
        </S.PlayerName>
        <S.Small>
          {match.status === 'pending'
            ? `First to ${match.target_score}`
            : `${match.scores.white}–${match.scores.black} · First to ${match.target_score}`}{' '}
          · {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ''}
        </S.Small>
      </S.MatchInfo>
      <S.MatchStatus>
        {turn && <S.Turn $yours={turn === 'Your turn'}>{turn}</S.Turn>}
        <S.MatchAction $highlight={isIncoming}>{label} →</S.MatchAction>
      </S.MatchStatus>
    </S.MatchLink>
  );
};

const TimeOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Time per player, whole match</S.Legend>
    <S.Clocks>
      {TIME_LIMITS.map(({minutes, value}) => (
        <S.ClockChoice key={value}>
          <input
            defaultChecked={value === 900}
            id={`${prefix}-time-${value}`}
            name="time_limit_seconds"
            type="radio"
            value={value}
          />
          <S.ClockChecker>
            <b>{minutes}</b> <small>min</small>
          </S.ClockChecker>
        </S.ClockChoice>
      ))}
    </S.Clocks>
  </S.Fieldset>
);

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
  const activeViewer = useRef<{authenticated: boolean; userId?: number | null}>({authenticated: false});
  const creationLock = useRef(false);
  const creationRequest = useRef<{id: string; signature: string} | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  activeViewer.current = {authenticated: isAuthenticated, userId: self.id};

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    creationLock.current = false;
    creationRequest.current = null;
    setCreatingMode(null);
    setCreateError('');
    setMine([]);
    setHistory([]);
    setOpponent(null);
  }, [isAuthenticated, self.id]);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let mounted = true;
    const loadUnfinishedMatches = async () => {
      const matches = new Map<number, BackgammonMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getBackgammonMatches(
          {mine: 'true', page, page_size: 50, status: 'pending,active,between_games'},
          controller.signal,
        );
        response.results.forEach((match) => matches.set(match.id, match));
        if (!response.next) break;
        page += 1;
      }
      return Array.from(matches.values());
    };
    const load = async () => {
      try {
        const [publicPage, unfinishedMatches, historyPage] = await Promise.all([
          getBackgammonMatches({mine: 'exclude', page_size: 10, status: 'active,between_games'}, controller.signal),
          isAuthenticated ? loadUnfinishedMatches() : [],
          isAuthenticated
            ? getBackgammonMatches({mine: 'true', page_size: 10, status: 'finished'}, controller.signal)
            : null,
        ]);
        if (!mounted) return;
        setPublicMatches(publicPage.results);
        setMine(unfinishedMatches);
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
  }, [isAuthenticated, retryKey, self.id]);

  const handleCreate = useCallback(
    async (event: FormEvent<HTMLFormElement> | null, mode: BackgammonMode) => {
      event?.preventDefault();
      if ((!isAuthenticated && mode !== 'computer') || creationLock.current) return;
      const isCurrent = () =>
        live.current &&
        activeViewer.current.authenticated === isAuthenticated &&
        activeViewer.current.userId === self.id;
      setCreateError('');
      if (mode === 'human' && (!opponent || opponent.id === self.id)) {
        setCreateError(opponent ? 'Choose another member to challenge.' : 'Choose a member to challenge.');
        return;
      }
      const form = event ? new FormData(event.currentTarget) : new FormData();
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
          target_score: Number(form.get('target_score') ?? 3),
          time_limit_seconds: Number(form.get('time_limit_seconds') ?? 900),
        };
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createBackgammonMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertBackgammonMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/backgammon/matches/${match.id}`);
      } catch (actionError) {
        if (isCurrent()) setCreateError(getErrorMessage(actionError));
      } finally {
        if (isCurrent()) {
          creationLock.current = false;
          setCreatingMode(null);
        }
      }
    },
    [dispatch, isAuthenticated, navigate, opponent, self.id, stake],
  );

  const activeMatches = mine.filter((match) => match.status !== 'pending');
  const challenges = mine.filter((match) => match.status === 'pending');

  return (
    <S.Container>
      <S.Navigation>
        <S.TextLink to="/games">← All games</S.TextLink>
        <S.Badge>
          <Die value={5} />
          Classic strategy · A fresh rivalry
        </S.Badge>
      </S.Navigation>
      <Hero isCreating={!!creatingMode} onPlay={() => handleCreate(null, 'computer')} />
      {createError && <S.Error role="alert">{createError}</S.Error>}
      <S.PanelGrid>
        <S.Panel aria-labelledby="computer-title" id="backgammon-computer" tabIndex={-1}>
          <S.PanelHeader>
            <div>
              <S.Eyebrow>Find your rhythm</S.Eyebrow>
              <S.PanelTitle id="computer-title">Play the computer</S.PanelTitle>
            </div>
            <DicePair values={[6, 5]} />
          </S.PanelHeader>
          <S.Detail>Always free. No account needed. Learn the board or sharpen your next move.</S.Detail>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <DifficultyOptions />
            <MatchLengthOptions prefix="computer" />
            <TimeOptions prefix="computer" />
            <S.PlayButton disabled={!!creatingMode} type="submit">
              <Icon aria-hidden path={mdiPlay} size={0.8} />
              {creatingMode === 'computer' ? 'Setting the board…' : 'Play free'}
            </S.PlayButton>
          </S.Form>
        </S.Panel>
        <S.Panel aria-labelledby="challenge-title" id="backgammon-challenge" tabIndex={-1}>
          <S.PanelHeader>
            <div>
              <S.Eyebrow>Make it a rivalry</S.Eyebrow>
              <S.PanelTitle id="challenge-title">Challenge a player</S.PanelTitle>
            </div>
            <S.PanelCube value={2} />
          </S.PanelHeader>
          {!isAuthenticated ? (
            <>
              <S.Detail>Create an account to challenge friends and earn TNB from eligible computer wins.</S.Detail>
              <S.GuestActions>
                <AuthButtons />
              </S.GuestActions>
              <S.GuestScene />
            </>
          ) : (
            <S.Form onSubmit={(event) => handleCreate(event, 'human')}>
              <S.MemberSearch>
                <UserSearchInput
                  errors={{}}
                  label="Find a member"
                  name="opponent"
                  onChange={setOpponent}
                  placeholder="Search by username"
                  touched={{}}
                  value={opponent}
                />
              </S.MemberSearch>
              <MatchLengthOptions prefix="human" />
              <TimeOptions prefix="human" />
              <S.StakeField htmlFor="human-stake">
                <S.Legend as="span">Stake per player</S.Legend>
                <S.StakeControl>
                  <input
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
                  <span>TNB</span>
                </S.StakeControl>
              </S.StakeField>
              <S.Detail>
                {Number(stake) > 0
                  ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Both stakes form the match prize; the cube never increases it.`
                  : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
              </S.Detail>
              <S.PlayButton disabled={!!creatingMode} type="submit">
                {creatingMode === 'human' ? 'Sending…' : 'Send challenge →'}
              </S.PlayButton>
            </S.Form>
          )}
        </S.Panel>
      </S.PanelGrid>
      {error && (
        <S.Error role="alert">
          {error}{' '}
          <S.RetryButton onClick={() => setRetryKey((key) => key + 1)} type="button">
            Retry
          </S.RetryButton>
        </S.Error>
      )}
      {isLoading && (
        <S.Status role="status">
          <RollingDice />
          <span>Finding your next match…</span>
        </S.Status>
      )}
      {challenges.length > 0 && (
        <S.Section>
          <S.SectionHeader>
            <div>
              <S.Eyebrow>Waiting on an answer</S.Eyebrow>
              <S.TitleSmall>Challenges</S.TitleSmall>
            </div>
            <S.Count>
              {challenges.length} {challenges.length === 1 ? 'invitation' : 'invitations'}
            </S.Count>
          </S.SectionHeader>
          <S.List>
            {challenges.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      {activeMatches.length > 0 && (
        <S.Section>
          <S.SectionHeader>
            <div>
              <S.Eyebrow>Your move or theirs</S.Eyebrow>
              <S.TitleSmall>Your boards</S.TitleSmall>
            </div>
            <S.Count>{activeMatches.length} in play</S.Count>
          </S.SectionHeader>
          <S.List>
            {activeMatches.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      <S.Section>
        <S.SectionHeader>
          <div>
            <S.Eyebrow>At the tables</S.Eyebrow>
            <S.TitleSmall>Watch live</S.TitleSmall>
          </div>
          <S.Count $live={!!publicMatches.length}>
            {publicMatches.length ? `${publicMatches.length} live` : 'The next roll awaits'}
          </S.Count>
        </S.SectionHeader>
        {publicMatches.length ? (
          <S.List>
            {publicMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </S.List>
        ) : (
          !isLoading && (
            <S.Empty>
              <DicePair values={[3, 1]} />
              <div>
                <strong>The tables are open.</strong>
                <S.Detail>No other matches are underway. Start a game and make the first move.</S.Detail>
              </div>
            </S.Empty>
          )
        )}
      </S.Section>
      {history.length > 0 && (
        <S.Section>
          <S.SectionHeader>
            <div>
              <S.Eyebrow>From the scorebook</S.Eyebrow>
              <S.TitleSmall>Your recent matches</S.TitleSmall>
            </div>
          </S.SectionHeader>
          <S.List>
            {history.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      <Leaderboard />
      <S.LobbyRules />
    </S.Container>
  );
};

export default Home;
