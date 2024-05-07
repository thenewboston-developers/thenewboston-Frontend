import {Notification} from 'types';

/**
 * Returns the count of unread notifications.
 */
export const getUnreadNotificationsCount = (notifications: Notification[]) => {
  return notifications?.filter((notification) => !notification.is_read).length || 0;
};
