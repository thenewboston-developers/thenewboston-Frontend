import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {WALLETS} from 'constants/store';
import {Wallet, Wallets} from 'types';

export interface WalletsState {
  pagination: {
    count: number;
    hasMore: boolean;
    isLoading: boolean;
    next: string | null;
    page: number;
  };
  wallets: Wallets;
}

const initialState: WalletsState = {
  pagination: {
    count: 0,
    hasMore: false,
    isLoading: false,
    next: null,
    page: 1,
  },
  wallets: {},
};

const wallets = createSlice({
  initialState,
  name: WALLETS,
  reducers: {
    clearWallets: (state: WalletsState) => {
      state.wallets = {};
      state.pagination = initialState.pagination;
    },
    setIsLoadingWallets: (state: WalletsState, {payload}: PayloadAction<boolean>) => {
      state.pagination.isLoading = payload;
    },
    setWallet: (state: WalletsState, {payload}: PayloadAction<Wallet>) => {
      const {id, modified_date} = payload;
      if (!state.wallets[id] || new Date(modified_date) > new Date(state.wallets[id].modified_date)) {
        state.wallets[id] = payload;
      }
    },
    setWallets: (state: WalletsState, {payload}: PayloadAction<Wallet[]>) => {
      state.wallets = payload.reduce((acc: Wallets, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {clearWallets, setIsLoadingWallets, setWallet, setWallets} = wallets.actions;
export default wallets.reducer;
