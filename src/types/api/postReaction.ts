import {UserReadSerializer} from 'types/api/users';

export interface PostReactionSerializer {
  reaction: string;
  user: UserReadSerializer;
}

export interface PostReactionCreateRequest {
  post: number;
  reaction: string;
}
