import {store} from 'store';

import {
  createContribution as _createContribution,
  getContributions as _getContributions,
  GetContributionsParams,
} from 'api/contributions';
import {
  setContribution,
  setContributions,
  resetContributions as _resetContributions,
  startLoading,
} from 'store/contributions';
import {getNextUrlFromState} from 'utils/urls';
import {AppDispatch, CreateContributionRequest} from 'types';

export const createContribution = (data: CreateContributionRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createContribution(data);
  dispatch(setContribution(responseData));
};

export const resetContributions = () => (dispatch: AppDispatch) => {
  dispatch(_resetContributions());
};

export const getContributions = (params?: GetContributionsParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().contributions);
  const responseData = await _getContributions(nextURL, params);
  dispatch(setContributions(responseData));
};
