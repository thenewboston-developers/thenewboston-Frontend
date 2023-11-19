import {getNotifications as _getNotifications, updateNotification as _updateNotification} from 'api/notifications';
import {setNotification, setNotifications} from 'store/notifications';
import {AppDispatch, UpdateNotificationRequest} from 'types';

export const getNotifications = () => async (dispatch: AppDispatch) => {
  const responseData = await _getNotifications();
  dispatch(setNotifications(responseData));
};

export const updateNotification =
  (id: number, data: Partial<UpdateNotificationRequest>) => async (dispatch: AppDispatch) => {
    const responseData = await _updateNotification(id, data);
    dispatch(setNotification(responseData));
  };
