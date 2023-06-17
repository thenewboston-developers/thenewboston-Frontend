import axios from 'axios';

import {Core} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/cores`;

export const createCore = async (data: Partial<Core>): Promise<Core> => {
  try {
    const response = await axios.post<Core>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
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
