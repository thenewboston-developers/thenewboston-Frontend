import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Currency extends CreatedModified {
  domain: string;
  id: number;
  logo: string | null;
  owner: number;
  ticker: string;
}

export type Currencies = Dict<Currency>;
