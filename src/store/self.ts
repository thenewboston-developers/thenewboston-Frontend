import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SELF} from 'constants/store';
import {Self} from 'types';

const initialState: Self = {
  avatar: null,
  id: null,
  is_manual_contribution_allowed: false,
  username: null,
};

const self = createSlice({
  initialState,
  name: SELF,
  reducers: {
    setSelf: (state: Self, {payload}: PayloadAction<Self>) => {
      return payload;
    },
  },
});

export const {setSelf} = self.actions;
export default self.reducer;
