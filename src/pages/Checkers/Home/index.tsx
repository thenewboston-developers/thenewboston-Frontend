import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlay, mdiSwordCross} from '@mdi/js';
import Icon from '@mdi/react';

import {createCheckersMatch, getCheckersMatches} from 'api/checkers';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertCheckersMatch} from 'store/checkers';
import {AppDispatch, UserReadSerializer} from 'types';
import {CheckersDifficulty, CheckersMatch, CheckersMode, CheckersStatus} from 'types/checkers';
import {isCancellationError} from 'utils/errors';

import {HopLoader, JumpScene, JumpTile, Matchup, MoveTile} from '../Emblems';
import Hero from '../Hero';
import Leaderboard from '../Leaderboard';
import {getErrorMessage, getPlayerName} from '../utils';

import * as S from './Styles';

const DIFFICULTIES: {description: string; label: string; level: number; value: CheckersDifficulty}[] = [
  {description: 'Learn the board', label: 'Easy', level: 1, value: 'easy'},
  {description: 'Plan your captures', label: 'Normal', level: 2, value: 'normal'},
  {description: 'Think further ahead', label: 'Hard', level: 3, value: 'hard'},
];

const STATUS_LABELS: Record<CheckersStatus, string> = {
  active: 'In play',
  cancelled: 'Cancelled',
  declined: 'Declined',
  expired: 'Expired',
  finished: 'Finished',
  pending: 'Pending',
};

const TIME_LIMITS = [
  {label: '5 min', value: 300},
  {label: '10 min', value: 600},
  {label: '15 min', value: 900},
  {label: '30 min', value: 1800},
];

const getMatchTone = (match: CheckersMatch, selfId?: number | null): S.MatchTone => {
  if (match.status === 'pending') return match.black?.id === selfId ? 'incoming' : 'waiting';
  if (match.status === 'active') return match.your_side && match.active_side === match.your_side ? 'turn' : 'active';
  if (match.status !== 'finished' || !match.winner || !match.your_side) return 'closed';
  return match.winner === match.your_side ? 'won' : 'lost';
};

const getStatusLabel = (match: CheckersMatch, tone: S.MatchTone): string => {
  if (tone === 'incoming') return 'Challenge received';
  if (tone === 'waiting') return 'Challenge sent';
  if (tone === 'turn') return 'Your move';
  if (tone === 'active' && match.your_side) return 'Their move';
  return STATUS_LABELS[match.status] ?? match.status;
};

const DifficultyOptions = () => (
  <S.Fieldset>
    <S.Legend>Difficulty</S.Legend>
    <S.ChoiceGrid>
      {DIFFICULTIES.map(({description, label, level, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 'normal'}
            id={`computer-difficulty-${value}`}
            name="difficulty"
            type="radio"
            value={value}
          />
          <S.ChoiceCard>
            <S.Pips $level={level} aria-hidden="true">
              <i />
              <i />
              <i />
            </S.Pips>
            <strong>{label}</strong>
            <small>{description}</small>
          </S.ChoiceCard>
        </S.Choice>
      ))}
    </S.ChoiceGrid>
  </S.Fieldset>
);

const MatchRow = ({match, selfId}: {match: CheckersMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.black?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.white.id === selfId;
  const tone = getMatchTone(match, selfId);
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  if (tone === 'turn') label = 'Make your move';
  return (
    <S.MatchLink $tone={tone} to={`/checkers/matches/${match.id}`}>
      <Matchup />
      <S.MatchInfo>
        <S.Opponents>
          {getPlayerName(match, 'white')} <span aria-label="versus">vs.</span> {getPlayerName(match, 'black')}
        </S.Opponents>
        <S.MatchMeta>
          <S.StatusText $tone={tone}>{getStatusLabel(match, tone)}</S.StatusText> ·{' '}
          {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ''}
        </S.MatchMeta>
      </S.MatchInfo>
      <S.MatchAction $tone={tone}>{label} →</S.MatchAction>
    </S.MatchLink>
  );
};

const MatchLog = ({matches, selfId, title}: {matches: CheckersMatch[]; selfId?: number | null; title: string}) => (
  <S.Log>
    <S.LogHeader>
      <S.LogTitle>{title}</S.LogTitle>
      <S.Count>{matches.length}</S.Count>
    </S.LogHeader>
    <S.LogList>
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} selfId={selfId} />
      ))}
    </S.LogList>
  </S.Log>
);

const TimeOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Time per player, whole match</S.Legend>
    <S.Segmented>
      {TIME_LIMITS.map(({label, value}) => (
        <S.Segment key={value}>
          <input
            defaultChecked={value === 900}
            id={`${prefix}-time-${value}`}
            name="time_limit_seconds"
            type="radio"
            value={value}
          />
          <span>{label}</span>
        </S.Segment>
      ))}
    </S.Segmented>
  </S.Fieldset>
);

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
    async (event: FormEvent<HTMLFormElement> | null, mode: CheckersMode) => {
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
          difficulty: (form.get('difficulty') ?? 'normal') as CheckersDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds') ?? 900),
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
      <Hero isCreating={!!creatingMode} onPlay={() => handleCreate(null, 'computer')} />
      {createError && <S.Alert role="alert">{createError}</S.Alert>}
      <S.Boards>
        <S.Panel id="checkers-computer" tabIndex={-1}>
          <S.PanelHeader>
            <MoveTile />
            <div>
              <S.Eyebrow>Practice your tactics</S.Eyebrow>
              <S.Title>Play the computer</S.Title>
            </div>
          </S.PanelHeader>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <S.Lead>
              Always free. No account needed. Signed-in players can earn TNB for eligible wins while the community fund
              has coins.
            </S.Lead>
            <DifficultyOptions />
            <TimeOptions prefix="computer" />
            <S.Actions>
              <S.PlayButton disabled={!!creatingMode} type="submit">
                <Icon aria-hidden path={mdiPlay} size="20px" />
                {creatingMode === 'computer' ? 'Setting the board…' : 'Play free'}
              </S.PlayButton>
            </S.Actions>
          </S.Form>
        </S.Panel>
        <S.Panel id="checkers-challenge" tabIndex={-1}>
          <S.PanelHeader>
            <JumpTile />
            <div>
              <S.Eyebrow>Make it a rivalry</S.Eyebrow>
              <S.Title>Challenge a player</S.Title>
            </div>
          </S.PanelHeader>
          {!isAuthenticated ? (
            <>
              <S.Lead>Create an account to challenge friends and earn TNB from eligible computer wins.</S.Lead>
              <S.AuthButtons />
              <S.SceneFrame>
                <JumpScene />
              </S.SceneFrame>
            </>
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
                <S.FieldLabel>Stake per player</S.FieldLabel>
                <S.StakeControl>
                  <S.StakeInput
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
                  <S.StakeUnit>TNB</S.StakeUnit>
                </S.StakeControl>
              </S.Field>
              <S.Terms>
                {Number(stake) > 0
                  ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Your opponent matches it when accepting. The winner receives both stakes. Draws and unaccepted challenges are refunded.`
                  : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
              </S.Terms>
              <S.Actions>
                <S.PlayButton disabled={!!creatingMode} type="submit">
                  <Icon aria-hidden path={mdiSwordCross} size="20px" />
                  {creatingMode === 'human' ? 'Sending…' : 'Send challenge'}
                </S.PlayButton>
              </S.Actions>
            </S.Form>
          )}
        </S.Panel>
      </S.Boards>
      {error && (
        <S.Alert role="alert">
          <span>{error}</span>
          <S.GhostButton onClick={() => setRetryKey((key) => key + 1)} type="button">
            Retry
          </S.GhostButton>
        </S.Alert>
      )}
      {isLoading && (
        <S.Status role="status">
          <HopLoader />
          <span>Finding your next match…</span>
        </S.Status>
      )}
      {challenges.length > 0 && <MatchLog matches={challenges} selfId={self.id} title="Challenges" />}
      {activeMatches.length > 0 && <MatchLog matches={activeMatches} selfId={self.id} title="Your active matches" />}
      {isAuthenticated && !isLoading && !mine.length && !error && (
        <S.Calm>
          <MoveTile />
          <S.CalmCopy>
            <strong>The board is set</strong>
            <p>No active matches. Launch a practice game or challenge a member to get started.</p>
          </S.CalmCopy>
        </S.Calm>
      )}
      {history.length > 0 && <MatchLog matches={history} selfId={self.id} title="Your recent matches" />}
      <Leaderboard />
      <S.Rules />
    </S.Container>
  );
};

export default Home;
