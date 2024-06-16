import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ARTWORK_TRANSFERS} from 'constants/store';
import {ArtworkTransfer, ArtworkTransfers} from 'types';

export const initialState: ArtworkTransfers = {};

const artworkTransfers = createSlice({
  initialState,
  name: ARTWORK_TRANSFERS,
  reducers: {
    setArtworkTransfer: (state: ArtworkTransfers, {payload}: PayloadAction<ArtworkTransfer>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setArtworkTransfers: (_: ArtworkTransfers, {payload}: PayloadAction<ArtworkTransfer[]>) => {
      return payload.reduce((acc: ArtworkTransfers, obj) => ({...acc, [obj.id]: obj}), {});
    },
  },
});

export const {setArtworkTransfer, setArtworkTransfers} = artworkTransfers.actions;
export default artworkTransfers.reducer;
