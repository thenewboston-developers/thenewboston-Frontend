import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createReversiMatch, getReversiMatches} from 'api/reversi';
import {useIsAuthenticated} from 'hooks';

import Home from '.';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/reversi', () => ({createReversiMatch: jest.fn(), getReversiMatches: jest.fn()}));
jest.mock('../Leaderboard', () => () => <div>Masters of the board</div>);
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock(
  'components/UserSearchInput',
  () =>
    ({onChange}: {onChange: (user: {id: number; username: string}) => void}) => (
      <button id="pick-opponent" onClick={() => onChange({id: 12, username: 'Bob'})} type="button">
        Find a member
      </button>
    ),
);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({...jest.requireActual('react-router-dom'), useNavigate: () => mockNavigate}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
const emptyPage = {count: 0, next: null, previous: null, results: []};
const firstId = '11111111-1111-4111-8111-111111111111';
const secondId = '22222222-2222-4222-8222-222222222222';
const randomUUID = jest.fn();
const mockNavigate = jest.fn();

const renderHome = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
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
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID}});
  randomUUID.mockReturnValueOnce(firstId).mockReturnValue(secondId);
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: 11}}));
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn(() => Promise.resolve()));
  (getReversiMatches as jest.Mock).mockResolvedValue(emptyPage);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('reversi lobby', () => {
  it('loads unfinished matches beyond the first page and labels challenges by who sent them', async () => {
    const incoming = Array.from({length: 50}, (_, index) => ({
      black: {id: 12, username: `Challenger ${index + 1}`},
      host_side: 'black',
      id: index + 1,
      scores: {black: 2, white: 2},
      stake_amount: 0,
      status: 'pending',
      white: {id: 11, username: 'Alice'},
      winner: null,
    }));
    const outgoing = {...incoming[0], black: {id: 11, username: 'Alice'}, id: 51, white: {id: 13, username: 'Bob'}};
    const active = {...incoming[0], id: 52, scores: {black: 9, white: 4}, stake_amount: 25, status: 'active'};
    (getReversiMatches as jest.Mock).mockImplementation((params) => {
      if (params.mine === 'true' && params.status === 'pending,active') {
        return Promise.resolve({
          count: 52,
          next: params.page === 1 ? '/api/reversi/matches?page=2' : null,
          previous: null,
          results: params.page === 1 ? incoming : [outgoing, active],
        });
      }
      return Promise.resolve(emptyPage);
    });
    await renderHome();
    expect(container.querySelector('a[href="/reversi/matches/1"]')).toHaveTextContent('Review challenge');
    expect(container.querySelector('a[href="/reversi/matches/51"]')).toHaveTextContent('Awaiting reply');
    expect(container.querySelector('a[href="/reversi/matches/52"]')).toHaveTextContent('9–4 · 25 TNB each');
    expect(getReversiMatches).toHaveBeenCalledWith(
      {mine: 'true', page: 2, page_size: 50, status: 'pending,active'},
      expect.any(AbortSignal),
    );
    expect(getReversiMatches).toHaveBeenCalledWith(
      {mine: 'true', page_size: 10, status: 'finished'},
      expect.any(AbortSignal),
    );
    expect(getReversiMatches).toHaveBeenCalledTimes(4);
  });

  it('shows started matches as a disk count and challenges as a disk waiting to be played', async () => {
    const base = {
      black: {id: 11, username: 'Alice'},
      host_side: 'black',
      scores: {black: 2, white: 2},
      stake_amount: 0,
      white: {id: 13, username: 'Bob'},
      winner: null,
    };
    (getReversiMatches as jest.Mock).mockImplementation((params) => {
      if (params.status === 'pending,active') {
        return Promise.resolve({
          ...emptyPage,
          results: [
            {...base, id: 1, status: 'pending'},
            {...base, id: 2, scores: {black: 30, white: 12}, status: 'active'},
          ],
        });
      }
      if (params.status === 'finished') {
        return Promise.resolve({
          ...emptyPage,
          results: [
            {...base, id: 3, scores: {black: 20, white: 44}, stake_amount: 50, status: 'finished', winner: 'white'},
          ],
        });
      }
      return Promise.resolve(emptyPage);
    });
    await renderHome();
    const row = (id: number) => container.querySelector(`a[href="/reversi/matches/${id}"]`)!;
    const counts = (id: number) => Array.from(row(id).querySelectorAll('b')).map((count) => count.textContent);
    expect(row(1)).toHaveTextContent('Alice vs. Bob');
    expect(row(1)).toHaveTextContent('Challenge · Free play');
    expect(row(1)).toHaveTextContent('Awaiting reply →');
    expect(counts(1)).toEqual([]);
    expect(counts(2)).toEqual(['30', '12']);
    expect(row(2)).toHaveTextContent('30–12 · Free play');
    expect(row(2)).toHaveTextContent('Open board →');
    expect(counts(3)).toEqual(['20', '44']);
    expect(row(3)).toHaveTextContent('20–44 · 50 TNB each · Bob won');
    expect(row(3)).toHaveTextContent('View result →');
    expect(container.textContent).toContain('No other matches are underway.');
  });

  it('lets a signed-out visitor watch live games and start a free computer game as a guest', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {}}));
    (createReversiMatch as jest.Mock).mockResolvedValue({id: 9, version: 1});
    (getReversiMatches as jest.Mock).mockResolvedValue({
      ...emptyPage,
      results: [
        {
          black: {id: 12, username: 'Bob'},
          host_side: 'black',
          id: 7,
          scores: {black: 20, white: 12},
          stake_amount: 0,
          status: 'active',
          white: null,
          winner: null,
        },
      ],
    });
    await renderHome();
    expect(container.querySelector('a[href="/reversi/matches/7"]')).toHaveTextContent('Bob vs. Computer');
    expect(getReversiMatches).toHaveBeenCalledTimes(1);
    expect(getReversiMatches).toHaveBeenCalledWith(
      {mine: 'exclude', page_size: 10, status: 'active'},
      expect.any(AbortSignal),
    );
    // Only the computer form is offered; challenging a member needs an account.
    expect(container.querySelectorAll('form')).toHaveLength(1);
    expect(container.textContent).toContain('No account needed');
    expect(container.textContent).toContain('Sign in to play');
    await submit();
    expect(createReversiMatch).toHaveBeenCalledTimes(1);
    expect((createReversiMatch as jest.Mock).mock.calls[0][0]).toMatchObject({mode: 'computer', stake_amount: 0});
  });

  it('reuses the same request ID after an ambiguous network failure', async () => {
    (createReversiMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await submit();
    expect(createReversiMatch).toHaveBeenCalledTimes(2);
    expect((createReversiMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, firstId]);
    expect((createReversiMatch as jest.Mock).mock.calls[0][0]).toEqual({
      color: 'random',
      difficulty: 'normal',
      mode: 'computer',
      opponent_id: undefined,
      request_id: firstId,
      stake_amount: 0,
      time_limit_seconds: 900,
    });
  });

  it('uses a fresh request ID if the player changes the match terms', async () => {
    (createReversiMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await choose('#computer-color-white');
    await submit();
    expect((createReversiMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, secondId]);
    expect((createReversiMatch as jest.Mock).mock.calls[1][0].color).toBe('white');
  });

  it('sends the difficulty, disks and clock picked on the board controls', async () => {
    (createReversiMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending: only the request matters here.
      }),
    );
    await renderHome();
    expect((container.querySelector('#computer-difficulty-normal') as HTMLInputElement).checked).toBe(true);
    expect((container.querySelector('#computer-color-random') as HTMLInputElement).checked).toBe(true);
    expect((container.querySelector('#computer-time-900') as HTMLInputElement).checked).toBe(true);
    await choose('#computer-difficulty-hard');
    await choose('#computer-color-black');
    await choose('#computer-time-300');
    await submit();
    expect((createReversiMatch as jest.Mock).mock.calls[0][0]).toMatchObject({
      color: 'black',
      difficulty: 'hard',
      mode: 'computer',
      time_limit_seconds: 300,
    });
  });

  it('sends a challenge with the disks and clock picked in the challenge panel', async () => {
    (createReversiMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending: only the request matters here.
      }),
    );
    await renderHome();
    await choose('#pick-opponent');
    await choose('#human-color-white');
    await choose('#human-time-600');
    // The computer panel keeps its own choices
    expect((container.querySelector('#computer-color-random') as HTMLInputElement).checked).toBe(true);
    await act(async () => {
      container.querySelectorAll('form')[1].dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    });
    expect((createReversiMatch as jest.Mock).mock.calls[0][0]).toEqual({
      color: 'white',
      difficulty: 'normal',
      mode: 'human',
      opponent_id: 12,
      request_id: firstId,
      stake_amount: 0,
      time_limit_seconds: 600,
    });
  });

  it('prevents a double submission while creation is pending', async () => {
    (createReversiMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending to exercise the submission lock.
      }),
    );
    await renderHome();
    await submit();
    await submit();
    expect(createReversiMatch).toHaveBeenCalledTimes(1);
  });

  it('requires an opponent before sending a challenge', async () => {
    await renderHome();
    await act(async () => {
      container.querySelectorAll('form')[1].dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    });
    expect(container.querySelector('[role="alert"]')).toHaveTextContent('Choose a member to challenge.');
    expect(createReversiMatch).not.toHaveBeenCalled();
  });
});

it.each([false, true])('starts the default game directly from the hero (authenticated: %s)', async (authenticated) => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(authenticated);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({self: {id: authenticated ? 11 : null}}),
  );
  (createReversiMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: !authenticated});
  await renderHome();
  await choose('#computer-time-300');
  await choose('#computer-difficulty-hard');
  const heroButton = container.querySelector('[aria-label="Reversi overview"] button') as HTMLButtonElement;
  await act(async () => heroButton.click());
  expect(createReversiMatch).toHaveBeenCalledWith({
    difficulty: 'normal',
    mode: 'computer',
    opponent_id: undefined,
    request_id: firstId,
    stake_amount: 0,
    color: 'random',
    time_limit_seconds: 900,
  });
  expect(mockNavigate).toHaveBeenCalledWith('/reversi/matches/42');
});
