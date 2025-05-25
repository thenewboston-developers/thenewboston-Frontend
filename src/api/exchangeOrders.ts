import axios from 'axios';

import {CreateExchangeOrderRequest, ExchangeOrder} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/exchange-orders`;

export const createExchangeOrder = async (data: CreateExchangeOrderRequest): Promise<ExchangeOrder> => {
  try {
    const response = await axios.post<ExchangeOrder>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExchangeOrders = async (): Promise<ExchangeOrder[]> => {
  try {
    const response = await axios.get<ExchangeOrder[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExchangeOrder = async (id: number, data: Partial<ExchangeOrder>): Promise<ExchangeOrder> => {
  try {
    const response = await axios.patch<ExchangeOrder>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
