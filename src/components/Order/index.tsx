import UserLabel from 'components/UserLabel';
import {Order as TOrder, SFC} from 'types';
import OrderProduct from './OrderProduct';
import OrderTop from './OrderTop';
import * as S from './Styles';

export interface OrderProps {
  order: TOrder;
}

const Order: SFC<OrderProps> = ({className, order}) => {
  const renderDetailsRow = () => {
    return (
      <S.DetailsRow>
        <S.AddressCard address={order.address} />
        <S.Participants>
          <UserLabel avatar={order.buyer.avatar} description="Buyer" username={order.buyer.username} />
          <UserLabel avatar={order.seller.avatar} description="Seller" username={order.seller.username} />
        </S.Participants>
      </S.DetailsRow>
    );
  };

  const renderMainArea = () => {
    return (
      <S.MainArea>
        {renderDetailsRow()}
        {renderOrderProducts()}
      </S.MainArea>
    );
  };

  const renderOrderProducts = () => {
    const _orderProducts = order.order_products.map((orderProduct) => (
      <OrderProduct key={orderProduct.id} orderProduct={orderProduct} />
    ));
    return <S.OrderProducts>{_orderProducts}</S.OrderProducts>;
  };

  return (
    <S.Container className={className}>
      <OrderTop order={order} />
      {renderMainArea()}
    </S.Container>
  );
};

export default Order;
