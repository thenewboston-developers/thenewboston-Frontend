import {ComponentType, SVGProps, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  getConnectFiveChallenge,
  getConnectFiveMatch,
  purchaseConnectFiveSpecial,
  submitConnectFiveMove,
} from 'api/connectFive';
import Badge, {BadgeStyle} from 'components/Badge';
import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import {
  ConnectFiveChallengeStatus,
  ConnectFiveMatchStatus,
  ConnectFiveMoveType,
  ConnectFiveSpecialType,
  ToastType,
} from 'enums';
import {getConnectFiveChallengesById, getConnectFiveMatchesById, getSelf} from 'selectors/state';
import {upsertChallenge, upsertMatch} from 'store/connectFive';
import {AppDispatch, ConnectFiveMatch, ConnectFiveMatchPlayer, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import {ReactComponent as BombIcon} from './assets/bomb.svg';
import {ReactComponent as Cross4Icon} from './assets/cross4.svg';
import {ReactComponent as Horizontal2Icon} from './assets/horizontal2.svg';
import {ReactComponent as SingleIcon} from './assets/single.svg';
import {ReactComponent as Vertical2Icon} from './assets/vertical2.svg';
import * as S from './Styles';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type PlayerSide = 'playerA' | 'playerB';

const BOARD_SIZE = 14;

const PLAYER_SIDE_LABELS: Record<PlayerSide, string> = {
  playerA: 'blue',
  playerB: 'orange',
};

const SPECIAL_PRICES: Record<ConnectFiveSpecialType, number> = {
  [ConnectFiveSpecialType.BOMB]: 3,
  [ConnectFiveSpecialType.CROSS4]: 8,
  [ConnectFiveSpecialType.H2]: 4,
  [ConnectFiveSpecialType.V2]: 4,
};

const TOOL_LABELS: Record<ConnectFiveMoveType, string> = {
  [ConnectFiveMoveType.BOMB]: 'Bomb',
  [ConnectFiveMoveType.CROSS4]: 'Cross 4',
  [ConnectFiveMoveType.H2]: 'Horizontal 2',
  [ConnectFiveMoveType.SINGLE]: 'Single',
  [ConnectFiveMoveType.V2]: 'Vertical 2',
};

const TOOL_ICONS: Record<ConnectFiveMoveType, IconComponent> = {
  [ConnectFiveMoveType.BOMB]: BombIcon,
  [ConnectFiveMoveType.CROSS4]: Cross4Icon,
  [ConnectFiveMoveType.H2]: Horizontal2Icon,
  [ConnectFiveMoveType.SINGLE]: SingleIcon,
  [ConnectFiveMoveType.V2]: Vertical2Icon,
};

const ORDERED_MOVE_TYPES: ConnectFiveMoveType[] = [
  ConnectFiveMoveType.SINGLE,
  ConnectFiveMoveType.H2,
  ConnectFiveMoveType.V2,
  ConnectFiveMoveType.CROSS4,
  ConnectFiveMoveType.BOMB,
];

const ORDERED_SPECIAL_TYPES: ConnectFiveSpecialType[] = [
  ConnectFiveSpecialType.H2,
  ConnectFiveSpecialType.V2,
  ConnectFiveSpecialType.CROSS4,
  ConnectFiveSpecialType.BOMB,
];

const SPECIAL_LABELS: Record<ConnectFiveSpecialType, string> = {
  [ConnectFiveSpecialType.BOMB]: 'Bomb',
  [ConnectFiveSpecialType.CROSS4]: 'Cross 4',
  [ConnectFiveSpecialType.H2]: 'Horizontal 2',
  [ConnectFiveSpecialType.V2]: 'Vertical 2',
};

const SPECIAL_ICONS: Record<ConnectFiveSpecialType, IconComponent> = {
  [ConnectFiveSpecialType.BOMB]: BombIcon,
  [ConnectFiveSpecialType.CROSS4]: Cross4Icon,
  [ConnectFiveSpecialType.H2]: Horizontal2Icon,
  [ConnectFiveSpecialType.V2]: Vertical2Icon,
};

const MOVE_TO_SPECIAL_TYPE: Record<ConnectFiveMoveType, ConnectFiveSpecialType | null> = {
  [ConnectFiveMoveType.BOMB]: ConnectFiveSpecialType.BOMB,
  [ConnectFiveMoveType.CROSS4]: ConnectFiveSpecialType.CROSS4,
  [ConnectFiveMoveType.H2]: ConnectFiveSpecialType.H2,
  [ConnectFiveMoveType.SINGLE]: null,
  [ConnectFiveMoveType.V2]: ConnectFiveSpecialType.V2,
};

const getCellKey = (x: number, y: number): string => `${x}-${y}`;

const getInventoryCount = (player: ConnectFiveMatchPlayer | null, specialType: ConnectFiveSpecialType): number => {
  if (!player) return 0;

  const mapping: Record<ConnectFiveSpecialType, number> = {
    [ConnectFiveSpecialType.BOMB]: player.inventory_bomb,
    [ConnectFiveSpecialType.CROSS4]: player.inventory_cross4,
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
  return match.player_a.id === userId ? 'playerA' : 'playerB';
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

  if (moveType === ConnectFiveMoveType.CROSS4) {
    return [
      {x: x - 1, y},
      {x: x + 1, y},
      {x, y: y - 1},
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
  const [hoverPosition, setHoverPosition] = useState<{x: number; y: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingMove, setIsSubmittingMove] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [purchasingSpecials, setPurchasingSpecials] = useState<Set<ConnectFiveSpecialType>>(new Set());

  const {challengeId} = useParams();
  const challengeIdNumber = challengeId ? Number(challengeId) : null;
  const challengesById = useSelector(getConnectFiveChallengesById);
  const challenge = challengeIdNumber ? challengesById[challengeIdNumber] : null;
  const dispatch = useDispatch<AppDispatch>();
  const matchesById = useSelector(getConnectFiveMatchesById);
  const match = challenge?.match_id ? matchesById[challenge.match_id] : null;
  const navigate = useNavigate();
  const self = useSelector(getSelf);

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

  const handleToolSelect = useCallback((moveType: ConnectFiveMoveType) => {
    setActiveMoveType(moveType);
  }, []);

  const hasHandledCancellation = useRef(false);
  const isMatchActive = match?.status === ConnectFiveMatchStatus.ACTIVE;
  const loadMatch = useCallback(
    async (matchId: number) => {
      const matchData = await getConnectFiveMatch(matchId);
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

  const renderBoard = () => {
    if (!match) return null;

    return (
      <S.Board>
        {match.board_state.map((row, y) =>
          row.map((value, x) => {
            const cellKey = getCellKey(x, y);
            const isAnchor = hoverPosition?.x === x && hoverPosition?.y === y;
            const isCross4Anchor = activeMoveType === ConnectFiveMoveType.CROSS4 && isAnchor;
            const isPreview = previewKeys.has(cellKey);
            const isInvalid = isPreview && !previewState.isValid;
            const shouldEnableClick = previewState.isValid && (isPreview || isCross4Anchor);

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
                {value === 1 && <S.Piece $variant="playerA" />}
                {value === 2 && <S.Piece $variant="playerB" />}
                {isPreview && <S.Preview $isInvalid={isInvalid} />}
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
    const statusBadge = getStatusBadge(match, self?.id);

    return (
      <S.MatchInfo>
        <S.InfoRow>
          <S.InfoLabel>Status</S.InfoLabel>
          <Badge badgeStyle={statusBadge.badgeStyle}>{statusBadge.label}</Badge>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>Prize pool</S.InfoLabel>
          <S.InfoValue>{match.prize_pool_total.toLocaleString()} TNB</S.InfoValue>
        </S.InfoRow>
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

  const renderPlayerInfo = (player: {id: number; username: string; avatar: string | null} | null) => {
    if (!match || !player) return null;

    const playerSide = getPlayerSide(match, player.id);

    if (!playerSide) return null;

    const playerSideLabel = PLAYER_SIDE_LABELS[playerSide];
    const profilePath = `/profile/${player.id}`;

    return (
      <S.PlayerLabel>
        <Link to={profilePath}>
          <S.PlayerAvatar $variant={playerSide} size="44px" src={player.avatar} />
        </Link>
        <S.PlayerLabelDetails>
          <S.PlayerName $isClickable as={Link} to={profilePath}>
            {player.username}
          </S.PlayerName>
          <S.PlayerSideText $variant={playerSide}>Playing as {playerSideLabel}</S.PlayerSideText>
        </S.PlayerLabelDetails>
      </S.PlayerLabel>
    );
  };

  const renderPurchasePanel = () => {
    if (!match || !selfMatchPlayer) return null;

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
        <S.Header>
          <S.Title>Connect 5</S.Title>
        </S.Header>
        <S.LoadingState>Loading game...</S.LoadingState>
      </S.Container>
    );
  }

  if (!challenge) {
    return (
      <S.Container className={className}>
        <S.Header>
          <S.Title>Connect 5</S.Title>
        </S.Header>
        <EmptyText>Challenge not found.</EmptyText>
      </S.Container>
    );
  }

  return (
    <S.Container className={className}>
      <S.Header>
        <S.Title>Connect 5 Game</S.Title>
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
            <S.BoardWrapper>{renderBoard()}</S.BoardWrapper>
            <S.PlayerRow>
              {renderPlayerInfo(selfPlayer)}
              {renderPieceToolbar(selfMatchPlayer, true, self?.id)}
              {renderClock(selfClock, match.active_player?.id === selfPlayer?.id)}
            </S.PlayerRow>
          </S.BoardSection>
          <S.Sidebar>
            {renderMatchInfo()}
            {renderSpendPanel()}
            {renderPurchasePanel()}
          </S.Sidebar>
        </S.GameLayout>
      ) : (
        renderPendingState()
      )}
    </S.Container>
  );
};

export default ConnectFiveGame;
