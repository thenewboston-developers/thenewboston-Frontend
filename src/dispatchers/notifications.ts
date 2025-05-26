import {
  getNotifications as _getNotifications,
  markAllNotificationsAsRead as _markAllNotificationsAsRead,
} from 'api/notifications';
import {markAllNotificationsAsRead as markAllNotificationsAsReadAction, setNotifications} from 'store/notifications';
import {AppDispatch} from 'types';

export const getNotifications = () => async (dispatch: AppDispatch) => {
  const responseData = await _getNotifications();
  dispatch(setNotifications(responseData));
};

export const markAllNotificationsAsRead = () => async (dispatch: AppDispatch) => {
  await _markAllNotificationsAsRead();
  dispatch(markAllNotificationsAsReadAction());
};
