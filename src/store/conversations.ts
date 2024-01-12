import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CONVERSATIONS} from 'constants/store';
import {Conversation, Conversations} from 'types';

const initialState: Conversations = {};

const conversations = createSlice({
  initialState,
  name: CONVERSATIONS,
  reducers: {
    setConversation: (state: Conversations, {payload}: PayloadAction<Conversation>) => {
      const {id} = payload;
      state[id] = payload;
    },
    setConversations: (state: Conversations, {payload}: PayloadAction<Conversation[]>) => {
      payload.forEach((conversation) => {
        state[conversation.id] = conversation;
      });
    },
  },
});

export const {setConversation, setConversations} = conversations.actions;
export default conversations.reducer;
