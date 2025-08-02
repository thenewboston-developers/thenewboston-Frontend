export interface CurrencyTinySerializer {
  id: number;
  logo: string | null;
  ticker: string;
}

export interface AssetPairTinySerializer {
  id: number;
  primary_currency: CurrencyTinySerializer;
  secondary_currency: CurrencyTinySerializer;
}

export interface TradeHistoryItem {
  asset_pair: AssetPairTinySerializer;
  change_1h: number;
  change_24h: number;
  change_7d: number;
  market_cap: number;
  price: number;
  sparkline: number[];
  volume_24h: number;
}

export interface TradeHistoryItemsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TradeHistoryItem[];
}
