import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getDotsAndBoxesMatch, performDotsAndBoxesAction} from 'api/dotsAndBoxes';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import GameResultPanel, {GameResultActions, GameResultNote, getGameResultOutcome} from 'components/GameResultPanel';
import GameSoundToggle from 'components/GameSoundToggle';
import Loader from 'components/Loader';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import useArcadeSounds from 'hooks/useArcadeSounds';
import {getSelf} from 'selectors/state';
import {upsertDotsAndBoxesMatch} from 'store/dotsAndBoxes';
import {AppDispatch, RootState} from 'types';
import {
  DotsAndBoxesAction,
  DotsAndBoxesActionData,
  DotsAndBoxesMatch,
  DotsAndBoxesSide,
  DotsAndBoxesState,
} from 'types/dotsAndBoxes';
import {isCancellationError} from 'utils/errors';
import {isCurrentGuestGame} from 'utils/guestGames';

import Board from './Board';
import Rules from './Rules';
import * as S from './Styles';
import {
  formatClock,
  getErrorMessage,
  getPlayerName,
  getScore,
  getScoreLine,
  lastTurnLines,
  lineLabel,
  positionAfter,
  SIDE_NUMBERS,
  SIDES,
} from './utils';

const COMPUTER_POLL_DELAY = 700;
const POLL_DELAY = 2000;
// An opponent's lines can arrive several at a time; draw them one by one so the turn can be followed.
const REPLAY_DELAY = 450;

const RESULT_LABELS: Record<string, string> = {
  completed: 'Every box is claimed',
  resignation: 'Match ended by resignation',
  timeout: 'Player clock expired',
};

const SIDE_LABELS: Record<DotsAndBoxesSide, string> = {blue: 'Blue · draws first', red: 'Red'};

const Match = () => {
  const [actionError, setActionError] = useState('');
  const [busyAction, setBusyAction] = useState<DotsAndBoxesAction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [pendingLine, setPendingLine] = useState<number | null>(null);
  const [resigning, setResigning] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [serverOffset, setServerOffset] = useState(0);
  const [shown, setShown] = useState<{count: number; id: number} | null>(null);
  const {matchId} = useParams();
  const {playSound, soundEnabled, toggleSound} = useArcadeSounds('dots_and_boxes');
  const actionGeneration = useRef(0);
  const actionLock = useRef(false);
  const currentViewer = useRef<{id: number; userId?: number | null; authenticated: boolean}>({
    id: 0,
    authenticated: false,
  });
  const latestSnapshot = useRef<DotsAndBoxesMatch | undefined>(undefined);
  const mounted = useRef(true);
  const pollSoon = useRef<() => void>(() => undefined);
  const receivedSnapshots = useRef<Record<string, {version: number; serverTime: number}>>({});
  const silentSnapshot = useRef<{id: number; version: number} | null>(null);
  const sounded = useRef<{key: string; count: number; finished: boolean} | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(matchId);
  const isAuthenticated = useIsAuthenticated();
  const matchSnapshot = useSelector(
    (state: RootState) => (state.dotsAndBoxes as DotsAndBoxesState | undefined)?.matchesById[id],
  );
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  // Never render a cached private board for a different signed-in account.
  const match =
    matchSnapshot &&
    (matchSnapshot.guest_mode
      ? !isAuthenticated && isCurrentGuestGame(matchSnapshot)
      : !matchSnapshot.your_side || (isAuthenticated && matchSnapshot[matchSnapshot.your_side]?.id === self.id))
      ? matchSnapshot
      : undefined;
  currentViewer.current = {id, userId: self.id, authenticated: isAuthenticated};
  latestSnapshot.current = match;
  const side = match?.your_side;
  const status = match?.status;
  const totalLines = match?.moves.length ?? 0;
  const shownLines = match && shown?.id === match.id ? Math.min(shown.count, totalLines) : totalLines;
  const replaying = shownLines < totalLines;
  // While an opponent's lines are being replayed, the board and the scores show the position so far.
  const position = match && replaying ? positionAfter(match, shownLines) : match;
  const canAct = !!match && !!side && !busyAction && !loadError && !isLoading;
  const canMove = canAct && status === 'active' && match.active_side === side && !replaying;

  const receiveMatch = useCallback(
    (data: DotsAndBoxesMatch, silent = false) => {
      if (
        !mounted.current ||
        (data.guest_mode
          ? currentViewer.current.authenticated || !isCurrentGuestGame(data)
          : data.your_side !== null &&
            (!currentViewer.current.authenticated || data[data.your_side]?.id !== currentViewer.current.userId))
      )
        return;
      const key = `${data.id}:${currentViewer.current.userId}`;
      const serverTime = Date.parse(data.server_time);
      const cached = latestSnapshot.current;
      const cachedVersion =
        cached?.id === data.id ? {version: cached.version, serverTime: Date.parse(cached.server_time)} : undefined;
      // Reject the entire old snapshot: updating only Redux would still rewind the clock
      // or clear a newer connection error when a delayed poll arrives after an action.
      if (
        [receivedSnapshots.current[key], cachedVersion].some(
          (previous) =>
            previous &&
            (previous.version > data.version ||
              (previous.version === data.version && previous.serverTime > serverTime)),
        )
      )
        return;
      receivedSnapshots.current[key] = {version: data.version, serverTime};
      if (silent) {
        silentSnapshot.current = {id: data.id, version: data.version};
        const viewer = currentViewer.current;
        sounded.current = {
          key: `${data.id}:${viewer.authenticated}:${viewer.userId}:${data.guest_session_id ?? ''}`,
          count: data.moves.length,
          finished: data.status === 'finished',
        };
        setShown({count: data.moves.length, id: data.id});
      }
      dispatch(upsertDotsAndBoxesMatch(data));
      setServerOffset(serverTime - Date.now());
      setLoadError('');
    },
    [dispatch],
  );

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    actionGeneration.current += 1;
    actionLock.current = false;
    setBusyAction(null);
    setPendingLine(null);
    const controller = new AbortController();
    let hydratePresentation = true;
    let polling = true;
    let requesting = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    setIsLoading(true);
    setResigning(false);
    setActionError('');
    const load = async () => {
      let delay = POLL_DELAY;
      let shouldPoll = true;
      requesting = true;
      timer = undefined;
      try {
        if (!Number.isSafeInteger(id) || id < 1) {
          shouldPoll = false;
          throw new Error('Invalid match');
        }
        const data = await getDotsAndBoxesMatch(id, controller.signal);
        shouldPoll = ['pending', 'active'].includes(data.status);
        // The computer answers within a moment, so look again sooner while it is drawing.
        if (data.mode === 'computer' && data.status === 'active' && data.active_side === 'red')
          delay = COMPUTER_POLL_DELAY;
        if (polling) {
          receiveMatch(data, hydratePresentation);
          hydratePresentation = false;
        }
      } catch (error) {
        hydratePresentation = true;
        if (polling && !isCancellationError(error)) setLoadError(getErrorMessage(error));
      } finally {
        requesting = false;
        if (polling) {
          setIsLoading(false);
          if (shouldPoll) timer = setTimeout(load, document.hidden ? 10000 : delay);
        }
      }
    };
    pollSoon.current = () => {
      // A request already on its way schedules the next one itself.
      if (!polling || requesting || timer === undefined) return;
      clearTimeout(timer);
      timer = setTimeout(load, COMPUTER_POLL_DELAY);
    };
    load();
    return () => {
      polling = false;
      pollSoon.current = () => undefined;
      controller.abort();
      clearTimeout(timer);
    };
  }, [id, isAuthenticated, receiveMatch, retryKey, self.id]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated && side && status && !['pending', 'active'].includes(status)) {
      dispatch(getAllUserWallets()).catch(() => undefined);
    }
  }, [dispatch, id, isAuthenticated, side, status]);

  useEffect(() => {
    const {current} = latestSnapshot;
    if (!current || current.id !== id) return undefined;
    // A match opens on its current board; only lines that arrive afterwards are replayed.
    if (shown?.id !== id) {
      setShown({count: totalLines, id});
      return undefined;
    }
    if (shown.count >= totalLines) return undefined;
    if (document.hidden || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown({count: totalLines, id});
      return undefined;
    }
    // Your own lines appear at once.
    const own = side ? SIDE_NUMBERS[side] : null;
    let {count} = shown;
    while (count < totalLines && current.lines[current.moves[count]] === own) count += 1;
    if (count > shown.count) {
      setShown({count, id});
      return undefined;
    }
    const timer = setTimeout(() => setShown({count: shown.count + 1, id}), REPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [id, shown, side, totalLines]);

  useEffect(() => {
    const skipHiddenReplay = () => {
      if (document.hidden) setShown({count: totalLines, id});
    };
    document.addEventListener('visibilitychange', skipHiddenReplay);
    return () => document.removeEventListener('visibilitychange', skipHiddenReplay);
  }, [id, totalLines]);

  useEffect(() => {
    if (!match) {
      sounded.current = null;
      return;
    }
    const key = `${match.id}:${isAuthenticated}:${self.id}:${match.guest_session_id ?? ''}`;
    const finished = match.status === 'finished' && !replaying;
    const previous = sounded.current;
    sounded.current = {key, count: shownLines, finished};
    // Sounds follow the visible board; initial hydration, viewer changes, and repeated polls stay silent.
    if (
      !previous ||
      previous.key !== key ||
      document.hidden ||
      (silentSnapshot.current?.id === match.id && match.version <= silentSnapshot.current.version)
    )
      return;
    if (shownLines > previous.count) {
      const before = positionAfter(match, previous.count).boxes.filter(Boolean).length;
      const after = positionAfter(match, shownLines).boxes.filter(Boolean).length;
      playSound(after > before ? 'claim' : 'move');
    }
    if (finished && !previous.finished && side && match.winner === side)
      playSound('win', shownLines > previous.count ? 180 : 0);
  }, [isAuthenticated, match, playSound, replaying, self.id, shownLines, side]);

  const handleAction = async (action: DotsAndBoxesAction, data: DotsAndBoxesActionData = {}) => {
    if (!match || !canAct || actionLock.current) return;
    actionGeneration.current += 1;
    const generation = actionGeneration.current;
    const viewerId = self.id;
    const isCurrent = () =>
      generation === actionGeneration.current &&
      mounted.current &&
      currentViewer.current.authenticated === isAuthenticated &&
      currentViewer.current.userId === viewerId &&
      currentViewer.current.id === id;
    actionLock.current = true;
    setBusyAction(action);
    if (action === 'move') setPendingLine(data.line ?? null);
    setActionError('');
    try {
      const updated = await performDotsAndBoxesAction(match, action, data);
      if (!isCurrent()) return;
      receiveMatch(updated);
      if (
        isAuthenticated &&
        (['accept', 'cancel', 'decline', 'resign', 'rematch'].includes(action) || updated.status === 'finished')
      ) {
        dispatch(getAllUserWallets()).catch(() => undefined);
      }
      if (action === 'rematch') navigate(`/dots-and-boxes/matches/${updated.id}`);
      if (updated.mode === 'computer' && updated.status === 'active' && updated.active_side === 'red')
        pollSoon.current();
    } catch (error) {
      if (!isCurrent()) return;
      setActionError(getErrorMessage(error));
      try {
        const refreshed = await getDotsAndBoxesMatch(id);
        if (isCurrent()) receiveMatch(refreshed, true);
      } catch (refreshError) {
        if (isCurrent()) setLoadError(getErrorMessage(refreshError));
      }
    } finally {
      if (generation === actionGeneration.current) actionLock.current = false;
      if (isCurrent()) {
        setBusyAction(null);
        setPendingLine(null);
        setResigning(false);
      }
    }
  };

  const handlePlay = (line: number) => {
    if (!canMove || !match || match.lines[line] !== 0) return;
    handleAction('move', {line});
  };

  const renderBoard = () => {
    if (!match || !position || !['active', 'finished'].includes(match.status)) return null;
    const lastLine = shownLines ? match.moves[shownLines - 1] : null;
    const lastSide = lastLine === null ? null : SIDES[match.lines[lastLine] - 1];
    const names = {blue: getPlayerName(match, 'blue'), red: getPlayerName(match, 'red')};
    return (
      <>
        {(status === 'active' || replaying) && renderToolbar()}
        <Board
          boxes={position.boxes}
          disabled={!canMove}
          lines={position.lines}
          names={names}
          onPlay={handlePlay}
          pending={pendingLine}
          recent={lastTurnLines(match, shownLines)}
          side={side ?? 'blue'}
          size={match.board_size}
        />
        {lastLine !== null && lastSide && (
          <S.Small aria-live="polite">
            Last line: {names[lastSide]} · {lineLabel(match.board_size, lastLine)}
          </S.Small>
        )}
      </>
    );
  };

  const renderClock = (playerSide: DotsAndBoxesSide) => {
    if (!match) return '';
    const stored = playerSide === 'blue' ? match.clock_blue_ms : match.clock_red_ms;
    const elapsed =
      match.status === 'active' && match.active_side === playerSide && match.turn_started_at
        ? Math.max(0, now + serverOffset - Date.parse(match.turn_started_at))
        : 0;
    return formatClock(stored - elapsed);
  };

  const renderPending = () => {
    if (!match || !side || status !== 'pending') return null;
    const acceptLabel = match.stake_amount
      ? `Accept · ${match.stake_amount.toLocaleString()} TNB`
      : 'Accept free match';
    return (
      <S.Panel>
        <S.TitleSmall>
          {side === 'red' ? `A challenge from ${match.blue.username}` : 'Waiting for your opponent'}
        </S.TitleSmall>
        <S.Detail>
          {getPlayerName(match, 'blue')} challenged {getPlayerName(match, 'red')} to Dots and Boxes on a{' '}
          {match.board_size} × {match.board_size} board. Each player has {match.time_limit_seconds / 60} minutes of
          thinking time for the whole match. {getPlayerName(match, 'blue')} draws first.
        </S.Detail>
        <S.Stat>
          <span>Stake per player</span>
          <strong>{match.stake_amount.toLocaleString()} TNB</strong>
        </S.Stat>
        <S.Stat>
          <span>Prize when accepted</span>
          <strong>{(match.stake_amount * 2).toLocaleString()} TNB</strong>
        </S.Stat>
        <S.Stat>
          <span>Invitation expires in</span>
          <strong>{formatClock(Date.parse(match.expires_at!) - now - serverOffset)}</strong>
        </S.Stat>
        <S.Small>
          {match.stake_amount
            ? 'Accepting locks your stake until the match ends. The winner receives both stakes. An expired, declined, or canceled invitation refunds the challenger.'
            : 'This is a free match. No coins will be taken.'}
        </S.Small>
        <S.Small>
          Draws refund both stakes. Your clock begins when it is your turn, so be ready when the invitation is accepted.
        </S.Small>
        <S.Actions style={{marginTop: 20}}>
          {side === 'red' ? (
            <>
              <S.Button disabled={!canAct} onClick={() => handleAction('accept')} type="button">
                {busyAction === 'accept' ? 'Accepting…' : acceptLabel}
              </S.Button>
              <S.Button $secondary disabled={!canAct} onClick={() => handleAction('decline')} type="button">
                Decline
              </S.Button>
            </>
          ) : (
            <S.Button $secondary disabled={!canAct} onClick={() => handleAction('cancel')} type="button">
              Cancel challenge
            </S.Button>
          )}
        </S.Actions>
      </S.Panel>
    );
  };

  const renderResult = () => {
    // The last lines are drawn on the board before the result is announced.
    if (!match || status !== 'finished' || replaying) return null;
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    const score = getScoreLine(match);
    let title = match.stake_amount ? `Draw ${score} · stakes refunded` : `Draw ${score}`;
    if (match.winner)
      title =
        match.result_reason === 'completed'
          ? `${getPlayerName(match, match.winner)} wins ${score}`
          : `${getPlayerName(match, match.winner)} wins the match`;
    return (
      <GameResultPanel
        description={
          <>
            {RESULT_LABELS[match.result_reason] ?? 'Match complete'}
            {match.mode === 'computer' && side && match.winner && match.winner !== side
              ? '. A fresh board is a fresh start.'
              : ''}
          </>
        }
        game="Dots and Boxes"
        outcome={getGameResultOutcome(match.winner, side)}
        scoreLabel="Boxes claimed"
        scores={[
          {label: getPlayerName(match, 'blue'), value: getScore(match, 'blue'), winner: match.winner === 'blue'},
          {label: getPlayerName(match, 'red'), value: getScore(match, 'red'), winner: match.winner === 'red'},
        ]}
        title={title}
      >
        {match.mode === 'computer' && side === 'blue' && (
          <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} subdued />
        )}
        {match.prize_pool_total > 0 && (
          <strong>
            {match.winner
              ? `${match.prize_pool_total.toLocaleString()} TNB prize paid to ${getPlayerName(match, match.winner)}.`
              : 'Both players’ stakes have been refunded.'}
          </strong>
        )}
        <GameResultActions>
          {side && (
            <S.Button disabled={!canAct} onClick={() => handleAction('rematch')} type="button">
              {busyAction === 'rematch' ? 'Creating…' : rematchLabel}
            </S.Button>
          )}
          <S.TextLink to="/dots-and-boxes/home">Back to Dots and Boxes</S.TextLink>
        </GameResultActions>
        {match.mode === 'human' && side && (
          <GameResultNote>
            A rematch uses the same board, stake and time limit. Your stake locks when you offer it; your opponent must
            accept again.
          </GameResultNote>
        )}
      </GameResultPanel>
    );
  };

  const renderToolbar = () => {
    if (!match) return null;
    const isYourTurn = match.active_side === side;
    const lastLine = totalLines ? match.moves[totalLines - 1] : null;
    const keptTurn = isYourTurn && lastLine !== null && !!side && match.lines[lastLine] === SIDE_NUMBERS[side];
    let heading = `${getPlayerName(match, match.active_side)}’s turn`;
    let detail = match.mode === 'computer' ? 'The computer is choosing a line…' : 'Waiting for your opponent to draw.';
    if (!side) detail = 'You are watching this match.';
    if (replaying) {
      const drawing = SIDES[match.lines[match.moves[shownLines]] - 1];
      heading = `${getPlayerName(match, drawing)} is drawing…`;
      detail = 'Watch the board: each new line is shown in turn.';
    } else if (busyAction === 'move' && pendingLine !== null) {
      heading = 'Drawing your line…';
      detail = `Line ${lineLabel(match.board_size, pendingLine)} is being placed.`;
    } else if (isYourTurn) {
      heading = keptTurn ? 'Box claimed · draw again' : 'Your turn';
      detail = 'Click or tap an open line to draw it. Closing a box earns another turn.';
    }
    return (
      <S.MoveToolbar aria-live="polite">
        <div>
          <strong>{heading}</strong>
          <S.Small>{detail}</S.Small>
        </div>
      </S.MoveToolbar>
    );
  };

  return (
    <S.MatchContainer>
      <S.MatchNavigation>
        <S.TextLink to="/dots-and-boxes/home">← Back to Dots and Boxes</S.TextLink>
        <S.Actions>
          <S.Badge>Dots and Boxes {Number.isSafeInteger(id) ? `· Match ${id}` : ''}</S.Badge>
          <GameSoundToggle onToggle={toggleSound} soundEnabled={soundEnabled} />
        </S.Actions>
      </S.MatchNavigation>
      {loadError && (
        <S.Error role="alert">
          {loadError}{' '}
          <S.Button $secondary onClick={() => setRetryKey((value) => value + 1)} type="button">
            Reconnect
          </S.Button>
          <S.Small>Moves are paused until the connection is restored. Match clocks continue to run.</S.Small>
        </S.Error>
      )}
      {actionError && <S.Error role="alert">{actionError}</S.Error>}
      {isLoading && (
        <S.Status role="status">
          <Loader />
          <span>Opening your match…</span>
        </S.Status>
      )}
      {match && (
        <>
          <S.PlayerGrid>
            {SIDES.map((playerSide) => {
              const name = getPlayerName(match, playerSide);
              const boxes = getScore(position ?? match, playerSide);
              return (
                <S.MatchPlayer
                  $active={status === 'active' && !replaying && match.active_side === playerSide}
                  key={playerSide}
                >
                  <div>
                    <strong>
                      <S.PlayerColor $side={playerSide} aria-hidden="true" />
                      {name}
                      {side === playerSide ? ' (you)' : ''}
                    </strong>
                    <S.Small>
                      {match.mode === 'computer' && playerSide === 'red'
                        ? `Red · ${match.difficulty} computer`
                        : SIDE_LABELS[playerSide]}
                    </S.Small>
                  </div>
                  <S.Scoreboard>
                    <S.Score $side={playerSide} aria-label={`${name}: ${boxes} ${boxes === 1 ? 'box' : 'boxes'}`}>
                      {boxes}
                    </S.Score>
                    <S.Timer aria-label={`${name} clock`}>{renderClock(playerSide)}</S.Timer>
                  </S.Scoreboard>
                </S.MatchPlayer>
              );
            })}
          </S.PlayerGrid>
          <S.Actions style={{margin: '10px 0'}}>
            <S.Badge>
              {match.board_size} × {match.board_size} boxes
            </S.Badge>
            <S.Badge>
              {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB per player` : 'Free play'}
            </S.Badge>
            {match.stake_amount > 0 && <S.Badge>{match.prize_pool_total.toLocaleString()} TNB in prize pool</S.Badge>}
          </S.Actions>
          {renderPending()}
          {renderResult()}
          {renderBoard()}
          {['cancelled', 'declined', 'expired'].includes(match.status) && (
            <S.Empty>
              This challenge was {match.status}.{' '}
              {match.stake_amount ? 'The challenger’s stake has been refunded.' : 'No coins were taken.'}{' '}
              <S.TextLink to="/dots-and-boxes/home">Find your next match →</S.TextLink>
            </S.Empty>
          )}
          {status === 'active' && side && (
            <S.Section>
              <S.Actions>
                {resigning ? (
                  <>
                    <S.Detail>Resign and concede this match{match.stake_amount ? ' and your stake' : ''}?</S.Detail>
                    <S.Button $danger disabled={!canAct} onClick={() => handleAction('resign')} type="button">
                      Confirm resignation
                    </S.Button>
                    <S.Button $secondary disabled={!canAct} onClick={() => setResigning(false)} type="button">
                      Keep playing
                    </S.Button>
                  </>
                ) : (
                  <S.Button $secondary disabled={!canAct} onClick={() => setResigning(true)} type="button">
                    Resign match
                  </S.Button>
                )}
              </S.Actions>
            </S.Section>
          )}
        </>
      )}
      <Rules />
    </S.MatchContainer>
  );
};

export default Match;
