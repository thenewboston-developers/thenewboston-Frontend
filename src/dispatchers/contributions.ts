import {getContributions as _getContributions} from 'api/contributions';
import {setContributions} from 'store/contributions';
import {AppDispatch} from 'types';

export const getContributions = () => async (dispatch: AppDispatch) => {
  const responseData = await _getContributions();
  dispatch(setContributions(responseData));
};
