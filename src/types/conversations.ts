import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Conversation extends CreatedModified {
  id: number;
  name: string;
  owner: UserReadSerializer;
}

export type Conversations = Dict<Conversation>;
