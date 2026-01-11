import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

import {
  acceptConnectFiveChallenge,
  cancelConnectFiveChallenge,
  getConnectFiveChallenge,
  getConnectFiveMatch,
  purchaseConnectFiveSpecial,
  submitConnectFiveMove,
} from 'api/connectFive';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import EmptyText from 'components/EmptyText';
import {ConnectFiveChallengeStatus, ConnectFiveMatchStatus, ConnectFiveMoveType, ConnectFiveSpecialType} from 'enums';
import {getConnectFiveChallengesById, getConnectFiveMatchesById, getSelf} from 'selectors/state';
import {upsertChallenge, upsertMatch} from 'store/connectFive';
import {AppDispatch, ConnectFiveMatch, ConnectFiveMatchPlayer, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const BOARD_SIZE = 14;

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

const SPECIAL_LABELS: Record<ConnectFiveSpecialType, string> = {
  [ConnectFiveSpecialType.BOMB]: 'Bomb',
  [ConnectFiveSpecialType.CROSS4]: 'Cross 4',
  [ConnectFiveSpecialType.H2]: 'Horizontal 2',
  [ConnectFiveSpecialType.V2]: 'Vertical 2',
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

const formatInventory = (player: ConnectFiveMatchPlayer | null): string => {
  if (!player) return 'H2: 0 · V2: 0 · Cross: 0 · Bomb: 0';

  return `H2: ${player.inventory_h2} · V2: ${player.inventory_v2} · Cross: ${player.inventory_cross4} · Bomb: ${player.inventory_bomb}`;
};

const getMatchPlayer = (match: ConnectFiveMatch | null, userId?: number | null): ConnectFiveMatchPlayer | null => {
  if (!match || !userId) return null;
  return match.players.find((player) => player.user.id === userId) || null;
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
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isSubmittingMove, setIsSubmittingMove] = useState(false);
  const [now, setNow] = useState(Date.now());

  const {challengeId} = useParams();
  const challengesById = useSelector(getConnectFiveChallengesById);
  const dispatch = useDispatch<AppDispatch>();
  const matchesById = useSelector(getConnectFiveMatchesById);
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const challengeIdNumber = challengeId ? Number(challengeId) : null;
  const challenge = challengeIdNumber ? challengesById[challengeIdNumber] : null;
  const match = challenge?.match_id ? matchesById[challenge.match_id] : null;

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
        setIsPurchasing(true);
        const updatedMatch = await purchaseConnectFiveSpecial(match.id, {
          special_type: specialType,
        });
        dispatch(upsertMatch(updatedMatch));
      } catch (error) {
        displayErrorToast('Purchase failed. Check your spend limit.');
      } finally {
        setIsPurchasing(false);
      }
    },
    [dispatch, match],
  );

  const handleToolSelect = useCallback((moveType: ConnectFiveMoveType) => {
    setActiveMoveType(moveType);
  }, []);

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

  const playerAMatchPlayer = useMemo(() => getMatchPlayer(match, match?.player_a.id), [match]);
  const playerBMatchPlayer = useMemo(() => getMatchPlayer(match, match?.player_b.id), [match]);
  const selfMatchPlayer = useMemo(() => getMatchPlayer(match, self?.id), [match, self?.id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
            const isPreview = previewKeys.has(cellKey);
            const isInvalid = isPreview && !previewState.isValid;

            return (
              <S.Cell
                key={cellKey}
                $isPreview={isPreview}
                $isPreviewInvalid={isInvalid}
                onClick={() => {
                  if (!previewState.isValid || !isPreview) return;
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

  const renderChallengeActions = () => {
    if (!challenge || !self) return null;

    if (challenge.status !== ConnectFiveChallengeStatus.PENDING) {
      return (
        <S.StatusBanner>
          <S.StatusText>Challenge status: {challenge.status}</S.StatusText>
        </S.StatusBanner>
      );
    }

    if (challenge.challenger.id === self.id) {
      return (
        <S.StatusBanner>
          <S.StatusText>Challenge sent. Awaiting acceptance.</S.StatusText>
          <Button onClick={handleCancelChallenge} text="Cancel challenge" />
        </S.StatusBanner>
      );
    }

    return (
      <S.StatusBanner>
        <S.StatusText>{challenge.challenger.username} challenged you to Connect 5.</S.StatusText>
        <Button onClick={handleAcceptChallenge} text="Accept challenge" />
      </S.StatusBanner>
    );
  };

  const renderMatchInfo = () => {
    if (!match) return null;

    const isActive = match.status === ConnectFiveMatchStatus.ACTIVE;

    return (
      <S.MatchInfo>
        <S.InfoRow>
          <S.InfoLabel>Status</S.InfoLabel>
          <S.InfoValue>{match.status}</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>Prize pool</S.InfoLabel>
          <S.InfoValue>{match.prize_pool_total.toLocaleString()} TNB</S.InfoValue>
        </S.InfoRow>
        <S.InfoRow>
          <S.InfoLabel>Max spend</S.InfoLabel>
          <S.InfoValue>{match.max_spend_amount.toLocaleString()} TNB</S.InfoValue>
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

  const renderPlayers = () => {
    if (!match) return null;

    return (
      <S.Players>
        <S.PlayerCard $isActive={match.active_player?.id === match.player_a.id}>
          <Avatar src={match.player_a.avatar} size="36px" />
          <div>
            <S.PlayerName>{match.player_a.username}</S.PlayerName>
            <S.PlayerMeta>Time: {playerAClock}</S.PlayerMeta>
            <S.PlayerMeta>Spend left: {playerAMatchPlayer?.remaining_spend ?? 0} TNB</S.PlayerMeta>
            <S.PlayerMeta>Inventory: {formatInventory(playerAMatchPlayer)}</S.PlayerMeta>
          </div>
        </S.PlayerCard>
        <S.PlayerCard $isActive={match.active_player?.id === match.player_b.id}>
          <Avatar src={match.player_b.avatar} size="36px" />
          <div>
            <S.PlayerName>{match.player_b.username}</S.PlayerName>
            <S.PlayerMeta>Time: {playerBClock}</S.PlayerMeta>
            <S.PlayerMeta>Spend left: {playerBMatchPlayer?.remaining_spend ?? 0} TNB</S.PlayerMeta>
            <S.PlayerMeta>Inventory: {formatInventory(playerBMatchPlayer)}</S.PlayerMeta>
          </div>
        </S.PlayerCard>
      </S.Players>
    );
  };

  const renderPurchasePanel = () => {
    if (!match || !selfMatchPlayer) return null;

    return (
      <S.PurchasePanel>
        <S.PanelHeader>
          <S.PanelTitle>Purchase specials</S.PanelTitle>
          <S.PanelSubtitle>Remaining spend: {selfMatchPlayer.remaining_spend.toLocaleString()} TNB</S.PanelSubtitle>
        </S.PanelHeader>
        <S.PurchaseList>
          {(Object.values(ConnectFiveSpecialType) as ConnectFiveSpecialType[]).map((specialType) => (
            <S.PurchaseRow key={specialType}>
              <S.PurchaseInfo>
                <S.PurchaseName>{SPECIAL_LABELS[specialType]}</S.PurchaseName>
                <S.PurchaseMeta>
                  Cost: {SPECIAL_PRICES[specialType]} TNB · Inventory: {getInventoryCount(selfMatchPlayer, specialType)}
                </S.PurchaseMeta>
              </S.PurchaseInfo>
              <Button
                disabled={isPurchasing || selfMatchPlayer.remaining_spend < SPECIAL_PRICES[specialType]}
                onClick={() => handlePurchase(specialType)}
                text={isPurchasing ? 'Purchasing...' : 'Buy'}
              />
            </S.PurchaseRow>
          ))}
        </S.PurchaseList>
      </S.PurchasePanel>
    );
  };

  const renderToolbar = () => {
    if (!match) return null;

    return (
      <S.Toolbar>
        {(Object.values(ConnectFiveMoveType) as ConnectFiveMoveType[]).map((moveType) => {
          const isSingle = moveType === ConnectFiveMoveType.SINGLE;
          const specialType = MOVE_TO_SPECIAL_TYPE[moveType];
          const inventory = specialType ? getInventoryCount(selfMatchPlayer, specialType) : 0;
          const isDisabled = !!specialType && !inventory;

          return (
            <S.ToolButton
              key={moveType}
              $isActive={activeMoveType === moveType}
              $isDisabled={isDisabled}
              onClick={() => {
                if (isDisabled) return;
                handleToolSelect(moveType);
              }}
              type="button"
            >
              <S.ToolLabel>{TOOL_LABELS[moveType]}</S.ToolLabel>
              {!isSingle && <S.ToolCount>x{inventory}</S.ToolCount>}
            </S.ToolButton>
          );
        })}
      </S.Toolbar>
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

      {renderChallengeActions()}

      {match ? (
        <S.GameLayout>
          <S.BoardSection>
            {renderPlayers()}
            <S.BoardWrapper>
              {renderBoard()}
              {renderToolbar()}
            </S.BoardWrapper>
          </S.BoardSection>
          <S.Sidebar>
            {renderMatchInfo()}
            {renderPurchasePanel()}
          </S.Sidebar>
        </S.GameLayout>
      ) : (
        <S.PendingState>
          <S.PendingTitle>Challenge pending</S.PendingTitle>
          <S.PendingText>Waiting for the opponent to accept the challenge.</S.PendingText>
        </S.PendingState>
      )}
    </S.Container>
  );
};

export default ConnectFiveGame;
