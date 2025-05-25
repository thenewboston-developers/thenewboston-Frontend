import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getTrades as _getTrades} from 'dispatchers/trades';
import {ExchangeOrderType} from 'enums';
import {getCurrencies, getTrades} from 'selectors/state';
import {AppDispatch, ExchangeOrder, SFC} from 'types';
import {getDateStr, getTimeStr} from 'utils/dates';
import * as S from './Styles';

export interface TradesModalProps {
  close(): void;
  order: ExchangeOrder | null;
}

const TradesModal: SFC<TradesModalProps> = ({className, close, order}) => {
  const currencies = useSelector(getCurrencies);
  const dispatch = useDispatch<AppDispatch>();
  const trades = useSelector(getTrades);

  useEffect(() => {
    (async () => {
      if (!order) return;

      const orderType = order.order_type === ExchangeOrderType.BUY ? {buy_order: order.id} : {sell_order: order.id};
      await dispatch(_getTrades(orderType));
    })();
  }, [dispatch, order]);

  const filteredTrades = useMemo(() => {
    if (!order) return [];

    const orderedTrades = orderBy(Object.values(trades), ['created_date'], ['desc']);
    return orderedTrades.filter(
      (trade) => (order.order_type === ExchangeOrderType.BUY ? trade.buy_order : trade.sell_order) === order.id,
    );
  }, [order, trades]);

  const getCurrencyTicker = useCallback((currencyId: number) => currencies[currencyId]?.ticker || '-', [currencies]);

  const renderRows = useCallback(() => {
    if (!order) return null;

    const primaryCurrencyTicker = getCurrencyTicker(order.primary_currency);
    const secondaryCurrencyTicker = getCurrencyTicker(order.secondary_currency);

    return filteredTrades.map(({created_date, fill_quantity, id, overpayment_amount, trade_price}, index) => {
      const createdAt = new Date(created_date);
      return (
        <tr key={id}>
          <td>
            <S.TextMuted>{index + 1}</S.TextMuted>
          </td>
          <td>
            {getDateStr(createdAt)}
            <S.TextMuted>{getTimeStr(createdAt, true)}</S.TextMuted>
          </td>
          <td>
            {fill_quantity.toLocaleString()} {primaryCurrencyTicker}
          </td>
          <td>
            {trade_price.toLocaleString()} {secondaryCurrencyTicker}
          </td>
          <td>
            {overpayment_amount.toLocaleString()} {secondaryCurrencyTicker}
          </td>
        </tr>
      );
    });
  }, [filteredTrades, getCurrencyTicker, order]);

  if (!order) return null;

  return (
    <S.Modal className={className} close={close} header="Trades">
      <S.Table>
        <S.Thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Fill Quantity</th>
            <th>Trade Price</th>
            <th>Overpayment Amount</th>
          </tr>
        </S.Thead>
        <S.Tbody>{renderRows()}</S.Tbody>
      </S.Table>
    </S.Modal>
  );
};

export default TradesModal;
