import {ComputerReward} from 'types/gameFund';

export type CheckersSide = 'white' | 'black';
export type CheckersDifficulty = 'easy' | 'normal' | 'hard';
export type CheckersMode = 'computer' | 'human';
export type CheckersStatus = 'pending' | 'active' | 'finished' | 'cancelled' | 'declined' | 'expired';
export type CheckersPiece = -2 | -1 | 0 | 1 | 2;

export interface CheckersPlayer {
  id: number;
  username: string;
  avatar: string | null;
}

export interface CheckersMatch {
  id: number;
  mode: CheckersMode;
  difficulty: CheckersDifficulty;
  white: CheckersPlayer;
  black: CheckersPlayer | null;
  computer_name: string | null;
  your_side: CheckersSide | null;
  status: CheckersStatus;
  stake_amount: number;
  prize_pool_total: number;
  version: number;
  time_limit_seconds: number;
  clock_white_ms: number;
  clock_black_ms: number;
  active_side: CheckersSide | null;
  turn_started_at: string | null;
  expires_at: string | null;
  server_time: string;
  created_date: string;
  finished_at: string | null;
  winner: CheckersSide | null;
  result_reason: string;
  rematch_of: number | null;
  board: CheckersPiece[];
  legal_moves: number[][];
  last_move: {side: CheckersSide; path: number[]; captured: number[]} | null;
  computer_reward?: ComputerReward | null;
}

export interface CreateCheckersMatch {
  request_id: string;
  difficulty: CheckersDifficulty;
  mode: CheckersMode;
  opponent_id?: number;
  stake_amount: number;
  time_limit_seconds: number;
}

export interface CheckersPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: CheckersMatch[];
}

export type CheckersAction = 'accept' | 'cancel' | 'decline' | 'move' | 'rematch' | 'resign';
export interface CheckersActionData {
  path?: number[];
}
export interface CheckersState {
  matchesById: Record<number, CheckersMatch>;
}
