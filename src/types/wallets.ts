import {Core} from 'types/cores';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Wallet extends CreatedModified {
  balance: number;
  core: Core;
  deposit_account_number: string;
  deposit_balance: number;
  id: number;
  owner: number;
}

export type Wallets = Dict<Wallet>;
