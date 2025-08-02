import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getTrades as _getTrades} from 'dispatchers/trades';
import {ExchangeOrderSide} from 'enums';
import {getTrades} from 'selectors/state';
import {AppDispatch, ExchangeOrder, SFC} from 'types';
import {getDateStr, getTimeStr} from 'utils/dates';

import * as S from './Styles';

export interface TradesModalProps {
  close(): void;
  order: ExchangeOrder | null;
}

const TradesModal: SFC<TradesModalProps> = ({className, close, order}) => {
  const dispatch = useDispatch<AppDispatch>();
  const trades = useSelector(getTrades);

  useEffect(() => {
    (async () => {
      if (!order) return;

      const orderType = order.side === ExchangeOrderSide.BUY ? {buy_order: order.id} : {sell_order: order.id};
      await dispatch(_getTrades(orderType));
    })();
  }, [dispatch, order]);

  const filteredTrades = useMemo(() => {
    if (!order) return [];

    const orderedTrades = orderBy(Object.values(trades), ['created_date'], ['desc']);
    return orderedTrades.filter(
      (trade) => (order.side === ExchangeOrderSide.BUY ? trade.buy_order : trade.sell_order) === order.id,
    );
  }, [order, trades]);

  const renderRows = useCallback(() => {
    if (!order) return null;

    const primaryCurrencyTicker = order.asset_pair.primary_currency.ticker;
    const secondaryCurrencyTicker = order.asset_pair.secondary_currency.ticker;

    return filteredTrades.map(({created_date, filled_quantity, id, overpayment_amount, price}, index) => {
      const createdAt = new Date(created_date);
      return (
        <S.TableRow key={id}>
          <S.TableData>{index + 1}</S.TableData>
          <S.TableData>
            <S.DateContainer>
              <div>{getDateStr(createdAt)}</div>
              <S.TextMuted>{getTimeStr(createdAt, true)}</S.TextMuted>
            </S.DateContainer>
          </S.TableData>
          <S.TableData>
            <S.Amount>{filled_quantity.toLocaleString()}</S.Amount> {primaryCurrencyTicker}
          </S.TableData>
          <S.TableData>
            <S.Price>{price.toLocaleString()}</S.Price> {secondaryCurrencyTicker}
          </S.TableData>
          <S.TableData>
            {overpayment_amount.toLocaleString()} {secondaryCurrencyTicker}
          </S.TableData>
        </S.TableRow>
      );
    });
  }, [filteredTrades, order]);

  if (!order) return null;

  return (
    <S.Modal className={className} close={close} header="Trades">
      <S.Table>
        <S.TableHeader>
          <S.TableRow>
            <S.TableHead>No.</S.TableHead>
            <S.TableHead>Date</S.TableHead>
            <S.TableHead>Fill Quantity</S.TableHead>
            <S.TableHead>Trade Price</S.TableHead>
            <S.TableHead>Overpayment Amount</S.TableHead>
          </S.TableRow>
        </S.TableHeader>
        <S.TableBody>{renderRows()}</S.TableBody>
      </S.Table>
    </S.Modal>
  );
};

export default TradesModal;
