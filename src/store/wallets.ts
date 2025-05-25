import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WALLETS} from 'constants/store';
import {Wallet, Wallets} from 'types';

const initialState: Wallets = {};

const wallets = createSlice({
  initialState,
  name: WALLETS,
  reducers: {
    setWallet: (state: Wallets, {payload}: PayloadAction<Wallet>) => {
      const {id, modified_date} = payload;
      if (!state[id] || new Date(modified_date) > new Date(state[id].modified_date)) state[id] = payload;
    },
    setWallets: (state: Wallets, {payload}: PayloadAction<Wallet[]>) => {
      return payload.reduce((acc: Wallets, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setWallet, setWallets} = wallets.actions;
export default wallets.reducer;
