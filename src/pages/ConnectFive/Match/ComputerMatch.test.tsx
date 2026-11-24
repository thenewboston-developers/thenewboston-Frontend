import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createConnectFiveComputerMatch, getConnectFiveMatch, submitConnectFiveMove} from 'api/connectFive';
import {ConnectFiveMatch} from 'types';

import ComputerMatch from './ComputerMatch';

jest.mock('api/connectFive', () => ({
  createConnectFiveComputerMatch: jest.fn(),
  getConnectFiveMatch: jest.fn(),
  resignConnectFiveMatch: jest.fn(),
  submitConnectFiveMove: jest.fn(),
}));
jest.mock('./assets/single.svg', () => ({ReactComponent: () => <svg />}));
jest.mock('./assets/horizontal2.svg', () => ({ReactComponent: () => <svg />}));
jest.mock('./assets/vertical2.svg', () => ({ReactComponent: () => <svg />}));
jest.mock('./assets/bomb.svg', () => ({ReactComponent: () => <svg />}));
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => 'refresh-wallets'}));
jest.mock('react-redux', () => ({useDispatch: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let modal: HTMLDivElement;
let root: Root;
let match: ConnectFiveMatch;
const dispatch = jest.fn();
const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <ComputerMatch match={match} />
      </MemoryRouter>,
    ),
  );
};
const button = (text: string) =>
  Array.from(document.querySelectorAll('button')).find((element) => element.textContent === text)!;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  modal = document.createElement('div');
  modal.id = 'modal-root';
  document.body.appendChild(modal);
  root = createRoot(container);
  const human = {id: 11, username: 'Alice', avatar: null, connect_five_elo: 1200};
  const inventory = {inventory_bomb: 2, inventory_h2: 2, inventory_v2: 2, remaining_spend: 0, spent_total: 0};
  match = {
    id: 1,
    mode: 'computer',
    difficulty: 'normal',
    version: 3,
    computer_name: 'Computer',
    player_a: human,
    player_b: null,
    active_player: human,
    active_side: 'a',
    winner: null,
    winner_side: null,
    board_state: Array.from({length: 15}, () => Array(15).fill(0)),
    challenge: null,
    clock_a_remaining_ms: 900000,
    clock_b_remaining_ms: 900000,
    players: [
      {...inventory, user: human},
      {...inventory, user: null},
    ],
    prize_pool_total: 0,
    max_spend_amount: 0,
    time_limit_seconds: 900,
    turn_number: 1,
    status: 'active',
    server_time: new Date().toISOString(),
    turn_started_at: new Date().toISOString(),
    player_a_elo_before: null,
    player_a_elo_after: null,
    player_b_elo_before: null,
    player_b_elo_after: null,
  } as unknown as ConnectFiveMatch;
  dispatch.mockImplementation(() => Promise.resolve());
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getConnectFiveMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (submitConnectFiveMove as jest.Mock).mockImplementation(() =>
    Promise.resolve({...match, version: 4, active_side: 'b', active_player: null}),
  );
  Object.defineProperty(window, 'crypto', {
    configurable: true,
    value: {randomUUID: () => '11111111-1111-4111-8111-111111111111'},
  });
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  modal.remove();
  jest.useRealTimers();
});

it('shows a computer identity and free specials, without paid purchases or chat', async () => {
  await render();
  expect(container).toHaveTextContent('Computer');
  expect(container).toHaveTextContent('Paid purchases are disabled');
  expect(container).not.toHaveTextContent('Purchase specials');
  expect(container.querySelector('a[href="/profile/null"]')).toBeNull();
  act(() => (container.querySelector('button[aria-label="Horizontal 2"]') as HTMLButtonElement).click());
  await act(async () =>
    (container.querySelector('button[aria-label="Row 1, column 1: empty"]') as HTMLButtonElement).click(),
  );
  expect(submitConnectFiveMove).toHaveBeenCalledWith(1, {expected_version: 3, move_type: 'H2', x: 0, y: 0});
});

it('blocks human moves while the computer is thinking', async () => {
  match.active_side = 'b';
  match.active_player = null;
  await render();
  expect(container).toHaveTextContent('The computer is thinking');
  await act(async () =>
    (container.querySelector('button[aria-label="Row 1, column 1: empty"]') as HTMLButtonElement).click(),
  );
  expect(submitConnectFiveMove).not.toHaveBeenCalled();
});

it('rejects an out-of-bounds free double before contacting the server', async () => {
  await render();
  act(() => (container.querySelector('button[aria-label="Horizontal 2"]') as HTMLButtonElement).click());
  await act(async () =>
    (container.querySelector('button[aria-label="Row 1, column 15: empty"]') as HTMLButtonElement).click(),
  );
  expect(submitConnectFiveMove).not.toHaveBeenCalled();
});

it('polls for the computer reply and rejects stale responses after a move', async () => {
  jest.useFakeTimers();
  await render();
  await act(async () =>
    (container.querySelector('button[aria-label="Row 1, column 1: empty"]') as HTMLButtonElement).click(),
  );
  dispatch.mockClear();
  await act(async () => {
    jest.advanceTimersByTime(2000);
  });
  expect(getConnectFiveMatch).toHaveBeenCalledTimes(2);
  expect(dispatch).not.toHaveBeenCalled();
  (getConnectFiveMatch as jest.Mock).mockResolvedValue({...match, version: 5, turn_number: 3});
  await act(async () => {
    jest.advanceTimersByTime(2000);
  });
  expect(dispatch).toHaveBeenCalledWith(
    expect.objectContaining({payload: {match: expect.objectContaining({version: 5}), selfId: 11}}),
  );
});

it('recognizes a computer win with a null winner ID and does not show ranked ELO results', async () => {
  match.status = 'finished_connect5';
  match.winner_side = 'b';
  match.active_side = null;
  await render();
  expect(modal).toHaveTextContent('Computer wins');
  expect(modal).toHaveTextContent('ELO unchanged');
  expect(modal).not.toHaveTextContent('Your ELO');
  expect(dispatch).toHaveBeenCalledWith('refresh-wallets');
});

it('shows the settled fund reward and reuses a computer rematch request after a network error', async () => {
  match.status = 'finished_connect5';
  match.winner_side = 'a';
  match.winner = 11;
  match.active_side = null;
  match.computer_reward = {status: 'paid', amount: 10, currency: 'TNB'};
  (createConnectFiveComputerMatch as jest.Mock).mockRejectedValue(new Error('Network lost'));
  await render();
  expect(modal).toHaveTextContent('+10 TNB game reward');
  await act(async () => button('Play again').click());
  await act(async () => button('Play again').click());
  const {calls} = (createConnectFiveComputerMatch as jest.Mock).mock;
  expect(calls).toHaveLength(2);
  expect(calls[0][0]).toEqual(calls[1][0]);
  expect(calls[0][0]).toMatchObject({rematch_of: 1, difficulty: 'normal', time_limit_seconds: 900});
});
