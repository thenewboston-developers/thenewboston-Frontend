import {
  createPost as _createPost,
  deletePost as _deletePost,
  getPosts as _getPosts,
  updatePost as _updatePost,
} from 'api/posts';
import {setPost, setPosts, unsetPost} from 'store/posts';
import {AppDispatch} from 'types';

export const createPost = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createPost(data);
  dispatch(setPost(responseData));
};

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
  await _deletePost(id);
  dispatch(unsetPost(id));
};

export const getPosts = () => async (dispatch: AppDispatch) => {
  const responseData = await _getPosts();
  dispatch(setPosts(responseData));
};

export const updatePost = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updatePost(id, data);
  dispatch(setPost(responseData));
};
