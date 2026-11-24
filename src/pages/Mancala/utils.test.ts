import {MancalaMatch, MancalaRecentMove} from 'types/mancala';

import {describeMove, formatClock, INITIAL_BOARD, pitIndex, sowingFrames, trimBacklog} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

const move = (changes: Partial<MancalaRecentMove>): MancalaRecentMove => ({
  board: INITIAL_BOARD,
  captured: 0,
  extra_turn: false,
  last: 0,
  pit: 0,
  side: 'host',
  stones: 0,
  swept: null,
  version: 2,
  ...changes,
});

describe('sowingFrames', () => {
  it('lifts the pit, then drops one stone per pit counter-clockwise', () => {
    const after = [0, 5, 5, 5, 5, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    const frames = sowingFrames(INITIAL_BOARD, move({board: after, last: 4, stones: 4}));
    expect(frames.map(({kind}) => kind)).toEqual(['lift', 'drop', 'drop', 'drop', 'drop']);
    expect(frames.map(({hand}) => hand)).toEqual([4, 3, 2, 1, 0]);
    expect(frames[0].board).toEqual([0, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]);
    expect(frames.slice(1).map(({marked}) => marked)).toEqual([[1], [2], [3], [4]]);
    expect(frames[4].board).toEqual(after);
    expect(frames.every(({source}) => source === 0)).toBe(true);
    // The starting board is never changed in place
    expect(INITIAL_BOARD).toEqual([4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]);
  });

  it('passes the mover’s own store and skips the opponent’s', () => {
    const before = [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 10, 0];
    const after = [2, 2, 2, 2, 2, 2, 0, 1, 1, 2, 0, 0, 0, 1];
    const frames = sowingFrames(before, move({board: after, last: 9, pit: 5, side: 'guest', stones: 10}));
    expect(frames.slice(1).map(({marked}) => marked[0])).toEqual([13, 0, 1, 2, 3, 4, 5, 7, 8, 9]);
    expect(frames[frames.length - 1].board).toEqual(after);
    expect(frames[0].source).toBe(pitIndex('guest', 5));
  });

  it('shows a capture as its own step after the last stone lands', () => {
    const before = [1, 0, 4, 4, 4, 4, 0, 4, 4, 4, 4, 7, 4, 0];
    const after = [0, 0, 4, 4, 4, 4, 8, 4, 4, 4, 4, 0, 4, 0];
    const frames = sowingFrames(before, move({board: after, captured: 8, last: 1, stones: 1}));
    expect(frames.map(({kind}) => kind)).toEqual(['lift', 'drop', 'capture']);
    expect(frames[1].board).toEqual([0, 1, 4, 4, 4, 4, 0, 4, 4, 4, 4, 7, 4, 0]);
    expect(frames[2].marked).toEqual([1, 11]);
    expect(frames[2].board).toEqual(after);
  });

  it('ends on the server’s board when the game finishes', () => {
    const before = [0, 0, 0, 0, 0, 1, 26, 1, 2, 3, 0, 0, 0, 15];
    const after = [0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 21];
    const frames = sowingFrames(before, move({board: after, last: 6, pit: 5, stones: 1, swept: {guest: 6, host: 0}}));
    expect(frames.map(({kind}) => kind)).toEqual(['lift', 'drop', 'sweep']);
    expect(frames[1].board).toEqual([0, 0, 0, 0, 0, 0, 27, 1, 2, 3, 0, 0, 0, 15]);
    expect(frames[2].board).toEqual(after);
  });

  it('sows a large pit faster so a move stays short', () => {
    const small = sowingFrames(INITIAL_BOARD, move({last: 4, stones: 4}));
    const large = sowingFrames([18, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 20], move({last: 5, stones: 18}));
    expect(large[1].duration).toBeLessThan(small[1].duration);
    expect(large.reduce((total, {duration}) => total + duration, 0)).toBeLessThan(3000);
  });
});

describe('trimBacklog', () => {
  const frames = [2, 3, 4].flatMap((version) => sowingFrames(INITIAL_BOARD, move({last: 4, stones: 4, version})));
  const perMove = frames.filter(({version}) => version === 2).reduce((total, {duration}) => total + duration, 0);

  it('keeps everything that fits', () => {
    expect(trimBacklog(frames, perMove * 3)).toEqual(frames);
  });

  it('drops whole moves from the front, never part of one', () => {
    const kept = trimBacklog(frames, perMove * 2 + 10);
    expect(new Set(kept.map(({version}) => version))).toEqual(new Set([3, 4]));
    expect(kept[0].kind).toBe('lift');
  });

  it('always keeps the newest move, even when it alone is over the limit', () => {
    const kept = trimBacklog(frames, 1);
    expect(new Set(kept.map(({version}) => version))).toEqual(new Set([4]));
    expect(trimBacklog([], 1)).toEqual([]);
  });
});

describe('describeMove', () => {
  const match = {guest: null, host: {id: 1, username: 'Alice'}} as unknown as MancalaMatch;

  it('names the player, the pit in play order, and what the move earned', () => {
    expect(describeMove(match, move({pit: 2, stones: 4}))).toBe('Alice sowed 4 from pit 3');
    expect(describeMove(match, move({extra_turn: true, pit: 2, side: 'guest', stones: 4}))).toBe(
      'Computer sowed 4 from pit 3 · plays again',
    );
    expect(describeMove(match, move({captured: 8, stones: 1, swept: {guest: 0, host: 3}}))).toBe(
      'Alice sowed 1 from pit 1 · captured 8 · ended the game',
    );
  });
});

describe('formatClock', () => {
  it('rounds up to whole seconds and never goes below zero', () => {
    expect(formatClock(600000)).toBe('10:00');
    expect(formatClock(61001)).toBe('1:02');
    expect(formatClock(-5)).toBe('0:00');
  });
});
