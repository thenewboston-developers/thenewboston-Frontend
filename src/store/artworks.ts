import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ARTWORKS} from 'constants/store';
import {Artwork, Artworks} from 'types';

const initialState: Artworks = {};

const artworks = createSlice({
  initialState,
  name: ARTWORKS,
  reducers: {
    setArtwork: (state: Artworks, {payload}: PayloadAction<Artwork>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setArtworks: (state: Artworks, {payload}: PayloadAction<Artwork[]>) => {
      return payload.reduce((acc: Artworks, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetArtwork: (state: Artworks, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setArtwork, setArtworks, unsetArtwork} = artworks.actions;
export default artworks.reducer;
