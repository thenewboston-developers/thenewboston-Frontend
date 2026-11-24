import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import useArcadeSounds from 'hooks/useArcadeSounds';
import {ConnectFiveMatch} from 'types';

import useMatchSounds from './useMatchSounds';

jest.mock('hooks/useArcadeSounds');
(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let match: ConnectFiveMatch;
let ready: boolean;
let root: Root;
let soundEnabled: boolean;
let viewerId: number;
const playSound = jest.fn();
const toggleSound = jest.fn();
const unlockSound = jest.fn();
const Probe = () => {
  useMatchSounds(match, ready, viewerId);
  return null;
};
const render = () => act(() => root.render(<Probe />));
const advance = (cells: Array<[number, number, number]>, turns = 1) => {
  const board = match.board_state.map((row) => [...row]);
  cells.forEach(([x, y, value]) => {
    board[y][x] = value;
  });
  match = {
    ...match,
    board_state: board,
    turn_number: match.turn_number + turns,
    version: match.mode === 'computer' ? match.version + turns : 0,
    server_time: new Date(Date.parse(match.server_time) + 1000).toISOString(),
  };
  render();
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  ready = true;
  soundEnabled = true;
  viewerId = 11;
  match = {
    id: 1,
    mode: 'human',
    version: 0,
    status: 'active',
    turn_number: 1,
    board_state: Array.from({length: 15}, () => Array(15).fill(0)),
    server_time: new Date().toISOString(),
    winner: null,
    winner_side: null,
  } as ConnectFiveMatch;
  (useArcadeSounds as jest.Mock).mockImplementation(() => ({playSound, soundEnabled, toggleSound, unlockSound}));
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('starts silently and never queues events played while muted', () => {
  soundEnabled = false;
  render();
  advance([[0, 0, 1]]);
  expect(playSound).not.toHaveBeenCalled();
  soundEnabled = true;
  render();
  expect(playSound).not.toHaveBeenCalled();
  advance([[1, 1, 2]]);
  expect(playSound).toHaveBeenCalledTimes(1);
  expect(playSound).toHaveBeenCalledWith('move');
});

it.each(['human', 'computer'] as const)('plays single, double and bomb cues once in %s games', (mode) => {
  match.mode = mode;
  render();
  advance([[0, 0, 1]]);
  expect(playSound).toHaveBeenLastCalledWith('move');
  advance([
    [1, 1, 2],
    [2, 1, 2],
  ]);
  expect(playSound).toHaveBeenLastCalledWith('double');
  advance([
    [1, 1, 0],
    [2, 1, 0],
  ]);
  expect(playSound).toHaveBeenLastCalledWith('bomb');
  match = {...match, board_state: match.board_state.map((row) => [...row])};
  render();
  expect(playSound).toHaveBeenCalledTimes(3);
});

it.each(['human', 'computer'] as const)(
  'plays one fresh win cue, even when the final %s move does not advance the turn',
  (mode) => {
    match.mode = mode;
    render();
    const board = match.board_state.map((row) => [...row]);
    board[0][0] = 1;
    match = {
      ...match,
      board_state: board,
      status: 'finished_connect5',
      winner: 11,
      winner_side: 'a',
      version: mode === 'computer' ? 1 : 0,
    };
    render();
    expect(playSound.mock.calls).toEqual([['move'], ['win', 180]]);
    match = {...match};
    render();
    expect(playSound).toHaveBeenCalledTimes(2);
  },
);

it('never celebrates an old result or an opponent win', () => {
  match = {...match, status: 'finished_connect5', winner: 11};
  render();
  expect(playSound).not.toHaveBeenCalled();
  match = {...match, id: 2, status: 'active', winner: null};
  render();
  match = {...match, status: 'finished_resign', winner: 12};
  render();
  expect(playSound).not.toHaveBeenCalled();
});

it('ignores hydrated snapshots and reconnect refreshes before establishing a new baseline', () => {
  ready = false;
  render();
  advance([[0, 0, 1]]);
  ready = true;
  render();
  expect(playSound).not.toHaveBeenCalled();
  advance([[1, 1, 2]]);
  expect(playSound).toHaveBeenCalledTimes(1);
  ready = false;
  render();
  advance([[2, 2, 1]]);
  ready = true;
  render();
  expect(playSound).toHaveBeenCalledTimes(1);
  advance([[3, 3, 2]]);
  expect(playSound).toHaveBeenCalledTimes(2);
});

it('does not play a catch-up batch or rewind the baseline for stale server snapshots', () => {
  match.mode = 'computer';
  render();
  const stale = match;
  advance(
    [
      [0, 0, 1],
      [1, 1, 2],
    ],
    2,
  );
  expect(playSound).not.toHaveBeenCalled();
  const latest = match;
  match = stale;
  render();
  match = latest;
  render();
  expect(playSound).not.toHaveBeenCalled();
  advance([[2, 2, 1]]);
  expect(playSound).toHaveBeenCalledTimes(1);
});

it.each(['online', 'offline', 'visibilitychange'])(
  're-baselines after %s instead of replaying a missed move',
  (event) => {
    render();
    act(() => (event === 'visibilitychange' ? document : window).dispatchEvent(new Event(event)));
    advance([[0, 0, 1]]);
    expect(playSound).not.toHaveBeenCalled();
    advance([[1, 1, 2]]);
    expect(playSound).toHaveBeenCalledTimes(1);
  },
);

it('re-baselines after switching viewers or matches', () => {
  render();
  viewerId = 12;
  advance([[0, 0, 1]]);
  expect(playSound).not.toHaveBeenCalled();
  match = {...match, id: 2};
  advance([[1, 1, 2]]);
  expect(playSound).not.toHaveBeenCalled();
  advance([[2, 2, 1]]);
  expect(playSound).toHaveBeenCalledTimes(1);
});
