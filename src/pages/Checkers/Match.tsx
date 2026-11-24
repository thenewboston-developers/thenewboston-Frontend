import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getCheckersMatch, performCheckersAction} from 'api/checkers';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import GameResultPanel, {GameResultActions, GameResultNote, getGameResultOutcome} from 'components/GameResultPanel';
import GameSoundToggle from 'components/GameSoundToggle';
import Loader from 'components/Loader';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import useArcadeSounds, {ArcadeSound} from 'hooks/useArcadeSounds';
import useGameEventSounds from 'hooks/useGameEventSounds';
import {getSelf} from 'selectors/state';
import {upsertCheckersMatch} from 'store/checkers';
import {AppDispatch, RootState} from 'types';
import {CheckersAction, CheckersActionData, CheckersMatch, CheckersSide, CheckersState} from 'types/checkers';
import {isCancellationError} from 'utils/errors';
import {isCurrentGuestGame} from 'utils/guestGames';

import Board from './Board';
import Rules from './Rules';
import * as S from './Styles';
import {
  cellLabel,
  countPieces,
  extendPath,
  formatClock,
  getErrorMessage,
  getPlayerName,
  isCapture,
  matchingMoves,
  previewBoard,
} from './utils';

// Poll faster while the computer is choosing its reply so it appears soon after it is made
const COMPUTER_POLL_MS = 700;
const POLL_MS = 2000;

const RESULT_LABELS: Record<string, string> = {
  no_pieces: 'All opposing pieces captured',
  no_moves: 'The losing player has no pieces or legal moves remaining',
  resignation: 'Match ended by resignation',
  timeout: 'Player clock expired',
  repetition: 'Draw by threefold repetition',
  no_progress: 'Draw after 80 turns without a capture or a man moving',
};

const Match = () => {
  const [actionError, setActionError] = useState('');
  const [busyAction, setBusyAction] = useState<CheckersAction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [prefersDragging] = useState(() => !!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches);
  const [resigning, setResigning] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [selection, setSelection] = useState<{version: number; path: number[]} | null>(null);
  const [serverOffset, setServerOffset] = useState(0);
  const {matchId} = useParams();
  const {playSound, soundEnabled, toggleSound, unlockSound} = useArcadeSounds('checkers');
  const actionGeneration = useRef(0);
  const actionLock = useRef(false);
  const currentViewer = useRef<{id: number; userId?: number | null; authenticated: boolean}>({
    id: 0,
    authenticated: false,
  });
  const latestSnapshot = useRef<CheckersMatch | undefined>(undefined);
  const mounted = useRef(true);
  const receivedSnapshots = useRef<Record<string, {version: number; serverTime: number}>>({});
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(matchId);
  const isAuthenticated = useIsAuthenticated();
  const matchSnapshot = useSelector(
    (state: RootState) => (state.checkers as CheckersState | undefined)?.matchesById[id],
  );
  const navigate = useNavigate();
  const pollSoon = useRef<() => void>(() => undefined);
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
  const canAct = !!match && !!side && !busyAction && !loadError && !isLoading;
  const canMove = canAct && status === 'active' && match.active_side === side;
  const path = selection?.version === match?.version ? (selection?.path ?? []) : [];
  const legalMoves = match?.legal_moves ?? [];
  const candidates = matchingMoves(legalMoves, path);
  const complete = path.length > 1 && candidates.some((move) => move.length === path.length);
  const targets =
    path.length && !complete
      ? Array.from(new Set(candidates.filter((move) => move.length > path.length).map((move) => move[path.length])))
      : [];
  const selectable = path.length <= 1 ? Array.from(new Set(legalMoves.map((move) => move[0]))) : [];
  const captureRequired = legalMoves.length > 0 && isCapture(legalMoves[0]);
  // Mid-chain only the jumping piece may continue
  let draggable = selectable;
  if (path.length > 1) draggable = complete ? [] : [path[path.length - 1]];

  const {observeSoundEvents, resetSoundEvents} = useGameEventSounds<CheckersMatch>(playSound, (previous, next) => {
    const sounds: ArcadeSound[] = [];
    const move = next.last_move;
    if (move && JSON.stringify(move) !== JSON.stringify(previous.last_move)) {
      sounds.push(move.captured.length ? 'capture' : 'move');
      const from = move.path[0];
      const to = move.path[move.path.length - 1];
      if (Math.abs(previous.board[from]) === 1 && Math.abs(next.board[to]) === 2) sounds.push('promote');
    }
    if (next.status === 'finished' && next.winner && next.winner === next.your_side) sounds.push('win');
    return sounds;
  });

  const receiveMatch = useCallback(
    (data: CheckersMatch, silent = false) => {
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
      observeSoundEvents(data, silent);
      dispatch(upsertCheckersMatch(data));
      setServerOffset(serverTime - Date.now());
      setLoadError('');
    },
    [dispatch, observeSoundEvents],
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
    setSelection(null);
    resetSoundEvents();
    let hydrateSounds = true;
    const controller = new AbortController();
    let hurry = false;
    let inFlight = false;
    let polling = true;
    let timer: ReturnType<typeof setTimeout>;
    setIsLoading(true);
    setResigning(false);
    setActionError('');
    const load = async () => {
      let computerTurn = false;
      let shouldPoll = true;
      inFlight = true;
      try {
        if (!Number.isSafeInteger(id) || id < 1) {
          shouldPoll = false;
          throw new Error('Invalid match');
        }
        const data = await getCheckersMatch(id, controller.signal);
        shouldPoll = ['pending', 'active'].includes(data.status);
        computerTurn =
          data.mode === 'computer' &&
          data.status === 'active' &&
          !!data.your_side &&
          data.active_side !== data.your_side;
        if (polling) {
          receiveMatch(data, hydrateSounds);
          hydrateSounds = false;
        }
      } catch (error) {
        hydrateSounds = true;
        if (polling && !isCancellationError(error)) setLoadError(getErrorMessage(error));
      } finally {
        inFlight = false;
        if (polling) {
          setIsLoading(false);
          if (shouldPoll) {
            let delay = computerTurn || hurry ? COMPUTER_POLL_MS : POLL_MS;
            if (document.hidden) delay = 10000;
            hurry = false;
            timer = setTimeout(load, delay);
          }
        }
      }
    };
    pollSoon.current = () => {
      if (!polling) return;
      if (inFlight) {
        hurry = true;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(load, COMPUTER_POLL_MS);
    };
    load();
    return () => {
      polling = false;
      pollSoon.current = () => undefined;
      controller.abort();
      clearTimeout(timer);
    };
  }, [id, isAuthenticated, receiveMatch, resetSoundEvents, retryKey, self.id]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !actionLock.current) setSelection(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isAuthenticated && side && status && !['pending', 'active'].includes(status)) {
      dispatch(getAllUserWallets()).catch(() => undefined);
    }
  }, [dispatch, id, isAuthenticated, side, status]);

  const handleAction = async (action: CheckersAction, data: CheckersActionData = {}) => {
    if (!match || !canAct || actionLock.current) return;
    unlockSound();
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
    setActionError('');
    try {
      const updated = await performCheckersAction(match, action, data);
      if (!isCurrent()) return;
      receiveMatch(updated);
      if (
        isAuthenticated &&
        (['accept', 'cancel', 'decline', 'resign', 'rematch'].includes(action) || updated.status === 'finished')
      ) {
        dispatch(getAllUserWallets()).catch(() => undefined);
      }
      if (action === 'rematch') navigate(`/checkers/matches/${updated.id}`);
      else if (action === 'move' && updated.mode === 'computer' && updated.status === 'active') pollSoon.current();
      setSelection(null);
    } catch (error) {
      if (!isCurrent()) return;
      // The piece slides back to where it was before the rejected move
      setSelection(null);
      setActionError(getErrorMessage(error));
      try {
        const refreshed = await getCheckersMatch(id);
        if (isCurrent()) receiveMatch(refreshed, true);
      } catch (refreshError) {
        if (isCurrent()) setLoadError(getErrorMessage(refreshError));
      }
    } finally {
      if (generation === actionGeneration.current) actionLock.current = false;
      if (isCurrent()) {
        setBusyAction(null);
        setResigning(false);
      }
    }
  };

  const handleDragStart = (index: number) => {
    if (!canMove || !match || path.length > 1 || !selectable.includes(index) || path[0] === index) return;
    setSelection({version: match.version, path: [index]});
  };

  const handleDrop = (from: number, to: number): boolean => {
    if (!canMove || !match) return false;
    let base: number[] | null = null;
    if (path.length > 1) base = path[path.length - 1] === from ? path : null;
    else if (selectable.includes(from)) base = [from];
    if (!base) return false;
    const next = extendPath(legalMoves, base, to);
    if (!next) {
      setSelection({version: match.version, path: base});
      return false;
    }
    playPath(next);
    return true;
  };

  const handleSelect = (index: number) => {
    if (!canMove || !match) return;
    if (targets.includes(index)) playPath([...path, index]);
    else if (selectable.includes(index))
      setSelection(path.length === 1 && path[0] === index ? null : {version: match.version, path: [index]});
  };

  // Plays the move as soon as the route is complete; a partial jump chain waits for the next landing
  const playPath = (next: number[]) => {
    if (!match) return;
    setSelection({version: match.version, path: next});
    if (next.length > 1 && matchingMoves(legalMoves, next).some((move) => move.length === next.length)) {
      handleAction('move', {path: next});
    }
  };

  const renderBoard = () => {
    if (!match || !['active', 'finished'].includes(match.status)) return null;
    let instruction = prefersDragging
      ? 'Drag a piece onto a gold dot, or click the piece and then the dot.'
      : 'Tap one of your pieces, then tap a gold dot to move it.';
    if (captureRequired)
      instruction = 'A capture is available, so you must jump. Pieces that can capture are outlined in gold.';
    if (path.length > 1 && !complete) instruction = 'Keep jumping with the same piece: move it to the next gold dot.';
    if (busyAction === 'move') instruction = 'Playing your move…';
    const turnLabel = captureRequired ? 'Your turn · Capture required' : 'Your turn';
    let waitingLabel =
      match.mode === 'computer' ? 'The computer is planning its next move…' : 'Waiting for your opponent to move.';
    if (!side) waitingLabel = 'You are watching this match.';
    return (
      <>
        {status === 'active' && (
          <S.MoveToolbar aria-live="polite">
            <div>
              <strong>
                {match.active_side === side ? turnLabel : `${getPlayerName(match, match.active_side!)}’s turn`}
              </strong>
              <S.Small>{match.active_side === side ? instruction : waitingLabel}</S.Small>
            </div>
            {side && path.length > 1 && !complete && (
              <S.Actions>
                <S.Button
                  $secondary
                  disabled={!canMove}
                  onClick={() => setSelection({version: match.version, path: path.slice(0, -1)})}
                  type="button"
                >
                  Undo jump
                </S.Button>
                <S.Button $secondary disabled={!canMove} onClick={() => setSelection(null)} type="button">
                  Start over
                </S.Button>
              </S.Actions>
            )}
          </S.MoveToolbar>
        )}
        <Board
          board={previewBoard(match.board, path)}
          disabled={!canMove}
          draggable={draggable}
          lastMove={path.length ? [] : match.last_move?.path}
          mustCapture={captureRequired && path.length === 0}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onSelect={handleSelect}
          path={path}
          routes={match.last_move ? [path, match.last_move.path] : [path]}
          selectable={selectable}
          side={side ?? 'white'}
          targets={targets}
        />
        {match.last_move && (
          <S.LastMove aria-live="polite">
            Last move: {getPlayerName(match, match.last_move.side)} · {match.last_move.path.map(cellLabel).join(' → ')}
            {match.last_move.captured.length ? ` · ${match.last_move.captured.length} captured` : ''}
          </S.LastMove>
        )}
      </>
    );
  };

  const renderClock = (playerSide: CheckersSide) => {
    if (!match) return '';
    const stored = playerSide === 'white' ? match.clock_white_ms : match.clock_black_ms;
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
          {side === 'black' ? `A challenge from ${match.white.username}` : 'Waiting for your opponent'}
        </S.TitleSmall>
        <S.Detail>
          {getPlayerName(match, 'white')} challenged {getPlayerName(match, 'black')} to Checkers. Each player has{' '}
          {match.time_limit_seconds / 60} minutes of thinking time for the whole match. Ivory moves first.
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
          {side === 'black' ? (
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

  const renderPieceCount = (playerSide: CheckersSide) => {
    if (!match || !['active', 'finished'].includes(match.status)) return '';
    const count = countPieces(match.board, playerSide);
    return ` · ${count} ${count === 1 ? 'piece' : 'pieces'}`;
  };

  const renderResult = () => {
    if (!match || status !== 'finished') return null;
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    return (
      <GameResultPanel
        description={<>{RESULT_LABELS[match.result_reason] ?? 'Match complete'}</>}
        game="Checkers"
        outcome={getGameResultOutcome(match.winner, side)}
        title={match.winner ? `${getPlayerName(match, match.winner)} wins the match` : 'Draw · stakes refunded'}
      >
        {match.mode === 'computer' && side === 'white' && (
          <S.MatchReward $paid={match.computer_reward?.status === 'paid'}>
            <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} />
          </S.MatchReward>
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
          <S.TextLink to="/checkers/home">Back to Checkers</S.TextLink>
        </GameResultActions>
        {match.mode === 'human' && side && (
          <GameResultNote>
            A rematch uses the same stake and time limit. Your stake locks when you offer it; your opponent must accept
            again.
          </GameResultNote>
        )}
      </GameResultPanel>
    );
  };

  return (
    <S.MatchContainer>
      <S.MatchNavigation>
        <S.MatchHeading>
          <S.TextLink to="/checkers/home">Back to Checkers</S.TextLink>
          <h1>Checkers</h1>
        </S.MatchHeading>
        <S.Actions>
          <S.Badge>{Number.isSafeInteger(id) ? `Match ${id}` : 'Match'}</S.Badge>
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
          <S.MatchArena aria-label="Checkers match">
            <S.MatchSidebar aria-label="Players and match details">
              <S.PlayerGrid>
                {(['white', 'black'] as const).map((playerSide) => (
                  <S.MatchPlayer $active={status === 'active' && match.active_side === playerSide} key={playerSide}>
                    <S.PlayerIdentity>
                      <S.PieceMarker $white={playerSide === 'white'} aria-hidden="true" />
                      <div>
                        <strong>
                          {getPlayerName(match, playerSide)}
                          {side === playerSide ? ' (you)' : ''}
                        </strong>
                        <S.PlayerLabel>
                          {playerSide === 'white' ? 'Ivory' : 'Charcoal'}
                          {renderPieceCount(playerSide)}
                        </S.PlayerLabel>
                      </div>
                    </S.PlayerIdentity>
                    <S.PlayerClock>
                      <S.Timer aria-label={`${getPlayerName(match, playerSide)} clock`}>
                        {renderClock(playerSide)}
                      </S.Timer>
                      {status === 'active' && match.active_side === playerSide && <S.TurnBadge>To move</S.TurnBadge>}
                    </S.PlayerClock>
                  </S.MatchPlayer>
                ))}
              </S.PlayerGrid>
              <S.MatchInfo>
                <span>{match.mode === 'computer' ? `${match.difficulty} computer` : 'Head to head'}</span>
                <span>
                  {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB per player` : 'Free play'}
                </span>
                {match.stake_amount > 0 && <span>{match.prize_pool_total.toLocaleString()} TNB in prize pool</span>}
              </S.MatchInfo>
            </S.MatchSidebar>
            <S.MatchBoard>
              {renderPending()}
              <S.MatchResult>{renderResult()}</S.MatchResult>
              {renderBoard()}
              {['cancelled', 'declined', 'expired'].includes(match.status) && (
                <S.Empty>
                  This challenge was {match.status}.{' '}
                  {match.stake_amount ? 'The challenger’s stake has been refunded.' : 'No coins were taken.'}{' '}
                  <S.TextLink to="/checkers/home">Find your next match</S.TextLink>
                </S.Empty>
              )}
            </S.MatchBoard>
          </S.MatchArena>
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
