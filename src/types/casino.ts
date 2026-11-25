export type CasinoGameId = 'slots' | 'roulette' | 'blackjack' | 'plinko';

export type BlackjackAction = 'hit' | 'stand' | 'double';

export interface BlackjackResult {
  actions?: BlackjackAction[];
  available_actions: BlackjackAction[];
  dealer_cards: (string | null)[];
  dealer_total: number;
  expires_at: string | null;
  multiplier: number;
  outcome: 'blackjack' | 'win' | 'loss' | 'push' | null;
  phase: 'player_turn' | 'settled';
  player_cards: string[];
  player_total: number;
  revision: number;
}

export interface BlackjackActionRequest {
  action: BlackjackAction;
  action_id: string;
  expected_revision: number;
}

export interface CasinoFund {
  available: number;
  balance: number;
  currency: 'TNB';
  enabled: boolean;
  reserved: number;
  risk_limit_bps: number;
}

export interface RouletteBetSelection {
  amount: number;
  type: string;
  value?: number;
}

// Rules version 1 sends one spot (`type`, `value`); version 2 sends the chips on every spot (`bets`)
export interface RouletteSelection {
  bets?: RouletteBetSelection[];
  type?: string;
  value?: number;
}

export interface CasinoGame {
  available: boolean;
  bet_types?: {id: string; label: string; max_bet: number; multiplier: number}[];
  enabled: boolean;
  house_edge: number | null;
  id: CasinoGameId;
  max_bet: number;
  max_multiplier: number;
  min_bet: number;
  // Roulette rules version 2: one spin settles chips on several spots
  multiple_bets?: boolean;
  name: string;
  payout_table?: {multiplier: number; probability: number; slot?: number}[];
  rows?: number;
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
  // Roulette version 2 records the total `payout` of its bets and has no `multiplier`: read that only for the games
  // and versions that settle with one
  result: Partial<BlackjackResult> & {
    color?: string;
    draw?: number;
    multiplier: number;
    number?: number;
    path?: number[];
    payout?: number;
    slot?: number;
    symbols?: string[];
  };
  rules_version: number;
  selection?: RouletteSelection;
  settled_at: string;
  status: 'open' | 'settled';
  total_stake: number;
  wallet_balance: number;
}

export type BlackjackBet = CasinoBet & {result: BlackjackResult};

export interface CasinoFundMovement {
  amount: number;
  fund: CasinoFund;
  id: number;
  kind: string;
  wallet_balance: number;
}
