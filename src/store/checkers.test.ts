import {CheckersMatch} from 'types/checkers';

import reducer, {upsertCheckersMatch} from './checkers';

it('keeps committed turns and clocks when older polls arrive', () => {
  const latest = {
    id: 1,
    version: 9,
    active_side: 'black',
    server_time: '2026-11-23T12:00:10Z',
    board: [0, 2],
  } as CheckersMatch;
  const state = reducer(undefined, upsertCheckersMatch(latest));
  const olderVersion = {...latest, version: 8, board: [1, 0]} as CheckersMatch;
  const olderTime = {...latest, server_time: '2026-11-23T12:00:09Z'};
  expect(reducer(state, upsertCheckersMatch(olderVersion)).matchesById[1]).toEqual(latest);
  expect(reducer(state, upsertCheckersMatch(olderTime)).matchesById[1]).toEqual(latest);
});
