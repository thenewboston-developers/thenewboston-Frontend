import {
  createProduct as _createProduct,
  deleteProduct as _deleteProduct,
  getProduct as _getProduct,
  getProducts as _getProducts,
  updateProduct as _updateProduct,
} from 'api/products';
import {setProduct, setProducts, unsetProduct} from 'store/products';
import {AppDispatch} from 'types';

export const createProduct = (data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _createProduct(data);
  dispatch(setProduct(responseData));
};

export const deleteProduct = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteProduct(id);
  dispatch(unsetProduct(id));
};

export const getProduct = (id: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getProduct(id);
  dispatch(setProduct(responseData));
};

export const getProducts = () => async (dispatch: AppDispatch) => {
  const responseData = await _getProducts();
  dispatch(setProducts(responseData));
};

export const updateProduct = (id: number, data: FormData) => async (dispatch: AppDispatch) => {
  const responseData = await _updateProduct(id, data);
  dispatch(setProduct(responseData));
};
