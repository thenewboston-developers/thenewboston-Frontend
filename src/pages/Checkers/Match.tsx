import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getCheckersMatch, performCheckersAction} from 'api/checkers';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
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
import {cellLabel, formatClock, getErrorMessage, getPlayerName, isCapture, matchingMoves, previewBoard} from './utils';

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
  const targets = path.length
    ? Array.from(new Set(candidates.filter((move) => move.length > path.length).map((move) => move[path.length])))
    : [];
  const selectable = path.length <= 1 ? Array.from(new Set(legalMoves.map((move) => move[0]))) : [];
  const captureRequired = legalMoves.length > 0 && isCapture(legalMoves[0]);

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
    let polling = true;
    let timer: ReturnType<typeof setTimeout>;
    setIsLoading(true);
    setResigning(false);
    setActionError('');
    const load = async () => {
      let shouldPoll = true;
      try {
        if (!Number.isSafeInteger(id) || id < 1) {
          shouldPoll = false;
          throw new Error('Invalid match');
        }
        const data = await getCheckersMatch(id, controller.signal);
        shouldPoll = ['pending', 'active'].includes(data.status);
        if (polling) {
          receiveMatch(data, hydrateSounds);
          hydrateSounds = false;
        }
      } catch (error) {
        hydrateSounds = true;
        if (polling && !isCancellationError(error)) setLoadError(getErrorMessage(error));
      } finally {
        if (polling) {
          setIsLoading(false);
          if (shouldPoll) timer = setTimeout(load, document.hidden ? 10000 : 2000);
        }
      }
    };
    load();
    return () => {
      polling = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [id, isAuthenticated, receiveMatch, resetSoundEvents, retryKey, self.id]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
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
      setSelection(null);
    } catch (error) {
      if (!isCurrent()) return;
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

  const handleSelect = (index: number) => {
    if (!canMove || !match) return;
    if (targets.includes(index)) setSelection({version: match.version, path: [...path, index]});
    else if (selectable.includes(index)) setSelection({version: match.version, path: [index]});
  };

  const renderBoard = () => {
    if (!match || !['active', 'finished'].includes(match.status)) return null;
    let instruction = 'Select one of your pieces, then a highlighted landing square.';
    if (captureRequired) instruction = 'A capture is available. Choose a piece and follow its highlighted jumps.';
    if (path.length > 1)
      instruction = complete
        ? 'Your move is ready. Confirm it, or reset to choose a different route.'
        : 'Keep jumping with this piece. Select the next highlighted landing.';
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
              {path.length > 1 && <S.Small>Preview: {path.map(cellLabel).join(' → ')}</S.Small>}
            </div>
            {side && (
              <S.Actions>
                {path.length > 0 && (
                  <S.Button $secondary disabled={!canMove} onClick={() => setSelection(null)} type="button">
                    Reset
                  </S.Button>
                )}
                {path.length > 1 && (
                  <S.Button
                    $secondary
                    disabled={!canMove}
                    onClick={() => setSelection({version: match.version, path: path.slice(0, -1)})}
                    type="button"
                  >
                    Undo
                  </S.Button>
                )}
                <S.Button disabled={!canMove || !complete} onClick={() => handleAction('move', {path})} type="button">
                  {busyAction === 'move' ? 'Playing…' : 'Confirm move'}
                </S.Button>
              </S.Actions>
            )}
          </S.MoveToolbar>
        )}
        <Board
          board={previewBoard(match.board, path)}
          disabled={!canMove}
          lastMove={path.length ? [] : match.last_move?.path}
          onSelect={handleSelect}
          path={path}
          selectable={selectable}
          side={side ?? 'white'}
          targets={targets}
        />
        {match.last_move && (
          <S.Small aria-live="polite">
            Last move: {getPlayerName(match, match.last_move.side)} · {match.last_move.path.map(cellLabel).join(' → ')}
            {match.last_move.captured.length ? ` · ${match.last_move.captured.length} captured` : ''}
          </S.Small>
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

  const renderResult = () => {
    if (!match || status !== 'finished') return null;
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    return (
      <S.Result role="status">
        <S.TitleSmall>
          {match.winner ? `${getPlayerName(match, match.winner)} wins the match` : 'Draw · stakes refunded'}
        </S.TitleSmall>
        <S.Detail>{RESULT_LABELS[match.result_reason] ?? 'Match complete'}</S.Detail>
        {match.mode === 'computer' && side === 'white' && (
          <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} />
        )}
        {match.prize_pool_total > 0 && (
          <strong>
            {match.winner
              ? `${match.prize_pool_total.toLocaleString()} TNB prize paid to ${getPlayerName(match, match.winner)}.`
              : 'Both players’ stakes have been refunded.'}
          </strong>
        )}
        <S.Actions>
          {side && (
            <S.Button disabled={!canAct} onClick={() => handleAction('rematch')} type="button">
              {busyAction === 'rematch' ? 'Creating…' : rematchLabel}
            </S.Button>
          )}
          <S.TextLink to="/checkers/home">Back to Checkers</S.TextLink>
        </S.Actions>
        {match.mode === 'human' && side && (
          <S.Small>
            A rematch uses the same stake and time limit. Your stake locks when you offer it; your opponent must accept
            again.
          </S.Small>
        )}
      </S.Result>
    );
  };

  return (
    <S.MatchContainer>
      <S.MatchNavigation>
        <S.TextLink to="/checkers/home">← Back to Checkers</S.TextLink>
        <S.Badge>Checkers {Number.isSafeInteger(id) ? `· Match ${id}` : ''}</S.Badge>
        <GameSoundToggle onToggle={toggleSound} soundEnabled={soundEnabled} />
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
            {(['white', 'black'] as const).map((playerSide) => (
              <S.MatchPlayer $active={status === 'active' && match.active_side === playerSide} key={playerSide}>
                <div>
                  <strong>
                    {getPlayerName(match, playerSide)}
                    {side === playerSide ? ' (you)' : ''}
                  </strong>
                  <S.Small>
                    {match.mode === 'computer' && playerSide === 'black'
                      ? `${match.difficulty} computer`
                      : `${playerSide === 'white' ? 'Ivory' : 'Charcoal'} pieces`}
                  </S.Small>
                </div>
                <S.Timer aria-label={`${getPlayerName(match, playerSide)} clock`}>{renderClock(playerSide)}</S.Timer>
              </S.MatchPlayer>
            ))}
          </S.PlayerGrid>
          <S.Actions style={{margin: '10px 0'}}>
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
              <S.TextLink to="/checkers/home">Find your next match →</S.TextLink>
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
