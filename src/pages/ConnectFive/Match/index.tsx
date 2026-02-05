import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

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
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ConnectFiveChallengeStatus, ConnectFiveMatchStatus, ConnectFiveMoveType, ConnectFiveSpecialType} from 'enums';
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

import connectFiveBombSound from './assets/sounds/connect-five-bomb.mp3';
import connectFiveDoubleSound from './assets/sounds/connect-five-double.mp3';
import connectFivePieceSound from './assets/sounds/connect-five-piece.mp3';
import connectFiveWinSound from './assets/sounds/connect-five-win.mp3';
import Board from './Board';
import PieceToolbar from './PieceToolbar';
import PlayerInfo from './PlayerInfo';
import ResignModal from './ResignModal';
import ResultModal from './ResultModal';
import MatchSidebar from './Sidebar';
import * as S from './Styles';

type PlayerSide = 'black' | 'white';

type RematchAction = 'accept' | 'cancel' | 'decline' | 'request';
type RematchViewState = 'accepted' | 'cancelled' | 'declined' | 'idle' | 'requestedByMe' | 'requestedByOpponent';

const BOARD_SIZE = 15;
const RESULT_TNB_ANIMATION_DELAY_MS = 200;
const RESULT_TNB_ANIMATION_DURATION_MS = 2400;

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

const MOVE_TO_SPECIAL_TYPE: Record<ConnectFiveMoveType, ConnectFiveSpecialType | null> = {
  [ConnectFiveMoveType.BOMB]: ConnectFiveSpecialType.BOMB,
  [ConnectFiveMoveType.H2]: ConnectFiveSpecialType.H2,
  [ConnectFiveMoveType.SINGLE]: null,
  [ConnectFiveMoveType.V2]: ConnectFiveSpecialType.V2,
};

const MOVE_SOUNDS: Record<ConnectFiveMoveType, string> = {
  [ConnectFiveMoveType.BOMB]: connectFiveBombSound,
  [ConnectFiveMoveType.H2]: connectFiveDoubleSound,
  [ConnectFiveMoveType.SINGLE]: connectFivePieceSound,
  [ConnectFiveMoveType.V2]: connectFiveDoubleSound,
};

const formatRemainingTime = (milliseconds: number): string => {
  const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const getCellKey = (x: number, y: number): string => `${x}-${y}`;

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

const getPlayerSide = (match: ConnectFiveMatchType, userId: number): PlayerSide => {
  return match.player_a.id === userId ? 'black' : 'white';
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

const getRandomResultLabel = (labels: string[]): string => {
  return labels[Math.floor(Math.random() * labels.length)];
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
  const hasOpenedResultModal = useRef(false);
  const {matchId} = useParams();
  const matchesById = useSelector(getConnectFiveMatchesById);
  const navigate = useNavigate();
  const previousBoardStateRef = useRef<number[][] | null>(null);
  const previousMatchIdRef = useRef<number | null>(null);
  const self = useSelector(getSelf);

  const matchIdNumber = matchId ? Number(matchId) : null;
  const match = matchIdNumber ? matchesById[matchIdNumber] : null;
  const matchBoardState = match?.board_state ?? null;
  const matchIdValue = match?.id ?? null;
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

  const hasRematchChallenge = !!rematchChallenge;
  const canRequestRematch = !isSpectator && !hasRematchChallenge && (rematchStatus?.can_rematch ?? false);
  const showInsufficientFunds = !isSpectator && !hasRematchChallenge && (rematchStatus?.insufficient_funds ?? false);

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
  const bottomPlayerSide = match && bottomPlayerId ? getPlayerSide(match, bottomPlayerId) : null;
  const selfSide = match && selfId ? getPlayerSide(match, selfId) : null;
  const topPlayerSide = match && topPlayerId ? getPlayerSide(match, topPlayerId) : null;
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

  const loadChallenge = useCallback(
    async (challengeIdValue: number) => {
      const challengeData = await getConnectFiveChallenge(challengeIdValue, {mine: 'any'});
      dispatch(upsertChallenge({challenge: challengeData, selfId}));
    },
    [dispatch, selfId],
  );

  const loadMatch = useCallback(
    async (matchIdForLoad: number) => {
      const matchData = await getConnectFiveMatch(matchIdForLoad, {mine: 'any'});
      dispatch(upsertMatch({match: matchData, selfId}));
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

  useEffect(() => {
    const resetAnimationState = () => {
      setBombBlastKeys((prev) => (prev.size ? new Set() : prev));
      setBombBlastPieces((prev) => (Object.keys(prev).length ? {} : prev));
      setBombBlastSequence(0);
      setLastMoveKeys((prev) => (prev.size ? new Set() : prev));
      setLastMoveSequence(0);
    };

    if (matchIdValue == null || !matchBoardState) {
      previousBoardStateRef.current = null;
      previousMatchIdRef.current = null;
      resetAnimationState();
      return;
    }

    if (previousMatchIdRef.current !== matchIdValue) {
      previousMatchIdRef.current = matchIdValue;
      previousBoardStateRef.current = matchBoardState;
      resetAnimationState();
      return;
    }

    const previousBoardState = previousBoardStateRef.current;

    if (!previousBoardState) {
      previousBoardStateRef.current = matchBoardState;
      return;
    }

    let hasChanges = false;
    const nextBombKeys: string[] = [];
    const nextBombPieces: Record<string, PlayerSide> = {};
    const nextMoveKeys: string[] = [];

    matchBoardState.forEach((row, y) => {
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

    if (!hasChanges) {
      previousBoardStateRef.current = matchBoardState;
      return;
    }

    let soundSource: string | null = null;

    if (nextBombKeys.length) {
      soundSource = MOVE_SOUNDS[ConnectFiveMoveType.BOMB];
    } else if (nextMoveKeys.length === 2) {
      soundSource = MOVE_SOUNDS[ConnectFiveMoveType.H2];
    } else if (nextMoveKeys.length === 1) {
      soundSource = MOVE_SOUNDS[ConnectFiveMoveType.SINGLE];
    }

    if (soundSource) {
      const audio = new Audio(soundSource);
      audio.play().catch(() => undefined);
    }

    setLastMoveKeys((prev) => {
      if (!nextMoveKeys.length) {
        return prev.size ? new Set() : prev;
      }

      return new Set(nextMoveKeys);
    });

    if (nextMoveKeys.length) {
      setLastMoveSequence((prev) => prev + 1);
    }

    if (nextBombKeys.length) {
      setBombBlastKeys(new Set(nextBombKeys));
      setBombBlastPieces(nextBombPieces);
      setBombBlastSequence((prev) => prev + 1);
    } else {
      setBombBlastKeys((prev) => (prev.size ? new Set() : prev));
      setBombBlastPieces((prev) => (Object.keys(prev).length ? {} : prev));
    }

    previousBoardStateRef.current = matchBoardState;
  }, [matchBoardState, matchIdValue]);

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

    let animationFrameId: number | null = null;
    let startTime: number | null = null;
    const startTimeoutId = setTimeout(() => {
      if (tnbDeltaTarget > 0) {
        const audio = new Audio(connectFiveWinSound);
        audio.play().catch(() => undefined);
      }

      const animate = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp;
        }

        const elapsedMs = timestamp - startTime;
        const progress = Math.min(elapsedMs / RESULT_TNB_ANIMATION_DURATION_MS, 1);
        const nextValue = progress >= 1 ? tnbDeltaTarget : Math.round(tnbDeltaTarget * progress);

        setResultTnbDelta(nextValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, RESULT_TNB_ANIMATION_DELAY_MS);

    return () => {
      clearTimeout(startTimeoutId);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
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
            <PlayerInfo player={topPlayer} playerSide={topPlayerSide} />
            <PieceToolbar
              activeMoveType={activeMoveType}
              getInventoryCount={getInventoryCount}
              isInteractive={false}
              matchPlayer={topMatchPlayer}
              moveToSpecialType={MOVE_TO_SPECIAL_TYPE}
              onToolSelect={handleToolSelect}
              playerSide={topPlayerSide}
            />
            <S.Clock $isActive={match.active_player?.id === topPlayerId}>{topClock}</S.Clock>
          </S.PlayerRow>
          <Board
            bombBlastKeys={bombBlastKeys}
            bombBlastPieces={bombBlastPieces}
            bombBlastSequence={bombBlastSequence}
            boardState={match.board_state}
            isSpectator={isSpectator}
            lastMoveKeys={lastMoveKeys}
            lastMoveSequence={lastMoveSequence}
            onCellClick={handleCellClick}
            onCellHover={handleCellHover}
            onCellLeave={() => setHoverPosition(null)}
            previewKeys={previewKeys}
            previewState={previewState}
            previewVariant={previewVariant}
            winningKeys={winningKeys}
          />
          <S.PlayerRow>
            <PlayerInfo player={bottomPlayer} playerSide={bottomPlayerSide} />
            <PieceToolbar
              activeMoveType={activeMoveType}
              getInventoryCount={getInventoryCount}
              isInteractive={!isSpectator}
              matchPlayer={bottomMatchPlayer}
              moveToSpecialType={MOVE_TO_SPECIAL_TYPE}
              onToolSelect={handleToolSelect}
              playerSide={bottomPlayerSide}
            />
            <S.Clock $isActive={match.active_player?.id === bottomPlayerId}>{bottomClock}</S.Clock>
          </S.PlayerRow>
        </S.BoardSection>
        <MatchSidebar
          isMatchActive={isMatchActive}
          isResigning={isResigning}
          isSpectator={isSpectator}
          match={match}
          onPurchase={handlePurchase}
          onResignClick={() => setResignModalIsOpen(true)}
          participantId={participantId}
          playerAMatchPlayer={playerAMatchPlayer}
          playerBMatchPlayer={playerBMatchPlayer}
          purchasingSpecials={purchasingSpecials}
          selfMatchPlayer={selfMatchPlayer}
          selfSide={selfSide}
        />
      </S.MatchLayout>
      <ResultModal
        canRequestRematch={canRequestRematch}
        isOpen={resultModalIsOpen}
        isRematchSubmitting={isRematchSubmitting}
        match={match}
        onClose={handleResultModalClose}
        onRematchAccept={handleRematchAccept}
        onRematchCancel={handleRematchCancel}
        onRematchDecline={handleRematchDecline}
        onRematchRequest={handleRematchRequest}
        rematchAction={rematchAction}
        rematchViewState={rematchViewState}
        resultOutcomeLabel={resultOutcomeLabel}
        resultTnbDelta={resultTnbDelta}
        selfId={selfId ?? null}
        showInsufficientFunds={showInsufficientFunds}
        tnbDeltaTarget={tnbDeltaTarget}
      />
      <ResignModal
        isOpen={resignModalIsOpen}
        isResigning={isResigning}
        isSpectator={isSpectator}
        onClose={handleResignModalClose}
        onConfirm={handleResignConfirm}
      />
    </S.Container>
  );
};

export default ConnectFiveMatch;
