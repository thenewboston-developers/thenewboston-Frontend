import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ADDRESSES} from 'constants/store';
import {Address, Addresses} from 'types';

const initialState: Addresses = {};

const addresses = createSlice({
  initialState,
  name: ADDRESSES,
  reducers: {
    setAddress: (state: Addresses, {payload}: PayloadAction<Address>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setAddresses: (state: Addresses, {payload}: PayloadAction<Address[]>) => {
      return payload.reduce((acc: Addresses, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetAddress: (state: Addresses, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setAddress, setAddresses, unsetAddress} = addresses.actions;
export default addresses.reducer;
