import {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import {useToggle} from 'hooks';
import TradesModal from 'modals/TradesModal';
import {getExchangeOrders, getSelf} from 'selectors/state';
import {ExchangeOrder, SFC} from 'types';

import Order from './Order';
import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const [selectedOrder, setSelectedOrder] = useState<ExchangeOrder | null>(null);
  const [tradesModalIsOpen, toggleTradesModal] = useToggle(false);
  const orders = useSelector(getExchangeOrders);
  const self = useSelector(getSelf);

  const ordersList = useMemo(() => {
    const orderedOrders = orderBy(Object.values(orders), ['created_date'], ['desc']);
    return orderedOrders.filter((order) => order.owner === self.id);
  }, [orders, self.id]);

  const handleViewTrades = useCallback(
    (order: ExchangeOrder) => {
      setSelectedOrder(order);
      toggleTradesModal();
    },
    [toggleTradesModal],
  );

  const renderOrders = useCallback(() => {
    return ordersList.map((order) => <Order key={order.id} order={order} onViewTrades={handleViewTrades} />);
  }, [ordersList, handleViewTrades]);

  const renderContent = () => {
    if (ordersList.length === 0) {
      return (
        <EmptyPage
          bottomText="Place an order to see it here"
          graphic={LeavesEmptyState}
          topText="No orders to display"
        />
      );
    }

    return <S.List>{renderOrders()}</S.List>;
  };

  return (
    <>
      <S.Container className={className}>{renderContent()}</S.Container>
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
