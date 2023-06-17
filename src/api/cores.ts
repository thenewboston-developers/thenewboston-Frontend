import axios from 'axios';

import {Core} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/cores`;

export const createCore = async (data: FormData): Promise<Core> => {
  try {
    const response = await axios.post<Core>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCore = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCores = async (): Promise<Core[]> => {
  try {
    const response = await axios.get<Core[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCore = async (id: number, data: FormData): Promise<Core> => {
  try {
    const response = await axios.patch<Core>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
