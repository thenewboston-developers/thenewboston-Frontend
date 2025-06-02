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

export const markAllNotificationsAsRead = async (): Promise<{success: boolean; unread_count: number}> => {
  try {
    const response = await axios.patch<{success: boolean; unread_count: number}>(
      `${BASE_URL}/mark-all-as-read`,
      {},
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUnreadCount = async (): Promise<{unread_count: number}> => {
  try {
    const response = await axios.get<{unread_count: number}>(`${BASE_URL}/unread-count`, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
