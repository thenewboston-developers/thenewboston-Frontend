import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CONTRIBUTIONS_CUMULATIVE} from 'constants/store';
import {ContributionsCumulative} from 'types';

export const initialState = {
  isLoading: false,
  items: [] as ContributionsCumulative,
};

const contributionsCumulative = createSlice({
  initialState,
  name: CONTRIBUTIONS_CUMULATIVE,
  reducers: {
    resetContributionsCumulative: () => initialState,
    setContributionsCumulative: (state, {payload}: PayloadAction<ContributionsCumulative>) => {
      state.items = payload;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {resetContributionsCumulative, setContributionsCumulative, startLoading} = contributionsCumulative.actions;
export default contributionsCumulative.reducer;
