export interface CurrencyTinySerializer {
  id: number;
  logo: string;
  ticker: string;
}

export interface TradeHistoryItem {
  change_1h: number;
  change_24h: number;
  change_7d: number;
  market_cap: number;
  price: number;
  primary_currency: CurrencyTinySerializer;
  secondary_currency: CurrencyTinySerializer;
  sparkline: number[];
  volume_24h: number;
}

export interface TradeHistoryItemsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TradeHistoryItem[];
}
