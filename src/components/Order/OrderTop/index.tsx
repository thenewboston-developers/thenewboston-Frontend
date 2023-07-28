import {Order, SFC} from 'types';
import {longDate} from 'utils/dates';
import * as S from './Styles';

export interface OrderTopProps {
  order: Order;
}

const OrderTop: SFC<OrderTopProps> = ({className, order}) => {
  return (
    <S.Container className={className}>
      <S.Detail>
        <S.DetailLabel>Order Date</S.DetailLabel>
        <S.DetailValue>{longDate(order.created_date)}</S.DetailValue>
      </S.Detail>
    </S.Container>
  );
};

export default OrderTop;
