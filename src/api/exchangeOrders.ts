import axios from 'axios';

import {CreateExchangeOrderRequest, ExchangeOrder, ExchangeOrderPaginatedResponse, OrderBookResponse} from 'types';
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

export const getExchangeOrders = async (url?: string): Promise<ExchangeOrderPaginatedResponse> => {
  try {
    const requestUrl = url || BASE_URL;
    const response = await axios.get<ExchangeOrderPaginatedResponse>(requestUrl, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderBook = async (assetPairId: number): Promise<OrderBookResponse> => {
  try {
    const params = new URLSearchParams({
      asset_pair: assetPairId.toString(),
    });
    const response = await axios.get<OrderBookResponse>(`${BASE_URL}/book?${params}`, authorizationHeaders());
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
