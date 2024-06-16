import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ASSET_PAIRS} from 'constants/store';
import {AssetPair, AssetPairs} from 'types';

export const initialState: AssetPairs = {};

const assetPairs = createSlice({
  initialState,
  name: ASSET_PAIRS,
  reducers: {
    setAssetPairs: (state: AssetPairs, {payload}: PayloadAction<AssetPair[]>) => {
      return payload.reduce((acc: AssetPairs, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setAssetPairs} = assetPairs.actions;
export default assetPairs.reducer;
