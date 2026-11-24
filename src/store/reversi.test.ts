import {ReversiMatch} from 'types/reversi';

import reducer, {upsertReversiMatch} from './reversi';

describe('reversi state', () => {
  it('does not replace a move result with an older polling response', () => {
    const latest = {id: 7, version: 12, active_side: 'white'} as ReversiMatch;
    const stale = {id: 7, version: 11, active_side: 'black'} as ReversiMatch;
    const state = reducer(undefined, upsertReversiMatch(latest));
    expect(reducer(state, upsertReversiMatch(stale)).matchesById[7]).toEqual(latest);
  });

  it('refreshes server clock information at the same board version', () => {
    const initial = {id: 7, version: 12, server_time: '2026-11-23T12:00:00Z'} as ReversiMatch;
    const refreshed = {...initial, server_time: '2026-11-23T12:00:02Z'};
    const state = reducer(undefined, upsertReversiMatch(initial));
    expect(reducer(state, upsertReversiMatch(refreshed)).matchesById[7]).toEqual(refreshed);
  });

  it('keeps matches apart by id', () => {
    const first = {id: 7, version: 3} as ReversiMatch;
    const second = {id: 8, version: 1} as ReversiMatch;
    const state = reducer(reducer(undefined, upsertReversiMatch(first)), upsertReversiMatch(second));
    expect(state.matchesById).toEqual({7: first, 8: second});
  });
});
