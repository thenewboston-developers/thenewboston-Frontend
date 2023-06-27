import axios from 'axios';

import {Trade} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/trades`;

export interface GetTradesParams {
  buy_order?: number;
  sell_order?: number;
}

export const getTrades = async (params?: GetTradesParams): Promise<Trade[]> => {
  try {
    const response = await axios.get<Trade[]>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
