import {getContributions as _getContributions, GetContributionsParams} from 'api/contributions';
import {setContributions} from 'store/contributions';
import {AppDispatch} from 'types';

export const getContributions = (params: GetContributionsParams) => async (dispatch: AppDispatch) => {
  const responseData = await _getContributions(params);
  dispatch(setContributions(responseData));
};
