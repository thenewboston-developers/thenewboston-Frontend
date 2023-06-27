import {getTrades as _getTrades, GetTradesParams} from 'api/trades';
import {setTrades} from 'store/trades';
import {AppDispatch} from 'types';

export const getTrades = (params?: GetTradesParams) => async (dispatch: AppDispatch) => {
  const responseData = await _getTrades(params);
  dispatch(setTrades(responseData));
};
