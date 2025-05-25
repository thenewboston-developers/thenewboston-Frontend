import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MINTS} from 'constants/store';
import {Mint, Mints} from 'types';

const initialState: Mints = {};

const mints = createSlice({
  initialState,
  name: MINTS,
  reducers: {
    setMint: (state: Mints, {payload}: PayloadAction<Mint>) => {
      state[payload.id] = payload;
    },
    setMints: (state: Mints, {payload}: PayloadAction<Mint[]>) => {
      return payload.reduce((acc, mint) => ({...acc, [mint.id]: mint}), {});
    },
    unsetMint: (state: Mints, {payload}: PayloadAction<string>) => {
      delete state[payload];
    },
  },
});

export const {setMint, setMints, unsetMint} = mints.actions;
export default mints.reducer;
