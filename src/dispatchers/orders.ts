import {createOrder as _createOrder, getOrders as _getOrders, updateOrder as _updateOrder} from 'api/orders';
import {setOrder, setOrders} from 'store/orders';
import {AppDispatch, CreateOrderRequest, Order} from 'types';

export const createOrder = (data: CreateOrderRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createOrder(data);
  dispatch(setOrder(responseData));
};

export const getOrders = () => async (dispatch: AppDispatch) => {
  const responseData = await _getOrders();
  dispatch(setOrders(responseData));
};

export const updateOrder = (id: number, data: Partial<Order>) => async (dispatch: AppDispatch) => {
  const responseData = await _updateOrder(id, data);
  dispatch(setOrder(responseData));
};
