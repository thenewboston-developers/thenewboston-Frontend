import {ComputerReward} from 'types/gameFund';

export type ReversiSide = 'black' | 'white';
export type ReversiColorChoice = ReversiSide | 'random';
export type ReversiDifficulty = 'easy' | 'normal' | 'hard';
export type ReversiMode = 'computer' | 'human';
export type ReversiStatus = 'pending' | 'active' | 'finished' | 'cancelled' | 'declined' | 'expired';
// [row, column], both zero-based from the top-left corner
export type ReversiSquare = [number, number];

export interface ReversiPlayer {
  id: number;
  username: string;
  avatar: string | null;
}

export interface ReversiLastMove {
  side: ReversiSide;
  row: number;
  column: number;
  flipped: ReversiSquare[];
  // The side that had no legal reply and was skipped, if any
  passed: ReversiSide | null;
}

export interface ReversiMatch {
  computer_reward?: ComputerReward | null;
  // A guest game belongs to a signed-out visitor's session and is private to it
  guest_mode?: boolean;
  guest_session_id?: string | null;
  // The requester's color, or null for a spectator
  your_side?: ReversiSide | null;
  id: number;
  mode: ReversiMode;
  difficulty: ReversiDifficulty;
  // A missing player is the computer
  black: ReversiPlayer | null;
  white: ReversiPlayer | null;
  computer_name: string | null;
  // The color of the member who created the match
  host_side: ReversiSide;
  status: ReversiStatus;
  stake_amount: number;
  prize_pool_total: number;
  // Eight rows of eight characters: '.' empty, 'b' black, 'w' white
  board: string[];
  scores: Record<ReversiSide, number>;
  // Only sent with a single match, not with lobby lists
  legal_moves?: ReversiSquare[];
  active_side: ReversiSide | null;
  last_move: ReversiLastMove | null;
  move_count: number;
  version: number;
  time_limit_seconds: number;
  clock_black_ms: number;
  clock_white_ms: number;
  turn_started_at: string | null;
  expires_at: string | null;
  server_time: string;
  created_date: string;
  finished_at: string | null;
  winner: ReversiSide | null;
  result_reason: string;
  rematch_of: number | null;
}

export interface CreateReversiMatch {
  request_id: string;
  color: ReversiColorChoice;
  difficulty: ReversiDifficulty;
  mode: ReversiMode;
  opponent_id?: number;
  stake_amount: number;
  time_limit_seconds: number;
}

export interface ReversiPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReversiMatch[];
}

export type ReversiAction = 'accept' | 'cancel' | 'decline' | 'move' | 'rematch' | 'resign';

export interface ReversiState {
  matchesById: Record<number, ReversiMatch>;
}
