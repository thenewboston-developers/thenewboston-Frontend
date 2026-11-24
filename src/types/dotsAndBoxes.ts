import {ComputerReward} from 'types/gameFund';

export type DotsAndBoxesSide = 'blue' | 'red';
export type DotsAndBoxesDifficulty = 'easy' | 'normal' | 'hard';
export type DotsAndBoxesMode = 'computer' | 'human';
export type DotsAndBoxesStatus = 'pending' | 'active' | 'finished' | 'cancelled' | 'declined' | 'expired';
export type DotsAndBoxesBoardSize = 3 | 4 | 5;
/** 0 is open, 1 belongs to blue, 2 belongs to red. */
export type DotsAndBoxesOwner = 0 | 1 | 2;

export interface DotsAndBoxesPlayer {
  id: number;
  username: string;
  avatar: string | null;
}

export interface DotsAndBoxesMatch {
  guest_mode?: boolean;
  guest_session_id?: string | null;
  id: number;
  mode: DotsAndBoxesMode;
  difficulty: DotsAndBoxesDifficulty;
  blue: DotsAndBoxesPlayer;
  red: DotsAndBoxesPlayer | null;
  computer_name: string | null;
  your_side: DotsAndBoxesSide | null;
  status: DotsAndBoxesStatus;
  stake_amount: number;
  prize_pool_total: number;
  version: number;
  board_size: DotsAndBoxesBoardSize;
  time_limit_seconds: number;
  clock_blue_ms: number;
  clock_red_ms: number;
  active_side: DotsAndBoxesSide;
  turn_started_at: string | null;
  expires_at: string | null;
  server_time: string;
  created_date: string;
  finished_at: string | null;
  winner: DotsAndBoxesSide | null;
  result_reason: string;
  rematch_of: number | null;
  /** Owner of every line. Horizontal lines come first, row by row, then vertical lines. */
  lines: DotsAndBoxesOwner[];
  /** Owner of every box, row by row from the top left. */
  boxes: DotsAndBoxesOwner[];
  /** Line numbers in the order they were drawn. */
  moves: number[];
  score_blue: number;
  score_red: number;
  computer_reward?: ComputerReward | null;
}

export interface CreateDotsAndBoxesMatch {
  request_id: string;
  board_size: DotsAndBoxesBoardSize;
  difficulty: DotsAndBoxesDifficulty;
  mode: DotsAndBoxesMode;
  opponent_id?: number;
  stake_amount: number;
  time_limit_seconds: number;
}

export interface DotsAndBoxesPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: DotsAndBoxesMatch[];
}

export type DotsAndBoxesAction = 'accept' | 'cancel' | 'decline' | 'move' | 'rematch' | 'resign';

export interface DotsAndBoxesActionData {
  line?: number;
}

export interface DotsAndBoxesState {
  matchesById: Record<number, DotsAndBoxesMatch>;
}
