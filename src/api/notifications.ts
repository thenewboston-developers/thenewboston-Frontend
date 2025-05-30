import axios from 'axios';

import {Notification} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/notifications`;

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axios.get<Notification[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  try {
    await axios.patch(`${BASE_URL}/mark-all-as-read`, {}, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};
