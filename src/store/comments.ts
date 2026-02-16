import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {COMMENTS} from 'constants/store';
import {Comment, Comments} from 'types';

interface SetCommentsForPostPayload {
  comments: Comment[];
  postId: number;
}

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
    setCommentsForPost: (state: Comments, {payload}: PayloadAction<SetCommentsForPostPayload>) => {
      const {comments: nextComments, postId} = payload;

      Object.entries(state).forEach(([commentId, comment]) => {
        if (comment.post === postId) {
          delete state[parseInt(commentId, 10)];
        }
      });

      nextComments.forEach((comment) => {
        state[comment.id] = comment;
      });
    },
    unsetComment: (state: Comments, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setComment, setComments, setCommentsForPost, unsetComment} = comments.actions;
export default comments.reducer;
