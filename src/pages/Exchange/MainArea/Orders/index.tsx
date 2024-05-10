import {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {mdiPackageVariantClosed, mdiDotsVertical} from '@mdi/js';
import Icon from '@mdi/react';

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
import {colors} from 'styles';

//temporary static data
const OrderData: any[] = [
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 1,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 2,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 3,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 4,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 5,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 6,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 7,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 8,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 9,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 10,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 11,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 12,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
  {
    date: 'Apr 24, 2024,04:30 pm GMT+5',
    filledAmount: '100VTX',
    id: 13,
    price: '40TNB',
    quantity: '100 VTX',
    type: 'Sell',
  },
];
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
    return orderedOrders.filter((order) => order.owner === self.id);
  }, [orders, self.id]);

  const renderContent = () => {
    if (!!OrderData.length) {
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
    return OrderData.map((item) => {
      const [date, year, time] = item.date.split(',');
      return (
        <tr key={item.id}>
          <td>
            {`${date}, ${year} `}
            <br />
            <S.TextColor>{time}</S.TextColor>
          </td>
          <td>
            <S.TextAlignment>
              <Icon path={mdiPackageVariantClosed} size={1} color={`${colors.gray}`} />
              {item.type}
            </S.TextAlignment>
          </td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          <td>{item.filledAmount}</td>
          <td>
            <S.FillStatusBadgeWrapper>
              <FillStatusBadge fillStatus={FillStatus.FILLED} />
            </S.FillStatusBadgeWrapper>
          </td>
        </tr>
      );
    });
  }, []);

  return (
    <>
      <S.Container className={className}>
        <S.Box>
          <SectionHeading heading="Orders" isDisplayLine={false} />
          <S.TableStyle>{renderContent()}</S.TableStyle>
        </S.Box>
      </S.Container>
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
