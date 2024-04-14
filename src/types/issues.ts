import {CreatedModified} from 'types/createdModified';

export interface Issue extends CreatedModified {
  id: number;
  issue_number: number;
  repo: number;
  title: string;
}
