import {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu from 'components/DropdownMenu';
import {updateOrder} from 'dispatchers/orders';
import {FillStatus} from 'enums';
import {useToggle} from 'hooks';
import TradesModal from 'modals/TradesModal';
import {getCores, getOrders, getSelf} from 'selectors/state';
import {AppDispatch, Order, SFC} from 'types';
import {longDate} from 'utils/dates';
import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [tradesModalIsOpen, toggleTradesModal] = useToggle(false);
  const cores = useSelector(getCores);
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

  const filteredOrders = useMemo(() => {
    const orderedOrders = orderBy(Object.values(orders), ['created_date'], ['desc']);
    return orderedOrders.filter((order) => order.owner === self.id);
  }, [orders, self.id]);

  const getCurrencyTicker = useCallback((coreId: number) => cores[coreId]?.ticker || '-', [cores]);

  const renderDropdownMenu = useCallback(
    (order: Order) => {
      const menuOptions = [
        {
          label: 'View Trades',
          onClick: () => {
            setSelectedOrder(order);
            toggleTradesModal();
          },
        },
      ];

      if ([FillStatus.OPEN, FillStatus.PARTIALLY_FILLED].includes(order.fill_status)) {
        menuOptions.unshift({
          label: 'Cancel Order',
          onClick: async () => {
            await dispatch(updateOrder(order.id, {fill_status: FillStatus.CANCELLED}));
          },
        });
      }

      return (
        <S.DropdownMenuWrapper>
          <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
        </S.DropdownMenuWrapper>
      );
    },
    [dispatch, toggleTradesModal],
  );

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
          <td>{longDate(created_date)}</td>
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
          <td>{renderDropdownMenu(order)}</td>
        </tr>
      );
    });
  }, [filteredOrders, getCurrencyTicker, renderDropdownMenu]);

  return (
    <>
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
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
