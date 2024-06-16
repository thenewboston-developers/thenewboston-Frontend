import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {USERS} from 'constants/store';
import {UserReadSerializer, Users} from 'types';

export const initialState: Users = {};

const users = createSlice({
  initialState,
  name: USERS,
  reducers: {
    setUser: (state: Users, {payload}: PayloadAction<UserReadSerializer>) => {
      const {id} = payload;
      state[id] = payload;
    },
  },
});

export const {setUser} = users.actions;
export default users.reducer;
