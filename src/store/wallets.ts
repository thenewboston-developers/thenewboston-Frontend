import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {WALLETS} from 'constants/store';
import {Wallet, Wallets} from 'types';
import {isNewerWallet} from 'utils/wallets';

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
      const {id} = payload;
      if (isNewerWallet(payload, state.wallets[id])) {
        state.wallets[id] = payload;
      }
    },
    setWallets: (state: WalletsState, {payload}: PayloadAction<Wallet[]>) => {
      for (const wallet of payload) {
        if (isNewerWallet(wallet, state.wallets[wallet.id])) {
          state.wallets[wallet.id] = wallet;
        }
      }
    },
  },
});

export const {clearWallets, setIsLoadingWallets, setWallet, setWallets} = wallets.actions;
export default wallets.reducer;
