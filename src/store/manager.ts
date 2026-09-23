import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MANAGER} from 'constants/store';
import {setWallet, setWallets} from 'store/wallets';
import {Manager} from 'types';
import {isNewerWallet} from 'utils/wallets';

const initialState: Manager = {
  activeCommentCurrency: null,
  activeWallet: null,
  activeWalletTab: null,
};

const manager = createSlice({
  extraReducers: (builder) => {
    builder.addCase(setWallet, (state, {payload}) => {
      if (state.activeWallet?.id === payload.id && isNewerWallet(payload, state.activeWallet)) {
        state.activeWallet = payload;
      }
    });
    builder.addCase(setWallets, (state, {payload}) => {
      for (const wallet of payload) {
        if (state.activeWallet?.id === wallet.id && isNewerWallet(wallet, state.activeWallet)) {
          state.activeWallet = wallet;
        }
      }
    });
  },
  initialState,
  name: MANAGER,
  reducers: {
    updateManager: (state: Manager, {payload}: PayloadAction<Partial<Manager>>) => {
      Object.assign(state, payload);
    },
  },
});

export const {updateManager} = manager.actions;
export default manager.reducer;
