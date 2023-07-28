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
    setOrders: (state: Orders, {payload}: PayloadAction<Order[]>) => {
      return payload.reduce((acc: Orders, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setOrder, setOrders} = orders.actions;
export default orders.reducer;
