import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, useNavigate} from 'react-router-dom';

import {getTribesState, getTribesTournaments} from 'api/tribes';
import {TribesTournament} from 'types/tribes';

import Tribes from './index';

jest.mock('api/tribes', () => ({getTribesState: jest.fn(), getTribesTournaments: jest.fn()}));
jest.mock('axios', () => ({isAxiosError: (error: {isAxiosError?: boolean}) => !!error?.isAxiosError}));
let mockUserId: number | null = 7;
jest.mock('react-redux', () => ({useSelector: () => ({id: mockUserId})}));
jest.mock('selectors/state', () => ({getSelf: jest.fn()}));
jest.mock('store', () => ({store: {getState: () => ({authentication: {accessToken: null}})}}));
jest.mock('./art/HeroScene', () => () => null);

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
const listing = (id: number, status: TribesTournament['status'] = 'upcoming'): TribesTournament => ({
  id,
  title: `Cup ${id}`,
  status,
  starts_at: '2026-12-01T12:00:00Z',
  ends_at: '2026-12-04T12:00:00Z',
  max_players: 16,
  player_count: 12,
  is_participant: false,
});
const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return {promise, resolve};
};
let container: HTMLDivElement;
let navigate: ReturnType<typeof useNavigate>;
let root: Root;
const Navigation = () => {
  navigate = useNavigate();
  return null;
};
const render = async (path = '/tribes') =>
  act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={[path]}>
        <Tribes />
        <Navigation />
      </MemoryRouter>,
    ),
  );

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
  mockUserId = 7;
  jest.mocked(getTribesTournaments).mockResolvedValue([]);
  jest.mocked(getTribesState).mockReturnValue(
    new Promise(() => {
      /* Keep the game read pending. */
    }),
  );
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  jest.useRealTimers();
});

test('the public landing page lists scheduled, active and finished tournaments with capacity and participation', async () => {
  jest
    .mocked(getTribesTournaments)
    .mockResolvedValue([
      {...listing(1), is_participant: true},
      listing(2, 'active'),
      listing(3, 'finished'),
      {...listing(4), player_count: 16},
    ]);
  await render();
  expect(container).toHaveTextContent('Upcoming tournaments');
  expect(container).toHaveTextContent('Active tournaments');
  expect(container).toHaveTextContent('Finished tournaments');
  expect(container).toHaveTextContent('You are enrolled');
  expect(container).toHaveTextContent('12 / 16 players');
  expect(container).toHaveTextContent('4 places available');
  expect(container).toHaveTextContent('Full');
  expect(container).toHaveTextContent('Starts');
  expect(container).toHaveTextContent('Ends');
  expect(container.querySelector('a[href="/tribes/tournaments/3/home"]')).toHaveTextContent('View results');
  expect(getTribesState).not.toHaveBeenCalled();
  await act(async () => (container.querySelector('a[href="/tribes/tournaments/2/home"]') as HTMLAnchorElement).click());
  expect(getTribesState).toHaveBeenLastCalledWith(2, expect.any(AbortSignal));
});

test('anonymous visitors can create an account or sign in and return to the tournament list', async () => {
  mockUserId = null;
  await render();
  expect(container.querySelector('a[href="/create-account?next=%2Ftribes"]')).not.toBeNull();
  expect(container.querySelector('a[href="/sign-in?next=%2Ftribes"]')).not.toBeNull();
  expect(container).toHaveTextContent('creating an account does not reserve a place');
  expect(container).toHaveTextContent('No tournaments yet');
  expect(getTribesState).not.toHaveBeenCalled();
});

test('switching explicit tournament URLs cancels the old read and never requests an implicit game', async () => {
  await render('/tribes/tournaments/12/world');
  const firstSignal = jest.mocked(getTribesState).mock.calls[0][1]!;
  await act(async () => navigate('/tribes/tournaments/25/inventory'));
  expect(firstSignal.aborted).toBe(true);
  expect(getTribesState).toHaveBeenLastCalledWith(25, expect.any(AbortSignal));
  await act(async () => navigate('/tribes/tournaments/0/home'));
  expect(container).toHaveTextContent('No tournaments yet');
  expect(getTribesState).toHaveBeenCalledTimes(2);
});

test('account switching clears participation markers and ignores a delayed previous account list', async () => {
  jest.mocked(getTribesTournaments).mockResolvedValueOnce([{...listing(1), is_participant: true}]);
  await render();
  const old = deferred<TribesTournament[]>();
  jest.mocked(getTribesTournaments).mockReturnValueOnce(old.promise);
  await act(async () => jest.advanceTimersByTime(15000));
  mockUserId = 8;
  jest.mocked(getTribesTournaments).mockResolvedValueOnce([listing(2)]);
  await render();
  expect(container).not.toHaveTextContent('You are enrolled');
  await act(async () => old.resolve([{...listing(99), is_participant: true}]));
  expect(container).toHaveTextContent('Cup 2');
  expect(container).not.toHaveTextContent('Cup 99');
});

test('pagination preserves all tournaments and resets safely after an account change', async () => {
  const head = Array.from({length: 100}, (_, index) => listing(200 - index));
  jest.mocked(getTribesTournaments).mockResolvedValueOnce(head).mockResolvedValueOnce(head);
  await render();
  const older = deferred<TribesTournament[]>();
  jest.mocked(getTribesTournaments).mockReturnValueOnce(older.promise);
  const more = Array.from(container.querySelectorAll('button')).find(
    (button) => button.textContent === 'Load more tournaments',
  )!;
  await act(async () => more.click());
  expect(getTribesTournaments).toHaveBeenLastCalledWith(expect.any(AbortSignal), 101);
  mockUserId = 9;
  jest.mocked(getTribesTournaments).mockResolvedValueOnce([]);
  await render();
  await act(async () => older.resolve([{...listing(100), is_participant: true}]));
  expect(container).toHaveTextContent('No tournaments yet');
  expect(container).not.toHaveTextContent('Cup 100');
});

test('polling removes deleted tournaments instead of keeping stale capacity or membership', async () => {
  jest
    .mocked(getTribesTournaments)
    .mockResolvedValueOnce([listing(1), listing(2)])
    .mockResolvedValueOnce([listing(2)]);
  await render();
  await act(async () => jest.advanceTimersByTime(15000));
  expect(container).toHaveTextContent('Cup 2');
  expect(container).not.toHaveTextContent('Cup 1');
});
