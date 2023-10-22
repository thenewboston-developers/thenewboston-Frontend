import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {POSTS} from 'constants/store';
import {Post, Posts} from 'types';

const initialState: Posts = {};

const posts = createSlice({
  initialState,
  name: POSTS,
  reducers: {
    setPost: (state: Posts, {payload}: PayloadAction<Post>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setPosts: (state: Posts, {payload}: PayloadAction<Post[]>) => {
      return payload.reduce((acc: Posts, obj) => ({...acc, [obj.id]: obj}), {});
    },
    unsetPost: (state: Posts, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setPost, setPosts, unsetPost} = posts.actions;
export default posts.reducer;
