import {FOLLOWERS} from 'constants/store';
import {Follower} from 'types';
import {createItemSlice} from 'utils/store';

const followersSlice = createItemSlice<Follower>(FOLLOWERS, {
  count: 0,
  hasMore: false,
  isLoading: false,
  items: [],
  next: null,
});

export const {
  resetItems: resetFollowers,
  setItem: setFollower,
  setItems: setFollowers,
  startLoading: startLoading,
  unsetItem: unsetFollower,
} = followersSlice.actions;

export default followersSlice.reducer;
