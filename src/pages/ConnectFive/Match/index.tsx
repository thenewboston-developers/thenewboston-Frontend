import {ComponentType, SVGProps, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {
  mdiArrowRight,
  mdiEmoticonExcitedOutline,
  mdiEmoticonSadOutline,
  mdiMinus,
  mdiStar,
  mdiTrendingDown,
  mdiTrendingUp,
} from '@mdi/js';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  declineConnectFiveChallenge,
  getConnectFiveChallenge,
  getConnectFiveMatch,
  getConnectFiveRematchStatus,
  purchaseConnectFiveSpecial,
  requestConnectFiveRematch,
  resignConnectFiveMatch,
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
import {ConnectFiveChallengeStatus, ConnectFiveMatchStatus, ConnectFiveMoveType, ConnectFiveSpecialType} from 'enums';
import ConfirmationModal from 'modals/ConfirmationModal';
import {getConnectFiveChallengesById, getConnectFiveMatchesById, getSelf} from 'selectors/state';
import {upsertChallenge, upsertMatch} from 'store/connectFive';
import {
  AppDispatch,
  ConnectFiveMatch as ConnectFiveMatchType,
  ConnectFiveMatchPlayer,
  ConnectFiveRematchStatus,
  SFC,
} from 'types';
import {displayErrorToast} from 'utils/toasts';

import {ReactComponent as BombIcon} from './assets/bomb.svg';
import {ReactComponent as Horizontal2Icon} from './assets/horizontal2.svg';
import {ReactComponent as SingleIcon} from './assets/single.svg';
import {ReactComponent as Vertical2Icon} from './assets/vertical2.svg';
import ConnectFiveChat from './Chat';
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

const LOSS_RESULT_LABELS = [
  'Awful',
  'Booo',
  'Career low',
  'Embarrassing',
  'Gross',
  'Hard to watch',
  'Oof',
  'Outclassed',
  'Painful to watch',
  'Rock bottom',
  'That was brutal',
  'That was a mess',
  'That was painful',
  'That was rough',
  'That was ugly',
  'Tough scene',
  'Train wreck',
  'Utter humiliation',
  'You got obliterated',
  'You lost',
  'Yikes',
  'Sad',
  'Collapsed',
  'Skill gap confirmed',
  'You stink',
  'You suck',
];

const WIN_RESULT_LABELS = [
  'Absolute massacre',
  'Absolute unit',
  'Clinical',
  'Crushed it',
  'Masterclass',
  'Money',
  'Nice Hoss!',
  'Noice',
  'Pure art',
  'Pure dominance',
  'EZ',
  'Free ELO',
  'Smoked it',
  'Straight domination',
  'Sweet!',
  'That was filthy',
  'Too easy',
  'Tutorial mode',
  'Unstoppable',
  'Well done',
  'You destroyed them',
  'You owned that',
  'You won!',
];

const getRandomResultLabel = (labels: string[]): string => {
  return labels[Math.floor(Math.random() * labels.length)];
};

const MOVE_TO_SPECIAL_TYPE: Record<ConnectFiveMoveType, ConnectFiveSpecialType | null> = {
  [ConnectFiveMoveType.BOMB]: ConnectFiveSpecialType.BOMB,
  [ConnectFiveMoveType.H2]: ConnectFiveSpecialType.H2,
  [ConnectFiveMoveType.SINGLE]: null,
  [ConnectFiveMoveType.V2]: ConnectFiveSpecialType.V2,
};

const BOMB_SHARD_CONFIG = [
  {delay: 0.01, offsetX: -55, offsetY: -50, size: 8},
  {delay: 0.03, offsetX: 60, offsetY: -35, size: 7},
  {delay: 0.05, offsetX: -65, offsetY: 20, size: 9},
  {delay: 0.02, offsetX: 50, offsetY: 55, size: 6},
  {delay: 0.04, offsetX: -25, offsetY: 65, size: 7},
  {delay: 0.06, offsetX: 70, offsetY: 10, size: 8},
  {delay: 0.03, offsetX: -10, offsetY: -60, size: 6},
  {delay: 0.05, offsetX: 35, offsetY: -55, size: 5},
];

const BOMB_FRAGMENT_CONFIG = [
  // Large pieces - main shards
  {delay: 0.0, offsetX: -70, offsetY: -45, rotation: -35, size: 14},
  {delay: 0.01, offsetX: 65, offsetY: -55, rotation: 40, size: 13},
  {delay: 0.02, offsetX: -60, offsetY: 50, rotation: -50, size: 12},
  {delay: 0.01, offsetX: 70, offsetY: 40, rotation: 55, size: 14},
  {delay: 0.02, offsetX: -15, offsetY: -75, rotation: 15, size: 11},
  {delay: 0.03, offsetX: 20, offsetY: 70, rotation: -25, size: 12},
  // Medium pieces - secondary shards
  {delay: 0.03, offsetX: -80, offsetY: -10, rotation: -70, size: 10},
  {delay: 0.04, offsetX: 85, offsetY: -15, rotation: 65, size: 9},
  {delay: 0.04, offsetX: -45, offsetY: -65, rotation: -20, size: 9},
  {delay: 0.05, offsetX: 50, offsetY: 60, rotation: 30, size: 10},
  {delay: 0.05, offsetX: -55, offsetY: 65, rotation: -45, size: 8},
  {delay: 0.06, offsetX: 40, offsetY: -70, rotation: 50, size: 9},
  // Small pieces - debris
  {delay: 0.04, offsetX: -90, offsetY: 25, rotation: -80, size: 7},
  {delay: 0.05, offsetX: 80, offsetY: 50, rotation: 75, size: 6},
  {delay: 0.06, offsetX: -35, offsetY: 80, rotation: -35, size: 7},
  {delay: 0.07, offsetX: 25, offsetY: -80, rotation: 45, size: 6},
  {delay: 0.06, offsetX: -75, offsetY: -40, rotation: -60, size: 6},
  {delay: 0.07, offsetX: 90, offsetY: -30, rotation: 85, size: 5},
  // Tiny pieces - particles
  {delay: 0.05, offsetX: -100, offsetY: 0, rotation: -90, size: 5},
  {delay: 0.06, offsetX: 95, offsetY: 20, rotation: 70, size: 4},
  {delay: 0.07, offsetX: 0, offsetY: -90, rotation: 0, size: 5},
  {delay: 0.08, offsetX: 5, offsetY: 95, rotation: 10, size: 4},
];

const getCellKey = (x: number, y: number): string => `${x}-${y}`;

const getEloSnapshot = (match: ConnectFiveMatchType | null, userId?: number | null) => {
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

const getMatchPlayer = (match: ConnectFiveMatchType | null, userId?: number | null): ConnectFiveMatchPlayer | null => {
  if (!match || !userId) return null;
  return match.players.find((player) => player.user.id === userId) || null;
};

const getPlayerSide = (match: ConnectFiveMatchType | null, userId?: number | null): PlayerSide | null => {
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

const getStatusBadge = (match: ConnectFiveMatchType, selfId?: number | null) => {
  if (match.status === ConnectFiveMatchStatus.ACTIVE) {
    return {badgeStyle: BadgeStyle.primary, label: 'In progress'};
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

const getFinishReasonLabel = (match: ConnectFiveMatchType): string | null => {
  if (match.status === ConnectFiveMatchStatus.FINISHED_CONNECT5) {
    return 'Connect 5';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_FULL_BOARD) {
    return 'Full board';
  }

  if (match.status === ConnectFiveMatchStatus.FINISHED_RESIGN) {
    return 'Resignation';
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

const getRemainingMs = (match: ConnectFiveMatchType | null, userId?: number, now = Date.now()): number => {
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

const ConnectFiveMatch: SFC = ({className}) => {
  const [activeMoveType, setActiveMoveType] = useState<ConnectFiveMoveType>(ConnectFiveMoveType.SINGLE);
  const [bombBlastKeys, setBombBlastKeys] = useState<Set<string>>(new Set());
  const [bombBlastPieces, setBombBlastPieces] = useState<Record<string, PlayerSide>>({});
  const [bombBlastSequence, setBombBlastSequence] = useState(0);
  const [hoverPosition, setHoverPosition] = useState<{x: number; y: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResigning, setIsResigning] = useState(false);
  const [isSubmittingMove, setIsSubmittingMove] = useState(false);
  const [lastMoveKeys, setLastMoveKeys] = useState<Set<string>>(new Set());
  const [lastMoveSequence, setLastMoveSequence] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [purchasingSpecials, setPurchasingSpecials] = useState<Set<ConnectFiveSpecialType>>(new Set());
  const [rematchAction, setRematchAction] = useState<RematchAction | null>(null);
  const [rematchStatus, setRematchStatus] = useState<ConnectFiveRematchStatus | null>(null);
  const [resignModalIsOpen, setResignModalIsOpen] = useState(false);
  const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
  const [resultTnbDelta, setResultTnbDelta] = useState(0);
  const isRematchSubmitting = rematchAction !== null;

  const challengesById = useSelector(getConnectFiveChallengesById);
  const dispatch = useDispatch<AppDispatch>();
  const {matchId} = useParams();
  const matchesById = useSelector(getConnectFiveMatchesById);
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const matchIdNumber = matchId ? Number(matchId) : null;
  const match = matchIdNumber ? matchesById[matchIdNumber] : null;
  const matchStatus = match?.status;
  const matchWinnerId = match?.winner;
  const selfId = self?.id;
  const isParticipant = !!match && !!selfId && (match.player_a.id === selfId || match.player_b.id === selfId);
  const isSpectator = !!match && !isParticipant;
  const participantId = isParticipant ? selfId : null;
  const challengeId = match?.challenge ?? null;
  const challenge = challengeId ? challengesById[challengeId] : null;
  const resultOutcomeLabel = useMemo(() => {
    if (!resultModalIsOpen || matchIdNumber == null || participantId == null) return null;

    if (matchWinnerId === participantId) {
      return getRandomResultLabel(WIN_RESULT_LABELS);
    }

    return getRandomResultLabel(LOSS_RESULT_LABELS);
  }, [matchIdNumber, matchWinnerId, participantId, resultModalIsOpen]);
  const tnbDeltaTarget = useMemo(() => {
    if (!challenge || !match || participantId == null) return null;

    const isWinner = match.winner === participantId;
    const amount = isWinner ? match.prize_pool_total : challenge.stake_amount;

    return isWinner ? amount : -amount;
  }, [challenge, match, participantId]);
  const rematchChallenge = useMemo(() => {
    if (isSpectator) return null;
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
  }, [challengesById, isSpectator, match, rematchStatus?.challenge]);

  const handleCellClick = useCallback(
    async (x: number, y: number) => {
      if (isSpectator) return;
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
        dispatch(upsertMatch({match: updatedMatch, selfId}));
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
    [activeMoveType, dispatch, isSpectator, isSubmittingMove, match, self, selfId],
  );

  const handleCellHover = useCallback(
    (x: number, y: number) => {
      if (isSpectator) return;
      if (!match || match.status !== ConnectFiveMatchStatus.ACTIVE) return;
      if (!self || match.active_player?.id !== self.id) return;

      setHoverPosition({x, y});
    },
    [isSpectator, match, self],
  );

  const handlePurchase = useCallback(
    async (specialType: ConnectFiveSpecialType) => {
      if (isSpectator) return;
      if (!match) return;

      try {
        setPurchasingSpecials((prev) => new Set(prev).add(specialType));
        const updatedMatch = await purchaseConnectFiveSpecial(match.id, {
          special_type: specialType,
        });
        dispatch(upsertMatch({match: updatedMatch, selfId}));
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
    [dispatch, isSpectator, match, selfId],
  );

  const handleRematchAccept = useCallback(async () => {
    if (isSpectator) return;
    if (!rematchChallenge || rematchChallenge.status !== ConnectFiveChallengeStatus.PENDING) return;

    try {
      setRematchAction('accept');
      const matchData = await acceptConnectFiveChallenge(rematchChallenge.id);
      dispatch(upsertMatch({match: matchData, selfId}));
      setResultModalIsOpen(false);
      navigate(`/connect-five/matches/${matchData.id}`);
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
  }, [dispatch, isSpectator, navigate, rematchChallenge, selfId]);

  const handleRematchRequest = useCallback(async () => {
    if (isSpectator) return;
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
  }, [dispatch, isSpectator, match, self?.id]);

  const handleRematchCancel = useCallback(async () => {
    if (isSpectator) return;
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
  }, [dispatch, isSpectator, rematchChallenge, self?.id]);

  const handleRematchDecline = useCallback(async () => {
    if (isSpectator) return;
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
  }, [dispatch, isSpectator, rematchChallenge, self?.id]);

  const handleResignConfirm = useCallback(async () => {
    if (isSpectator) return;
    if (!match || match.status !== ConnectFiveMatchStatus.ACTIVE) return;
    if (isResigning) return;

    try {
      setIsResigning(true);
      const updatedMatch = await resignConnectFiveMatch(match.id);
      dispatch(upsertMatch({match: updatedMatch, selfId}));
      setResignModalIsOpen(false);
    } catch (error) {
      displayErrorToast('Failed to resign match.');
    } finally {
      setIsResigning(false);
    }
  }, [dispatch, isResigning, isSpectator, match, selfId]);

  const handleResignModalClose = useCallback(() => {
    if (isResigning) return;
    setResignModalIsOpen(false);
  }, [isResigning]);

  const handleResultModalClose = useCallback(() => {
    setResultModalIsOpen(false);
  }, []);

  const handleToolSelect = useCallback((moveType: ConnectFiveMoveType) => {
    setActiveMoveType(moveType);
  }, []);

  const hasOpenedResultModal = useRef(false);
  const previousBoardStateRef = useRef<number[][] | null>(null);
  const previousMatchIdRef = useRef<number | null>(null);
  const isMatchActive = matchStatus === ConnectFiveMatchStatus.ACTIVE;
  const rematchViewState = useMemo<RematchViewState>(() => {
    if (isSpectator) return 'idle';
    if (!rematchChallenge) return 'idle';

    if (rematchChallenge.status === ConnectFiveChallengeStatus.PENDING) {
      if (rematchChallenge.challenger.id === self?.id) return 'requestedByMe';
      return 'requestedByOpponent';
    }

    if (rematchChallenge.status === ConnectFiveChallengeStatus.CANCELLED) return 'cancelled';
    if (rematchChallenge.status === ConnectFiveChallengeStatus.DECLINED) return 'declined';
    if (rematchChallenge.status === ConnectFiveChallengeStatus.ACCEPTED) return 'accepted';

    return 'idle';
  }, [isSpectator, rematchChallenge, self?.id]);
  const hasRematchChallenge = !!rematchChallenge;
  const canRequestRematch = !isSpectator && !hasRematchChallenge && (rematchStatus?.can_rematch ?? false);
  const showInsufficientFunds = !isSpectator && !hasRematchChallenge && (rematchStatus?.insufficient_funds ?? false);
  const loadMatch = useCallback(
    async (matchIdValue: number) => {
      const matchData = await getConnectFiveMatch(matchIdValue, {mine: 'any'});
      dispatch(upsertMatch({match: matchData, selfId}));
    },
    [dispatch, selfId],
  );

  const loadChallenge = useCallback(
    async (challengeIdValue: number) => {
      const challengeData = await getConnectFiveChallenge(challengeIdValue, {mine: 'any'});
      dispatch(upsertChallenge({challenge: challengeData, selfId}));
    },
    [dispatch, selfId],
  );

  const loadRematchStatus = useCallback(async () => {
    if (!match?.id || isSpectator) return;

    try {
      const response = await getConnectFiveRematchStatus(match.id);
      setRematchStatus(response);
    } catch (error) {
      displayErrorToast('Unable to load rematch status.');
    }
  }, [isSpectator, match?.id]);

  const playerAMatchPlayer = useMemo(() => getMatchPlayer(match, match?.player_a.id), [match]);
  const playerBMatchPlayer = useMemo(() => getMatchPlayer(match, match?.player_b.id), [match]);
  const opponentMatchPlayer = useMemo(() => {
    if (!match || !selfId) return null;
    const opponentId = match.player_a.id === selfId ? match.player_b.id : match.player_a.id;
    return getMatchPlayer(match, opponentId);
  }, [match, selfId]);
  const opponentPlayer = useMemo(() => {
    if (!match || !selfId) return null;
    return match.player_a.id === selfId ? match.player_b : match.player_a;
  }, [match, selfId]);
  const playerAClock = useMemo(() => {
    if (!match) return '0:00';
    const remaining = getRemainingMs(match, match.player_a.id, now);
    return formatRemainingTime(remaining);
  }, [match, now]);
  const playerBClock = useMemo(() => {
    if (!match) return '0:00';
    const remaining = getRemainingMs(match, match.player_b.id, now);
    return formatRemainingTime(remaining);
  }, [match, now]);
  const opponentClock = useMemo(() => {
    if (!match || !opponentPlayer) return '0:00';
    const remaining = getRemainingMs(match, opponentPlayer.id, now);
    return formatRemainingTime(remaining);
  }, [match, now, opponentPlayer]);
  const playerValue = useMemo(() => {
    if (!match || !selfId) return 0;
    return match.player_a.id === selfId ? 1 : 2;
  }, [match, selfId]);

  const previewState = useMemo(() => {
    if (!match || !self || !hoverPosition || isSpectator) return {cells: [], isValid: false};
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
  }, [activeMoveType, hoverPosition, isSpectator, match, playerValue, self]);
  const previewKeys = useMemo(() => {
    return new Set(previewState.cells.map((cell) => getCellKey(cell.x, cell.y)));
  }, [previewState.cells]);

  const selfMatchPlayer = useMemo(() => getMatchPlayer(match, selfId), [match, selfId]);
  const selfPlayer = useMemo(() => {
    if (!match || !selfId) return null;
    return match.player_a.id === selfId ? match.player_a : match.player_b;
  }, [match, selfId]);

  const selfClock = useMemo(() => {
    if (!match || !selfPlayer) return '0:00';
    const remaining = getRemainingMs(match, selfPlayer.id, now);
    return formatRemainingTime(remaining);
  }, [match, now, selfPlayer]);

  const bottomMatchPlayer = isSpectator ? playerBMatchPlayer : selfMatchPlayer;
  const bottomPlayer = isSpectator ? (match?.player_b ?? null) : selfPlayer;
  const bottomPlayerId = bottomPlayer?.id ?? null;
  const bottomClock = isSpectator ? playerBClock : selfClock;
  const topMatchPlayer = isSpectator ? playerAMatchPlayer : opponentMatchPlayer;
  const topPlayer = isSpectator ? (match?.player_a ?? null) : opponentPlayer;
  const topPlayerId = topPlayer?.id ?? null;
  const topClock = isSpectator ? playerAClock : opponentClock;

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
        if (!matchIdNumber) return;
        setIsLoading(true);
        await loadMatch(matchIdNumber);
      } catch (error) {
        displayErrorToast('Unable to load match details.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [loadMatch, matchIdNumber]);

  useEffect(() => {
    const loadData = async () => {
      if (!challengeId) return;

      try {
        await loadChallenge(challengeId);
      } catch (error) {
        displayErrorToast('Unable to load match details.');
      }
    };

    loadData();
  }, [challengeId, loadChallenge]);

  useEffect(() => {
    if (!matchStatus || matchStatus === ConnectFiveMatchStatus.ACTIVE) {
      hasOpenedResultModal.current = false;
      setRematchAction(null);
      setRematchStatus(null);
      return;
    }

    if (matchStatus === ConnectFiveMatchStatus.CANCELLED) return;
    if (isSpectator) return;
    if (hasOpenedResultModal.current) return;

    hasOpenedResultModal.current = true;
    setResultModalIsOpen(true);
  }, [isSpectator, match?.id, matchStatus]);

  useEffect(() => {
    if (!resultModalIsOpen) {
      setResultTnbDelta(0);
      return;
    }

    if (tnbDeltaTarget == null) {
      setResultTnbDelta(0);
      return;
    }

    setResultTnbDelta(0);

    if (tnbDeltaTarget === 0) return;

    const step = tnbDeltaTarget > 0 ? 1 : -1;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setResultTnbDelta((current) => {
          const nextValue = current + step;

          if ((step > 0 && nextValue >= tnbDeltaTarget) || (step < 0 && nextValue <= tnbDeltaTarget)) {
            if (intervalId !== null) {
              clearInterval(intervalId);
            }
            return tnbDeltaTarget;
          }

          return nextValue;
        });
      }, 60);
    }, 200);

    return () => {
      clearTimeout(startTimeoutId);
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [resultModalIsOpen, tnbDeltaTarget]);

  useEffect(() => {
    if (!matchStatus || matchStatus === ConnectFiveMatchStatus.ACTIVE) return;
    if (matchStatus === ConnectFiveMatchStatus.CANCELLED) return;

    loadRematchStatus();
  }, [loadRematchStatus, match?.id, matchStatus]);

  useEffect(() => {
    if (isSpectator) return;
    if (!rematchChallenge || rematchChallenge.status !== ConnectFiveChallengeStatus.ACCEPTED) return;
    if (!rematchChallenge.match_id) return;
    if (match?.id === rematchChallenge.match_id) return;

    setResultModalIsOpen(false);
    navigate(`/connect-five/matches/${rematchChallenge.match_id}`);
  }, [isSpectator, match?.id, navigate, rematchChallenge]);

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
            const shouldEnableClick = !isSpectator && previewState.isValid && isPreview;

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
                    {bombPieceVariant &&
                      BOMB_FRAGMENT_CONFIG.map((fragment, index) => (
                        <S.BombFragment
                          $delay={fragment.delay}
                          $offsetX={fragment.offsetX}
                          $offsetY={fragment.offsetY}
                          $rotation={fragment.rotation}
                          $size={fragment.size}
                          $variant={bombPieceVariant}
                          key={`bomb-fragment-${bombBlastSequence}-${cellKey}-${index}`}
                        />
                      ))}
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
    const statusBadge = getStatusBadge(match, participantId);

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
    if (!match || !isMatchActive) return null;

    const playerSide = (!isSpectator ? getPlayerSide(match, self?.id) : 'black') ?? 'black';
    const canPurchase = !!selfMatchPlayer && !isSpectator;

    return (
      <S.PurchasePanel>
        <S.PanelHeader>
          <S.PanelTitle>Purchase specials</S.PanelTitle>
          {canPurchase && (
            <S.PanelSubtitle>Remaining spend: {selfMatchPlayer.remaining_spend.toLocaleString()} TNB</S.PanelSubtitle>
          )}
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
              {canPurchase && (
                <Button
                  disabled={selfMatchPlayer.remaining_spend < SPECIAL_PRICES[specialType]}
                  isSubmitting={purchasingSpecials.has(specialType)}
                  onClick={() => handlePurchase(specialType)}
                  text="Buy"
                />
              )}
            </S.PurchaseRow>
          ))}
        </S.PurchaseList>
      </S.PurchasePanel>
    );
  };

  const renderResignPanel = () => {
    if (!match || !isMatchActive || isSpectator) return null;

    return (
      <S.PurchasePanel>
        <S.PanelHeader>
          <S.PanelTitle>Resign</S.PanelTitle>
          <S.PanelSubtitle>Resigning ends the match immediately.</S.PanelSubtitle>
        </S.PanelHeader>
        <Button
          color={ButtonColor.danger}
          isSubmitting={isResigning}
          onClick={() => setResignModalIsOpen(true)}
          text="Resign match"
        />
      </S.PurchasePanel>
    );
  };

  const renderResultModal = () => {
    if (!resultModalIsOpen || !match || !self || isSpectator) return null;

    const eloSnapshot = getEloSnapshot(match, self.id);
    const eloDelta = eloSnapshot?.delta ?? 0;
    let eloDeltaLabel = '--';
    let eloIcon = mdiMinus;

    if (eloSnapshot) {
      if (eloDelta > 0) {
        eloDeltaLabel = `+${eloDelta}`;
        eloIcon = mdiTrendingUp;
      } else if (eloDelta < 0) {
        eloDeltaLabel = `${eloDelta}`;
        eloIcon = mdiTrendingDown;
      } else {
        eloDeltaLabel = '=';
      }
    }

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
    const isWinner = match.winner === self.id;
    const tnbDeltaLabel =
      tnbDeltaTarget !== null ? `${resultTnbDelta > 0 ? '+' : ''}${resultTnbDelta.toLocaleString()} TNB` : null;
    const tnbVariant: 'loss' | 'win' = isWinner ? 'win' : 'loss';
    let resultVariant: 'loss' | 'win' = 'loss';
    let resultLabel = resultOutcomeLabel ?? 'You lost';

    if (isWinner) {
      resultVariant = 'win';
      resultLabel = resultOutcomeLabel ?? 'You won!';
    }

    return (
      <S.ResultModal close={handleResultModalClose} header="Match Results">
        <ModalBody>
          <S.ResultSummary $variant={resultVariant}>
            <S.ResultOutcome $variant={resultVariant}>{resultLabel}</S.ResultOutcome>
          </S.ResultSummary>
          <S.EloChange>
            <S.EloChangeLabel>Your ELO</S.EloChangeLabel>
            <S.EloChangeRow>
              <S.EloNumber>{eloSnapshot?.before ?? '--'}</S.EloNumber>
              <S.EloChangeArrow icon={mdiArrowRight} size={18} />
              <S.EloNumber>{eloSnapshot?.after ?? '--'}</S.EloNumber>
              <S.EloChangeValue $variant={eloVariant}>
                <span>({eloDeltaLabel})</span>
                <Icon icon={eloIcon} size={20} />
              </S.EloChangeValue>
            </S.EloChangeRow>
          </S.EloChange>
          {tnbDeltaLabel && (
            <S.ResultTnbChange>
              <S.ResultFaceIcon
                $variant={tnbVariant}
                icon={isWinner ? mdiEmoticonExcitedOutline : mdiEmoticonSadOutline}
                size={32}
              />
              <S.ResultTnbChangeValue $variant={tnbVariant}>{tnbDeltaLabel}</S.ResultTnbChangeValue>
            </S.ResultTnbChange>
          )}
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

  if (!match) {
    return (
      <S.Container className={className}>
        <EmptyText>Match not found.</EmptyText>
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <S.MatchLayout>
        <S.BoardSection>
          <S.PlayerRow>
            {renderPlayerInfo(topPlayer)}
            {renderPieceToolbar(topMatchPlayer, false, topPlayerId)}
            {renderClock(topClock, match.active_player?.id === topPlayerId)}
          </S.PlayerRow>
          {renderBoard()}
          <S.PlayerRow>
            {renderPlayerInfo(bottomPlayer)}
            {renderPieceToolbar(bottomMatchPlayer, !isSpectator, bottomPlayerId)}
            {renderClock(bottomClock, match.active_player?.id === bottomPlayerId)}
          </S.PlayerRow>
        </S.BoardSection>
        <S.Sidebar>
          {renderMatchInfo()}
          <ConnectFiveChat matchId={match.id} />
          {renderPrizePoolPanel()}
          {renderSpendPanel()}
          {renderPurchasePanel()}
          {renderResignPanel()}
        </S.Sidebar>
      </S.MatchLayout>
      {renderResultModal()}
      {resignModalIsOpen && !isSpectator ? (
        <ConfirmationModal
          close={handleResignModalClose}
          confirmText={isResigning ? 'Resigning...' : 'Resign'}
          header="Resign match"
          message="Are you sure you want to resign? This will end the match immediately."
          onConfirm={handleResignConfirm}
        />
      ) : null}
    </S.Container>
  );
};

export default ConnectFiveMatch;
