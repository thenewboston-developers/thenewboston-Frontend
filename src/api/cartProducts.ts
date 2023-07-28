import axios from 'axios';

import {CartProduct, CreateCartProductRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/cart_products`;

export const createCartProduct = async (data: CreateCartProductRequest): Promise<CartProduct> => {
  try {
    const response = await axios.post<CartProduct>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCartProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const emptyCart = async (): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/empty_cart`, {}, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCartProducts = async (): Promise<CartProduct[]> => {
  try {
    const response = await axios.get<CartProduct[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
