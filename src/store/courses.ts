import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {COURSES} from 'constants/store';
import {Course, Courses, PaginatedResponse} from 'types';

const initialState: Courses = {
  courses: [],
  hasMore: false,
  isLoading: false,
  next: null,
};

const courses = createSlice({
  initialState,
  name: COURSES,
  reducers: {
    resetCourses: (state) => {
      state.courses = [];
      state.hasMore = false;
      state.isLoading = false;
      state.next = null;
    },
    setCourse: (state, {payload}: PayloadAction<Course>) => {
      const existingPostIndex = state.courses.findIndex((course) => course.id === payload.id);
      if (existingPostIndex >= 0) {
        state.courses[existingPostIndex] = payload;
      } else {
        state.courses.unshift(payload);
      }
    },
    setCourses: (state, {payload}: PayloadAction<PaginatedResponse<Course>>) => {
      state.courses = [...state.courses, ...payload.results];
      state.hasMore = !!payload.next;
      state.isLoading = false;
      state.next = payload.next;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {setCourse, setCourses, startLoading, resetCourses} = courses.actions;
export default courses.reducer;
