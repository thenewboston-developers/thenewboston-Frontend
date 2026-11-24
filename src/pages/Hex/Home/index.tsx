import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlay, mdiSwapHorizontal, mdiSwordCross} from '@mdi/js';
import Icon from '@mdi/react';

import {createHexMatch, getHexMatches} from 'api/hex';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertHexMatch} from 'store/hex';
import {AppDispatch, UserReadSerializer} from 'types';
import {HexBoardSize, HexDifficulty, HexMatch, HexMode, HexStatus} from 'types/hex';
import {isCancellationError} from 'utils/errors';

import {DemoBoard, HexSpinner, MiniBoard, PracticeEmblem, RivalryEmblem, StoneChain} from '../Emblems';
import Hero from '../Hero';
import Leaderboard from '../Leaderboard';
import {BOARD_SIZES, getErrorMessage, getPlayerName} from '../utils';

import * as S from './Styles';

const DIFFICULTIES: {description: string; label: string; level: number; value: HexDifficulty}[] = [
  {description: 'Learn the board', label: 'Easy', level: 1, value: 'easy'},
  {description: 'Blocks and builds', label: 'Normal', level: 2, value: 'normal'},
  {description: 'Thinks three moves ahead', label: 'Hard', level: 3, value: 'hard'},
];

const STATUS_LABELS: Record<HexStatus, string> = {
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

const getMatchTone = (match: HexMatch, selfId?: number | null): S.MatchTone => {
  if (match.status === 'pending') return match.blue?.id === selfId ? 'incoming' : 'waiting';
  if (match.status === 'active') return 'active';
  if (match.status !== 'finished' || !match.winner) return 'closed';
  return match[match.winner]?.id === selfId ? 'won' : 'lost';
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
            <StoneChain level={level} />
            <strong>{label}</strong>
            <small>{description}</small>
          </S.ChoiceCard>
        </S.Choice>
      ))}
    </S.ChoiceGrid>
  </S.Fieldset>
);

const MatchRow = ({match, selfId}: {match: HexMatch; selfId?: number | null}) => {
  const isIncoming = match.status === 'pending' && match.blue?.id === selfId;
  const isOutgoing = match.status === 'pending' && match.red.id === selfId;
  const tone = getMatchTone(match, selfId);
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isIncoming) label = 'Review challenge';
  if (isOutgoing) label = 'Awaiting reply';
  return (
    <S.MatchLink to={`/hex/matches/${match.id}`}>
      <S.MatchCell $tone={tone} aria-hidden="true" />
      <S.MatchInfo>
        <S.Opponents>
          <S.Opponent>
            <S.Stone $side="red" aria-hidden="true" />
            {getPlayerName(match, 'red')}
          </S.Opponent>{' '}
          <S.Versus aria-label="versus">vs.</S.Versus>{' '}
          <S.Opponent>
            <S.Stone $side="blue" aria-hidden="true" />
            {getPlayerName(match, 'blue')}
          </S.Opponent>
        </S.Opponents>
        <S.MatchMeta>
          {STATUS_LABELS[match.status] ?? match.status} · {match.board_size} × {match.board_size} ·{' '}
          {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ''}
        </S.MatchMeta>
      </S.MatchInfo>
      <S.MatchAction $tone={tone}>{label} →</S.MatchAction>
    </S.MatchLink>
  );
};

const MatchList = ({matches, selfId, title}: {matches: HexMatch[]; selfId?: number | null; title: string}) => (
  <S.MatchList>
    <S.MatchListHeader>
      <S.MatchListTitle>{title}</S.MatchListTitle>
      <S.Count>{matches.length}</S.Count>
    </S.MatchListHeader>
    <S.MatchRows>
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} selfId={selfId} />
      ))}
    </S.MatchRows>
  </S.MatchList>
);

const SizeOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Board size</S.Legend>
    <S.SizeGrid>
      {BOARD_SIZES.map(({description, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 11}
            id={`${prefix}-size-${value}`}
            name="board_size"
            type="radio"
            value={value}
          />
          <S.SizeCard>
            <S.SizePicture>
              <MiniBoard size={value} />
            </S.SizePicture>
            <strong>
              {value} × {value}
            </strong>
            <small>{description}</small>
          </S.SizeCard>
        </S.Choice>
      ))}
    </S.SizeGrid>
  </S.Fieldset>
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
  const [creatingMode, setCreatingMode] = useState<HexMode | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HexMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mine, setMine] = useState<HexMatch[]>([]);
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
      const matches = new Map<number, HexMatch>();
      let page = 1;
      while (mounted) {
        // Invitations received from other members can exceed a single page. Keep requests sequential and
        // constrained to this endpoint rather than following an arbitrary URL with authentication headers.
        // eslint-disable-next-line no-await-in-loop
        const response = await getHexMatches(
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
            ? getHexMatches(
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
    async (event: FormEvent<HTMLFormElement> | null, mode: HexMode) => {
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
          board_size: Number(form.get('board_size') ?? 11) as HexBoardSize,
          difficulty: (form.get('difficulty') ?? 'normal') as HexDifficulty,
          mode,
          opponent_id: mode === 'human' ? opponent!.id : undefined,
          stake_amount: amount,
          time_limit_seconds: Number(form.get('time_limit_seconds') ?? 900),
        };
        const signature = JSON.stringify(data);
        if (creationRequest.current?.signature !== signature)
          creationRequest.current = {id: crypto.randomUUID(), signature};
        const match = await createHexMatch({...data, request_id: creationRequest.current.id});
        if (!isCurrent()) return;
        creationRequest.current = null;
        dispatch(upsertHexMatch(match));
        if (amount) dispatch(getAllUserWallets()).catch(() => undefined);
        navigate(`/hex/matches/${match.id}`);
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
        <S.Badge>Connection strategy · No draws, ever</S.Badge>
      </S.Navigation>
      <Hero isCreating={!!creatingMode} onPlay={() => handleCreate(null, 'computer')} />
      {createError && <S.Alert role="alert">{createError}</S.Alert>}
      <S.Panels>
        <S.Panel $side="red" id="hex-computer" tabIndex={-1}>
          <S.PanelHeader>
            <PracticeEmblem />
            <div>
              <S.Eyebrow>Practice your paths</S.Eyebrow>
              <S.Title>Play the computer</S.Title>
            </div>
          </S.PanelHeader>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <S.Lead>
              Always free. No account needed. You are Red and move first. Signed-in players can earn TNB for eligible
              wins while the community fund has coins.
            </S.Lead>
            <DifficultyOptions />
            <SizeOptions prefix="computer" />
            <TimeOptions prefix="computer" />
            <S.Actions>
              <S.LaunchButton disabled={!!creatingMode} type="submit">
                <Icon aria-hidden path={mdiPlay} size="20px" />
                {creatingMode === 'computer' ? 'Setting the board…' : 'Play free'}
              </S.LaunchButton>
            </S.Actions>
          </S.Form>
        </S.Panel>
        <S.Panel $side="blue" id="hex-challenge" tabIndex={-1}>
          <S.PanelHeader>
            <RivalryEmblem />
            <div>
              <S.Eyebrow>Make it a rivalry</S.Eyebrow>
              <S.Title>Challenge a player</S.Title>
            </div>
          </S.PanelHeader>
          {!isAuthenticated ? (
            <>
              <S.Lead>Create an account to challenge friends and earn TNB from eligible computer wins.</S.Lead>
              <S.AuthButtons />
              <S.Showcase>
                <DemoBoard />
                <S.ShowcaseLegend>
                  <span>
                    <S.Stone $side="red" aria-hidden="true" />
                    Red joins top and bottom
                  </span>
                  <span>
                    <S.Stone $side="blue" aria-hidden="true" />
                    Blue joins left and right
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
              <SizeOptions prefix="human" />
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
              <S.Note>
                <Icon aria-hidden path={mdiSwapHorizontal} size="18px" />
                <span>
                  You move first as Red. Your opponent may answer your first stone by swapping: taking it over as their
                  own.
                </span>
              </S.Note>
              <S.Terms>
                {Number(stake) > 0
                  ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Your opponent matches it when accepting. The winner receives both stakes. Unaccepted challenges are refunded.`
                  : 'Set the stake to 0 for a free match. Both players agree to the terms before the game starts.'}
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
          <HexSpinner />
          <span>Finding your next match…</span>
        </S.Status>
      )}
      {challenges.length > 0 && <MatchList matches={challenges} selfId={self.id} title="Challenges" />}
      {activeMatches.length > 0 && <MatchList matches={activeMatches} selfId={self.id} title="Your active matches" />}
      {isAuthenticated && !isLoading && !mine.length && !error && (
        <S.Clear>
          <S.ClearBoard>
            <MiniBoard preview={4} size={3} />
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
