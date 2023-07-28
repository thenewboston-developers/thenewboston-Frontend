import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import Order from 'components/Order';
import SectionHeading from 'components/SectionHeading';
import {getOrders as _getOrders} from 'dispatchers/orders';
import {getOrders, getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const SellOrders: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(_getOrders());
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching orders');
      }
    })();
  }, [dispatch]);

  const orderList = useMemo(() => {
    const _orders = Object.values(orders).filter(({seller}) => seller.id === self.id);
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

export default SellOrders;
