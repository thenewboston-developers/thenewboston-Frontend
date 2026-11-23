import {BackgammonMatch} from 'types/backgammon';

import reducer, {upsertBackgammonMatch} from './backgammon';

describe('backgammon state', () => {
  it('does not replace an action result with an older polling response', () => {
    const latest = {id: 7, version: 12, phase: 'awaiting_roll'} as BackgammonMatch;
    const stale = {id: 7, version: 11, phase: 'moving'} as BackgammonMatch;
    const state = reducer(undefined, upsertBackgammonMatch(latest));
    expect(reducer(state, upsertBackgammonMatch(stale)).matchesById[7]).toEqual(latest);
  });

  it('refreshes server clock information at the same board version', () => {
    const initial = {id: 7, version: 12, server_time: '2026-11-23T12:00:00Z'} as BackgammonMatch;
    const refreshed = {...initial, server_time: '2026-11-23T12:00:02Z'};
    const state = reducer(undefined, upsertBackgammonMatch(initial));
    expect(reducer(state, upsertBackgammonMatch(refreshed)).matchesById[7]).toEqual(refreshed);
  });
});
