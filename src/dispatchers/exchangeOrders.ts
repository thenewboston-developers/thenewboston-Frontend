import {
  createExchangeOrder as _createExchangeOrder,
  getExchangeOrders as _getExchangeOrders,
  updateExchangeOrder as _updateExchangeOrder,
} from 'api/exchangeOrders';
import {setExchangeOrder, setExchangeOrders} from 'store/exchangeOrders';
import {AppDispatch, CreateExchangeOrderRequest, ExchangeOrder} from 'types';

export const createExchangeOrder = (data: CreateExchangeOrderRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createExchangeOrder(data);
  dispatch(setExchangeOrder(responseData));
};

export const getExchangeOrders = () => async (dispatch: AppDispatch) => {
  const responseData = await _getExchangeOrders();
  dispatch(setExchangeOrders(responseData));
};

export const updateExchangeOrder = (id: number, data: Partial<ExchangeOrder>) => async (dispatch: AppDispatch) => {
  const responseData = await _updateExchangeOrder(id, data);
  dispatch(setExchangeOrder(responseData));
};
