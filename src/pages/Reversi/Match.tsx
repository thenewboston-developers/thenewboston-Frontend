import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getReversiMatch, performReversiAction} from 'api/reversi';
import AuthButtons from 'components/AuthButtons';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import GameResultPanel, {GameResultActions, GameResultNote, getGameResultOutcome} from 'components/GameResultPanel';
import GameSoundToggle from 'components/GameSoundToggle';
import Loader from 'components/Loader';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import useArcadeSounds, {ArcadeSound} from 'hooks/useArcadeSounds';
import useGameEventSounds from 'hooks/useGameEventSounds';
import {getSelf} from 'selectors/state';
import {upsertReversiMatch} from 'store/reversi';
import {AppDispatch, RootState} from 'types';
import {ReversiAction, ReversiDifficulty, ReversiMatch, ReversiSide, ReversiState} from 'types/reversi';
import {isCancellationError} from 'utils/errors';
import {hasGuestGameSession, isCurrentGuestGame} from 'utils/guestGames';

import Board from './Board';
import Rules from './Rules';
import * as S from './Styles';
import {
  formatClock,
  getErrorMessage,
  getOpponent,
  getPlayerName,
  getPlayerSide,
  SIDE_LABELS,
  squareName,
} from './utils';

const CLOSED_STATUSES = ['finished', 'cancelled', 'declined', 'expired'];
const DIFFICULTY_LABELS: Record<ReversiDifficulty, string> = {easy: 'Easy', hard: 'Hard', normal: 'Normal'};
const RESULT_LABELS: Record<string, string> = {
  disk_count: 'Final count',
  draw: 'Final count',
  resignation: 'Resignation',
  timeout: 'Time expired',
};
const SIDES: ReversiSide[] = ['black', 'white'];

const COMPUTER_POLL_DELAY = 600;
const HIDDEN_POLL_DELAY = 10000;
const POLL_DELAY = 2000;

const isComputerToMove = (match: ReversiMatch): boolean => {
  return match.mode === 'computer' && match.status === 'active' && !!match.active_side && !match[match.active_side];
};

const Match = () => {
  const [actionError, setActionError] = useState('');
  const [busyAction, setBusyAction] = useState<ReversiAction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [resigning, setResigning] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [serverOffset, setServerOffset] = useState(0);
  const {matchId} = useParams();
  const {playSound, soundEnabled, toggleSound, unlockSound} = useArcadeSounds('reversi');
  const actionGeneration = useRef(0);
  const actionLock = useRef(false);
  const currentViewer = useRef('');
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(matchId);
  const isAuthenticated = useIsAuthenticated();
  const live = useRef(true);
  const matchSnapshot = useSelector((state: RootState) => (state.reversi as ReversiState | undefined)?.matchesById[id]);
  const navigate = useNavigate();
  const pollSoon = useRef<(() => void) | null>(null);
  const self = useSelector(getSelf);
  const isGuestSession = !isAuthenticated && hasGuestGameSession();
  // A cached guest game is only shown to the guest session that owns it.
  const match =
    matchSnapshot?.guest_mode && (!isGuestSession || !isCurrentGuestGame(matchSnapshot)) ? undefined : matchSnapshot;
  const status = match?.status;
  const viewerKey = `${id}:${isAuthenticated}:${self.id}`;
  currentViewer.current = viewerKey;

  const memberSide = isAuthenticated && match ? getPlayerSide(match, self.id) : null;
  const side = match?.guest_mode && isGuestSession ? (match.your_side ?? null) : memberSide;
  const isParticipant = !!side;
  const canAct = isParticipant && !busyAction && !loadError && !isLoading;
  const isHost = !!match && side === match.host_side;
  const isMyTurn = !!side && match?.active_side === side;
  const canMove = canAct && isMyTurn && match?.status === 'active';
  const modeLabel = match?.mode === 'computer' ? `${DIFFICULTY_LABELS[match.difficulty]} computer` : 'Head to head';

  const {observeSoundEvents, resetSoundEvents} = useGameEventSounds<ReversiMatch>(playSound, (previous, next) => {
    const sounds: ArcadeSound[] = [];
    if (next.last_move && next.move_count > previous.move_count)
      sounds.push(next.last_move.flipped.length ? 'flip' : 'move');
    if (
      next.status === 'finished' &&
      next.winner &&
      (next.guest_mode ? next.winner === next.your_side : isAuthenticated && next[next.winner]?.id === self.id)
    )
      sounds.push('win');
    return sounds;
  });

  const receiveMatch = useCallback(
    (data: ReversiMatch, silent = false) => {
      observeSoundEvents(data, silent);
      dispatch(upsertReversiMatch(data));
      setServerOffset(Date.parse(data.server_time) - Date.now());
      setLoadError('');
    },
    [dispatch, observeSoundEvents],
  );

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    // A different match or viewer makes any request still in flight irrelevant.
    actionGeneration.current += 1;
    actionLock.current = false;
    setBusyAction(null);
    resetSoundEvents();
    let hydrateSounds = true;
    const controller = new AbortController();
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    setIsLoading(true);
    setResigning(false);
    setActionError('');
    const load = async () => {
      let delay = POLL_DELAY;
      let shouldPoll = true;
      try {
        if (!Number.isSafeInteger(id) || id < 1) throw new Error('Invalid match');
        const data = await getReversiMatch(id, controller.signal);
        shouldPoll = !CLOSED_STATUSES.includes(data.status);
        if (isComputerToMove(data)) delay = COMPUTER_POLL_DELAY;
        if (mounted) {
          receiveMatch(data, hydrateSounds);
          hydrateSounds = false;
        }
      } catch (error) {
        hydrateSounds = true;
        if (mounted && !isCancellationError(error)) setLoadError(getErrorMessage(error));
      } finally {
        if (mounted) {
          setIsLoading(false);
          if (shouldPoll) timer = setTimeout(load, document.hidden ? HIDDEN_POLL_DELAY : delay);
        }
      }
    };
    pollSoon.current = () => {
      clearTimeout(timer);
      timer = setTimeout(load, COMPUTER_POLL_DELAY);
    };
    load();
    return () => {
      mounted = false;
      pollSoon.current = null;
      controller.abort();
      clearTimeout(timer);
    };
  }, [id, isAuthenticated, receiveMatch, resetSoundEvents, retryKey, self.id]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setResigning(false);
  }, [match?.version]);

  useEffect(() => {
    if (isAuthenticated && status && CLOSED_STATUSES.includes(status)) {
      dispatch(getAllUserWallets()).catch(() => undefined);
    }
  }, [dispatch, id, isAuthenticated, status]);

  const handleAction = async (action: ReversiAction, data: {column?: number; row?: number} = {}) => {
    if (!match || !canAct || actionLock.current) return;
    unlockSound();
    actionGeneration.current += 1;
    const generation = actionGeneration.current;
    const isCurrent = () =>
      live.current && currentViewer.current === viewerKey && actionGeneration.current === generation;
    actionLock.current = true;
    setBusyAction(action);
    setActionError('');
    try {
      const updated = await performReversiAction(match, action, data);
      if (!isCurrent()) return;
      receiveMatch(updated);
      // The computer answers within a moment, so do not wait for the regular poll to show its move.
      if (isComputerToMove(updated)) pollSoon.current?.();
      if (isAuthenticated && (action !== 'move' || updated.status === 'finished')) {
        dispatch(getAllUserWallets()).catch(() => undefined);
      }
      if (action === 'rematch') navigate(`/reversi/matches/${updated.id}`);
    } catch (error) {
      if (!isCurrent()) return;
      setActionError(getErrorMessage(error));
      try {
        const refreshed = await getReversiMatch(id);
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

  const handleSelect = (row: number, column: number) => {
    if (canMove) handleAction('move', {column, row});
  };

  const renderClock = (playerSide: ReversiSide) => {
    if (!match) return '';
    const stored = playerSide === 'black' ? match.clock_black_ms : match.clock_white_ms;
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
    const host = getPlayerName(match, match.host_side);
    return (
      <S.Panel>
        <S.TitleSmall>
          {isParticipant && !isHost ? `A challenge from ${host}` : 'Waiting for your opponent'}
        </S.TitleSmall>
        <S.Detail>
          {host} challenged {getPlayerName(match, getOpponent(match.host_side))} to a game of Reversi,{' '}
          {Math.round(match.time_limit_seconds / 60)} minutes per player.
          {side && ` You play ${SIDE_LABELS[side].toLowerCase()}. Black moves first.`}
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
        <S.Small>
          {match.stake_amount > 0
            ? 'Accepting locks your stake until this match ends. The winner takes both stakes and a draw returns them. An expired, declined, or cancelled challenge refunds the challenger.'
            : 'This is a free match. No coins will be taken.'}
        </S.Small>
        <S.Actions style={{marginTop: 20}}>
          {isParticipant && !isHost && (
            <>
              <S.Button disabled={!canAct} onClick={() => handleAction('accept')} type="button">
                {busyAction === 'accept' ? 'Accepting…' : acceptLabel}
              </S.Button>
              <S.Button $secondary disabled={!canAct} onClick={() => handleAction('decline')} type="button">
                Decline
              </S.Button>
            </>
          )}
          {isParticipant && isHost && (
            <S.Button $secondary disabled={!canAct} onClick={() => handleAction('cancel')} type="button">
              Cancel challenge
            </S.Button>
          )}
        </S.Actions>
      </S.Panel>
    );
  };

  const renderResult = () => {
    if (!match || match.status !== 'finished') return null;
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    const {winner} = match;
    return (
      <S.ResultWrap>
        <GameResultPanel
          description={
            <>
              {RESULT_LABELS[match.result_reason] ?? 'Game complete'} · Black {match.scores.black} – White{' '}
              {match.scores.white}
            </>
          }
          game="Reversi"
          outcome={getGameResultOutcome(winner, side)}
          title={winner ? `${getPlayerName(match, winner)} wins` : 'The game is a draw'}
        >
          {match.mode === 'computer' && isParticipant && (
            <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} />
          )}
          {match.prize_pool_total > 0 && (
            <strong>
              {winner
                ? `${match.prize_pool_total.toLocaleString()} TNB prize paid to ${getPlayerName(match, winner)}.`
                : `Each player’s ${match.stake_amount.toLocaleString()} TNB stake was returned.`}
            </strong>
          )}
          {isParticipant && (
            <GameResultActions>
              <S.Button disabled={!canAct} onClick={() => handleAction('rematch')} type="button">
                {busyAction === 'rematch' ? 'Creating…' : rematchLabel}
              </S.Button>
              <S.TextLink to="/reversi/home">Back to the lobby</S.TextLink>
            </GameResultActions>
          )}
          {match.mode === 'human' && isParticipant && (
            <GameResultNote>
              A rematch keeps the stake and time, and swaps colors. Both players must agree again.
            </GameResultNote>
          )}
        </GameResultPanel>
      </S.ResultWrap>
    );
  };

  const renderTurn = () => {
    if (!match || match.status !== 'active' || !match.active_side) return null;
    const mover = getPlayerName(match, match.active_side);
    const moverColor = SIDE_LABELS[match.active_side];
    let description = `Waiting for ${mover} to move.`;
    if (isComputerToMove(match)) description = 'The computer is thinking…';
    if (isMyTurn) description = 'Choose a highlighted square to place a disk.';
    const {last_move: lastMove} = match;
    return (
      <S.Status aria-live="polite">
        <div>
          <strong>{isMyTurn ? `Your turn · ${moverColor}` : `${mover}’s turn · ${moverColor}`}</strong>
          <S.Small>{description}</S.Small>
          {lastMove?.passed && (
            <S.Small>
              {SIDE_LABELS[lastMove.passed]} had no legal move, so {SIDE_LABELS[lastMove.side].toLowerCase()} plays
              again.
            </S.Small>
          )}
        </div>
        {lastMove && (
          <S.Badge>
            Last move · {SIDE_LABELS[lastMove.side]} {squareName(lastMove.row, lastMove.column)}
          </S.Badge>
        )}
        {busyAction === 'move' && <span role="status">Placing your disk…</span>}
      </S.Status>
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
  if (!match)
    return (
      <S.Container>
        <S.TextLink to="/reversi/home">← Reversi lobby</S.TextLink>
        <S.Error role="alert">{loadError || 'This match could not be found.'}</S.Error>
        <S.Button onClick={() => setRetryKey((key) => key + 1)} type="button">
          Try again
        </S.Button>
      </S.Container>
    );

  const total = match.scores.black + match.scores.white;

  return (
    <S.Container>
      <S.Navigation>
        <S.TextLink to="/reversi/home">← Reversi lobby</S.TextLink>
        <S.Badge>
          {isParticipant ? modeLabel : 'Spectating'} · {match.stake_amount ? 'TNB match' : 'Free play'}
        </S.Badge>
      </S.Navigation>
      <S.MatchHeader>
        <div>
          <S.Eyebrow>Reversi · Classic strategy</S.Eyebrow>
          <S.MatchTitle>
            {getPlayerName(match, 'black')} vs. {getPlayerName(match, 'white')}
          </S.MatchTitle>
          <S.Detail>
            {Math.round(match.time_limit_seconds / 60)} minutes per player
            {match.status === 'pending' && ' · Challenge pending'}
            {match.status === 'active' && ` · Move ${match.move_count + 1}`}
          </S.Detail>
        </div>
        <S.SoundControls>
          <GameSoundToggle onToggle={toggleSound} soundEnabled={soundEnabled} />
        </S.SoundControls>
      </S.MatchHeader>
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
        <S.MatchMain>
          {renderPending()}
          {['cancelled', 'declined', 'expired'].includes(match.status) && (
            <S.Result>
              <S.TitleSmall>Challenge {match.status}</S.TitleSmall>
              <S.Detail>
                {match.stake_amount ? 'The challenger’s stake has been refunded.' : 'No coins were taken.'}
              </S.Detail>
              <S.TextLink to="/reversi/home">Find your next match →</S.TextLink>
            </S.Result>
          )}
          {renderTurn()}
          {renderResult()}
          {['active', 'finished'].includes(match.status) && (
            <S.BoardWrap>
              <Board
                animationKey={match.version}
                board={match.board}
                key={match.id}
                lastMove={match.last_move}
                legalMoves={canMove ? match.legal_moves : []}
                onSelect={canMove ? handleSelect : undefined}
                turn={match.active_side}
              />
              {(canMove || match.last_move) && (
                <S.BoardLegend>
                  {canMove && <S.BoardLegendItem>Available move</S.BoardLegendItem>}
                  {match.last_move && <S.BoardLegendItem $last>Last move</S.BoardLegendItem>}
                </S.BoardLegend>
              )}
            </S.BoardWrap>
          )}
        </S.MatchMain>
        <S.Sidebar>
          <S.Panel>
            <S.Eyebrow>Disks on the board</S.Eyebrow>
            <S.List>
              {SIDES.map((playerSide) => (
                <S.Player $active={match.status === 'active' && match.active_side === playerSide} key={playerSide}>
                  <S.PlayerIdentity>
                    <S.PlayerPiece $side={playerSide} aria-hidden="true" />
                    <div>
                      <S.PlayerName>
                        {getPlayerName(match, playerSide)}
                        {side === playerSide ? ' (you)' : ''}
                      </S.PlayerName>
                      <S.Timer>{renderClock(playerSide)} remaining</S.Timer>
                      {match.status === 'active' && match.active_side === playerSide && (
                        <S.PlayerTurn>To move</S.PlayerTurn>
                      )}
                    </div>
                  </S.PlayerIdentity>
                  <S.Score aria-label={`${SIDE_LABELS[playerSide]} disks: ${match.scores[playerSide]}`}>
                    {match.scores[playerSide]}
                  </S.Score>
                </S.Player>
              ))}
            </S.List>
            <S.ScoreBar $black={total ? (match.scores.black / total) * 100 : 50} aria-hidden="true" />
            <S.Small>Each player’s clock covers the whole game and only runs on their turn.</S.Small>
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
                ? 'The winner takes the whole prize. A draw returns each stake.'
                : 'A free game. No coins are at stake.'}
            </S.Small>
          </S.Panel>
          {isParticipant && match.status === 'active' && (
            <S.Panel>
              {resigning ? (
                <>
                  <S.TitleSmall>Concede the match?</S.TitleSmall>
                  <S.Detail>
                    Your opponent wins the match
                    {match.stake_amount ? ` and the ${match.prize_pool_total.toLocaleString()} TNB prize` : ''}.
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
      </S.MatchGrid>
      <Rules />
    </S.Container>
  );
};

export default Match;
