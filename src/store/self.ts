import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SELF} from 'constants/store';
import {Self} from 'types';

const initialState: Self = {
  avatar: null,
  banner: null,
  bio: null,
  discord_username: null,
  facebook_username: null,
  github_username: null,
  id: null,
  instagram_username: null,
  is_staff: false,
  linkedin_username: null,
  pinterest_username: null,
  reddit_username: null,
  tiktok_username: null,
  twitch_username: null,
  x_username: null,
  username: null,
  youtube_username: null,
};

const self = createSlice({
  initialState,
  name: SELF,
  reducers: {
    setSelf: (_state: Self, {payload}: PayloadAction<Self>) => {
      return payload;
    },
  },
});

export const {setSelf} = self.actions;
export default self.reducer;
