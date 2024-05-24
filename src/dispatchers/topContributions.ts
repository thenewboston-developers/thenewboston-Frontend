import {AppDispatch} from 'types';
import {setTopContributions} from '../store/topContributions';
import {getTopContributions as _getTopContributions} from '../api/topContributions';

export const getTopContributions = (filterType: string) => async (dispatch: AppDispatch) => {
  const responseData = await _getTopContributions(filterType);
  dispatch(setTopContributions(responseData));
};
