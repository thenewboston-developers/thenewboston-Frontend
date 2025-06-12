import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {ChartDataPoint, ChartTimeRange} from 'api/exchangeChartData';
import CurrencyLogo from 'components/CurrencyLogo';
import {getChartData as _getChartData} from 'dispatchers/exchangeChartData';
import {useActiveAssetPair} from 'hooks';
import {getTrades} from 'selectors/state';
import {colors} from 'styles';
import {AppDispatch, SFC, Trade} from 'types';
import {chartDisplayDate} from 'utils/dates';

import * as S from './Styles';
import ChartTooltip from './Tooltip';

interface CurrentInterval {
  close: number;
  endTime: Date;
  high: number;
  low: number;
  open: number;
  startTime: Date;
  volume: number;
}

const Chart: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const dispatch = useDispatch<AppDispatch>();
  const trades = useSelector(getTrades);

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  const [currentInterval, setCurrentInterval] = useState<CurrentInterval | null>(null);
  const [intervalMinutes, setIntervalMinutes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | 'ALL'>('1D');

  const currentIntervalRef = useRef<CurrentInterval | null>(null);
  const intervalMinutesRef = useRef<number>(0);
  const chartDataRef = useRef<ChartDataPoint[]>([]);

  const fetchChartData = useCallback(async () => {
    if (!activeAssetPair) return;

    // Map UI timeframe to API timerange
    const timeframeToApiMap: Record<string, ChartTimeRange> = {
      '1D': '1d',
      '1W': '1w',
      '1M': '1m',
      '3M': '3m',
      ALL: 'all',
    };

    setIsLoading(true);
    try {
      const response = await dispatch(_getChartData(activeAssetPair.id, timeframeToApiMap[timeframe]));

      setChartData(response.data);
      chartDataRef.current = response.data;
      setIntervalMinutes(response.interval_minutes);
      intervalMinutesRef.current = response.interval_minutes;

      // Initialize current interval if we have data
      if (response.data.length > 0) {
        const lastPoint = response.data[response.data.length - 1];
        const intervalMs = response.interval_minutes * 60 * 1000;
        const lastTimestamp = new Date(lastPoint.timestamp);

        // The timestamp represents the END of the interval
        // So we create a new interval starting from that point
        const newInterval: CurrentInterval = {
          close: lastPoint.price,
          endTime: new Date(lastTimestamp.getTime() + intervalMs),
          high: lastPoint.price,
          low: lastPoint.price,
          open: lastPoint.price,
          startTime: lastTimestamp,
          volume: 0,
        };

        setCurrentInterval(newInterval);
        currentIntervalRef.current = newInterval;
      }
    } catch (error) {
      // Failed to fetch chart data
    } finally {
      setIsLoading(false);
    }
  }, [activeAssetPair, dispatch, timeframe]);

  // Process incoming trade from WebSocket
  const processTrade = useCallback((trade: Trade) => {
    if (!currentIntervalRef.current || !intervalMinutesRef.current) return;

    const tradeTime = new Date(trade.created_date);
    const currentInt = currentIntervalRef.current;
    const intervalMs = intervalMinutesRef.current * 60 * 1000;

    // Check if we need to fill missing intervals
    const missedIntervals = Math.floor((tradeTime.getTime() - currentInt.endTime.getTime()) / intervalMs);

    if (missedIntervals > 0) {
      // Fill missing intervals with carried forward price
      const missingPoints: ChartDataPoint[] = [];
      for (let i = 0; i < missedIntervals; i += 1) {
        const intervalStart = new Date(currentInt.endTime.getTime() + i * intervalMs);
        const intervalEnd = new Date(intervalStart.getTime() + intervalMs);

        missingPoints.push({
          high: currentInt.close,
          low: currentInt.close,
          open: currentInt.close,
          price: currentInt.close,
          timestamp: intervalEnd.toISOString(),
          volume: 0,
        });
      }

      // Add missing points to chart data
      const updatedData = [...chartDataRef.current, ...missingPoints].slice(-100);
      setChartData(updatedData);
      chartDataRef.current = updatedData;

      // Update current interval to the last missing interval
      const lastMissingInterval = new Date(currentInt.endTime.getTime() + missedIntervals * intervalMs);
      currentInt.startTime = new Date(lastMissingInterval.getTime() - intervalMs);
      currentInt.endTime = lastMissingInterval;
      currentInt.open = currentInt.close;
      currentInt.high = currentInt.close;
      currentInt.low = currentInt.close;
      currentInt.volume = 0;
    }

    // Check if trade belongs to current interval
    if (tradeTime <= currentInt.endTime) {
      // Update current interval
      const updatedInterval = {
        ...currentInt,
        close: trade.trade_price,
        high: Math.max(currentInt.high, trade.trade_price),
        low: Math.min(currentInt.low, trade.trade_price),
        volume: currentInt.volume + trade.fill_quantity,
      };

      setCurrentInterval(updatedInterval);
      currentIntervalRef.current = updatedInterval;
    } else {
      // Trade belongs to new interval - finalize current interval
      const finalizedPoint: ChartDataPoint = {
        high: currentInt.high,
        low: currentInt.low,
        open: currentInt.open,
        price: currentInt.close,
        timestamp: currentInt.endTime.toISOString(),
        volume: currentInt.volume,
      };

      // Update chart data - maintain 100 point limit
      const newChartData = [...chartDataRef.current.slice(1), finalizedPoint];
      setChartData(newChartData);
      chartDataRef.current = newChartData;

      // Initialize new interval
      const newInterval: CurrentInterval = {
        close: trade.trade_price,
        endTime: new Date(currentInt.endTime.getTime() + intervalMs),
        high: trade.trade_price,
        low: trade.trade_price,
        open: trade.trade_price,
        startTime: currentInt.endTime,
        volume: trade.fill_quantity,
      };

      setCurrentInterval(newInterval);
      currentIntervalRef.current = newInterval;
    }
  }, []);

  // Subscribe to trade updates
  useEffect(() => {
    if (!activeAssetPair) return;

    // Store trade IDs we've already processed
    const processedTradeIds = new Set<number>();

    // Process new trades as they come in
    const checkForNewTrades = () => {
      const allTrades = Object.values(trades);
      const newTrades = allTrades.filter((trade) => !processedTradeIds.has(trade.id));

      if (newTrades.length > 0 && currentIntervalRef.current) {
        // Sort by created date to process in order
        const sortedNewTrades = newTrades.sort(
          (a, b) => new Date(a.created_date).getTime() - new Date(b.created_date).getTime(),
        );

        sortedNewTrades.forEach((trade) => {
          processTrade(trade);
          processedTradeIds.add(trade.id);
        });
      }
    };

    // Initial check for existing trades
    checkForNewTrades();

    // Check for trades periodically
    const interval = setInterval(checkForNewTrades, 100);

    return () => {
      clearInterval(interval);
    };
  }, [activeAssetPair, trades, processTrade]);

  // Fetch data when activeAssetPair or timeframe changes
  useEffect(() => {
    fetchChartData().catch(() => {
      // Handle error
    });
  }, [fetchChartData]);

  // Handle extended inactivity - check for interval completion periodically
  useEffect(() => {
    if (!currentInterval || !intervalMinutes) return;

    const checkIntervalCompletion = () => {
      const now = new Date();
      const currentInt = currentIntervalRef.current;
      if (!currentInt) return;

      const intervalMs = intervalMinutesRef.current * 60 * 1000;
      const missedIntervals = Math.floor((now.getTime() - currentInt.endTime.getTime()) / intervalMs);

      if (missedIntervals > 0) {
        // Fill missing intervals
        const missingPoints: ChartDataPoint[] = [];

        // First, finalize the current interval
        missingPoints.push({
          high: currentInt.high,
          low: currentInt.low,
          open: currentInt.open,
          price: currentInt.close,
          timestamp: currentInt.endTime.toISOString(),
          volume: currentInt.volume,
        });

        // Then add any additional missing intervals
        for (let i = 1; i < missedIntervals; i += 1) {
          const intervalEnd = new Date(currentInt.endTime.getTime() + i * intervalMs);
          missingPoints.push({
            high: currentInt.close,
            low: currentInt.close,
            open: currentInt.close,
            price: currentInt.close,
            timestamp: intervalEnd.toISOString(),
            volume: 0,
          });
        }

        // Update chart data
        const updatedData = [...chartDataRef.current, ...missingPoints].slice(-100);
        setChartData(updatedData);
        chartDataRef.current = updatedData;

        // Initialize new current interval
        const newStartTime = new Date(currentInt.endTime.getTime() + (missedIntervals - 1) * intervalMs);
        const newEndTime = new Date(newStartTime.getTime() + intervalMs);
        const newInterval: CurrentInterval = {
          close: currentInt.close,
          endTime: newEndTime,
          high: currentInt.close,
          low: currentInt.close,
          open: currentInt.close,
          startTime: newStartTime,
          volume: 0,
        };

        setCurrentInterval(newInterval);
        currentIntervalRef.current = newInterval;
      }
    };

    const intervalTimer = setInterval(checkIntervalCompletion, 5000); // Check every 5 seconds

    return () => {
      clearInterval(intervalTimer);
    };
  }, [currentInterval, intervalMinutes]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      currentIntervalRef.current = null;
      intervalMinutesRef.current = 0;
      chartDataRef.current = [];
    };
  }, []);

  const displayData = useMemo(() => {
    const mappedData = chartData.map((point) => ({
      ...point,
      display_date: chartDisplayDate(point.timestamp),
      trade_price: point.price,
    }));

    // Include current interval in the chart if it exists
    if (currentInterval && intervalMinutes > 0) {
      const currentPoint = {
        high: currentInterval.high,
        low: currentInterval.low,
        open: currentInterval.open,
        price: currentInterval.close,
        timestamp: currentInterval.endTime.toISOString(),
        volume: currentInterval.volume,
        display_date: chartDisplayDate(currentInterval.endTime.toISOString()),
        trade_price: currentInterval.close,
      };

      return [...mappedData, currentPoint];
    }

    return mappedData;
  }, [chartData, currentInterval, intervalMinutes]);

  const lastTradePrice = useMemo(() => {
    if (currentInterval && intervalMinutes > 0) {
      return currentInterval.close;
    }
    const lastPoint = chartData[chartData.length - 1];
    return lastPoint?.price || 0;
  }, [chartData, currentInterval, intervalMinutes]);

  const firstTradePrice = useMemo(() => {
    const firstPoint = chartData[0];
    return firstPoint?.price || 0;
  }, [chartData]);

  const priceChange = useMemo(() => {
    if (!firstTradePrice || !lastTradePrice) return 0;
    return ((lastTradePrice - firstTradePrice) / firstTradePrice) * 100;
  }, [firstTradePrice, lastTradePrice]);

  const priceStats = useMemo(() => {
    if (!chartData.length) return {avg: 0, max: 0, min: 0};

    const prices = chartData.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

    return {avg, max, min};
  }, [chartData]);

  const gradientId = 'colorGradient';
  const isPositive = priceChange >= 0;

  if (isLoading && chartData.length === 0) {
    return (
      <S.Container className={className}>
        <S.ChartBackground>
          <S.LoadingContainer>Loading chart data...</S.LoadingContainer>
        </S.ChartBackground>
      </S.Container>
    );
  }

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

              <S.PriceChange $isPositive={isPositive}>
                <S.ChangeArrow $isPositive={isPositive}>{isPositive ? '▲' : '▼'}</S.ChangeArrow>
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
                <S.TimeframeButton key={tf} $active={timeframe === tf} onClick={() => setTimeframe(tf)}>
                  {tf}
                </S.TimeframeButton>
              ))}
            </S.TimeframeButtons>

            <S.ChartTypeButtons>
              <S.ChartTypeButton $active={chartType === 'line'} onClick={() => setChartType('line')} title="Line Chart">
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
              <S.ChartTypeButton $active={chartType === 'area'} onClick={() => setChartType('area')} title="Area Chart">
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
              <AreaChart data={displayData} margin={{bottom: 0, left: 0, right: 30, top: 10}}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isPositive ? colors.palette.green[400] : colors.palette.red[400]}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={isPositive ? colors.palette.green[400] : colors.palette.red[400]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.palette.gray[200]} />
                <XAxis
                  dataKey="display_date"
                  axisLine={false}
                  tick={{fill: colors.palette.gray[600], fontSize: 12}}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  tick={{fill: colors.palette.gray[600], fontSize: 12}}
                  tickLine={false}
                  domain={[
                    (dataMin: number) => Math.max(0, Math.floor(dataMin * 0.95)),
                    (dataMax: number) => Math.ceil(dataMax * 1.05),
                  ]}
                  tickCount={8}
                  allowDecimals={false}
                  tickFormatter={(value) => Math.round(value).toString()}
                />
                <Tooltip
                  content={<ChartTooltip currencyId={activeAssetPair?.secondary_currency.id} />}
                  cursor={{stroke: colors.palette.gray[400], strokeWidth: 1}}
                />
                <Area
                  type="monotone"
                  dataKey="trade_price"
                  stroke={isPositive ? colors.palette.green[500] : colors.palette.red[500]}
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                  dot={false}
                />
              </AreaChart>
            ) : (
              <LineChart data={displayData} margin={{bottom: 0, left: 0, right: 30, top: 10}}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.palette.gray[200]} />
                <XAxis
                  dataKey="display_date"
                  axisLine={false}
                  tick={{fill: colors.palette.gray[600], fontSize: 12}}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  tick={{fill: colors.palette.gray[600], fontSize: 12}}
                  tickLine={false}
                  domain={[
                    (dataMin: number) => Math.max(0, Math.floor(dataMin * 0.95)),
                    (dataMax: number) => Math.ceil(dataMax * 1.05),
                  ]}
                  tickCount={8}
                  allowDecimals={false}
                  tickFormatter={(value) => Math.round(value).toString()}
                />
                <Tooltip
                  content={<ChartTooltip currencyId={activeAssetPair?.secondary_currency.id} />}
                  cursor={{stroke: colors.palette.gray[400], strokeWidth: 1}}
                />
                <Line
                  type="monotone"
                  dataKey="trade_price"
                  stroke={isPositive ? colors.palette.green[500] : colors.palette.red[500]}
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
