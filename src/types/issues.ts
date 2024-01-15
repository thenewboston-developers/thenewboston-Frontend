import {CreatedModified} from 'types/createdModified';

export interface Issue extends CreatedModified {
  id: number;
  issue_id: number;
  repo: number;
  title: string;
}
