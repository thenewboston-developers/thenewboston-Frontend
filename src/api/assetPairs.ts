import axios from 'axios';

import {AssetPair, PaginatedResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/asset-pairs`;

export const getAssetPair = async (assetPairId: number | string): Promise<AssetPair> => {
  try {
    const response = await axios.get<AssetPair>(`${BASE_URL}/${assetPairId}`, {
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssetPairs = async (params?: {
  primary_currency_ticker?: string;
  secondary_currency_ticker?: string;
  page?: number;
  page_size?: number;
}): Promise<PaginatedResponse<AssetPair>> => {
  try {
    const response = await axios.get<PaginatedResponse<AssetPair>>(BASE_URL, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
