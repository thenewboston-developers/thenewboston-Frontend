import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createMancalaMatch, getMancalaMatches} from 'api/mancala';
import {useIsAuthenticated} from 'hooks';

import Home from '.';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/mancala', () => ({createMancalaMatch: jest.fn(), getMancalaMatches: jest.fn()}));
jest.mock('../Leaderboard', () => () => <div>Fullest stores</div>);
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock(
  'components/UserSearchInput',
  () =>
    ({onChange}: {onChange: (user: {id: number; username: string}) => void}) => (
      <button onClick={() => onChange({id: 12, username: 'Bob'})} type="button">
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
const firstId = '11111111-1111-4111-8111-111111111111';
const secondId = '22222222-2222-4222-8222-222222222222';
const randomUUID = jest.fn();
const mockNavigate = jest.fn();
const emptyPage = {count: 0, next: null, previous: null, results: []};
const baseMatch = {
  board: [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0],
  guest: {id: 11, username: 'Alice'},
  host: {id: 12, username: 'Bob'},
  id: 1,
  stake_amount: 0,
  status: 'pending',
  time_limit_seconds: 600,
  winner: null,
};

const renderHome = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
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
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID}});
  randomUUID.mockReturnValueOnce(firstId).mockReturnValue(secondId);
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: 11}}));
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn(() => Promise.resolve()));
  (getMancalaMatches as jest.Mock).mockResolvedValue(emptyPage);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('the mancala lobby', () => {
  it('loads unfinished matches beyond the first page while keeping finished history separate', async () => {
    const pending = Array.from({length: 50}, (_, index) => ({
      ...baseMatch,
      host: {id: 12, username: `Challenger ${index + 1}`},
      id: index + 1,
    }));
    const active = {...baseMatch, host: {id: 13, username: 'Older active opponent'}, id: 51, status: 'active'};
    (getMancalaMatches as jest.Mock).mockImplementation((params) => {
      if (params.mine === 'true' && params.status === 'pending,active') {
        return Promise.resolve({
          count: 51,
          next: params.page === 1 ? '/api/mancala/matches?page=2' : null,
          previous: null,
          results: params.page === 1 ? pending : [active],
        });
      }
      return Promise.resolve(emptyPage);
    });
    await renderHome();
    expect(container.querySelector('a[href="/mancala/matches/51"]')).toHaveTextContent('Older active opponent');
    expect(container.querySelector('a[href="/mancala/matches/1"]')).toHaveTextContent('Review challenge');
    expect(getMancalaMatches).toHaveBeenCalledWith(
      {mine: 'true', page: 2, page_size: 50, status: 'pending,active'},
      expect.any(AbortSignal),
    );
    expect(getMancalaMatches).toHaveBeenCalledWith(
      {mine: 'true', page_size: 10, status: 'finished'},
      expect.any(AbortSignal),
    );
    expect(getMancalaMatches).toHaveBeenCalledTimes(4);
  });

  it('shows stores, stakes and the outcome on each row, including a draw', async () => {
    const won = {...baseMatch, board: [0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 21], id: 7, status: 'finished'};
    (getMancalaMatches as jest.Mock).mockImplementation((params) =>
      Promise.resolve(
        params.status === 'finished'
          ? {
              ...emptyPage,
              results: [
                {...won, stake_amount: 1500, winner: 'host'},
                {...won, board: [0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 24], guest: null, id: 8},
              ],
            }
          : emptyPage,
      ),
    );
    await renderHome();
    expect(container.querySelector('a[href="/mancala/matches/7"]')).toHaveTextContent(
      'Bob vs. Alice27–21 · 1,500 TNB each · Bob wonView result →',
    );
    expect(container.querySelector('a[href="/mancala/matches/8"]')).toHaveTextContent(
      'Bob vs. Computer24–24 · Free play · DrawView result →',
    );
  });

  it('lets a signed-out visitor watch live matches and play the computer, but not challenge a member', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
    (getMancalaMatches as jest.Mock).mockResolvedValue({...emptyPage, results: [{...baseMatch, status: 'active'}]});
    (createMancalaMatch as jest.Mock).mockResolvedValue({guest_mode: true, id: 42, version: 1});
    await renderHome();
    expect(container.textContent).toContain('No account needed');
    expect(container.textContent).toContain('Sign in to play');
    expect(container.querySelector('#mancala-challenge figcaption')).toHaveTextContent('so you play again');
    expect(container.querySelectorAll('form')).toHaveLength(1);
    expect(container.querySelector('a[href="/mancala/matches/1"]')).toHaveTextContent('Open board');
    // Only the public list is read: a guest has no account matches to load
    expect(getMancalaMatches).toHaveBeenCalledTimes(1);
    expect(getMancalaMatches).toHaveBeenCalledWith(
      {mine: 'exclude', page_size: 10, status: 'active'},
      expect.any(AbortSignal),
    );
    await submit();
    expect(createMancalaMatch).toHaveBeenCalledTimes(1);
    expect(createMancalaMatch).toHaveBeenCalledWith(expect.objectContaining({mode: 'computer', stake_amount: 0}));
  });

  it('says whose move it is on active boards', async () => {
    const active = {...baseMatch, active_side: 'guest', board: [4, 4, 0, 5, 5, 5, 1, 4, 4, 4, 4, 4, 4, 0]};
    (getMancalaMatches as jest.Mock).mockImplementation((params) => {
      if (params.mine === 'true' && params.status === 'pending,active') {
        return Promise.resolve({
          ...emptyPage,
          results: [
            {...active, id: 2, status: 'active', your_side: 'guest'},
            {...active, active_side: 'host', id: 3, status: 'active', your_side: 'guest'},
          ],
        });
      }
      if (params.mine === 'exclude') {
        return Promise.resolve({...emptyPage, results: [{...active, id: 4, status: 'active', your_side: null}]});
      }
      return Promise.resolve(emptyPage);
    });
    await renderHome();
    expect(container.querySelector('a[href="/mancala/matches/2"]')).toHaveTextContent('Your move');
    expect(container.querySelector('a[href="/mancala/matches/3"]')).toHaveTextContent('Their move');
    expect(container.querySelector('a[href="/mancala/matches/4"]')).toHaveTextContent('Alice to move');
    // The stores are drawn for sighted players and spoken from the hidden score
    expect(container.querySelector('a[href="/mancala/matches/4"]')).toHaveTextContent('1–0 · Free play');
  });

  it('sends the difficulty and clock picked on the computer board', async () => {
    (createMancalaMatch as jest.Mock).mockResolvedValue({id: 42, version: 1});
    await renderHome();
    expect(container.querySelector('#computer-difficulty-normal')).toBeChecked();
    expect(container.querySelector('#computer-time-600')).toBeChecked();
    await act(async () => {
      (container.querySelector('#computer-difficulty-easy') as HTMLInputElement).click();
      (container.querySelector('#computer-time-1800') as HTMLInputElement).click();
    });
    await submit();
    expect(createMancalaMatch).toHaveBeenCalledWith(
      expect.objectContaining({difficulty: 'easy', mode: 'computer', time_limit_seconds: 1800}),
    );
    expect(mockNavigate).toHaveBeenCalledWith('/mancala/matches/42');
  });

  it('sends a challenge with the clock picked in its own trough', async () => {
    (createMancalaMatch as jest.Mock).mockResolvedValue({id: 43, version: 1});
    await renderHome();
    await act(async () => {
      (container.querySelector('#mancala-challenge button[type="button"]') as HTMLButtonElement).click();
      (container.querySelector('#human-time-900') as HTMLInputElement).click();
    });
    expect(container.querySelector('#computer-time-600')).toBeChecked();
    await act(async () => {
      container.querySelectorAll('form')[1].dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    });
    expect(createMancalaMatch).toHaveBeenCalledWith(
      expect.objectContaining({mode: 'human', opponent_id: 12, stake_amount: 0, time_limit_seconds: 900}),
    );
  });

  it('reuses the same request ID after an ambiguous network failure', async () => {
    (createMancalaMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await submit();
    expect(createMancalaMatch).toHaveBeenCalledTimes(2);
    expect((createMancalaMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, firstId]);
    expect((createMancalaMatch as jest.Mock).mock.calls[0][0]).toEqual({
      difficulty: 'normal',
      mode: 'computer',
      opponent_id: undefined,
      request_id: firstId,
      stake_amount: 0,
      time_limit_seconds: 600,
    });
    expect(container.querySelector('[role="alert"]')).toHaveTextContent('We could not reach the game');
  });

  it('uses a fresh request ID if the player changes the match terms', async () => {
    (createMancalaMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await act(async () => (container.querySelector('#computer-difficulty-hard') as HTMLInputElement).click());
    await submit();
    expect((createMancalaMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, secondId]);
    expect((createMancalaMatch as jest.Mock).mock.calls[1][0].difficulty).toBe('hard');
  });

  it('prevents a double submission while creation is pending', async () => {
    (createMancalaMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending to exercise the submission lock.
      }),
    );
    await renderHome();
    await submit();
    await submit();
    expect(createMancalaMatch).toHaveBeenCalledTimes(1);
  });

  it('requires an opponent before sending a challenge', async () => {
    await renderHome();
    await act(async () => {
      container.querySelectorAll('form')[1].dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    });
    expect(createMancalaMatch).not.toHaveBeenCalled();
    expect(container.querySelector('[role="alert"]')).toHaveTextContent('Choose a member to challenge.');
  });
});

it.each([false, true])('starts the default game directly from the hero (authenticated: %s)', async (authenticated) => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(authenticated);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({self: {id: authenticated ? 11 : null}}),
  );
  (createMancalaMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: !authenticated});
  await renderHome();
  await act(async () => {
    (container.querySelector('#computer-time-300') as HTMLInputElement).click();
    (container.querySelector('#computer-difficulty-hard') as HTMLInputElement).click();
  });
  const heroButton = container.querySelector('[aria-label="Mancala overview"] button') as HTMLButtonElement;
  await act(async () => heroButton.click());
  expect(createMancalaMatch).toHaveBeenCalledWith({
    difficulty: 'normal',
    mode: 'computer',
    opponent_id: undefined,
    request_id: firstId,
    stake_amount: 0,
    time_limit_seconds: 600,
  });
  expect(mockNavigate).toHaveBeenCalledWith('/mancala/matches/42');
});
