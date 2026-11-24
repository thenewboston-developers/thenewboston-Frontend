import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ReversiMatch, ReversiState} from 'types/reversi';

const initialState: ReversiState = {matchesById: {}};

const reversi = createSlice({
  initialState,
  name: 'reversi',
  reducers: {
    upsertReversiMatch: (state, {payload}: PayloadAction<ReversiMatch>) => {
      const previous = state.matchesById[payload.id];
      // A polling response may arrive after a successful move; never rewind the board.
      if (!previous || payload.version >= previous.version) state.matchesById[payload.id] = payload;
    },
  },
});

export const {upsertReversiMatch} = reversi.actions;
export default reversi.reducer;
