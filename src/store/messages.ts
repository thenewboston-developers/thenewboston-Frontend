import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MESSAGES} from 'constants/store';
import {Message, Messages} from 'types';

const initialState: Messages = {};

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
  },
});

export const {setMessage, setMessages} = messages.actions;
export default messages.reducer;
