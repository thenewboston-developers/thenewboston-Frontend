import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {MancalaMatch, MancalaRecentMove} from 'types/mancala';

import usePresentation from './usePresentation';
import {INITIAL_BOARD} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let presentation: ReturnType<typeof usePresentation>;
let root: Root;

const AFTER_HOST = [4, 4, 0, 5, 5, 5, 1, 4, 4, 4, 4, 4, 4, 0];
const AFTER_GUEST = [4, 4, 0, 5, 5, 5, 1, 4, 4, 0, 5, 5, 5, 1];
const hostMove: MancalaRecentMove = {
  board: AFTER_HOST,
  captured: 0,
  extra_turn: true,
  last: 6,
  pit: 2,
  side: 'host',
  stones: 4,
  swept: null,
  version: 2,
};
const guestMove: MancalaRecentMove = {...hostMove, board: AFTER_GUEST, last: 13, side: 'guest', version: 3};

const createMatch = (changes: Partial<MancalaMatch> = {}): MancalaMatch =>
  ({board: INITIAL_BOARD, id: 1, recent_moves: [], version: 1, ...changes}) as MancalaMatch;

const Probe = ({match}: {match?: MancalaMatch}) => {
  presentation = usePresentation(match);
  return null;
};
const render = (match?: MancalaMatch) => act(() => root.render(<Probe match={match} />));
const advance = (milliseconds: number) => act(() => jest.advanceTimersByTime(milliseconds));
const setReducedMotion = (matches: boolean) =>
  Object.defineProperty(window, 'matchMedia', {configurable: true, value: () => ({matches})});

beforeEach(() => {
  jest.useFakeTimers();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  Object.defineProperty(document, 'hidden', {configurable: true, value: false});
  setReducedMotion(false);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
  Object.defineProperty(document, 'hidden', {configurable: true, value: false});
});

it('shows the first snapshot of a match as it is, even when moves were already played', () => {
  render(createMatch({board: AFTER_HOST, recent_moves: [hostMove], version: 2}));
  expect(presentation.board).toEqual(AFTER_HOST);
  expect(presentation.frame).toBeNull();
  expect(presentation.isBusy).toBe(false);
});

it('ignores polls that bring no new version', () => {
  render(createMatch());
  render(createMatch({server_time: '2026-11-23T12:00:00Z'}));
  expect(presentation.board).toEqual(INITIAL_BOARD);
  expect(presentation.isBusy).toBe(false);
});

it('plays a new move one stone at a time and stays busy until the last stone', () => {
  render(createMatch());
  render(createMatch({board: AFTER_HOST, recent_moves: [hostMove], version: 2}));
  expect(presentation.isBusy).toBe(true);
  expect(presentation.frame?.kind).toBe('lift');
  expect(presentation.shownVersion).toBe(1);
  expect(presentation.board).toEqual([4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]);
  advance(260);
  expect(presentation.frame?.marked).toEqual([3]);
  expect(presentation.board).toEqual([4, 4, 0, 5, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]);
  expect(presentation.isBusy).toBe(true);
  advance(5000);
  expect(presentation.board).toEqual(AFTER_HOST);
  expect(presentation.frame).toBeNull();
  expect(presentation.isBusy).toBe(false);
  expect(presentation.shownVersion).toBe(2);
});

it('skips ahead to the newest moves when a viewer has fallen far behind', () => {
  // Eight quick moves, each the reverse of the one before, would take far longer to show than the limit allows
  const moves = Array.from({length: 8}, (_, index) => ({
    ...hostMove,
    board: index % 2 ? INITIAL_BOARD : AFTER_HOST,
    version: index + 2,
  }));
  render(createMatch());
  render(createMatch({board: INITIAL_BOARD, recent_moves: moves, version: 9}));
  const shown = new Set<number>();
  let elapsed = 0;
  for (; elapsed < 20000 && presentation.isBusy; elapsed += 50) {
    if (presentation.frame) shown.add(presentation.frame.version);
    advance(50);
  }
  expect(elapsed).toBeLessThanOrEqual(5500);
  expect(shown.has(9)).toBe(true);
  expect(shown.has(2)).toBe(false);
  expect(presentation.board).toEqual(INITIAL_BOARD);
  expect(presentation.shownVersion).toBe(9);
});

it('replays every move the computer made between two polls, in order', () => {
  const boards: number[][] = [];
  render(createMatch());
  render(createMatch({board: AFTER_GUEST, recent_moves: [hostMove, guestMove], version: 3}));
  for (let elapsed = 0; elapsed < 6000 && presentation.isBusy; elapsed += 50) {
    if (presentation.frame && presentation.board) boards.push(presentation.board);
    advance(50);
  }
  expect(boards).toContainEqual(AFTER_HOST);
  expect(boards.findIndex((board) => board[13] === 1)).toBeGreaterThan(
    boards.findIndex((board) => board[6] === 1 && board[9] === 4),
  );
  expect(presentation.board).toEqual(AFTER_GUEST);
  expect(presentation.isBusy).toBe(false);
});

it('continues with a move that arrives while another is still being shown', () => {
  render(createMatch());
  render(createMatch({board: AFTER_HOST, recent_moves: [hostMove], version: 2}));
  advance(300);
  render(createMatch({board: AFTER_GUEST, recent_moves: [hostMove, guestMove], version: 3}));
  expect(presentation.frame?.side).toBe('host');
  advance(1500);
  expect(presentation.frame?.side).toBe('guest');
  expect(presentation.isBusy).toBe(true);
  advance(5000);
  expect(presentation.board).toEqual(AFTER_GUEST);
  expect(presentation.isBusy).toBe(false);
});

it('finishes on the current board when the last change is not a move', () => {
  render(createMatch());
  // The move at version 2 was followed by a resignation at version 3
  render(createMatch({board: AFTER_HOST, recent_moves: [hostMove], status: 'finished', version: 3}));
  expect(presentation.isBusy).toBe(true);
  advance(5000);
  expect(presentation.board).toEqual(AFTER_HOST);
  expect(presentation.isBusy).toBe(false);
});

it.each([
  ['the moves in between are no longer described', {recent_moves: [guestMove]}, false, false],
  ['there are no moves to show', {recent_moves: []}, false, false],
  ['the tab is hidden', {recent_moves: [hostMove, guestMove]}, true, false],
  ['the visitor prefers reduced motion', {recent_moves: [hostMove, guestMove]}, false, true],
])('jumps straight to the current board when %s', (_, changes, hidden, reducedMotion) => {
  render(createMatch());
  Object.defineProperty(document, 'hidden', {configurable: true, value: hidden});
  setReducedMotion(reducedMotion as boolean);
  render(createMatch({board: AFTER_GUEST, version: 3, ...(changes as Partial<MancalaMatch>)}));
  expect(presentation.board).toEqual(AFTER_GUEST);
  expect(presentation.frame).toBeNull();
  expect(presentation.isBusy).toBe(false);
});

it('never shows one match’s stones on another match', () => {
  render(createMatch());
  render(createMatch({board: AFTER_HOST, recent_moves: [hostMove], version: 2}));
  advance(300);
  render(createMatch({board: INITIAL_BOARD, id: 2, version: 7}));
  expect(presentation.board).toEqual(INITIAL_BOARD);
  expect(presentation.frame).toBeNull();
  advance(5000);
  expect(presentation.board).toEqual(INITIAL_BOARD);
  expect(presentation.isBusy).toBe(false);
});
