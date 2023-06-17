import {Dict} from 'types/generic';

export interface Core {
  created_date: string;
  domain: string;
  id: number;
  logo: string | null;
  modified_date: string;
  owner: number;
  ticker: string;
}

export type Cores = Dict<Core>;
