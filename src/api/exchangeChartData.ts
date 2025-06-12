import axios from 'axios';

import {ChartDataResponse, GetChartDataParams} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/chart-data`;

export const getChartData = async (params: GetChartDataParams): Promise<ChartDataResponse> => {
  try {
    const response = await axios.get<ChartDataResponse>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
