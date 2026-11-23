import {CommentReadSerializer, CurrencyTinySerializer, PostImage, TipAmount, UserReadSerializer} from 'types';
import {CreatedModified} from 'types/createdModified';

export interface CreatePostRequest {
  content: string;
  image_ids?: number[];
  mentioned_user_ids?: number[];
  price_amount?: number | string;
  price_currency?: number;
  recipient?: number;
}

export interface PostReadSerializer extends CreatedModified {
  comments?: CommentReadSerializer[];
  content: string;
  id: number;
  image: string | null;
  images: PostImage[];
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
  has_image?: boolean;
  owner?: number;
  page_size?: number;
  user?: number;
}

export type UpdatePostRequest = Pick<CreatePostRequest, 'content' | 'image_ids' | 'mentioned_user_ids'>;
