export type CasinoGameId = 'slots' | 'roulette' | 'blackjack' | 'plinko' | 'let_it_ride' | 'video_poker';

export type BlackjackAction = 'hit' | 'stand' | 'double';

export interface BlackjackResult {
  actions?: BlackjackAction[];
  available_actions: BlackjackAction[];
  dealer_cards: (string | null)[];
  dealer_total: number;
  doubled?: boolean;
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

export type LetItRideAction = 'ride' | 'pull';

export type LetItRideHand =
  | 'royal_flush'
  | 'straight_flush'
  | 'four_of_a_kind'
  | 'full_house'
  | 'flush'
  | 'straight'
  | 'three_of_a_kind'
  | 'two_pair'
  | 'tens_or_better'
  | 'no_win';

export interface LetItRideResult {
  available_actions: LetItRideAction[];
  cards: string[];
  // A community card is null until the decision before it has been made
  community: (string | null)[];
  decisions: LetItRideAction[];
  expires_at: string | null;
  hand: LetItRideHand | null;
  odds: number | null;
  phase: 'first' | 'second' | 'settled';
  revision: number;
  riding: number;
}

export interface LetItRideActionRequest {
  action: LetItRideAction;
  action_id: string;
  expected_revision: number;
}

export type VideoPokerCategory =
  | 'royal_flush'
  | 'straight_flush'
  | 'four_of_a_kind'
  | 'full_house'
  | 'flush'
  | 'straight'
  | 'three_of_a_kind'
  | 'two_pair'
  | 'jacks_or_better'
  | 'nothing';

export interface VideoPokerResult {
  // One entry once drawn: `draw:10110` holds the first, third and fourth dealt cards.
  actions?: string[];
  available_actions: string[];
  category: VideoPokerCategory;
  dealt: string[];
  expires_at: string | null;
  // The five cards on screen: the dealt ones until the draw, the final ones after it
  hand: string[];
  held: boolean[] | null;
  phase: 'draw' | 'settled';
  revision: number;
}

// What any interactive game sends to the actions endpoint; each game narrows `action`
export interface CasinoActionRequest {
  action: string;
  action_id: string;
  expected_revision: number;
}

// The fields every interactive game's result has; each game narrows them
interface InteractiveResult {
  available_actions: string[];
  expires_at: string | null;
  phase: string;
  revision: number;
}

// Result fields that several games use for different things; the shared shape only says what they may hold
type SharedResultKey = keyof InteractiveResult | 'actions' | 'hand';

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
  bet_increment?: number;
  bet_types?: {id: string; label: string; max_bet: number; multiplier: number}[];
  bets?: number;
  enabled: boolean;
  house_edge: number | null;
  house_edge_per_bet?: number;
  id: CasinoGameId;
  max_bet: number;
  max_multiplier: number;
  min_bet: number;
  // Roulette rules version 2: one spin settles chips on several spots
  multiple_bets?: boolean;
  name: string;
  // Video Poker: the return of perfect play, and total returns (wager included) for each paying hand
  optimal_return?: number;
  pay_table?: {hand: VideoPokerCategory; multiplier: number; name: string}[];
  payout_table?: {multiplier: number; probability: number; slot?: number}[];
  paytable?: {hand: string; odds: number}[];
  rows?: number;
  rules_version: number;
  timeout_seconds?: number;
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
  result: Partial<Omit<BlackjackResult, SharedResultKey>> &
    Partial<Omit<LetItRideResult, SharedResultKey>> &
    Partial<Omit<VideoPokerResult, SharedResultKey>> &
    Partial<InteractiveResult> & {
      actions?: string[];
      color?: string;
      draw?: number;
      // Let It Ride names the final poker hand here; Video Poker lists its five cards
      hand?: LetItRideHand | string[] | null;
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
  settlement_reason?: string;
  status: 'open' | 'settled';
  total_stake: number;
  wallet_balance: number;
  wallet_modified_date?: string;
}

export type BlackjackBet = CasinoBet & {result: BlackjackResult};

export type LetItRideBet = CasinoBet & {result: LetItRideResult};

export type VideoPokerBet = CasinoBet & {result: VideoPokerResult};

export interface CasinoFundMovement {
  amount: number;
  fund: CasinoFund;
  id: number;
  kind: string;
  wallet_balance: number;
}
