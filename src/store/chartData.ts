import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ChartDataPoint} from 'api/exchangeChartData';
import {CHART_DATA} from 'constants/store';
import {Trade} from 'types';

export interface ChartDataState {
  data: ChartDataPoint[];
  intervalMinutes: number;
  primaryCurrencyId: number | null;
  secondaryCurrencyId: number | null;
}

const initialState: ChartDataState = {
  data: [],
  intervalMinutes: 0,
  primaryCurrencyId: null,
  secondaryCurrencyId: null,
};

const chartData = createSlice({
  initialState,
  name: CHART_DATA,
  reducers: {
    clearChartData: () => initialState,
    setChartData: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: ChartDataPoint[];
        intervalMinutes: number;
        primaryCurrencyId: number;
        secondaryCurrencyId: number;
      }>,
    ) => {
      state.data = payload.data;
      state.intervalMinutes = payload.intervalMinutes;
      state.primaryCurrencyId = payload.primaryCurrencyId;
      state.secondaryCurrencyId = payload.secondaryCurrencyId;
    },
    updateCurrentInterval: (state, {payload}: PayloadAction<ChartDataPoint>) => {
      // Update the last interval if it matches the time range
      if (state.data.length > 0) {
        const lastInterval = state.data[state.data.length - 1];
        if (lastInterval.start === payload.start && lastInterval.end === payload.end) {
          state.data[state.data.length - 1] = payload;
        }
      }
    },
    addNewInterval: (state, {payload}: PayloadAction<ChartDataPoint>) => {
      state.data.push(payload);
    },
    processTrade: (state, {payload}: PayloadAction<Trade>) => {
      console.log('processTrade reducer called with trade:', payload);

      if (!state.intervalMinutes || state.data.length === 0) {
        console.log('Early return: intervalMinutes or data is empty', {
          intervalMinutes: state.intervalMinutes,
          dataLength: state.data.length,
        });
        return;
      }

      const trade = payload;
      const tradeTime = new Date(trade.created_date);
      const intervalMs = state.intervalMinutes * 60 * 1000;
      const lastInterval = state.data[state.data.length - 1];
      const lastIntervalEnd = new Date(lastInterval.end);

      console.log('Trade processing details:', {
        tradeTime: tradeTime.toISOString(),
        lastIntervalStart: lastInterval.start,
        lastIntervalEnd: lastInterval.end,
        belongsToCurrentInterval: tradeTime >= new Date(lastInterval.start) && tradeTime < lastIntervalEnd,
      });

      // Check if trade belongs to current interval
      if (tradeTime >= new Date(lastInterval.start) && tradeTime < lastIntervalEnd) {
        console.log('Updating existing interval');
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

        console.log('Updated interval:', updatedInterval);
        state.data[state.data.length - 1] = updatedInterval;
      } else if (tradeTime >= lastIntervalEnd) {
        console.log('Trade is after last interval, creating new interval(s)');
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

          state.data.push(missedInterval);
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

        console.log('New interval created:', newInterval);
        state.data.push(newInterval);
      }

      console.log('Final chart data length:', state.data.length);
    },
  },
});

export const {clearChartData, setChartData, updateCurrentInterval, addNewInterval, processTrade} = chartData.actions;
export default chartData.reducer;
