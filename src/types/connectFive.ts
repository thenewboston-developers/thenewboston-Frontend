import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {PaginatedResponse} from 'types/pagination';

export interface ConnectFiveMatchPlayer {
  inventory_bomb: number;
  inventory_cross4: number;
  inventory_h2: number;
  inventory_v2: number;
  remaining_spend: number;
  spent_total: number;
  user: UserReadSerializer;
}

export interface ConnectFiveMatch extends CreatedModified {
  active_player: UserReadSerializer | null;
  board_state: number[][];
  challenge: number;
  clock_a_remaining_ms: number;
  clock_b_remaining_ms: number;
  finished_at: string | null;
  id: number;
  max_spend_amount: number;
  player_a: UserReadSerializer;
  player_b: UserReadSerializer;
  players: ConnectFiveMatchPlayer[];
  prize_pool_total: number;
  status: string;
  time_limit_seconds: number;
  turn_number: number;
  turn_started_at: string;
  winner: number | null;
}

export interface ConnectFiveChallenge extends CreatedModified {
  accepted_at: string | null;
  challenger: UserReadSerializer;
  currency: number;
  expires_at: string;
  id: number;
  match_id: number | null;
  max_spend_amount: number;
  opponent: UserReadSerializer;
  stake_amount: number;
  status: string;
  time_limit_seconds: number;
}

export interface ConnectFiveChallengePaginatedResponse extends PaginatedResponse<ConnectFiveChallenge> {}

export interface ConnectFiveMatchPaginatedResponse extends PaginatedResponse<ConnectFiveMatch> {}

export interface ConnectFiveState {
  activeMatches: ConnectFiveMatch[];
  challengesById: Record<number, ConnectFiveChallenge>;
  completedMatches: ConnectFiveMatch[];
  incomingChallenges: ConnectFiveChallenge[];
  matchesById: Record<number, ConnectFiveMatch>;
  outgoingChallenges: ConnectFiveChallenge[];
}
