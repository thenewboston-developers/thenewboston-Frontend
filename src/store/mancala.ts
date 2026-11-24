import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MancalaMatch, MancalaState} from 'types/mancala';

const initialState: MancalaState = {matchesById: {}};

const mancala = createSlice({
  initialState,
  name: 'mancala',
  reducers: {
    upsertMancalaMatch: (state, {payload}: PayloadAction<MancalaMatch>) => {
      const previous = state.matchesById[payload.id];
      // A polling response may arrive after a successful move; never put the stones back.
      if (!previous || payload.version >= previous.version) state.matchesById[payload.id] = payload;
    },
  },
});

export const {upsertMancalaMatch} = mancala.actions;
export default mancala.reducer;
