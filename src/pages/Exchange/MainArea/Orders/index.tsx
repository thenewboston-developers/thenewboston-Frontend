import {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu from 'components/DropdownMenu';
import EmptyText from 'components/EmptyText';
import FillStatusBadge from 'components/FillStatusBadge';
import SectionHeading from 'components/SectionHeading';
import {updateExchangeOrder} from 'dispatchers/exchangeOrders';
import {FillStatus} from 'enums';
import {useToggle} from 'hooks';
import TradesModal from 'modals/TradesModal';
import {getCores, getExchangeOrders, getSelf} from 'selectors/state';
import {AppDispatch, ExchangeOrder, SFC} from 'types';
import {longDate} from 'utils/dates';
import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const [selectedOrder, setSelectedOrder] = useState<ExchangeOrder | null>(null);
  const [tradesModalIsOpen, toggleTradesModal] = useToggle(false);
  const cores = useSelector(getCores);
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getExchangeOrders);
  const self = useSelector(getSelf);

  const getCurrencyTicker = useCallback((coreId: number) => cores[coreId]?.ticker || '-', [cores]);

  const ordersList = useMemo(() => {
    const orderedOrders = orderBy(Object.values(orders), ['created_date'], ['desc']);
    return orderedOrders;
    //not matching data hance it's giving empty array
    // return orderedOrders.filter((order) => order.owner === self.id);
  }, [orders]);

  const renderContent = () => {
    if (!!ordersList.length) {
      return (
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
      );
    }

    return <EmptyText>No orders to display.</EmptyText>;
  };

  const renderDropdownMenu = useCallback(
    (order: ExchangeOrder) => {
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
            await dispatch(updateExchangeOrder(order.id, {fill_status: FillStatus.CANCELLED}));
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
    return ordersList.map((order) => {
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
            {quantity.toLocaleString()} {primaryCurrencyTicker}
          </td>
          <td>
            {price.toLocaleString()} {secondaryCurrencyTicker}
          </td>
          <td>
            {filled_amount.toLocaleString()} {primaryCurrencyTicker}
          </td>
          <td>
            <S.FillStatusBadgeWrapper>
              <FillStatusBadge fillStatus={fill_status} />
            </S.FillStatusBadgeWrapper>
          </td>
          <td>{renderDropdownMenu(order)}</td>
        </tr>
      );
    });
  }, [ordersList, getCurrencyTicker, renderDropdownMenu]);

  return (
    <>
      <S.Container className={className}>
        <SectionHeading heading="Orders" />
        {renderContent()}
      </S.Container>
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
