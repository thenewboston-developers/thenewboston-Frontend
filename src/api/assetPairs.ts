import axios from 'axios';

import {AssetPair} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/asset-pairs`;

export const getAssetPairs = async (params?: {
  primary_currency_ticker?: string;
  secondary_currency_ticker?: string;
}): Promise<AssetPair[]> => {
  try {
    const response = await axios.get<AssetPair[]>(BASE_URL, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
