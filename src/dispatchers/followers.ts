import {store} from 'store';
import {
  createFollower as _createFollower,
  deleteFollower as _deleteFollower,
  getFollowers as _getFollowers,
} from 'api/followers';
import {
  resetFollowers as _resetFollowers,
  setFollower,
  setFollowers,
  startLoading,
  unsetFollower,
} from 'store/followers';
import {AppDispatch, CreateFollowerRequest} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const createFollower = (data: CreateFollowerRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createFollower(data);
  dispatch(setFollower(responseData));
};

export const deleteFollower = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteFollower(id);
  dispatch(unsetFollower(id));
};

export const resetFollowers = () => (dispatch: AppDispatch) => {
  dispatch(_resetFollowers());
};

export const getFollowers = (userId?: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().followers);
  const responseData = await _getFollowers(nextURL, {follower: userId});
  dispatch(setFollowers(responseData));
};
