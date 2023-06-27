import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu from 'components/DropdownMenu';
import {FillStatus} from 'enums';
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

  const getCurrencyTicker = useCallback((coreId: number) => cores[coreId]?.ticker || '-', [cores]);

  const renderDropdownMenu = useCallback((fill_status: FillStatus) => {
    const menuOptions = [
      {
        label: 'View Trades',
        onClick: () => {
          console.log('View Trades');
        },
      },
    ];

    if ([FillStatus.OPEN, FillStatus.PARTIALLY_FILLED].includes(fill_status)) {
      menuOptions.unshift({
        label: 'Cancel Order',
        onClick: () => {
          console.log('Cancel Order');
        },
      });
    }

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  }, []);

  const renderRows = useCallback(() => {
    return filteredOrders.map((order) => {
      const {
        created_date,
        id,
        filled_amount,
        fill_status,
        order_type,
        quantity,
        price,
        primary_currency,
        secondary_currency,
      } = order;

      const primaryCurrencyTicker = getCurrencyTicker(primary_currency);
      const secondaryCurrencyTicker = getCurrencyTicker(secondary_currency);

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
          <td>{renderDropdownMenu(fill_status)}</td>
        </tr>
      );
    });
  }, [filteredOrders, getCurrencyTicker, renderDropdownMenu]);

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </S.Table>
    </S.Container>
  );
};

export default Orders;
