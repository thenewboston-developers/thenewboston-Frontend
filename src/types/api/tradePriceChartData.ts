export interface Candlestick {
  close: number;
  end: string;
  high: number;
  low: number;
  open: number;
  start: string;
  volume: number;
}

export interface TradePriceChartData {
  candlesticks: Candlestick[];
  end_time: string;
  interval_minutes: number;
  primary_currency: number;
  secondary_currency: number;
  start_time: string;
}

export type ChartTimeRange = '1d' | '1w' | '1m' | '3m' | '1y' | 'all';

export interface GetTradePriceChartDataParams {
  asset_pair: number;
  time_range: ChartTimeRange;
}
