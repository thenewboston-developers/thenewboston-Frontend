import {ComputerReward} from 'types/gameFund';

export type BackgammonSide = 'white' | 'black';
export type BackgammonDifficulty = 'easy' | 'normal' | 'hard';
export type BackgammonMode = 'computer' | 'human';
export type BackgammonStatus =
  | 'pending'
  | 'active'
  | 'between_games'
  | 'finished'
  | 'cancelled'
  | 'declined'
  | 'expired';

export interface BackgammonBoard {
  points: number[];
  bar: Record<BackgammonSide, number>;
  off: Record<BackgammonSide, number>;
}

export interface BackgammonMove {
  from: number | 'bar';
  to: number | 'off';
  die: number;
}

export interface BackgammonPlayer {
  id: number;
  username: string;
  avatar: string | null;
}

export interface BackgammonMatch {
  guest_mode?: boolean;
  guest_session_id?: string | null;
  your_side?: BackgammonSide | null;
  computer_reward?: ComputerReward | null;
  id: number;
  mode: BackgammonMode;
  difficulty: BackgammonDifficulty;
  white: BackgammonPlayer;
  black: BackgammonPlayer | null;
  computer_name: string | null;
  status: BackgammonStatus;
  phase: 'awaiting_roll' | 'moving' | 'doubling' | 'game_over' | 'finished';
  stake_amount: number;
  prize_pool_total: number;
  target_score: number;
  scores: Record<BackgammonSide, number>;
  game_number: number;
  board: BackgammonBoard;
  active_side: BackgammonSide;
  dice: number[];
  cube_value: number;
  cube_owner: BackgammonSide | null;
  double_offered_by: BackgammonSide | null;
  is_crawford: boolean;
  crawford_used: boolean;
  version: number;
  clock_white_ms: number;
  clock_black_ms: number;
  clock_side: BackgammonSide | null;
  next_game_at: string | null;
  turn_started_at: string | null;
  server_time: string;
  expires_at: string | null;
  winner: BackgammonSide | null;
  game_winner: BackgammonSide | null;
  result_points: number;
  result_reason: string;
  legal_turns: BackgammonMove[][];
  last_turn?: {
    version: number;
    side: BackgammonSide;
    dice: number[];
    moves: BackgammonMove[];
  } | null;
  can_double: boolean;
  created_date: string;
  finished_at: string | null;
  time_limit_seconds: number;
}

export interface CreateBackgammonMatch {
  request_id: string;
  difficulty: BackgammonDifficulty;
  mode: BackgammonMode;
  opponent_id?: number;
  stake_amount: number;
  target_score: number;
  time_limit_seconds: number;
}

export interface BackgammonPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: BackgammonMatch[];
}

export type BackgammonAction =
  | 'accept'
  | 'cancel'
  | 'decline'
  | 'double'
  | 'move'
  | 'next-game'
  | 'rematch'
  | 'resign'
  | 'respond-double'
  | 'roll';

export interface BackgammonState {
  matchesById: Record<number, BackgammonMatch>;
}
