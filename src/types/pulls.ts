import {CreatedModified} from 'types/createdModified';

export interface Pull extends CreatedModified {
  id: number;
  issue_id: number;
  repo: number;
  title: string;
  assessment_explanation: string;
}
