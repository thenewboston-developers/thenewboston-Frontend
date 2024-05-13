import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ARTWORKS} from 'constants/store';
import {Artwork, Artworks, PaginatedResponse} from 'types';

const initialState: Artworks = {
  artworks: [],
  hasMore: false,
  isLoading: false,
  next: null,
};

const artworks = createSlice({
  initialState,
  name: ARTWORKS,
  reducers: {
    resetArtworks: (state) => {
      state.artworks = [];
      state.hasMore = false;
      state.isLoading = false;
      state.next = null;
    },
    setArtwork: (state, {payload}: PayloadAction<Artwork>) => {
      const existingArtworkIndex = state.artworks.findIndex((artwork) => artwork.id === payload.id);
      if (existingArtworkIndex >= 0) {
        state.artworks[existingArtworkIndex] = payload;
      } else {
        state.artworks.unshift(payload);
      }
    },
    setArtworks: (state, {payload}: PayloadAction<PaginatedResponse<Artwork>>) => {
      state.artworks = [...state.artworks, ...payload.results];
      state.hasMore = !!payload.next;
      state.isLoading = false;
      state.next = payload.next;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    unsetArtwork: (state, {payload: id}: PayloadAction<number>) => {
      state.artworks = state.artworks.filter((artwork) => artwork.id !== id);
    },
  },
});

export const {resetArtworks, setArtwork, setArtworks, startLoading, unsetArtwork} = artworks.actions;
export default artworks.reducer;
