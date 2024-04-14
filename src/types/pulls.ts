import {CreatedModified} from 'types/createdModified';

export interface Pull extends CreatedModified {
  id: number;
  issue_number: number;
  repo: number;
  title: string;
  assessment_explanation: string;
}
