import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SELF} from 'store/constants';
import {Self} from 'types';

const initialState: Self = {
  deposit_account_number: null,
  id: null,
  username: null,
};

const self = createSlice({
  initialState,
  name: SELF,
  reducers: {
    resetSelf: () => initialState,
    setSelf: (state: Self, {payload}: PayloadAction<Self>) => {
      return payload;
    },
  },
});

export const {resetSelf, setSelf} = self.actions;
export default self.reducer;
