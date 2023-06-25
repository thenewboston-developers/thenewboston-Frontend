import {createOrder as _createOrder, getOrders as _getOrders} from 'api/orders';
import {setOrder, setOrders} from 'store/orders';
import {AppDispatch, CreateOrderRequest} from 'types';

export const createOrder = (data: CreateOrderRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createOrder(data);
  dispatch(setOrder(responseData));
};

export const getOrders = () => async (dispatch: AppDispatch) => {
  const responseData = await _getOrders();
  dispatch(setOrders(responseData));
};
