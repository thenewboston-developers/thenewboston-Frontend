import {
  createComment as _createComment,
  deleteComment as _deleteComment,
  updateComment as _updateComment,
} from 'api/comments';
import {updateTipAmounts} from 'dispatchers/posts';
import {setComment, unsetComment} from 'store/comments';
import {AppDispatch, CreateCommentRequest} from 'types';

export const createComment = (data: CreateCommentRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createComment(data);
  dispatch(setComment(responseData));

  // Update tip amounts if the comment includes a tip
  if (data.price_amount && data.price_currency && data.post) {
    await dispatch(updateTipAmounts(data.post));
  }
};

export const deleteComment = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteComment(id);
  dispatch(unsetComment(id));
};

export const updateComment = (id: number, data: Partial<CreateCommentRequest>) => async (dispatch: AppDispatch) => {
  const responseData = await _updateComment(id, data);
  dispatch(setComment(responseData));
};
