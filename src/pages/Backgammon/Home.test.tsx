import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {createBackgammonMatch, getBackgammonMatches} from 'api/backgammon';
import {useIsAuthenticated} from 'hooks';

import Home from './Home';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/backgammon', () => ({createBackgammonMatch: jest.fn(), getBackgammonMatches: jest.fn()}));
jest.mock('components/GameEarningsLeaderboard', () => () => <div>Top earners</div>);
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
  (getBackgammonMatches as jest.Mock).mockResolvedValue({results: [], count: 0, next: null, previous: null});
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('creating backgammon matches', () => {
  it('loads unfinished matches beyond the first page while keeping finished history separate', async () => {
    const pending = Array.from({length: 50}, (_, index) => ({
      id: index + 1,
      white: {id: 12, username: `Challenger ${index + 1}`},
      black: {id: 11, username: 'Alice'},
      status: 'pending',
      stake_amount: 0,
      target_score: 3,
      scores: {white: 0, black: 0},
      winner: null,
    }));
    const active = {...pending[0], id: 51, status: 'active', white: {id: 13, username: 'Older active opponent'}};
    (getBackgammonMatches as jest.Mock).mockImplementation((params) => {
      if (params.mine === 'true' && params.status === 'pending,active,between_games') {
        return Promise.resolve({
          results: params.page === 1 ? pending : [active],
          count: 51,
          next: params.page === 1 ? '/api/backgammon/matches?page=2' : null,
          previous: null,
        });
      }
      return Promise.resolve({results: [], count: 0, next: null, previous: null});
    });
    await renderHome();
    expect(container.querySelector('a[href="/backgammon/matches/51"]')).toHaveTextContent('Older active opponent');
    expect(getBackgammonMatches).toHaveBeenCalledWith(
      {mine: 'true', page: 2, page_size: 50, status: 'pending,active,between_games'},
      expect.any(AbortSignal),
    );
    expect(getBackgammonMatches).toHaveBeenCalledWith(
      {mine: 'true', page_size: 10, status: 'finished'},
      expect.any(AbortSignal),
    );
    expect(getBackgammonMatches).toHaveBeenCalledTimes(4);
  });

  it('reuses the same request ID after an ambiguous network failure', async () => {
    (createBackgammonMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    await submit();
    expect(createBackgammonMatch).toHaveBeenCalledTimes(2);
    expect((createBackgammonMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([
      firstId,
      firstId,
    ]);
    expect((createBackgammonMatch as jest.Mock).mock.calls[0][0]).toEqual({
      request_id: firstId,
      mode: 'computer',
      difficulty: 'normal',
      opponent_id: undefined,
      stake_amount: 0,
      target_score: 3,
      time_limit_seconds: 900,
    });
  });

  it('uses a fresh request ID if the player changes the match terms', async () => {
    (createBackgammonMatch as jest.Mock).mockRejectedValue(new Error('Connection lost'));
    await renderHome();
    await submit();
    (container.querySelector('#computer-target') as HTMLSelectElement).value = '5';
    await submit();
    expect((createBackgammonMatch as jest.Mock).mock.calls.map(([data]) => data.request_id)).toEqual([
      firstId,
      secondId,
    ]);
    expect((createBackgammonMatch as jest.Mock).mock.calls[1][0].target_score).toBe(5);
  });

  it('prevents a double submission while creation is pending', async () => {
    (createBackgammonMatch as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep creation pending to exercise the submission lock.
      }),
    );
    await renderHome();
    await submit();
    await submit();
    expect(createBackgammonMatch).toHaveBeenCalledTimes(1);
  });
});

it('lets signed-out visitors start a free Backgammon computer match', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: null}}));
  (createBackgammonMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: true});
  await renderHome();
  expect(container.querySelectorAll('form')).toHaveLength(1);
  expect(container).toHaveTextContent('No account needed');
  await submit();
  expect(createBackgammonMatch).toHaveBeenCalledWith(expect.objectContaining({mode: 'computer', stake_amount: 0}));
});

it.each([false, true])('starts the default game directly from the hero (authenticated: %s)', async (authenticated) => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(authenticated);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({self: {id: authenticated ? 11 : null}}),
  );
  (createBackgammonMatch as jest.Mock).mockResolvedValue({id: 42, version: 1, guest_mode: !authenticated});
  await renderHome();
  (container.querySelector('#computer-time') as HTMLSelectElement).value = '300';
  (container.querySelector('#computer-difficulty') as HTMLSelectElement).value = 'hard';
  const heroButton = container.querySelector('[aria-label="Backgammon overview"] button') as HTMLButtonElement;
  await act(async () => heroButton.click());
  expect(createBackgammonMatch).toHaveBeenCalledWith({
    difficulty: 'normal',
    mode: 'computer',
    opponent_id: undefined,
    request_id: firstId,
    stake_amount: 0,
    target_score: 3,
    time_limit_seconds: 900,
  });
  expect(mockNavigate).toHaveBeenCalledWith('/backgammon/matches/42');
});
