import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getOrderBook} from 'dispatchers/orderBook';
import {getOrderBookBuyOrders, getOrderBookSellOrders, isLoadingOrderBook} from 'selectors/state';
import {AppDispatch, AssetPair, ExchangeOrder, SFC} from 'types';
import {longDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';
import Tooltip from './Tooltip';

interface OrderBookProps {
  activeAssetPair: AssetPair | null;
}

const OrderBook: SFC<OrderBookProps> = ({activeAssetPair, className}) => {
  const [hoveredOrder, setHoveredOrder] = useState<ExchangeOrder | null>(null);
  const buyOrders = useSelector(getOrderBookBuyOrders);
  const dispatch = useDispatch<AppDispatch>();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLoading = useSelector(isLoadingOrderBook);
  const sellOrders = useSelector(getOrderBookSellOrders);

  const spread = (() => {
    if (!activeAssetPair || buyOrders.length === 0 || sellOrders.length === 0) return 0;

    const highestBuy = buyOrders[0]?.price || 0;
    const lowestSell = sellOrders[0]?.price || 0;
    return lowestSell > 0 && highestBuy > 0 ? lowestSell - highestBuy : 0;
  })();

  useEffect(() => {
    if (!activeAssetPair) return;

    (async () => {
      try {
        await dispatch(getOrderBook(activeAssetPair.id));
      } catch (error) {
        displayErrorToast('Error fetching order book');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAssetPair?.id, dispatch]);

  const renderContent = () => {
    if (!activeAssetPair) return null;

    if (isLoading) {
      return <S.EmptyState>Loading order book...</S.EmptyState>;
    }

    if (buyOrders.length === 0 && sellOrders.length === 0) {
      return <S.EmptyState>No orders in the order book</S.EmptyState>;
    }

    return (
      <>
        <S.OrderBookContainer>
          {renderOrderSection(buyOrders, 'buy')}
          {renderOrderSection(sellOrders, 'sell')}
        </S.OrderBookContainer>

        {spread > 0 && (
          <S.Spread>
            <S.SpreadLabel>Spread</S.SpreadLabel>
            <S.SpreadValue>
              {spread.toLocaleString()} {activeAssetPair.secondary_currency.ticker}
            </S.SpreadValue>
          </S.Spread>
        )}
      </>
    );
  };

  const renderOrderSection = (sectionOrders: ExchangeOrder[], type: 'buy' | 'sell') => {
    if (!activeAssetPair) return null;

    return (
      <S.OrderSection $type={type}>
        <S.SectionHeader>
          <S.SectionTitle $type={type}>{type === 'buy' ? 'Buy Orders' : 'Sell Orders'}</S.SectionTitle>
          <S.OrderCount>{sectionOrders.length}</S.OrderCount>
        </S.SectionHeader>

        <S.ColumnHeaders>
          <S.ColumnHeader>Amount ({activeAssetPair.primary_currency.ticker})</S.ColumnHeader>
          <S.ColumnHeader>Price ({activeAssetPair.secondary_currency.ticker})</S.ColumnHeader>
          <S.ColumnHeader>Total ({activeAssetPair.secondary_currency.ticker})</S.ColumnHeader>
        </S.ColumnHeaders>

        <S.OrderList>
          {!sectionOrders.length && <S.EmptySide>No {type} orders yet.</S.EmptySide>}
          {sectionOrders.map((order) => {
            const remaining = order.quantity - order.filled_quantity;
            const total = remaining * order.price;
            const [date, time] = longDate(order.created_date).split('at');

            return (
              <S.OrderRow
                key={order.id}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                  }
                  hoverTimeoutRef.current = setTimeout(() => {
                    setHoveredOrder(order);
                  }, 500);
                }}
                onMouseLeave={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                  }
                  setHoveredOrder(null);
                }}
              >
                <S.OrderQuantity>{remaining.toLocaleString()}</S.OrderQuantity>
                <S.OrderPrice $type={type}>{order.price.toLocaleString()}</S.OrderPrice>
                <S.OrderTotal>{total.toLocaleString(undefined, {maximumFractionDigits: 2})}</S.OrderTotal>

                {hoveredOrder?.id === order.id && (
                  <Tooltip activeAssetPair={activeAssetPair} date={date} order={order} time={time} type={type} />
                )}
              </S.OrderRow>
            );
          })}
        </S.OrderList>
      </S.OrderSection>
    );
  };

  return (
    <S.Container className={className}>
      <S.Box>
        <S.Header>
          <S.Heading>Order book</S.Heading>
          <S.Description>Open buy and sell orders for this market.</S.Description>
        </S.Header>
        {renderContent()}
      </S.Box>
    </S.Container>
  );
};

export default OrderBook;
