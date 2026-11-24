import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createCheckersMatch, getCheckersMatches} from 'api/checkers';
import {useIsAuthenticated} from 'hooks';

import Home from './Home';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/checkers', () => ({createCheckersMatch: jest.fn(), getCheckersMatches: jest.fn()}));
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
    (container.querySelector('#computer-time') as HTMLSelectElement).value = '600';
    await submit();
    expect((createCheckersMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([firstId, secondId]);
    expect((createCheckersMatch as jest.Mock).mock.calls[1][0].time_limit_seconds).toBe(600);
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
