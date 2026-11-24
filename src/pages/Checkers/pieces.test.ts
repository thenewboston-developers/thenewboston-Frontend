import {CheckersPiece} from 'types/checkers';

import {
  advanceBoard,
  captureDelays,
  findBoardChange,
  routeDuration,
  routeKeyframes,
  squarePosition,
  trackBoard,
} from './pieces';
import {INITIAL_BOARD, previewBoard} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

const emptyBoard = (pieces: Record<number, CheckersPiece>): CheckersPiece[] => {
  const board: CheckersPiece[] = Array(64).fill(0);
  Object.entries(pieces).forEach(([index, piece]) => {
    board[Number(index)] = piece;
  });
  return board;
};

describe('Checkers piece tracking', () => {
  it('recognizes a simple move and keeps the moving piece identity', () => {
    const next = previewBoard(INITIAL_BOARD, [40, 33]);
    expect(findBoardChange(INITIAL_BOARD, next, [])).toEqual({captured: [], from: 40, route: [40, 33], to: 33});
    const tracked = trackBoard(INITIAL_BOARD);
    const advanced = advanceBoard(tracked, next, [[40, 33]]);
    expect(advanced.ids[33]).toBe(tracked.ids[40]);
    expect(advanced.ids[40]).toBe(0);
    expect(advanced.transition).toMatchObject({crowned: false, from: 40, id: tracked.ids[40], to: 33});
    expect(advanced.entering).toEqual([]);
    expect(advanced.exiting).toEqual([]);
  });

  it('follows a double jump along the route it took and removes the captured pieces', () => {
    const board = emptyBoard({35: -1, 21: -1, 42: 1});
    const next = previewBoard(board, [42, 28, 14]);
    const tracked = trackBoard(board);
    const advanced = advanceBoard(tracked, next, [[42, 28, 14]]);
    expect(advanced.transition).toMatchObject({captured: [21, 35], from: 42, route: [42, 28, 14], to: 14});
    expect(advanced.exiting.map(({index}) => index).sort()).toEqual([21, 35]);
    expect(captureDelays([42, 28, 14], false)).toEqual({35: 135, 21: 435});
  });

  it('runs an undo backwards along the route and brings the captured piece back', () => {
    const board = emptyBoard({35: -1, 21: -1, 42: 1});
    const jumped = previewBoard(board, [42, 28]);
    expect(findBoardChange(jumped, board, [[42, 28]])).toEqual({captured: [], from: 28, route: [28, 42], to: 42});
    const advanced = advanceBoard(advanceBoard(trackBoard(board), jumped, [[42, 28]]), board, [[42]]);
    expect(advanced.entering).toHaveLength(1);
    expect(advanced.board[35]).toBe(-1);
  });

  it('animates a king capture loop that ends on its starting square', () => {
    const board = emptyBoard({17: -1, 19: -1, 33: -1, 35: -1, 42: 2});
    const route = [42, 24, 10, 28, 42];
    const next = previewBoard(board, route);
    expect(findBoardChange(board, next, [route])).toEqual({captured: [17, 19, 33, 35], from: 42, route, to: 42});
    expect(findBoardChange(board, next, [])).toBeNull();
  });

  it('marks a man that reaches the far row as crowned', () => {
    const board = emptyBoard({12: -1, 19: 1});
    const advanced = advanceBoard(trackBoard(board), previewBoard(board, [19, 5]), [[19, 5]]);
    expect(advanced.transition?.crowned).toBe(true);
  });

  it('does not guess when several moves happened between two snapshots', () => {
    const next = previewBoard(previewBoard(INITIAL_BOARD, [40, 33]), [17, 24]);
    expect(findBoardChange(INITIAL_BOARD, next, [[17, 24]])).toBeNull();
    const tracked = trackBoard(INITIAL_BOARD);
    const advanced = advanceBoard(tracked, next, [[17, 24]]);
    expect(advanced.transition).toBeNull();
    expect(advanced.entering).toHaveLength(2);
    expect(advanced.exiting).toHaveLength(2);
    expect(advanced.ids[42]).toBe(tracked.ids[42]);
  });

  it('flips square positions for the charcoal player and lifts jumps over the captured square', () => {
    expect(squarePosition(40, 'white')).toEqual({column: 0, row: 5});
    expect(squarePosition(40, 'black')).toEqual({column: 7, row: 2});
    const frames = routeKeyframes([42, 28], 'white', false);
    expect(frames.map(({transform}) => transform)).toEqual([
      'translate(200%, 500%)',
      'translate(300%, 400%) scale(1.2)',
      'translate(400%, 300%)',
    ]);
    expect(routeDuration([40, 33], true)).toBeGreaterThan(routeDuration([40, 33], false));
  });
});
