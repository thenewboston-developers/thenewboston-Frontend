import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiFlagOutline, mdiSwapHorizontal} from '@mdi/js';
import Icon from '@mdi/react';

import {getHexMatch, performHexAction} from 'api/hex';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import GameResultPanel, {GameResultActions, GameResultNote, getGameResultOutcome} from 'components/GameResultPanel';
import GameSoundToggle from 'components/GameSoundToggle';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated, useWindowSize} from 'hooks';
import useArcadeSounds, {ArcadeSound} from 'hooks/useArcadeSounds';
import useGameEventSounds from 'hooks/useGameEventSounds';
import {getSelf} from 'selectors/state';
import {upsertHexMatch} from 'store/hex';
import {AppDispatch, RootState} from 'types';
import {HexAction, HexActionData, HexMatch, HexSide, HexState} from 'types/hex';
import {isCancellationError} from 'utils/errors';
import {isCurrentGuestGame} from 'utils/guestGames';

import Board from './Board';
import {HexSpinner, MiniBoard, ResultArtwork, RivalryEmblem, SideSeal} from './Emblems';
import Rules from './Rules';
import * as S from './Styles';
import {cellLabel, formatClock, getErrorMessage, getPlayerName, mirrorCell, SIDE_NAMES} from './utils';

// On a narrow screen held upright the board is drawn upright too, so that its cells stay large enough to tap.
const UPRIGHT_BOARD_WIDTH = 700;
// "Swap the opening" and the Cancel button that replaces it are equally wide, so pressing twice in one
// place always lands on Cancel and never on the confirmation next to it.
const SWAP_BUTTON_STYLE = {minWidth: 190};

const RESULT_LABELS: Record<string, string> = {
  connection: 'Both edges joined by an unbroken chain',
  resignation: 'Match ended by resignation',
  timeout: 'Player clock expired',
};

const opposite = (side: HexSide): HexSide => (side === 'red' ? 'blue' : 'red');

const Match = () => {
  const [actionError, setActionError] = useState('');
  const [busyAction, setBusyAction] = useState<HexAction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [resigning, setResigning] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [selection, setSelection] = useState<{version: number; cell: number} | null>(null);
  const [serverOffset, setServerOffset] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const {matchId} = useParams();
  const {playSound, soundEnabled, toggleSound, unlockSound} = useArcadeSounds('hex');
  const {height, width} = useWindowSize();
  const actionGeneration = useRef(0);
  const actionLock = useRef(false);
  const currentViewer = useRef<{id: number; userId?: number | null; authenticated: boolean}>({
    id: 0,
    authenticated: false,
  });
  const latestSnapshot = useRef<HexMatch | undefined>(undefined);
  const mounted = useRef(true);
  const receivedSnapshots = useRef<Record<string, {version: number; serverTime: number}>>({});
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(matchId);
  const isAuthenticated = useIsAuthenticated();
  const matchSnapshot = useSelector((state: RootState) => (state.hex as HexState | undefined)?.matchesById[id]);
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
  const canSwap = canMove && match.can_swap;
  const selected = match && selection?.version === match.version ? selection.cell : null;
  const preview = useMemo(() => (selected !== null && side ? {cell: selected, side} : null), [selected, side]);
  const selectHandler = useRef<(cell: number) => void>(() => undefined);

  const {observeSoundEvents, resetSoundEvents} = useGameEventSounds<HexMatch>(playSound, (previous, next) => {
    const sounds: ArcadeSound[] = [];
    if (next.last_move && next.move_count > previous.move_count) sounds.push(next.last_move.swap ? 'swap' : 'move');
    if (next.status === 'finished' && next.winner && next.winner === next.your_side) sounds.push('win');
    return sounds;
  });

  const receiveMatch = useCallback(
    (data: HexMatch, silent = false) => {
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
      dispatch(upsertHexMatch(data));
      setServerOffset(serverTime - Date.now());
      setLoadError('');
    },
    [dispatch, observeSoundEvents],
  );

  // The board is memoized, so it gets one function for its whole life that always runs the latest handler.
  const handleBoardSelect = useCallback((cell: number) => selectHandler.current(cell), []);

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
    setSwapping(false);
    setActionError('');
    const load = async () => {
      let shouldPoll = true;
      try {
        if (!Number.isSafeInteger(id) || id < 1) {
          shouldPoll = false;
          throw new Error('Invalid match');
        }
        const data = await getHexMatch(id, controller.signal);
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

  const getTimeLeft = (playerSide: HexSide) => {
    if (!match) return 0;
    const stored = playerSide === 'red' ? match.clock_red_ms : match.clock_blue_ms;
    const elapsed =
      match.status === 'active' && match.active_side === playerSide && match.turn_started_at
        ? Math.max(0, now + serverOffset - Date.parse(match.turn_started_at))
        : 0;
    return Math.max(0, stored - elapsed);
  };

  const handleAction = async (action: HexAction, data: HexActionData = {}) => {
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
      const updated = await performHexAction(match, action, data);
      if (!isCurrent()) return;
      receiveMatch(updated);
      if (
        isAuthenticated &&
        (['accept', 'cancel', 'decline', 'resign', 'rematch'].includes(action) || updated.status === 'finished')
      ) {
        dispatch(getAllUserWallets()).catch(() => undefined);
      }
      if (action === 'rematch') navigate(`/hex/matches/${updated.id}`);
      setSelection(null);
    } catch (error) {
      if (!isCurrent()) return;
      setActionError(getErrorMessage(error));
      try {
        const refreshed = await getHexMatch(id);
        if (isCurrent()) receiveMatch(refreshed, true);
      } catch (refreshError) {
        if (isCurrent()) setLoadError(getErrorMessage(refreshError));
      }
    } finally {
      if (generation === actionGeneration.current) actionLock.current = false;
      if (isCurrent()) {
        setBusyAction(null);
        setResigning(false);
        setSwapping(false);
      }
    }
  };

  const handleSelect = (cell: number) => {
    if (!canMove || !match || match.board[cell] !== 0) return;
    // Pressing the previewed cell a second time places the stone.
    if (selected === cell) handleAction('move', {cell});
    else {
      setSelection({version: match.version, cell});
      setSwapping(false);
    }
  };

  selectHandler.current = handleSelect;

  const renderBoard = () => {
    if (!match || !['active', 'finished'].includes(match.status)) return null;
    return (
      <Board
        activeSide={match.status === 'active' ? match.active_side : match.winner}
        board={match.board}
        disabled={!canMove}
        key={match.id}
        lastMove={match.last_move?.cell ?? null}
        onSelect={handleBoardSelect}
        portrait={width <= UPRIGHT_BOARD_WIDTH && height >= width}
        preview={preview}
        side={side ?? 'red'}
        size={match.board_size}
        winningPath={match.winning_path}
      />
    );
  };

  const renderClosed = () => {
    if (!match || !['cancelled', 'declined', 'expired'].includes(match.status)) return null;
    return (
      <S.Empty>
        <S.EmptyBoard>
          <MiniBoard size={match.board_size} />
        </S.EmptyBoard>
        <p>
          This challenge was {match.status}.{' '}
          {match.stake_amount ? 'The challenger’s stake has been refunded.' : 'No coins were taken.'}{' '}
          <S.TextLink to="/hex/home">Find your next match →</S.TextLink>
        </p>
      </S.Empty>
    );
  };

  const renderDetails = () => {
    if (!match) return null;
    const lastMove = ['active', 'finished'].includes(match.status) ? match.last_move : null;
    const size = match.board_size;
    return (
      <S.Details>
        {lastMove && (
          <S.LastMove aria-live="polite">
            <S.Stone $side={lastMove.side} aria-hidden="true" />
            {lastMove.swap
              ? `${getPlayerName(match, lastMove.side)} swapped the opening: the stone on ${cellLabel(
                  lastMove.from ?? lastMove.cell,
                  size,
                )} is now Blue’s, on ${cellLabel(lastMove.cell, size)}.`
              : `Last move: ${getPlayerName(match, lastMove.side)} · ${cellLabel(lastMove.cell, size)} · move ${
                  match.move_count
                }`}
          </S.LastMove>
        )}
        <S.Terms aria-label="Match terms">
          <li>
            {size} × {size} board
          </li>
          <li>{match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB per player` : 'Free play'}</li>
          {match.stake_amount > 0 && <li>{match.prize_pool_total.toLocaleString()} TNB in prize pool</li>}
        </S.Terms>
        {status === 'active' && side && (
          <S.Resign>
            {resigning ? (
              <>
                <S.ResignQuestion>
                  Resign and concede this match{match.stake_amount ? ' and your stake' : ''}?
                </S.ResignQuestion>
                <S.Actions>
                  <S.Button $danger disabled={!canAct} onClick={() => handleAction('resign')} type="button">
                    Confirm resignation
                  </S.Button>
                  <S.Button $secondary disabled={!canAct} onClick={() => setResigning(false)} type="button">
                    Keep playing
                  </S.Button>
                </S.Actions>
              </>
            ) : (
              <S.Button $secondary disabled={!canAct} onClick={() => setResigning(true)} type="button">
                <Icon aria-hidden path={mdiFlagOutline} size="18px" />
                Resign match
              </S.Button>
            )}
          </S.Resign>
        )}
      </S.Details>
    );
  };

  const renderPending = () => {
    if (!match || !side || status !== 'pending') return null;
    const acceptLabel = match.stake_amount
      ? `Accept · ${match.stake_amount.toLocaleString()} TNB`
      : 'Accept free match';
    return (
      <S.Pending $side={side}>
        <S.PendingLayout>
          <S.PendingCopy>
            <S.PendingHeader>
              <RivalryEmblem />
              <div>
                <S.Eyebrow>{side === 'blue' ? 'Challenge received' : 'Challenge sent'}</S.Eyebrow>
                <S.Title>
                  {side === 'blue' ? `A challenge from ${match.red.username}` : 'Waiting for your opponent'}
                </S.Title>
              </div>
            </S.PendingHeader>
            <S.Detail>
              {getPlayerName(match, 'red')} challenged {getPlayerName(match, 'blue')} to Hex on a {match.board_size} ×{' '}
              {match.board_size} board. Each player has {match.time_limit_seconds / 60} minutes of thinking time for the
              whole match. {getPlayerName(match, 'red')} is Red and moves first; {getPlayerName(match, 'blue')} is Blue
              and may swap the opening stone.
            </S.Detail>
            <S.Stats>
              <S.Stat>
                <dt>Stake per player</dt>
                <dd>{match.stake_amount.toLocaleString()} TNB</dd>
              </S.Stat>
              <S.Stat>
                <dt>Prize when accepted</dt>
                <dd>{(match.stake_amount * 2).toLocaleString()} TNB</dd>
              </S.Stat>
              <S.Stat>
                <dt>Invitation expires in</dt>
                <dd>{formatClock(Date.parse(match.expires_at!) - now - serverOffset)}</dd>
              </S.Stat>
            </S.Stats>
            <S.Notes>
              <S.Small>
                {match.stake_amount
                  ? 'Accepting locks your stake until the match ends. The winner receives both stakes. An expired, declined, or canceled invitation refunds the challenger.'
                  : 'This is a free match. No coins will be taken.'}
              </S.Small>
              <S.Small>
                Hex cannot end in a draw. Your clock begins when it is your turn, so be ready when the invitation is
                accepted.
              </S.Small>
            </S.Notes>
            <S.Actions>
              {side === 'blue' ? (
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
          </S.PendingCopy>
          <S.PendingBoard>
            <MiniBoard size={match.board_size} />
          </S.PendingBoard>
        </S.PendingLayout>
      </S.Pending>
    );
  };

  const renderPlayers = () => {
    if (!match) return null;
    const timeLimit = match.time_limit_seconds * 1000;
    return (
      <S.Players>
        {(['red', 'blue'] as const).map((playerSide) => {
          const active = status === 'active' && match.active_side === playerSide;
          const name = getPlayerName(match, playerSide);
          const timeLeft = getTimeLeft(playerSide);
          return (
            <S.MatchPlayer $active={active} $side={playerSide} key={playerSide}>
              <S.PlayerBody>
                <S.PlayerSeal>
                  <SideSeal ring={active ? 'still' : 'none'} />
                </S.PlayerSeal>
                <S.PlayerName>
                  {name}
                  {side === playerSide ? ' (you)' : ''}
                </S.PlayerName>
                <S.PlayerRole $active={active}>
                  {match.mode === 'computer' && playerSide === 'blue'
                    ? `Blue · ${match.difficulty} computer`
                    : `${SIDE_NAMES[playerSide]} · ${playerSide === 'red' ? 'moves first' : 'moves second'}`}
                </S.PlayerRole>
                <S.Timer $active={active} aria-label={`${name} clock`}>
                  {formatClock(timeLeft)}
                </S.Timer>
              </S.PlayerBody>
              <S.TimeLeft aria-hidden="true">
                <span style={{width: `${timeLimit ? Math.min(100, (timeLeft / timeLimit) * 100) : 0}%`}} />
              </S.TimeLeft>
            </S.MatchPlayer>
          );
        })}
      </S.Players>
    );
  };

  const renderResult = () => {
    if (!match || status !== 'finished' || !match.winner) return null;
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    return (
      <S.Result $side={match.winner}>
        <GameResultPanel
          artwork={<ResultArtwork connected={match.result_reason === 'connection'} side={match.winner} />}
          description={RESULT_LABELS[match.result_reason] ?? 'Match complete'}
          game="Hex"
          outcome={getGameResultOutcome(match.winner, side)}
          title={`${getPlayerName(match, match.winner)} wins the match`}
        >
          {match.mode === 'computer' && side === 'red' && (
            <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} subdued />
          )}
          {match.prize_pool_total > 0 && (
            <S.Prize>
              {match.prize_pool_total.toLocaleString()} TNB prize paid to {getPlayerName(match, match.winner)}.
            </S.Prize>
          )}
          <GameResultActions>
            {side && (
              <S.Button disabled={!canAct} onClick={() => handleAction('rematch')} type="button">
                {busyAction === 'rematch' ? 'Creating…' : rematchLabel}
              </S.Button>
            )}
            <S.TextLink to="/hex/home">Back to Hex</S.TextLink>
          </GameResultActions>
          {match.mode === 'human' && side && (
            <GameResultNote>
              A rematch uses the same board, stake, and time limit, and the player who offers it moves first. Your stake
              locks when you offer it; your opponent must accept again.
            </GameResultNote>
          )}
        </GameResultPanel>
      </S.Result>
    );
  };

  const renderTurn = () => {
    if (!match || status !== 'active' || !match.active_side) return null;
    const activeSide = match.active_side;
    const size = match.board_size;
    const lastMove = match.last_move;
    const opening = lastMove && !lastMove.swap && match.move_count === 1 ? lastMove.cell : null;
    const isOwnTurn = !!side && activeSide === side;
    const ownSide = side ?? 'red';
    const otherSide = opposite(ownSide);
    let instruction = `Choose any empty cell. Join the two ${ownSide} edges before ${getPlayerName(
      match,
      otherSide,
    )} joins the ${otherSide} ones.`;
    if (selected !== null)
      instruction = `Your stone is on ${cellLabel(selected, size)}. Press that cell again or confirm to place it.`;
    let waitingLabel =
      match.mode === 'computer' ? 'The computer is choosing its cell…' : 'Waiting for your opponent to move.';
    if (!side) waitingLabel = 'You are watching this match.';
    let ring: 'pulse' | 'still' | 'trace' = 'still';
    if (isOwnTurn) ring = 'pulse';
    else if (side) ring = 'trace';
    return (
      <S.TurnBar $side={activeSide} aria-live="polite">
        <S.TurnMarker>
          <SideSeal ring={ring} />
        </S.TurnMarker>
        <S.TurnCopy>
          <strong>
            {isOwnTurn ? `Your turn · ${SIDE_NAMES[ownSide]}` : `${getPlayerName(match, activeSide)}’s turn`}
          </strong>
          <S.TurnText>{isOwnTurn ? instruction : waitingLabel}</S.TurnText>
        </S.TurnCopy>
        {canSwap && opening !== null && (
          <S.SwapNote>
            <Icon aria-hidden path={mdiSwapHorizontal} size="18px" />
            <span>
              Swap rule: instead of placing a stone you may take over the opening stone on {cellLabel(opening, size)}.
              It becomes your blue stone on {cellLabel(mirrorCell(opening, size), size)}, and{' '}
              {getPlayerName(match, 'red')} moves next.
            </span>
          </S.SwapNote>
        )}
        {side && (
          <S.TurnActions>
            {swapping && (canSwap || busyAction === 'swap') ? (
              <>
                <S.Button
                  $secondary
                  disabled={!canSwap}
                  onClick={() => setSwapping(false)}
                  style={SWAP_BUTTON_STYLE}
                  type="button"
                >
                  Cancel
                </S.Button>
                <S.Button disabled={!canSwap} onClick={() => handleAction('swap')} type="button">
                  {busyAction === 'swap' ? 'Swapping…' : 'Confirm swap'}
                </S.Button>
              </>
            ) : (
              <>
                {canSwap && (
                  <S.Button
                    $secondary
                    onClick={() => {
                      setSelection(null);
                      setSwapping(true);
                    }}
                    style={SWAP_BUTTON_STYLE}
                    type="button"
                  >
                    <Icon aria-hidden path={mdiSwapHorizontal} size="18px" />
                    Swap the opening
                  </S.Button>
                )}
                {selected !== null && (
                  <S.Button $secondary disabled={!canMove} onClick={() => setSelection(null)} type="button">
                    Reset
                  </S.Button>
                )}
                <S.Button
                  disabled={!canMove || selected === null}
                  onClick={() => selected !== null && handleAction('move', {cell: selected})}
                  type="button"
                >
                  {busyAction === 'move' ? 'Placing…' : 'Confirm move'}
                </S.Button>
              </>
            )}
          </S.TurnActions>
        )}
      </S.TurnBar>
    );
  };

  return (
    <S.MatchContainer>
      <S.MatchNavigation>
        <S.TextLink to="/hex/home">← Back to Hex</S.TextLink>
        <S.Actions>
          <S.MatchBadge>Hex {Number.isSafeInteger(id) ? `· Match ${id}` : ''}</S.MatchBadge>
          <GameSoundToggle onToggle={toggleSound} soundEnabled={soundEnabled} />
        </S.Actions>
      </S.MatchNavigation>
      {loadError && (
        <S.Alert role="alert">
          <div>
            {loadError}
            <S.AlertNote>Moves are paused until the connection is restored. Match clocks continue to run.</S.AlertNote>
          </div>
          <S.GhostButton onClick={() => setRetryKey((value) => value + 1)} type="button">
            Reconnect
          </S.GhostButton>
        </S.Alert>
      )}
      {actionError && <S.Alert role="alert">{actionError}</S.Alert>}
      {isLoading && (
        <S.Status role="status">
          <HexSpinner />
          <span>Opening your match…</span>
        </S.Status>
      )}
      {match && (
        <S.Arena $side={side ?? 'red'}>
          {renderResult()}
          {renderPlayers()}
          {renderTurn()}
          <S.Main>
            {renderPending()}
            {renderBoard()}
            {renderClosed()}
            {renderDetails()}
          </S.Main>
        </S.Arena>
      )}
      <Rules />
    </S.MatchContainer>
  );
};

export default Match;
