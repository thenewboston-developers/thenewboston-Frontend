import {CreatedModified} from 'types/createdModified';

export interface Repo extends CreatedModified {
  id: number;
  name: string;
  owner_name: string;
}
