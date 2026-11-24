import {DotsAndBoxesMatch} from 'types/dotsAndBoxes';

import reducer, {upsertDotsAndBoxesMatch} from './dotsAndBoxes';

it('keeps drawn lines and clocks when older polls arrive', () => {
  const latest = {
    id: 1,
    version: 9,
    active_side: 'red',
    server_time: '2026-11-23T12:00:10Z',
    lines: [1, 2, 0],
    moves: [0, 1],
  } as DotsAndBoxesMatch;
  const state = reducer(undefined, upsertDotsAndBoxesMatch(latest));
  const olderVersion = {...latest, version: 8, lines: [1, 0, 0], moves: [0]} as DotsAndBoxesMatch;
  const olderTime = {...latest, server_time: '2026-11-23T12:00:09Z'};
  expect(reducer(state, upsertDotsAndBoxesMatch(olderVersion)).matchesById[1]).toEqual(latest);
  expect(reducer(state, upsertDotsAndBoxesMatch(olderTime)).matchesById[1]).toEqual(latest);
});

it('accepts the next version of a match', () => {
  const first = {id: 1, version: 2, server_time: '2026-11-23T12:00:10Z', moves: [4]} as DotsAndBoxesMatch;
  const next = {...first, version: 3, server_time: '2026-11-23T12:00:11Z', moves: [4, 7]} as DotsAndBoxesMatch;
  const state = reducer(reducer(undefined, upsertDotsAndBoxesMatch(first)), upsertDotsAndBoxesMatch(next));
  expect(state.matchesById[1]).toEqual(next);
});
