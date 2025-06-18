import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getOrderBook} from 'dispatchers/orderBook';
import {useActiveAssetPair} from 'hooks';
import {getOrderBookBuyOrders, getOrderBookSellOrders, isLoadingOrderBook} from 'selectors/state';
import {AppDispatch, ExchangeOrder, SFC} from 'types';
import {longDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';
import Tooltip from './Tooltip';

const OrderBook: SFC = ({className}) => {
  const [hoveredOrder, setHoveredOrder] = useState<ExchangeOrder | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const activeAssetPair = useActiveAssetPair();
  const buyOrders = useSelector(getOrderBookBuyOrders);
  const sellOrders = useSelector(getOrderBookSellOrders);
  const isLoading = useSelector(isLoadingOrderBook);

  useEffect(() => {
    if (!activeAssetPair) return;

    (async () => {
      try {
        await dispatch(getOrderBook(activeAssetPair.primary_currency.id, activeAssetPair.secondary_currency.id));
      } catch (error) {
        displayErrorToast('Error fetching order book');
      }
    })();
  }, [activeAssetPair, dispatch]);

  const spread = (() => {
    if (!activeAssetPair || buyOrders.length === 0 || sellOrders.length === 0) return 0;

    const highestBuy = buyOrders[0]?.price || 0;
    const lowestSell = sellOrders[0]?.price || 0;
    return lowestSell > 0 && highestBuy > 0 ? lowestSell - highestBuy : 0;
  })();

  const renderOrderSection = (sectionOrders: ExchangeOrder[], type: 'buy' | 'sell') => {
    if (!activeAssetPair) return null;

    return (
      <S.OrderSection>
        <S.SectionHeader>
          <S.SectionTitle $type={type}>{type === 'buy' ? 'Buy Orders' : 'Sell Orders'}</S.SectionTitle>
          <S.OrderCount>({sectionOrders.length})</S.OrderCount>
        </S.SectionHeader>

        <S.ColumnHeaders>
          <S.ColumnHeader>Price ({activeAssetPair.secondary_currency.ticker})</S.ColumnHeader>
          <S.ColumnHeader>Amount ({activeAssetPair.primary_currency.ticker})</S.ColumnHeader>
          <S.ColumnHeader>Total ({activeAssetPair.secondary_currency.ticker})</S.ColumnHeader>
        </S.ColumnHeaders>

        <S.OrderList>
          {sectionOrders.map((order) => {
            const remaining = order.quantity - order.filled_amount;
            const total = remaining * order.price;
            const [date, time] = longDate(order.created_date).split('at');

            return (
              <S.OrderRow
                key={order.id}
                $type={type}
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
                <S.OrderPrice $type={type}>{order.price.toLocaleString()}</S.OrderPrice>
                <S.OrderQuantity>{remaining.toLocaleString()}</S.OrderQuantity>
                <S.OrderTotal>{total.toLocaleString(undefined, {maximumFractionDigits: 2})}</S.OrderTotal>

                {hoveredOrder?.id === order.id && (
                  <Tooltip order={order} activeAssetPair={activeAssetPair} date={date} time={time} type={type} />
                )}
              </S.OrderRow>
            );
          })}
        </S.OrderList>
      </S.OrderSection>
    );
  };

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

  return (
    <S.Container className={className}>
      <S.Box>
        <h2>Order Book</h2>
        {renderContent()}
      </S.Box>
    </S.Container>
  );
};

export default OrderBook;
