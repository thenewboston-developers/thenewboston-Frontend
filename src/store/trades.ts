import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TRADES} from 'constants/store';
import {Trade, Trades} from 'types';

const initialState: Trades = {};

const trades = createSlice({
  initialState,
  name: TRADES,
  reducers: {
    setTrade: (state: Trades, {payload}: PayloadAction<Trade>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setTrades: (state: Trades, {payload}: PayloadAction<Trade[]>) => {
      return payload.reduce((acc: Trades, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setTrade, setTrades} = trades.actions;
export default trades.reducer;
