import {NotificationType} from 'enums';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';
import {PaginatedResponse, Pagination} from 'types/pagination';

export interface ExchangeOrderFilledPayload {
  notification_type: NotificationType.EXCHANGE_ORDER_FILLED;
  order_id: string;
  side: number;
  price: number;
  primary_currency_id: string;
  primary_currency_ticker: string;
  quantity: number;
  secondary_currency_id: string;
  secondary_currency_ticker: string;
}

export interface PostCoinTransferPayload {
  content: string;
  notification_type: NotificationType.POST_COIN_TRANSFER;
  owner: UserReadSerializer;
  post_created: string;
  post_id: number;
  post_image_thumbnail?: string;
  post_preview: string;
  price_amount: number;
  price_currency_id: string;
  price_currency_ticker: string;
}

export interface PostCommentPayload {
  comment: string;
  comment_preview: string;
  commenter: UserReadSerializer;
  notification_type: NotificationType.POST_COMMENT;
  post_created: string;
  post_id: number;
  post_image_thumbnail?: string;
  post_preview: string;
}

export interface PostLikePayload {
  liker: UserReadSerializer;
  notification_type: NotificationType.POST_LIKE;
  post_created: string;
  post_id: number;
  post_image_thumbnail?: string;
  post_preview: string;
}

export type NotificationPayload =
  | ExchangeOrderFilledPayload
  | PostCoinTransferPayload
  | PostCommentPayload
  | PostLikePayload;

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
