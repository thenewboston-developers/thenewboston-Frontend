import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Currency} from 'types/currencies';
import {Pagination} from 'types/pagination';

export interface TipAmount {
  currency: Currency;
  total_amount: number;
}

export interface Post extends CreatedModified {
  content: string;
  id: number;
  image: string | null;
  is_liked: boolean;
  like_count: number;
  owner: UserReadSerializer;
  price_amount: number | null;
  price_currency: number | null;
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
