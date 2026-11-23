import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BackgammonMatch, BackgammonState} from 'types/backgammon';

const initialState: BackgammonState = {matchesById: {}};

const backgammon = createSlice({
  initialState,
  name: 'backgammon',
  reducers: {
    upsertBackgammonMatch: (state, {payload}: PayloadAction<BackgammonMatch>) => {
      const previous = state.matchesById[payload.id];
      // A polling response may arrive after a successful action; never rewind the board.
      if (!previous || payload.version >= previous.version) state.matchesById[payload.id] = payload;
    },
  },
});

export const {upsertBackgammonMatch} = backgammon.actions;
export default backgammon.reducer;
