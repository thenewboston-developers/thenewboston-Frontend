import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ORDER_BOOK} from 'constants/store';
import {ExchangeOrderSide, ExchangeOrderStatus} from 'enums';
import {ExchangeOrder, OrderBookResponse, OrderBookState} from 'types';

const initialState: OrderBookState = {
  buyOrders: [],
  isLoading: false,
  sellOrders: [],
};

const orderBook = createSlice({
  initialState,
  name: ORDER_BOOK,
  reducers: {
    resetOrderBook: () => initialState,
    setOrderBook: (state: OrderBookState, {payload}: PayloadAction<OrderBookResponse>) => {
      state.buyOrders = payload.buy_orders;
      state.isLoading = false;
      state.sellOrders = payload.sell_orders;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    updateOrderBookOrder: (state: OrderBookState, {payload}: PayloadAction<ExchangeOrder>) => {
      const {id, side, status} = payload;

      // Remove order if it's no longer OPEN or PARTIALLY_FILLED
      if (status !== ExchangeOrderStatus.OPEN && status !== ExchangeOrderStatus.PARTIALLY_FILLED) {
        state.buyOrders = state.buyOrders.filter((order) => order.id !== id);
        state.sellOrders = state.sellOrders.filter((order) => order.id !== id);
        return;
      }

      // Update or add order to appropriate list
      if (side === ExchangeOrderSide.BUY) {
        const index = state.buyOrders.findIndex((order) => order.id === id);
        if (index !== -1) {
          state.buyOrders[index] = payload;
        } else {
          state.buyOrders.push(payload);
        }
        // Re-sort buy orders by price descending
        state.buyOrders.sort((a, b) => b.price - a.price);
      } else {
        const index = state.sellOrders.findIndex((order) => order.id === id);
        if (index !== -1) {
          state.sellOrders[index] = payload;
        } else {
          state.sellOrders.push(payload);
        }
        // Re-sort sell orders by price ascending
        state.sellOrders.sort((a, b) => a.price - b.price);
      }
    },
  },
});

export const {resetOrderBook, setOrderBook, startLoading, updateOrderBookOrder} = orderBook.actions;
export default orderBook.reducer;
