import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {LECTURES} from 'constants/store';
import {Lecture, Lectures, PaginatedResponse} from 'types';

const initialState: Lectures = {
  hasMore: false,
  isLoading: false,
  lectures: [],
  next: null,
};

const lectures = createSlice({
  initialState,
  name: LECTURES,
  reducers: {
    resetLectures: (state) => {
      state.hasMore = false;
      state.isLoading = false;
      state.next = null;
      state.lectures = [];
    },
    setLectures: (state, {payload}: PayloadAction<PaginatedResponse<Lecture>>) => {
      state.hasMore = !!payload.next;
      state.isLoading = false;
      state.lectures = [...state.lectures, ...payload.results];
      state.next = payload.next;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {resetLectures, startLoading, setLectures} = lectures.actions;
export default lectures.reducer;
