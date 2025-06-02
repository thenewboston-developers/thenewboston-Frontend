import axios from 'axios';

import {Notification, PaginatedResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/notifications`;

export const getNotifications = async (url?: string): Promise<PaginatedResponse<Notification>> => {
  try {
    const apiURL = url || BASE_URL;
    const response = await axios.get<PaginatedResponse<Notification>>(apiURL, authorizationHeaders());
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
