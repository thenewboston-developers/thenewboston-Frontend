import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {POSTS} from 'constants/store';
import {PaginatedResponse, Post, Posts, TipAmount} from 'types';

const initialState: Posts = {
  hasMore: false,
  isLoading: false,
  next: null,
  posts: [],
};

const posts = createSlice({
  initialState,
  name: POSTS,
  reducers: {
    resetPosts: (state) => {
      state.hasMore = false;
      state.isLoading = false;
      state.next = null;
      state.posts = [];
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setPost: (state, {payload}: PayloadAction<Post>) => {
      const existingPostIndex = state.posts.findIndex((post) => post.id === payload.id);
      if (existingPostIndex >= 0) {
        state.posts[existingPostIndex] = payload;
      } else {
        state.posts.unshift(payload);
      }
    },
    setPosts: (state, {payload}: PayloadAction<PaginatedResponse<Post>>) => {
      state.hasMore = !!payload.next;
      state.isLoading = false;
      state.next = payload.next;
      state.posts = [...state.posts, ...payload.results];
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    unsetPost: (state, {payload: id}: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== id);
    },
    updatePostLikeStatus: (state, {payload}: PayloadAction<{postId: number; isLiked: boolean; likeCount: number}>) => {
      const post = state.posts.find((p) => p.id === payload.postId);
      if (post) {
        post.is_liked = payload.isLiked;
        post.like_count = payload.likeCount;
      }
    },
    updatePostTipAmounts: (state, {payload}: PayloadAction<{postId: number; tipAmounts: TipAmount[]}>) => {
      const post = state.posts.find((p) => p.id === payload.postId);
      if (post) {
        post.tip_amounts = payload.tipAmounts;
      }
    },
  },
});

export const {
  setPost,
  setPosts,
  unsetPost,
  startLoading,
  stopLoading,
  resetPosts,
  updatePostLikeStatus,
  updatePostTipAmounts,
} = posts.actions;
export default posts.reducer;
