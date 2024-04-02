import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {ExtendedPaginatedResponse} from 'types/pagination';
import {Dict} from 'types/generic';

export interface Post extends CreatedModified {
  content: string;
  id: number;
  image: string | null;
  owner: UserReadSerializer;
}

export type Posts = Dict<Post>;

export interface PostsState {
  post: any; // TODO: Fix this. i.e: Post
  posts: ExtendedPaginatedResponse<Post>;
}
