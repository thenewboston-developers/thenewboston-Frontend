import axios from 'axios';

import {Notification, UpdateNotificationRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/notifications`;

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axios.get<Notification[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNotification = async (
  id: number,
  data: Partial<UpdateNotificationRequest>,
): Promise<Notification> => {
  try {
    const response = await axios.patch<Notification>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  try {
    await axios.patch(`${BASE_URL}/mark_all_as_read`, {}, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
