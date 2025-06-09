import {UserReadSerializer} from 'types/api/users';
import {PaginatedResponse} from 'types/pagination';

export interface Transfer {
  amount: number;
  comment_id: number | null;
  content: string;
  counterparty: UserReadSerializer;
  currency: number;
  post_id: number | null;
  timestamp: string;
}

export type TransfersResponse = PaginatedResponse<Transfer>;
