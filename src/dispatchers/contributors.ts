import {AppDispatch} from 'types';
import {getTopContributors as _getTopContributors} from 'api/contributors';
import {resetContributors as _resetContributors, setContributors, startLoading} from 'store/contributors';

export const getTopContributors = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const responseData = await _getTopContributors();
  dispatch(setContributors(responseData));
};

export const resetContributors = () => (dispatch: AppDispatch) => {
  dispatch(_resetContributors());
};
