import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Invitation extends CreatedModified {
  code: string;
  id: number;
  note: string;
  owner: number;
  recipient: UserReadSerializer | null;
}

export type Invitations = Dict<Invitation>;
