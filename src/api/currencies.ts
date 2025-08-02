import axios from 'axios';

import {Currency, PaginatedResponse} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/currencies`;

export const createCurrency = async (data: FormData): Promise<Currency> => {
  try {
    const response = await axios.post<Currency>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCurrency = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};

export const getCurrencies = async (params?: {
  ordering?: string;
  page?: number;
  page_size?: number;
}): Promise<PaginatedResponse<Currency>> => {
  try {
    const response = await axios.get<PaginatedResponse<Currency>>(BASE_URL, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrency = async (id: number): Promise<Currency> => {
  try {
    const response = await axios.get<Currency>(`${BASE_URL}/${id}`, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCurrency = async (id: number, data: FormData): Promise<Currency> => {
  try {
    const response = await axios.patch<Currency>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailableWalletCurrencies = async (): Promise<Currency[]> => {
  try {
    // Fetch all currencies with a high page_size to get most/all currencies
    // This is a temporary solution until the backend provides a specific endpoint
    const response = await axios.get<PaginatedResponse<Currency>>(BASE_URL, {
      ...authorizationHeaders(),
      params: {page_size: 100},
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
