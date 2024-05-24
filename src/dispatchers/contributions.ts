import {store} from 'store';

import {getContributions as _getContributions, GetContributionsParams} from 'api/contributions';
import {setContributions, resetContributions as _resetContributions, startLoading} from 'store/contributions';
import {getNextUrlFromState} from 'utils/urls';
import {AppDispatch} from 'types';

export const resetContributions = () => (dispatch: AppDispatch) => {
  dispatch(_resetContributions());
};

export const getContributions = (params?: GetContributionsParams) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const nextURL = getNextUrlFromState(store.getState().contributions);
  const responseData = await _getContributions(nextURL, params);
  dispatch(setContributions(responseData));
};
