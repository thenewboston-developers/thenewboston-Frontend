import {PayloadAction} from '@reduxjs/toolkit';
import {FOLLOWERS} from 'constants/store';
import {Follower} from 'types';
import {createItemSlice, CustomReducers, ItemSliceState} from 'utils/store';

const updateSelfFollowing = (state: ItemSliceState<Follower>, followedUserId: number, selfFollowing: boolean) => {
  const index = state.items.findIndex((obj) => obj.follower.id === followedUserId);
  if (index >= 0) {
    state.items[index] = {
      ...state.items[index],
      self_following: selfFollowing,
    };
  }
};

const customReducers: CustomReducers<Follower> = {
  setSelfFollowing: (state, {payload}: PayloadAction<number>) => {
    updateSelfFollowing(state, payload, true);
  },
  unsetSelfFollowing: (state, {payload}: PayloadAction<number>) => {
    updateSelfFollowing(state, payload, false);
  },
};

const followersSlice = createItemSlice<Follower>(
  FOLLOWERS,
  {
    count: 0,
    hasMore: false,
    isLoading: false,
    items: [],
    next: null,
  },
  customReducers,
);

export const {
  resetItems: resetFollowers,
  setItem: setFollower,
  setItems: setFollowers,
  startLoading,
  unsetItem: unsetFollower,
  // TODO (muhammad) MEDIUM: Figure out a good solution for passing custom reducers
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TypeScript error ignored for this line
  setSelfFollowing: setSelfFollowing,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TypeScript error ignored for this line
  unsetSelfFollowing: unsetSelfFollowing,
} = followersSlice.actions;

export default followersSlice.reducer;
