import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface CommentReadSerializer extends CreatedModified {
  content: string;
  id: number;
  owner: UserReadSerializer;
  post: number;
  price_amount: number | null;
  price_currency: number | null;
}

export interface CreateCommentRequest {
  content: string;
  post: number;
  price_amount: number | null;
  price_currency: number | null;
}
