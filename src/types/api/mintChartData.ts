export interface MintDataPoint {
  amount_minted: number;
  cumulative_total: number;
  timestamp: string;
}

export interface MintChartDataResponse {
  currency: number;
  data_points: MintDataPoint[];
}

export interface GetMintChartDataParams {
  currency: number;
}
