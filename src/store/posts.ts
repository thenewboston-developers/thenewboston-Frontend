import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {POSTS} from 'constants/store';
import {Post, Posts, PaginatedResponse} from 'types';

const initialState: Posts = {
  isLoading: false,
  next: null,
  posts: [],
};

const posts = createSlice({
  initialState,
  name: POSTS,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.next = null;
      state.isLoading = false;
    },
    setPost: (state, {payload}: PayloadAction<Post>) => {
      const existingPostIndex = state.posts.findIndex((post) => post.id === payload.id);
      if (existingPostIndex >= 0) {
        state.posts[existingPostIndex] = payload;
      } else {
        state.posts.push(payload);
      }
    },
    setPosts: (state, {payload}: PayloadAction<PaginatedResponse<Post>>) => {
      state.posts = [...state.posts, ...payload.results];
      state.next = payload.next;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    unsetPost: (state, {payload: id}: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== id);
    },
  },
});

export const {setPost, setPosts, unsetPost, startLoading, resetPosts} = posts.actions;
export default posts.reducer;
