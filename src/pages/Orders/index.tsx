import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getCores, getOrders, getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const cores = useSelector(getCores);
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

  const filteredOrders = useMemo(() => {
    const orderedOrders = orderBy(Object.values(orders), ['created_date'], ['desc']);
    return orderedOrders.filter((order) => order.owner === self.id);
  }, [orders, self.id]);

  const renderRows = () => {
    return filteredOrders.map(
      ({
        created_date,
        id,
        filled_amount,
        fill_status,
        order_type,
        quantity,
        price,
        primary_currency,
        secondary_currency,
      }) => {
        const primaryCurrencyTicker = cores[primary_currency]?.ticker || '-';
        const secondaryCurrencyTicker = cores[secondary_currency]?.ticker || '-';

        return (
          <tr key={id}>
            <td>{created_date}</td>
            <td>{order_type}</td>
            <td>
              {quantity} {primaryCurrencyTicker}
            </td>
            <td>
              {price} {secondaryCurrencyTicker}
            </td>
            <td>
              {filled_amount} {primaryCurrencyTicker}
            </td>
            <td>{fill_status}</td>
          </tr>
        );
      },
    );
  };

  return (
    <S.Container className={className}>
      <h1>Orders</h1>
      <S.Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Order Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Filled Amount</th>
            <th>Fill Status</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </S.Table>
    </S.Container>
  );
};

export default Orders;
