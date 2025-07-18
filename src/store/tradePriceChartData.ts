import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TRADE_PRICE_CHART_DATA} from 'constants/store';
import {Candlestick, ChartTimeRange, Trade} from 'types';

export interface TradePriceChartDataState {
  candlesticks: Candlestick[];
  currentTimeRange: ChartTimeRange | null;
  intervalMinutes: number;
  primaryCurrencyId: number | null;
  secondaryCurrencyId: number | null;
}

const initialState: TradePriceChartDataState = {
  candlesticks: [],
  currentTimeRange: null,
  intervalMinutes: 0,
  primaryCurrencyId: null,
  secondaryCurrencyId: null,
};

const tradePriceChartData = createSlice({
  initialState,
  name: TRADE_PRICE_CHART_DATA,
  reducers: {
    clearTradePriceChartData: () => initialState,
    processTrade: (state, {payload}: PayloadAction<Trade>) => {
      if (!state.intervalMinutes) {
        return;
      }

      const trade = payload;
      const tradeTime = new Date(trade.created_date);
      const intervalMs = state.intervalMinutes * 60 * 1000;

      // If no candlesticks exist, create the first one
      if (state.candlesticks.length === 0) {
        const candlestickStart = new Date(Math.floor(tradeTime.getTime() / intervalMs) * intervalMs);
        const candlestickEnd = new Date(candlestickStart.getTime() + intervalMs);

        const newCandlestick: Candlestick = {
          close: trade.price,
          end: candlestickEnd.toISOString(),
          high: trade.price,
          low: trade.price,
          open: trade.price,
          start: candlestickStart.toISOString(),
          volume: trade.filled_quantity,
        };

        state.candlesticks.push(newCandlestick);
        return;
      }

      const lastCandlestick = state.candlesticks[state.candlesticks.length - 1];
      const lastCandlestickEnd = new Date(lastCandlestick.end);

      // Check if trade belongs to current candlestick
      if (tradeTime >= new Date(lastCandlestick.start) && tradeTime < lastCandlestickEnd) {
        // Update existing candlestick
        const updatedCandlestick: Candlestick = {
          ...lastCandlestick,
          close: trade.price,
          high: Math.max(lastCandlestick.high, trade.price),
          low: Math.min(lastCandlestick.low, trade.price),
          volume: lastCandlestick.volume + trade.filled_quantity,
        };

        // If this is the first trade in the candlestick, update open/high/low
        if (lastCandlestick.volume === 0) {
          updatedCandlestick.open = trade.price;
          updatedCandlestick.high = trade.price;
          updatedCandlestick.low = trade.price;
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
          close: trade.price,
          end: newCandlestickEnd.toISOString(),
          high: trade.price,
          low: trade.price,
          open: trade.price,
          start: newCandlestickStart.toISOString(),
          volume: trade.filled_quantity,
        };

        state.candlesticks.push(newCandlestick);
      }
    },
    setTradePriceChartData: (
      state,
      {
        payload,
      }: PayloadAction<{
        candlesticks: Candlestick[];
        currentTimeRange?: ChartTimeRange;
        intervalMinutes: number;
        primaryCurrencyId: number;
        secondaryCurrencyId: number;
      }>,
    ) => {
      state.candlesticks = payload.candlesticks;
      state.intervalMinutes = payload.intervalMinutes;
      state.primaryCurrencyId = payload.primaryCurrencyId;
      state.secondaryCurrencyId = payload.secondaryCurrencyId;
      if (payload.currentTimeRange) {
        state.currentTimeRange = payload.currentTimeRange;
      }
    },
  },
});

export const {clearTradePriceChartData, processTrade, setTradePriceChartData} = tradePriceChartData.actions;
export default tradePriceChartData.reducer;
