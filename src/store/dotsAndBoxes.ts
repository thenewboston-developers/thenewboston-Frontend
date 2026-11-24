import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {DotsAndBoxesMatch, DotsAndBoxesState} from 'types/dotsAndBoxes';

const initialState: DotsAndBoxesState = {matchesById: {}};

const dotsAndBoxes = createSlice({
  initialState,
  name: 'dotsAndBoxes',
  reducers: {
    upsertDotsAndBoxesMatch: (state, {payload}: PayloadAction<DotsAndBoxesMatch>) => {
      const previous = state.matchesById[payload.id];
      // An older poll must never erase a drawn line, hand a box back, or restore older clock data.
      if (
        !previous ||
        payload.version > previous.version ||
        (payload.version === previous.version && Date.parse(payload.server_time) >= Date.parse(previous.server_time))
      )
        state.matchesById[payload.id] = payload;
    },
  },
});

export const {upsertDotsAndBoxesMatch} = dotsAndBoxes.actions;
export default dotsAndBoxes.reducer;
