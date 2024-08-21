import {PostReactionSerializer, CommentReadSerializer, UserReadSerializer} from 'types';
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
