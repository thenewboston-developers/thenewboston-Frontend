import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {createCheckersMatch, getCheckersMatches} from 'api/checkers';
import checkersHero from 'assets/checkers-hero.webp';
import AuthButtons from 'components/AuthButtons';
import GameIllustrationHero from 'components/GameIllustrationHero';
import Loader from 'components/Loader';
import UserSearchInput from 'components/UserSearchInput';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertCheckersMatch} from 'store/checkers';
import {AppDispatch, UserReadSerializer} from 'types';
import {CheckersDifficulty, CheckersMatch, CheckersMode} from 'types/checkers';
import {isCancellationError} from 'utils/errors';

import Rules from './Rules';
import * as S from './Styles';
import {getErrorMessage, getPlayerName} from './utils';

const MatchOptions = ({prefix}: {prefix: string}) => (
  <div>
    <S.Field htmlFor={`${prefix}-time`}>
      Time per player, whole match
      <S.Select defaultValue="900" id={`${prefix}-time`} name="time_limit_seconds">
        <option value="300">5 minutes</option>
        <option value="600">10 minutes</option>
        <option value="900">15 minutes</option>
        <option value="1800">30 minutes</option>
      </S.Select>
    </S.Field>
  </div>
);

const MatchRow = ({match, selfId}: {match: CheckersMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.black?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.white.id === selfId;
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  return (
    <S.MatchLink to={`/checkers/matches/${match.id}`}>
      <div>
        <strong>
          {getPlayerName(match, 'white')} <span aria-label="versus">vs.</span> {getPlayerName(match, 'black')}
        </strong>
        <S.Small>
          {match.status} · {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ''}
        </S.Small>
      </div>
      <S.Badge>{label} →</S.Badge>
    </S.MatchLink>
  );
};

const Home = () => {
  const [createError, setCreateError] = useState('');
  const [creatingMode, setCreatingMode] = useState<CheckersMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<CheckersMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<CheckersMatch[]>([]);
  const [opponent, setOpponent] = useState<UserReadSerializer | null>(null);
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
    if (!isAuthenticated) {
      setMine([]);
      setHistory([]);
      setIsLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let mounted = true;
    const loadUnfinishedMatches = async () => {
      const matches = new Map<number, CheckersMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getCheckersMatches(
          {mine: '1', page, page_size: 50, status: 'pending,active'},
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
        const [unfinishedMatches, historyPage] = await Promise.all([
          isAuthenticated ? loadUnfinishedMatches() : [],
          isAuthenticated
            ? getCheckersMatches(
                {mine: '1', page_size: 10, status: 'finished,cancelled,declined,expired'},
                controller.signal,
              )
            : null,
        ]);
        if (!mounted) return;
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
    async (event: FormEvent<HTMLFormElement>, mode: CheckersMode) => {
      event.preventDefault();
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
          difficulty: (form.get('difficulty') ?? 'normal') as CheckersDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds')),
        };
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createCheckersMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertCheckersMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/checkers/matches/${match.id}`);
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
        <S.Badge>Classic strategy · Think a move ahead</S.Badge>
      </S.Navigation>
      <GameIllustrationHero
        artwork={checkersHero}
        artworkAlt="A complete walnut checkers board with polished black and ivory pieces and a stacked king"
        challengeHref="#checkers-challenge"
        description="Plan your jumps, find your opening, and crown your next king. A classic board with endless ways to outplay."
        eyebrow="CLASSIC BOARD STRATEGY"
        game="Checkers"
        playHref="#checkers-computer"
        tagline="Small moves. Big possibilities."
        theme="amber"
      />
      <>
        {createError && <S.Error role="alert">{createError}</S.Error>}
        <S.PanelGrid>
          <S.Panel id="checkers-computer" tabIndex={-1}>
            <S.Eyebrow>Practice your tactics</S.Eyebrow>
            <S.TitleSmall>Play the computer</S.TitleSmall>
            <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
              <S.Detail>
                Always free. No account needed. Signed-in players can earn TNB for eligible wins while the community
                fund has coins.
              </S.Detail>
              <S.Field htmlFor="computer-difficulty">
                Difficulty
                <S.Select defaultValue="normal" id="computer-difficulty" name="difficulty">
                  <option value="easy">Easy · Learn the board</option>
                  <option value="normal">Normal · Plan your captures</option>
                  <option value="hard">Hard · Think further ahead</option>
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
          <S.Panel id="checkers-challenge" tabIndex={-1}>
            <S.Eyebrow>Make it a rivalry</S.Eyebrow>
            <S.TitleSmall>Challenge a player</S.TitleSmall>
            {!isAuthenticated ? (
              <>
                <S.Detail>Create an account to challenge friends and earn TNB from eligible computer wins.</S.Detail>
                <AuthButtons />
              </>
            ) : (
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
                    ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Your opponent matches it when accepting. The winner receives both stakes. Draws and unaccepted challenges are refunded.`
                    : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
                </S.Detail>
                <S.Actions>
                  <S.Button disabled={!!creatingMode} type="submit">
                    {creatingMode === 'human' ? 'Sending…' : 'Send challenge →'}
                  </S.Button>
                </S.Actions>
              </S.Form>
            )}
          </S.Panel>
        </S.PanelGrid>
      </>
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
          <S.TitleSmall>Your active matches</S.TitleSmall>
          <S.List>
            {activeMatches.map((match) => (
              <MatchRow key={match.id} match={match} selfId={self.id} />
            ))}
          </S.List>
        </S.Section>
      )}
      {isAuthenticated && !isLoading && !mine.length && !error && (
        <S.Section>
          <S.Empty>No active matches. Launch a practice game or challenge a member to get started.</S.Empty>
        </S.Section>
      )}
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
