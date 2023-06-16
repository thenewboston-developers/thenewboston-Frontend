import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AUTHENTICATION} from 'store/constants';
import {Authentication} from 'types';

const initialState: Authentication = {
  accessToken: null,
  refreshToken: null,
};

const authentication = createSlice({
  initialState,
  name: AUTHENTICATION,
  reducers: {
    resetAuthentication: () => initialState,
    setAuthentication: (state: Authentication, {payload}: PayloadAction<Authentication>) => {
      return payload;
    },
  },
});

export const {resetAuthentication, setAuthentication} = authentication.actions;
export default authentication.reducer;
