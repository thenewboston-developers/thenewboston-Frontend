import {CommentReadSerializer, PostReactionSerializer, UserReadSerializer} from 'types';
import {CreatedModified} from 'types/createdModified';

export interface PostReadSerializer extends CreatedModified {
  comments?: CommentReadSerializer[];
  content: string;
  id: number;
  image: string | null;
  owner: UserReadSerializer;
  price_amount: number | null;
  price_currency: number | null;
  recipient: UserReadSerializer | null;
  user_reaction: string;
  user_reactions: PostReactionSerializer[];
}

export interface GetPostsParams {
  owner?: number;
}
