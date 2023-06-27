import axios from 'axios';

import {CreateOrderRequest, Order} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/orders`;

export const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  try {
    const response = await axios.post<Order>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateOrder = async (id: number, data: Partial<Order>): Promise<Order> => {
  try {
    const response = await axios.patch<Order>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
