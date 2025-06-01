import axios from 'axios';

import {CurrencyBalance, PaginatedResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/currency-balances`;

export interface GetCurrencyBalancesParams {
  currency__id: number;
  page?: number;
  page_size?: number;
}

export const getCurrencyBalances = async (
  params: GetCurrencyBalancesParams,
): Promise<PaginatedResponse<CurrencyBalance>> => {
  try {
    const response = await axios.get<PaginatedResponse<CurrencyBalance>>(BASE_URL, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
