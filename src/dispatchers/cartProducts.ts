import {
  createCartProduct as _createCartProduct,
  deleteCartProduct as _deleteCartProduct,
  getCartProducts as _getCartProducts,
} from 'api/cartProducts';
import {setCartProduct, setCartProducts, unsetCartProduct} from 'store/cartProducts';
import {AppDispatch, CreateCartProductRequest} from 'types';

export const createCartProduct = (data: CreateCartProductRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createCartProduct(data);
  dispatch(setCartProduct(responseData));
};

export const deleteCartProduct = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteCartProduct(id);
  dispatch(unsetCartProduct(id));
};

export const getCartProducts = () => async (dispatch: AppDispatch) => {
  const responseData = await _getCartProducts();
  dispatch(setCartProducts(responseData));
};
