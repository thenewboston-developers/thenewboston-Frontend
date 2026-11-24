import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createCheckersMatch, getCheckersMatches} from 'api/checkers';
import {useIsAuthenticated} from 'hooks';

import Home from '.';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/checkers', () => ({createCheckersMatch: jest.fn(), getCheckersMatches: jest.fn()}));
jest.mock('../Leaderboard', () => () => <div>King’s row</div>);
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
  (getCheckersMatches as jest.Mock).mockResolvedValue({results: [], count: 0, next: null, previous: null});
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('creating checkers matches', () => {
  it('does not request private match lists when signed out', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    await renderHome();
    expect(getCheckersMatches).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Sign in to play');
  });

  it('does not store a delayed created match after signing out', async () => {
    let resolveCreate: (match: unknown) => void = () => undefined;
    (createCheckersMatch as jest.Mock).mockReturnValue(
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
      white: {id: 12, username: `Challenger ${index + 1}`},
      black: {id: 11, username: 'Alice'},
      status: 'pending',
      stake_amount: 0,

      winner: null,
    }));
    const active = {...pending[0], id: 51, status: 'active', white: {id: 13, username: 'Older active opponent'}};
    (getCheckersMatches as jest.Mock).mockImplementation((params) => {
      if (params.status === 'pending,active') {
        return Promise.resolve({
          results: params.page === 1 ? pending : [active],
          count: 51,
          next: params.page === 1 ? '/api/checkers/matches?page=2' : null,
          previous: null,
        });
      }
      return Promise.resolve({results: [], count: 0, next: null, previous: null});
    });
    await renderHome();
    expect(container.querySelector('a[href="/checkers/matches/51"]')).toHaveTextContent('Older active opponent');
    expect(getCheckersMatches).toHaveBeenCalledWith(
      {mine: '1', page: 2, page_size: 50, status: 'pending,active'},
      expect.any(AbortSignal),
    );
    expect(getCheckersMatches).toHaveBeenCalledWith(
      {mine: '1', page_size: 10, status: 'finished,cancelled,declined,expired'},
      expect.any(AbortSignal),
    );
    expect(getCheckersMatches).toHaveBeenCalledTimes(3);
  });

  it('reuses the same request ID after an ambiguous network failure', async () => {
    (createCheckersMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await submit();
    expect(createCheckersMatch).toHaveBeenCalledTimes(2);
    expect((createCheckersMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, firstId]);
    expect((createCheckersMatch as jest.Mock).mock.calls[0][0]).toEqual({
      request_id: firstId,
      mode: 'computer',
      difficulty: 'normal',
      opponent_id: undefined,
      stake_amount: 0,
      time_limit_seconds: 900,
    });
  });

  it('uses a fresh request ID if the player changes the match terms', async () => {
    (createCheckersMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await choose('#computer-time-600');
    await submit();
    expect((createCheckersMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, secondId]);
    expect((createCheckersMatch as jest.Mock).mock.calls[1][0].time_limit_seconds).toBe(600);
  });

  it('sends the difficulty and clock picked on the board controls', async () => {
    (createCheckersMatch as jest.Mock).mockResolvedValue({id: 42, version: 1});
    await renderHome();
    expect(container.querySelector<HTMLInputElement>('#computer-difficulty-normal')!.checked).toBe(true);
    expect(container.querySelector<HTMLInputElement>('#computer-time-900')!.checked).toBe(true);
    await choose('#computer-difficulty-hard');
    await choose('#computer-time-300');
    await submit();
    expect(createCheckersMatch).toHaveBeenCalledWith(
      expect.objectContaining({difficulty: 'hard', mode: 'computer', time_limit_seconds: 300}),
    );
  });

  it('prevents a double submission while creation is pending', async () => {
    (createCheckersMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending to exercise the submission lock.
      }),
    );
    await renderHome();
    await submit();
    await submit();
    expect(createCheckersMatch).toHaveBeenCalledTimes(1);
  });
});

it('logs matches with readable states, whose move it is and the action each one needs', async () => {
  const alice = {avatar: null, id: 11, username: 'Alice'};
  const base = {active_side: null, black: alice, stake_amount: 0, winner: null, your_side: 'black'};
  (getCheckersMatches as jest.Mock).mockImplementation((params) =>
    Promise.resolve({
      count: 3,
      next: null,
      previous: null,
      results:
        params.status === 'pending,active'
          ? [
              {...base, id: 1, status: 'pending', white: {id: 12, username: 'Bob'}},
              {
                ...base,
                active_side: 'black',
                id: 2,
                stake_amount: 2500,
                status: 'active',
                white: {id: 13, username: 'Cy'},
              },
              {...base, active_side: 'white', id: 4, status: 'active', white: {id: 15, username: 'Ed'}},
            ]
          : [{...base, id: 3, status: 'finished', white: {id: 14, username: 'Di'}, winner: 'black'}],
    }),
  );
  await renderHome();
  const challenge = container.querySelector('a[href="/checkers/matches/1"]');
  expect(challenge).toHaveTextContent('Bob vs. Alice');
  expect(challenge).toHaveTextContent('Challenge received · Free play');
  expect(challenge).toHaveTextContent('Review challenge →');
  expect(container.querySelector('a[href="/checkers/matches/2"]')).toHaveTextContent(
    `Your move · ${(2500).toLocaleString()} TNB each`,
  );
  expect(container.querySelector('a[href="/checkers/matches/2"]')).toHaveTextContent('Make your move →');
  expect(container.querySelector('a[href="/checkers/matches/4"]')).toHaveTextContent('Open board →');
  expect(container.querySelector('a[href="/checkers/matches/4"]')).toHaveTextContent('Their move · Free play');
  expect(container.querySelector('a[href="/checkers/matches/3"]')).toHaveTextContent(
    'Finished · Free play · Alice won',
  );
  expect(container).toHaveTextContent('Your recent matches');
  expect(container).not.toHaveTextContent('The board is set');
});

it('shows an empty board when a signed-in player has no matches', async () => {
  await renderHome();
  expect(container).toHaveTextContent('The board is set');
  expect(container.querySelector('[role="status"]')).toBeNull();
});

it('lets signed-out visitors start a free Checkers computer match', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
  (createCheckersMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: true});
  await renderHome();
  expect(container.querySelectorAll('form')).toHaveLength(1);
  expect(container).toHaveTextContent('No account needed');
  await submit();
  expect(createCheckersMatch).toHaveBeenCalledWith(expect.objectContaining({mode: 'computer', stake_amount: 0}));
});

it.each([false, true])('starts the default game directly from the hero (authenticated: %s)', async (authenticated) => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(authenticated);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({self: {id: authenticated ? 11 : null}}),
  );
  (createCheckersMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: !authenticated});
  await renderHome();
  await choose('#computer-time-300');
  await choose('#computer-difficulty-hard');
  const heroButton = container.querySelector('[aria-label="Checkers overview"] button') as HTMLButtonElement;
  await act(async () => heroButton.click());
  expect(createCheckersMatch).toHaveBeenCalledWith({
    difficulty: 'normal',
    mode: 'computer',
    opponent_id: undefined,
    request_id: firstId,
    stake_amount: 0,

    time_limit_seconds: 900,
  });
  expect(mockNavigate).toHaveBeenCalledWith('/checkers/matches/42');
});
