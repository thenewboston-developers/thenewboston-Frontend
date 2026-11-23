import {useCallback, useEffect, useMemo, useState} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import {mdiClipboardTextOutline} from '@mdi/js';
import MdiIcon from '@mdi/react';
import orderBy from 'lodash/orderBy';

import EmptyText from 'components/EmptyText';
import PageHeader from 'components/PageHeader';
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
  const fetchMoreOrders = useCallback(async () => {
    if (!isLoading && hasMore) {
      try {
        await dispatch(_getExchangeOrders());
      } catch (error) {
        displayErrorToast('Error fetching more orders');
      }
    }
  }, [dispatch, isLoading, hasMore]);

  const handleViewTrades = useCallback(
    (order: ExchangeOrder) => {
      setSelectedOrder(order);
      toggleTradesModal();
    },
    [toggleTradesModal],
  );

  const orders = useSelector(getExchangeOrders);

  const ordersList = useMemo(() => {
    return orderBy(Object.values(orders), ['created_date'], ['desc']);
  }, [orders]);

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

  const getOrderSkeleton = (count: number) => {
    const skeletons = Array.from({length: count}, (_, i) => (
      <S.OrderSkeletonContainer key={i}>
        <Skeleton height="196px" width="100%" />
      </S.OrderSkeletonContainer>
    ));
    return <S.SkeletonContainer>{skeletons}</S.SkeletonContainer>;
  };

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
      <S.EmptyState>
        <S.EmptyIcon aria-hidden="true">
          <MdiIcon path={mdiClipboardTextOutline} size="32px" />
        </S.EmptyIcon>
        <S.EmptyTitle>Your next trade starts here</S.EmptyTitle>
        <S.EmptyDescription>
          Once you place an order, you can track its progress, review trades, and manage it from this page.
        </S.EmptyDescription>
        <S.BrowseLink to="/exchange/home">Explore markets</S.BrowseLink>
      </S.EmptyState>
    );
  };

  return (
    <>
      <S.Container className={className} id="orders-content">
        <S.Content>
          <PageHeader
            description="Follow your orders from placement to fill. Review your trades and manage open orders in one place."
            eyebrow="Your activity"
            title="Every order. One clear view."
          >
            <S.BrowseLink to="/exchange/home">Browse markets</S.BrowseLink>
          </PageHeader>
          {!!ordersList.length && (
            <S.HistoryHeader>
              <S.HistoryTitle>Order history</S.HistoryTitle>
              <S.HistoryLabel>All statuses · Newest first</S.HistoryLabel>
            </S.HistoryHeader>
          )}
          {renderOrders()}
        </S.Content>
      </S.Container>
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
