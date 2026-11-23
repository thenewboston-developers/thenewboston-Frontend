import {BackgammonBoard} from 'types/backgammon';

import {boardSignature, checkerPosition, reconcileCheckers} from './checkers';

const copyBoard = (board: BackgammonBoard): BackgammonBoard => ({
  points: [...board.points],
  bar: {...board.bar},
  off: {...board.off},
});
const emptyBoard = (): BackgammonBoard => ({
  points: Array(24).fill(0),
  bar: {white: 0, black: 0},
  off: {white: 0, black: 0},
});

describe('checker identities and travel positions', () => {
  it('moves only the top checker from a stack and returns that same checker on undo', () => {
    const start = emptyBoard();
    start.points[5] = 3;
    const initial = reconcileCheckers([], start, 'white');
    const top = initial.find((checker) => checker.slot === 2)!;
    const board = copyBoard(start);
    board.points[5] = 2;
    board.points[2] = 1;

    const moved = reconcileCheckers(initial, board, 'white');
    expect(moved.filter((checker) => checker.moved).map((checker) => checker.id)).toEqual([top.id]);
    expect(moved.find((checker) => checker.id === top.id)).toMatchObject({
      location: 2,
      slot: 0,
      ...checkerPosition('white', 2, 0, 'white'),
    });
    const undone = reconcileCheckers(moved, start, 'white');
    expect(undone.find((checker) => checker.id === top.id)).toMatchObject({location: 5, slot: 2, x: top.x, y: top.y});
    expect(initial.find((checker) => checker.id === top.id)).toEqual(top);
  });

  it('moves a captured checker to the bar while the attacking checker enters its point', () => {
    const start = emptyBoard();
    start.points[8] = 1;
    start.points[5] = -1;
    const initial = reconcileCheckers([], start, 'white');
    const board = emptyBoard();
    board.points[5] = 1;
    board.bar.black = 1;
    const moved = reconcileCheckers(initial, board, 'white');
    expect(moved.find((checker) => checker.side === 'white')).toMatchObject({id: 'white-0', location: 5, moved: true});
    expect(moved.find((checker) => checker.side === 'black')).toMatchObject({
      id: 'black-0',
      location: 'bar',
      moved: true,
      x: 446,
      y: 227,
    });
  });

  it('keeps checker identity when entering from the bar and bearing off, in either perspective', () => {
    const start = emptyBoard();
    start.bar.black = 1;
    const initial = reconcileCheckers([], start, 'black');
    expect(initial[0]).toMatchObject({x: 446, y: 413});
    const entered = emptyBoard();
    entered.points[23] = -1;
    const onBoard = reconcileCheckers(initial, entered, 'black');
    expect(onBoard[0]).toMatchObject({id: initial[0].id, location: 23, x: 821, y: 559});
    const finished = emptyBoard();
    finished.off.black = 1;
    expect(reconcileCheckers(onBoard, finished, 'black')[0]).toMatchObject({
      id: initial[0].id,
      location: 'off',
      x: 929,
      y: 442,
    });
    expect(reconcileCheckers(onBoard, finished, 'white')[0]).toMatchObject({
      id: initial[0].id,
      location: 'off',
      x: 929,
      y: 146,
    });
  });

  it('preserves every checker in overflow stacks and moves one from the visible stack top', () => {
    const start = emptyBoard();
    start.points[12] = 8;
    const initial = reconcileCheckers([], start, 'white');
    expect(initial).toHaveLength(8);
    expect(initial.filter((checker) => checker.y === 265)).toHaveLength(4);
    const board = copyBoard(start);
    board.points[12] = 7;
    board.points[9] = 1;
    const moved = reconcileCheckers(initial, board, 'white');
    expect(moved).toHaveLength(8);
    expect(moved.find((checker) => checker.moved)).toMatchObject({id: 'white-7', location: 9});
    expect(new Set(moved.map((checker) => checker.id)).size).toBe(8);
  });

  it('converges to rapid successive boards without duplicating or leaving behind checkers', () => {
    const start = emptyBoard();
    start.points[8] = 2;
    const initial = reconcileCheckers([], start, 'white');
    const middle = emptyBoard();
    middle.points[8] = 1;
    middle.points[5] = 1;
    const first = reconcileCheckers(initial, middle, 'white');
    const end = emptyBoard();
    end.points[8] = 1;
    end.points[2] = 1;
    const second = reconcileCheckers(first, end, 'white');
    const third = reconcileCheckers(second, start, 'white');
    expect(second.filter((checker) => checker.location === 2)).toHaveLength(1);
    expect(second.find((checker) => checker.location === 2)?.id).toBe(
      first.find((checker) => checker.location === 5)?.id,
    );
    expect(third).toHaveLength(2);
    expect(third.every((checker) => checker.location === 8)).toBe(true);
    expect(new Set(third.map((checker) => checker.id))).toEqual(new Set(initial.map((checker) => checker.id)));
  });

  it('reconciles an entire opponent turn while keeping unaffected stacks stationary', () => {
    const start = emptyBoard();
    start.points[8] = 1;
    start.points[12] = 2;
    start.points[5] = -1;
    start.points[0] = -14;
    start.off.white = 12;
    const initial = reconcileCheckers([], start, 'black');
    const after = copyBoard(start);
    after.points[8] = 0;
    after.points[12] = 1;
    after.points[6] = 1;
    after.points[5] = 1;
    after.bar.black = 1;

    const moved = reconcileCheckers(initial, after, 'black');
    expect(moved).toHaveLength(30);
    expect(new Set(moved.map((checker) => checker.id))).toEqual(new Set(initial.map((checker) => checker.id)));
    expect(moved.filter((checker) => checker.moved).map((checker) => checker.location)).toEqual(['bar', 5, 6]);
    expect(moved.filter((checker) => !checker.moved)).toEqual(
      initial.filter(
        (checker) =>
          checker.location === 0 || checker.location === 'off' || (checker.location === 12 && checker.slot === 0),
      ),
    );
  });

  it('recognizes identical polling boards and preserves stationary positions', () => {
    const board = emptyBoard();
    board.points[0] = 1;
    board.points[23] = -1;
    const initial = reconcileCheckers([], board, 'white');
    const repeated = copyBoard(board);
    expect(boardSignature(repeated)).toBe(boardSignature(board));
    expect(reconcileCheckers(initial, repeated, 'white')).toEqual(initial);
  });
});
