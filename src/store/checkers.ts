import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CheckersMatch, CheckersState} from 'types/checkers';

const initialState: CheckersState = {matchesById: {}};

const checkers = createSlice({
  initialState,
  name: 'checkers',
  reducers: {
    upsertCheckersMatch: (state, {payload}: PayloadAction<CheckersMatch>) => {
      const previous = state.matchesById[payload.id];
      // An older poll must never restore captured pieces, a previous turn, or older clock data.
      if (
        !previous ||
        payload.version > previous.version ||
        (payload.version === previous.version && Date.parse(payload.server_time) >= Date.parse(previous.server_time))
      )
        state.matchesById[payload.id] = payload;
    },
  },
});

export const {upsertCheckersMatch} = checkers.actions;
export default checkers.reducer;
