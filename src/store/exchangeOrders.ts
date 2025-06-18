import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {EXCHANGE_ORDERS} from 'constants/store';
import {ExchangeOrder, ExchangeOrderPaginatedResponse, ExchangeOrdersState} from 'types';

const initialState: ExchangeOrdersState = {
  exchangeOrders: {},
  hasMore: false,
  isLoading: false,
  next: null,
};

const exchangeOrders = createSlice({
  initialState,
  name: EXCHANGE_ORDERS,
  reducers: {
    resetExchangeOrders: (state) => {
      state.exchangeOrders = {};
      state.hasMore = false;
      state.isLoading = false;
      state.next = null;
    },
    setExchangeOrder: (state: ExchangeOrdersState, {payload}: PayloadAction<ExchangeOrder>) => {
      const {id, modified_date} = payload;
      if (!state.exchangeOrders[id] || new Date(modified_date) > new Date(state.exchangeOrders[id].modified_date)) {
        state.exchangeOrders[id] = payload;
      }
    },
    setExchangeOrders: (state: ExchangeOrdersState, {payload}: PayloadAction<ExchangeOrderPaginatedResponse>) => {
      state.hasMore = !!payload.next;
      state.isLoading = false;
      state.next = payload.next;
      payload.results.forEach((order) => {
        state.exchangeOrders[order.id] = order;
      });
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {resetExchangeOrders, setExchangeOrder, setExchangeOrders, startLoading} = exchangeOrders.actions;
export default exchangeOrders.reducer;
