import {CreatedModified} from 'types/createdModified';
import {Currency} from 'types/currencies';

export interface UserWallet extends CreatedModified {
  balance: number;
  currency: Currency;
  id: number;
  is_owner: boolean;
  rank: number;
  total_users: number;
}
