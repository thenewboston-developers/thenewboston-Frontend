import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {ChartDataPoint} from 'api/exchangeChartData';
import {SocketDataType} from 'enums';
import {getChartData} from 'selectors/state';
import {addNewInterval, updateCurrentInterval} from 'store/chartData';
import {AppDispatch, Trade} from 'types';

export interface ChartWebSocketProps {
  socket: ReconnectingWebSocket | null;
}

const ChartWebSocket: FC<ChartWebSocketProps> = ({socket}) => {
  const dispatch = useDispatch<AppDispatch>();
  const chartDataState = useSelector(getChartData);
  const {data: chartData, intervalMinutes, primaryCurrencyId, secondaryCurrencyId} = chartDataState;

  useEffect(() => {
    if (!socket) return;

    const processTrade = (trade: Trade) => {
      if (!intervalMinutes || chartData.length === 0) return;

      const tradeTime = new Date(trade.created_date);
      const intervalMs = intervalMinutes * 60 * 1000;
      const lastInterval = chartData[chartData.length - 1];
      const lastIntervalEnd = new Date(lastInterval.end);

      // Check if trade belongs to current interval
      if (tradeTime >= new Date(lastInterval.start) && tradeTime < lastIntervalEnd) {
        // Update existing interval
        const updatedInterval: ChartDataPoint = {
          ...lastInterval,
          close: trade.trade_price,
          high: Math.max(lastInterval.high, trade.trade_price),
          low: Math.min(lastInterval.low, trade.trade_price),
          volume: lastInterval.volume + trade.fill_quantity,
        };

        // If this is the first trade in the interval, update open/high/low
        if (lastInterval.volume === 0) {
          updatedInterval.open = trade.trade_price;
          updatedInterval.high = trade.trade_price;
          updatedInterval.low = trade.trade_price;
        }

        dispatch(updateCurrentInterval(updatedInterval));
      } else if (tradeTime >= lastIntervalEnd) {
        // Check for missed intervals
        const missedIntervals = Math.floor((tradeTime.getTime() - lastIntervalEnd.getTime()) / intervalMs);

        // Fill any missed intervals
        for (let i = 0; i < missedIntervals; i += 1) {
          const intervalStart = new Date(lastIntervalEnd.getTime() + i * intervalMs);
          const intervalEnd = new Date(intervalStart.getTime() + intervalMs);

          const missedInterval: ChartDataPoint = {
            close: lastInterval.close,
            end: intervalEnd.toISOString(),
            high: lastInterval.close,
            low: lastInterval.close,
            open: lastInterval.close,
            start: intervalStart.toISOString(),
            volume: 0,
          };

          dispatch(addNewInterval(missedInterval));
        }

        // Create new interval with the trade
        const newIntervalStart = new Date(lastIntervalEnd.getTime() + missedIntervals * intervalMs);
        const newIntervalEnd = new Date(newIntervalStart.getTime() + intervalMs);

        const newInterval: ChartDataPoint = {
          close: trade.trade_price,
          end: newIntervalEnd.toISOString(),
          high: trade.trade_price,
          low: trade.trade_price,
          open: trade.trade_price,
          start: newIntervalStart.toISOString(),
          volume: trade.fill_quantity,
        };

        dispatch(addNewInterval(newInterval));
      }
    };

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === SocketDataType.CREATE_TRADE) {
        // Only process trades for the current asset pair
        if (primaryCurrencyId && secondaryCurrencyId) {
          processTrade(data.trade);
        }
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket, chartData, intervalMinutes, primaryCurrencyId, secondaryCurrencyId, dispatch]);

  return null;
};

export default ChartWebSocket;
