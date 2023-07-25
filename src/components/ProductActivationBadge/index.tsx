import {ActivationStatus} from 'enums';
import {SFC} from 'types';
import * as S from './Styles';

export interface ProductActivationBadgeProps {
  activationStatus: ActivationStatus;
}

const ProductActivationBadge: SFC<ProductActivationBadgeProps> = ({activationStatus, className}) => {
  return (
    <S.Container $activationStatus={activationStatus} className={className}>
      {activationStatus}
    </S.Container>
  );
};

export default ProductActivationBadge;
