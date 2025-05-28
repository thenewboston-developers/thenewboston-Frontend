import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import FillStatusBadge from 'components/FillStatusBadge';
import {ExchangeOrderType, FillStatus} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {getExchangeOrders} from 'selectors/state';
import {ExchangeOrder, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

const OrderBook: SFC = ({className}) => {
  const [hoveredOrder, setHoveredOrder] = useState<ExchangeOrder | null>(null);
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
                onMouseEnter={() => setHoveredOrder(order)}
                onMouseLeave={() => setHoveredOrder(null)}
              >
                <S.OrderPrice $type={type}>{order.price.toLocaleString()}</S.OrderPrice>
                <S.OrderQuantity>{remaining.toLocaleString()}</S.OrderQuantity>
                <S.OrderTotal>{total.toLocaleString(undefined, {maximumFractionDigits: 2})}</S.OrderTotal>

                {hoveredOrder?.id === order.id && (
                  <S.Tooltip>
                    <S.TooltipContent>
                      <S.TooltipRow>
                        <S.TooltipLabel>Date:</S.TooltipLabel>
                        <S.TooltipValue>
                          {date.trim()} {time.trim()}
                        </S.TooltipValue>
                      </S.TooltipRow>
                      <S.TooltipRow>
                        <S.TooltipLabel>Order Type:</S.TooltipLabel>
                        <S.TooltipValue $type={type}>{order.order_type}</S.TooltipValue>
                      </S.TooltipRow>
                      <S.TooltipRow>
                        <S.TooltipLabel>Order Quantity:</S.TooltipLabel>
                        <S.TooltipValue>
                          {order.quantity.toLocaleString()} {activeAssetPair.primary_currency.ticker}
                        </S.TooltipValue>
                      </S.TooltipRow>
                      <S.TooltipRow>
                        <S.TooltipLabel>Filled Amount:</S.TooltipLabel>
                        <S.TooltipValue>
                          {order.filled_amount.toLocaleString()} {activeAssetPair.primary_currency.ticker}
                        </S.TooltipValue>
                      </S.TooltipRow>
                      <S.TooltipRow>
                        <S.TooltipLabel>Status:</S.TooltipLabel>
                        <S.TooltipValue>
                          <FillStatusBadge fillStatus={order.fill_status} />
                        </S.TooltipValue>
                      </S.TooltipRow>
                    </S.TooltipContent>
                  </S.Tooltip>
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
