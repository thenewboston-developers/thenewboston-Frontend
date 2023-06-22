import {createOrder as _createOrder} from 'api/orders';
import {setOrder} from 'store/orders';
import {AppDispatch, CreateOrderRequest} from 'types';

export const createOrder = (data: CreateOrderRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createOrder(data);
  dispatch(setOrder(responseData));
};
