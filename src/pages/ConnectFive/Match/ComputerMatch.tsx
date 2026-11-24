import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {
  createConnectFiveComputerMatch,
  getConnectFiveMatch,
  resignConnectFiveMatch,
  submitConnectFiveMove,
} from 'api/connectFive';
import Button, {ButtonColor} from 'components/Button';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import GameResultPanel, {GameResultActions, getGameResultOutcome} from 'components/GameResultPanel';
import GameSoundToggle from 'components/GameSoundToggle';
import {getAllUserWallets} from 'dispatchers/wallets';
import {ConnectFiveMatchStatus, ConnectFiveMoveType, ConnectFiveSpecialType} from 'enums';
import {upsertMatch} from 'store/connectFive';
import {AppDispatch, ConnectFiveMatch, ConnectFiveMatchPlayer, SFC} from 'types';
import {isOlderConnectFiveMatch} from 'utils/connectFive';

import * as SidebarStyles from './Sidebar/Styles';
import Board from './Board';
import PieceToolbar from './PieceToolbar';
import PlayerInfo from './PlayerInfo';
import ResignModal from './ResignModal';
import ResultModal from './ResultModal';
import * as S from './Styles';
import useMatchSounds from './useMatchSounds';

const MOVE_TO_SPECIAL: Record<ConnectFiveMoveType, ConnectFiveSpecialType | null> = {
  SINGLE: null,
  H2: ConnectFiveSpecialType.H2,
  V2: ConnectFiveSpecialType.V2,
  BOMB: ConnectFiveSpecialType.BOMB,
};

const formatClock = (milliseconds: number) => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

const inventoryCount = (player: ConnectFiveMatchPlayer | null, special: ConnectFiveSpecialType): number => {
  if (!player) return 0;
  return {BOMB: player.inventory_bomb, H2: player.inventory_h2, V2: player.inventory_v2}[special];
};

const previewCells = (type: ConnectFiveMoveType, x: number, y: number) => {
  const cells = [{x, y}];
  if (type === ConnectFiveMoveType.H2) cells.push({x: x + 1, y});
  if (type === ConnectFiveMoveType.V2) cells.push({x, y: y + 1});
  return cells;
};

const ComputerMatch: SFC<{match: ConnectFiveMatch}> = ({className, match}) => {
  const [activeMoveType, setActiveMoveType] = useState<ConnectFiveMoveType>(ConnectFiveMoveType.SINGLE);
  const [connectionError, setConnectionError] = useState('');
  const [error, setError] = useState('');
  const [hover, setHover] = useState<{x: number; y: number} | null>(null);
  const [now, setNow] = useState(Date.now());
  const [pending, setPending] = useState<'move' | 'resign' | 'rematch' | null>(null);
  const [resignOpen, setResignOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [serverOffset, setServerOffset] = useState(Date.parse(match.server_time) - Date.now());
  const [soundReady, setSoundReady] = useState(false);
  const actionLock = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const latest = useRef(match);
  const live = useRef(true);
  const navigate = useNavigate();
  const rematchRequest = useRef<string | null>(null);
  const {id} = match;
  const selfId = match.player_a.id;
  const {soundEnabled, toggleSound} = useMatchSounds(match, soundReady && !connectionError, selfId);
  const active = match.status === ConnectFiveMatchStatus.ACTIVE;
  const myTurn = active && match.active_side === 'a';
  const canAct = !pending && !connectionError;
  const humanInventory = match.players.find(({user}) => user?.id === selfId) ?? null;
  const computerInventory = match.players.find(({user}) => user === null) ?? null;
  if (!isOlderConnectFiveMatch(latest.current, match)) latest.current = match;

  const receive = useCallback(
    (data: ConnectFiveMatch) => {
      if (!live.current || isOlderConnectFiveMatch(latest.current.id === data.id ? latest.current : undefined, data))
        return;
      latest.current = data;
      dispatch(upsertMatch({match: data, selfId}));
      setServerOffset(Date.parse(data.server_time) - Date.now());
      setConnectionError('');
    },
    [dispatch, selfId],
  );

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let polling = true;
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      let again = true;
      try {
        const data = await getConnectFiveMatch(id, {mine: 'self'}, controller.signal);
        if (!polling) return;
        receive(data);
        again = data.status === ConnectFiveMatchStatus.ACTIVE;
      } catch {
        if (polling) setConnectionError('Connection lost. Reconnecting to your game…');
      } finally {
        if (polling) {
          setSoundReady(true);
          if (again) timer = setTimeout(load, document.hidden ? 10000 : 2000);
        }
      }
    };
    load();
    return () => {
      polling = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [id, receive, retryKey]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (active) return;
    setResultOpen(true);
    if (!match.guest_mode) dispatch(getAllUserWallets()).catch(() => undefined);
  }, [active, dispatch, match.guest_mode]);

  const isValidMove = (x: number, y: number) =>
    previewCells(activeMoveType, x, y).every((cell) => {
      if (cell.x < 0 || cell.x >= 15 || cell.y < 0 || cell.y >= 15) return false;
      const value = match.board_state[cell.y][cell.x];
      return activeMoveType === ConnectFiveMoveType.BOMB ? value === 2 : value === 0;
    });
  const cells = hover && myTurn && canAct ? previewCells(activeMoveType, hover.x, hover.y) : [];
  const preview = {cells, isValid: !!hover && myTurn && canAct && isValidMove(hover.x, hover.y)};

  const handleMove = async (x: number, y: number) => {
    if (!myTurn || !canAct || actionLock.current || !isValidMove(x, y)) return;
    const special = MOVE_TO_SPECIAL[activeMoveType];
    if (special && !inventoryCount(humanInventory, special)) return;
    actionLock.current = true;
    setPending('move');
    setError('');
    try {
      const updated = await submitConnectFiveMove(id, {
        expected_version: match.version,
        move_type: activeMoveType,
        x,
        y,
      });
      if (!live.current) return;
      receive(updated);
      setHover(null);
      if (special && !inventoryCount(updated.players.find(({user}) => user?.id === selfId) ?? null, special))
        setActiveMoveType(ConnectFiveMoveType.SINGLE);
    } catch {
      if (!live.current) return;
      setError('That move could not be applied. Refreshing the board; please try again.');
      try {
        receive(await getConnectFiveMatch(id, {mine: 'self'}));
      } catch {
        if (live.current) setConnectionError('Unable to refresh the board. Reconnecting…');
      }
    } finally {
      actionLock.current = false;
      if (live.current) setPending(null);
    }
  };

  const handleRematch = async () => {
    if (active || !canAct || actionLock.current) return;
    actionLock.current = true;
    setPending('rematch');
    setError('');
    if (!rematchRequest.current) rematchRequest.current = crypto.randomUUID();
    try {
      const updated = await createConnectFiveComputerMatch({
        request_id: rematchRequest.current,
        difficulty: match.difficulty,
        time_limit_seconds: match.time_limit_seconds,
        rematch_of: id,
      });
      if (!live.current) return;
      receive(updated);
      navigate(`/connect-five/matches/${updated.id}`);
    } catch {
      if (live.current) setError('Unable to start another game. Please try again.');
    } finally {
      actionLock.current = false;
      if (live.current) setPending(null);
    }
  };

  const handleResign = async () => {
    if (!active || !canAct || actionLock.current) return;
    actionLock.current = true;
    setPending('resign');
    setError('');
    try {
      const updated = await resignConnectFiveMatch(id, match.version);
      if (!live.current) return;
      receive(updated);
      setResignOpen(false);
    } catch {
      if (live.current) {
        setError('Unable to resign. Refreshing the board; please try again.');
        setRetryKey((value) => value + 1);
      }
    } finally {
      actionLock.current = false;
      if (live.current) setPending(null);
    }
  };

  const renderClock = (side: 'a' | 'b') => {
    const base = side === 'a' ? match.clock_a_remaining_ms : match.clock_b_remaining_ms;
    const elapsed =
      active && match.active_side === side ? Math.max(0, now + serverOffset - Date.parse(match.turn_started_at)) : 0;
    return formatClock(base - elapsed);
  };

  let outcome = 'Match complete';
  if (match.winner_side === 'a') outcome = 'You beat the computer!';
  if (match.winner_side === 'b') outcome = 'Computer wins';
  const turnLabel = myTurn ? 'Your turn. Place a piece or use a special.' : 'The computer is thinking…';

  return (
    <S.Container className={className}>
      <S.SoundControls>
        <GameSoundToggle onToggle={toggleSound} soundEnabled={soundEnabled} />
      </S.SoundControls>
      {connectionError && (
        <S.MatchInfo role="alert">
          {connectionError}
          <Button color={ButtonColor.secondary} onClick={() => setRetryKey((value) => value + 1)} text="Reconnect" />
        </S.MatchInfo>
      )}
      {error && <S.MatchInfo role="alert">{error}</S.MatchInfo>}
      <S.MatchLayout>
        <S.BoardSection>
          <S.PlayerRow>
            <PlayerInfo computerDifficulty={match.difficulty} player={null} playerSide="white" />
            <PieceToolbar
              activeMoveType={activeMoveType}
              getInventoryCount={inventoryCount}
              isInteractive={false}
              matchPlayer={computerInventory}
              moveToSpecialType={MOVE_TO_SPECIAL}
              onToolSelect={setActiveMoveType}
              playerSide="white"
            />
            <S.Clock $isActive={active && match.active_side === 'b'}>{renderClock('b')}</S.Clock>
          </S.PlayerRow>
          <Board
            bombBlastKeys={new Set()}
            bombBlastPieces={{}}
            bombBlastSequence={0}
            boardState={match.board_state}
            directSelection={myTurn && canAct}
            isSpectator={!myTurn || !canAct}
            lastMoveKeys={new Set()}
            lastMoveSequence={match.turn_number}
            onCellClick={handleMove}
            onCellHover={(x, y) => setHover({x, y})}
            onCellLeave={() => setHover(null)}
            previewKeys={new Set(cells.map(({x, y}) => `${x}-${y}`))}
            previewState={preview}
            previewVariant="black"
            winningKeys={new Set()}
          />
          <S.PlayerRow>
            <PlayerInfo player={match.player_a} playerSide="black" />
            <PieceToolbar
              activeMoveType={activeMoveType}
              getInventoryCount={inventoryCount}
              isInteractive={myTurn && canAct}
              matchPlayer={humanInventory}
              moveToSpecialType={MOVE_TO_SPECIAL}
              onToolSelect={setActiveMoveType}
              playerSide="black"
            />
            <S.Clock $isActive={myTurn}>{renderClock('a')}</S.Clock>
          </S.PlayerRow>
        </S.BoardSection>
        <SidebarStyles.Sidebar>
          {active ? (
            <S.MatchInfo>
              <S.PanelTitle>Computer game</S.PanelTitle>
              <S.PanelSubtitle>{match.difficulty} difficulty · Free play · ELO unchanged</S.PanelSubtitle>
              <p aria-live="polite">{turnLabel}</p>
              <p>
                Both players begin with two of each special. Connect five in a row to win. Paid purchases are disabled.
              </p>
              <Button
                color={ButtonColor.danger}
                disabled={!canAct}
                onClick={() => setResignOpen(true)}
                text="Resign match"
              />
            </S.MatchInfo>
          ) : (
            <GameResultPanel
              description={`${match.difficulty} difficulty · Free play · ELO unchanged`}
              game="Connect Five"
              outcome={match.status === 'cancelled' ? 'complete' : getGameResultOutcome(match.winner_side, 'a')}
              title={outcome}
            >
              <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} />
              <GameResultActions>
                <Button
                  disabled={!canAct}
                  isSubmitting={pending === 'rematch'}
                  onClick={handleRematch}
                  text="Play again"
                />
              </GameResultActions>
            </GameResultPanel>
          )}
        </SidebarStyles.Sidebar>
      </S.MatchLayout>
      <ResultModal
        canRequestRematch={!active}
        isOpen={resultOpen}
        isRematchSubmitting={pending === 'rematch'}
        match={match}
        onClose={() => setResultOpen(false)}
        onRematchAccept={() => undefined}
        onRematchCancel={() => undefined}
        onRematchDecline={() => undefined}
        onRematchRequest={handleRematch}
        rematchAction={pending === 'rematch' ? 'request' : null}
        rematchViewState="idle"
        resultOutcomeLabel={outcome}
        resultTnbDelta={0}
        selfId={selfId}
        showInsufficientFunds={false}
        tnbDeltaTarget={null}
      />
      <ResignModal
        isOpen={resignOpen}
        isResigning={pending === 'resign'}
        isSpectator={false}
        onClose={() => setResignOpen(false)}
        onConfirm={handleResign}
      />
    </S.Container>
  );
};

export default ComputerMatch;
