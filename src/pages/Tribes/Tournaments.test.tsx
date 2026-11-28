import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, useNavigate} from 'react-router-dom';

import {getTribesCatalog, getTribesState, getTribesTournaments} from 'api/tribes';
import {TribesState, TribesTournament} from 'types/tribes';

import Tribes from './index';

jest.mock('api/tribes', () => ({
  getTribesCatalog: jest.fn(),
  getTribesState: jest.fn(),
  getTribesTournaments: jest.fn(),
}));
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
const catalog: TribesState['catalog'] = {
  building_capacity: 3,
  buildings: {},
  currency: 'TNB',
  defenses: {},
  gather_capacity: 5,
  gather_rate: 10,
  items: ['timber', 'lumber'],
  land: {forest: {price: 40, resource: 'timber'}},
  max_members: 8,
  queue_seconds: 86400,
  recipes: {lumber: {inputs: {timber: 2}, seconds: 120, facility: null}},
  trade_items: ['timber', 'lumber'],
  unit_capacity: 100,
  units: {},
};
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
  jest.mocked(getTribesCatalog).mockResolvedValue(catalog);
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
  expect(container).toHaveTextContent('No tournaments yet');
  expect(getTribesState).not.toHaveBeenCalled();
});

test.each([
  [null, '/tribes/home'],
  [7, '/tribes'],
] as const)('visitor %s can learn the rules from %s without any tournaments', async (userId, path) => {
  mockUserId = userId;
  await render(path);
  expect(container).toHaveTextContent('No tournaments yet');
  const link = container.querySelector<HTMLAnchorElement>('a[href="/tribes/guide"]')!;
  expect(link).toHaveTextContent('How to play');
  await act(async () => link.click());
  expect(container.querySelector('h1')).toHaveTextContent('How to play');
  expect(container).toHaveTextContent('Meet your tribe.');
  expect(container).toHaveTextContent('One simultaneous battle.');
  expect(container).toHaveTextContent('Land and what it yields');
  expect(container).toHaveTextContent('Everything your worker can make');
  expect(container.querySelector('table')).toHaveTextContent('Lumber');
  expect(getTribesCatalog).toHaveBeenCalledTimes(1);
  expect(getTribesState).not.toHaveBeenCalled();
  expect(container.querySelector('a[href*="sign-in"]')).toBeNull();
  await act(async () => container.querySelector<HTMLAnchorElement>('a[href="/tribes"]')!.click());
  expect(container).toHaveTextContent('No tournaments yet');
});

test('a direct public guide link renders its rules immediately and aborts catalog loading when leaving', async () => {
  mockUserId = null;
  const waiting = deferred<TribesState['catalog']>();
  jest.mocked(getTribesCatalog).mockReturnValueOnce(waiting.promise);
  await render('/tribes/guide');
  expect(container).toHaveTextContent('Meet your tribe.');
  expect(container).toHaveTextContent('Loading the resource and recipe catalog');
  expect(getTribesTournaments).not.toHaveBeenCalled();
  expect(getTribesState).not.toHaveBeenCalled();
  const signal = jest.mocked(getTribesCatalog).mock.calls[0][0]!;
  await act(async () => navigate('/tribes'));
  expect(signal.aborted).toBe(true);
  await act(async () => waiting.resolve(catalog));
  expect(container).toHaveTextContent('No tournaments yet');
  expect(container.querySelector('table')).toBeNull();
});

test('signed-out visitors can independently expand all six rule panels even when the catalog is unavailable', async () => {
  mockUserId = null;
  jest.mocked(getTribesCatalog).mockRejectedValueOnce(new Error('offline'));
  await render('/tribes/guide');
  const chapters = Array.from(container.querySelectorAll('article'));
  const panels = chapters.map((chapter) => chapter.querySelector('details')!);
  expect(panels).toHaveLength(6);
  const importantRules = [
    ['The organizer enrolls players and assigns tribes', 'Every member has equal economic permissions'],
    ['queue up to 24 hours', 'Completed work is retained when you cancel'],
    [
      'All prices use actual TNB',
      'Every member can spend or withdraw',
      'no starting coin grants, wallet resets, or guaranteed tournament payouts',
      'Cancel an unfilled order to return its escrow',
    ],
    ['including diagonals', 'Weapons must be placed on owned land'],
    ['your pack, which only you can use', 'warehouse, which every member can use', 'attack targets remain secret'],
    ['unassigned units do not attack', 'all economic actions stop', 'attacks simultaneously', 'shared ranks for ties'],
  ];
  for (const [index, panel] of panels.entries()) {
    const rules = panel.querySelector('div')!;
    const summary = panel.querySelector('summary')!;
    expect(panel.open).toBe(false);
    expect(rules).not.toBeVisible();
    expect(summary).toHaveAccessibleName(
      new RegExp(`Read the rules\\s*:\\s*${chapters[index].querySelector('h3')!.textContent}`),
    );
    act(() => summary.click());
    expect(panel.open).toBe(true);
    expect(rules).toBeVisible();
    importantRules[index].forEach((rule) => expect(rules).toHaveTextContent(rule));
  }
  expect(panels.every((panel) => panel.open)).toBe(true);
  await act(async () => panels[0].querySelector('summary')!.click());
  expect(panels[0].open).toBe(false);
  expect(panels.slice(1).every((panel) => panel.open)).toBe(true);
  expect(container).toHaveTextContent('App TNB balances persist');
  expect(container).toHaveTextContent('Unspent treasury is divided equally among the locked roster');
  expect(container).toHaveTextContent('Spent coins are not refunded');
  expect(container.querySelector('a[href*="sign-in"]')).toBeNull();
  expect(getTribesState).not.toHaveBeenCalled();
  expect(getTribesTournaments).not.toHaveBeenCalled();
});

test('catalog errors keep all rules available and can be retried independently of a game', async () => {
  jest.mocked(getTribesCatalog).mockRejectedValueOnce(new Error('offline'));
  await render('/tribes/guide');
  expect(container).toHaveTextContent('Your worker keeps going.');
  expect(container).toHaveTextContent('The resource and recipe catalog could not be loaded');
  const retry = Array.from(container.querySelectorAll('button')).find(
    (button) => button.textContent?.trim() === 'Retry catalog',
  )!;
  await act(async () => retry.click());
  expect(container).toHaveTextContent('Everything your worker can make');
  expect(container).not.toHaveTextContent('could not be loaded');
  expect(getTribesState).not.toHaveBeenCalled();
  expect(getTribesTournaments).not.toHaveBeenCalled();
});

test('the in-game guide retains its explicit tournament scope', async () => {
  await render('/tribes/tournaments/25/guide');
  expect(container).toHaveTextContent('Your worker keeps going.');
  expect(getTribesState).toHaveBeenLastCalledWith(25, expect.any(AbortSignal));
  expect(getTribesCatalog).not.toHaveBeenCalled();
});

test('covers load lazily and missing or failed artwork leaves readable tournament cards', async () => {
  jest
    .mocked(getTribesTournaments)
    .mockResolvedValue([
      {...listing(1), cover_image: 'https://media.example/cup.png'},
      {...listing(2), cover_image: null},
      listing(3),
    ]);
  await render();
  const cards = container.querySelectorAll('article');
  const cover = cards[0].querySelector('img')!;
  expect(cover).toHaveAttribute('src', 'https://media.example/cup.png');
  expect(cover).toHaveAttribute('loading', 'lazy');
  expect(cover).toHaveAttribute('alt', '');
  expect(cover).toHaveStyle({opacity: '0'});
  await act(async () => cover.dispatchEvent(new Event('load')));
  expect(cover).toHaveStyle({opacity: '1'});
  await act(async () => cover.dispatchEvent(new Event('error')));
  expect(cards[0].querySelector('img')).toBeNull();
  expect(cards[0]).toHaveTextContent('Cup 1');
  expect(cards[0]).toHaveTextContent('12 / 16 players');
  expect(cards[0].querySelector('a')).toHaveAttribute('href', '/tribes/tournaments/1/home');
  expect(cards[1].querySelector('img')).toBeNull();
  expect(cards[2].querySelector('img')).toBeNull();
  expect(cards[1]).toHaveTextContent('Tribes');
  expect(cards[2]).toHaveTextContent('Cup 3');
});

test('a replacement cover resets a failed image when tournament metadata is refreshed', async () => {
  jest
    .mocked(getTribesTournaments)
    .mockResolvedValueOnce([{...listing(1), cover_image: 'https://media.example/old.png'}]);
  await render();
  await act(async () => container.querySelector('article img')!.dispatchEvent(new Event('error')));
  jest
    .mocked(getTribesTournaments)
    .mockResolvedValueOnce([{...listing(1), cover_image: 'https://media.example/new.png'}]);
  await act(async () => jest.advanceTimersByTime(15000));
  expect(container.querySelector('article img')).toHaveAttribute('src', 'https://media.example/new.png');
  expect(container.querySelector('article img')).toHaveStyle({opacity: '0'});
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
