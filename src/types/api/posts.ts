import {CommentReadSerializer} from 'types/api/comments';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface PostReadSerializer extends CreatedModified {
  comments?: CommentReadSerializer[];
  content: string;
  id: number;
  image: string | null;
  owner: UserReadSerializer;
}
