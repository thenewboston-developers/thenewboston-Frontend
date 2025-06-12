export interface ChartDataPoint {
  close: number;
  end: string;
  high: number;
  low: number;
  open: number;
  start: string;
  volume: number;
}

export interface ChartDataResponse {
  data: ChartDataPoint[];
  end_time: string;
  interval_minutes: number;
  primary_currency: number;
  secondary_currency: number;
  start_time: string;
}

export type ChartTimeRange = '1d' | '1w' | '1m' | '3m' | '1y' | 'all';

export interface GetChartDataParams {
  asset_pair: number;
  time_range: ChartTimeRange;
}
