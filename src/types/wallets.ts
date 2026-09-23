import {Currency} from 'types/currencies';
import {Dict} from 'types/generic';

export interface Wallet {
  balance: number;
  created_date: string;
  currency: Currency;
  deposit_account_number: string | null;
  deposit_balance: number | null;
  deposit_signing_key: string | null;
  id: number;
  modified_date: string;
  owner: number;
}

export type Wallets = Dict<Wallet>;
