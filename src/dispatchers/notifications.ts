import {
  getNotifications as _getNotifications,
  markAllNotificationsAsRead as _markAllNotificationsAsRead,
} from 'api/notifications';
import {store} from 'store';
import {
  markAllNotificationsAsRead as markAllNotificationsAsReadAction,
  resetNotifications as _resetNotifications,
  setNotifications,
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
  await _markAllNotificationsAsRead();
  dispatch(markAllNotificationsAsReadAction());
};
