import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getTrades as _getTrades} from 'dispatchers/trades';
import {OrderType} from 'enums';
import {getCores, getTrades} from 'selectors/state';
import {AppDispatch, Order, SFC} from 'types';
import * as S from './Styles';

export interface TradesModalProps {
  close(): void;
  order: Order | null;
}

const TradesModal: SFC<TradesModalProps> = ({className, close, order}) => {
  const cores = useSelector(getCores);
  const dispatch = useDispatch<AppDispatch>();
  const trades = useSelector(getTrades);

  useEffect(() => {
    (async () => {
      if (!order) return;

      const orderType = order.order_type === OrderType.BUY ? {buy_order: order.id} : {sell_order: order.id};
      await dispatch(_getTrades(orderType));
    })();
  }, [dispatch, order]);

  const filteredTrades = useMemo(() => {
    if (!order) return [];

    const orderedTrades = orderBy(Object.values(trades), ['created_date'], ['desc']);

    if (order.order_type === OrderType.BUY) {
      return orderedTrades.filter((trade) => trade.buy_order === order.id);
    } else {
      return orderedTrades.filter((trade) => trade.sell_order === order.id);
    }
  }, [order, trades]);

  const getCurrencyTicker = useCallback((coreId: number) => cores[coreId]?.ticker || '-', [cores]);

  const renderRows = useCallback(() => {
    if (!order) return null;

    const primaryCurrencyTicker = getCurrencyTicker(order.primary_currency);
    const secondaryCurrencyTicker = getCurrencyTicker(order.secondary_currency);

    return filteredTrades.map(({created_date, fill_quantity, id, overpayment_amount, trade_price}) => (
      <tr key={id}>
        <td>{created_date}</td>
        <td>
          {fill_quantity} {primaryCurrencyTicker}
        </td>
        <td>
          {trade_price} {secondaryCurrencyTicker}
        </td>
        <td>
          {overpayment_amount} {secondaryCurrencyTicker}
        </td>
      </tr>
    ));
  }, [filteredTrades, getCurrencyTicker, order]);

  if (!order) return null;

  return (
    <S.Modal className={className} close={close} header="Trades">
      <S.Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Fill Quantity</th>
            <th>Trade Price</th>
            <th>Overpayment Amount</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </S.Table>
    </S.Modal>
  );
};

export default TradesModal;
