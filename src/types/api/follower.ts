import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface CreateFollowerRequest {
  following: number;
}

export interface FollowerReadSerializer extends CreatedModified {
  follower: UserReadSerializer;
  following: UserReadSerializer;
  id: number;
  self_following: boolean;
}
