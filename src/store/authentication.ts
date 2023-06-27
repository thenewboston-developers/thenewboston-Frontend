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
    setAuthentication: (state: Authentication, {payload}: PayloadAction<Authentication>) => {
      return payload;
    },
  },
});

export const {setAuthentication} = authentication.actions;
export default authentication.reducer;
