import {ComponentType, SVGProps, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {mdiArrowDownBold, mdiArrowUpBold, mdiMinus, mdiStar} from '@mdi/js';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  declineConnectFiveChallenge,
  getConnectFiveChallenge,
  getConnectFiveMatch,
  getConnectFiveRematchStatus,
  purchaseConnectFiveSpecial,
  requestConnectFiveRematch,
  submitConnectFiveMove,
} from 'api/connectFive';
import Badge, {BadgeStyle} from 'components/Badge';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import EmptyText from 'components/EmptyText';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import {ModalBody, ModalFooter} from 'components/Modal';
import PrizePoolBreakdown from 'components/PrizePoolBreakdown';
import {
  ConnectFiveChallengeStatus,
  ConnectFiveMatchStatus,
  ConnectFiveMoveType,
  ConnectFiveSpecialType,
  ToastType,
} from 'enums';
import {getConnectFiveChallengesById, getConnectFiveMatchesById, getSelf} from 'selectors/state';
import {upsertChallenge, upsertMatch} from 'store/connectFive';
import {AppDispatch, ConnectFiveMatch, ConnectFiveMatchPlayer, ConnectFiveRematchStatus, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import {ReactComponent as BombIcon} from './assets/bomb.svg';
import {ReactComponent as Horizontal2Icon} from './assets/horizontal2.svg';
import {ReactComponent as SingleIcon} from './assets/single.svg';
import {ReactComponent as Vertical2Icon} from './assets/vertical2.svg';
import * as S from './Styles';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type PlayerSide = 'black' | 'white';

type RematchAction = 'accept' | 'cancel' | 'decline' | 'request';
type RematchViewState = 'accepted' | 'cancelled' | 'declined' | 'idle' | 'requestedByMe' | 'requestedByOpponent';

const BOARD_SIZE = 15;

const SPECIAL_PRICES: Record<ConnectFiveSpecialType, number> = {
  [ConnectFiveSpecialType.BOMB]: 3,
  [ConnectFiveSpecialType.H2]: 4,
  [ConnectFiveSpecialType.V2]: 4,
};

const TOOL_LABELS: Record<ConnectFiveMoveType, string> = {
  [ConnectFiveMoveType.BOMB]: 'Bomb',
  [ConnectFiveMoveType.H2]: 'Horizontal 2',
  [ConnectFiveMoveType.SINGLE]: 'Single',
  [ConnectFiveMoveType.V2]: 'Vertical 2',
};

const TOOL_ICONS: Record<ConnectFiveMoveType, IconComponent> = {
  [ConnectFiveMoveType.BOMB]: BombIcon,
  [ConnectFiveMoveType.H2]: Horizontal2Icon,
  [ConnectFiveMoveType.SINGLE]: SingleIcon,
  [ConnectFiveMoveType.V2]: Vertical2Icon,
};

const ORDERED_MOVE_TYPES: ConnectFiveMoveType[] = [
  ConnectFiveMoveType.SINGLE,
  ConnectFiveMoveType.H2,
  ConnectFiveMoveType.V2,
  ConnectFiveMoveType.BOMB,
];

const ORDERED_SPECIAL_TYPES: ConnectFiveSpecialType[] = [
  ConnectFiveSpecialType.H2,
  ConnectFiveSpecialType.V2,
  ConnectFiveSpecialType.BOMB,
];

const SPECIAL_LABELS: Record<ConnectFiveSpecialType, string> = {
  [ConnectFiveSpecialType.BOMB]: 'Bomb',
  [ConnectFiveSpecialType.H2]: 'Horizontal 2',
  [ConnectFiveSpecialType.V2]: 'Vertical 2',
};

const SPECIAL_ICONS: Record<ConnectFiveSpecialType, IconComponent> = {
  [ConnectFiveSpecialType.BOMB]: BombIcon,
  [ConnectFiveSpecialType.H2]: Horizontal2Icon,
  [ConnectFiveSpecialType.V2]: Vertical2Icon,
};

const MOVE_TO_SPECIAL_TYPE: Record<ConnectFiveMoveType, ConnectFiveSpecialType | null> = {
  [ConnectFiveMoveType.BOMB]: ConnectFiveSpecialType.BOMB,
  [ConnectFiveMoveType.H2]: ConnectFiveSpecialType.H2,
  [ConnectFiveMoveType.SINGLE]: null,
  [ConnectFiveMoveType.V2]: ConnectFiveSpecialType.V2,
};

const BOMB_SHARD_CONFIG = [
  {delay: 0.02, offsetX: -34, offsetY: -32, size: 10},
  {delay: 0.06, offsetX: 38, offsetY: -18, size: 8},
  {delay: 0.12, offsetX: -42, offsetY: 14, size: 9},
  {delay: 0.08, offsetX: 22, offsetY: 42, size: 7},
  {delay: 0.14, offsetX: -12, offsetY: 46, size: 6},
  {delay: 0.04, offsetX: 44, offsetY: 18, size: 9},
];

const getCellKey = (x: number, y: number): string => `${x}-${y}`;

const getEloSnapshot = (match: ConnectFiveMatch | null, userId?: number | null) => {
  if (!match || !userId) return null;

  const isPlayerA = match.player_a.id === userId;
  const before = isPlayerA ? match.player_a_elo_before : match.player_b_elo_before;
  const after = isPlayerA ? match.player_a_elo_after : match.player_b_elo_after;

  if (before === null || after === null) return null;

  return {after, before, delta: after - before};
};

const getEloVariant = (delta: number) => {
  if (delta > 0) return 'up';
  if (delta < 0) return 'down';
  return 'equal';
};

const getInventoryCount = (player: ConnectFiveMatchPlayer | null, specialType: ConnectFiveSpecialType): number => {
  if (!player) return 0;

  const mapping: Record<ConnectFiveSpecialType, number> = {
    [ConnectFiveSpecialType.BOMB]: player.inventory_bomb,
    [ConnectFiveSpecialType.H2]: player.inventory_h2,
    [ConnectFiveSpecialType.V2]: player.inventory_v2,
  };

  return mapping[specialType];
};

const getMatchPlayer = (match: ConnectFiveMatch | null, userId?: number | null): ConnectFiveMatchPlayer | null => {
  if (!match || !userId) return null;
  return match.players.find((player) => player.user.id === userId) || null;
};

const getPlayerSide = (match: ConnectFiveMatch | null, userId?: number | null): PlayerSide | null => {
  if (!match || !userId) return null;
  return match.player_a.id === userId ? 'black' : 'white';
};

const getPlayerLabel = (player: {connect_five_elo: number | null; username: string}) => {
  if (typeof player.connect_five_elo !== 'number') return player.username;
  return `${player.username} (${player.connect_five_elo})`;
};

const getSpendProgress = (player: ConnectFiveMatchPlayer | null, maxSpendAmount: number) => {
  const spent = player?.spent_total ?? 0;
  const remaining = player?.remaining_spend ?? Math.max(maxSpendAmount - spent, 0);
  const percentage = maxSpendAmount > 0 ? Math.min((spent / maxSpendAmount) * 100, 100) : 0;

  return {percentage, remaining, spent};
};

const getStatusBadge = (match: ConnectFiveMatch, selfId?: number | null) => {
  if (match.status === ConnectFiveMatchStatus.ACTIVE) {
    return {badgeStyle: BadgeStyle.primary, label: 'In progress'};
  }

  if (match.status === ConnectFiveMatchStatus.DRAW) {
    return {badgeStyle: BadgeStyle.neutral, label: 'Draw'};
  }

  if (match.status === ConnectFiveMatchStatus.CANCELLED) {
    return {badgeStyle: BadgeStyle.warning, label: 'Cancelled'};
  }

  if (match.winner && selfId) {
    if (match.winner === selfId) {
      return {badgeStyle: BadgeStyle.success, label: 'You won!'};
    }

    return {badgeStyle: BadgeStyle.danger, label: 'You lost'};
  }

  return {badgeStyle: BadgeStyle.neutral, label: 'Finished'};
};

const getFinishReasonLabel = (match: ConnectFiveMatch): string | null => {
  if (match.status === ConnectFiveMatchStatus.FINISHED_CONNECT5) {
    return 'Connect 5';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_TIMEOUT) {
    return 'Timeout';
  }

  return null;
};

const getPreviewCells = (moveType: ConnectFiveMoveType, x: number, y: number): Array<{x: number; y: number}> => {
  if (moveType === ConnectFiveMoveType.SINGLE || moveType === ConnectFiveMoveType.BOMB) {
    return [{x, y}];
  }

  if (moveType === ConnectFiveMoveType.H2) {
    return [
      {x, y},
      {x: x + 1, y},
    ];
  }

  if (moveType === ConnectFiveMoveType.V2) {
    return [
      {x, y},
      {x, y: y + 1},
    ];
  }

  return [];
};

const getRemainingMs = (match: ConnectFiveMatch | null, userId?: number, now = Date.now()): number => {
  if (!match || !userId) return 0;

  const isPlayerA = match.player_a.id === userId;
  const baseMs = isPlayerA ? match.clock_a_remaining_ms : match.clock_b_remaining_ms;

  if (match.active_player?.id !== userId) return baseMs;

  const elapsedMs = now - new Date(match.turn_started_at).getTime();
  return Math.max(baseMs - elapsedMs, 0);
};

const isWithinBoard = (x: number, y: number): boolean => x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

const formatRemainingTime = (milliseconds: number): string => {
  const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const ConnectFiveGame: SFC = ({className}) => {
  const [activeMoveType, setActiveMoveType] = useState<ConnectFiveMoveType>(ConnectFiveMoveType.SINGLE);
  const [bombBlastKeys, setBombBlastKeys] = useState<Set<string>>(new Set());
  const [bombBlastPieces, setBombBlastPieces] = useState<Record<string, PlayerSide>>({});
  const [bombBlastSequence, setBombBlastSequence] = useState(0);
  const [hoverPosition, setHoverPosition] = useState<{x: number; y: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingMove, setIsSubmittingMove] = useState(false);
  const [lastMoveKeys, setLastMoveKeys] = useState<Set<string>>(new Set());
  const [lastMoveSequence, setLastMoveSequence] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [purchasingSpecials, setPurchasingSpecials] = useState<Set<ConnectFiveSpecialType>>(new Set());
  const [rematchAction, setRematchAction] = useState<RematchAction | null>(null);
  const [rematchStatus, setRematchStatus] = useState<ConnectFiveRematchStatus | null>(null);
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
  const isRematchSubmitting = rematchAction !== null;

  const {challengeId} = useParams();
  const challengeIdNumber = challengeId ? Number(challengeId) : null;
  const challengesById = useSelector(getConnectFiveChallengesById);
  const challenge = challengeIdNumber ? challengesById[challengeIdNumber] : null;
  const dispatch = useDispatch<AppDispatch>();
  const matchesById = useSelector(getConnectFiveMatchesById);
  const match = challenge?.match_id ? matchesById[challenge.match_id] : null;
  const matchId = match?.id;
  const matchStatus = match?.status;
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const rematchChallenge = useMemo(() => {
    if (!match) return rematchStatus?.challenge ?? null;

    const rematchCandidates = Object.values(challengesById).filter(
      (challengeItem) => challengeItem.rematch_for === match.id,
    );

    if (rematchCandidates.length) {
      return rematchCandidates.reduce((latest, current) => {
        const latestTime = new Date(latest.created_date).getTime();
        const currentTime = new Date(current.created_date).getTime();
        return currentTime > latestTime ? current : latest;
      });
    }

    if (!rematchStatus?.challenge) return null;
    return challengesById[rematchStatus.challenge.id] ?? rematchStatus.challenge;
  }, [challengesById, match, rematchStatus?.challenge]);

  const handleAcceptChallenge = useCallback(async () => {
    if (!challengeIdNumber) return;

    try {
      const matchData = await acceptConnectFiveChallenge(challengeIdNumber);
      dispatch(upsertMatch(matchData));
    } catch (error) {
      displayErrorToast('Failed to accept challenge');
    }
  }, [challengeIdNumber, dispatch]);

  const handleCancelChallenge = useCallback(async () => {
    if (!challengeIdNumber) return;

    try {
      const updatedChallenge = await cancelConnectFiveChallenge(challengeIdNumber);
      dispatch(upsertChallenge({challenge: updatedChallenge, selfId: self?.id}));
    } catch (error) {
      displayErrorToast('Failed to cancel challenge');
    }
  }, [challengeIdNumber, dispatch, self?.id]);

  const handleCellClick = useCallback(
    async (x: number, y: number) => {
      if (!match || !self || match.status !== ConnectFiveMatchStatus.ACTIVE) return;
      if (match.active_player?.id !== self.id) return;

      if (isSubmittingMove) return;

      try {
        setIsSubmittingMove(true);
        const updatedMatch = await submitConnectFiveMove(match.id, {
          move_type: activeMoveType,
          x,
          y,
        });
        dispatch(upsertMatch(updatedMatch));
        const usedSpecialType = MOVE_TO_SPECIAL_TYPE[activeMoveType];
        if (usedSpecialType) {
          const updatedSelfPlayer = getMatchPlayer(updatedMatch, self.id);
          if (getInventoryCount(updatedSelfPlayer, usedSpecialType) === 0) {
            setActiveMoveType(ConnectFiveMoveType.SINGLE);
          }
        }
        setHoverPosition(null);
      } catch (error) {
        displayErrorToast('Move rejected. Please try another position.');
      } finally {
        setIsSubmittingMove(false);
      }
    },
    [activeMoveType, dispatch, isSubmittingMove, match, self],
  );

  const handleCellHover = useCallback(
    (x: number, y: number) => {
      if (!match || match.status !== ConnectFiveMatchStatus.ACTIVE) return;
      if (!self || match.active_player?.id !== self.id) return;

      setHoverPosition({x, y});
    },
    [match, self],
  );

  const handlePurchase = useCallback(
    async (specialType: ConnectFiveSpecialType) => {
      if (!match) return;

      try {
        setPurchasingSpecials((prev) => new Set(prev).add(specialType));
        const updatedMatch = await purchaseConnectFiveSpecial(match.id, {
          special_type: specialType,
        });
        dispatch(upsertMatch(updatedMatch));
      } catch (error) {
        displayErrorToast('Purchase failed. Check your spend limit.');
      } finally {
        setPurchasingSpecials((prev) => {
          const next = new Set(prev);
          next.delete(specialType);
          return next;
        });
      }
    },
    [dispatch, match],
  );

  const handleRematchAccept = useCallback(async () => {
    if (!rematchChallenge || rematchChallenge.status !== ConnectFiveChallengeStatus.PENDING) return;

    try {
      setRematchAction('accept');
      const matchData = await acceptConnectFiveChallenge(rematchChallenge.id);
      dispatch(upsertMatch(matchData));
      setResultModalIsOpen(false);
      navigate(`/connect-five/games/${matchData.challenge}`);
    } catch (error) {
      const message = (error as {response?: {data?: {detail?: string}}})?.response?.data?.detail;
      if (message === 'Insufficient funds for rematch.') {
        displayErrorToast(message);
      } else {
        displayErrorToast('Failed to accept rematch.');
      }
    } finally {
      setRematchAction(null);
    }
  }, [dispatch, navigate, rematchChallenge]);

  const handleRematchRequest = useCallback(async () => {
    if (!match) return;

    try {
      setRematchAction('request');
      const challengeData = await requestConnectFiveRematch(match.id);
      dispatch(upsertChallenge({challenge: challengeData, selfId: self?.id}));
      setRematchStatus({
        can_rematch: false,
        challenge: challengeData,
        insufficient_funds: false,
      });
    } catch (error) {
      const message = (error as {response?: {data?: {detail?: string}}})?.response?.data?.detail;
      if (message === 'Insufficient funds for rematch.') {
        setRematchStatus((previous) => ({
          can_rematch: false,
          challenge: previous?.challenge ?? null,
          insufficient_funds: true,
        }));
      }
      displayErrorToast(message || 'Unable to request a rematch.');
    } finally {
      setRematchAction(null);
    }
  }, [dispatch, match, self?.id]);

  const handleRematchCancel = useCallback(async () => {
    if (!rematchChallenge || rematchChallenge.status !== ConnectFiveChallengeStatus.PENDING) return;
    if (rematchChallenge.challenger.id !== self?.id) return;

    try {
      setRematchAction('cancel');
      const challengeData = await cancelConnectFiveChallenge(rematchChallenge.id);
      dispatch(upsertChallenge({challenge: challengeData, selfId: self?.id}));
      setRematchStatus((previous) => ({
        can_rematch: false,
        challenge: challengeData,
        insufficient_funds: previous?.insufficient_funds ?? false,
      }));
    } catch (error) {
      displayErrorToast('Failed to cancel rematch.');
    } finally {
      setRematchAction(null);
    }
  }, [dispatch, rematchChallenge, self?.id]);

  const handleRematchDecline = useCallback(async () => {
    if (!rematchChallenge || rematchChallenge.status !== ConnectFiveChallengeStatus.PENDING) return;
    if (rematchChallenge.challenger.id === self?.id) return;

    try {
      setRematchAction('decline');
      const challengeData = await declineConnectFiveChallenge(rematchChallenge.id);
      dispatch(upsertChallenge({challenge: challengeData, selfId: self?.id}));
      setRematchStatus((previous) => ({
        can_rematch: false,
        challenge: challengeData,
        insufficient_funds: previous?.insufficient_funds ?? false,
      }));
    } catch (error) {
      displayErrorToast('Failed to decline rematch.');
    } finally {
      setRematchAction(null);
    }
  }, [dispatch, rematchChallenge, self?.id]);

  const handleResultModalClose = useCallback(() => {
    setResultModalIsOpen(false);
  }, []);

  const handleToolSelect = useCallback((moveType: ConnectFiveMoveType) => {
    setActiveMoveType(moveType);
  }, []);

  const hasHandledCancellation = useRef(false);
  const hasOpenedResultModal = useRef(false);
  const previousBoardStateRef = useRef<number[][] | null>(null);
  const previousMatchIdRef = useRef<number | null>(null);
  const isMatchActive = matchStatus === ConnectFiveMatchStatus.ACTIVE;
  const rematchViewState = useMemo<RematchViewState>(() => {
    if (!rematchChallenge) return 'idle';

    if (rematchChallenge.status === ConnectFiveChallengeStatus.PENDING) {
      if (rematchChallenge.challenger.id === self?.id) return 'requestedByMe';
      return 'requestedByOpponent';
    }

    if (rematchChallenge.status === ConnectFiveChallengeStatus.CANCELLED) return 'cancelled';
    if (rematchChallenge.status === ConnectFiveChallengeStatus.DECLINED) return 'declined';
    if (rematchChallenge.status === ConnectFiveChallengeStatus.ACCEPTED) return 'accepted';

    return 'idle';
  }, [rematchChallenge, self?.id]);
  const hasRematchChallenge = !!rematchChallenge;
  const canRequestRematch = !hasRematchChallenge && (rematchStatus?.can_rematch ?? false);
  const showInsufficientFunds = !hasRematchChallenge && (rematchStatus?.insufficient_funds ?? false);
  const loadMatch = useCallback(
    async (matchIdValue: number) => {
      const matchData = await getConnectFiveMatch(matchIdValue);
      dispatch(upsertMatch(matchData));
    },
    [dispatch],
  );

  const loadChallenge = useCallback(async () => {
    if (!challengeIdNumber) return;

    const challengeData = await getConnectFiveChallenge(challengeIdNumber);
    dispatch(upsertChallenge({challenge: challengeData, selfId: self?.id}));

    if (challengeData.match_id) {
      await loadMatch(challengeData.match_id);
    }
  }, [challengeIdNumber, dispatch, loadMatch, self?.id]);

  const loadRematchStatus = useCallback(async () => {
    if (!matchId) return;

    try {
      const response = await getConnectFiveRematchStatus(matchId);
      setRematchStatus(response);
    } catch (error) {
      displayErrorToast('Unable to load rematch status.');
    }
  }, [matchId]);

  const opponentMatchPlayer = useMemo(() => {
    if (!match || !self) return null;
    const opponentId = match.player_a.id === self.id ? match.player_b.id : match.player_a.id;
    return getMatchPlayer(match, opponentId);
  }, [match, self]);

  const opponentPlayer = useMemo(() => {
    if (!match || !self) return null;
    return match.player_a.id === self.id ? match.player_b : match.player_a;
  }, [match, self]);

  const opponentClock = useMemo(() => {
    if (!match || !opponentPlayer) return '0:00';
    const remaining = getRemainingMs(match, opponentPlayer.id, now);
    return formatRemainingTime(remaining);
  }, [match, now, opponentPlayer]);

  const playerAMatchPlayer = useMemo(() => getMatchPlayer(match, match?.player_a.id), [match]);
  const playerBMatchPlayer = useMemo(() => getMatchPlayer(match, match?.player_b.id), [match]);
  const playerValue = useMemo(() => {
    if (!match || !self) return 0;
    return match.player_a.id === self.id ? 1 : 2;
  }, [match, self]);

  const previewState = useMemo(() => {
    if (!match || !self || !hoverPosition) return {cells: [], isValid: false};
    if (match.status !== ConnectFiveMatchStatus.ACTIVE) return {cells: [], isValid: false};
    if (match.active_player?.id !== self.id) return {cells: [], isValid: false};

    const cells = getPreviewCells(activeMoveType, hoverPosition.x, hoverPosition.y);
    if (!cells.length) return {cells: [], isValid: false};

    const board = match.board_state;
    const isBomb = activeMoveType === ConnectFiveMoveType.BOMB;

    const isValid = cells.every((cell) => {
      if (!isWithinBoard(cell.x, cell.y)) return false;

      const value = board[cell.y][cell.x];
      if (isBomb) {
        return value !== 0 && value !== playerValue;
      }

      return value === 0;
    });

    return {cells, isValid};
  }, [activeMoveType, hoverPosition, match, playerValue, self]);
  const previewKeys = useMemo(() => {
    return new Set(previewState.cells.map((cell) => getCellKey(cell.x, cell.y)));
  }, [previewState.cells]);

  const selfMatchPlayer = useMemo(() => getMatchPlayer(match, self?.id), [match, self?.id]);
  const selfPlayer = useMemo(() => {
    if (!match || !self) return null;
    return match.player_a.id === self.id ? match.player_a : match.player_b;
  }, [match, self]);

  const selfClock = useMemo(() => {
    if (!match || !selfPlayer) return '0:00';
    const remaining = getRemainingMs(match, selfPlayer.id, now);
    return formatRemainingTime(remaining);
  }, [match, now, selfPlayer]);

  const previewVariant: PlayerSide = playerValue === 1 ? 'black' : 'white';
  const winningKeys = useMemo(() => {
    if (!match || match.status !== ConnectFiveMatchStatus.FINISHED_CONNECT5 || !match.winner) {
      return new Set<string>();
    }

    const winnerValue = match.winner === match.player_a.id ? 1 : 2;
    const directions = [
      {x: 1, y: 0},
      {x: 0, y: 1},
      {x: 1, y: 1},
      {x: 1, y: -1},
    ];

    for (let y = 0; y < match.board_state.length; y += 1) {
      for (let x = 0; x < match.board_state[y].length; x += 1) {
        if (match.board_state[y][x] === winnerValue) {
          for (const direction of directions) {
            const lineKeys: string[] = [];

            for (let step = 0; step < 5; step += 1) {
              const nextX = x + direction.x * step;
              const nextY = y + direction.y * step;

              if (!isWithinBoard(nextX, nextY)) break;
              if (match.board_state[nextY][nextX] !== winnerValue) break;

              lineKeys.push(getCellKey(nextX, nextY));
            }

            if (lineKeys.length === 5) {
              return new Set(lineKeys);
            }
          }
        }
      }
    }

    return new Set<string>();
  }, [match]);

  useLayoutEffect(() => {
    if (!match) {
      previousBoardStateRef.current = null;
      previousMatchIdRef.current = null;
      setBombBlastKeys(new Set());
      setBombBlastPieces({});
      setBombBlastSequence(0);
      setLastMoveKeys(new Set());
      setLastMoveSequence(0);
      return;
    }

    if (previousMatchIdRef.current !== match.id) {
      previousMatchIdRef.current = match.id;
      previousBoardStateRef.current = match.board_state;
      setBombBlastKeys(new Set());
      setBombBlastPieces({});
      setBombBlastSequence(0);
      setLastMoveKeys(new Set());
      setLastMoveSequence(0);
      return;
    }

    const previousBoardState = previousBoardStateRef.current;

    if (!previousBoardState) {
      previousBoardStateRef.current = match.board_state;
      return;
    }

    let hasChanges = false;
    const nextBombKeys: string[] = [];
    const nextBombPieces: Record<string, PlayerSide> = {};
    const nextMoveKeys: string[] = [];

    match.board_state.forEach((row, y) => {
      row.forEach((value, x) => {
        const previousValue = previousBoardState[y]?.[x];

        if (value === previousValue) return;

        hasChanges = true;

        if ((previousValue === 1 || previousValue === 2) && value === 0) {
          const bombKey = getCellKey(x, y);
          nextBombKeys.push(bombKey);
          nextBombPieces[bombKey] = previousValue === 1 ? 'black' : 'white';
        }

        if (value === 1 || value === 2) {
          nextMoveKeys.push(getCellKey(x, y));
        }
      });
    });

    if (!hasChanges) return;

    setLastMoveKeys(new Set(nextMoveKeys));

    if (nextMoveKeys.length) {
      setLastMoveSequence((prev) => prev + 1);
    }

    if (nextBombKeys.length) {
      setBombBlastKeys(new Set(nextBombKeys));
      setBombBlastPieces(nextBombPieces);
      setBombBlastSequence((prev) => prev + 1);
    } else {
      setBombBlastKeys(new Set());
      setBombBlastPieces({});
    }

    previousBoardStateRef.current = match.board_state;
  }, [match]);

  useEffect(() => {
    if (challenge?.status !== ConnectFiveChallengeStatus.CANCELLED) return;
    if (hasHandledCancellation.current) return;

    hasHandledCancellation.current = true;
    displayToast('Challenge has been cancelled.', ToastType.SUCCESS);
    navigate('/connect-five/home', {replace: true});
  }, [challenge?.status, navigate]);

  useEffect(() => {
    if (!isMatchActive) return;

    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [isMatchActive]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadChallenge();
      } catch (error) {
        displayErrorToast('Unable to load game details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [loadChallenge]);

  useEffect(() => {
    if (!matchStatus || matchStatus === ConnectFiveMatchStatus.ACTIVE) {
      hasOpenedResultModal.current = false;
      setRematchAction(null);
      setRematchStatus(null);
      return;
    }

    if (matchStatus === ConnectFiveMatchStatus.CANCELLED) return;
    if (hasOpenedResultModal.current) return;

    hasOpenedResultModal.current = true;
    setResultModalIsOpen(true);
  }, [matchId, matchStatus]);

  useEffect(() => {
    if (!matchStatus || matchStatus === ConnectFiveMatchStatus.ACTIVE) return;
    if (matchStatus === ConnectFiveMatchStatus.CANCELLED) return;

    loadRematchStatus();
  }, [loadRematchStatus, matchId, matchStatus]);

  useEffect(() => {
    if (!rematchChallenge || rematchChallenge.status !== ConnectFiveChallengeStatus.ACCEPTED) return;
    if (challengeIdNumber === rematchChallenge.id) return;

    setResultModalIsOpen(false);
    navigate(`/connect-five/games/${rematchChallenge.id}`);
  }, [challengeIdNumber, navigate, rematchChallenge]);

  const renderBoard = () => {
    if (!match) return null;

    return (
      <S.Board>
        {match.board_state.map((row, y) =>
          row.map((value, x) => {
            const cellKey = getCellKey(x, y);
            const isBombBlast = bombBlastKeys.has(cellKey);
            const isPreview = previewKeys.has(cellKey);
            const isInvalid = isPreview && !previewState.isValid;
            const isLastMove = lastMoveKeys.has(cellKey);
            const isWinningCell = winningKeys.has(cellKey);
            const bombPieceVariant = bombBlastPieces[cellKey];
            const pieceVariant = value === 1 ? 'black' : 'white';
            const shouldEnableClick = previewState.isValid && isPreview;

            return (
              <S.Cell
                $isPreview={isPreview}
                $isPreviewInvalid={isInvalid}
                key={cellKey}
                onClick={() => {
                  if (!shouldEnableClick) return;
                  handleCellClick(x, y);
                }}
                onMouseEnter={() => handleCellHover(x, y)}
                onMouseLeave={() => setHoverPosition(null)}
                type="button"
              >
                {isLastMove && value !== 0 && (
                  <S.ImpactRing $variant={pieceVariant} key={`impact-${lastMoveSequence}-${cellKey}`} />
                )}
                {isBombBlast && (
                  <S.BombBlast aria-hidden key={`bomb-${bombBlastSequence}-${cellKey}`}>
                    <S.BombFlash />
                    <S.BombRing />
                    <S.BombSmoke />
                    {BOMB_SHARD_CONFIG.map((shard, index) => (
                      <S.BombShard
                        $delay={shard.delay}
                        $offsetX={shard.offsetX}
                        $offsetY={shard.offsetY}
                        $size={shard.size}
                        key={`bomb-shard-${bombBlastSequence}-${cellKey}-${index}`}
                      />
                    ))}
                    {bombPieceVariant && <S.BombBlastPiece $variant={bombPieceVariant} />}
                  </S.BombBlast>
                )}
                {value === 1 && <S.Piece $isLastMove={isLastMove} $isWinning={isWinningCell} $variant="black" />}
                {value === 2 && <S.Piece $isLastMove={isLastMove} $isWinning={isWinningCell} $variant="white" />}
                {isWinningCell && <S.WinningStar aria-hidden icon={mdiStar} size={16} totalSize="unset" />}
                {isPreview && <S.Preview $isInvalid={isInvalid} $variant={previewVariant} />}
              </S.Cell>
            );
          }),
        )}
      </S.Board>
    );
  };

  const renderClock = (time: string, isActive: boolean) => {
    return <S.Clock $isActive={isActive}>{time}</S.Clock>;
  };

  const renderMatchInfo = () => {
    if (!match) return null;

    const isActive = match.status === ConnectFiveMatchStatus.ACTIVE;
    const finishReason = getFinishReasonLabel(match);
    const statusBadge = getStatusBadge(match, self?.id);

    return (
      <S.MatchInfo>
        <S.InfoRow>
          <S.InfoLabel>Status</S.InfoLabel>
          <Badge badgeStyle={statusBadge.badgeStyle}>{statusBadge.label}</Badge>
        </S.InfoRow>
        {finishReason && (
          <S.InfoRow>
            <S.InfoLabel>Finish reason</S.InfoLabel>
            <S.InfoValue>{finishReason}</S.InfoValue>
          </S.InfoRow>
        )}
        {!isActive && match.winner && (
          <S.InfoRow>
            <S.InfoLabel>Winner</S.InfoLabel>
            <S.InfoValue>
              {match.winner === match.player_a.id ? match.player_a.username : match.player_b.username}
            </S.InfoValue>
          </S.InfoRow>
        )}
      </S.MatchInfo>
    );
  };

  const renderPrizePoolPanel = () => {
    if (!match) return null;

    const prizePoolSpent = match.players?.reduce((total, player) => total + player.spent_total, 0) ?? 0;
    const prizePoolTotal = match.prize_pool_total;
    const prizePoolInitial = Math.max(prizePoolTotal - prizePoolSpent, 0);

    return (
      <S.PrizePoolPanel>
        <S.PanelHeader>
          <S.PanelTitle>Prize pool</S.PanelTitle>
        </S.PanelHeader>
        <PrizePoolBreakdown initial={prizePoolInitial} spent={prizePoolSpent} ticker="TNB" total={prizePoolTotal} />
      </S.PrizePoolPanel>
    );
  };

  const renderPendingState = () => {
    if (!challenge || !self) return null;

    const isChallenger = challenge.challenger.id === self.id;
    const variant = isChallenger ? 'challenger' : 'opponent';

    return (
      <S.PendingState $variant={variant}>
        <S.PendingIcon $variant={variant}>
          <S.PendingIconInner $variant={variant} />
        </S.PendingIcon>
        <S.PendingContent>
          <S.PendingTitle $variant={variant}>
            {isChallenger ? 'Awaiting Opponent' : "You've Been Challenged!"}
          </S.PendingTitle>
          <S.PendingText>
            {isChallenger ? (
              'Your challenge has been sent. Waiting for your opponent to accept.'
            ) : (
              <>
                <S.PendingChallengerName>{challenge.challenger.username}</S.PendingChallengerName> wants to play Connect
                5 against you.
              </>
            )}
          </S.PendingText>
          <S.PendingDots>
            <S.PendingDot $delay={0} $variant={variant} />
            <S.PendingDot $delay={0.2} $variant={variant} />
            <S.PendingDot $delay={0.4} $variant={variant} />
          </S.PendingDots>
          <S.PendingShimmer $variant={variant} />
        </S.PendingContent>
        <Button
          onClick={isChallenger ? handleCancelChallenge : handleAcceptChallenge}
          text={isChallenger ? 'Cancel challenge' : 'Accept challenge'}
        />
      </S.PendingState>
    );
  };

  const renderPieceToolbar = (
    matchPlayer: ConnectFiveMatchPlayer | null,
    isInteractive: boolean,
    playerId?: number | null,
  ) => {
    if (!match) return null;

    const playerSide = getPlayerSide(match, playerId);

    if (!playerSide) return null;

    return (
      <S.Toolbar>
        {ORDERED_MOVE_TYPES.map((moveType) => {
          const isSingle = moveType === ConnectFiveMoveType.SINGLE;
          const specialType = MOVE_TO_SPECIAL_TYPE[moveType];
          const inventory = specialType ? getInventoryCount(matchPlayer, specialType) : 0;
          const isDisabled = !!specialType && !inventory;

          if (isInteractive) {
            return (
              <S.ToolButton
                $isActive={activeMoveType === moveType}
                $isDisabled={isDisabled}
                aria-label={TOOL_LABELS[moveType]}
                disabled={isDisabled}
                key={moveType}
                onClick={() => {
                  if (isDisabled) return;
                  handleToolSelect(moveType);
                }}
                type="button"
              >
                <S.ToolIcon $variant={playerSide} aria-hidden as={TOOL_ICONS[moveType]} focusable="false" />
                {!isSingle && <S.ToolCount>{inventory}</S.ToolCount>}
              </S.ToolButton>
            );
          }

          return (
            <S.ToolButtonReadOnly $isDisabled={isDisabled} key={moveType}>
              <S.ToolIcon $variant={playerSide} aria-hidden as={TOOL_ICONS[moveType]} focusable="false" />
              {!isSingle && <S.ToolCount>{inventory}</S.ToolCount>}
            </S.ToolButtonReadOnly>
          );
        })}
      </S.Toolbar>
    );
  };

  const renderPlayerInfo = (
    player: {avatar: string | null; connect_five_elo: number | null; id: number; username: string} | null,
  ) => {
    if (!match || !player) return null;

    const playerSide = getPlayerSide(match, player.id);

    if (!playerSide) return null;

    const profilePath = `/profile/${player.id}`;
    const sideLabel = playerSide === 'black' ? 'Black' : 'White';

    return (
      <S.PlayerLabel>
        <Link to={profilePath}>
          <S.PlayerAvatar $variant={playerSide} size="44px" src={player.avatar} />
        </Link>
        <S.PlayerLabelDetails>
          <S.PlayerName $isClickable as={Link} to={profilePath}>
            {getPlayerLabel(player)}
          </S.PlayerName>
          <S.PlayerSideText $variant={playerSide}>{sideLabel}</S.PlayerSideText>
        </S.PlayerLabelDetails>
      </S.PlayerLabel>
    );
  };

  const renderPurchasePanel = () => {
    if (!match || !selfMatchPlayer || !isMatchActive) return null;

    const playerSide = getPlayerSide(match, self?.id);

    if (!playerSide) return null;

    return (
      <S.PurchasePanel>
        <S.PanelHeader>
          <S.PanelTitle>Purchase specials</S.PanelTitle>
          <S.PanelSubtitle>Remaining spend: {selfMatchPlayer.remaining_spend.toLocaleString()} TNB</S.PanelSubtitle>
        </S.PanelHeader>
        <S.PurchaseList>
          {ORDERED_SPECIAL_TYPES.map((specialType) => (
            <S.PurchaseRow key={specialType}>
              <S.PurchaseLeft>
                <S.SpecialIcon $variant={playerSide} aria-hidden as={SPECIAL_ICONS[specialType]} focusable="false" />
                <S.PurchaseInfo>
                  <S.PurchaseName>{SPECIAL_LABELS[specialType]}</S.PurchaseName>
                  <S.PurchaseMeta>Cost: {SPECIAL_PRICES[specialType]} TNB</S.PurchaseMeta>
                </S.PurchaseInfo>
              </S.PurchaseLeft>
              <Button
                disabled={selfMatchPlayer.remaining_spend < SPECIAL_PRICES[specialType]}
                isSubmitting={purchasingSpecials.has(specialType)}
                onClick={() => handlePurchase(specialType)}
                text="Buy"
              />
            </S.PurchaseRow>
          ))}
        </S.PurchaseList>
      </S.PurchasePanel>
    );
  };

  const renderResultModal = () => {
    if (!resultModalIsOpen || !match || !self) return null;

    const eloSnapshot = getEloSnapshot(match, self.id);
    const eloDelta = eloSnapshot?.delta ?? 0;
    let eloDeltaLabel = '--';
    let eloIcon = mdiMinus;

    if (eloSnapshot) {
      if (eloDelta > 0) {
        eloDeltaLabel = `+${eloDelta}`;
        eloIcon = mdiArrowUpBold;
      } else if (eloDelta < 0) {
        eloDeltaLabel = `${eloDelta}`;
        eloIcon = mdiArrowDownBold;
      } else {
        eloDeltaLabel = '=';
      }
    }

    const eloText = eloSnapshot
      ? `${eloSnapshot.before} -> ${eloSnapshot.after} (${eloDeltaLabel})`
      : 'ELO update unavailable';
    const eloVariant = getEloVariant(eloDelta);
    const rematchMessage = (() => {
      if (rematchViewState === 'requestedByMe') return 'Waiting for opponent...';
      if (rematchViewState === 'requestedByOpponent') return 'Opponent wants a rematch';
      if (rematchViewState === 'cancelled') return 'Rematch cancelled';
      if (rematchViewState === 'declined') return 'Rematch declined';
      return null;
    })();
    const rematchMessageVariant =
      rematchViewState === 'cancelled' || rematchViewState === 'declined' ? 'warning' : 'neutral';
    let rematchButtons = null;

    if (rematchViewState === 'requestedByOpponent') {
      rematchButtons = (
        <>
          <Button
            color={ButtonColor.secondary}
            disabled={isRematchSubmitting}
            isSubmitting={rematchAction === 'decline'}
            onClick={handleRematchDecline}
            text="Decline"
          />
          <Button
            disabled={isRematchSubmitting}
            isSubmitting={rematchAction === 'accept'}
            onClick={handleRematchAccept}
            text="Accept"
          />
        </>
      );
    } else if (rematchViewState === 'requestedByMe') {
      rematchButtons = (
        <Button
          color={ButtonColor.secondary}
          disabled={isRematchSubmitting}
          isSubmitting={rematchAction === 'cancel'}
          onClick={handleRematchCancel}
          text="Cancel"
        />
      );
    } else if (rematchViewState === 'idle') {
      rematchButtons = (
        <Button
          disabled={isRematchSubmitting || !canRequestRematch}
          isSubmitting={rematchAction === 'request'}
          onClick={handleRematchRequest}
          text="Rematch"
        />
      );
    }
    let resultVariant: 'draw' | 'loss' | 'win' = 'loss';
    let resultLabel = 'You lost';

    if (match.status === ConnectFiveMatchStatus.DRAW) {
      resultVariant = 'draw';
      resultLabel = 'Draw';
    } else if (match.winner === self.id) {
      resultVariant = 'win';
      resultLabel = 'You won!';
    }

    return (
      <S.ResultModal close={handleResultModalClose} header="Game Results">
        <ModalBody>
          <S.ResultSummary $variant={resultVariant}>
            <S.ResultOutcome $variant={resultVariant}>{resultLabel}</S.ResultOutcome>
          </S.ResultSummary>
          <S.EloChange>
            <S.EloChangeLabel>Your ELO</S.EloChangeLabel>
            <S.EloChangeValue $variant={eloVariant}>
              <Icon icon={eloIcon} size={18} />
              <span>{eloText}</span>
            </S.EloChangeValue>
          </S.EloChange>
          {rematchMessage && <S.RematchStateText $variant={rematchMessageVariant}>{rematchMessage}</S.RematchStateText>}
          {showInsufficientFunds && <S.RematchNotice>Insufficient funds for rematch</S.RematchNotice>}
        </ModalBody>
        <ModalFooter>
          <Button color={ButtonColor.secondary} onClick={handleResultModalClose} text="Close" />
          {rematchButtons}
        </ModalFooter>
      </S.ResultModal>
    );
  };

  const renderSpendPanel = () => {
    if (!match) return null;

    const spendRows = [
      {
        matchPlayer: playerAMatchPlayer,
        player: match.player_a,
      },
      {
        matchPlayer: playerBMatchPlayer,
        player: match.player_b,
      },
    ];

    return (
      <S.SpendPanel>
        <S.PanelHeader>
          <S.PanelTitle>Spend progress</S.PanelTitle>
          <S.PanelSubtitle>Max spend: {match.max_spend_amount.toLocaleString()} TNB</S.PanelSubtitle>
        </S.PanelHeader>
        <S.SpendList>
          {spendRows.map(({matchPlayer, player}) => {
            const spendProgress = getSpendProgress(matchPlayer, match.max_spend_amount);
            const spentLabel = `${spendProgress.spent.toLocaleString()}/${match.max_spend_amount.toLocaleString()} spent`;

            return (
              <S.SpendRow key={player.id}>
                <S.SpendRowHeader>
                  <S.SpendRowName>{player.username}</S.SpendRowName>
                  <S.SpendRowValue>{spentLabel}</S.SpendRowValue>
                </S.SpendRowHeader>
                <S.SpendProgressBar>
                  <S.SpendProgressFill $percentage={spendProgress.percentage} />
                </S.SpendProgressBar>
              </S.SpendRow>
            );
          })}
        </S.SpendList>
      </S.SpendPanel>
    );
  };

  if (isLoading) {
    return (
      <S.Container className={className}>
        <S.LoadingContainer>
          <Loader />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (!challenge) {
    return (
      <S.Container className={className}>
        <EmptyText>Challenge not found.</EmptyText>
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <S.Header>
        <Button onClick={() => navigate('/connect-five/home')} text="Back to lobby" />
      </S.Header>

      {match ? (
        <S.GameLayout>
          <S.BoardSection>
            <S.PlayerRow>
              {renderPlayerInfo(opponentPlayer)}
              {renderPieceToolbar(opponentMatchPlayer, false, opponentPlayer?.id)}
              {renderClock(opponentClock, match.active_player?.id === opponentPlayer?.id)}
            </S.PlayerRow>
            {renderBoard()}
            <S.PlayerRow>
              {renderPlayerInfo(selfPlayer)}
              {renderPieceToolbar(selfMatchPlayer, true, self?.id)}
              {renderClock(selfClock, match.active_player?.id === selfPlayer?.id)}
            </S.PlayerRow>
          </S.BoardSection>
          <S.Sidebar>
            {renderMatchInfo()}
            {renderPrizePoolPanel()}
            {renderSpendPanel()}
            {renderPurchasePanel()}
          </S.Sidebar>
        </S.GameLayout>
      ) : (
        renderPendingState()
      )}
      {renderResultModal()}
    </S.Container>
  );
};

export default ConnectFiveGame;
