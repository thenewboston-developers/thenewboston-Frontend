import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getReversiMatch, performReversiAction} from 'api/reversi';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {ReversiMatch} from 'types/reversi';
import {hasGuestGameSession, isCurrentGuestGame} from 'utils/guestGames';

import Match from './Match';
import {INITIAL_BOARD} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/reversi', () => ({getReversiMatch: jest.fn(), performReversiAction: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('hooks/useArcadeSounds', () => () => ({
  playSound: mockPlaySound,
  soundEnabled: false,
  toggleSound: jest.fn(),
  unlockSound: jest.fn(),
}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({...jest.requireActual('react-router-dom'), useParams: () => ({matchId: '1'})}));
jest.mock('utils/guestGames', () => ({hasGuestGameSession: jest.fn(), isCurrentGuestGame: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let match: ReversiMatch;
let root: Root;
let selfId: number;
const dispatch = jest.fn(() => Promise.resolve());
const mockPlaySound = jest.fn();

const button = (text: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll('button')).find((element) => element.textContent === text);
  if (!found) throw new Error(`Button not found: ${text}`);
  return found;
};

const renderMatch = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Match />
      </MemoryRouter>,
    );
  });
};

const square = (name: string): HTMLButtonElement => {
  const found = container.querySelector<HTMLButtonElement>(`button[aria-label^="${name}:"]`);
  if (!found) throw new Error(`Square not found: ${name}`);
  return found;
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  selfId = 11;
  dispatch.mockImplementation(() => Promise.resolve());
  match = {
    active_side: 'black',
    black: {avatar: null, id: 11, username: 'Alice'},
    board: INITIAL_BOARD,
    clock_black_ms: 900000,
    clock_white_ms: 900000,
    computer_name: null,
    created_date: new Date().toISOString(),
    difficulty: 'normal',
    expires_at: null,
    finished_at: null,
    host_side: 'black',
    id: 1,
    last_move: null,
    legal_moves: [
      [2, 3],
      [3, 2],
      [4, 5],
      [5, 4],
    ],
    mode: 'human',
    move_count: 0,
    prize_pool_total: 20,
    rematch_of: null,
    result_reason: '',
    scores: {black: 2, white: 2},
    server_time: new Date().toISOString(),
    stake_amount: 10,
    status: 'active',
    time_limit_seconds: 900,
    turn_started_at: new Date().toISOString(),
    version: 4,
    white: {avatar: null, id: 12, username: 'Bob'},
    winner: null,
  };
  (hasGuestGameSession as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(false);
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({reversi: {matchesById: {1: match}}, self: {id: selfId}}),
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getAllUserWallets as jest.Mock).mockReturnValue(() => Promise.resolve());
  (getReversiMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (performReversiAction as jest.Mock).mockImplementation(() => Promise.resolve({...match, version: 5}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it.each(['human', 'computer', 'guest'])('sounds live Reversi flips and a win once for %s play', async (mode) => {
  jest.useFakeTimers();
  if (mode !== 'human') {
    match.mode = 'computer';
    match.white = null;
  }
  if (mode === 'guest') {
    match.guest_mode = true;
    match.your_side = 'black';
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (hasGuestGameSession as jest.Mock).mockReturnValue(true);
    (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  }
  await renderMatch();
  expect(container.querySelector('[aria-label="Game sound"]')).toHaveAttribute('aria-pressed', 'false');
  expect(mockPlaySound).not.toHaveBeenCalled();
  match = {
    ...match,
    version: 5,
    move_count: 1,
    last_move: {side: 'black', row: 2, column: 3, flipped: [[3, 3]], passed: null},
  };
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound.mock.calls).toEqual([['flip', 0]]);
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).toHaveBeenCalledTimes(1);
  match = {...match, version: 6, status: 'finished', winner: 'black'};
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).toHaveBeenLastCalledWith('win', 0);
  expect(mockPlaySound).toHaveBeenCalledTimes(2);
});

it('keeps Reversi history silent after a failed poll reconnects', async () => {
  jest.useFakeTimers();
  await renderMatch();
  (getReversiMatch as jest.Mock).mockRejectedValueOnce(new Error('Offline'));
  await act(async () => jest.advanceTimersByTime(2000));
  match = {
    ...match,
    version: 5,
    move_count: 1,
    last_move: {side: 'black', row: 2, column: 3, flipped: [[3, 3]], passed: null},
  };
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).not.toHaveBeenCalled();
});

describe('reversi match interaction', () => {
  it('sends a move when the player on turn chooses a legal square', async () => {
    await renderMatch();
    expect(container.textContent).toContain('Your turn · Black');
    expect(square('a1')).toBeDisabled();
    await act(async () => square('d3').click());
    expect(performReversiAction).toHaveBeenCalledTimes(1);
    expect(performReversiAction).toHaveBeenCalledWith(match, 'move', {column: 3, row: 2});
  });

  it('looks for the computer’s reply shortly after a move instead of waiting for the regular poll', async () => {
    jest.useFakeTimers();
    match.mode = 'computer';
    match.white = null;
    match.computer_name = 'Computer';
    (performReversiAction as jest.Mock).mockImplementation(() =>
      Promise.resolve({...match, active_side: 'white', legal_moves: [], version: 5}),
    );
    await renderMatch();
    expect(getReversiMatch).toHaveBeenCalledTimes(1);
    await act(async () => square('d3').click());
    await act(async () => {
      jest.advanceTimersByTime(600);
    });
    expect(getReversiMatch).toHaveBeenCalledTimes(2);
  });

  it('keeps the board locked while the opponent is on turn', async () => {
    selfId = 12;
    await renderMatch();
    expect(container.textContent).toContain('Alice’s turn · Black');
    expect(container.textContent).toContain('Waiting for Alice to move.');
    expect(container.querySelectorAll('button[aria-label*="legal move"]')).toHaveLength(0);
    expect(square('d3')).toBeDisabled();
    expect(button('Resign match')).toBeEnabled();
  });

  it('never offers game actions to a spectator', async () => {
    selfId = 99;
    await renderMatch();
    expect(container.textContent).toContain('Spectating');
    expect(container.querySelectorAll('button:not([disabled]):not([aria-label="Game sound"])')).toHaveLength(0);
    expect(container.textContent).not.toContain('Resign match');
  });

  it('explains an automatic pass', async () => {
    match.last_move = {column: 0, flipped: [[0, 1]], passed: 'white', row: 0, side: 'black'};
    await renderMatch();
    expect(container.textContent).toContain('White had no legal move, so black plays again.');
    expect(container.textContent).toContain('Last move · Black a1');
  });

  it('shows the colors and the fixed stake before accepting a challenge', async () => {
    selfId = 12;
    match.status = 'pending';
    match.active_side = null;
    match.legal_moves = [];
    await renderMatch();
    expect(container.textContent).toContain('A challenge from Alice');
    expect(container.textContent).toContain('You play white. Black moves first.');
    expect(container.textContent).toContain('Accepting locks your stake');
    expect(container.querySelector('[aria-label="Reversi board"]')).toBeNull();
    await act(async () => button('Accept · 10 TNB').click());
    expect(performReversiAction).toHaveBeenCalledWith(match, 'accept', {});
  });

  it('lets only the challenger cancel a pending challenge', async () => {
    match.status = 'pending';
    match.active_side = null;
    await renderMatch();
    expect(container.textContent).toContain('Waiting for your opponent');
    expect(
      Array.from(container.querySelectorAll('button:not([aria-label="Game sound"])')).map(
        (element) => element.textContent,
      ),
    ).toEqual(['Cancel challenge']);
  });

  it('asks before resigning a staked match', async () => {
    await renderMatch();
    act(() => button('Resign match').click());
    expect(container.textContent).toContain('Your opponent wins the match and the 20 TNB prize.');
    expect(performReversiAction).not.toHaveBeenCalled();
    await act(async () => button('Concede match').click());
    expect(performReversiAction).toHaveBeenCalledWith(match, 'resign', {});
  });

  it('reports a draw with both stakes returned and stops polling', async () => {
    jest.useFakeTimers();
    match.status = 'finished';
    match.active_side = null;
    match.legal_moves = [];
    match.result_reason = 'draw';
    match.scores = {black: 32, white: 32};
    await renderMatch();
    expect(container.textContent).toContain('The game is a draw');
    expect(container.textContent).toContain('Black 32 – White 32');
    expect(container.textContent).toContain('Each player’s 10 TNB stake was returned.');
    await act(async () => {
      jest.advanceTimersByTime(10000);
    });
    expect(getReversiMatch).toHaveBeenCalledTimes(1);
  });

  describe('as a guest', () => {
    beforeEach(() => {
      (useIsAuthenticated as jest.Mock).mockReturnValue(false);
      (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
        selector({reversi: {matchesById: {1: match}}, self: {}}),
      );
      match.mode = 'computer';
      match.guest_mode = true;
      match.guest_session_id = 'session-1';
      match.black = {avatar: null, id: 0, username: 'Guest'};
      match.white = null;
      match.computer_name = 'Computer';
      match.stake_amount = 0;
      match.prize_pool_total = 0;
      match.your_side = 'black';
    });

    it('plays its own computer game without an account', async () => {
      (hasGuestGameSession as jest.Mock).mockReturnValue(true);
      (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
      await renderMatch();
      expect(container.textContent).toContain('Guest vs. Computer');
      expect(container.textContent).toContain('Your turn · Black');
      expect(container.textContent).not.toContain('You’re watching this match');
      await act(async () => square('d3').click());
      expect(performReversiAction).toHaveBeenCalledWith(match, 'move', {column: 3, row: 2});
      expect(getAllUserWallets).not.toHaveBeenCalled();
    });

    it('previews the reward an account would have earned', async () => {
      (hasGuestGameSession as jest.Mock).mockReturnValue(true);
      (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
      match.status = 'finished';
      match.active_side = null;
      match.winner = 'black';
      match.result_reason = 'disk_count';
      match.scores = {black: 40, white: 24};
      match.computer_reward = {amount: 10, currency: 'TNB', status: 'guest'};
      await renderMatch();
      expect(container.textContent).toContain('Guest wins');
      expect(container.textContent).toContain('Create a free account');
    });

    it('never shows a cached guest game to a different visitor', async () => {
      (hasGuestGameSession as jest.Mock).mockReturnValue(true);
      (isCurrentGuestGame as jest.Mock).mockReturnValue(false);
      (getReversiMatch as jest.Mock).mockRejectedValue(new Error('Not found'));
      await renderMatch();
      expect(container.querySelector('[aria-label="Reversi board"]')).toBeNull();
      expect(container.textContent).not.toContain('Guest vs. Computer');
      expect(container.querySelector('[role="alert"]')).not.toBeNull();
    });
  });

  it('shows the winner, the prize and the game fund reward for a computer win', async () => {
    match.status = 'finished';
    match.active_side = null;
    match.mode = 'computer';
    match.white = null;
    match.computer_name = 'Computer';
    match.stake_amount = 0;
    match.prize_pool_total = 0;
    match.winner = 'black';
    match.result_reason = 'disk_count';
    match.scores = {black: 40, white: 24};
    match.computer_reward = {amount: 10, currency: 'TNB', status: 'paid'};
    await renderMatch();
    expect(container.textContent).toContain('Alice vs. Computer');
    expect(container.textContent).toContain('Alice wins');
    expect(container.textContent).toContain('+10 TNB game reward');
    expect(container.textContent).not.toContain('prize paid');
    expect(button('Play again')).toBeEnabled();
  });
});

it.each([
  [11, 'win'],
  [12, 'loss'],
  [99, 'complete'],
] as const)('presents a finished result for viewer %s as %s', async (viewerId, outcome) => {
  selfId = viewerId;
  match.status = 'finished';
  match.winner = 'black';
  await renderMatch();
  const result = container.querySelector('[data-outcome]');
  expect(result).toHaveAttribute('data-outcome', outcome);
  expect(result).toHaveTextContent('20 TNB prize paid to Alice');
  expect(result?.textContent?.includes('Offer rematch')).toBe(outcome !== 'complete');
});

it('presents a draw with the existing stake refund information', async () => {
  match.status = 'finished';
  match.winner = null;
  await renderMatch();
  const result = container.querySelector('[data-outcome]');
  expect(result).toHaveAttribute('data-outcome', 'draw');
  expect(result).toHaveTextContent(/refund|returned/);
});
