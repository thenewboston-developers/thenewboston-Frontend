import axios from 'axios';

import {ReversiMatch, ReversiSide, ReversiSquare} from 'types/reversi';

export const BOARD_SIZE = 8;

export const INITIAL_BOARD = [
  '........',
  '........',
  '........',
  '...wb...',
  '...bw...',
  '........',
  '........',
  '........',
];

export const SIDE_LABELS: Record<ReversiSide, string> = {black: 'Black', white: 'White'};

export const formatClock = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) return 'The match changed. We refreshed the board; please try again.';
    if (error.response?.status === 404) return 'This match could not be found.';
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

export const getOpponent = (side: ReversiSide): ReversiSide => (side === 'black' ? 'white' : 'black');

export const getPlayerName = (match: ReversiMatch, side: ReversiSide): string => {
  return match[side]?.username ?? match.computer_name ?? 'Computer';
};

export const getPlayerSide = (match: ReversiMatch, selfId?: number | null): ReversiSide | null => {
  if (selfId === undefined || selfId === null) return null;
  if (selfId === match.black?.id) return 'black';
  if (selfId === match.white?.id) return 'white';
  return null;
};

export const getPiece = (board: string[], row: number, column: number): ReversiSide | null => {
  const piece = board[row]?.[column];
  if (piece === 'b') return 'black';
  return piece === 'w' ? 'white' : null;
};

export const hasSquare = (squares: ReversiSquare[] | undefined, row: number, column: number): boolean => {
  return !!squares?.some(([squareRow, squareColumn]) => squareRow === row && squareColumn === column);
};

// Standard notation: columns a to h from the left, rows 1 to 8 from the top
export const squareName = (row: number, column: number): string => `${String.fromCharCode(97 + column)}${row + 1}`;
