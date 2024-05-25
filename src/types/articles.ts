import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Article extends CreatedModified {
  detail: string;
  id: number;
  logo: string | null;
  ticker: string;
}

export type Articles = Dict<Article>;
