export type RewardGame =
  | 'backgammon'
  | 'battleship'
  | 'checkers'
  | 'connect_five'
  | 'dots_and_boxes'
  | 'hex'
  | 'mancala'
  | 'reversi';

export interface GameEarningsEntry {
  rank: number;
  rewarded_wins: number;
  total_earned: number;
  user: {avatar: string | null; id: number; username: string};
}

export interface GameEarningsPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: GameEarningsEntry[];
}
