import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createDotsAndBoxesMatch, getDotsAndBoxesMatches} from 'api/dotsAndBoxes';
import {useIsAuthenticated} from 'hooks';

import Home from '.';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/dotsAndBoxes', () => ({createDotsAndBoxesMatch: jest.fn(), getDotsAndBoxesMatches: jest.fn()}));
jest.mock('../Leaderboard', () => () => <div>Box office</div>);
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('components/UserSearchInput', () => () => <div>Find a member</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({...jest.requireActual('react-router-dom'), useNavigate: () => mockNavigate}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
const firstId = '11111111-1111-4111-8111-111111111111';
const secondId = '22222222-2222-4222-8222-222222222222';
const randomUUID = jest.fn();
const mockNavigate = jest.fn();

const renderHome = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Home />
      </MemoryRouter>,
    );
  });
};

const choose = async (selector: string) => {
  await act(async () => {
    (container.querySelector(selector) as HTMLInputElement).click();
  });
};

const submit = async () => {
  await act(async () => {
    container.querySelector('form')!.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID}});
  randomUUID.mockReturnValueOnce(firstId).mockReturnValue(secondId);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: 11}}));
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn(() => Promise.resolve()));
  (getDotsAndBoxesMatches as jest.Mock).mockResolvedValue({results: [], count: 0, next: null, previous: null});
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('creating Dots and Boxes matches', () => {
  it('does not request private match lists when signed out', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    await renderHome();
    expect(getDotsAndBoxesMatches).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Sign in to play');
  });

  it('does not store a delayed created match after signing out', async () => {
    let resolveCreate: (match: unknown) => void = () => undefined;
    (createDotsAndBoxesMatch as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveCreate = resolve;
      }),
    );
    const dispatch = jest.fn(() => Promise.resolve());
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    await renderHome();
    await submit();
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    await renderHome();
    await act(async () => resolveCreate({id: 42, version: 1}));
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('loads unfinished matches beyond the first page while keeping finished history separate', async () => {
    const pending = Array.from({length: 50}, (_, index) => ({
      id: index + 1,
      blue: {id: 12, username: `Challenger ${index + 1}`},
      red: {id: 11, username: 'Alice'},
      status: 'pending',
      board_size: 4,
      score_blue: 0,
      score_red: 0,
      stake_amount: 0,
      winner: null,
    }));
    const active = {...pending[0], id: 51, status: 'active', blue: {id: 13, username: 'Older active opponent'}};
    (getDotsAndBoxesMatches as jest.Mock).mockImplementation((params) => {
      if (params.status === 'pending,active') {
        return Promise.resolve({
          results: params.page === 1 ? pending : [active],
          count: 51,
          next: params.page === 1 ? '/api/dots-and-boxes/matches?page=2' : null,
          previous: null,
        });
      }
      return Promise.resolve({results: [], count: 0, next: null, previous: null});
    });
    await renderHome();
    expect(container.querySelector('a[href="/dots-and-boxes/matches/51"]')).toHaveTextContent('Older active opponent');
    expect(getDotsAndBoxesMatches).toHaveBeenCalledWith(
      {mine: '1', page: 2, page_size: 50, status: 'pending,active'},
      expect.any(AbortSignal),
    );
    expect(getDotsAndBoxesMatches).toHaveBeenCalledWith(
      {mine: '1', page_size: 10, status: 'finished,cancelled,declined,expired'},
      expect.any(AbortSignal),
    );
    expect(getDotsAndBoxesMatches).toHaveBeenCalledTimes(3);
  });

  it('reuses the same request ID after an ambiguous network failure', async () => {
    (createDotsAndBoxesMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await submit();
    expect(createDotsAndBoxesMatch).toHaveBeenCalledTimes(2);
    expect((createDotsAndBoxesMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([
      firstId,
      firstId,
    ]);
    expect((createDotsAndBoxesMatch as jest.Mock).mock.calls[0][0]).toEqual({
      request_id: firstId,
      board_size: 4,
      mode: 'computer',
      difficulty: 'normal',
      opponent_id: undefined,
      stake_amount: 0,
      time_limit_seconds: 900,
    });
  });

  it('uses a fresh request ID if the player changes the match terms', async () => {
    (createDotsAndBoxesMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await choose('#computer-time-600');
    await submit();
    expect((createDotsAndBoxesMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([
      firstId,
      secondId,
    ]);
    expect((createDotsAndBoxesMatch as jest.Mock).mock.calls[1][0].time_limit_seconds).toBe(600);
  });

  it('sends the chosen board size and treats a different board as a new request', async () => {
    (createDotsAndBoxesMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await choose('#computer-board-5');
    await submit();
    const calls = (createDotsAndBoxesMatch as jest.Mock).mock.calls.map(([data]) => data);
    expect(calls.map((data) => data.board_size)).toEqual([4, 5]);
    expect(calls.map((data) => data.request_id)).toEqual([firstId, secondId]);
  });

  it('lists a finished match with its board size and final score', async () => {
    (getDotsAndBoxesMatches as jest.Mock).mockImplementation((params) =>
      Promise.resolve({
        results:
          params.status === 'pending,active'
            ? []
            : [
                {
                  id: 7,
                  blue: {id: 11, username: 'Alice'},
                  red: {id: 12, username: 'Bob'},
                  board_size: 3,
                  score_blue: 3,
                  score_red: 6,
                  stake_amount: 25,
                  status: 'finished',
                  winner: 'red',
                },
              ],
        count: 1,
        next: null,
        previous: null,
      }),
    );
    await renderHome();
    const row = container.querySelector('a[href="/dots-and-boxes/matches/7"]');
    expect(row).toHaveTextContent('Alice vs. Bob');
    expect(row).toHaveTextContent('Finished · 3 × 3 · 25 TNB each · Bob won 6–3');
  });

  it('prevents a double submission while creation is pending', async () => {
    (createDotsAndBoxesMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending to exercise the submission lock.
      }),
    );
    await renderHome();
    await submit();
    await submit();
    expect(createDotsAndBoxesMatch).toHaveBeenCalledTimes(1);
  });
});

it('lets signed-out visitors start a free Dots and Boxes computer match', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
  (createDotsAndBoxesMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: true});
  await renderHome();
  expect(container.querySelectorAll('form')).toHaveLength(1);
  expect(container).toHaveTextContent('No account needed');
  await submit();
  expect(createDotsAndBoxesMatch).toHaveBeenCalledWith(expect.objectContaining({mode: 'computer', stake_amount: 0}));
});

it.each([false, true])('starts the default game directly from the hero (authenticated: %s)', async (authenticated) => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(authenticated);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({self: {id: authenticated ? 11 : null}}),
  );
  (createDotsAndBoxesMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: !authenticated});
  await renderHome();
  await choose('#computer-time-300');
  await choose('#computer-difficulty-hard');
  await choose('#computer-board-5');
  const heroButton = container.querySelector('[aria-label="Dots and Boxes overview"] button') as HTMLButtonElement;
  await act(async () => heroButton.click());
  expect(createDotsAndBoxesMatch).toHaveBeenCalledWith({
    difficulty: 'normal',
    mode: 'computer',
    opponent_id: undefined,
    request_id: firstId,
    stake_amount: 0,
    board_size: 4,
    time_limit_seconds: 900,
  });
  expect(mockNavigate).toHaveBeenCalledWith('/dots-and-boxes/matches/42');
});

it('starts with Normal, the 4 × 4 board and 15 minutes, and sends the boxes the player claims instead', async () => {
  (createDotsAndBoxesMatch as jest.Mock).mockResolvedValue({id: 42, version: 1});
  await renderHome();
  const checked = (name: string) =>
    container.querySelector<HTMLInputElement>(`#dots-and-boxes-computer input[name="${name}"]:checked`)!.value;
  expect([checked('difficulty'), checked('board_size'), checked('time_limit_seconds')]).toEqual(['normal', '4', '900']);
  await choose('#computer-difficulty-hard');
  await choose('#computer-board-3');
  await choose('#computer-time-1800');
  await submit();
  expect(createDotsAndBoxesMatch).toHaveBeenCalledWith(
    expect.objectContaining({board_size: 3, difficulty: 'hard', time_limit_seconds: 1800}),
  );
});

it('marks the matches where it is your move and sketches each board as it stands', async () => {
  const lines = Array(24).fill(0);
  lines[0] = 1;
  lines[12] = 2;
  const match = {
    active_side: 'blue',
    board_size: 3,
    boxes: Array(9).fill(0),
    lines,
    score_blue: 0,
    score_red: 0,
    stake_amount: 0,
    status: 'active',
    winner: null,
  };
  (getDotsAndBoxesMatches as jest.Mock).mockImplementation((params) =>
    Promise.resolve({
      results:
        params.status === 'pending,active'
          ? [
              {...match, blue: {id: 11, username: 'Alice'}, id: 5, red: {id: 12, username: 'Bob'}, your_side: 'blue'},
              {...match, blue: {id: 13, username: 'Cara'}, id: 6, red: {id: 11, username: 'Alice'}, your_side: 'red'},
            ]
          : [],
      count: 2,
      next: null,
      previous: null,
    }),
  );
  await renderHome();
  const yourMove = container.querySelector('a[href="/dots-and-boxes/matches/5"]')!;
  expect(yourMove).toHaveTextContent('Alice vs. Bob');
  expect(yourMove).toHaveTextContent('In play · 3 × 3 · Free play');
  expect(yourMove).toHaveTextContent('Your move');
  expect(yourMove.querySelectorAll('svg line.blue')).toHaveLength(1);
  expect(yourMove.querySelectorAll('svg line.red')).toHaveLength(1);
  expect(yourMove.querySelectorAll('svg line.open')).toHaveLength(22);
  expect(container.querySelector('a[href="/dots-and-boxes/matches/6"]')).toHaveTextContent('Open board');
});

it('shows signed-out visitors a game being played instead of the challenge form', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
  await renderHome();
  const challenge = container.querySelector('#dots-and-boxes-challenge')!;
  expect(challenge.querySelector('form')).toBeNull();
  expect(challenge).toHaveTextContent('Sign in to play');
  expect(
    challenge.querySelectorAll('svg[aria-hidden="true"] line.blue, svg[aria-hidden="true"] line.red'),
  ).toHaveLength(24);
  expect(challenge).toHaveTextContent('Close a box, draw again');
});
