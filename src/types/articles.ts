import {Dict} from 'types/generic';

export interface Article {
  detail: string;
  id: number;
  logo: string;
  title: string;
  type: string;
  data?: object;
}

export type Articles = Dict<Article>;
