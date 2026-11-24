import {ReversiMatch} from 'types/reversi';

import {
  formatClock,
  getErrorMessage,
  getOpponent,
  getPiece,
  getPlayerName,
  getPlayerSide,
  hasSquare,
  INITIAL_BOARD,
  squareName,
} from './utils';

jest.mock('axios', () => ({isAxiosError: (error: {isAxiosError?: boolean}) => !!error?.isAxiosError}));

const match = {
  black: {id: 11, username: 'Alice', avatar: null},
  computer_name: 'Computer',
  white: null,
} as ReversiMatch;

describe('reversi utilities', () => {
  it('reads the stored board', () => {
    expect(getPiece(INITIAL_BOARD, 3, 3)).toBe('white');
    expect(getPiece(INITIAL_BOARD, 3, 4)).toBe('black');
    expect(getPiece(INITIAL_BOARD, 0, 0)).toBeNull();
    expect(getPiece(INITIAL_BOARD, 9, 0)).toBeNull();
  });

  it('names squares in standard notation', () => {
    expect(squareName(0, 0)).toBe('a1');
    expect(squareName(2, 3)).toBe('d3');
    expect(squareName(7, 7)).toBe('h8');
  });

  it('finds a square in a move list', () => {
    expect(hasSquare([[2, 3]], 2, 3)).toBe(true);
    expect(hasSquare([[2, 3]], 3, 2)).toBe(false);
    expect(hasSquare(undefined, 2, 3)).toBe(false);
  });

  it('names the computer when a color has no member', () => {
    expect(getPlayerName(match, 'black')).toBe('Alice');
    expect(getPlayerName(match, 'white')).toBe('Computer');
  });

  it('finds the color a member plays and treats everyone else as a spectator', () => {
    expect(getPlayerSide(match, 11)).toBe('black');
    expect(getPlayerSide(match, 12)).toBeNull();
    expect(getPlayerSide(match, null)).toBeNull();
    expect(getPlayerSide(match, undefined)).toBeNull();
    expect(getOpponent('black')).toBe('white');
  });

  it('formats clocks and never shows negative time', () => {
    expect(formatClock(900000)).toBe('15:00');
    expect(formatClock(61001)).toBe('1:02');
    expect(formatClock(-5)).toBe('0:00');
  });

  it('explains conflicts, missing matches and validation errors', () => {
    const error = (status: number, data?: unknown) => ({isAxiosError: true, response: {data, status}});
    expect(getErrorMessage(error(409))).toContain('The match changed');
    expect(getErrorMessage(error(404))).toContain('could not be found');
    expect(getErrorMessage(error(400, {message: 'Wait for your turn.'}))).toBe('Wait for your turn.');
    expect(getErrorMessage(error(400, {opponent_id: ['Choose an opponent.']}))).toBe('Choose an opponent.');
    expect(getErrorMessage(new Error('offline'))).toContain('could not reach the game');
  });
});
