import {ComputerReward} from 'types/gameFund';

export type BattleshipSide = 'host' | 'guest';
export type BattleshipDifficulty = 'easy' | 'normal' | 'hard';
export type BattleshipMode = 'computer' | 'human';
export type ShipId = 'carrier' | 'battleship' | 'cruiser' | 'submarine' | 'destroyer';
export type BattleshipStatus = 'pending' | 'active' | 'finished' | 'cancelled' | 'declined' | 'expired';

export interface Cell {
  row: number;
  column: number;
}

export interface Ship extends Cell {
  id: ShipId;
  orientation: 'horizontal' | 'vertical';
}

export interface Shot extends Cell {
  result: 'hit' | 'miss' | 'sunk';
  ship_id?: ShipId;
}

export interface BattleshipPlayer {
  id: number;
  username: string;
  avatar: string | null;
}

export interface BattleshipMatch {
  computer_reward?: ComputerReward | null;
  id: number;
  mode: BattleshipMode;
  difficulty: BattleshipDifficulty;
  host: BattleshipPlayer;
  guest: BattleshipPlayer | null;
  computer_name: string | null;
  your_side: BattleshipSide;
  status: BattleshipStatus;
  phase: 'placing' | 'battle' | 'finished';
  stake_amount: number;
  prize_pool_total: number;
  version: number;
  time_limit_seconds: number;
  clock_host_ms: number;
  clock_guest_ms: number;
  active_side: BattleshipSide | null;
  turn_started_at: string | null;
  placement_deadline: string | null;
  expires_at: string | null;
  server_time: string;
  created_date: string;
  finished_at: string | null;
  winner: BattleshipSide | null;
  result_reason: string;
  rematch_of: number | null;
  host_ready: boolean;
  guest_ready: boolean;
  board: {
    ships: Ship[];
    shots: Shot[];
    incoming_shots: Shot[];
    opponent_sunk_ships: Ship[];
  };
  last_shot: (Shot & {side: BattleshipSide}) | null;
}

export interface CreateBattleshipMatch {
  request_id: string;
  difficulty: BattleshipDifficulty;
  mode: BattleshipMode;
  opponent_id?: number;
  stake_amount: number;
  time_limit_seconds: number;
}

export interface BattleshipPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: BattleshipMatch[];
}

export type BattleshipAction = 'accept' | 'cancel' | 'decline' | 'fire' | 'place' | 'rematch' | 'resign';
export interface BattleshipActionData {
  row?: number;
  column?: number;
  ships?: Ship[];
}
export interface BattleshipState {
  matchesById: Record<number, BattleshipMatch>;
}
