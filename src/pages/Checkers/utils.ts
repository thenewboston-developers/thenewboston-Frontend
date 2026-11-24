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
