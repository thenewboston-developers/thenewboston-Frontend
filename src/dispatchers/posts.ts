import {store} from 'store';
import {
  createPost as _createPost,
  deletePost as _deletePost,
  getPosts as _getPosts,
  updatePost as _updatePost,
  GetPostsParams,
} from 'api/posts';
import {setComments} from 'store/comments';
import {setPost, setPosts, unsetPost, startLoading, resetPosts as _resetPosts} from 'store/posts';
import {AppDispatch} from 'types';
import {getNextUrlFromState} from 'utils/url';

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
