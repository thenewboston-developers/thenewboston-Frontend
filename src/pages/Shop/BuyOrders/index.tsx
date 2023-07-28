import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import Order from 'components/Order';
import SectionHeading from 'components/SectionHeading';
import {getOrders, getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const BuyOrders: SFC = ({className}) => {
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

  const orderList = useMemo(() => {
    const _orders = Object.values(orders).filter(({buyer}) => buyer.id === self.id);
    return orderBy(_orders, ['created_date'], ['desc']);
  }, [orders, self.id]);

  const renderContent = () => {
    if (!!orderList.length) return renderOrders();
    return <EmptyText>No orders to display.</EmptyText>;
  };

  const renderOrders = () => {
    const _orders = orderList.map((order) => <Order key={order.id} order={order} />);
    return <S.Orders>{_orders}</S.Orders>;
  };

  return (
    <S.Container className={className}>
      <SectionHeading heading="Orders" />
      {renderContent()}
    </S.Container>
  );
};

export default BuyOrders;
