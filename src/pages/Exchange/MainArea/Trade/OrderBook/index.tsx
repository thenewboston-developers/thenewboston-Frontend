import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import FillStatusBadge from 'components/FillStatusBadge';
import {ExchangeOrderType, FillStatus} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {getExchangeOrders} from 'selectors/state';
import {SFC} from 'types';
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
        <thead>
          <S.Tr>
            <th>Date</th>
            <th>Order Quantity ({activeAssetPair.primary_currency.ticker})</th>
            <th>Filled Amount ({activeAssetPair.primary_currency.ticker})</th>
            <th>Remaining ({activeAssetPair.primary_currency.ticker})</th>
            <th>Price ({activeAssetPair.secondary_currency.ticker})</th>
            <th>Fill Status</th>
          </S.Tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <S.Tr key={order.id}>
              <S.Td>{longDate(order.created_date)}</S.Td>
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
          ))}
        </tbody>
      </S.Table>
    );
  };

  return (
    <S.Container className={className}>
      <h2>Order Book</h2>
      {renderTable()}
    </S.Container>
  );
};

export default OrderBook;
