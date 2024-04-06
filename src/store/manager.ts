import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MANAGER} from 'constants/store';
import {Manager} from 'types';

const initialState: Manager = {
  activeAddress: null,
  activeAssetPairId: null,
  activeCommentCore: null,
  activeConversationId: null,
  activeOrderAddressId: null,
  activeProduct: null,
  activeWalletId: null,
  activeWalletTab: null,
};

const manager = createSlice({
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
