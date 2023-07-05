import {getTransfers as _getTransfers} from 'api/transfers';
import {setTransfers} from 'store/transfers';
import {AppDispatch} from 'types';

export const getTransfers = () => async (dispatch: AppDispatch) => {
  const responseData = await _getTransfers();
  dispatch(setTransfers(responseData));
};
