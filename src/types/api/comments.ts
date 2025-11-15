import {CurrencyTinySerializer} from 'types/api/tradeHistory';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface CommentReadSerializer extends CreatedModified {
  content: string;
  id: number;
  mentioned_users: UserReadSerializer[];
  owner: UserReadSerializer;
  post: number;
  price_amount: number | null;
  price_currency: CurrencyTinySerializer | null;
}

export interface CreateCommentRequest {
  content: string;
  mentioned_user_ids?: number[];
  post: number;
  price_amount: number | null;
  price_currency: number | null;
}
