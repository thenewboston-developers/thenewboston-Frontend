import axios from 'axios';

import {CheckersMatch, CheckersPiece, CheckersSide} from 'types/checkers';

export const INITIAL_BOARD: CheckersPiece[] = Array.from({length: 64}, (_, index) => {
  const row = Math.floor(index / 8);
  if ((row + (index % 8)) % 2 === 0) return 0;
  if (row < 3) return -1;
  return row > 4 ? 1 : 0;
});

export const cellLabel = (index: number): string =>
  `${String.fromCharCode(97 + (index % 8))}${8 - Math.floor(index / 8)}`;

export const countPieces = (board: CheckersPiece[], side: CheckersSide): number =>
  board.filter((piece) => (side === 'white' ? piece > 0 : piece < 0)).length;

export const formatClock = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) return 'The match changed. The board has been refreshed; please try again.';
    if (error.response?.status === 404)
      return 'This match is unavailable. Pending challenges are visible only to their players.';
    const data = error.response?.data;
    if (data && typeof data === 'object') {
      const messages = Object.values(data)
        .flat()
        .filter((value) => typeof value === 'string');
      if (messages.length) return messages.join(' ');
    }
  }
  return 'We could not reach the game. Please try again.';
};

export const getPlayerName = (match: CheckersMatch, side: CheckersSide): string =>
  match[side]?.username ?? match.computer_name ?? 'Computer';

export const isCapture = (path: number[]): boolean =>
  path.length > 1 && Math.abs(Math.floor(path[0] / 8) - Math.floor(path[1] / 8)) === 2;

export const matchingMoves = (moves: number[][], path: number[]): number[][] =>
  moves.filter((move) => path.every((cell, index) => cell === move[index]));

/**
 * The selected path extended to `square`, which may be the next landing or a later landing of the same jump chain
 * (dropping a piece on the end of a double jump plays both jumps). Returns null when the square is not reachable or
 * when two different routes reach it, so a dropped piece never takes a route the player did not see.
 */
export const extendPath = (moves: number[][], path: number[], square: number): number[] | null => {
  const candidates = matchingMoves(moves, path);
  // A gold dot (the next landing) always wins over a longer route through the same square
  if (candidates.some((move) => move[path.length] === square)) return [...path, square];
  const routes = new Set<string>();
  candidates.forEach((move) => {
    const landing = move.indexOf(square, path.length);
    if (landing >= path.length) routes.add(move.slice(0, landing + 1).join(','));
  });
  if (routes.size !== 1) return null;
  return Array.from(routes)[0].split(',').map(Number);
};

// This is only a local preview. The server validates and commits the complete turn.
export const previewBoard = (board: CheckersPiece[], path: number[]): CheckersPiece[] => {
  const next = [...board];
  for (let index = 1; index < path.length; index += 1) {
    const from = path[index - 1];
    const to = path[index];
    const piece = next[from];
    next[from] = 0;
    if (isCapture([from, to])) next[(from + to) / 2] = 0;
    next[to] = piece;
  }
  if (path.length > 1) {
    const last = path[path.length - 1];
    if (next[last] === 1 && last < 8) next[last] = 2;
    if (next[last] === -1 && last >= 56) next[last] = -2;
  }
  return next;
};
