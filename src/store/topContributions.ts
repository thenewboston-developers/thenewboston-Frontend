import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TOPCONTRIBUTIONS} from 'constants/store';
import {TopContribution, TopContributions} from 'types/topContributions';

const initialState: TopContributions = {};

const topContributions = createSlice({
  initialState,
  name: TOPCONTRIBUTIONS,
  reducers: {
    setTopContributions: (_: TopContributions, {payload}: PayloadAction<TopContribution[]>) => {
      return payload.reduce((acc: TopContributions, obj) => ({...acc, [obj.user_id]: obj}), {});
    },
  },
});

export const {setTopContributions} = topContributions.actions;
export default topContributions.reducer;
