import {FOLLOWINGS} from 'constants/store';
import {Follower} from 'types';

import {createItemSlice} from 'utils/store';

const followingsSlice = createItemSlice<Follower>(FOLLOWINGS, {
  count: 0,
  hasMore: false,
  isLoading: false,
  items: [],
  next: null,
});

export const {
  resetItems: resetFollowing,
  setItem: setFollowing,
  setItems: setFollowings,
  startLoading: startLoading,
  unsetItem: unsetFollowing,
} = followingsSlice.actions;

export default followingsSlice.reducer;
