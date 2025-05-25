import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MANAGER} from 'constants/store';
import {Manager} from 'types';

const initialState: Manager = {
  activeAssetPairId: null,
  activeCommentCurrency: null,
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
