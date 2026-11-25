import {NotificationType} from 'enums';
import {Notification} from 'types';
import {NotificationPayload} from 'types/notifications';
import {getPostDetailPath} from 'utils/urls';

const MATCH_PATHS: {[type: string]: string} = {
  [NotificationType.BACKGAMMON_CHALLENGE]: '/backgammon/matches',
  [NotificationType.BATTLESHIP_CHALLENGE]: '/battleship/matches',
  [NotificationType.CHECKERS_CHALLENGE]: '/checkers/matches',
  [NotificationType.DOTS_AND_BOXES_CHALLENGE]: '/dots-and-boxes/matches',
  [NotificationType.HEX_CHALLENGE]: '/hex/matches',
  [NotificationType.MANCALA_CHALLENGE]: '/mancala/matches',
  [NotificationType.REVERSI_CHALLENGE]: '/reversi/matches',
};

/**
 * Returns the path a notification opens: the comment on its post, the match, the profile and so on.
 */
export const getNotificationPath = (payload: NotificationPayload): string | null => {
  switch (payload.notification_type) {
    case NotificationType.BACKGAMMON_CHALLENGE:
    case NotificationType.BATTLESHIP_CHALLENGE:
    case NotificationType.CHECKERS_CHALLENGE:
    case NotificationType.DOTS_AND_BOXES_CHALLENGE:
    case NotificationType.HEX_CHALLENGE:
    case NotificationType.MANCALA_CHALLENGE:
    case NotificationType.REVERSI_CHALLENGE:
      return `${MATCH_PATHS[payload.notification_type]}/${payload.match_id}`;
    case NotificationType.COMMENT_MENTION:
      return getPostDetailPath(payload.post_id, payload.comment_id ?? payload.comment?.id);
    case NotificationType.CONNECT_FIVE_CHALLENGE:
      return payload.challenge_id ? `/connect-five/challenges/${payload.challenge_id}` : '/connect-five/home';
    case NotificationType.EXCHANGE_ORDER_FILLED:
      return '/exchange/orders';
    case NotificationType.POST_COMMENT:
      return getPostDetailPath(payload.post_id, typeof payload.comment === 'object' ? payload.comment?.id : null);
    case NotificationType.POST_COIN_TRANSFER:
    case NotificationType.POST_LIKE:
    case NotificationType.POST_MENTION:
      return getPostDetailPath(payload.post_id);
    case NotificationType.PROFILE_FOLLOW:
      return `/profile/${payload.follower.id}`;
    default:
      return null;
  }
};

/**
 * Returns the count of unread notifications.
 */
export const getUnreadNotificationsCount = (notifications: Notification[]) => {
  return notifications?.filter((notification) => !notification.is_read).length || 0;
};
