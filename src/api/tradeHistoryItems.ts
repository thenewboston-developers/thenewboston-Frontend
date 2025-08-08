import axios from 'axios';

import {TradeHistoryItemsResponse} from 'types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/trade-history-items`;

export const getTradeHistoryItems = async (ordering: string): Promise<TradeHistoryItemsResponse> => {
  try {
    const response = await axios.get<TradeHistoryItemsResponse>(BASE_URL, {params: {ordering}});
    return response.data;
  } catch (error) {
    throw error;
  }
};
