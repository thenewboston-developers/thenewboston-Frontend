import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlay} from '@mdi/js';
import Icon from '@mdi/react';

import {createMancalaMatch, getMancalaMatches} from 'api/mancala';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertMancalaMatch} from 'store/mancala';
import {AppDispatch, UserReadSerializer} from 'types';
import {MancalaDifficulty, MancalaMatch, MancalaMode} from 'types/mancala';
import {isCancellationError} from 'utils/errors';

import {
  ComputerEmblem,
  EmptyBoard,
  PitStones,
  RivalryEmblem,
  SetBoard,
  SowingDemo,
  SowingLoader,
  StoreScore,
} from '../Emblems';
import Hero from '../Hero';
import Leaderboard from '../Leaderboard';
import Rules from '../Rules';
import {getErrorMessage, getPlayerName, STORE} from '../utils';

import * as S from './Styles';

// The harder the computer plays, the fuller its pit
const DIFFICULTIES: {description: string; label: string; stones: number; value: MancalaDifficulty}[] = [
  {description: 'Get comfortable', label: 'Easy', stones: 2, value: 'easy'},
  {description: 'Think ahead', label: 'Normal', stones: 4, value: 'normal'},
  {description: 'Take the challenge', label: 'Hard', stones: 7, value: 'hard'},
];

const TIME_LIMITS = [
  {label: '5 min', value: 300},
  {label: '10 min', value: 600},
  {label: '15 min', value: 900},
  {label: '30 min', value: 1800},
];

const getMatchTone = (match: MancalaMatch, selfId?: number | null): S.MatchTone => {
  if (match.status === 'pending') return match.guest?.id === selfId ? 'incoming' : 'waiting';
  if (match.status === 'active') return match.your_side && match.active_side === match.your_side ? 'turn' : 'watch';
  return 'closed';
};

const getTurnLabel = (match: MancalaMatch): string | null => {
  if (match.status !== 'active' || !match.active_side) return null;
  if (match.your_side) return match.active_side === match.your_side ? 'Your move' : 'Their move';
  return `${getPlayerName(match, match.active_side)} to move`;
};

const DifficultyOptions = () => (
  <S.Fieldset>
    <S.Legend>Difficulty</S.Legend>
    <S.ChoiceGrid>
      {DIFFICULTIES.map(({description, label, stones, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 'normal'}
            id={`computer-difficulty-${value}`}
            name="difficulty"
            type="radio"
            value={value}
          />
          <S.ChoiceCard>
            <PitStones count={stones} size={46} />
            <strong>{label}</strong>
            <small>{description}</small>
          </S.ChoiceCard>
        </S.Choice>
      ))}
    </S.ChoiceGrid>
  </S.Fieldset>
);

const MatchRow = ({match, selfId}: {match: MancalaMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.guest?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.host.id === selfId;
  const tone = getMatchTone(match, selfId);
  const turn = getTurnLabel(match);
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  let outcome = '';
  if (match.status === 'finished') outcome = match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ' · Draw';
  return (
    <S.MatchLink to={`/mancala/matches/${match.id}`}>
      {match.status === 'pending' ? (
        <SetBoard />
      ) : (
        <StoreScore guest={match.board[STORE.guest]} host={match.board[STORE.host]} />
      )}
      <S.MatchInfo>
        <S.Players>
          <span>
            {getPlayerName(match, 'host')} <S.Versus aria-label="versus">vs.</S.Versus> {getPlayerName(match, 'guest')}
          </span>
          {turn && <S.Turn $yours={tone === 'turn'}>{turn}</S.Turn>}
        </S.Players>
        <S.MatchMeta>
          {match.status === 'pending' ? (
            `${Math.round(match.time_limit_seconds / 60)} min per player · `
          ) : (
            <S.VisuallyHidden>{`${match.board[STORE.host]}–${match.board[STORE.guest]} · `}</S.VisuallyHidden>
          )}
          {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {outcome}
        </S.MatchMeta>
      </S.MatchInfo>
      <S.MatchAction $tone={tone}>{label} →</S.MatchAction>
    </S.MatchLink>
  );
};

const MatchList = ({
  count = false,
  id,
  matches,
  selfId,
  title,
}: {
  count?: boolean;
  id: string;
  matches: MancalaMatch[];
  selfId?: number | null;
  title: string;
}) => (
  <S.Tray aria-labelledby={id}>
    <S.TrayHeader>
      <S.TrayTitle id={id}>{title}</S.TrayTitle>
      {count && <S.Count>{matches.length}</S.Count>}
    </S.TrayHeader>
    <S.MatchRows>
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} selfId={selfId} />
      ))}
    </S.MatchRows>
  </S.Tray>
);

const TimeOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Time per player, whole match</S.Legend>
    <S.Trough>
      {TIME_LIMITS.map(({label, value}) => (
        <S.TroughOption key={value}>
          <input
            defaultChecked={value === 600}
            id={`${prefix}-time-${value}`}
            name="time_limit_seconds"
            type="radio"
            value={value}
          />
          <span>{label}</span>
        </S.TroughOption>
      ))}
    </S.Trough>
  </S.Fieldset>
);

const Home = () => {
  const [createError, setCreateError] = useState('');
  const [creatingMode, setCreatingMode] = useState<MancalaMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<MancalaMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<MancalaMatch[]>([]);
  const [opponent, setOpponent] = useState<UserReadSerializer | null>(null);
  const [publicMatches, setPublicMatches] = useState<MancalaMatch[]>([]);
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
    // Signing in or out must not leave one viewer's matches or half-sent challenge with the next
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
      const matches = new Map<number, MancalaMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getMancalaMatches(
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
          getMancalaMatches({mine: 'exclude', page_size: 10, status: 'active'}, controller.signal),
          isAuthenticated ? loadUnfinishedMatches() : [],
          isAuthenticated
            ? getMancalaMatches({mine: 'true', page_size: 10, status: 'finished'}, controller.signal)
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
    async (event: FormEvent<HTMLFormElement> | null, mode: MancalaMode) => {
      event?.preventDefault();
      // A signed-out visitor can play the computer as a guest; challenging a member needs an account
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
          difficulty: (form.get('difficulty') ?? 'normal') as MancalaDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds') ?? 600),
        };
        // A retry after a lost response must reach the server as the same request, or the stake could lock twice
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createMancalaMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertMancalaMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/mancala/matches/${match.id}`);
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
        <S.Badge>Sow · Capture · Count</S.Badge>
      </S.Navigation>
      <Hero isCreating={!!creatingMode} onPlay={() => handleCreate(null, 'computer')} />
      {createError && <S.Alert role="alert">{createError}</S.Alert>}
      <S.PanelGrid>
        <S.Panel aria-labelledby="mancala-computer-title" id="mancala-computer" tabIndex={-1}>
          <S.PanelHeader>
            <ComputerEmblem />
            <div>
              <S.Eyebrow>Find your rhythm</S.Eyebrow>
              <S.PanelTitle id="mancala-computer-title">Play the computer</S.PanelTitle>
            </div>
          </S.PanelHeader>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <S.Detail>
              Always free. No account needed. Signed-in players can earn TNB for a win while the community game fund has
              coins.
            </S.Detail>
            <DifficultyOptions />
            <TimeOptions prefix="computer" />
            <S.Actions>
              <S.PlayButton disabled={!!creatingMode} type="submit">
                <Icon aria-hidden path={mdiPlay} size={0.85} />
                {creatingMode === 'computer' ? 'Setting the board…' : 'Play free'}
              </S.PlayButton>
            </S.Actions>
          </S.Form>
        </S.Panel>
        <S.Panel aria-labelledby="mancala-challenge-title" id="mancala-challenge" tabIndex={-1}>
          <S.PanelHeader>
            <RivalryEmblem />
            <div>
              <S.Eyebrow>Make it a rivalry</S.Eyebrow>
              <S.PanelTitle id="mancala-challenge-title">Challenge a player</S.PanelTitle>
            </div>
          </S.PanelHeader>
          {!isAuthenticated ? (
            <S.GuestBody>
              <S.Detail>Create an account to challenge friends and earn TNB from computer wins.</S.Detail>
              <S.AuthButtons />
              <SowingDemo />
            </S.GuestBody>
          ) : (
            <S.Form onSubmit={(event) => handleCreate(event, 'human')}>
              <S.MemberSearch
                errors={{}}
                label="Find a member"
                name="opponent"
                onChange={setOpponent}
                placeholder="Search by username"
                touched={{}}
                value={opponent}
              />
              <TimeOptions prefix="human" />
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
                  ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. The winner takes both stakes; a draw returns them.`
                  : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
              </S.Detail>
              <S.Actions>
                <S.PlayButton disabled={!!creatingMode} type="submit">
                  {creatingMode === 'human' ? 'Sending…' : 'Send challenge →'}
                </S.PlayButton>
              </S.Actions>
            </S.Form>
          )}
        </S.Panel>
      </S.PanelGrid>
      {error && (
        <S.Alert role="alert">
          {error}
          <S.Retry onClick={() => setRetryKey((key) => key + 1)} type="button">
            Retry
          </S.Retry>
        </S.Alert>
      )}
      {isLoading && (
        <S.Status role="status">
          <SowingLoader />
          Finding your next match…
        </S.Status>
      )}
      {challenges.length > 0 && (
        <MatchList count id="mancala-challenges-title" matches={challenges} selfId={self.id} title="Challenges" />
      )}
      {activeMatches.length > 0 && (
        <MatchList count id="mancala-boards-title" matches={activeMatches} selfId={self.id} title="Your boards" />
      )}
      {(!isLoading || publicMatches.length > 0) && (
        <S.Tray aria-labelledby="mancala-live-title">
          <S.TrayHeader>
            {publicMatches.length > 0 && <S.LiveDot aria-hidden="true" />}
            <S.TrayTitle id="mancala-live-title">Watch live</S.TrayTitle>
          </S.TrayHeader>
          {publicMatches.length ? (
            <S.MatchRows>
              {publicMatches.map((match) => (
                <MatchRow key={match.id} match={match} />
              ))}
            </S.MatchRows>
          ) : (
            <S.Empty>
              <EmptyBoard />
              <div>
                <strong>No other matches are underway.</strong>
                <p>Start a game and make the first move.</p>
              </div>
            </S.Empty>
          )}
        </S.Tray>
      )}
      {history.length > 0 && (
        <MatchList id="mancala-history-title" matches={history} selfId={self.id} title="Your recent matches" />
      )}
      <Leaderboard />
      <Rules />
    </S.Container>
  );
};

export default Home;
