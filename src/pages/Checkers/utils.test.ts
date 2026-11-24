import {INITIAL_BOARD, matchingMoves, previewBoard} from './utils';

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
