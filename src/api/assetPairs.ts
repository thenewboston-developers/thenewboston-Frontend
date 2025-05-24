import axios from 'axios';

import {AssetPair} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/asset_pairs`;

export const getAssetPairs = async (): Promise<AssetPair[]> => {
  try {
    const response = await axios.get<AssetPair[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
