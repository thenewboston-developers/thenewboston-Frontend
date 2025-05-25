import {
  createFollower as _createFollower,
  deleteFollower as _deleteFollower,
  getFollowers as _getFollowers,
  GetFollowersParams,
} from 'api/followers';
import {store} from 'store';
import {
  resetFollowers as _resetFollowers,
  setFollowers,
  setSelfFollowing,
  startLoading,
  unsetSelfFollowing,
} from 'store/followers';
import {AppDispatch, CreateFollowerRequest} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const createFollower = (data: CreateFollowerRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createFollower(data);
  dispatch(setSelfFollowing(responseData.following.id));
};

export const deleteFollower = (followingUserId: number) => async (dispatch: AppDispatch) => {
  await _deleteFollower(followingUserId);
  dispatch(unsetSelfFollowing(followingUserId));
};

export const resetFollowers = () => (dispatch: AppDispatch) => {
  dispatch(_resetFollowers());
};

export const getFollowers = (params?: GetFollowersParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().followers);
  const responseData = await _getFollowers(nextURL, params);
  dispatch(setFollowers(responseData));
};
