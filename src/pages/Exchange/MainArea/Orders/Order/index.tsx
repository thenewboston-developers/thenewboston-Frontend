import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu from 'components/DropdownMenu';
import FillStatusBadge from 'components/FillStatusBadge';
import {updateExchangeOrder} from 'dispatchers/exchangeOrders';
import {ExchangeOrderSide, ExchangeOrderStatus} from 'enums';
import {getCurrencies} from 'selectors/state';
import {AppDispatch, ExchangeOrder, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

export interface OrderProps {
  order: ExchangeOrder;
  onViewTrades: (order: ExchangeOrder) => void;
}

const Order: SFC<OrderProps> = ({className, order, onViewTrades}) => {
  const currencies = useSelector(getCurrencies);
  const dispatch = useDispatch<AppDispatch>();

  const getCurrencyTicker = useCallback((currencyId: number) => currencies[currencyId]?.ticker || '-', [currencies]);

  const renderDropdownMenu = useCallback(() => {
    const menuOptions = [
      {
        label: 'View Trades',
        onClick: () => onViewTrades(order),
      },
    ];

    if ([ExchangeOrderStatus.OPEN, ExchangeOrderStatus.PARTIALLY_FILLED].includes(order.status)) {
      menuOptions.unshift({
        label: 'Cancel Order',
        onClick: async () => {
          await dispatch(updateExchangeOrder(order.id, {status: ExchangeOrderStatus.CANCELLED}));
        },
      });
    }

    return (
      <S.DropdownMenuWrapper>
        <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.DropdownMenuWrapper>
    );
  }, [dispatch, order, onViewTrades]);

  const {created_date, filled_quantity, status, side, quantity, price, primary_currency, secondary_currency} = order;

  const primaryCurrencyTicker = getCurrencyTicker(primary_currency);
  const secondaryCurrencyTicker = getCurrencyTicker(secondary_currency);
  const [date, time] = longDate(created_date).split('at');
  const fillPercentage = quantity > 0 ? (filled_quantity / quantity) * 100 : 0;
  const totalValue = quantity * price;

  return (
    <S.Container className={className}>
      <S.Header>
        <S.MainInfo>
          <S.TopLine>
            <S.TypeBadge $orderType={side === ExchangeOrderSide.BUY ? 'BUY' : 'SELL'}>
              {side === ExchangeOrderSide.BUY ? 'BUY' : 'SELL'}
            </S.TypeBadge>
            <S.DateTime>
              {date.trim()} • {time.trim()}
            </S.DateTime>
          </S.TopLine>
        </S.MainInfo>
        <S.Actions>
          <S.FillStatusBadgeWrapper>
            <FillStatusBadge status={status} />
          </S.FillStatusBadgeWrapper>
          {renderDropdownMenu()}
        </S.Actions>
      </S.Header>

      <S.Metrics>
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
            {filled_quantity.toLocaleString()}
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
      </S.Metrics>

      {fillPercentage > 0 && fillPercentage < 100 && (
        <S.FillProgress>
          <S.ProgressHeader>
            <S.ProgressLabel>Fill Progress</S.ProgressLabel>
            <S.ProgressValue>{fillPercentage.toFixed(1)}%</S.ProgressValue>
          </S.ProgressHeader>
          <S.ProgressBar>
            <S.ProgressFill $percentage={fillPercentage} $orderType={side === ExchangeOrderSide.BUY ? 'BUY' : 'SELL'} />
          </S.ProgressBar>
        </S.FillProgress>
      )}
    </S.Container>
  );
};

export default Order;
