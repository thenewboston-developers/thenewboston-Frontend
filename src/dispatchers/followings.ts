import {store} from 'store';

import {AppDispatch} from 'types';
import {GetFollowersParams, deleteFollower as _deleteFollowing, getFollowers as _getFollowings} from 'api/followers';
import {getNextUrlFromState} from 'utils/urls';
import {resetFollowing as _resetFollowing, setFollowings, startLoading, unsetFollowing} from 'store/followings';

export const deleteFollowing = (followerId: number, followingUserId: number) => async (dispatch: AppDispatch) => {
  await _deleteFollowing(followingUserId);
  dispatch(unsetFollowing(followerId));
};

export const resetFollowings = () => (dispatch: AppDispatch) => {
  dispatch(_resetFollowing());
};

export const getFollowings = (params?: GetFollowersParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().followings);
  const responseData = await _getFollowings(nextURL, params);
  dispatch(setFollowings(responseData));
};
