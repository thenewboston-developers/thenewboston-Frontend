import {
  getNotifications as _getNotifications,
  getUnreadCount as _getUnreadCount,
  markAllNotificationsAsRead as _markAllNotificationsAsRead,
} from 'api/notifications';
import {store} from 'store';
import {
  markAllNotificationsAsRead as markAllNotificationsAsReadAction,
  resetNotifications as _resetNotifications,
  setNotifications,
  setTotalUnreadCount,
  startLoading,
} from 'store/notifications';
import {AppDispatch} from 'types';
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

export const getUnreadCount = () => async (dispatch: AppDispatch) => {
  const response = await _getUnreadCount();
  dispatch(setTotalUnreadCount(response.unread_count));
};
