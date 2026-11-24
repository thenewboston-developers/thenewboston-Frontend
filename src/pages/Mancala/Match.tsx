import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getMancalaMatch, performMancalaAction} from 'api/mancala';
import AuthButtons from 'components/AuthButtons';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import GameSoundToggle from 'components/GameSoundToggle';
import Loader from 'components/Loader';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import useArcadeSounds from 'hooks/useArcadeSounds';
import {getSelf} from 'selectors/state';
import {upsertMancalaMatch} from 'store/mancala';
import {AppDispatch, RootState} from 'types';
import {MancalaAction, MancalaMatch, MancalaSide, MancalaState} from 'types/mancala';
import {isCancellationError} from 'utils/errors';
import {hasGuestGameSession, isCurrentGuestGame} from 'utils/guestGames';

import Board from './Board';
import Rules from './Rules';
import * as S from './Styles';
import usePresentation from './usePresentation';
import {describeMove, formatClock, getErrorMessage, getPlayerName, getPlayerSide, STORE} from './utils';

const CLOSED = ['finished', 'cancelled', 'declined', 'expired'];
const RESULT_LABELS: Record<string, string> = {
  draw: 'Stores level',
  resignation: 'Resignation',
  stones: 'Most stones',
  timeout: 'Time expired',
};

const Match = () => {
  const [actionError, setActionError] = useState('');
  const [busyAction, setBusyAction] = useState<MancalaAction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [pendingPit, setPendingPit] = useState<number | null>(null);
  const [resigning, setResigning] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [serverOffset, setServerOffset] = useState(0);
  const {matchId} = useParams();
  const {playSound, soundEnabled, toggleSound} = useArcadeSounds('mancala');
  const actionGeneration = useRef(0);
  const actionLock = useRef(false);
  const currentViewer = useRef('');
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(matchId);
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const matchSnapshot = useSelector((state: RootState) => (state.mancala as MancalaState | undefined)?.matchesById[id]);
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const isGuestSession = !isAuthenticated && hasGuestGameSession();
  // A guest game is private: never show a cached one to an account or to another guest session
  const match =
    matchSnapshot?.guest_mode && (!isGuestSession || !isCurrentGuestGame(matchSnapshot)) ? undefined : matchSnapshot;
  const status = match?.status;
  const viewerKey = `${id}:${isAuthenticated}:${self.id}`;
  currentViewer.current = viewerKey;

  // A member is recognised by their own account, never by what a cached snapshot said about an earlier viewer
  const memberSide = isAuthenticated && match ? getPlayerSide(match, self.id) : null;
  const side = match?.guest_mode && isGuestSession ? (match.your_side ?? null) : memberSide;
  const presentation = usePresentation(match, playSound, side);
  const {resetPresentation} = presentation;
  const isParticipant = !!side;
  const canAct = isParticipant && !busyAction && !loadError && !isLoading;
  const isMyTurn = !!side && match?.active_side === side;
  const canMove = canAct && isMyTurn && status === 'active' && !presentation.isBusy;
  const board = presentation.board ?? match?.board;

  const receiveMatch = useCallback(
    (data: MancalaMatch, silent = false) => {
      if (silent) resetPresentation(data);
      dispatch(upsertMancalaMatch(data));
      setServerOffset(Date.parse(data.server_time) - Date.now());
      setLoadError('');
    },
    [dispatch, resetPresentation],
  );

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    // Another match or another viewer: nothing still in flight may touch this page
    actionGeneration.current += 1;
    actionLock.current = false;
    setBusyAction(null);
    setPendingPit(null);
    const controller = new AbortController();
    let hydratePresentation = true;
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    setIsLoading(true);
    setResigning(false);
    setActionError('');
    const load = async () => {
      let shouldPoll = true;
      try {
        if (!Number.isSafeInteger(id) || id < 1) throw new Error('Invalid match');
        const data = await getMancalaMatch(id, controller.signal);
        shouldPoll = !CLOSED.includes(data.status);
        if (mounted) {
          receiveMatch(data, hydratePresentation);
          hydratePresentation = false;
        }
      } catch (error) {
        hydratePresentation = true;
        if (mounted && !isCancellationError(error)) setLoadError(getErrorMessage(error));
      } finally {
        if (mounted) {
          setIsLoading(false);
          if (shouldPoll) timer = setTimeout(load, document.hidden ? 10000 : 2000);
        }
      }
    };
    load();
    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [id, isAuthenticated, receiveMatch, retryKey, self.id]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setResigning(false);
  }, [match?.version]);

  useEffect(() => {
    if (isAuthenticated && status && CLOSED.includes(status)) dispatch(getAllUserWallets()).catch(() => undefined);
  }, [dispatch, id, isAuthenticated, status]);

  const handleAction = async (action: MancalaAction, data: {pit?: number} = {}) => {
    if (!match || !canAct || actionLock.current) return;
    actionGeneration.current += 1;
    const generation = actionGeneration.current;
    const isCurrent = () =>
      live.current && currentViewer.current === viewerKey && actionGeneration.current === generation;
    actionLock.current = true;
    setBusyAction(action);
    setPendingPit(data.pit ?? null);
    setActionError('');
    try {
      const updated = await performMancalaAction(match, action, data);
      if (!isCurrent()) return;
      receiveMatch(updated);
      // A guest has no wallet to refresh
      if (isAuthenticated && (action !== 'move' || updated.status === 'finished')) {
        dispatch(getAllUserWallets()).catch(() => undefined);
      }
      if (action === 'rematch') navigate(`/mancala/matches/${updated.id}`);
    } catch (error) {
      if (!isCurrent()) return;
      setActionError(getErrorMessage(error));
      try {
        const refreshed = await getMancalaMatch(id);
        if (isCurrent()) receiveMatch(refreshed, true);
      } catch (refreshError) {
        if (isCurrent()) setLoadError(getErrorMessage(refreshError));
      }
    } finally {
      if (generation === actionGeneration.current) actionLock.current = false;
      if (isCurrent()) {
        setBusyAction(null);
        setPendingPit(null);
        setResigning(false);
      }
    }
  };

  const renderClock = (playerSide: MancalaSide) => {
    if (!match) return '';
    const stored = playerSide === 'host' ? match.clock_host_ms : match.clock_guest_ms;
    const elapsed =
      match.status === 'active' && match.active_side === playerSide && match.turn_started_at
        ? Math.max(0, now + serverOffset - Date.parse(match.turn_started_at))
        : 0;
    return formatClock(stored - elapsed);
  };

  const renderPending = () => {
    if (!match || match.status !== 'pending') return null;
    const acceptLabel = match.stake_amount
      ? `Accept · ${match.stake_amount.toLocaleString()} TNB`
      : 'Accept free match';
    const expiry = match.expires_at ? Math.max(0, Date.parse(match.expires_at) - now - serverOffset) : 0;
    let stakeNote = 'This is a free match. No coins will be taken.';
    if (match.stake_amount > 0)
      stakeNote =
        side === 'host'
          ? 'Your stake is locked. It is refunded if the challenge is cancelled, declined, or expires. Once accepted, the winner receives both stakes and a draw returns them.'
          : 'Accepting locks your stake until this match ends. The winner receives both stakes and a draw returns them. An expired, declined, or cancelled challenge refunds the challenger.';
    return (
      <S.Panel>
        <S.TitleSmall>
          {side === 'guest' ? `A challenge from ${match.host.username}` : 'Waiting for your opponent'}
        </S.TitleSmall>
        <S.Detail>
          {getPlayerName(match, 'host')} challenged {getPlayerName(match, 'guest')} to a game of Mancala,{' '}
          {Math.round(match.time_limit_seconds / 60)} minutes per player. Who moves first is picked at random.
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
          <span>Challenge expires in</span>
          <strong>{formatClock(expiry)}</strong>
        </S.Stat>
        <S.Small>{stakeNote}</S.Small>
        <S.Actions style={{marginTop: 20}}>
          {side === 'guest' && (
            <>
              <S.Button disabled={!canAct} onClick={() => handleAction('accept')} type="button">
                {busyAction === 'accept' ? 'Accepting…' : acceptLabel}
              </S.Button>
              <S.Button $secondary disabled={!canAct} onClick={() => handleAction('decline')} type="button">
                Decline
              </S.Button>
            </>
          )}
          {side === 'host' && (
            <S.Button $secondary disabled={!canAct} onClick={() => handleAction('cancel')} type="button">
              Cancel challenge
            </S.Button>
          )}
        </S.Actions>
      </S.Panel>
    );
  };

  const renderTurn = () => {
    if (!match || !board || (match.status !== 'active' && !presentation.isBusy)) return null;
    const {frame} = presentation;
    let title = '';
    let description = '';
    if (frame) {
      title = frame.side === side ? 'Sowing your stones' : `${getPlayerName(match, frame.side)} is sowing`;
      description = frame.hand ? `${frame.hand} still in hand.` : 'Last stone down.';
      if (frame.kind === 'capture') description = 'Capture! Both pits go to the store.';
      if (frame.kind === 'sweep') description = 'A row is empty. The stones left over go to their owner.';
    } else if (match.active_side) {
      const again = match.last_move?.extra_turn && match.last_move.side === match.active_side;
      const name = getPlayerName(match, match.active_side);
      if (isMyTurn) {
        title = again ? 'You play again' : 'Your turn';
        description = 'Choose one of your pits to sow its stones.';
      } else {
        title = again ? `${name} plays again` : `${name}’s turn`;
        description = isParticipant ? `Waiting for ${name} to move.` : 'The board updates as the game progresses.';
        if (match.mode === 'computer') description = 'The computer is thinking…';
      }
    }
    if (!title) return null;
    return (
      <S.TurnBanner $yours={!frame && isMyTurn} aria-live="polite">
        <div>
          <strong>{title}</strong>
          <S.Small>{description}</S.Small>
        </div>
        {busyAction && <span role="status">Updating the game…</span>}
      </S.TurnBanner>
    );
  };

  const renderResult = () => {
    if (!match || match.status !== 'finished' || presentation.isBusy) return null;
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    const title = match.winner ? `${getPlayerName(match, match.winner)} wins` : 'It’s a draw';
    return (
      <S.Result role="status">
        <S.TitleSmall>{title}</S.TitleSmall>
        <S.Detail>
          {RESULT_LABELS[match.result_reason] ?? 'Game complete'} · {match.board[STORE.host]}–{match.board[STORE.guest]}
        </S.Detail>
        {match.mode === 'computer' && isParticipant && (
          <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} />
        )}
        {match.prize_pool_total > 0 && (
          <strong>
            {match.winner
              ? `${match.prize_pool_total.toLocaleString()} TNB prize paid to ${getPlayerName(match, match.winner)}.`
              : `Both stakes of ${match.stake_amount.toLocaleString()} TNB were returned.`}
          </strong>
        )}
        {isParticipant && (
          <S.Actions>
            <S.Button disabled={!canAct} onClick={() => handleAction('rematch')} type="button">
              {busyAction === 'rematch' ? 'Creating…' : rematchLabel}
            </S.Button>
            <S.TextLink to="/mancala/home">Back to the table</S.TextLink>
          </S.Actions>
        )}
        {match.mode === 'human' && isParticipant && (
          <S.Small>A rematch uses the same clock and stake. Both players must agree again.</S.Small>
        )}
      </S.Result>
    );
  };

  if (!match && isLoading)
    return (
      <S.Container>
        <S.Status role="status">
          <Loader />
          <S.Detail>Setting the board…</S.Detail>
        </S.Status>
      </S.Container>
    );
  if (!match || !board)
    return (
      <S.Container>
        <S.TextLink to="/mancala/home">← Mancala table</S.TextLink>
        <S.Error role="alert">{loadError || 'This match could not be found.'}</S.Error>
        <S.Button onClick={() => setRetryKey((key) => key + 1)} type="button">
          Try again
        </S.Button>
      </S.Container>
    );

  const modeLabel = match.mode === 'computer' ? `${match.difficulty} computer` : 'Head to head';
  const names = {host: getPlayerName(match, 'host'), guest: getPlayerName(match, 'guest')};
  const started = match.status === 'active' || match.status === 'finished';
  // Newest first, and never a move whose stones are still to be shown
  const moves = (match.recent_moves ?? []).filter(({version}) => version <= presentation.shownVersion).reverse();

  return (
    <S.Container>
      <S.Navigation>
        <S.TextLink to="/mancala/home">← Mancala table</S.TextLink>
        <S.Actions>
          <S.Badge>
            {isParticipant ? modeLabel : 'Spectating'} · {match.stake_amount ? 'TNB match' : 'Free play'}
          </S.Badge>
          <GameSoundToggle onToggle={toggleSound} soundEnabled={soundEnabled} />
        </S.Actions>
      </S.Navigation>
      <S.MatchTitle>
        {names.host} vs. {names.guest}
      </S.MatchTitle>
      <S.Detail>
        {Math.round(match.time_limit_seconds / 60)} minutes per player
        {match.status === 'pending' && ' · Challenge pending'}
      </S.Detail>
      {loadError && (
        <S.Error role="alert">
          Connection interrupted. {loadError} Controls will return when the board reconnects.
        </S.Error>
      )}
      {actionError && <S.Error role="alert">{actionError}</S.Error>}
      {!isAuthenticated && !isParticipant && (
        <S.Status>
          <S.Detail>You’re watching this match. Sign in to start your own.</S.Detail>
          <AuthButtons />
        </S.Status>
      )}
      <S.MatchGrid>
        <div>
          {renderPending()}
          {['cancelled', 'declined', 'expired'].includes(match.status) && (
            <S.Result>
              <S.TitleSmall>Challenge {match.status}</S.TitleSmall>
              <S.Detail>
                {match.stake_amount ? 'The challenger’s stake has been refunded.' : 'No coins were taken.'}
              </S.Detail>
              <S.TextLink to="/mancala/home">Find your next match →</S.TextLink>
            </S.Result>
          )}
          {started && (
            <>
              <Board
                board={board}
                canPlay={canMove}
                frame={presentation.frame}
                lastMove={match.last_move}
                names={names}
                onPlay={(pit) => handleAction('move', {pit})}
                pendingPit={pendingPit}
                viewerSide={side}
              />
              <S.BoardCaption>
                Stones travel counter-clockwise: left to right along the near row, into the store on the right, then
                back along the far row.
              </S.BoardCaption>
            </>
          )}
          {renderTurn()}
          {renderResult()}
        </div>
        {/* A challenge that has not started has no board, clocks, or prize pool to report yet */}
        {started && (
          <S.Sidebar>
            <S.Panel>
              <S.Eyebrow>Stores</S.Eyebrow>
              <S.List>
                {(['host', 'guest'] as MancalaSide[]).map((playerSide) => (
                  <S.Player $active={match.status === 'active' && match.active_side === playerSide} key={playerSide}>
                    <S.PlayerIdentity>
                      <S.PlayerName>
                        {names[playerSide]}
                        {side === playerSide ? ' (you)' : ''}
                      </S.PlayerName>
                      <S.Timer>{renderClock(playerSide)} remaining</S.Timer>
                    </S.PlayerIdentity>
                    <S.Score>{board[STORE[playerSide]]}</S.Score>
                  </S.Player>
                ))}
              </S.List>
              <S.Small>Each clock covers the whole match and runs only on that player’s turns.</S.Small>
            </S.Panel>
            <S.Panel>
              <S.Eyebrow>On the table</S.Eyebrow>
              <S.Stat>
                <span>Match prize</span>
                <strong>{match.prize_pool_total.toLocaleString()} TNB</strong>
              </S.Stat>
              <S.Stat>
                <span>Stake per player</span>
                <strong>{match.stake_amount.toLocaleString()} TNB</strong>
              </S.Stat>
              <S.Small>
                {match.stake_amount
                  ? 'The winner receives both stakes. A draw returns them.'
                  : 'A free match. No coins are at stake.'}
              </S.Small>
            </S.Panel>
            {moves.length > 0 && (
              <S.Panel>
                <S.Eyebrow>Latest moves</S.Eyebrow>
                <S.Log>
                  {moves.map((move) => (
                    <li key={move.version}>{describeMove(match, move)}</li>
                  ))}
                </S.Log>
              </S.Panel>
            )}
            {isParticipant && match.status === 'active' && (
              <S.Panel>
                {resigning ? (
                  <>
                    <S.TitleSmall>Concede the match?</S.TitleSmall>
                    <S.Detail>
                      Your opponent wins
                      {match.stake_amount ? ` the ${match.prize_pool_total.toLocaleString()} TNB prize` : ' the match'}.
                    </S.Detail>
                    <S.Actions style={{marginTop: 16}}>
                      <S.Button $danger disabled={!canAct} onClick={() => handleAction('resign')} type="button">
                        Concede match
                      </S.Button>
                      <S.Button $secondary disabled={!!busyAction} onClick={() => setResigning(false)} type="button">
                        Keep playing
                      </S.Button>
                    </S.Actions>
                  </>
                ) : (
                  <S.Button $secondary disabled={!canAct} onClick={() => setResigning(true)} type="button">
                    Resign match
                  </S.Button>
                )}
              </S.Panel>
            )}
          </S.Sidebar>
        )}
      </S.MatchGrid>
      <Rules />
    </S.Container>
  );
};

export default Match;
