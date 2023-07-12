import {
  createExchangeOrder as _createExchangeOrder,
  getExchangeOrder as _getExchangeOrder,
  updateExchangeOrder as _updateExchangeOrder,
} from 'api/exchangeOrders';
import {setExchangeOrder, setExchangeOrders} from 'store/exchangeOrders';
import {AppDispatch, CreateOrderRequest, ExchangeOrder} from 'types';

export const createExchangeOrder = (data: CreateOrderRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createExchangeOrder(data);
  dispatch(setExchangeOrder(responseData));
};

export const getExchangeOrder = () => async (dispatch: AppDispatch) => {
  const responseData = await _getExchangeOrder();
  dispatch(setExchangeOrders(responseData));
};

export const updateExchangeOrder = (id: number, data: Partial<ExchangeOrder>) => async (dispatch: AppDispatch) => {
  const responseData = await _updateExchangeOrder(id, data);
  dispatch(setExchangeOrder(responseData));
};
