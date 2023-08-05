import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Comment extends CreatedModified {
  content: string;
  id: number;
  owner: UserReadSerializer;
  post: number;
}

export type Comments = Dict<Comment>;
