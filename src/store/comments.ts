import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {COMMENTS} from 'store/constants';
import {Comment, Comments} from 'types';

const initialState: Comments = {};

const comments = createSlice({
  initialState,
  name: COMMENTS,
  reducers: {
    setComment: (state: Comments, {payload}: PayloadAction<Comment>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setComments: (state: Comments, {payload}: PayloadAction<Comment[]>) => {
      payload.forEach((comment) => {
        state[comment.id] = comment;
      });
    },
    unsetComment: (state: Comments, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setComment, setComments, unsetComment} = comments.actions;
export default comments.reducer;
