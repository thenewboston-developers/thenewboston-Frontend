import axios from 'axios';

import {GetTradesParams, Trade} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/trades`;

export const getTrades = async (params?: GetTradesParams): Promise<Trade[]> => {
  try {
    const response = await axios.get<Trade[]>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
