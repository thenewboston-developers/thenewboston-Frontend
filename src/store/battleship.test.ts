import {BattleshipMatch} from 'types/battleship';

import reducer, {upsertBattleshipMatch} from './battleship';

it('never lets a delayed poll undo a committed shot or restore a previous turn', () => {
  const latest = {
    id: 1,
    version: 9,
    active_side: 'guest',
    board: {ships: [], incoming_shots: [], opponent_sunk_ships: [], shots: [{row: 1, column: 2, result: 'hit'}]},
  } as unknown as BattleshipMatch;
  const stale = {...latest, version: 8, active_side: 'host', board: {...latest.board, shots: []}} as BattleshipMatch;
  const state = reducer(undefined, upsertBattleshipMatch(latest));
  expect(reducer(state, upsertBattleshipMatch(stale)).matchesById[1]).toEqual(latest);
});
