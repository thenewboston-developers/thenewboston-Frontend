import {DotsAndBoxesMatch} from 'types/dotsAndBoxes';

import {
  boxLines,
  dotLabel,
  formatClock,
  getScore,
  getScoreLine,
  horizontalLine,
  lastTurnLines,
  lineBoxes,
  lineCount,
  lineLabel,
  positionAfter,
  verticalLine,
} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

describe('Dots and Boxes board numbering', () => {
  it.each([
    [3, 24],
    [4, 40],
    [5, 60],
  ])('has the same number of lines as the server on a %i by %i board', (size, lines) => {
    expect(lineCount(size)).toBe(lines);
  });

  it('numbers horizontal lines first, then vertical lines, row by row', () => {
    expect(horizontalLine(3, 0, 0)).toBe(0);
    expect(horizontalLine(3, 3, 2)).toBe(11);
    expect(verticalLine(3, 0, 0)).toBe(12);
    expect(verticalLine(3, 2, 3)).toBe(23);
  });

  it('matches the server for the lines around a box and the boxes beside a line', () => {
    expect(boxLines(3, 0)).toEqual([0, 3, 12, 13]);
    expect(boxLines(3, 4)).toEqual([4, 7, 17, 18]);
    expect(boxLines(3, 8)).toEqual([8, 11, 22, 23]);
    expect(lineBoxes(3, 4)).toEqual([1, 4]);
    expect(lineBoxes(3, 12)).toEqual([0]);
    expect(lineBoxes(3, 13)).toEqual([0, 1]);
    expect(lineBoxes(3, 11)).toEqual([8]);
  });

  it.each([3, 4, 5])('agrees with itself on every line and box of a %i by %i board', (size) => {
    for (let box = 0; box < size * size; box += 1)
      boxLines(size, box).forEach((line) => expect(lineBoxes(size, line)).toContain(box));
    const edges = Array.from({length: lineCount(size)}, (_, line) => lineBoxes(size, line).length);
    expect(edges.filter((count) => count === 1)).toHaveLength(4 * size);
    expect(edges.every((count) => count === 1 || count === 2)).toBe(true);
  });

  it('names dots like spreadsheet cells and lines by the two dots they join', () => {
    expect(dotLabel(0, 0)).toBe('A1');
    expect(dotLabel(2, 3)).toBe('D3');
    expect(lineLabel(3, 0)).toBe('A1 to B1');
    expect(lineLabel(3, 11)).toBe('C4 to D4');
    expect(lineLabel(3, 12)).toBe('A1 to A2');
    expect(lineLabel(3, 23)).toBe('D3 to D4');
  });
});

describe('replaying a Dots and Boxes match', () => {
  // Blue draws 0, red 3, blue 12, then red closes the top-left box with 13 and draws 1.
  const match = {
    board_size: 3,
    lines: [1, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    moves: [0, 3, 12, 13, 1],
  } as unknown as DotsAndBoxesMatch;

  it('rebuilds the board line by line, claiming a box for whoever drew its fourth side', () => {
    const before = positionAfter(match, 3);
    expect(before.lines.filter(Boolean)).toHaveLength(3);
    expect(before.lines[13]).toBe(0);
    expect(before.boxes[0]).toBe(0);
    const after = positionAfter(match, 4);
    expect(after.lines[13]).toBe(2);
    expect(after.boxes[0]).toBe(2);
    expect(getScore(after, 'red')).toBe(1);
    expect(getScore(after, 'blue')).toBe(0);
    expect(positionAfter(match, 5).lines).toEqual(match.lines);
  });

  it('starts from an empty board', () => {
    const start = positionAfter(match, 0);
    expect(start.lines.every((owner) => owner === 0)).toBe(true);
    expect(start.boxes).toEqual(Array(9).fill(0));
  });

  it('finds the lines of the most recent turn', () => {
    expect(lastTurnLines(match, 0)).toEqual([]);
    expect(lastTurnLines(match, 3)).toEqual([12]);
    expect(lastTurnLines(match, 4)).toEqual([13]);
    expect(lastTurnLines(match, 5)).toEqual([1, 13]);
  });
});

it('writes the final score with the winner first', () => {
  expect(getScoreLine({score_blue: 3, score_red: 6})).toBe('6–3');
  expect(getScoreLine({score_blue: 5, score_red: 4})).toBe('5–4');
  expect(getScoreLine({score_blue: 8, score_red: 8})).toBe('8–8');
});

it('formats clocks, rounding up so 0:00 only shows when time is gone', () => {
  expect(formatClock(900000)).toBe('15:00');
  expect(formatClock(59001)).toBe('1:00');
  expect(formatClock(1)).toBe('0:01');
  expect(formatClock(-5)).toBe('0:00');
});
