import Badge, {BadgeStyle} from 'components/Badge';
import {ActivationStatus} from 'enums';
import {SFC} from 'types';

export interface ProductActivationBadgeProps {
  activationStatus: ActivationStatus;
}

const ProductActivationBadge: SFC<ProductActivationBadgeProps> = ({activationStatus}) => {
  const badgeStyle = {
    [ActivationStatus.ACTIVE]: BadgeStyle.success,
    [ActivationStatus.DRAFT]: BadgeStyle.draft,
  };

  return <Badge badgeStyle={badgeStyle[activationStatus]} text={activationStatus} />;
};

export default ProductActivationBadge;
