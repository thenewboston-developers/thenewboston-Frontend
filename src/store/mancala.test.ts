import {MancalaMatch} from 'types/mancala';

import reducer, {upsertMancalaMatch} from './mancala';

const latest = {
  id: 1,
  version: 9,
  active_side: 'guest',
  board: [0, 5, 5, 5, 5, 4, 0, 4, 4, 4, 4, 4, 4, 0],
} as unknown as MancalaMatch;

it('never lets a delayed poll put sown stones back or restore a previous turn', () => {
  const stale = {...latest, version: 8, active_side: 'host', board: [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]};
  const state = reducer(undefined, upsertMancalaMatch(latest));
  expect(reducer(state, upsertMancalaMatch(stale as MancalaMatch)).matchesById[1]).toEqual(latest);
});

it('accepts a newer snapshot and a refresh of the same version', () => {
  const state = reducer(undefined, upsertMancalaMatch(latest));
  const refreshed = {...latest, server_time: '2026-11-23T12:00:00Z'};
  expect(reducer(state, upsertMancalaMatch(refreshed)).matchesById[1]).toEqual(refreshed);
  const newer = {...latest, version: 10, active_side: 'host'} as MancalaMatch;
  expect(reducer(state, upsertMancalaMatch(newer)).matchesById[1]).toEqual(newer);
});
