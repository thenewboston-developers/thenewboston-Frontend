import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NOTIFICATIONS} from 'constants/store';
import {Notification, Notifications} from 'types';

const initialState: Notifications = {};

const notifications = createSlice({
  initialState,
  name: NOTIFICATIONS,
  reducers: {
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

export const {setNotification, setNotifications} = notifications.actions;
export default notifications.reducer;
