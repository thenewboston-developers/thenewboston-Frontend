import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TRANSFERS} from 'store/constants';
import {Transfer, Transfers} from 'types';

const initialState: Transfers = {};

const transfers = createSlice({
  initialState,
  name: TRANSFERS,
  reducers: {
    setTransfer: (state: Transfers, {payload}: PayloadAction<Transfer>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setTransfers: (state: Transfers, {payload}: PayloadAction<Transfer[]>) => {
      return payload.reduce((acc: Transfers, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setTransfer, setTransfers} = transfers.actions;
export default transfers.reducer;
