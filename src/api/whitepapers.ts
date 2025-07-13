import axios from 'axios';

import {PaginatedResponse, Whitepaper} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/whitepapers`;

export const createWhitepaper = async (data: {currency: number; content: string}): Promise<Whitepaper> => {
  try {
    const response = await axios.post<Whitepaper>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWhitepaper = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};

export const getWhitepaper = async (currencyId: number): Promise<Whitepaper | null> => {
  try {
    const response = await axios.get<PaginatedResponse<Whitepaper>>(BASE_URL, {
      ...authorizationHeaders(),
      params: {currency: currencyId},
    });

    return response.data.results.length > 0 ? response.data.results[0] : null;
  } catch (error) {
    throw error;
  }
};

export const updateWhitepaper = async (id: number, data: {content: string}): Promise<Whitepaper> => {
  try {
    const response = await axios.patch<Whitepaper>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
