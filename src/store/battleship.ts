import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BattleshipMatch, BattleshipState} from 'types/battleship';

const initialState: BattleshipState = {matchesById: {}};

const battleship = createSlice({
  initialState,
  name: 'battleship',
  reducers: {
    upsertBattleshipMatch: (state, {payload}: PayloadAction<BattleshipMatch>) => {
      const previous = state.matchesById[payload.id];
      // An older poll must never restore a fired square or a previous turn.
      if (!previous || payload.version >= previous.version) state.matchesById[payload.id] = payload;
    },
  },
});

export const {upsertBattleshipMatch} = battleship.actions;
export default battleship.reducer;
