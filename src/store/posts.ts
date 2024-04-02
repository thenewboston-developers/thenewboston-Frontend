import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {POSTS} from 'constants/store';
import {Post} from 'types';
import {PostsState} from 'types/posts';


const initialState: PostsState = {
  post: {},
  posts: {
    count: 0,
    hasMore: false,
    isLoading: false,
    next: null,
    previous: null,
    results: [],
  },
};

const posts = createSlice({
  initialState,
  name: POSTS,
  reducers: {
    setPost: (state, {payload}: PayloadAction<Post>) => {
      state.post = payload;
    },
    setPosts: (state, {payload}: PayloadAction<Post[]>) => {
      console.log('payload', payload);
      state.posts.results = payload;
      // Additional logic for pagination states
    },
    unsetPost: (state, {payload: id}: PayloadAction<number>) => {
      state.posts.results = state.posts.results.filter((post) => post.id !== id);
    },
  },
});

export const {setPost, setPosts, unsetPost} = posts.actions;
export default posts.reducer;
