import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CHART_DATA} from 'constants/store';
import {Candlestick, Trade} from 'types';

export interface ChartDataState {
  candlesticks: Candlestick[];
  intervalMinutes: number;
  primaryCurrencyId: number | null;
  secondaryCurrencyId: number | null;
}

const initialState: ChartDataState = {
  candlesticks: [],
  intervalMinutes: 0,
  primaryCurrencyId: null,
  secondaryCurrencyId: null,
};

const chartData = createSlice({
  initialState,
  name: CHART_DATA,
  reducers: {
    addNewInterval: (state, {payload}: PayloadAction<Candlestick>) => {
      state.candlesticks.push(payload);
    },
    clearChartData: () => initialState,
    processTrade: (state, {payload}: PayloadAction<Trade>) => {
      if (!state.intervalMinutes || state.candlesticks.length === 0) {
        return;
      }

      const trade = payload;
      const tradeTime = new Date(trade.created_date);
      const intervalMs = state.intervalMinutes * 60 * 1000;
      const lastCandlestick = state.candlesticks[state.candlesticks.length - 1];
      const lastCandlestickEnd = new Date(lastCandlestick.end);

      // Check if trade belongs to current candlestick
      if (tradeTime >= new Date(lastCandlestick.start) && tradeTime < lastCandlestickEnd) {
        // Update existing candlestick
        const updatedCandlestick: Candlestick = {
          ...lastCandlestick,
          close: trade.trade_price,
          high: Math.max(lastCandlestick.high, trade.trade_price),
          low: Math.min(lastCandlestick.low, trade.trade_price),
          volume: lastCandlestick.volume + trade.fill_quantity,
        };

        // If this is the first trade in the candlestick, update open/high/low
        if (lastCandlestick.volume === 0) {
          updatedCandlestick.open = trade.trade_price;
          updatedCandlestick.high = trade.trade_price;
          updatedCandlestick.low = trade.trade_price;
        }

        state.candlesticks[state.candlesticks.length - 1] = updatedCandlestick;
      } else if (tradeTime >= lastCandlestickEnd) {
        // Check for missed candlesticks
        const missedCandlesticks = Math.floor((tradeTime.getTime() - lastCandlestickEnd.getTime()) / intervalMs);

        // Fill any missed candlesticks
        for (let i = 0; i < missedCandlesticks; i += 1) {
          const candlestickStart = new Date(lastCandlestickEnd.getTime() + i * intervalMs);
          const candlestickEnd = new Date(candlestickStart.getTime() + intervalMs);

          const missedCandlestick: Candlestick = {
            close: lastCandlestick.close,
            end: candlestickEnd.toISOString(),
            high: lastCandlestick.close,
            low: lastCandlestick.close,
            open: lastCandlestick.close,
            start: candlestickStart.toISOString(),
            volume: 0,
          };

          state.candlesticks.push(missedCandlestick);
        }

        // Create new candlestick with the trade
        const newCandlestickStart = new Date(lastCandlestickEnd.getTime() + missedCandlesticks * intervalMs);
        const newCandlestickEnd = new Date(newCandlestickStart.getTime() + intervalMs);

        const newCandlestick: Candlestick = {
          close: trade.trade_price,
          end: newCandlestickEnd.toISOString(),
          high: trade.trade_price,
          low: trade.trade_price,
          open: trade.trade_price,
          start: newCandlestickStart.toISOString(),
          volume: trade.fill_quantity,
        };

        state.candlesticks.push(newCandlestick);
      }
    },
    setChartData: (
      state,
      {
        payload,
      }: PayloadAction<{
        candlesticks: Candlestick[];
        intervalMinutes: number;
        primaryCurrencyId: number;
        secondaryCurrencyId: number;
      }>,
    ) => {
      state.candlesticks = payload.candlesticks;
      state.intervalMinutes = payload.intervalMinutes;
      state.primaryCurrencyId = payload.primaryCurrencyId;
      state.secondaryCurrencyId = payload.secondaryCurrencyId;
    },
    updateCurrentInterval: (state, {payload}: PayloadAction<Candlestick>) => {
      // Update the last interval if it matches the time range
      if (state.candlesticks.length > 0) {
        const lastCandlestick = state.candlesticks[state.candlesticks.length - 1];
        if (lastCandlestick.start === payload.start && lastCandlestick.end === payload.end) {
          state.candlesticks[state.candlesticks.length - 1] = payload;
        }
      }
    },
  },
});

export const {addNewInterval, clearChartData, processTrade, setChartData, updateCurrentInterval} = chartData.actions;
export default chartData.reducer;
