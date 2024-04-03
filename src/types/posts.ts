import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Pagination} from 'types/pagination';

export interface Post extends CreatedModified {
  content: string;
  id: number;
  image: string | null;
  owner: UserReadSerializer;
}

export interface Posts extends Pagination {
  posts: Post[];
}
