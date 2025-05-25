import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Draft} from 'immer';

import {PaginatedResponse} from 'types';

/**
 * Define a base interface that all item types must extend.
 * This interface requires that each item must have an 'id' property.
 */
export interface Identifiable {
  id: number;
}

/**
 * Interface for the state of a generic item slice.
 * @template Item - The type of item managed by the slice.
 */
export interface ItemSliceState<Item extends Identifiable> {
  count: number;
  items: Item[];
  hasMore: boolean;
  isLoading: boolean;
  next: string | null;
}

/**
 * Type for custom reducers. It ensures that the state in each reducer
 * has the correct type based on the item type.
 */
export type CustomReducers<Item extends Identifiable> = {
  [key: string]: (state: ItemSliceState<Item>, action: PayloadAction<any>) => void;
};

/**
 * Creates a Redux slice for managing a list of items with identifiable properties.
 * @param sliceName - The name of the slice.
 * @param initialState - The initial state of the slice.
 * @returns A slice for managing items that includes actions and reducer.
 * @template Item - The type of items managed by the slice.
 */
export const createItemSlice = <Item extends Identifiable>(
  sliceName: string,
  initialState: ItemSliceState<Item>,
  customReducers: CustomReducers<Item> = {},
) => {
  return createSlice({
    initialState,
    name: sliceName,
    reducers: {
      // Resets the state to initial values.
      resetItems: (state) => {
        state.count = 0;
        state.hasMore = false;
        state.isLoading = false;
        state.next = null;
        state.items = [];
      },
      // Sets or updates a single item.
      setItem: (state, {payload}: PayloadAction<Item>) => {
        const existingIndex = state.items.findIndex((obj) => obj.id === payload.id);
        if (existingIndex >= 0) {
          state.items[existingIndex] = payload as Draft<Item>;
        } else {
          state.items.unshift(payload as Draft<Item>);
        }
      },
      // Sets a list of items, usually from paginated API responses.
      setItems: (state, {payload}: PayloadAction<PaginatedResponse<Item>>) => {
        state.count = payload.count;
        state.hasMore = !!payload.next;
        state.isLoading = false;
        state.next = payload.next;
        state.items = [...state.items, ...(payload.results as Draft<Item>[])];
      },
      // Marks the state as loading.
      startLoading: (state) => {
        state.isLoading = true;
      },
      // Removes an item by ID.
      unsetItem: (state, {payload: id}: PayloadAction<number>) => {
        state.count -= 1;
        state.items = state.items.filter((obj) => obj.id !== id);
      },
      ...customReducers,
    },
  });
};
