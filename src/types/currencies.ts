import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Currency extends CreatedModified {
  description: string | null;
  domain: string | null;
  id: number;
  logo: string;
  owner: UserReadSerializer;
  ticker: string;
}

export type Currencies = Dict<Currency>;
