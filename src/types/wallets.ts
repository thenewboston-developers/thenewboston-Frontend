import {Currency} from 'types/currencies';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Wallet extends CreatedModified {
  balance: number;
  currency: Currency;
  deposit_account_number: string;
  deposit_balance: number;
  id: number;
  owner: number;
}

export type Wallets = Dict<Wallet>;
