import {boxLines, lineBoxes, lineCount} from '../utils';

import {DEMO_CLAIMS, DEMO_MOVES, DEMO_TIMES} from '.';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

it('scripts a legal 3 × 3 demo game in which only a player who closes a box draws again', () => {
  expect(DEMO_MOVES.map(([line]) => line).sort((first, second) => first - second)).toEqual(
    Array.from({length: lineCount(3)}, (_, line) => line),
  );
  expect(DEMO_MOVES[0][1]).toBe('blue');
  const drawn = new Set<number>();
  const closesBox = DEMO_MOVES.map(([line]) => {
    drawn.add(line);
    return lineBoxes(3, line).some((box) => boxLines(3, box).every((edge) => drawn.has(edge)));
  });
  const keepsTurn = DEMO_MOVES.slice(1).map(([, side], move) => side === DEMO_MOVES[move][1]);
  expect(keepsTurn).toEqual(closesBox.slice(0, -1));
  expect(closesBox[closesBox.length - 1]).toBe(true);
});

it('gives every box to the player who closed it, ending Blue 4, Red 5', () => {
  const score = {blue: 0, red: 0};
  DEMO_CLAIMS.forEach(({side}) => {
    score[side] += 1;
  });
  expect(score).toEqual({blue: 4, red: 5});
});

it('draws the lines in order, a little quicker while one player keeps the turn', () => {
  const gaps = DEMO_TIMES.slice(1).map((time, move) => Number((time - DEMO_TIMES[move]).toFixed(2)));
  expect(gaps.every((gap) => gap === 0.3 || gap === 0.45)).toBe(true);
  expect(DEMO_TIMES[DEMO_TIMES.length - 1]).toBeLessThan(11);
});
