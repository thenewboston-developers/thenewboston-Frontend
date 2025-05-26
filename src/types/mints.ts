import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Mint extends CreatedModified {
  amount: number;
  currency: number;
  id: string;
  owner: number;
}

export type Mints = Dict<Mint>;
