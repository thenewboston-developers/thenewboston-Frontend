export type CasinoGameId = 'slots' | 'roulette';

export interface CasinoFund {
  available: number;
  balance: number;
  currency: 'TNB';
  enabled: boolean;
  reserved: number;
  risk_limit_bps: number;
}

export interface RouletteSelection {
  type: string;
  value?: number;
}

export interface CasinoGame {
  available: boolean;
  bet_types?: {id: string; label: string; max_bet: number; multiplier: number}[];
  enabled: boolean;
  house_edge: number;
  id: CasinoGameId;
  max_bet: number;
  max_multiplier: number;
  min_bet: number;
  name: string;
  payout_table?: {multiplier: number; probability: number}[];
  rules_version: number;
}

export interface CasinoSummary {
  can_manage: boolean;
  fund: CasinoFund;
  games: CasinoGame[];
}

export interface CasinoCommitment {
  algorithm: string;
  expires_at: string;
  id: string;
  server_seed_hash: string;
}

export interface PlaceCasinoBet {
  amount: number;
  client_seed: string;
  commitment_id: string;
  game: CasinoGameId;
  request_id: string;
  rules_version: number;
  selection?: RouletteSelection;
}

export interface CasinoBet {
  amount: number;
  created_at: string;
  fairness: {
    algorithm: string;
    client_seed: string;
    commitment_id: string;
    server_seed: string;
    server_seed_hash: string;
  };
  fund: CasinoFund;
  game: CasinoGameId;
  id: number;
  payout: number;
  profit: number;
  request_id: string;
  result: {color?: string; draw?: number; multiplier: number; number?: number; symbols?: string[]};
  rules_version: number;
  selection?: RouletteSelection;
  settled_at: string;
  status: 'open' | 'settled';
  total_stake: number;
  wallet_balance: number;
}

export interface CasinoFundMovement {
  amount: number;
  fund: CasinoFund;
  id: number;
  kind: string;
  wallet_balance: number;
}
