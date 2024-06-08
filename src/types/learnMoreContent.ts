import {Dict} from 'types/generic';

export interface LearnMoreContent {
  detail: string;
  id: number;
  logo: string;
  title: string;
  type: string;
  data?: object;
}

export type LearnMoreContents = Dict<LearnMoreContent>;
