import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import orderBy from 'lodash/orderBy';

import Price from 'components/Price';
import {getTrades as _getTrades} from 'dispatchers/trades';
import {useActiveAssetPair} from 'hooks';
import {getTrades} from 'selectors/state';
import {colors} from 'styles';
import {AppDispatch, SFC} from 'types';
import {chartDisplayDate} from 'utils/dates';
import * as S from './Styles';

const Chart: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const dispatch = useDispatch<AppDispatch>();
  const trades = useSelector(getTrades);

  useEffect(() => {
    (async () => {
      if (!activeAssetPair) return;
      await dispatch(
        _getTrades({
          buy_order__primary_currency__id: activeAssetPair.primary_currency.id,
          buy_order__secondary_currency__id: activeAssetPair.secondary_currency.id,
        }),
      );
    })();
  }, [activeAssetPair, dispatch]);

  const tradeList = useMemo(() => {
    let _trades = Object.values(trades);
    _trades = _trades.map((trade) => ({
      ...trade,
      display_date: chartDisplayDate(trade.created_date),
    }));
    return orderBy(_trades, ['created_date'], ['asc']);
  }, [trades]);

  const lastTradePrice = useMemo(() => {
    const lastTrade = tradeList[tradeList.length - 1];
    return lastTrade?.trade_price || 0;
  }, [tradeList]);

  const renderLastPrice = () => {
    if (!activeAssetPair) return null;
    return (
      <S.LastPrice>
        <Price price_amount={lastTradePrice} price_core={activeAssetPair.secondary_currency.id} />
      </S.LastPrice>
    );
  };

  return (
    <S.Container className={className}>
      {renderLastPrice()}
      <ResponsiveContainer height={280} width="100%">
        <LineChart data={tradeList}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="display_date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="trade_price" stroke={`${colors.palette.blue['400']}`} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </S.Container>
  );
};

export default Chart;
