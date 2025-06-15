import {NotificationType} from 'enums';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';
import {PaginatedResponse, Pagination} from 'types/pagination';

export interface ExchangeOrderFilledPayload {
  notification_type: NotificationType.EXCHANGE_ORDER_FILLED;
  order_id: string;
  order_type: 'BUY' | 'SELL';
  price: number;
  primary_currency_id: string;
  primary_currency_ticker: string;
  quantity: number;
  secondary_currency_id: string;
  secondary_currency_ticker: string;
}

export interface PostCommentPayload {
  comment: string;
  commenter: UserReadSerializer;
  notification_type: NotificationType.POST_COMMENT;
  post_id: number;
}

export interface PostLikePayload {
  liker: UserReadSerializer;
  notification_type: NotificationType.POST_LIKE;
  post_id: number;
}

export type NotificationPayload = ExchangeOrderFilledPayload | PostCommentPayload | PostLikePayload;

export interface Notification extends CreatedModified {
  id: number;
  is_read: boolean;
  owner: number;
  payload: NotificationPayload;
}

export type Notifications = Dict<Notification>;

export interface NotificationsState extends Pagination {
  notifications: Notifications;
  totalUnreadCount: number;
}

export interface NotificationPaginatedResponse extends PaginatedResponse<Notification> {
  unread_count: number;
}
