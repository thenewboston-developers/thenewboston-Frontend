import {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';
import orderBy from 'lodash/orderBy';

import DropdownMenu from 'components/DropdownMenu';
import FillStatusBadge from 'components/FillStatusBadge';
import {updateExchangeOrder} from 'dispatchers/exchangeOrders';
import {ExchangeOrderType, FillStatus} from 'enums';
import {useToggle} from 'hooks';
import TradesModal from 'modals/TradesModal';
import {getCurrencies, getExchangeOrders, getSelf} from 'selectors/state';
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

  const renderOrders = useCallback(() => {
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
      const [date, time] = longDate(created_date).split('at');
      const fillPercentage = quantity > 0 ? (filled_amount / quantity) * 100 : 0;
      const totalValue = quantity * price;

      return (
        <S.OrderCard key={id}>
          <S.OrderHeader>
            <S.OrderMainInfo>
              <S.OrderTopLine>
                <S.OrderTypeBadge $orderType={ExchangeOrderType[order_type as keyof typeof ExchangeOrderType]}>
                  {order_type}
                </S.OrderTypeBadge>
                <S.DateTime>
                  {date.trim()} • {time.trim()}
                </S.DateTime>
              </S.OrderTopLine>
            </S.OrderMainInfo>
            <S.OrderActions>
              <S.FillStatusBadgeWrapper>
                <FillStatusBadge fillStatus={fill_status} />
              </S.FillStatusBadgeWrapper>
              {renderDropdownMenu(order)}
            </S.OrderActions>
          </S.OrderHeader>

          <S.OrderMetrics>
            <S.MetricItem>
              <S.MetricLabel>Price</S.MetricLabel>
              <S.MetricValue className="price">
                {price.toLocaleString()}
                <S.CurrencyTicker>{secondaryCurrencyTicker}</S.CurrencyTicker>
              </S.MetricValue>
            </S.MetricItem>

            <S.MetricItem>
              <S.MetricLabel>Quantity</S.MetricLabel>
              <S.MetricValue>
                {quantity.toLocaleString()}
                <S.CurrencyTicker>{primaryCurrencyTicker}</S.CurrencyTicker>
              </S.MetricValue>
            </S.MetricItem>

            <S.MetricItem>
              <S.MetricLabel>Filled</S.MetricLabel>
              <S.MetricValue>
                {filled_amount.toLocaleString()}
                <S.CurrencyTicker>{primaryCurrencyTicker}</S.CurrencyTicker>
              </S.MetricValue>
            </S.MetricItem>

            <S.MetricItem>
              <S.MetricLabel>Total Value</S.MetricLabel>
              <S.MetricValue>
                {totalValue.toLocaleString(undefined, {maximumFractionDigits: 2})}
                <S.CurrencyTicker>{secondaryCurrencyTicker}</S.CurrencyTicker>
              </S.MetricValue>
            </S.MetricItem>
          </S.OrderMetrics>

          {fillPercentage > 0 && fillPercentage < 100 && (
            <S.FillProgress>
              <S.ProgressHeader>
                <S.ProgressLabel>Fill Progress</S.ProgressLabel>
                <S.ProgressValue>{fillPercentage.toFixed(1)}%</S.ProgressValue>
              </S.ProgressHeader>
              <S.ProgressBar>
                <S.ProgressFill
                  $percentage={fillPercentage}
                  $orderType={ExchangeOrderType[order_type as keyof typeof ExchangeOrderType]}
                />
              </S.ProgressBar>
            </S.FillProgress>
          )}
        </S.OrderCard>
      );
    });
  }, [ordersList, getCurrencyTicker, renderDropdownMenu]);

  const renderContent = () => {
    return (
      <S.OrdersList>
        {ordersList.length === 0 ? (
          <S.EmptyState>
            <p>No orders to display.</p>
          </S.EmptyState>
        ) : (
          renderOrders()
        )}
      </S.OrdersList>
    );
  };

  return (
    <>
      <S.Container className={className}>{renderContent()}</S.Container>
      {tradesModalIsOpen ? <TradesModal close={toggleTradesModal} order={selectedOrder} /> : null}
    </>
  );
};

export default Orders;
