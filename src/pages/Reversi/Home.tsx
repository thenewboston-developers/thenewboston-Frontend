import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {createReversiMatch, getReversiMatches} from 'api/reversi';
import AuthButtons from 'components/AuthButtons';
import GameEarningsLeaderboard from 'components/GameEarningsLeaderboard';
import Loader from 'components/Loader';
import UserSearchInput from 'components/UserSearchInput';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertReversiMatch} from 'store/reversi';
import {AppDispatch, UserReadSerializer} from 'types';
import {ReversiColorChoice, ReversiDifficulty, ReversiMatch, ReversiMode} from 'types/reversi';
import {isCancellationError} from 'utils/errors';

import Hero from './Hero';
import Rules from './Rules';
import * as S from './Styles';
import {getErrorMessage, getPlayerName} from './utils';

const MatchOptions = ({prefix}: {prefix: string}) => (
  <S.FieldGrid>
    <S.Field htmlFor={`${prefix}-color`}>
      Your disks
      <S.Select defaultValue="random" id={`${prefix}-color`} name="color">
        <option value="random">Random</option>
        <option value="black">Black · moves first</option>
        <option value="white">White · moves second</option>
      </S.Select>
    </S.Field>
    <S.Field htmlFor={`${prefix}-time`}>
      Time per player
      <S.Select defaultValue="900" id={`${prefix}-time`} name="time_limit_seconds">
        <option value="300">5 minutes</option>
        <option value="600">10 minutes</option>
        <option value="900">15 minutes</option>
        <option value="1800">30 minutes</option>
      </S.Select>
    </S.Field>
  </S.FieldGrid>
);

const MatchRow = ({match, selfId}: {match: ReversiMatch; selfId?: number | null}) => {
  const hostId = match[match.host_side]?.id;
  const isPending = match.status === 'pending';
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isPending) label = hostId === selfId ? 'Awaiting reply' : 'Review challenge';
  let result = '';
  if (match.status === 'finished') result = match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ' · Draw';
  return (
    <S.MatchLink to={`/reversi/matches/${match.id}`}>
      <div>
        <S.PlayerName>
          {getPlayerName(match, 'black')} <span aria-label="versus">vs.</span> {getPlayerName(match, 'white')}
        </S.PlayerName>
        <S.Small>
          {isPending ? 'Challenge' : `${match.scores.black}–${match.scores.white}`} ·{' '}
          {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {result}
        </S.Small>
      </div>
      <S.Badge>{label} →</S.Badge>
    </S.MatchLink>
  );
};

const Home = () => {
  const [createError, setCreateError] = useState('');
  const [creatingMode, setCreatingMode] = useState<ReversiMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<ReversiMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<ReversiMatch[]>([]);
  const [opponent, setOpponent] = useState<UserReadSerializer | null>(null);
  const [publicMatches, setPublicMatches] = useState<ReversiMatch[]>([]);
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

  // Signing in or out changes whose matches these are: drop the previous viewer's lists and pending request.
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
      const matches = new Map<number, ReversiMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getReversiMatches(
          {mine: 'true', page, page_size: 50, status: 'pending,active'},
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
          getReversiMatches({mine: 'exclude', page_size: 10, status: 'active'}, controller.signal),
          isAuthenticated ? loadUnfinishedMatches() : [],
          isAuthenticated
            ? getReversiMatches({mine: 'true', page_size: 10, status: 'finished'}, controller.signal)
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
    async (event: FormEvent<HTMLFormElement> | null, mode: ReversiMode) => {
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
          color: (form.get('color') ?? 'random') as ReversiColorChoice,
          difficulty: (form.get('difficulty') ?? 'normal') as ReversiDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds') ?? 900),
        };
        // A retry after a lost response reuses the request ID, so the stake can only be locked once.
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createReversiMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertReversiMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/reversi/matches/${match.id}`);
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
        <S.Badge>Classic strategy · Black and white</S.Badge>
      </S.Navigation>
      <Hero isCreating={!!creatingMode} onPlay={() => handleCreate(null, 'computer')} />
      {createError && <S.Error role="alert">{createError}</S.Error>}
      <S.PanelGrid>
        <S.Panel id="reversi-computer" tabIndex={-1}>
          <S.Eyebrow>Find your rhythm</S.Eyebrow>
          <S.TitleSmall>Play the computer</S.TitleSmall>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <S.Detail>Always free. No account needed. Learn the board or sharpen your endgame.</S.Detail>
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
        <S.Panel id="reversi-challenge" tabIndex={-1}>
          <S.Eyebrow>Make it a rivalry</S.Eyebrow>
          <S.TitleSmall>Challenge a player</S.TitleSmall>
          {!isAuthenticated ? (
            <>
              <S.Detail>Create an account to challenge friends and earn TNB from eligible computer wins.</S.Detail>
              <S.GuestActions>
                <AuthButtons />
              </S.GuestActions>
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
                  ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Both stakes form the prize, and a draw returns them.`
                  : 'Set the stake to 0 for a free match. Your opponent sees the colors and terms before accepting.'}
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
      <GameEarningsLeaderboard game="reversi" />
      <Rules />
    </S.Container>
  );
};

export default Home;
