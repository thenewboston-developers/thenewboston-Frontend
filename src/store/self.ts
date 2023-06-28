import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SELF} from 'store/constants';
import {Self} from 'types';

const initialState: Self = {
  id: null,
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
