import {
  getNotifications as _getNotifications,
  getUnreadCount,
  markAllNotificationsAsRead as _markAllNotificationsAsRead,
  updateNotification as _updateNotification,
} from 'api/notifications';
import {store} from 'store';
import {
  markAllNotificationsAsRead as markAllNotificationsAsReadAction,
  markNotificationAsRead as markNotificationAsReadAction,
  resetNotifications as _resetNotifications,
  setNotifications,
  setTotalUnreadCount,
  startLoading,
} from 'store/notifications';
import {AppDispatch} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {getNextUrlFromState} from 'utils/urls';

export const getNotifications = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  const nextURL = getNextUrlFromState(store.getState().notifications);
  const responseData = await _getNotifications(nextURL);
  dispatch(setNotifications(responseData));
};

export const resetNotifications = () => (dispatch: AppDispatch) => {
  dispatch(_resetNotifications());
};

export const markAllNotificationsAsRead = () => async (dispatch: AppDispatch) => {
  const response = await _markAllNotificationsAsRead();
  dispatch(markAllNotificationsAsReadAction());
  dispatch(setTotalUnreadCount(response.unread_count));
};

export const updateNotification = (notificationId: number) => async (dispatch: AppDispatch) => {
  dispatch(markNotificationAsReadAction(notificationId));

  try {
    await _updateNotification(notificationId);
    const response = await getUnreadCount();
    dispatch(setTotalUnreadCount(response.unread_count));
  } catch (error) {
    displayErrorToast('Failed to mark notification as read');
  }
};
