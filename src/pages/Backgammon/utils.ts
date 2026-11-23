import axios from 'axios';

import {BackgammonBoard, BackgammonMatch, BackgammonMove, BackgammonSide} from 'types/backgammon';

export const INITIAL_BOARD: BackgammonBoard = {
  points: [-2, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, -5, 5, 0, 0, 0, -3, 0, -5, 0, 0, 0, 0, 2],
  bar: {white: 0, black: 0},
  off: {white: 0, black: 0},
};

export const formatClock = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409)
      return 'The match changed. We refreshed the board; please try your action again.';
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

export const getPlayerName = (match: BackgammonMatch, side: BackgammonSide): string => {
  return side === 'white' ? match.white.username : (match.black?.username ?? 'Computer');
};

export const getPlayerSide = (match: BackgammonMatch, selfId?: number | null): BackgammonSide | null => {
  if (selfId === match.white.id) return 'white';
  if (selfId === match.black?.id) return 'black';
  return null;
};

export const moveLabel = (move: BackgammonMove): string => {
  const source = move.from === 'bar' ? 'Bar' : move.from + 1;
  const destination = move.to === 'off' ? 'Off' : move.to + 1;
  return `${source} → ${destination} · die ${move.die}`;
};

export const sameMove = (left: BackgammonMove, right: BackgammonMove): boolean => {
  return left.from === right.from && left.to === right.to && left.die === right.die;
};

export const matchingTurns = (turns: BackgammonMove[][], moves: BackgammonMove[]): BackgammonMove[][] => {
  return turns.filter((turn) => moves.every((move, index) => !!turn[index] && sameMove(move, turn[index])));
};

export const nextMoves = (turns: BackgammonMove[][], moves: BackgammonMove[]): BackgammonMove[] => {
  const unique = new Map<string, BackgammonMove>();
  matchingTurns(turns, moves).forEach((turn) => {
    const move = turn[moves.length];
    if (move) unique.set(`${move.from}/${move.to}/${move.die}`, move);
  });
  return Array.from(unique.values());
};

// Only used to preview a prefix of a server-provided legal turn. The API validates the complete turn on submission.
export const previewBoard = (
  board: BackgammonBoard,
  side: BackgammonSide,
  moves: BackgammonMove[],
): BackgammonBoard => {
  const next = {points: [...board.points], bar: {...board.bar}, off: {...board.off}};
  const sign = side === 'white' ? 1 : -1;
  const opponent = side === 'white' ? 'black' : 'white';
  moves.forEach((move) => {
    if (move.from === 'bar') next.bar[side] -= 1;
    else next.points[move.from] -= sign;
    if (move.to === 'off') next.off[side] += 1;
    else {
      if (next.points[move.to] === -sign) {
        next.points[move.to] = 0;
        next.bar[opponent] += 1;
      }
      next.points[move.to] += sign;
    }
  });
  return next;
};
