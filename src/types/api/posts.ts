import {CommentReadSerializer} from 'types/api/comments';
import {PostReactionSerializer} from 'types/api/post_reaction';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface PostReadSerializer extends CreatedModified {
  comments?: CommentReadSerializer[];
  content: string;
  id: number;
  image: string | null;
  owner: UserReadSerializer;
  user_reaction: string;
  user_reactions: PostReactionSerializer[];
}
