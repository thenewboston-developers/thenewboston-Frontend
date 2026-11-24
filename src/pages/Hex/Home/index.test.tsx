import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createHexMatch, getHexMatches} from 'api/hex';
import {useIsAuthenticated} from 'hooks';

import Home from '.';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/hex', () => ({createHexMatch: jest.fn(), getHexMatches: jest.fn()}));
jest.mock('../Leaderboard', () => () => <div>Top connectors</div>);
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
    await choose('#computer-size-7');
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
  const sizes = Array.from(container.querySelectorAll<HTMLInputElement>('#hex-challenge input[name="board_size"]'));
  expect(sizes.map((input) => input.value)).toEqual(['7', '9', '11', '13']);
  expect(sizes.map((input) => input.closest('label')!.textContent)).toEqual([
    '7 × 7Quick game',
    '9 × 9Short game',
    '11 × 11Classic',
    '13 × 13Long game',
  ]);
  expect(sizes.filter((input) => input.checked).map((input) => input.value)).toEqual(['11']);
  expect(container.querySelector('a[href="/hex/matches/7"]')).toHaveTextContent('Alice vs. Bob');
  expect(container.querySelector('a[href="/hex/matches/7"]')).toHaveTextContent('In play · 13 × 13 · 25 TNB each');
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
    await choose('#human-size-9');
    await choose('#human-time-300');
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
  await choose('#computer-time-300');
  await choose('#computer-difficulty-hard');
  await choose('#computer-size-13');
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

it('sends the difficulty, board and clock picked on the themed controls', async () => {
  (createHexMatch as jest.Mock).mockResolvedValue({id: 5, version: 1});
  await renderHome();
  const checked = (name: string) =>
    container.querySelector<HTMLInputElement>(`#hex-computer input[name="${name}"]:checked`)!.value;
  expect([checked('difficulty'), checked('board_size'), checked('time_limit_seconds')]).toEqual([
    'normal',
    '11',
    '900',
  ]);
  await choose('#computer-difficulty-hard');
  await choose('#computer-size-7');
  await choose('#computer-time-1800');
  await submit();
  expect(createHexMatch).toHaveBeenCalledWith(
    expect.objectContaining({board_size: 7, difficulty: 'hard', mode: 'computer', time_limit_seconds: 1800}),
  );
});

it('names each match by its state and the action it needs', async () => {
  const match = {red: {id: 11, username: 'Alice'}, blue: {id: 12, username: 'Bob'}, stake_amount: 0, board_size: 9};
  (getHexMatches as jest.Mock).mockImplementation((params) =>
    Promise.resolve({
      results:
        params.status === 'pending,active'
          ? [
              {...match, id: 1, red: {id: 12, username: 'Bob'}, blue: {id: 11, username: 'Alice'}, status: 'pending'},
              {...match, id: 2, status: 'pending'},
              {...match, id: 3, status: 'active'},
            ]
          : [{...match, id: 4, status: 'finished', winner: 'red'}],
      count: 3,
      next: null,
      previous: null,
    }),
  );
  await renderHome();
  expect(container.querySelector('a[href="/hex/matches/1"]')).toHaveTextContent('Bob vs. Alice');
  expect(container.querySelector('a[href="/hex/matches/1"]')).toHaveTextContent('Review challenge');
  expect(container.querySelector('a[href="/hex/matches/2"]')).toHaveTextContent('Pending · 9 × 9 · Free play');
  expect(container.querySelector('a[href="/hex/matches/2"]')).toHaveTextContent('Awaiting reply');
  expect(container.querySelector('a[href="/hex/matches/3"]')).toHaveTextContent('Open board');
  expect(container.querySelector('a[href="/hex/matches/4"]')).toHaveTextContent(
    'Finished · 9 × 9 · Free play · Alice won',
  );
  expect(container.querySelector('a[href="/hex/matches/4"]')).toHaveTextContent('View result');
  expect(Array.from(container.querySelectorAll('h2')).map((heading) => heading.textContent)).toEqual(
    expect.arrayContaining(['Challenges', 'Your active matches', 'Your recent matches']),
  );
});

it('shows signed-out visitors which edges each side joins beside the sign-in buttons', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  await renderHome();
  expect(container.querySelector('#hex-challenge')).toHaveTextContent('Sign in to play');
  expect(container.querySelector('#hex-challenge')).toHaveTextContent('Red joins top and bottom');
  expect(container.querySelector('#hex-challenge')).toHaveTextContent('Blue joins left and right');
  const pictures = Array.from(container.querySelectorAll('#hex-challenge svg'));
  expect(pictures.length).toBeGreaterThan(1);
  expect(pictures.every((picture) => picture.closest('[aria-hidden="true"]'))).toBe(true);
});

it('tells a signed-in player with no matches that the board is clear', async () => {
  await renderHome();
  expect(container).toHaveTextContent('The board is clear');
  expect(container).toHaveTextContent('Top connectors');
});
