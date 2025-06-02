import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface PostLikePayload {
  liker: UserReadSerializer;
  notification_type: 'POST_LIKE';
  post_id: number;
}

export interface PostCommentPayload {
  notification_type: 'POST_COMMENT';
  [key: string]: any;
}

export type NotificationPayload = PostLikePayload | PostCommentPayload;

export interface Notification extends CreatedModified {
  id: number;
  is_read: boolean;
  owner: number;
  payload: NotificationPayload;
}

export type Notifications = Dict<Notification>;
