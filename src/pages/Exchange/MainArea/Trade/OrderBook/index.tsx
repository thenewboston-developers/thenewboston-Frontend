import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {ExchangeOrderType, FillStatus} from 'enums';
import {useActiveAssetPair} from 'hooks';
import orderBy from 'lodash/orderBy';
import {getExchangeOrders} from 'selectors/state';
import {SFC} from 'types';

import FillStatusBadge from 'components/FillStatusBadge';
import {longDate} from 'utils/dates';

import * as S from './Styles';

const OrderBook: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const orders = useSelector(getExchangeOrders);

  const filteredOrders = useMemo(() => {
    if (!activeAssetPair) return [];

    const orderedOrders = orderBy(Object.values(orders), ['price'], ['desc']);

    return orderedOrders.filter(
      (order) =>
        order.primary_currency === activeAssetPair.primary_currency.id &&
        order.secondary_currency === activeAssetPair.secondary_currency.id &&
        [FillStatus.OPEN, FillStatus.PARTIALLY_FILLED].includes(order.fill_status),
    );
  }, [activeAssetPair, orders]);

  const renderTable = () => {
    if (!activeAssetPair) return null;

    return (
      <S.Table>
        <S.Thead>
          <S.Tr>
            <th>Date</th>
            <th>Order Type</th>
            <th>Order Quantity ({activeAssetPair.primary_currency.ticker})</th>
            <th>Filled Amount ({activeAssetPair.primary_currency.ticker})</th>
            <th>Remaining ({activeAssetPair.primary_currency.ticker})</th>
            <th>Price ({activeAssetPair.secondary_currency.ticker})</th>
            <th>Fill Status</th>
          </S.Tr>
        </S.Thead>
        <S.Tbody>
          {filteredOrders.map((order) => {
            const [date, time] = longDate(order.created_date).split('at');
            return (
              <S.Tr key={order.id}>
                <S.Td>
                  {date}
                  <br />
                  <S.TextColor>{time}</S.TextColor>
                </S.Td>
                <S.Td>{order.order_type}</S.Td>
                <S.Td>{order.quantity}</S.Td>
                <S.Td>{order.filled_amount}</S.Td>
                <S.Td>{(order.quantity - order.filled_amount).toLocaleString()}</S.Td>
                <S.Td $orderType={ExchangeOrderType[order.order_type as keyof typeof ExchangeOrderType]}>
                  {order.price.toLocaleString()}
                </S.Td>
                <S.Td>
                  <S.FillStatusBadgeWrapper>
                    <FillStatusBadge fillStatus={order.fill_status} />
                  </S.FillStatusBadgeWrapper>
                </S.Td>
              </S.Tr>
            );
          })}
        </S.Tbody>
      </S.Table>
    );
  };

  return (
    <S.Container className={className}>
      <S.Box>
        <h2>Order Book</h2>
        <S.TableStyle> {renderTable()}</S.TableStyle>
      </S.Box>
    </S.Container>
  );
};

export default OrderBook;
