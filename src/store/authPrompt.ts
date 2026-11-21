import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AUTH_PROMPT} from 'constants/store';

export interface AuthPromptState {
  // What the visitor was trying to do, phrased to complete "Sign in or create an account to ..."
  intent: string | null;
}

const initialState: AuthPromptState = {
  intent: null,
};

const authPrompt = createSlice({
  initialState,
  name: AUTH_PROMPT,
  reducers: {
    closeAuthPrompt: (state: AuthPromptState) => {
      state.intent = null;
    },
    openAuthPrompt: (state: AuthPromptState, {payload}: PayloadAction<string>) => {
      state.intent = payload;
    },
  },
});

export const {closeAuthPrompt, openAuthPrompt} = authPrompt.actions;

export default authPrompt.reducer;
