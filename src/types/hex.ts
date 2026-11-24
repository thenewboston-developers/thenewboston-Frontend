import {ComputerReward} from 'types/gameFund';

export type HexBoardSize = 7 | 9 | 11 | 13;
export type HexDifficulty = 'easy' | 'normal' | 'hard';
export type HexMode = 'computer' | 'human';
export type HexSide = 'red' | 'blue';
export type HexStatus = 'pending' | 'active' | 'finished' | 'cancelled' | 'declined' | 'expired';
// 0 is an empty cell, 1 a red stone and 2 a blue stone.
export type HexStone = 0 | 1 | 2;

export interface HexPlayer {
  id: number;
  username: string;
  avatar: string | null;
}

export interface HexLastMove {
  side: HexSide;
  cell: number;
  swap: boolean;
  from?: number;
}

export interface HexMatch {
  guest_mode?: boolean;
  guest_session_id?: string | null;
  id: number;
  mode: HexMode;
  difficulty: HexDifficulty;
  red: HexPlayer;
  blue: HexPlayer | null;
  computer_name: string | null;
  your_side: HexSide | null;
  status: HexStatus;
  stake_amount: number;
  prize_pool_total: number;
  version: number;
  board_size: HexBoardSize;
  time_limit_seconds: number;
  clock_red_ms: number;
  clock_blue_ms: number;
  active_side: HexSide | null;
  turn_started_at: string | null;
  expires_at: string | null;
  server_time: string;
  created_date: string;
  finished_at: string | null;
  winner: HexSide | null;
  result_reason: string;
  rematch_of: number | null;
  board: HexStone[];
  move_count: number;
  last_move: HexLastMove | null;
  can_swap: boolean;
  winning_path: number[] | null;
  computer_reward?: ComputerReward | null;
}

export interface CreateHexMatch {
  request_id: string;
  board_size: HexBoardSize;
  difficulty: HexDifficulty;
  mode: HexMode;
  opponent_id?: number;
  stake_amount: number;
  time_limit_seconds: number;
}

export interface HexPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: HexMatch[];
}

export type HexAction = 'accept' | 'cancel' | 'decline' | 'move' | 'rematch' | 'resign' | 'swap';
export interface HexActionData {
  cell?: number;
}
export interface HexState {
  matchesById: Record<number, HexMatch>;
}
