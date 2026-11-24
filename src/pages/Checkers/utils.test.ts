import {CheckersPiece} from 'types/checkers';

import {countPieces, extendPath, INITIAL_BOARD, matchingMoves, previewBoard} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

describe('Checkers move previews', () => {
  it('starts with twelve pieces per side on playable dark squares', () => {
    expect(INITIAL_BOARD.filter((piece) => piece === 1)).toHaveLength(12);
    expect(INITIAL_BOARD.filter((piece) => piece === -1)).toHaveLength(12);
    expect(INITIAL_BOARD.every((piece, index) => !piece || (Math.floor(index / 8) + (index % 8)) % 2 === 1)).toBe(true);
  });

  it('filters branching capture routes by the entire selected prefix', () => {
    const moves = [
      [42, 28, 10],
      [42, 28, 14],
      [42, 24, 10],
    ];
    expect(matchingMoves(moves, [42, 28])).toEqual([
      [42, 28, 10],
      [42, 28, 14],
    ]);
    expect(matchingMoves(moves, [42, 28, 14])).toEqual([[42, 28, 14]]);
  });

  it('extends a selected route to a dropped landing only when the route there is unambiguous', () => {
    const moves = [
      [42, 28, 10],
      [42, 28, 14],
      [40, 33],
    ];
    expect(extendPath(moves, [42], 28)).toEqual([42, 28]);
    expect(extendPath(moves, [42], 14)).toEqual([42, 28, 14]);
    expect(extendPath(moves, [42, 28], 10)).toEqual([42, 28, 10]);
    expect(extendPath(moves, [42], 33)).toBeNull();
    expect(
      extendPath(
        [
          [42, 28, 14],
          [42, 24, 10, 28, 14],
        ],
        [42],
        14,
      ),
    ).toBeNull();
    expect(
      extendPath(
        [
          [42, 28, 14],
          [42, 24, 10, 28, 14],
        ],
        [42],
        28,
      ),
    ).toEqual([42, 28]);
  });

  it('counts the pieces left for each side', () => {
    expect(countPieces(INITIAL_BOARD, 'white')).toBe(12);
    expect(countPieces([2, -1, 0, -2, 1] as CheckersPiece[], 'black')).toBe(2);
  });

  it('removes captures and crowns without mutating the authoritative board', () => {
    const board = [...INITIAL_BOARD].fill(0);
    board[19] = 1;
    board[12] = -1;
    const preview = previewBoard(board, [19, 5]);
    expect(preview[5]).toBe(2);
    expect(preview[12]).toBe(0);
    expect(preview[19]).toBe(0);
    expect(board[19]).toBe(1);
    expect(board[12]).toBe(-1);
  });
});
