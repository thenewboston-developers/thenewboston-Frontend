import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {USERS} from 'constants/store';
import {UserReadSerializer, Users} from 'types';

const initialState: Users = {};

const users = createSlice({
  initialState,
  name: USERS,
  reducers: {
    setUser: (state: Users, {payload}: PayloadAction<UserReadSerializer>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setUsers: (state: Users, {payload}: PayloadAction<UserReadSerializer[]>) => {
      payload.forEach((user) => {
        state[user.id] = user;
      });
    },
  },
});

export const {setUser, setUsers} = users.actions;
export default users.reducer;
