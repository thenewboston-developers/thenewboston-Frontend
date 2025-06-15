import axios from 'axios';

import {GetMintChartDataParams, MintChartDataResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/mint-chart-data`;

export const getMintChartData = async (params: GetMintChartDataParams): Promise<MintChartDataResponse> => {
  try {
    const response = await axios.get<MintChartDataResponse>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
