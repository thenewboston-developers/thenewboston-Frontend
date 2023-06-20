import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {WALLETS} from 'store/constants';
import {Wallet, Wallets} from 'types';

const initialState: Wallets = {};

const wallets = createSlice({
  initialState,
  name: WALLETS,
  reducers: {
    setWallets: (state: Wallets, {payload}: PayloadAction<Wallet[]>) => {
      return payload.reduce((acc: Wallets, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setWallets} = wallets.actions;
export default wallets.reducer;
