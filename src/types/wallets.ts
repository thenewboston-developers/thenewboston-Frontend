import {CreatedModified} from 'types/createdModified';
import {Currency} from 'types/currencies';
import {Dict} from 'types/generic';
import {PaginatedResponse} from 'types/pagination';

export interface Wallet extends CreatedModified {
  balance: number;
  currency: Currency;
  deposit_account_number: string | null;
  deposit_balance: number | null;
  deposit_signing_key: string | null;
  id: number;
  owner: number;
}

export interface UserWallet extends CreatedModified {
  balance: number;
  currency: Currency;
  id: number;
  is_owner: boolean;
  rank: number;
  total_users: number;
}

export type UserWalletsPaginatedResponse = PaginatedResponse<UserWallet>;

export type Wallets = Dict<Wallet>;
