import {
  createCurrency as _createCurrency,
  deleteCurrency as _deleteCurrency,
  getCurrencies as _getCurrencies,
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

export const getCurrencies = () => async (dispatch: AppDispatch) => {
  const responseData = await _getCurrencies();
  dispatch(setCurrencies(responseData));
};

export const updateCurrency = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateCurrency(id, data);
  dispatch(setCurrency(responseData));
};
