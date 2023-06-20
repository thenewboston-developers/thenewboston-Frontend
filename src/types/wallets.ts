import {Core} from 'types/cores';
import {Dict} from 'types/generic';

export interface Wallet {
  balance: number;
  core: Core;
  id: number;
  owner: number;
}

export type Wallets = Dict<Wallet>;
