import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {USER_STATS} from 'constants/store';
import {UserStats, UserStatsSerializer} from 'types';

const initialState: UserStats = {};

const userStats = createSlice({
  initialState,
  name: USER_STATS,
  reducers: {
    setUserStats: (state: UserStats, {payload}: PayloadAction<UserStatsSerializer>) => {
      const {id} = payload;
      state[id] = payload;
    },
  },
});

export const {setUserStats} = userStats.actions;
export default userStats.reducer;
