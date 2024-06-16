import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MESSAGES} from 'constants/store';
import {Message, Messages} from 'types';

export const initialState: Messages = {};

const messages = createSlice({
  initialState,
  name: MESSAGES,
  reducers: {
    setMessage: (state: Messages, {payload}: PayloadAction<Message>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setMessages: (state: Messages, {payload}: PayloadAction<Message[]>) => {
      payload.forEach((message) => {
        state[message.id] = message;
      });
    },
    unsetMessage: (state: Messages, {payload: id}: PayloadAction<number>) => {
      delete state[id];
    },
  },
});

export const {setMessage, setMessages, unsetMessage} = messages.actions;
export default messages.reducer;
