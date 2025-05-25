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
      payload.forEach((mint) => {
        state[mint.id] = mint;
      });
    },
  },
});

export const {setMint, setMints} = mints.actions;
export default mints.reducer;
