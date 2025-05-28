import {useMemo, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {ExchangeOrderType, FillStatus} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {getExchangeOrders} from 'selectors/state';
import {ExchangeOrder, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';
import Tooltip from './Tooltip';

const OrderBook: SFC = ({className}) => {
  const [hoveredOrder, setHoveredOrder] = useState<ExchangeOrder | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeAssetPair = useActiveAssetPair();
  const orders = useSelector(getExchangeOrders);

  const {buyOrders, sellOrders, spread} = useMemo(() => {
    if (!activeAssetPair) return {buyOrders: [], sellOrders: [], spread: 0};

    const activeOrders = Object.values(orders).filter(
      (order) =>
        order.primary_currency === activeAssetPair.primary_currency.id &&
        order.secondary_currency === activeAssetPair.secondary_currency.id &&
        [FillStatus.OPEN, FillStatus.PARTIALLY_FILLED].includes(order.fill_status),
    );

    const buys = activeOrders.filter((order) => order.order_type === ExchangeOrderType.BUY);
    const sells = activeOrders.filter((order) => order.order_type === ExchangeOrderType.SELL);

    const sortedBuys = orderBy(buys, ['price'], ['desc']);
    const sortedSells = orderBy(sells, ['price'], ['asc']);

    const highestBuy = sortedBuys[0]?.price || 0;
    const lowestSell = sortedSells[0]?.price || 0;
    const spreadValue = lowestSell > 0 && highestBuy > 0 ? lowestSell - highestBuy : 0;

    return {
      buyOrders: sortedBuys,
      sellOrders: sortedSells,
      spread: spreadValue,
    };
  }, [activeAssetPair, orders]);

  const renderOrderSection = (sectionOrders: typeof buyOrders, type: 'buy' | 'sell') => {
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
