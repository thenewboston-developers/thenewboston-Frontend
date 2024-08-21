import {UserReadSerializer} from 'types/api/users';
import {PostReactionSerializer} from 'types/api/post_reaction';
import {CreatedModified} from 'types/createdModified';
import {Pagination} from 'types/pagination';

export interface Post extends CreatedModified {
  content: string;
  id: number;
  image: string | null;
  owner: UserReadSerializer;
  user_reaction: string;
  user_reactions: PostReactionSerializer[];
}

export interface Posts extends Pagination {
  posts: Post[];
}
