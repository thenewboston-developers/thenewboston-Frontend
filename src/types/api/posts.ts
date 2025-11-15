import {CommentReadSerializer, CurrencyTinySerializer, TipAmount, UserReadSerializer} from 'types';
import {CreatedModified} from 'types/createdModified';

export interface PostReadSerializer extends CreatedModified {
  comments?: CommentReadSerializer[];
  content: string;
  id: number;
  image: string | null;
  is_liked: boolean;
  like_count: number;
  mentioned_users: UserReadSerializer[];
  owner: UserReadSerializer;
  price_amount: number | null;
  price_currency: CurrencyTinySerializer | null;
  recipient: UserReadSerializer | null;
  tip_amounts: TipAmount[];
}

export interface GetPostsParams {
  owner?: number;
  user?: number;
}
