import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlay, mdiSwordCross} from '@mdi/js';
import Icon from '@mdi/react';

import {createDotsAndBoxesMatch, getDotsAndBoxesMatches} from 'api/dotsAndBoxes';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertDotsAndBoxesMatch} from 'store/dotsAndBoxes';
import {AppDispatch, UserReadSerializer} from 'types';
import {
  DotsAndBoxesBoardSize,
  DotsAndBoxesDifficulty,
  DotsAndBoxesMatch,
  DotsAndBoxesMode,
  DotsAndBoxesStatus,
} from 'types/dotsAndBoxes';
import {isCancellationError} from 'utils/errors';

import {
  BoardSketch,
  BoxSpinner,
  ChainMeter,
  ComputerEmblem,
  DemoBoard,
  getSamplePosition,
  RivalryEmblem,
} from '../Emblems';
import Hero from '../Hero';
import Leaderboard from '../Leaderboard';
import {getErrorMessage, getPlayerName, getScoreLine} from '../utils';

import * as S from './Styles';

const BOARD_SIZES: {description: string; value: DotsAndBoxesBoardSize}[] = [
  {description: 'Quick game', value: 3},
  {description: 'Classic', value: 4},
  {description: 'Long game', value: 5},
];

const DIFFICULTIES: {description: string; label: string; level: number; value: DotsAndBoxesDifficulty}[] = [
  {description: 'Learn the board', label: 'Easy', level: 1, value: 'easy'},
  {description: 'Guards its boxes', label: 'Normal', level: 2, value: 'normal'},
  {description: 'Plays the long chains', label: 'Hard', level: 3, value: 'hard'},
];

const SAMPLE_POSITIONS = new Map(BOARD_SIZES.map(({value}) => [value, getSamplePosition(value)]));

const STATUS_LABELS: Record<DotsAndBoxesStatus, string> = {
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

const getMatchTone = (match: DotsAndBoxesMatch, selfId?: number | null): S.MatchTone => {
  if (match.status === 'pending') return match.red?.id === selfId ? 'incoming' : 'waiting';
  if (match.status === 'active') return match.your_side && match.your_side === match.active_side ? 'turn' : 'waiting';
  if (match.status !== 'finished') return 'closed';
  if (!match.winner) return 'draw';
  return match.your_side === match.winner ? 'won' : 'lost';
};

const BoardOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Board</S.Legend>
    <S.BoxRow $columns={3}>
      {BOARD_SIZES.map(({description, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 4}
            id={`${prefix}-board-${value}`}
            name="board_size"
            type="radio"
            value={value}
          />
          <S.ChoiceBox>
            <S.SketchFrame>
              <BoardSketch {...SAMPLE_POSITIONS.get(value)} size={value} />
            </S.SketchFrame>
            <strong>
              {value} × {value}
            </strong>
            <small>{description}</small>
          </S.ChoiceBox>
        </S.Choice>
      ))}
    </S.BoxRow>
  </S.Fieldset>
);

const DifficultyOptions = () => (
  <S.Fieldset>
    <S.Legend>Difficulty</S.Legend>
    <S.BoxRow $columns={3}>
      {DIFFICULTIES.map(({description, label, level, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 'normal'}
            id={`computer-difficulty-${value}`}
            name="difficulty"
            type="radio"
            value={value}
          />
          <S.ChoiceBox>
            <ChainMeter level={level} />
            <strong>{label}</strong>
            <small>{description}</small>
          </S.ChoiceBox>
        </S.Choice>
      ))}
    </S.BoxRow>
  </S.Fieldset>
);

const MatchRow = ({match, selfId}: {match: DotsAndBoxesMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.red?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.blue.id === selfId;
  const tone = getMatchTone(match, selfId);
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (tone === 'turn') label = 'Your move';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  const resultLabel = match.winner
    ? `${getPlayerName(match, match.winner)} won ${getScoreLine(match)}`
    : `Draw ${getScoreLine(match)}`;
  return (
    <S.MatchLink $tone={tone} to={`/dots-and-boxes/matches/${match.id}`}>
      <S.MatchBoard>
        <BoardSketch boxes={match.boxes} lines={match.lines} size={match.board_size} />
      </S.MatchBoard>
      <S.MatchInfo>
        <S.Opponents>
          <S.Opponent $side="blue">{getPlayerName(match, 'blue')}</S.Opponent>{' '}
          <S.Versus aria-label="versus">vs.</S.Versus>{' '}
          <S.Opponent $side="red">{getPlayerName(match, 'red')}</S.Opponent>
        </S.Opponents>
        <S.MatchMeta>
          {STATUS_LABELS[match.status] ?? match.status} · {match.board_size} × {match.board_size} ·{' '}
          {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {match.status === 'finished' ? ` · ${resultLabel}` : ''}
        </S.MatchMeta>
      </S.MatchInfo>
      <S.MatchAction $tone={tone}>{label} →</S.MatchAction>
    </S.MatchLink>
  );
};

interface MatchListProps {
  // Only lists that hold every match show how many there are
  countAll?: boolean;
  matches: DotsAndBoxesMatch[];
  selfId?: number | null;
  title: string;
}

const MatchList = ({countAll = false, matches, selfId, title}: MatchListProps) => (
  <S.MatchList>
    <S.MatchListHeader>
      <S.MatchListTitle>{title}</S.MatchListTitle>
      {countAll && <S.Count>{matches.length}</S.Count>}
    </S.MatchListHeader>
    <S.MatchRows>
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} selfId={selfId} />
      ))}
    </S.MatchRows>
  </S.MatchList>
);

const TimeOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Time per player, whole match</S.Legend>
    <S.BoxRow $columns={4}>
      {TIME_LIMITS.map(({label, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 900}
            id={`${prefix}-time-${value}`}
            name="time_limit_seconds"
            type="radio"
            value={value}
          />
          <S.TimeBox>{label}</S.TimeBox>
        </S.Choice>
      ))}
    </S.BoxRow>
  </S.Fieldset>
);

const Home = () => {
  const [createError, setCreateError] = useState('');
  const [creatingMode, setCreatingMode] = useState<DotsAndBoxesMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<DotsAndBoxesMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<DotsAndBoxesMatch[]>([]);
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
      const matches = new Map<number, DotsAndBoxesMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getDotsAndBoxesMatches(
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
            ? getDotsAndBoxesMatches(
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
    async (event: FormEvent<HTMLFormElement> | null, mode: DotsAndBoxesMode) => {
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
          board_size: Number(form.get('board_size') ?? 4) as DotsAndBoxesBoardSize,
          difficulty: (form.get('difficulty') ?? 'normal') as DotsAndBoxesDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds') ?? 900),
        };
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createDotsAndBoxesMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertDotsAndBoxesMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/dots-and-boxes/matches/${match.id}`);
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
        <S.Badge>Pen-and-paper classic · Close the box</S.Badge>
      </S.Navigation>
      <Hero isCreating={!!creatingMode} onPlay={() => handleCreate(null, 'computer')} />
      {createError && <S.Alert role="alert">{createError}</S.Alert>}
      <S.Panels>
        <S.Panel id="dots-and-boxes-computer" tabIndex={-1}>
          <S.PanelHeader>
            <ComputerEmblem />
            <div>
              <S.Eyebrow $side="red">Learn the chains</S.Eyebrow>
              <S.Title>Play the computer</S.Title>
            </div>
          </S.PanelHeader>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <S.Lead>
              Always free. No account needed. You play blue and draw the first line. Signed-in players can earn TNB for
              eligible wins while the community fund has coins.
            </S.Lead>
            <DifficultyOptions />
            <BoardOptions prefix="computer" />
            <TimeOptions prefix="computer" />
            <S.Actions>
              <S.LaunchButton disabled={!!creatingMode} type="submit">
                <Icon aria-hidden path={mdiPlay} size="20px" />
                {creatingMode === 'computer' ? 'Setting the board…' : 'Play free'}
              </S.LaunchButton>
            </S.Actions>
          </S.Form>
        </S.Panel>
        <S.Panel id="dots-and-boxes-challenge" tabIndex={-1}>
          <S.PanelHeader>
            <RivalryEmblem />
            <div>
              <S.Eyebrow $side="blue">Make it a rivalry</S.Eyebrow>
              <S.Title>Challenge a player</S.Title>
            </div>
          </S.PanelHeader>
          {!isAuthenticated ? (
            <>
              <S.Lead>Create an account to challenge friends and earn TNB from eligible computer wins.</S.Lead>
              <S.AuthButtons />
              <S.Showcase>
                <S.ShowcasePaper>
                  <DemoBoard />
                </S.ShowcasePaper>
                <S.ShowcaseLegend>
                  <span>
                    <S.LineMark aria-hidden="true" />
                    Blue draws first
                  </span>
                  <span>
                    <S.BoxMark aria-hidden="true" />
                    Close a box, draw again
                  </span>
                </S.ShowcaseLegend>
              </S.Showcase>
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
              <BoardOptions prefix="human" />
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
                <S.LineMark aria-hidden="true" />
                <span>
                  You play blue and draw the first line.{' '}
                  {Number(stake) > 0
                    ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Your opponent matches it when accepting. The winner receives both stakes. Draws and unaccepted challenges are refunded.`
                    : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
                </span>
              </S.Terms>
              <S.Actions>
                <S.LaunchButton disabled={!!creatingMode} type="submit">
                  <Icon aria-hidden path={mdiSwordCross} size="20px" />
                  {creatingMode === 'human' ? 'Sending…' : 'Send challenge'}
                </S.LaunchButton>
              </S.Actions>
            </S.Form>
          )}
        </S.Panel>
      </S.Panels>
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
          <BoxSpinner />
          <span>Finding your next match…</span>
        </S.Status>
      )}
      {challenges.length > 0 && <MatchList countAll matches={challenges} selfId={self.id} title="Challenges" />}
      {activeMatches.length > 0 && (
        <MatchList countAll matches={activeMatches} selfId={self.id} title="Your active matches" />
      )}
      {isAuthenticated && !isLoading && !mine.length && !error && (
        <S.Clear>
          <S.ClearBoard>
            <BoardSketch size={3} />
          </S.ClearBoard>
          <S.ClearCopy>
            <strong>The board is clear</strong>
            <p>No active matches. Launch a practice game or challenge a member to get started.</p>
          </S.ClearCopy>
        </S.Clear>
      )}
      {history.length > 0 && <MatchList matches={history} selfId={self.id} title="Your recent matches" />}
      <Leaderboard />
      <S.Rules />
    </S.Container>
  );
};

export default Home;
