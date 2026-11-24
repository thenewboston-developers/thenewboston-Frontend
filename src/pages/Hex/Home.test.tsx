import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createHexMatch, getHexMatches} from 'api/hex';
import {useIsAuthenticated} from 'hooks';

import Home from './Home';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/hex', () => ({createHexMatch: jest.fn(), getHexMatches: jest.fn()}));
jest.mock('components/GameEarningsLeaderboard', () => () => <div>Top earners</div>);
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock(
  'components/UserSearchInput',
  () =>
    ({onChange}: {onChange: (user: {id: number; username: string} | null) => void}) => (
      <div>
        Find a member
        <button onClick={() => onChange({id: mockOpponentId, username: 'Bob'})} type="button">
          Pick Bob
        </button>
      </div>
    ),
);
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
let mockOpponentId = 12;

const renderHome = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Home />
      </MemoryRouter>,
    );
  });
};

const submit = async () => {
  await act(async () => {
    container.querySelector('form')!.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
  });
};

beforeEach(() => {
  mockOpponentId = 12;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID}});
  randomUUID.mockReturnValueOnce(firstId).mockReturnValue(secondId);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: 11}}));
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn(() => Promise.resolve()));
  (getHexMatches as jest.Mock).mockResolvedValue({results: [], count: 0, next: null, previous: null});
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('creating hex matches', () => {
  it('does not request private match lists when signed out', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    await renderHome();
    expect(getHexMatches).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Sign in to play');
  });

  it('does not store a delayed created match after signing out', async () => {
    let resolveCreate: (match: unknown) => void = () => undefined;
    (createHexMatch as jest.Mock).mockReturnValue(
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
      red: {id: 12, username: `Challenger ${index + 1}`},
      blue: {id: 11, username: 'Alice'},
      status: 'pending',
      stake_amount: 0,
      board_size: 11,
      winner: null,
    }));
    const active = {...pending[0], id: 51, status: 'active', red: {id: 13, username: 'Older active opponent'}};
    (getHexMatches as jest.Mock).mockImplementation((params) => {
      if (params.status === 'pending,active') {
        return Promise.resolve({
          results: params.page === 1 ? pending : [active],
          count: 51,
          next: params.page === 1 ? '/api/hex/matches?page=2' : null,
          previous: null,
        });
      }
      return Promise.resolve({results: [], count: 0, next: null, previous: null});
    });
    await renderHome();
    expect(container.querySelector('a[href="/hex/matches/51"]')).toHaveTextContent('Older active opponent');
    expect(getHexMatches).toHaveBeenCalledWith(
      {mine: '1', page: 2, page_size: 50, status: 'pending,active'},
      expect.any(AbortSignal),
    );
    expect(getHexMatches).toHaveBeenCalledWith(
      {mine: '1', page_size: 10, status: 'finished,cancelled,declined,expired'},
      expect.any(AbortSignal),
    );
    expect(getHexMatches).toHaveBeenCalledTimes(3);
  });

  it('reuses the same request ID after an ambiguous network failure', async () => {
    (createHexMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await submit();
    expect(createHexMatch).toHaveBeenCalledTimes(2);
    expect((createHexMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, firstId]);
    expect((createHexMatch as jest.Mock).mock.calls[0][0]).toEqual({
      request_id: firstId,
      board_size: 11,
      mode: 'computer',
      difficulty: 'normal',
      opponent_id: undefined,
      stake_amount: 0,
      time_limit_seconds: 900,
    });
  });

  it('uses a fresh request ID if the player changes the match terms', async () => {
    (createHexMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    (container.querySelector('#computer-size') as HTMLSelectElement).value = '7';
    await submit();
    expect((createHexMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, secondId]);
    expect((createHexMatch as jest.Mock).mock.calls[1][0].board_size).toBe(7);
  });

  it('prevents a double submission while creation is pending', async () => {
    (createHexMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending to exercise the submission lock.
      }),
    );
    await renderHome();
    await submit();
    await submit();
    expect(createHexMatch).toHaveBeenCalledTimes(1);
  });
});

it('lets signed-out visitors start a free Hex computer match', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
  (createHexMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: true});
  await renderHome();
  expect(container.querySelectorAll('form')).toHaveLength(1);
  expect(container).toHaveTextContent('No account needed');
  await submit();
  expect(createHexMatch).toHaveBeenCalledWith(
    expect.objectContaining({board_size: 11, mode: 'computer', stake_amount: 0}),
  );
});

it('offers every board size and shows it on each match in the lobby', async () => {
  (getHexMatches as jest.Mock).mockImplementation((params) =>
    Promise.resolve({
      results:
        params.status === 'pending,active'
          ? [
              {
                id: 7,
                red: {id: 11, username: 'Alice'},
                blue: {id: 12, username: 'Bob'},
                status: 'active',
                stake_amount: 25,
                board_size: 13,
                winner: null,
              },
            ]
          : [],
      count: 1,
      next: null,
      previous: null,
    }),
  );
  await renderHome();
  const sizes = Array.from(container.querySelectorAll('#human-size option')).map((option) => option.textContent);
  expect(sizes).toEqual(['7 × 7 · Quick game', '9 × 9 · Short game', '11 × 11 · Classic', '13 × 13 · Long game']);
  expect((container.querySelector('#human-size') as HTMLSelectElement).value).toBe('11');
  expect(container.querySelector('a[href="/hex/matches/7"]')).toHaveTextContent('Alice vs. Bob');
  expect(container.querySelector('a[href="/hex/matches/7"]')).toHaveTextContent('active · 13 × 13 · 25 TNB each');
});

describe('challenging a player to Hex', () => {
  const submitChallenge = async () => {
    await act(async () => {
      container.querySelectorAll('form')[1].dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    });
  };

  const setStake = (value: string) =>
    act(() => {
      const input = container.querySelector('#human-stake') as HTMLInputElement;
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
      input.dispatchEvent(new Event('input', {bubbles: true}));
    });

  it('sends the chosen opponent, board, clock and stake', async () => {
    (createHexMatch as jest.Mock).mockResolvedValue({id: 9, version: 1});
    await renderHome();
    act(() =>
      (
        Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Pick Bob') as HTMLButtonElement
      ).click(),
    );
    (container.querySelector('#human-size') as HTMLSelectElement).value = '9';
    (container.querySelector('#human-time') as HTMLSelectElement).value = '300';
    setStake('25');
    expect(container).toHaveTextContent('25 TNB locks when you send the challenge');
    await submitChallenge();
    expect(createHexMatch).toHaveBeenCalledTimes(1);
    expect(createHexMatch).toHaveBeenCalledWith({
      request_id: firstId,
      board_size: 9,
      difficulty: 'normal',
      mode: 'human',
      opponent_id: 12,
      stake_amount: 25,
      time_limit_seconds: 300,
    });
  });

  it('asks for an opponent, refuses a challenge to yourself and rejects a stake that is not a whole number', async () => {
    await renderHome();
    await submitChallenge();
    expect(container).toHaveTextContent('Choose a member to challenge.');
    mockOpponentId = 11;
    act(() =>
      (
        Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Pick Bob') as HTMLButtonElement
      ).click(),
    );
    await submitChallenge();
    expect(container).toHaveTextContent('Choose another member to challenge.');
    mockOpponentId = 12;
    act(() =>
      (
        Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Pick Bob') as HTMLButtonElement
      ).click(),
    );
    setStake('2.5');
    await submitChallenge();
    expect(container).toHaveTextContent('Enter a whole-number stake from 0 to 1,000,000,000 TNB.');
    expect(createHexMatch).not.toHaveBeenCalled();
  });
});

it('keeps custom setup and the challenge shortcut available beside direct play', async () => {
  await renderHome();
  expect(container.querySelector('section[aria-label="Hex overview"] h1')).toHaveTextContent('Hex');
  expect(container.querySelector('section[aria-label="Hex overview"] button')).toHaveTextContent('Play free');
  expect(container.querySelector('a[href="#hex-challenge"]')).not.toBeNull();
  expect(container.querySelector('#hex-computer form')).not.toBeNull();
  expect(container.querySelector('#hex-challenge form')).not.toBeNull();
});

it.each([false, true])('starts the default game directly from the hero (authenticated: %s)', async (authenticated) => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(authenticated);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({self: {id: authenticated ? 11 : null}}),
  );
  (createHexMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: !authenticated});
  await renderHome();
  (container.querySelector('#computer-time') as HTMLSelectElement).value = '300';
  (container.querySelector('#computer-difficulty') as HTMLSelectElement).value = 'hard';
  const heroButton = container.querySelector('[aria-label="Hex overview"] button') as HTMLButtonElement;
  await act(async () => heroButton.click());
  expect(createHexMatch).toHaveBeenCalledWith({
    difficulty: 'normal',
    mode: 'computer',
    opponent_id: undefined,
    request_id: firstId,
    stake_amount: 0,
    board_size: 11,
    time_limit_seconds: 900,
  });
  expect(mockNavigate).toHaveBeenCalledWith('/hex/matches/42');
});
