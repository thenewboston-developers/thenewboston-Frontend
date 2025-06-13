import axios from 'axios';

import {ChartData, GetChartDataParams} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/chart-data`;

export const getChartData = async (params: GetChartDataParams): Promise<ChartData> => {
  try {
    const response = await axios.get<ChartData>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
