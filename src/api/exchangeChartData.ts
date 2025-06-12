import axios from 'axios';

import {authorizationHeaders} from 'utils/authentication';

export interface ChartDataPoint {
  high: number;
  low: number;
  open: number;
  price: number;
  timestamp: string;
  volume: number;
}

export interface ChartDataResponse {
  data: ChartDataPoint[];
  end_time: string;
  interval_minutes: number;
  start_time: string;
  total_points: number;
}

export type ChartTimeRange = '1d' | '1w' | '1m' | '3m' | 'all';

interface GetChartDataParams {
  asset_pair: number;
  time_range: ChartTimeRange;
}

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
