import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Post extends CreatedModified {
  content: string;
  id: number;
  image: string | null;
  owner: UserReadSerializer;
}

export type Posts = Dict<Post>;
