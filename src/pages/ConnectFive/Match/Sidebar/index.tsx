import {ComponentType, SVGProps} from 'react';

import Badge, {BadgeStyle} from 'components/Badge';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import PrizePoolBreakdown from 'components/PrizePoolBreakdown';
import {ConnectFiveMatchStatus, ConnectFiveSpecialType} from 'enums';
import {ConnectFiveMatch, ConnectFiveMatchPlayer, SFC} from 'types';

import {ReactComponent as BombIcon} from '../assets/bomb.svg';
import {ReactComponent as Horizontal2Icon} from '../assets/horizontal2.svg';
import {ReactComponent as Vertical2Icon} from '../assets/vertical2.svg';
import ConnectFiveChat from '../Chat';
import * as MatchStyles from '../Styles';

import * as S from './Styles';

interface MatchSidebarProps {
  isMatchActive: boolean;
  isResigning: boolean;
  isSpectator: boolean;
  match: ConnectFiveMatch;
  participantId: number | null;
  playerAMatchPlayer: ConnectFiveMatchPlayer | null;
  playerBMatchPlayer: ConnectFiveMatchPlayer | null;
  purchasingSpecials: Set<ConnectFiveSpecialType>;
  selfMatchPlayer: ConnectFiveMatchPlayer | null;
  selfSide: 'black' | 'white' | null;
  onPurchase: (specialType: ConnectFiveSpecialType) => void;
  onResignClick: () => void;
}

const ORDERED_SPECIAL_TYPES: ConnectFiveSpecialType[] = [
  ConnectFiveSpecialType.H2,
  ConnectFiveSpecialType.V2,
  ConnectFiveSpecialType.BOMB,
];

const SPECIAL_ICONS: Record<ConnectFiveSpecialType, ComponentType<SVGProps<SVGSVGElement>>> = {
  [ConnectFiveSpecialType.BOMB]: BombIcon,
  [ConnectFiveSpecialType.H2]: Horizontal2Icon,
  [ConnectFiveSpecialType.V2]: Vertical2Icon,
};

const SPECIAL_LABELS: Record<ConnectFiveSpecialType, string> = {
  [ConnectFiveSpecialType.BOMB]: 'Bomb',
  [ConnectFiveSpecialType.H2]: 'Horizontal 2',
  [ConnectFiveSpecialType.V2]: 'Vertical 2',
};

const SPECIAL_PRICES: Record<ConnectFiveSpecialType, number> = {
  [ConnectFiveSpecialType.BOMB]: 3,
  [ConnectFiveSpecialType.H2]: 4,
  [ConnectFiveSpecialType.V2]: 4,
};

const getFinishReasonLabel = (match: ConnectFiveMatch): string | null => {
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

const MatchSidebar: SFC<MatchSidebarProps> = ({
  className,
  isMatchActive,
  isResigning,
  isSpectator,
  match,
  participantId,
  playerAMatchPlayer,
  playerBMatchPlayer,
  purchasingSpecials,
  selfMatchPlayer,
  selfSide,
  onPurchase,
  onResignClick,
}) => {
  const canPurchase = !!selfMatchPlayer && !isSpectator;
  const playerSide = (!isSpectator ? selfSide : 'black') ?? 'black';

  const renderMatchInfo = () => {
    const isActive = match.status === ConnectFiveMatchStatus.ACTIVE;
    const finishReason = getFinishReasonLabel(match);
    const statusBadge = getStatusBadge(match, participantId);

    return (
      <MatchStyles.MatchInfo>
        <MatchStyles.InfoRow>
          <MatchStyles.InfoLabel>Status</MatchStyles.InfoLabel>
          <Badge badgeStyle={statusBadge.badgeStyle}>{statusBadge.label}</Badge>
        </MatchStyles.InfoRow>
        {finishReason && (
          <MatchStyles.InfoRow>
            <MatchStyles.InfoLabel>Finish reason</MatchStyles.InfoLabel>
            <MatchStyles.InfoValue>{finishReason}</MatchStyles.InfoValue>
          </MatchStyles.InfoRow>
        )}
        {!isActive && match.winner && (
          <MatchStyles.InfoRow>
            <MatchStyles.InfoLabel>Winner</MatchStyles.InfoLabel>
            <MatchStyles.InfoValue>
              {match.winner === match.player_a.id ? match.player_a.username : match.player_b.username}
            </MatchStyles.InfoValue>
          </MatchStyles.InfoRow>
        )}
      </MatchStyles.MatchInfo>
    );
  };

  const renderPrizePoolPanel = () => {
    const prizePoolSpent = match.players?.reduce((total, player) => total + player.spent_total, 0) ?? 0;
    const prizePoolTotal = match.prize_pool_total;
    const prizePoolInitial = Math.max(prizePoolTotal - prizePoolSpent, 0);

    return (
      <S.PrizePoolPanel>
        <MatchStyles.PanelHeader>
          <MatchStyles.PanelTitle>Prize pool</MatchStyles.PanelTitle>
        </MatchStyles.PanelHeader>
        <PrizePoolBreakdown initial={prizePoolInitial} spent={prizePoolSpent} ticker="TNB" total={prizePoolTotal} />
      </S.PrizePoolPanel>
    );
  };

  const renderPurchasePanel = () => {
    if (!isMatchActive) return null;

    return (
      <S.PurchasePanel>
        <MatchStyles.PanelHeader>
          <MatchStyles.PanelTitle>Purchase specials</MatchStyles.PanelTitle>
          {canPurchase && (
            <MatchStyles.PanelSubtitle>
              Remaining spend: {selfMatchPlayer?.remaining_spend.toLocaleString()} TNB
            </MatchStyles.PanelSubtitle>
          )}
        </MatchStyles.PanelHeader>
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
                  disabled={(selfMatchPlayer?.remaining_spend ?? 0) < SPECIAL_PRICES[specialType]}
                  isSubmitting={purchasingSpecials.has(specialType)}
                  onClick={() => onPurchase(specialType)}
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
    if (!isMatchActive || isSpectator) return null;

    return (
      <S.PurchasePanel>
        <MatchStyles.PanelHeader>
          <MatchStyles.PanelTitle>Resign</MatchStyles.PanelTitle>
          <MatchStyles.PanelSubtitle>Resigning ends the match immediately.</MatchStyles.PanelSubtitle>
        </MatchStyles.PanelHeader>
        <Button color={ButtonColor.danger} isSubmitting={isResigning} onClick={onResignClick} text="Resign match" />
      </S.PurchasePanel>
    );
  };

  const renderSpendPanel = () => {
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
        <MatchStyles.PanelHeader>
          <MatchStyles.PanelTitle>Spend progress</MatchStyles.PanelTitle>
          <MatchStyles.PanelSubtitle>
            Max spend: {match.max_spend_amount.toLocaleString()} TNB
          </MatchStyles.PanelSubtitle>
        </MatchStyles.PanelHeader>
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

  return (
    <S.Sidebar className={className}>
      {renderMatchInfo()}
      <ConnectFiveChat matchId={match.id} />
      {renderPrizePoolPanel()}
      {renderSpendPanel()}
      {renderPurchasePanel()}
      {renderResignPanel()}
    </S.Sidebar>
  );
};

export default MatchSidebar;
