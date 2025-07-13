import {UserReadSerializer} from 'types/api/users';

export interface CurrencyBalance {
  owner: UserReadSerializer;
  balance: number;
  rank: number;
  percentage: number;
}
