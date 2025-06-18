import {
  createExchangeOrder as _createExchangeOrder,
  getExchangeOrders as _getExchangeOrders,
  updateExchangeOrder as _updateExchangeOrder,
} from 'api/exchangeOrders';
import {store} from 'store';
import {
  resetExchangeOrders as _resetExchangeOrders,
  setExchangeOrder,
  setExchangeOrders,
  startLoading,
} from 'store/exchangeOrders';
import {AppDispatch, CreateExchangeOrderRequest, ExchangeOrder} from 'types';
import {getNextUrlFromState} from 'utils/urls';

export const createExchangeOrder = (data: CreateExchangeOrderRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createExchangeOrder(data);
  dispatch(setExchangeOrder(responseData));
};

export const getExchangeOrders = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().exchangeOrders);
  const responseData = await _getExchangeOrders(nextURL);
  dispatch(setExchangeOrders(responseData));
};

export const resetExchangeOrders = () => (dispatch: AppDispatch) => {
  dispatch(_resetExchangeOrders());
};

export const updateExchangeOrder = (id: number, data: Partial<ExchangeOrder>) => async (dispatch: AppDispatch) => {
  const responseData = await _updateExchangeOrder(id, data);
  dispatch(setExchangeOrder(responseData));
};
