import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiPlay, mdiSwapHorizontal} from '@mdi/js';
import Icon from '@mdi/react';

import {createReversiMatch, getReversiMatches} from 'api/reversi';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertReversiMatch} from 'store/reversi';
import {AppDispatch, UserReadSerializer} from 'types';
import {ReversiColorChoice, ReversiDifficulty, ReversiMatch, ReversiMode} from 'types/reversi';
import {isCancellationError} from 'utils/errors';

import {FlipBoard, FlipLoader, OpeningEmblem, RivalsEmblem} from '../Emblems';
import Hero from '../Hero';
import Leaderboard from '../Leaderboard';
import {getErrorMessage, getPlayerName} from '../utils';

import * as S from './Styles';

const COLORS: {caption: string; label: string; value: ReversiColorChoice}[] = [
  {caption: 'Either side', label: 'Random', value: 'random'},
  {caption: 'Moves first', label: 'Black', value: 'black'},
  {caption: 'Moves second', label: 'White', value: 'white'},
];

const DIFFICULTIES: {description: string; label: string; level: number; value: ReversiDifficulty}[] = [
  {description: 'Get comfortable', label: 'Easy', level: 1, value: 'easy'},
  {description: 'Think ahead', label: 'Normal', level: 2, value: 'normal'},
  {description: 'Take the challenge', label: 'Hard', level: 3, value: 'hard'},
];

const TIME_LIMITS = [
  {label: '5 min', value: 300},
  {label: '10 min', value: 600},
  {label: '15 min', value: 900},
  {label: '30 min', value: 1800},
];

const ColorOptions = ({prefix}: {prefix: string}) => (
  <S.Fieldset>
    <S.Legend>Your disks</S.Legend>
    <S.ChoiceGrid>
      {COLORS.map(({caption, label, value}) => (
        <S.Choice key={value}>
          <input
            defaultChecked={value === 'random'}
            id={`${prefix}-color-${value}`}
            name="color"
            type="radio"
            value={value}
          />
          <S.ColorCard>
            <S.ColorDisk $side={value} aria-hidden="true" />
            <S.ChoiceText>
              <strong>{label}</strong> <small>{caption}</small>
            </S.ChoiceText>
          </S.ColorCard>
        </S.Choice>
      ))}
    </S.ChoiceGrid>
  </S.Fieldset>
);

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
          <S.DifficultyCard>
            <S.Pips $level={level} aria-hidden="true">
              <i />
              <i />
              <i />
            </S.Pips>
            <S.ChoiceText>
              <strong>{label}</strong> <small>{description}</small>
            </S.ChoiceText>
          </S.DifficultyCard>
        </S.Choice>
      ))}
    </S.ChoiceGrid>
  </S.Fieldset>
);

const MatchRow = ({match, selfId}: {match: ReversiMatch; selfId?: number | null}) => {
  const hostId = match[match.host_side]?.id;
  const isPending = match.status === 'pending';
  const isIncoming = isPending && hostId !== selfId;
  let label = match.status === 'finished' ? 'View result' : 'Open board';
  if (isPending) label = isIncoming ? 'Review challenge' : 'Awaiting reply';
  let result = '';
  if (match.status === 'finished') result = match.winner ? ` · ${getPlayerName(match, match.winner)} won` : ' · Draw';
  return (
    <S.MatchLink to={`/reversi/matches/${match.id}`}>
      {isPending ? (
        <S.ChallengeTile aria-hidden="true" />
      ) : (
        <S.ScoreTile aria-hidden="true">
          <b>{match.scores.black}</b>
          <b>{match.scores.white}</b>
        </S.ScoreTile>
      )}
      <S.MatchInfo>
        <S.Opponents>
          <S.Side>
            <S.SideDisk $side="black" aria-hidden="true" />
            {getPlayerName(match, 'black')}
          </S.Side>{' '}
          <S.Versus aria-label="versus">vs.</S.Versus>{' '}
          <S.Side>
            <S.SideDisk $side="white" aria-hidden="true" />
            {getPlayerName(match, 'white')}
          </S.Side>
        </S.Opponents>
        <S.MatchMeta>
          {isPending ? (
            'Challenge · '
          ) : (
            <S.VisuallyHidden>{`${match.scores.black}–${match.scores.white} · `}</S.VisuallyHidden>
          )}
          {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB each` : 'Free play'}
          {result}
        </S.MatchMeta>
      </S.MatchInfo>
      <S.MatchAction $incoming={isIncoming}>{label} →</S.MatchAction>
    </S.MatchLink>
  );
};

const MatchLog = ({matches, selfId, title}: {matches: ReversiMatch[]; selfId?: number | null; title: string}) => (
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
    <S.Legend>Time per player</S.Legend>
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
        <S.Badge>
          <S.BadgeDisk aria-hidden="true" />
          Classic strategy · Black and white
        </S.Badge>
      </S.Navigation>
      <Hero isCreating={!!creatingMode} onPlay={() => handleCreate(null, 'computer')} />
      {createError && <S.Alert role="alert">{createError}</S.Alert>}
      <S.PanelGrid>
        <S.Panel id="reversi-computer" tabIndex={-1}>
          <S.PanelHeader>
            <OpeningEmblem />
            <div>
              <S.Eyebrow>Find your rhythm</S.Eyebrow>
              <S.Title>Play the computer</S.Title>
            </div>
          </S.PanelHeader>
          <S.Form onSubmit={(event) => handleCreate(event, 'computer')}>
            <S.Lead>Always free. No account needed. Learn the board or sharpen your endgame.</S.Lead>
            <DifficultyOptions />
            <ColorOptions prefix="computer" />
            <TimeOptions prefix="computer" />
            <S.Actions>
              <S.PlayButton disabled={!!creatingMode} type="submit">
                <Icon aria-hidden path={mdiPlay} size="20px" />
                {creatingMode === 'computer' ? 'Setting the board…' : 'Play free'}
              </S.PlayButton>
            </S.Actions>
          </S.Form>
        </S.Panel>
        <S.Panel id="reversi-challenge" tabIndex={-1}>
          <S.PanelHeader>
            <RivalsEmblem />
            <div>
              <S.Eyebrow>Make it a rivalry</S.Eyebrow>
              <S.Title>Challenge a player</S.Title>
            </div>
          </S.PanelHeader>
          {!isAuthenticated ? (
            <>
              <S.Lead>Create an account to challenge friends and earn TNB from eligible computer wins.</S.Lead>
              <S.AuthButtons />
              <FlipBoard />
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
              <ColorOptions prefix="human" />
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
                  ? `${Number(stake).toLocaleString()} TNB locks when you send the challenge. Both stakes form the prize, and a draw returns them.`
                  : 'Set the stake to 0 for a free match. Your opponent sees the colors and terms before accepting.'}
              </S.Terms>
              <S.Actions>
                <S.PlayButton disabled={!!creatingMode} type="submit">
                  <Icon aria-hidden path={mdiSwapHorizontal} size="20px" />
                  {creatingMode === 'human' ? 'Sending…' : 'Send challenge'}
                </S.PlayButton>
              </S.Actions>
            </S.Form>
          )}
        </S.Panel>
      </S.PanelGrid>
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
          <FlipLoader />
          <span>Finding your next match…</span>
        </S.Status>
      )}
      {challenges.length > 0 && <MatchLog matches={challenges} selfId={self.id} title="Challenges" />}
      {activeMatches.length > 0 && <MatchLog matches={activeMatches} selfId={self.id} title="Your boards" />}
      <S.Log>
        <S.LogHeader>
          <S.LiveDot $live={publicMatches.length > 0} aria-hidden="true" />
          <S.LogTitle>Watch live</S.LogTitle>
          {publicMatches.length > 0 && <S.Count>{publicMatches.length}</S.Count>}
        </S.LogHeader>
        {publicMatches.length ? (
          <S.LogList>
            {publicMatches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </S.LogList>
        ) : (
          !isLoading && (
            <S.Empty>
              <OpeningEmblem />
              <p>No other matches are underway. Start a game and make the first move.</p>
            </S.Empty>
          )
        )}
      </S.Log>
      {history.length > 0 && <MatchLog matches={history} selfId={self.id} title="Your recent matches" />}
      <Leaderboard />
      <S.Rules />
    </S.Container>
  );
};

export default Home;
