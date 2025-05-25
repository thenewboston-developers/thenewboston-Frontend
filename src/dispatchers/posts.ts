import {
  createPost as _createPost,
  deletePost as _deletePost,
  getPosts as _getPosts,
  GetPostsParams,
  updatePost as _updatePost,
} from 'api/posts';
import {store} from 'store';
import {setComments} from 'store/comments';
import {resetPosts as _resetPosts, setPost, setPosts, startLoading, unsetPost} from 'store/posts';
import {AppDispatch} from 'types';

import {getNextUrlFromState} from 'utils/urls';

export const createPost = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createPost(data);
  delete responseData.comments;
  dispatch(setPost(responseData));
};

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
  await _deletePost(id);
  dispatch(unsetPost(id));
};

export const resetPosts = () => (dispatch: AppDispatch) => {
  dispatch(_resetPosts());
};

export const getPosts = (params?: GetPostsParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().posts);
  const responseData = await _getPosts(nextURL, params);

  for (const post of responseData.results) {
    const comments = post.comments || [];
    dispatch(setComments(comments));
    delete post.comments;
  }

  dispatch(setPosts(responseData));
};

export const updatePost = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updatePost(id, data);

  const comments = responseData.comments || [];
  dispatch(setComments(comments));
  delete responseData.comments;

  dispatch(setPost(responseData));
};
