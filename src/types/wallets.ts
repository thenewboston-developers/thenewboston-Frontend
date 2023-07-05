import {Core} from 'types/cores';
import {Dict} from 'types/generic';

export interface Wallet {
  balance: number;
  core: Core;
  created_date: string;
  deposit_account_number: string;
  deposit_balance: number;
  id: number;
  modified_date: string;
  owner: number;
}

export type Wallets = Dict<Wallet>;
