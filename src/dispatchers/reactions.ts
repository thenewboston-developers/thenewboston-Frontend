import {createPostReaction as _createPostReaction} from 'api/reactions';
import {setPostUserReaction} from 'store/posts';
import {AppDispatch} from 'types';
import {PostReactionCreateRequest} from 'types/api/postReaction';

export const createPostReaction = (data: PostReactionCreateRequest) => async (dispatch: AppDispatch) => {
  await _createPostReaction(data);
  dispatch(setPostUserReaction(data));
};
