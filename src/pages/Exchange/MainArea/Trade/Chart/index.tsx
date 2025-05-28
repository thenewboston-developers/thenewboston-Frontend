import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import CurrencyLogo from 'components/CurrencyLogo';
import Price from 'components/Price';
import {getTrades as _getTrades} from 'dispatchers/trades';
import {useActiveAssetPair} from 'hooks';
import {getTrades} from 'selectors/state';
import {colors} from 'styles';
import {AppDispatch, SFC} from 'types';
import {chartDisplayDate} from 'utils/dates';

import * as S from './Styles';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  currencyId?: number;
}

const CustomTooltip = ({active, payload, label, currencyId}: CustomTooltipProps) => {
  if (active && payload && payload.length && currencyId) {
    return (
      <S.TooltipContainer>
        <S.TooltipDate>{label}</S.TooltipDate>
        <S.TooltipPrice>
          <S.TooltipLabel>Price:</S.TooltipLabel>
          <S.TooltipValue>
            <Price price_amount={Number(payload[0].value)} price_currency={currencyId} />
          </S.TooltipValue>
        </S.TooltipPrice>
      </S.TooltipContainer>
    );
  }
  return null;
};

const Chart: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const dispatch = useDispatch<AppDispatch>();
  const trades = useSelector(getTrades);
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | 'ALL'>('1D');

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
      trade_price: Number(trade.trade_price),
    }));
    return orderBy(_trades, ['created_date'], ['asc']);
  }, [trades]);

  const filteredTradeList = useMemo(() => {
    if (timeframe === 'ALL') return tradeList;

    const now = Date.now();
    const timeframeDays = {
      '1D': 1,
      '1W': 7,
      '1M': 30,
      '3M': 90,
    };

    const cutoffTime = now - (timeframeDays[timeframe as keyof typeof timeframeDays] || 1) * 24 * 60 * 60 * 1000;
    return tradeList.filter((trade) => new Date(trade.created_date).getTime() >= cutoffTime);
  }, [tradeList, timeframe]);

  const lastTradePrice = useMemo(() => {
    const lastTrade = filteredTradeList[filteredTradeList.length - 1];
    return lastTrade?.trade_price || 0;
  }, [filteredTradeList]);

  const firstTradePrice = useMemo(() => {
    const firstTrade = filteredTradeList[0];
    return firstTrade?.trade_price || 0;
  }, [filteredTradeList]);

  const priceChange = useMemo(() => {
    if (!firstTradePrice || !lastTradePrice) return 0;
    return ((lastTradePrice - firstTradePrice) / firstTradePrice) * 100;
  }, [firstTradePrice, lastTradePrice]);

  const priceStats = useMemo(() => {
    if (!filteredTradeList.length) return {min: 0, max: 0, avg: 0};

    const prices = filteredTradeList.map((t) => t.trade_price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

    return {min, max, avg};
  }, [filteredTradeList]);

  const gradientId = 'colorGradient';
  const isPositive = priceChange >= 0;

  return (
    <S.Container className={className}>
      <S.ChartBackground>
        <S.ChartHeader>
          <S.PriceSection>
            <S.PriceWrapper>
              <S.CurrentPrice>
                {activeAssetPair && (
                  <>
                    <S.PriceLogo>
                      <CurrencyLogo logo={activeAssetPair.secondary_currency.logo} width="32px" />
                    </S.PriceLogo>
                    <S.PriceAmount>{lastTradePrice.toFixed(2)}</S.PriceAmount>
                  </>
                )}
              </S.CurrentPrice>

              <S.PriceChange isPositive={isPositive}>
                <S.ChangeArrow isPositive={isPositive}>{isPositive ? '▲' : '▼'}</S.ChangeArrow>
                {Math.abs(priceChange).toFixed(2)}%
              </S.PriceChange>
            </S.PriceWrapper>

            <S.StatsBar>
              <S.StatItem>
                <S.StatLabel>High</S.StatLabel>
                <S.StatValue>{priceStats.max.toFixed(2)}</S.StatValue>
              </S.StatItem>
              <S.StatItem>
                <S.StatLabel>Low</S.StatLabel>
                <S.StatValue>{priceStats.min.toFixed(2)}</S.StatValue>
              </S.StatItem>
              <S.StatItem>
                <S.StatLabel>Avg</S.StatLabel>
                <S.StatValue>{priceStats.avg.toFixed(2)}</S.StatValue>
              </S.StatItem>
            </S.StatsBar>
          </S.PriceSection>

          <S.ChartControls>
            <S.TimeframeButtons>
              {(['1D', '1W', '1M', '3M', 'ALL'] as const).map((tf) => (
                <S.TimeframeButton key={tf} active={timeframe === tf} onClick={() => setTimeframe(tf)}>
                  {tf}
                </S.TimeframeButton>
              ))}
            </S.TimeframeButtons>

            <S.ChartTypeButtons>
              <S.ChartTypeButton active={chartType === 'line'} onClick={() => setChartType('line')} title="Line Chart">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 17L7 13L11 15L17 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </S.ChartTypeButton>
              <S.ChartTypeButton active={chartType === 'area'} onClick={() => setChartType('area')} title="Area Chart">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 17L7 13L11 15L17 9V17H3Z" fill="currentColor" opacity="0.3" />
                  <path
                    d="M3 17L7 13L11 15L17 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </S.ChartTypeButton>
            </S.ChartTypeButtons>
          </S.ChartControls>
        </S.ChartHeader>

        <S.ChartWrapper>
          <ResponsiveContainer height={420} width="100%">
            {chartType === 'area' ? (
              <AreaChart data={filteredTradeList} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isPositive ? colors.palette.green['400'] : colors.palette.red['400']}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={isPositive ? colors.palette.green['400'] : colors.palette.red['400']}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.palette.gray['200']} />
                <XAxis
                  dataKey="display_date"
                  axisLine={false}
                  tickLine={false}
                  tick={{fontSize: 12, fill: colors.palette.gray['600']}}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{fontSize: 12, fill: colors.palette.gray['600']}}
                  domain={[
                    (dataMin: number) => Math.max(0, Math.floor(dataMin * 0.95)),
                    (dataMax: number) => Math.ceil(dataMax * 1.05),
                  ]}
                  tickCount={8}
                  allowDecimals={false}
                  tickFormatter={(value) => Math.round(value).toString()}
                />
                <Tooltip
                  content={<CustomTooltip currencyId={activeAssetPair?.secondary_currency.id} />}
                  cursor={{stroke: colors.palette.gray['400'], strokeWidth: 1}}
                />
                <Area
                  type="monotone"
                  dataKey="trade_price"
                  stroke={isPositive ? colors.palette.green['500'] : colors.palette.red['500']}
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                  dot={false}
                />
              </AreaChart>
            ) : (
              <LineChart data={filteredTradeList} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.palette.gray['200']} />
                <XAxis
                  dataKey="display_date"
                  axisLine={false}
                  tickLine={false}
                  tick={{fontSize: 12, fill: colors.palette.gray['600']}}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{fontSize: 12, fill: colors.palette.gray['600']}}
                  domain={[
                    (dataMin: number) => Math.max(0, Math.floor(dataMin * 0.95)),
                    (dataMax: number) => Math.ceil(dataMax * 1.05),
                  ]}
                  tickCount={8}
                  allowDecimals={false}
                  tickFormatter={(value) => Math.round(value).toString()}
                />
                <Tooltip
                  content={<CustomTooltip currencyId={activeAssetPair?.secondary_currency.id} />}
                  cursor={{stroke: colors.palette.gray['400'], strokeWidth: 1}}
                />
                <Line
                  type="monotone"
                  dataKey="trade_price"
                  stroke={isPositive ? colors.palette.green['500'] : colors.palette.red['500']}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </S.ChartWrapper>
      </S.ChartBackground>
    </S.Container>
  );
};

export default Chart;
