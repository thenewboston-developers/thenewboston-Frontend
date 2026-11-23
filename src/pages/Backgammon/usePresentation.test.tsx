import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {BackgammonBoard, BackgammonMatch} from 'types/backgammon';

import usePresentation from './usePresentation';
import {INITIAL_BOARD, previewBoard} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let presentation: ReturnType<typeof usePresentation>;
let root: Root;
const playSound = jest.fn();
const move = {from: 12, to: 8, die: 4};
const createMatch = (changes: Partial<BackgammonMatch> = {}): BackgammonMatch =>
  ({
    id: 1,
    game_number: 1,
    phase: 'awaiting_roll',
    active_side: 'white',
    version: 1,
    dice: [],
    board: INITIAL_BOARD,
    last_turn: null,
    white: {id: 11, username: 'Alice'},
    black: null,
    ...changes,
  }) as BackgammonMatch;

const Probe = ({board, match}: {board: BackgammonBoard; match: BackgammonMatch}) => {
  presentation = usePresentation(match, board, playSound);
  return null;
};
const render = (match: BackgammonMatch, board = match.board) => {
  act(() => root.render(<Probe board={board} match={match} />));
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  playSound.mockClear();
  Object.defineProperty(document, 'hidden', {configurable: true, value: false});
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  Object.defineProperty(document, 'hidden', {configurable: true, value: false});
});

it('loads an existing roll silently and ignores identical polling snapshots', () => {
  const match = createMatch({dice: [3, 4], phase: 'moving'});
  render(match);
  render({...match, server_time: new Date().toISOString(), board: {...match.board}});
  expect(playSound).not.toHaveBeenCalled();
  expect(presentation.animateDice).toBe(false);
});

it('animates two separate rolls with identical values as separate events', () => {
  render(createMatch());
  render(createMatch({dice: [3, 4], phase: 'moving', version: 2}));
  const firstKey = presentation.rollKey;
  expect(presentation.animateDice).toBe(true);
  render(createMatch({version: 4}));
  render(createMatch({dice: [3, 4], phase: 'moving', version: 5}));
  expect(presentation.rollKey).not.toBe(firstKey);
  expect(playSound.mock.calls.filter(([sound]) => sound === 'dice')).toHaveLength(2);
});

it('plays previews and undo once and does not replay a confirmed preview', () => {
  const match = createMatch({dice: [3, 4], phase: 'moving'});
  const preview = previewBoard(match.board, 'white', [move]);
  render(match);
  render(match, preview);
  render(match, match.board);
  render(match, preview);
  expect(playSound.mock.calls).toEqual([
    ['move', 0],
    ['move', 0],
    ['move', 0],
  ]);
  playSound.mockClear();
  render(
    createMatch({board: preview, version: 2, last_turn: {version: 2, side: 'white', dice: [3, 4], moves: [move]}}),
  );
  expect(playSound).not.toHaveBeenCalled();
  expect(presentation.animateDice).toBe(false);
  expect(presentation.diceLabel).toBe('Alice’s last roll');
});

it('uses the actual completed computer roll when the entire turn happened between polls', () => {
  render(createMatch({active_side: 'black'}));
  const board = previewBoard(INITIAL_BOARD, 'black', [{from: 11, to: 15, die: 4}]);
  const updated = createMatch({
    board,
    version: 2,
    last_turn: {version: 2, side: 'black', dice: [4, 2], moves: [{from: 11, to: 15, die: 4}]},
  });
  render(updated);
  expect(presentation.dice).toEqual([4, 2]);
  expect(presentation.diceLabel).toBe('Computer’s last roll');
  expect(presentation.animateDice).toBe(true);
  expect(playSound.mock.calls).toEqual([['dice'], ['move', 220]]);
  render({...updated, last_turn: {...updated.last_turn!}});
  expect(playSound).toHaveBeenCalledTimes(2);
});

it('does not invent a roll when talking to an older backend', () => {
  render(createMatch({active_side: 'black'}));
  render(createMatch({board: previewBoard(INITIAL_BOARD, 'black', [{from: 11, to: 15, die: 4}]), version: 2}));
  expect(presentation.dice).toEqual([]);
  expect(playSound.mock.calls).toEqual([['move', 0]]);
});

it('distinguishes captures and bearing off from ordinary moves', () => {
  const board = {points: Array(24).fill(0), bar: {white: 0, black: 0}, off: {white: 14, black: 14}};
  board.points[3] = 1;
  board.points[1] = -1;
  const match = createMatch({board});
  render(match);
  const captured = previewBoard(board, 'white', [{from: 3, to: 1, die: 2}]);
  render(match, captured);
  render(match, previewBoard(captured, 'white', [{from: 1, to: 'off', die: 2}]));
  expect(playSound.mock.calls).toEqual([
    ['capture', 0],
    ['bearOff', 0],
  ]);
});

it('starts the next game with a roll but no resetting-board sound', () => {
  render(createMatch({phase: 'game_over', board: {...INITIAL_BOARD, off: {white: 15, black: 0}}}));
  render(createMatch({game_number: 2, version: 9, phase: 'moving', dice: [5, 1]}));
  expect(playSound.mock.calls).toEqual([['dice']]);
  expect(presentation.animateDice).toBe(true);
});

it('drops hidden-tab events and does not replay them when visible again', () => {
  render(createMatch());
  Object.defineProperty(document, 'hidden', {configurable: true, value: true});
  const match = createMatch({dice: [3, 4], phase: 'moving', version: 2});
  render(match);
  Object.defineProperty(document, 'hidden', {configurable: true, value: false});
  render({...match});
  expect(playSound).not.toHaveBeenCalled();
  expect(presentation.animateDice).toBe(false);
});

it('animates the true opening computer roll even when it completed before the new-game poll', () => {
  render(createMatch({phase: 'game_over'}));
  render(
    createMatch({
      game_number: 2,
      version: 10,
      last_turn: {version: 10, side: 'black', dice: [2, 6], moves: []},
    }),
  );
  expect(presentation.dice).toEqual([2, 6]);
  expect(presentation.animateDice).toBe(true);
  expect(playSound.mock.calls).toEqual([['dice']]);
});
