import {AppDispatch} from 'types';
import {getContributionsCumulative as _getContributionsCumulative} from 'api/contributionsCumulative';
import {
  resetContributionsCumulative as _resetContributionsCumulative,
  setContributionsCumulative,
  startLoading,
} from 'store/contributionsCumulative';

export const getContributionsCumulative = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  const responseData = await _getContributionsCumulative();
  dispatch(setContributionsCumulative(responseData));
};

export const resetContributionsCumulative = () => (dispatch: AppDispatch) => {
  dispatch(_resetContributionsCumulative());
};
