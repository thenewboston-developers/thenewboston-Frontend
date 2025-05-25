import {FillStatus} from 'enums';
import {SFC} from 'types';

import Badge, {BadgeStyle} from 'components/Badge';

export interface FillStatusBadgeProps {
  fillStatus: FillStatus;
}

const FillStatusBadge: SFC<FillStatusBadgeProps> = ({fillStatus}) => {
  const badgeStyle = {
    [FillStatus.CANCELLED]: BadgeStyle.danger,
    [FillStatus.FILLED]: BadgeStyle.success,
    [FillStatus.OPEN]: BadgeStyle.primary,
    [FillStatus.PARTIALLY_FILLED]: BadgeStyle.warning,
  };

  return <Badge badgeStyle={badgeStyle[fillStatus]} children={fillStatus} />;
};

export default FillStatusBadge;
