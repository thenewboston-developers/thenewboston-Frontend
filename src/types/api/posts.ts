import {CommentReadSerializer, UserReadSerializer} from 'types';
import {CreatedModified} from 'types/createdModified';

export interface PostReadSerializer extends CreatedModified {
  comments?: CommentReadSerializer[];
  content: string;
  id: number;
  image: string | null;
  is_liked: boolean;
  like_count: number;
  owner: UserReadSerializer;
  price_amount: number | null;
  price_currency: number | null;
  recipient: UserReadSerializer | null;
}

export interface GetPostsParams {
  owner?: number;
  user?: number;
}
