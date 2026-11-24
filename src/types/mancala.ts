import {ComputerReward} from 'types/gameFund';

export type MancalaSide = 'host' | 'guest';
export type MancalaDifficulty = 'easy' | 'normal' | 'hard';
export type MancalaMode = 'computer' | 'human';
export type MancalaStatus = 'pending' | 'active' | 'finished' | 'cancelled' | 'declined' | 'expired';

/**
 * Fourteen stone counts in sowing order: 0-5 are the host's pits, 6 the host's store, 7-12 the guest's pits and 13 the
 * guest's store.
 */
export type MancalaBoard = number[];

export interface MancalaPlayer {
  id: number;
  username: string;
  avatar: string | null;
}

export interface MancalaMove {
  side: MancalaSide;
  // The mover's own pit, 0-5 in sowing order: pit 5 is next to their store
  pit: number;
  stones: number;
  // Board index that received the last stone
  last: number;
  captured: number;
  extra_turn: boolean;
  // Stones each row gave up to its owner when the game ended
  swept: Record<MancalaSide, number> | null;
}

export interface MancalaRecentMove extends MancalaMove {
  board: MancalaBoard;
  version: number;
}

export interface MancalaMatch {
  id: number;
  mode: MancalaMode;
  // A signed-out visitor's computer game. It belongs to a guest session, not an account, and is private to it.
  guest_mode?: boolean;
  guest_session_id?: string | null;
  difficulty: MancalaDifficulty;
  computer_reward?: ComputerReward | null;
  host: MancalaPlayer;
  guest: MancalaPlayer | null;
  computer_name: string | null;
  your_side: MancalaSide | null;
  status: MancalaStatus;
  stake_amount: number;
  prize_pool_total: number;
  version: number;
  board: MancalaBoard;
  active_side: MancalaSide | null;
  time_limit_seconds: number;
  clock_host_ms: number;
  clock_guest_ms: number;
  turn_started_at: string | null;
  expires_at: string | null;
  server_time: string;
  created_date: string;
  finished_at: string | null;
  // A finished match without a winner is a draw
  winner: MancalaSide | null;
  result_reason: string;
  last_move: MancalaMove | null;
  // Only on a single match, never in lists
  recent_moves?: MancalaRecentMove[];
  rematch_of: number | null;
}

export interface CreateMancalaMatch {
  request_id: string;
  difficulty: MancalaDifficulty;
  mode: MancalaMode;
  opponent_id?: number;
  stake_amount: number;
  time_limit_seconds: number;
}

export interface MancalaPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: MancalaMatch[];
}

export type MancalaAction = 'accept' | 'cancel' | 'decline' | 'move' | 'rematch' | 'resign';

export interface MancalaState {
  matchesById: Record<number, MancalaMatch>;
}
