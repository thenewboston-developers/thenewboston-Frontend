import {Dict} from 'types/generic';

export interface Article {
  detail: string;
  id: number;
  logo: string;
  title: string;
  type: string;
  data?: {
    1: string;
    2: string;
    3: string;
    4: string;
  };
}

export type Articles = Dict<Article>;
