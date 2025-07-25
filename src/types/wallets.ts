import {CreatedModified} from 'types/createdModified';
import {Currency} from 'types/currencies';
import {Dict} from 'types/generic';

export interface Wallet extends CreatedModified {
  balance: number;
  currency: Currency;
  deposit_account_number: string | null;
  deposit_balance: number | null;
  deposit_signing_key: string | null;
  id: number;
  owner: number;
}

export type Wallets = Dict<Wallet>;
