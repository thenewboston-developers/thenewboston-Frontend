import axios from 'axios';

import {TradeHistoryItemsResponse} from 'types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/trade-history-items`;

export const getTradeHistoryItems = async (ordering?: string): Promise<TradeHistoryItemsResponse> => {
  try {
    const params = ordering ? {ordering} : undefined;
    const response = await axios.get<TradeHistoryItemsResponse>(BASE_URL, {params});
    return response.data;
  } catch (error) {
    throw error;
  }
};
