import {useCallback, useEffect, useMemo, useState} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import EmptyText from 'components/EmptyText';
import Skeleton from 'components/Skeleton';
import {
  getExchangeOrders as _getExchangeOrders,
  resetExchangeOrders as _resetExchangeOrders,
} from 'dispatchers/exchangeOrders';
import {useToggle} from 'hooks';
import TradesModal from 'modals/TradesModal';
import {getExchangeOrders, hasMoreExchangeOrders, isLoadingExchangeOrders} from 'selectors/state';
import {AppDispatch, ExchangeOrder, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import Order from './Order';
import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const [selectedOrder, setSelectedOrder] = useState<ExchangeOrder | null>(null);
  const [tradesModalIsOpen, toggleTradesModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMoreExchangeOrders);
  const isLoading = useSelector(isLoadingExchangeOrders);
  const orders = useSelector(getExchangeOrders);

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetExchangeOrders());
        await dispatch(_getExchangeOrders());
      } catch (error) {
        displayErrorToast('Error fetching orders');
      }
    })();
  }, [dispatch]);

  const ordersList = useMemo(() => {
    return orderBy(Object.values(orders), ['created_date'], ['desc']);
  }, [orders]);

  const fetchMoreOrders = useCallback(async () => {
    if (!isLoading && hasMore) {
      try {
        await dispatch(_getExchangeOrders());
      } catch (error) {
        displayErrorToast('Error fetching more orders');
      }
    }
  }, [dispatch, isLoading, hasMore]);

  const getOrderSkeleton = (n: number) => {
    const skeletons = Array.from({length: n}, (_, i) => (
      <S.OrderSkeletonContainer key={i}>
        <Skeleton width="100%" height="100px" />
      </S.OrderSkeletonContainer>
    ));
    return <S.SkeletonContainer>{skeletons}</S.SkeletonContainer>;
  };

  const handleViewTrades = useCallback(
    (order: ExchangeOrder) => {
      setSelectedOrder(order);
      toggleTradesModal();
    },
    [toggleTradesModal],
  );

  const renderOrders = () => {
    if (isLoading && !ordersList.length) {
      return getOrderSkeleton(5);
    }

    if (ordersList.length) {
      return (
        <InfiniteScrollComponent
          dataLength={ordersList.length}
          endMessage={
            <S.EndMessageContainer>
              <EmptyText>No more orders to show.</EmptyText>
            </S.EndMessageContainer>
          }
          hasMore={hasMore}
          loader={isLoading ? getOrderSkeleton(3) : null}
          next={fetchMoreOrders}
          scrollableTarget="orders-content"
          scrollThreshold={0.9}
        >
          <S.OrderContainer>
            {ordersList.map((order) => (
              <Order key={order.id} onViewTrades={handleViewTrades} order={order} />
            ))}
          </S.OrderContainer>
        </InfiniteScrollComponent>
      );
    }

    return (
      <EmptyPage bottomText="Place an order to see it here" graphic={LeavesEmptyState} topText="No orders to display" />
    );
  };

  return (
    <>
      <S.Container className={className} id="orders-content">
        {renderOrders()}
      </S.Container>
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
