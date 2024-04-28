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
    setLecture: (state, {payload}: PayloadAction<Lecture>) => {
      const existingPostIndex = state.lectures.findIndex((lecture) => lecture.id === payload.id);
      if (existingPostIndex >= 0) {
        state.lectures[existingPostIndex] = payload;
      } else {
        state.lectures.unshift(payload);
      }
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
    unsetLecture: (state, {payload: id}: PayloadAction<number>) => {
      state.lectures = state.lectures.filter((lecture) => lecture.id !== id);
    },
  },
});

export const {resetLectures, startLoading, setLecture, setLectures, unsetLecture} = lectures.actions;
export default lectures.reducer;
