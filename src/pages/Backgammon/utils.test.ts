import {BackgammonBoard, BackgammonMove} from 'types/backgammon';

import {formatClock, matchingTurns, nextMoves, previewBoard} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

const first: BackgammonMove = {from: 5, to: 2, die: 3};
const second: BackgammonMove = {from: 2, to: 0, die: 2};
const alternative: BackgammonMove = {from: 5, to: 3, die: 2};

describe('backgammon turn previews', () => {
  it('only offers moves that complete one of the server-approved turns', () => {
    const turns = [
      [first, second],
      [alternative, {from: 3, to: 0, die: 3} as BackgammonMove],
    ];
    expect(nextMoves(turns, [])).toEqual([first, alternative]);
    expect(nextMoves(turns, [first])).toEqual([second]);
    expect(nextMoves(turns, [first, second])).toEqual([]);
    expect(matchingTurns(turns, [{...first, die: 2}])).toEqual([]);
  });

  it('retains distinct dice choices when both can bear off to the same destination', () => {
    const low: BackgammonMove = {from: 0, to: 'off', die: 1};
    const high: BackgammonMove = {from: 0, to: 'off', die: 6};
    expect(
      nextMoves(
        [
          [low, high],
          [high, low],
        ],
        [],
      ),
    ).toEqual([low, high]);
  });

  it('previews hitting, bar entry and bearing off without mutating the server board', () => {
    const board: BackgammonBoard = {points: Array(24).fill(0), bar: {white: 1, black: 0}, off: {white: 14, black: 0}};
    board.points[23] = -1;
    const original = JSON.stringify(board);
    const preview = previewBoard(board, 'white', [{from: 'bar', to: 23, die: 1}]);
    expect(preview.bar).toEqual({white: 0, black: 1});
    expect(preview.points[23]).toBe(1);
    expect(JSON.stringify(board)).toBe(original);

    const home = {points: Array(24).fill(0), bar: {white: 0, black: 0}, off: {white: 14, black: 0}};
    home.points[0] = 1;
    const finish = previewBoard(home, 'white', [{from: 0, to: 'off', die: 1}]);
    expect(finish.off.white).toBe(15);
    expect(finish.points[0]).toBe(0);
    expect(home.off.white).toBe(14);
  });

  it('previews black moves in the opposite direction', () => {
    const board: BackgammonBoard = {points: Array(24).fill(0), bar: {white: 0, black: 1}, off: {white: 0, black: 0}};
    board.points[1] = 1;
    const preview = previewBoard(board, 'black', [{from: 'bar', to: 1, die: 2}]);
    expect(preview.points[1]).toBe(-1);
    expect(preview.bar).toEqual({white: 1, black: 0});
  });

  it('represents a forced pass as a complete empty turn', () => {
    expect(matchingTurns([[]], [])).toEqual([[]]);
    expect(nextMoves([[]], [])).toEqual([]);
  });

  it('formats clocks without negative time', () => {
    expect(formatClock(60001)).toBe('1:01');
    expect(formatClock(-400)).toBe('0:00');
  });
});
