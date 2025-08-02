import {
  createCurrency as _createCurrency,
  deleteCurrency as _deleteCurrency,
  getCurrencies as _getCurrencies,
  getCurrency as _getCurrency,
  updateCurrency as _updateCurrency,
} from 'api/currencies';
import {setCurrencies, setCurrency, unsetCurrency} from 'store/currencies';
import {AppDispatch} from 'types';

export const createCurrency = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createCurrency(data);
  dispatch(setCurrency(responseData));
};

export const deleteCurrency = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteCurrency(id);
  dispatch(unsetCurrency(id));
};

export const getCurrencies =
  (params?: {ordering?: string; page?: number; page_size?: number}) => async (dispatch: AppDispatch) => {
    const responseData = await _getCurrencies({
      ordering: '-modified_date',
      ...params,
    });
    dispatch(setCurrencies(responseData.results));
    return responseData;
  };

export const getCurrency = (id: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getCurrency(id);
  dispatch(setCurrency(responseData));
  return responseData;
};

export const updateCurrency = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateCurrency(id, data);
  dispatch(setCurrency(responseData));
};
