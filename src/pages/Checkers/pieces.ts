import {CheckersPiece, CheckersSide} from 'types/checkers';

import {isCapture} from './utils';

export interface BoardChange {
  // Opposing pieces taken during the move; they fade out as the mover passes them
  captured: number[];
  from: number;
  route: number[];
  to: number;
}

export interface ExitingPiece {
  id: number;
  index: number;
  piece: CheckersPiece;
}

export interface PieceTransition extends BoardChange {
  crowned: boolean;
  id: number;
  serial: number;
}

export interface TrackedBoard {
  board: CheckersPiece[];
  entering: number[];
  exiting: ExitingPiece[];
  ids: number[];
  key: string;
  nextId: number;
  serial: number;
  transition: PieceTransition | null;
}

const HOP_MS = 210;
const JUMP_MS = 300;
const OPPONENT_SLOWDOWN = 1.3;

export const boardKey = (board: CheckersPiece[]): string => board.join(',');

const findRoute = (routes: number[][], from: number, to: number): number[] | null => {
  for (const route of [...routes, ...routes.map((candidate) => [...candidate].reverse())]) {
    const start = route.indexOf(from);
    const end = start < 0 ? -1 : route.indexOf(to, start + 1);
    if (end > start) return route.slice(start, end + 1);
  }
  return null;
};

/**
 * Works out which piece moved between two boards so it can travel instead of reappearing. Only a single move is
 * recognized (one piece of one color changed squares, opposing pieces vanished or came back), which covers previews,
 * undo, the player's own move and an opponent's move. Anything else (a new match, several moves between two polls)
 * returns null and the board simply changes.
 */
export const findBoardChange = (
  previous: CheckersPiece[],
  next: CheckersPiece[],
  routes: number[][],
): BoardChange | null => {
  const removed: number[] = [];
  const added: number[] = [];
  previous.forEach((piece, index) => {
    if (piece && Math.sign(piece) !== Math.sign(next[index])) removed.push(index);
    if (next[index] && Math.sign(next[index]) !== Math.sign(piece)) added.push(index);
  });
  const movers = [1, -1].filter(
    (color) =>
      removed.filter((index) => Math.sign(previous[index]) === color).length === 1 &&
      added.filter((index) => Math.sign(next[index]) === color).length === 1,
  );
  if (movers.length === 1) {
    const color = movers[0];
    const from = removed.find((index) => Math.sign(previous[index]) === color)!;
    const to = added.find((index) => Math.sign(next[index]) === color)!;
    if (removed.some((index) => index !== from && Math.sign(previous[index]) === color)) return null;
    if (added.some((index) => index !== to && Math.sign(next[index]) === color)) return null;
    return {
      captured: removed.filter((index) => index !== from),
      from,
      route: findRoute(routes, from, to) ?? [from, to],
      to,
    };
  }
  // A king can capture in a loop and finish on the square it started from
  if (movers.length || !removed.length || added.length) return null;
  const color = Math.sign(previous[removed[0]]);
  if (removed.some((index) => Math.sign(previous[index]) !== color)) return null;
  const loop = routes.find(
    (route) =>
      route.length > 2 &&
      route[0] === route[route.length - 1] &&
      Math.sign(previous[route[0]]) === -color &&
      Math.sign(next[route[0]]) === -color,
  );
  return loop ? {captured: removed, from: loop[0], route: loop, to: loop[0]} : null;
};

export const trackBoard = (board: CheckersPiece[]): TrackedBoard => {
  let nextId = 1;
  const ids = board.map((piece) => {
    if (!piece) return 0;
    nextId += 1;
    return nextId - 1;
  });
  return {board, entering: [], exiting: [], ids, key: boardKey(board), nextId, serial: 0, transition: null};
};

// Pure, so React may safely call it again while rendering
export const advanceBoard = (tracked: TrackedBoard, board: CheckersPiece[], routes: number[][]): TrackedBoard => {
  const change = findBoardChange(tracked.board, board, routes);
  const entering: number[] = [];
  let {nextId} = tracked;
  const ids = board.map((piece, index) => {
    if (!piece) return 0;
    if (change && index === change.to) return tracked.ids[change.from];
    const previous = tracked.board[index];
    if (previous && Math.sign(previous) === Math.sign(piece) && index !== change?.from) return tracked.ids[index];
    entering.push(nextId);
    nextId += 1;
    return nextId - 1;
  });
  const kept = new Set(ids);
  const exiting = tracked.board.flatMap((piece, index) =>
    piece && !kept.has(tracked.ids[index]) ? [{id: tracked.ids[index], index, piece}] : [],
  );
  const serial = tracked.serial + 1;
  return {
    board,
    entering,
    exiting,
    ids,
    key: boardKey(board),
    nextId,
    serial,
    transition: change
      ? {
          ...change,
          crowned: Math.abs(tracked.board[change.from]) === 1 && Math.abs(board[change.to]) === 2,
          id: ids[change.to],
          serial,
        }
      : null,
  };
};

// Square index -> grid position on screen, with the player's own pieces always at the bottom
export const squarePosition = (index: number, side: CheckersSide): {column: number; row: number} => {
  const display = side === 'black' ? 63 - index : index;
  return {column: display % 8, row: Math.floor(display / 8)};
};

export const squareTransform = (index: number, side: CheckersSide, scale = 1): string => {
  const {column, row} = squarePosition(index, side);
  return `translate(${column * 100}%, ${row * 100}%)${scale === 1 ? '' : ` scale(${scale})`}`;
};

export const hopDurations = (route: number[], opponent: boolean): number[] =>
  route
    .slice(1)
    .map((to, hop) =>
      Math.round((isCapture([route[hop], to]) ? JUMP_MS : HOP_MS) * (opponent ? OPPONENT_SLOWDOWN : 1)),
    );

// One keyframe per landing; captures lift the piece over the jumped square
export const routeKeyframes = (route: number[], side: CheckersSide, opponent: boolean): Keyframe[] => {
  const durations = hopDurations(route, opponent);
  const total = durations.reduce((sum, duration) => sum + duration, 0);
  const frames: Keyframe[] = [{easing: 'ease-in-out', offset: 0, transform: squareTransform(route[0], side, 1)}];
  let elapsed = 0;
  durations.forEach((duration, hop) => {
    const from = squarePosition(route[hop], side);
    const to = squarePosition(route[hop + 1], side);
    const lift = isCapture([route[hop], route[hop + 1]]) ? 1.2 : 1.08;
    frames.push({
      easing: 'ease-in-out',
      offset: (elapsed + duration / 2) / total,
      transform: `translate(${((from.column + to.column) / 2) * 100}%, ${((from.row + to.row) / 2) * 100}%) scale(${lift})`,
    });
    elapsed += duration;
    frames.push({easing: 'ease-in-out', offset: elapsed / total, transform: squareTransform(route[hop + 1], side, 1)});
  });
  return frames;
};

// When each captured piece should vanish: as the mover passes over it
export const captureDelays = (route: number[], opponent: boolean): Record<number, number> => {
  const durations = hopDurations(route, opponent);
  const delays: Record<number, number> = {};
  let elapsed = 0;
  durations.forEach((duration, hop) => {
    if (isCapture([route[hop], route[hop + 1]])) delays[(route[hop] + route[hop + 1]) / 2] = elapsed + duration * 0.45;
    elapsed += duration;
  });
  return delays;
};

export const routeDuration = (route: number[], opponent: boolean): number =>
  hopDurations(route, opponent).reduce((sum, duration) => sum + duration, 0);
