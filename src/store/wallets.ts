import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {WALLETS} from 'constants/store';
import {PaginatedResponse, Wallet, Wallets} from 'types';

export interface WalletsState {
  wallets: Wallets;
  pagination: {
    count: number;
    hasMore: boolean;
    isLoading: boolean;
    next: string | null;
    page: number;
  };
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
    setPaginatedWallets: (
      state: WalletsState,
      {payload}: PayloadAction<{data: PaginatedResponse<Wallet>; page: number}>,
    ) => {
      const {data, page} = payload;
      // Clear wallets and replace with current page's data
      state.wallets = {};
      data.results.forEach((wallet) => {
        state.wallets[wallet.id] = wallet;
      });
      state.pagination = {
        count: data.count,
        hasMore: !!data.next,
        isLoading: false,
        next: data.next,
        page,
      };
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

export const {clearWallets, setIsLoadingWallets, setPaginatedWallets, setWallet, setWallets} = wallets.actions;
export default wallets.reducer;
