import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {getBackgammonMatch, performBackgammonAction} from 'api/backgammon';
import AuthButtons from 'components/AuthButtons';
import ComputerRewardNotice from 'components/ComputerRewardNotice';
import Loader from 'components/Loader';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {upsertBackgammonMatch} from 'store/backgammon';
import {AppDispatch, RootState} from 'types';
import {BackgammonAction, BackgammonMatch, BackgammonMove, BackgammonSide, BackgammonState} from 'types/backgammon';
import {isCancellationError} from 'utils/errors';
import {hasGuestGameSession, isCurrentGuestGame} from 'utils/guestGames';

import Board from './Board';
import Dice from './Dice';
import Rules from './Rules';
import SoundToggle from './SoundToggle';
import * as S from './Styles';
import useGameSounds from './useGameSounds';
import usePresentation from './usePresentation';
import {
  formatClock,
  getErrorMessage,
  getPlayerName,
  getPlayerSide,
  matchingTurns,
  moveLabel,
  nextMoves,
  previewBoard,
} from './utils';

const RESULT_LABELS: Record<string, string> = {
  single: 'Single game',
  gammon: 'Gammon',
  backgammon: 'Backgammon',
  double_declined: 'Double declined',
  resignation: 'Resignation',
  timeout: 'Time expired',
};

const Match = () => {
  const [actionError, setActionError] = useState('');
  const [busyAction, setBusyAction] = useState<BackgammonAction | null>(null);
  const [draft, setDraft] = useState<{id: number; version: number; moves: BackgammonMove[]}>({
    id: 0,
    version: -1,
    moves: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [resigning, setResigning] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [selected, setSelected] = useState<number | 'bar' | null>(null);
  const [serverOffset, setServerOffset] = useState(0);
  const {matchId} = useParams();
  const actionLock = useRef(false);
  const actionGeneration = useRef(0);
  const currentViewer = useRef('');
  const dispatch = useDispatch<AppDispatch>();
  const id = Number(matchId);
  const isAuthenticated = useIsAuthenticated();
  const matchSnapshot = useSelector(
    (state: RootState) => (state.backgammon as BackgammonState | undefined)?.matchesById[id],
  );
  const live = useRef(true);
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const isGuestSession = !isAuthenticated && hasGuestGameSession();
  const match =
    matchSnapshot?.guest_mode && (!isGuestSession || !isCurrentGuestGame(matchSnapshot)) ? undefined : matchSnapshot;
  const status = match?.status;
  const viewerKey = `${id}:${isAuthenticated}:${self.id}`;
  currentViewer.current = viewerKey;
  const {playSound, soundEnabled, toggleSound, unlockSound} = useGameSounds();

  const memberSide = isAuthenticated && match ? getPlayerSide(match, self.id) : null;
  const side = match?.guest_mode && isGuestSession ? (match.your_side ?? null) : memberSide;
  const isParticipant = !!side;
  const modeLabel = match?.mode === 'computer' ? `${match.difficulty} computer` : 'Head to head';
  const canAct = isParticipant && !busyAction && !loadError && !isLoading;
  const isMyTurn = !!side && match?.active_side === side;
  const moves = match && draft.id === id && draft.version === match.version ? draft.moves : [];
  const legalTurns = match?.legal_turns ?? [];
  const availableMoves = nextMoves(legalTurns, moves);
  const canMove = canAct && isMyTurn && match?.phase === 'moving' && match?.status === 'active';
  const isComplete =
    legalTurns.length > 0 && matchingTurns(legalTurns, moves).some((turn) => turn.length === moves.length);
  const board = match ? previewBoard(match.board, match.active_side, moves) : null;

  const presentation = usePresentation(match, board, playSound);

  const receiveMatch = useCallback(
    (data: BackgammonMatch) => {
      dispatch(upsertBackgammonMatch(data));
      setServerOffset(Date.parse(data.server_time) - Date.now());
      setLoadError('');
    },
    [dispatch],
  );

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    actionGeneration.current += 1;
    actionLock.current = false;
    setBusyAction(null);
    const controller = new AbortController();
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    setIsLoading(true);
    setResigning(false);
    setActionError('');
    const load = async () => {
      let shouldPoll = true;
      try {
        if (!Number.isSafeInteger(id) || id < 1) throw new Error('Invalid match');
        const data = await getBackgammonMatch(id, controller.signal);
        shouldPoll = !['finished', 'cancelled', 'declined', 'expired'].includes(data.status);
        if (mounted) receiveMatch(data);
      } catch (error) {
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
    setSelected(null);
    setResigning(false);
  }, [match?.version]);

  useEffect(() => {
    if (isAuthenticated && status && ['finished', 'cancelled', 'declined', 'expired'].includes(status)) {
      dispatch(getAllUserWallets()).catch(() => undefined);
    }
  }, [dispatch, id, isAuthenticated, status]);

  const handleAction = async (action: BackgammonAction, data: {accept?: boolean; moves?: BackgammonMove[]} = {}) => {
    if (!match || !canAct || actionLock.current) return;
    actionGeneration.current += 1;
    const generation = actionGeneration.current;
    const isCurrent = () =>
      live.current && currentViewer.current === viewerKey && actionGeneration.current === generation;
    actionLock.current = true;
    setBusyAction(action);
    setActionError('');
    try {
      const updated = await performBackgammonAction(match, action, data);
      if (!isCurrent()) return;
      receiveMatch(updated);
      if (
        isAuthenticated &&
        (['accept', 'cancel', 'decline', 'resign', 'rematch'].includes(action) || updated.status === 'finished')
      ) {
        dispatch(getAllUserWallets()).catch(() => undefined);
      }
      if (action === 'rematch') navigate(`/backgammon/matches/${updated.id}`);
    } catch (error) {
      if (!isCurrent()) return;
      setActionError(getErrorMessage(error));
      try {
        const refreshed = await getBackgammonMatch(id);
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

  const handleMove = (move: BackgammonMove) => {
    if (!match || !canMove) return;
    setDraft({id, version: match.version, moves: [...moves, move]});
    setSelected(null);
  };

  const handleSelect = (point: number | 'bar' | 'off') => {
    if (!canMove) return;
    const destination = availableMoves.find((move) => move.from === selected && move.to === point);
    if (destination) {
      handleMove(destination);
      return;
    }
    if (point !== 'off' && availableMoves.some((move) => move.from === point)) setSelected(point);
  };

  const renderClock = (playerSide: BackgammonSide) => {
    if (!match) return '';
    const stored = playerSide === 'white' ? match.clock_white_ms : match.clock_black_ms;
    const elapsed =
      match.status === 'active' && match.clock_side === playerSide && match.turn_started_at
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
    return (
      <S.Panel>
        <S.TitleSmall>
          {side === 'black' ? `A challenge from ${match.white.username}` : 'Waiting for your opponent'}
        </S.TitleSmall>
        <S.Detail>
          {getPlayerName(match, 'white')} challenged {getPlayerName(match, 'black')} to a match. First to{' '}
          {match.target_score} points, {Math.round(match.time_limit_seconds / 60)} minutes per player for the whole
          match.
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
            ? 'Accepting locks your stake until this match ends. The cube changes points only; your stake never increases. An expired, declined, or cancelled challenge refunds the challenger.'
            : 'This is a free match. No coins will be taken.'}
        </S.Small>
        <S.Actions style={{marginTop: 20}}>
          {side === 'black' && (
            <>
              <S.Button disabled={!canAct} onClick={() => handleAction('accept')} type="button">
                {busyAction === 'accept' ? 'Accepting…' : acceptLabel}
              </S.Button>
              <S.Button $secondary disabled={!canAct} onClick={() => handleAction('decline')} type="button">
                Decline
              </S.Button>
            </>
          )}
          {side === 'white' && (
            <S.Button $secondary disabled={!canAct} onClick={() => handleAction('cancel')} type="button">
              Cancel challenge
            </S.Button>
          )}
        </S.Actions>
      </S.Panel>
    );
  };

  const renderResult = () => {
    if (!match || !['between_games', 'finished'].includes(match.status)) return null;
    const finished = match.status === 'finished';
    const rematchLabel = match.mode === 'computer' ? 'Play again' : 'Offer rematch';
    const winner = finished ? match.winner : match.game_winner;
    const title = winner
      ? `${getPlayerName(match, winner)} wins ${finished ? 'the match' : 'the game'}`
      : 'Game complete';
    const nextSeconds = match.next_game_at
      ? Math.max(0, Math.ceil((Date.parse(match.next_game_at) - now - serverOffset) / 1000))
      : null;
    return (
      <S.Result role="status">
        <S.TitleSmall>{title}</S.TitleSmall>
        <Dice
          animate={presentation.animateDice}
          dice={presentation.dice}
          label={presentation.diceLabel}
          rollKey={presentation.rollKey}
        />
        <S.Detail>
          {RESULT_LABELS[match.result_reason] ?? 'Game complete'} · {match.scores.white}–{match.scores.black}
          {!finished ? ` · ${match.result_points} point${match.result_points === 1 ? '' : 's'}` : ''}
        </S.Detail>
        {finished && match.mode === 'computer' && isParticipant && (
          <ComputerRewardNotice guest={match.guest_mode} reward={match.computer_reward} />
        )}
        {finished && match.prize_pool_total > 0 && (
          <strong>
            {match.prize_pool_total.toLocaleString()} TNB prize paid to{' '}
            {winner ? getPlayerName(match, winner) : 'the winner'}.
          </strong>
        )}
        {!finished && (
          <S.Detail>
            {nextSeconds !== null
              ? `The next game starts automatically ${nextSeconds > 0 ? `in ${nextSeconds} seconds` : 'shortly'}.`
              : 'Ready for the next game?'}{' '}
            Your remaining match time carries over.
          </S.Detail>
        )}
        {isParticipant && (
          <S.Actions>
            {finished ? (
              <S.Button disabled={!canAct} onClick={() => handleAction('rematch')} type="button">
                {busyAction === 'rematch' ? 'Creating…' : rematchLabel}
              </S.Button>
            ) : (
              <S.Button disabled={!canAct} onClick={() => handleAction('next-game')} type="button">
                Next game →
              </S.Button>
            )}
            <S.TextLink to="/backgammon/home">Back to the club</S.TextLink>
          </S.Actions>
        )}
        {finished && match.mode === 'human' && isParticipant && (
          <S.Small>A rematch uses the same match length and stake. Both players must agree again.</S.Small>
        )}
      </S.Result>
    );
  };

  const renderTurn = () => {
    if (!match || match.status !== 'active') return null;
    const responding = match.phase === 'doubling' && side !== match.double_offered_by;
    const confirmLabel = legalTurns[0]?.length === 0 ? 'Pass turn' : 'Confirm turn';
    let title = isMyTurn ? 'Your turn' : `${getPlayerName(match, match.active_side)}’s turn`;
    let description = isMyTurn
      ? 'Roll the dice, or offer a double before rolling.'
      : 'The board updates as the game progresses.';
    if (match.phase === 'moving') {
      if (canMove && availableMoves.length)
        description =
          selected === null
            ? 'Choose a highlighted checker, then its destination.'
            : 'Choose a destination, or use a move below.';
      else if (canMove && isComplete)
        description = moves.length
          ? 'Your turn is ready. Confirm to send your moves.'
          : 'No legal moves. Confirm to pass the turn.';
      else
        description =
          match.mode === 'computer' && match.active_side === 'black'
            ? 'The computer is thinking…'
            : 'Waiting for the player to finish their turn.';
    }
    if (match.phase === 'doubling') {
      title = `${getPlayerName(match, match.double_offered_by!)} offers a double`;
      description = `Accept to play this game for ${match.cube_value * 2} points, or decline and concede ${match.cube_value} point${match.cube_value === 1 ? '' : 's'}. The TNB prize stays fixed.`;
    }
    return (
      <>
        <S.Status aria-live="polite">
          <div>
            <strong>{title}</strong>
            <S.Small>{description}</S.Small>
          </div>
          <Dice
            animate={presentation.animateDice}
            dice={presentation.dice}
            label={presentation.diceLabel}
            moves={match.phase === 'moving' ? moves : []}
            rolling={busyAction === 'roll'}
            rollKey={presentation.rollKey}
          />
        </S.Status>
        <S.Actions>
          {canAct && isMyTurn && match.phase === 'awaiting_roll' && (
            <S.Button onClick={() => handleAction('roll')} type="button">
              Roll dice
            </S.Button>
          )}
          {match.can_double && (
            <S.Button $secondary disabled={!canAct} onClick={() => handleAction('double')} type="button">
              Offer double · {match.cube_value * 2}×
            </S.Button>
          )}
          {responding && isParticipant && (
            <>
              <S.Button disabled={!canAct} onClick={() => handleAction('respond-double', {accept: true})} type="button">
                Accept double
              </S.Button>
              <S.Button
                $secondary
                disabled={!canAct}
                onClick={() => handleAction('respond-double', {accept: false})}
                type="button"
              >
                Decline · concede game
              </S.Button>
            </>
          )}
          {isMyTurn && isParticipant && match.phase === 'moving' && (
            <>
              <S.Button disabled={!canMove || !isComplete} onClick={() => handleAction('move', {moves})} type="button">
                {busyAction === 'move' ? 'Confirming…' : confirmLabel}
              </S.Button>
              <S.Button
                $secondary
                disabled={!canMove || !moves.length}
                onClick={() => {
                  setDraft({id, version: match.version, moves: moves.slice(0, -1)});
                  setSelected(null);
                }}
                type="button"
              >
                Undo move
              </S.Button>
            </>
          )}
          {busyAction && <span role="status">Updating the game…</span>}
        </S.Actions>
        {canMove && availableMoves.length > 0 && (
          <S.Rules open>
            <summary>
              {selected === null
                ? 'Available moves'
                : `Moves from ${selected === 'bar' ? 'the bar' : `point ${selected + 1}`}`}
            </summary>
            <S.Actions style={{marginTop: 12}}>
              {availableMoves
                .filter((move) => selected === null || move.from === selected)
                .map((move) => (
                  <S.MoveButton
                    $secondary
                    key={`${move.from}-${move.to}-${move.die}`}
                    onClick={() => handleMove(move)}
                    type="button"
                  >
                    {moveLabel(move)}
                  </S.MoveButton>
                ))}
            </S.Actions>
          </S.Rules>
        )}
        {!!moves.length && (
          <S.Small>Preview: {moves.map(moveLabel).join(' / ')}. Moves are sent only when you confirm.</S.Small>
        )}
      </>
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
        <S.TextLink to="/backgammon/home">← Backgammon club</S.TextLink>
        <S.Error role="alert">{loadError || 'This match could not be found.'}</S.Error>
        <S.Button onClick={() => setRetryKey((key) => key + 1)} type="button">
          Try again
        </S.Button>
      </S.Container>
    );

  return (
    <S.Container onKeyDownCapture={unlockSound} onPointerDownCapture={unlockSound}>
      <S.Navigation>
        <S.TextLink to="/backgammon/home">← Backgammon club</S.TextLink>
        <S.Actions>
          <SoundToggle onToggle={toggleSound} soundEnabled={soundEnabled} />
          <S.Badge>
            {isParticipant ? modeLabel : 'Spectating'} · {match.stake_amount ? 'TNB match' : 'Free play'}
          </S.Badge>
        </S.Actions>
      </S.Navigation>
      <S.MatchTitle>
        {getPlayerName(match, 'white')} vs. {getPlayerName(match, 'black')}
      </S.MatchTitle>
      <S.Detail>
        First to {match.target_score}
        {match.game_number > 0 && ` · Game ${match.game_number}`}
        {match.status === 'pending' && ' · Challenge pending'}
        {match.is_crawford ? ' · Crawford game: cube disabled' : ''}
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
              <S.TextLink to="/backgammon/home">Find your next match →</S.TextLink>
            </S.Result>
          )}
          {match.game_number > 0 && board && (
            <S.BoardFrame>
              <Board
                board={board}
                key={`${match.id}-${match.game_number}`}
                nextMoves={canMove ? availableMoves : []}
                onSelect={canMove ? handleSelect : undefined}
                perspective={side ?? 'white'}
                selected={selected}
              />
            </S.BoardFrame>
          )}
          {renderTurn()}
          {renderResult()}
        </div>
        <S.Sidebar>
          <S.Panel>
            <S.Eyebrow>Match score</S.Eyebrow>
            <S.List>
              {(['white', 'black'] as BackgammonSide[]).map((playerSide) => (
                <S.Player $active={match.status === 'active' && match.active_side === playerSide} key={playerSide}>
                  <S.PlayerIdentity>
                    <S.PlayerPiece $side={playerSide} />
                    <div>
                      <S.PlayerName>
                        {getPlayerName(match, playerSide)}
                        {side === playerSide ? ' (you)' : ''}
                      </S.PlayerName>
                      <S.Timer>{renderClock(playerSide)} remaining</S.Timer>
                    </div>
                  </S.PlayerIdentity>
                  <S.Score>{match.scores[playerSide]}</S.Score>
                </S.Player>
              ))}
            </S.List>
            <S.Small>Total time for the entire match. Paused between games.</S.Small>
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
            <S.Stat>
              <span>Doubling cube</span>
              <strong>{match.cube_value}× points</strong>
            </S.Stat>
            <S.Stat>
              <span>Cube owner</span>
              <strong>{match.cube_owner ? getPlayerName(match, match.cube_owner) : 'Centered'}</strong>
            </S.Stat>
            <S.Small>The cube changes game points only. The TNB prize is fixed for the whole match.</S.Small>
          </S.Panel>
          {isParticipant && ['active', 'between_games'].includes(match.status) && (
            <S.Panel>
              {resigning ? (
                <>
                  <S.TitleSmall>Concede the match?</S.TitleSmall>
                  <S.Detail>
                    Your opponent wins the entire match
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
