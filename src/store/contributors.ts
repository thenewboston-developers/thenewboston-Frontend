import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CONTRIBUTORS} from 'constants/store';
import {Contributor, Contributors} from 'types';

const initialState = {
  isLoading: false,
  items: [] as Contributors,
};

const contributors = createSlice({
  initialState,
  name: CONTRIBUTORS,
  reducers: {
    resetContributors: () => initialState,
    setContributors: (state, {payload}: PayloadAction<Contributor[]>) => {
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
