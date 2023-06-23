import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ORDERS} from 'store/constants';
import {Order, Orders} from 'types';

const initialState: Orders = {};

const orders = createSlice({
  initialState,
  name: ORDERS,
  reducers: {
    setOrder: (state: Orders, {payload}: PayloadAction<Order>) => {
      const {id} = payload;
      state[id] = payload;
    },
  },
});

export const {setOrder} = orders.actions;
export default orders.reducer;
