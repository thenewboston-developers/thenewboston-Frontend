import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CONTRIBUTORS} from 'constants/store';
import {Contributors} from 'types';

export const initialState = {
  isLoading: false,
  items: [] as Contributors,
};

const contributors = createSlice({
  initialState,
  name: CONTRIBUTORS,
  reducers: {
    resetContributors: () => initialState,
    setContributors: (state, {payload}: PayloadAction<Contributors>) => {
      state.items = payload;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {resetContributors, setContributors, startLoading} = contributors.actions;
export default contributors.reducer;
