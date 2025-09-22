import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ASSET_PAIRS} from 'constants/store';
import {AssetPair, AssetPairs} from 'types';

const initialState: AssetPairs = {};

const assetPairs = createSlice({
  initialState,
  name: ASSET_PAIRS,
  reducers: {
    setAssetPair: (state: AssetPairs, {payload}: PayloadAction<AssetPair>) => {
      state[payload.id] = payload;
    },
    setAssetPairs: (state: AssetPairs, {payload}: PayloadAction<AssetPair[]>) => {
      return payload.reduce((acc: AssetPairs, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setAssetPair, setAssetPairs} = assetPairs.actions;
export default assetPairs.reducer;
