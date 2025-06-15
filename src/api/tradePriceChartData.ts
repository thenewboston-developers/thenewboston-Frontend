import axios from 'axios';

import {GetTradePriceChartDataParams, TradePriceChartData} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/trade-price-chart-data`;

export const getTradePriceChartData = async (params: GetTradePriceChartDataParams): Promise<TradePriceChartData> => {
  try {
    const response = await axios.get<TradePriceChartData>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
