import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {EXCHANGE_ORDERS} from 'constants/store';
import {ExchangeOrder, ExchangeOrders} from 'types';

const initialState: ExchangeOrders = {};

const exchangeOrders = createSlice({
  initialState,
  name: EXCHANGE_ORDERS,
  reducers: {
    setExchangeOrder: (state: ExchangeOrders, {payload}: PayloadAction<ExchangeOrder>) => {
      const {id, modified_date} = payload;
      if (!state[id] || new Date(modified_date) > new Date(state[id].modified_date)) state[id] = payload;
    },
    setExchangeOrders: (state: ExchangeOrders, {payload}: PayloadAction<ExchangeOrder[]>) => {
      return payload.reduce((acc: ExchangeOrders, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setExchangeOrder, setExchangeOrders} = exchangeOrders.actions;
export default exchangeOrders.reducer;
