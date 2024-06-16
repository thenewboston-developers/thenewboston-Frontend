import {CONTRIBUTIONS} from 'constants/store';
import {Contribution} from 'types';
import {createItemSlice} from 'utils/store';

export const initialState = {count: 0, hasMore: false, isLoading: false, items: [], next: null};
const contributionsSlice = createItemSlice<Contribution>(CONTRIBUTIONS, initialState);

export const {
  resetItems: resetContributions,
  setItem: setContribution,
  setItems: setContributions,
  startLoading: startLoading,
} = contributionsSlice.actions;

export default contributionsSlice.reducer;
