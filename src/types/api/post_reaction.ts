import {UserReadSerializer} from 'types/api/users';

export interface PostReactionSerializer {
  reaction: string;
  user: UserReadSerializer;
}
