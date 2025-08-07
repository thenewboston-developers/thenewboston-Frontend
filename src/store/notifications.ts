import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NOTIFICATIONS} from 'constants/store';
import {Notification, NotificationPaginatedResponse, NotificationsState} from 'types';

const initialState: NotificationsState = {
  hasMore: false,
  isLoading: false,
  next: null,
  notifications: {},
  totalUnreadCount: 0,
};

const notifications = createSlice({
  initialState,
  name: NOTIFICATIONS,
  reducers: {
    markAllNotificationsAsRead: (state: NotificationsState) => {
      Object.keys(state.notifications).forEach((key) => {
        state.notifications[key] = {...state.notifications[key], is_read: true};
      });
      state.totalUnreadCount = 0;
    },
    markNotificationAsRead: (state: NotificationsState, {payload}: PayloadAction<number>) => {
      if (state.notifications[payload] && !state.notifications[payload].is_read) {
        state.notifications[payload].is_read = true;
        state.totalUnreadCount = Math.max(0, state.totalUnreadCount - 1);
      }
    },
    resetNotifications: (state) => {
      state.hasMore = false;
      state.isLoading = false;
      state.next = null;
      state.notifications = {};
      // Don't reset totalUnreadCount to prevent badge flashing
    },
    setNotification: (state: NotificationsState, {payload}: PayloadAction<Notification>) => {
      const {id} = payload;
      state.notifications[id] = payload;
    },
    setNotifications: (state: NotificationsState, {payload}: PayloadAction<NotificationPaginatedResponse>) => {
      state.hasMore = !!payload.next;
      state.isLoading = false;
      state.next = payload.next;
      state.totalUnreadCount = payload.unread_count;
      payload.results.forEach((notification) => {
        state.notifications[notification.id] = notification;
      });
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    setTotalUnreadCount: (state, {payload}: PayloadAction<number>) => {
      state.totalUnreadCount = payload;
    },
  },
});

export const {
  markAllNotificationsAsRead,
  markNotificationAsRead,
  resetNotifications,
  setNotification,
  setNotifications,
  startLoading,
  setTotalUnreadCount,
} = notifications.actions;
export default notifications.reducer;
