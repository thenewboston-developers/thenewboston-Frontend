import {CurrencyTinySerializer} from 'types/api/tradeHistory';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Currency} from 'types/currencies';
import {Pagination} from 'types/pagination';

export interface TipAmount {
  currency: Currency;
  total_amount: number;
}

export interface PostImage {
  id: number;
  image: string;
}

// An image in the post form: one the post already has (id) or a file that is uploaded when the form is submitted
export interface PostImageDraft {
  file?: File;
  id?: number;
  key: string;
  url: string;
}

export interface PostImageUploadProgress {
  current: number;
  total: number;
}

export interface Post extends CreatedModified {
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

export interface Posts extends Pagination {
  posts: Post[];
}

export interface PostLike extends CreatedModified {
  id: number;
  user: UserReadSerializer;
}
