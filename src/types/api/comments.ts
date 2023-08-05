import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface CommentReadSerializer extends CreatedModified {
  content: string;
  id: number;
  owner: UserReadSerializer;
  post: number;
}
