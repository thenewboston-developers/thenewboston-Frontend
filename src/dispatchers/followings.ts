import {store} from 'store';
import {
  createFollower as _createFollowing,
  deleteFollower as _deleteFollowing,
  getFollowers as _getFollowings,
} from 'api/followers';
import {
  resetFollowing as _resetFollowing,
  setFollowing,
  setFollowings,
  startLoading,
  unsetFollowing,
} from 'store/followings';
import {AppDispatch, CreateFollowerRequest} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const createFollowing = (data: CreateFollowerRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createFollowing(data);
  dispatch(setFollowing(responseData));
};

export const deleteFollowing = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteFollowing(id);
  dispatch(unsetFollowing(id));
};

export const resetFollowings = () => (dispatch: AppDispatch) => {
  dispatch(_resetFollowing());
};

export const getFollowings = (userId?: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().followings);
  const responseData = await _getFollowings(nextURL, {following: userId});
  dispatch(setFollowings(responseData));
};
