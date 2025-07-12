import axios from 'axios';

import {Currency} from 'types';
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

export const getCurrencies = async (ordering?: string): Promise<Currency[]> => {
  try {
    const params = ordering ? {ordering} : {};
    const response = await axios.get<Currency[]>(BASE_URL, {
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
