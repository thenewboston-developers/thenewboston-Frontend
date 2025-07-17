import Badge, {BadgeStyle} from 'components/Badge';
import {ExchangeOrderStatus} from 'enums';
import {SFC} from 'types';

export interface FillStatusBadgeProps {
  status: number;
}

const FillStatusBadge: SFC<FillStatusBadgeProps> = ({status}) => {
  const badgeStyle: Record<number, BadgeStyle> = {
    [ExchangeOrderStatus.CANCELLED]: BadgeStyle.danger,
    [ExchangeOrderStatus.FILLED]: BadgeStyle.success,
    [ExchangeOrderStatus.OPEN]: BadgeStyle.primary,
    [ExchangeOrderStatus.PARTIALLY_FILLED]: BadgeStyle.warning,
  };

  const statusLabels: Record<number, string> = {
    [ExchangeOrderStatus.CANCELLED]: 'CANCELLED',
    [ExchangeOrderStatus.FILLED]: 'FILLED',
    [ExchangeOrderStatus.OPEN]: 'OPEN',
    [ExchangeOrderStatus.PARTIALLY_FILLED]: 'PARTIALLY FILLED',
  };

  return <Badge badgeStyle={badgeStyle[status]} children={statusLabels[status]} />;
};

export default FillStatusBadge;
