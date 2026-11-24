import {HexMatch} from 'types/hex';

import reducer, {upsertHexMatch} from './hex';

it('keeps placed stones and clocks when older polls arrive', () => {
  const latest = {
    id: 1,
    version: 9,
    active_side: 'blue',
    server_time: '2026-11-23T12:00:10Z',
    board: [1, 2, 0, 0],
  } as HexMatch;
  const state = reducer(undefined, upsertHexMatch(latest));
  const olderVersion = {...latest, version: 8, board: [1, 0, 0, 0]} as HexMatch;
  const olderTime = {...latest, server_time: '2026-11-23T12:00:09Z'};
  expect(reducer(state, upsertHexMatch(olderVersion)).matchesById[1]).toEqual(latest);
  expect(reducer(state, upsertHexMatch(olderTime)).matchesById[1]).toEqual(latest);
  const newer = {...latest, version: 10, board: [1, 2, 1, 0]} as HexMatch;
  expect(reducer(state, upsertHexMatch(newer)).matchesById[1]).toEqual(newer);
});
