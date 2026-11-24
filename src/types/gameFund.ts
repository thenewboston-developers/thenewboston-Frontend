export interface GameFund {
  balance: number;
  currency: 'TNB';
  reward_amount: number;
  wins_remaining: number;
  total_deposited: number;
  total_paid: number;
  enabled: boolean;
  available: boolean;
}

export interface GameFundDeposit {
  id: number;
  amount: number;
  currency: 'TNB';
  fund: GameFund;
}

export interface ComputerReward {
  status: 'paid' | 'fund_empty' | 'not_eligible' | 'guest';
  amount: number;
  currency: 'TNB';
}
