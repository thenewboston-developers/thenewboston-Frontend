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
    resetSelf: () => initialState,
    setSelf: (state: Self, {payload}: PayloadAction<Self>) => {
      return payload;
    },
    updateSelf: (state: Self, {payload}: PayloadAction<Partial<Self>>) => {
      Object.assign(state, payload);
    },
  },
});

export const {resetSelf, setSelf, updateSelf} = self.actions;
export default self.reducer;
