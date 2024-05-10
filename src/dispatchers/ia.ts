import {getIa as _getIa} from 'api/ia';
import {setIa} from 'store/ia';
import {AppDispatch} from 'types';

export const getIa = () => async (dispatch: AppDispatch) => {
  const responseData = await _getIa();
  if (responseData) {
    dispatch(setIa(responseData));
  }
};
