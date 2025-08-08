import {
  createPost as _createPost,
  deletePost as _deletePost,
  getPosts as _getPosts,
  getTipAmounts as _getTipAmounts,
  likePost as _likePost,
  unlikePost as _unlikePost,
  updatePost as _updatePost,
} from 'api/posts';
import {store} from 'store';
import {setComments} from 'store/comments';
import {
  resetPosts as _resetPosts,
  setPost,
  setPosts,
  startLoading,
  stopLoading,
  unsetPost,
  updatePostLikeStatus,
  updatePostTipAmounts,
} from 'store/posts';
import {AppDispatch, GetPostsParams} from 'types';
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

export const getPosts = (params?: GetPostsParams, abortSignal?: AbortSignal) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const nextURL = getNextUrlFromState(store.getState().posts);
    const responseData = await _getPosts(nextURL, params, abortSignal);

    for (const post of responseData.results) {
      const comments = post.comments || [];
      dispatch(setComments(comments));
      delete post.comments;
    }

    dispatch(setPosts(responseData));
  } catch (error: any) {
    // If the request was aborted, stop loading but don't throw
    // Axios with AbortController throws 'CanceledError' with code 'ERR_CANCELED'
    if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError') {
      dispatch(stopLoading());
    } else {
      // For real errors, stop loading and throw
      dispatch(stopLoading());
      throw error;
    }
  }
};

export const updatePost = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updatePost(id, data);

  const comments = responseData.comments || [];
  dispatch(setComments(comments));
  delete responseData.comments;

  dispatch(setPost(responseData));
};

export const likePost = (postId: number) => async (dispatch: AppDispatch) => {
  const state = store.getState();
  const post = state.posts.posts.find((p) => p.id === postId);

  if (!post) return;

  // Optimistically update the UI
  dispatch(
    updatePostLikeStatus({
      postId,
      isLiked: true,
      likeCount: post.like_count + 1,
    }),
  );

  try {
    await _likePost(postId);
  } catch (error) {
    // Revert on error
    dispatch(
      updatePostLikeStatus({
        postId,
        isLiked: false,
        likeCount: post.like_count,
      }),
    );
    throw error;
  }
};

export const unlikePost = (postId: number) => async (dispatch: AppDispatch) => {
  const state = store.getState();
  const post = state.posts.posts.find((p) => p.id === postId);

  if (!post) return;

  // Optimistically update the UI
  dispatch(
    updatePostLikeStatus({
      postId,
      isLiked: false,
      likeCount: post.like_count - 1,
    }),
  );

  try {
    await _unlikePost(postId);
  } catch (error) {
    // Revert on error
    dispatch(
      updatePostLikeStatus({
        postId,
        isLiked: true,
        likeCount: post.like_count,
      }),
    );
    throw error;
  }
};

export const updateTipAmounts = (postId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getTipAmounts(postId);
  dispatch(
    updatePostTipAmounts({
      postId,
      tipAmounts: responseData.tip_amounts,
    }),
  );
};
