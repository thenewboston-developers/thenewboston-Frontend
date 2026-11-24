import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createBattleshipMatch, getBattleshipMatches} from 'api/battleship';
import {useIsAuthenticated} from 'hooks';

import Home from './Home';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/battleship', () => ({createBattleshipMatch: jest.fn(), getBattleshipMatches: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('components/UserSearchInput', () => () => <div>Find a member</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({...jest.requireActual('react-router-dom'), useNavigate: () => jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
const firstId = '11111111-1111-4111-8111-111111111111';
const secondId = '22222222-2222-4222-8222-222222222222';
const randomUUID = jest.fn();

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
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID}});
  randomUUID.mockReturnValueOnce(firstId).mockReturnValue(secondId);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: 11}}));
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn(() => Promise.resolve()));
  (getBattleshipMatches as jest.Mock).mockResolvedValue({results: [], count: 0, next: null, previous: null});
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('creating battleship matches', () => {
  it('does not request private match lists when signed out', async () => {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    await renderHome();
    expect(getBattleshipMatches).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Sign in to play');
  });

  it('does not store a delayed created match after signing out', async () => {
    let resolveCreate: (match: unknown) => void = () => undefined;
    (createBattleshipMatch as jest.Mock).mockReturnValue(
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
      host: {id: 12, username: `Challenger ${index + 1}`},
      guest: {id: 11, username: 'Alice'},
      status: 'pending',
      stake_amount: 0,
      phase: 'placing',

      winner: null,
    }));
    const active = {...pending[0], id: 51, status: 'active', host: {id: 13, username: 'Older active opponent'}};
    (getBattleshipMatches as jest.Mock).mockImplementation((params) => {
      if (params.status === 'pending,active') {
        return Promise.resolve({
          results: params.page === 1 ? pending : [active],
          count: 51,
          next: params.page === 1 ? '/api/battleship/matches?page=2' : null,
          previous: null,
        });
      }
      return Promise.resolve({results: [], count: 0, next: null, previous: null});
    });
    await renderHome();
    expect(container.querySelector('a[href="/battleship/matches/51"]')).toHaveTextContent('Older active opponent');
    expect(getBattleshipMatches).toHaveBeenCalledWith(
      {page: 2, page_size: 50, status: 'pending,active'},
      expect.any(AbortSignal),
    );
    expect(getBattleshipMatches).toHaveBeenCalledWith(
      {page_size: 10, status: 'finished,cancelled,declined,expired'},
      expect.any(AbortSignal),
    );
    expect(getBattleshipMatches).toHaveBeenCalledTimes(3);
  });

  it('reuses the same request ID after an ambiguous network failure', async () => {
    (createBattleshipMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await submit();
    expect(createBattleshipMatch).toHaveBeenCalledTimes(2);
    expect((createBattleshipMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([
      firstId,
      firstId,
    ]);
    expect((createBattleshipMatch as jest.Mock).mock.calls[0][0]).toEqual({
      request_id: firstId,
      mode: 'computer',
      difficulty: 'normal',
      opponent_id: undefined,
      stake_amount: 0,
      time_limit_seconds: 900,
    });
  });

  it('uses a fresh request ID if the player changes the match terms', async () => {
    (createBattleshipMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    (container.querySelector('#computer-time') as HTMLSelectElement).value = '600';
    await submit();
    expect((createBattleshipMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([
      firstId,
      secondId,
    ]);
    expect((createBattleshipMatch as jest.Mock).mock.calls[1][0].time_limit_seconds).toBe(600);
  });

  it('prevents a double submission while creation is pending', async () => {
    (createBattleshipMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending to exercise the submission lock.
      }),
    );
    await renderHome();
    await submit();
    await submit();
    expect(createBattleshipMatch).toHaveBeenCalledTimes(1);
  });
});

it('lets signed-out visitors start a free Battleship computer match', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
  (createBattleshipMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: true});
  await renderHome();
  expect(container.querySelectorAll('form')).toHaveLength(1);
  expect(container).toHaveTextContent('No account needed');
  await submit();
  expect(createBattleshipMatch).toHaveBeenCalledWith(expect.objectContaining({mode: 'computer', stake_amount: 0}));
});
