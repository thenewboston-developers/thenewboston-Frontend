import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NOTIFICATIONS} from 'constants/store';
import {Notification, Notifications} from 'types';

const initialState: Notifications = {};

const notifications = createSlice({
  initialState,
  name: NOTIFICATIONS,
  reducers: {
    markAllNotificationsAsRead: (state: Notifications) => {
      Object.keys(state).forEach((key) => {
        state[key] = {...state[key], is_read: true};
      });
    },
    setNotification: (state: Notifications, {payload}: PayloadAction<Notification>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setNotifications: (state: Notifications, {payload}: PayloadAction<Notification[]>) => {
      payload.forEach((notification) => {
        state[notification.id] = notification;
      });
    },
  },
});

export const {markAllNotificationsAsRead, setNotification, setNotifications} = notifications.actions;
export default notifications.reducer;
