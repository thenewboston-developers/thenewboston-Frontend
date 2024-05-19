import {FollowerReadSerializer} from 'types/api/follower';
import {Pagination} from 'types/pagination';

export type Follower = FollowerReadSerializer;

export interface Followers extends Pagination {
  followers: Follower[];
}
