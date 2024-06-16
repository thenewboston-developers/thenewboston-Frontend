import {FOLLOWINGS} from 'constants/store';
import {Follower} from 'types';
import {createItemSlice} from 'utils/store';

export const initialState = {
  count: 0,
  hasMore: false,
  isLoading: false,
  items: [],
  next: null,
};
const followingsSlice = createItemSlice<Follower>(FOLLOWINGS, initialState);

export const {
  resetItems: resetFollowing,
  setItem: setFollowing,
  setItems: setFollowings,
  startLoading: startLoading,
  unsetItem: unsetFollowing,
} = followingsSlice.actions;

export default followingsSlice.reducer;
