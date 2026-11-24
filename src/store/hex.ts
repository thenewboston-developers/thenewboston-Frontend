import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {HexMatch, HexState} from 'types/hex';

const initialState: HexState = {matchesById: {}};

const hex = createSlice({
  initialState,
  name: 'hex',
  reducers: {
    upsertHexMatch: (state, {payload}: PayloadAction<HexMatch>) => {
      const previous = state.matchesById[payload.id];
      // An older poll must never remove a stone, undo a swap, or restore older clock data.
      if (
        !previous ||
        payload.version > previous.version ||
        (payload.version === previous.version && Date.parse(payload.server_time) >= Date.parse(previous.server_time))
      )
        state.matchesById[payload.id] = payload;
    },
  },
});

export const {upsertHexMatch} = hex.actions;
export default hex.reducer;
