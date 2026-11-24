import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getBattleshipMatch, performBattleshipAction} from 'api/battleship';
import AuthButtons from 'components/AuthButtons';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import Loader from 'components/Loader';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertBattleshipMatch} from 'store/battleship';
import {AppDispatch, RootState} from 'types';
import {
  BattleshipAction,
  BattleshipActionData,
  BattleshipMatch,
  BattleshipSide,
  BattleshipState,
  Cell,
  Ship,
  ShipId,
} from 'types/battleship';
import {isCancellationError} from 'utils/errors';

import Board from './Board';
import Rules from './Rules';
import * as S from './Styles';
import {
  canPlaceShip,
  cellLabel,
  FLEET,
  formatClock,
  getErrorMessage,
  getPlayerName,
  randomFleet,
  shipCells,
} from './utils';

const RESULT_LABELS: Record<string, string> = {
  fleet_sunk: 'All five ships sunk',
  resignation: 'Match ended by resignation',
  timeout: 'Player clock expired',
  placement_timeout: 'Fleet placement deadline expired',
  placement_abandoned: 'Neither player locked a fleet in time',
};

const Match = () => {
  const [actionError, setActionError] = useState('');
  const [busyAction, setBusyAction] = useState<BattleshipAction | null>(null);
  const [draft, setDraft] = useState<{id: number; ships: Ship[]}>({id: 0, ships: []});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [orientation, setOrientation] = useState<Ship['orientation']>('horizontal');
  const [resigning, setResigning] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [selectedShip, setSelectedShip] = useState<ShipId>('carrier');
  const [serverOffset, setServerOffset] = useState(0);
  const [target, setTarget] = useState<(Cell & {version: number}) | null>(null);
  const {matchId} = useParams();
  const actionLock = useRef(false);
  const actionGeneration = useRef(0);
  const currentViewer = useRef<{id: number; userId?: number | null; authenticated: boolean}>({
    id: 0,
    authenticated: false,
  });
  const latestSnapshot = useRef<BattleshipMatch | undefined>(undefined);
  const mounted = useRef(true);
  const receivedSnapshots = useRef<Record<string, {version: number; serverTime: number}>>({});
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(matchId);
  const isAuthenticated = useIsAuthenticated();
  const matchSnapshot = useSelector(
    (state: RootState) => (state.battleship as BattleshipState | undefined)?.matchesById[id],
  );
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  // Never render a cached private board for a different signed-in account.
  const match = matchSnapshot && matchSnapshot[matchSnapshot.your_side]?.id === self.id ? matchSnapshot : undefined;
  currentViewer.current = {id, userId: self.id, authenticated: isAuthenticated};
  latestSnapshot.current = match;
  const side = match?.your_side;
  const status = match?.status;
  const ownReady = side === 'host' ? match?.host_ready : match?.guest_ready;
  const canAct = isAuthenticated && !!match && !busyAction && !loadError && !isLoading;
  const canPlace = canAct && status === 'active' && match?.phase === 'placing' && !ownReady;
  const canFire = canAct && status === 'active' && match?.phase === 'battle' && match.active_side === side;
  const ships = draft.id === id ? draft.ships : [];
  const selectedTarget = target?.version === match?.version ? target : null;

  const receiveMatch = useCallback(
    (data: BattleshipMatch) => {
      if (
        !mounted.current ||
        !currentViewer.current.authenticated ||
        data[data.your_side]?.id !== currentViewer.current.userId
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
      dispatch(upsertBattleshipMatch(data));
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
    setTarget(null);
    if (!isAuthenticated) return undefined;
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
        const data = await getBattleshipMatch(id, controller.signal);
        shouldPoll = ['pending', 'active'].includes(data.status);
        if (polling) receiveMatch(data);
      } catch (error) {
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
  }, [id, isAuthenticated, receiveMatch, retryKey, self.id]);

  useEffect(() => {
    setDraft({id, ships: []});
    setSelectedShip('carrier');
    setOrientation('horizontal');
  }, [id, self.id]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated && status && !['pending', 'active'].includes(status)) {
      dispatch(getAllUserWallets()).catch(() => undefined);
    }
  }, [dispatch, id, isAuthenticated, status]);

  const handleAction = async (action: BattleshipAction, data: BattleshipActionData = {}) => {
    if (!match || !canAct || actionLock.current) return;
    actionGeneration.current += 1;
    const generation = actionGeneration.current;
    const viewerId = self.id;
    const isCurrent = () =>
      generation === actionGeneration.current &&
      mounted.current &&
      currentViewer.current.authenticated &&
      currentViewer.current.userId === viewerId &&
      currentViewer.current.id === id;
    actionLock.current = true;
    setBusyAction(action);
    setActionError('');
    try {
      const updated = await performBattleshipAction(match, action, data);
      if (!isCurrent()) return;
      receiveMatch(updated);
      if (['accept', 'cancel', 'decline', 'resign', 'rematch'].includes(action) || updated.status === 'finished') {
        dispatch(getAllUserWallets()).catch(() => undefined);
      }
      if (action === 'rematch') navigate(`/battleship/matches/${updated.id}`);
      setTarget(null);
    } catch (error) {
      if (!isCurrent()) return;
      setActionError(getErrorMessage(error));
      try {
        const refreshed = await getBattleshipMatch(id);
        if (isCurrent()) receiveMatch(refreshed);
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

  const handlePlace = (cell: Cell) => {
    if (!canPlace) return;
    const ship: Ship = {...cell, id: selectedShip, orientation};
    if (!canPlaceShip(ship, ships)) {
      setActionError(
        'That ship overlaps another ship or extends beyond the grid. Choose another position or rotate it.',
      );
      return;
    }
    const next = [...ships.filter(({id: shipId}) => shipId !== selectedShip), ship];
    setDraft({id, ships: next});
    setActionError('');
    const remaining = FLEET.find(({id: shipId}) => !next.some((placed) => placed.id === shipId));
    if (remaining) setSelectedShip(remaining.id);
  };

  const renderBattle = () => {
    if (!match || (match.phase !== 'battle' && status !== 'finished')) return null;
    const waitingLabel =
      match.mode === 'computer' ? 'The computer is scanning the waters…' : 'Waiting for your opponent to fire.';
    const targetLabel = selectedTarget ? `Fire at ${cellLabel(selectedTarget)}` : 'Select a target';
    const ownSunk = match.board.ships.filter((ship) =>
      shipCells(ship).every((cell) =>
        match.board.incoming_shots.some(
          (shot) => shot.row === cell.row && shot.column === cell.column && shot.result !== 'miss',
        ),
      ),
    ).length;
    return (
      <>
        {status === 'active' && (
          <S.Status aria-live="polite">
            <div>
              <strong>
                {match.active_side === side
                  ? 'Your turn. Choose your target.'
                  : `${getPlayerName(match, match.active_side!)}’s turn`}
              </strong>
              <S.Small>
                {match.active_side === side ? 'Select an untried square, then confirm your shot.' : waitingLabel}
              </S.Small>
            </div>
            <S.Button
              disabled={!canFire || !selectedTarget}
              onClick={() =>
                selectedTarget && handleAction('fire', {row: selectedTarget.row, column: selectedTarget.column})
              }
              type="button"
            >
              {busyAction === 'fire' ? 'Firing…' : targetLabel}
            </S.Button>
          </S.Status>
        )}
        {match.last_shot && (
          <S.Small aria-live="polite" style={{marginBottom: 16}}>
            {getPlayerName(match, match.last_shot.side)} fired at {cellLabel(match.last_shot)}:{' '}
            {match.last_shot.result === 'sunk'
              ? `sunk the ${match.last_shot.ship_id ?? 'ship'}`
              : match.last_shot.result}
            .
          </S.Small>
        )}
        <S.PanelGrid>
          <Board
            disabled={!canFire}
            label="Target waters"
            onSelect={(cell) => setTarget({...cell, version: match.version})}
            selected={selectedTarget}
            ships={match.board.opponent_sunk_ships}
            shots={match.board.shots}
            subtitle={`${match.board.opponent_sunk_ships.length} of 5 enemy ships sunk`}
          />
          <Board
            label="Your waters"
            ships={match.board.ships}
            shots={match.board.incoming_shots}
            subtitle={`${5 - ownSunk} ships afloat`}
          />
        </S.PanelGrid>
      </>
    );
  };

  const renderClock = (playerSide: BattleshipSide) => {
    if (!match) return '';
    const stored = playerSide === 'host' ? match.clock_host_ms : match.clock_guest_ms;
    const elapsed =
      match.status === 'active' && match.phase === 'battle' && match.active_side === playerSide && match.turn_started_at
        ? Math.max(0, now + serverOffset - Date.parse(match.turn_started_at))
        : 0;
    return formatClock(stored - elapsed);
  };

  const renderPending = () => {
    if (!match || status !== 'pending') return null;
    const acceptLabel = match.stake_amount
      ? `Accept · ${match.stake_amount.toLocaleString()} TNB`
      : 'Accept free match';
    return (
      <S.Panel>
        <S.TitleSmall>
          {side === 'guest' ? `A challenge from ${match.host.username}` : 'Waiting for your opponent'}
        </S.TitleSmall>
        <S.Detail>
          {getPlayerName(match, 'host')} challenged {getPlayerName(match, 'guest')} to Battleship. Each player has{' '}
          {match.time_limit_seconds / 60} minutes of thinking time after placing their fleet.
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
          After acceptance, both players have five minutes to lock their fleet. If only one is ready at the deadline,
          that player wins. If neither is ready, both stakes are refunded.
        </S.Small>
        <S.Actions style={{marginTop: 20}}>
          {side === 'guest' ? (
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

  const renderPlacement = () => {
    if (!match || status !== 'active' || match.phase !== 'placing') return null;
    const remaining = match.placement_deadline ? Date.parse(match.placement_deadline) - now - serverOffset : 0;
    return (
      <>
        <S.Status aria-live="polite">
          <div>
            <strong>{ownReady ? 'Fleet locked. Waiting for your opponent.' : 'Deploy your fleet'}</strong>
            <S.Small>
              {ownReady
                ? 'Your positions are set. Battle begins when both fleets are ready.'
                : 'Choose a ship, then select its starting square. Rotate to change direction.'}
            </S.Small>
          </div>
          <div>
            <S.Small>Placement deadline</S.Small>
            <S.Timer>{formatClock(remaining)}</S.Timer>
          </div>
        </S.Status>
        <S.PanelGrid>
          <Board
            disabled={!canPlace}
            label="Your waters"
            onSelect={handlePlace}
            placement={!ownReady ? {id: selectedShip, orientation} : undefined}
            ships={ownReady ? match.board.ships : ships}
            subtitle={ownReady ? 'Fleet locked' : `${ships.length} of 5 ships placed`}
          />
          <S.Panel>
            <S.TitleSmall>{ownReady ? 'Ready for battle' : 'Your fleet'}</S.TitleSmall>
            <S.Detail>
              {ownReady
                ? 'Keep this board open. Your fleet stays hidden from your opponent.'
                : 'Place all five ships. Ships may touch, but cannot overlap. Select a placed ship below to move it.'}
            </S.Detail>
            <S.Fleet>
              {FLEET.map((ship) => (
                <S.FleetButton
                  $secondary
                  $selected={ship.id === selectedShip && !ownReady}
                  aria-pressed={ship.id === selectedShip && !ownReady}
                  disabled={!canPlace}
                  key={ship.id}
                  onClick={() => setSelectedShip(ship.id)}
                  type="button"
                >
                  {ship.name} · {ship.length}
                  {ownReady || ships.some(({id: shipId}) => shipId === ship.id) ? ' ✓' : ''}
                </S.FleetButton>
              ))}
            </S.Fleet>
            {!ownReady && (
              <>
                <S.Actions>
                  <S.Button
                    $secondary
                    disabled={!canPlace}
                    onClick={() => setOrientation((value) => (value === 'horizontal' ? 'vertical' : 'horizontal'))}
                    type="button"
                  >
                    Rotate · {orientation === 'horizontal' ? 'Horizontal →' : 'Vertical ↓'}
                  </S.Button>
                  <S.Button
                    $secondary
                    disabled={!canPlace}
                    onClick={() => {
                      setDraft({id, ships: randomFleet()});
                      setActionError('');
                    }}
                    type="button"
                  >
                    Randomize fleet
                  </S.Button>
                  <S.Button
                    $secondary
                    disabled={!canPlace || !ships.length}
                    onClick={() => {
                      setDraft({id, ships: []});
                      setSelectedShip('carrier');
                    }}
                    type="button"
                  >
                    Clear
                  </S.Button>
                </S.Actions>
                <S.Small>Your ships cannot move after you lock the fleet.</S.Small>
                <S.Actions style={{marginTop: 20}}>
                  <S.Button
                    disabled={!canPlace || ships.length !== 5}
                    onClick={() => handleAction('place', {ships})}
                    type="button"
                  >
                    {busyAction === 'place' ? 'Locking fleet…' : 'Lock fleet & get ready'}
                  </S.Button>
                </S.Actions>
              </>
            )}
            <S.Small>
              If only one player locks their fleet before the deadline, that player wins. If neither does, both stakes
              are refunded.
            </S.Small>
            <S.Stat>
              <span>{getPlayerName(match, side === 'host' ? 'guest' : 'host')}</span>
              <strong>
                {(side === 'host' ? match.guest_ready : match.host_ready) ? 'Fleet ready' : 'Placing ships'}
              </strong>
            </S.Stat>
          </S.Panel>
        </S.PanelGrid>
      </>
    );
  };

  const renderResult = () => {
    if (!match || status !== 'finished') return null;
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    return (
      <S.Result role="status">
        <S.TitleSmall>
          {match.winner ? `${getPlayerName(match, match.winner)} wins the battle` : 'Match ended · stakes refunded'}
        </S.TitleSmall>
        <S.Detail>{RESULT_LABELS[match.result_reason] ?? 'Match complete'}</S.Detail>
        {match.mode === 'computer' && <ComputerRewardNotice reward={match.computer_reward} />}
        {match.prize_pool_total > 0 && (
          <strong>
            {match.winner
              ? `${match.prize_pool_total.toLocaleString()} TNB prize paid to ${getPlayerName(match, match.winner)}.`
              : 'Both players’ stakes have been refunded.'}
          </strong>
        )}
        <S.Actions>
          <S.Button disabled={!canAct} onClick={() => handleAction('rematch')} type="button">
            {busyAction === 'rematch' ? 'Creating…' : rematchLabel}
          </S.Button>
          <S.TextLink to="/battleship/home">Back to the harbor</S.TextLink>
        </S.Actions>
        {match.mode === 'human' && (
          <S.Small>
            A rematch uses the same stake and time limit. Your stake locks when you offer it; your opponent must accept
            again.
          </S.Small>
        )}
      </S.Result>
    );
  };

  if (!isAuthenticated)
    return (
      <S.Container>
        <S.TextLink to="/battleship/home">← Battleship</S.TextLink>
        <S.Panel style={{marginTop: 20}}>
          <S.TitleSmall>Sign in to open your match</S.TitleSmall>
          <S.Detail>Only the two players can view this private board.</S.Detail>
          <AuthButtons />
        </S.Panel>
      </S.Container>
    );

  return (
    <S.Container>
      <S.Navigation>
        <S.TextLink to="/battleship/home">← Back to the harbor</S.TextLink>
        <S.Badge>Battleship {Number.isSafeInteger(id) ? `· Match ${id}` : ''}</S.Badge>
      </S.Navigation>
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
          <S.PanelGrid>
            {(['host', 'guest'] as const).map((playerSide) => (
              <S.Player
                $active={status === 'active' && match.phase === 'battle' && match.active_side === playerSide}
                key={playerSide}
              >
                <div>
                  <strong>
                    {getPlayerName(match, playerSide)}
                    {side === playerSide ? ' (you)' : ''}
                  </strong>
                  <S.Small>
                    {match.mode === 'computer' && playerSide === 'guest'
                      ? `${match.difficulty} computer`
                      : 'Fleet commander'}
                  </S.Small>
                </div>
                <S.Timer aria-label={`${getPlayerName(match, playerSide)} clock`}>{renderClock(playerSide)}</S.Timer>
              </S.Player>
            ))}
          </S.PanelGrid>
          <S.Actions style={{margin: '16px 0'}}>
            <S.Badge>
              {match.stake_amount ? `${match.stake_amount.toLocaleString()} TNB per player` : 'Free play'}
            </S.Badge>
            {match.stake_amount > 0 && <S.Badge>{match.prize_pool_total.toLocaleString()} TNB in prize pool</S.Badge>}
          </S.Actions>
          {renderPending()}
          {renderResult()}
          {renderPlacement()}
          {renderBattle()}
          {['cancelled', 'declined', 'expired'].includes(match.status) && (
            <S.Empty>
              This challenge was {match.status}.{' '}
              {match.stake_amount ? 'The challenger’s stake has been refunded.' : 'No coins were taken.'}{' '}
              <S.TextLink to="/battleship/home">Find your next match →</S.TextLink>
            </S.Empty>
          )}
          {status === 'active' && (
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
    </S.Container>
  );
};

export default Match;
