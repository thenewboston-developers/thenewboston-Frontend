import {
  createComment as _createComment,
  deleteComment as _deleteComment,
  updateComment as _updateComment,
} from 'api/comments';
import {setComment, unsetComment} from 'store/comments';
import {AppDispatch, CreateCommentRequest} from 'types';

export const createComment = (data: CreateCommentRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createComment(data);
  dispatch(setComment(responseData));
};

export const deleteComment = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteComment(id);
  dispatch(unsetComment(id));
};

export const updateComment = (id: number, data: Partial<CreateCommentRequest>) => async (dispatch: AppDispatch) => {
  const responseData = await _updateComment(id, data);
  dispatch(setComment(responseData));
};
