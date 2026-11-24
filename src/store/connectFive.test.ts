import {ConnectFiveMatch} from 'types';

import reducer, {setActiveMatches, upsertMatch} from './connectFive';

const latest = {
  id: 1,
  version: 5,
  mode: 'computer',
  status: 'finished_connect5',
  player_a: {id: 11},
  player_b: null,
  winner_side: 'b',
  server_time: '2026-11-23T12:00:05Z',
} as unknown as ConnectFiveMatch;

it('handles a null computer player and never restores an older active game after settlement', () => {
  const state = reducer(undefined, upsertMatch({match: latest, selfId: 11}));
  expect(state.completedMatches).toEqual([latest]);
  const old = {...latest, version: 4, status: 'active'};
  const next = reducer(state, upsertMatch({match: old, selfId: 11}));
  expect(next.matchesById[1]).toEqual(latest);
  expect(next.activeMatches).toEqual([]);
  expect(reducer(next, setActiveMatches([old])).activeMatches).toEqual([]);
});
