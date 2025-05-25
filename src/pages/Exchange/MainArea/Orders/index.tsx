import {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical, mdiPackageVariantClosed} from '@mdi/js';
import Icon from '@mdi/react';
import orderBy from 'lodash/orderBy';

import DropdownMenu from 'components/DropdownMenu';
import EmptyText from 'components/EmptyText';
import FillStatusBadge from 'components/FillStatusBadge';
import SectionHeading from 'components/SectionHeading';
import {updateExchangeOrder} from 'dispatchers/exchangeOrders';
import {FillStatus} from 'enums';
import {useToggle} from 'hooks';
import TradesModal from 'modals/TradesModal';
import {getCurrencies, getExchangeOrders, getSelf} from 'selectors/state';
import {colors} from 'styles';
import {AppDispatch, ExchangeOrder, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const [selectedOrder, setSelectedOrder] = useState<ExchangeOrder | null>(null);
  const [tradesModalIsOpen, toggleTradesModal] = useToggle(false);
  const currencies = useSelector(getCurrencies);
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getExchangeOrders);
  const self = useSelector(getSelf);

  const getCurrencyTicker = useCallback((currencyId: number) => currencies[currencyId]?.ticker || '-', [currencies]);

  const ordersList = useMemo(() => {
    const orderedOrders = orderBy(Object.values(orders), ['created_date'], ['desc']);
    return orderedOrders.filter((order) => order.owner === self.id);
  }, [orders, self.id]);

  const renderContent = () => {
    if (!!ordersList.length) {
      return (
        <S.Table>
          <S.Thead>
            <tr>
              <th>Date</th>
              <th>Order Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Filled Amount</th>
              <th>Fill Status</th>
              <th>Action</th>
            </tr>
          </S.Thead>

          <S.Tbody>{renderRows()}</S.Tbody>
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
          menuIcon: '',
          onClick: () => {
            setSelectedOrder(order);
            toggleTradesModal();
          },
        },
      ];

      if ([FillStatus.OPEN, FillStatus.PARTIALLY_FILLED].includes(order.fill_status)) {
        menuOptions.unshift({
          label: 'Cancel Order',
          menuIcon: '',
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
          <td>
            <S.TextAlignment>
              <Icon path={mdiPackageVariantClosed} size={1} color={`${colors.gray}`} />
              {order_type}
            </S.TextAlignment>
          </td>
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
        <S.Box>
          <SectionHeading heading="Orders" renderLine={false} />
          <S.TableStyle>{renderContent()}</S.TableStyle>
        </S.Box>
      </S.Container>
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
