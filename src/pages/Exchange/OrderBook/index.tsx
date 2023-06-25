import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {FillStatus, OrderType} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {getOrders} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const OrderBook: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const orders = useSelector(getOrders);

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
            <th>Quantity ({activeAssetPair.primary_currency.ticker})</th>
            <th>Price ({activeAssetPair.secondary_currency.ticker})</th>
          </S.Tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <S.Tr key={order.id}>
              <S.Td>{order.quantity.toLocaleString()}</S.Td>
              <S.Td $orderType={OrderType[order.order_type as keyof typeof OrderType]}>
                {order.price.toLocaleString()}
              </S.Td>
            </S.Tr>
          ))}
        </tbody>
      </S.Table>
    );
  };

  return (
    <S.Container className={className}>
      <h3>Order Book</h3>
      {renderTable()}
    </S.Container>
  );
};

export default OrderBook;
