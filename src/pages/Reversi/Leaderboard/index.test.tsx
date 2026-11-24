import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import {getGameEarnings} from 'api/gameEarnings';
import {GameEarningsEntry, GameEarningsPage} from 'types/gameEarnings';

import {getHolding} from './holdings';
import Leaderboard from '.';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/gameEarnings', () => ({getGameEarnings: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
const getEarningsMock = getGameEarnings as jest.MockedFunction<typeof getGameEarnings>;

const createEntry = (id: number, overrides: Partial<GameEarningsEntry> = {}): GameEarningsEntry => ({
  rank: id,
  rewarded_wins: 1,
  total_earned: 10,
  user: {avatar: null, id, username: `Player ${id}`},
  ...overrides,
});

const createPage = (results: GameEarningsEntry[], count = results.length): GameEarningsPage => ({
  count,
  next: null,
  previous: null,
  results,
});

const click = async (selector: string) => {
  await act(async () => {
    (container.querySelector(selector) as HTMLButtonElement).click();
  });
};

const renderLeaderboard = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Leaderboard />
      </MemoryRouter>,
    );
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  getEarningsMock.mockReset();
  getEarningsMock.mockResolvedValue(createPage([]));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('gives the top four ranks a corner, the next ranks the edge and everyone after them the center', () => {
  expect([1, 2, 3, 4, 5, 28, 29, 120].map(getHolding)).toEqual([
    'a1',
    'h1',
    'a8',
    'h8',
    'edge',
    'edge',
    'center',
    'center',
  ]);
});

it('ranks Reversi earners on disks and shows the square each rank holds', async () => {
  getEarningsMock.mockResolvedValue(
    createPage([
      createEntry(4, {rank: 1, rewarded_wins: 123, total_earned: 1230}),
      createEntry(9, {rank: 1, rewarded_wins: 123, total_earned: 1230}),
      createEntry(2, {rank: 3}),
      createEntry(7, {rank: 4}),
      createEntry(8, {rank: 5, total_earned: 5}),
    ]),
  );
  await renderLeaderboard();
  expect(getGameEarnings).toHaveBeenCalledWith('reversi', 1, 10, expect.any(AbortSignal));
  const rows = Array.from(container.querySelectorAll('tbody tr'));
  expect(rows.map((row) => row.querySelector('td')!.textContent)).toEqual(['1', '1', '3', '4', '5']);
  expect(rows.map((row) => row.querySelectorAll('td')[2].textContent)).toEqual([
    'Corner a1',
    'Corner a1',
    'Corner a8',
    'Corner h8',
    'Edge',
  ]);
  expect(rows[0].querySelector('td svg')).toHaveAttribute('aria-hidden', 'true');
  expect(rows[0]).toHaveTextContent('123 rewarded wins');
  expect(rows[2]).toHaveTextContent('1 rewarded win');
  expect(rows[0].querySelector('td:last-child')).toHaveTextContent(`${(1230).toLocaleString()}TNB`);
  expect(rows[0].querySelector('a[href="/profile/4"][aria-hidden="true"]')).toHaveAttribute('tabindex', '-1');
  expect(rows[0].querySelector('a[href="/profile/4"]:not([aria-hidden])')).toHaveTextContent('Player 4');
  expect(container.querySelector('#reversi-earners-title')).toHaveTextContent('Masters of the board');
  expect(container.querySelector('nav[aria-label="Pagination"]')).toBeNull();
});

it('shows the four open corners instead of a table before anyone has earned TNB', async () => {
  let resolve: (page: GameEarningsPage) => void = () => undefined;
  getEarningsMock.mockReturnValue(
    new Promise((resolvePage) => {
      resolve = resolvePage;
    }),
  );
  await renderLeaderboard();
  expect(container.querySelector('[role="status"]')).toHaveTextContent('Flipping through top earners');
  await act(async () => resolve(createPage([])));
  expect(container.querySelector('[role="status"]')).toBeNull();
  expect(container).toHaveTextContent('The first spot is up for grabs.');
  expect(container).toHaveTextContent('All four corners are open.');
  expect(container.querySelector('table')).toBeNull();
});

it('retries after a failed request', async () => {
  getEarningsMock
    .mockRejectedValueOnce(new Error('Network unavailable'))
    .mockResolvedValueOnce(createPage([createEntry(3, {rank: 1})]));
  await renderLeaderboard();
  expect(container.querySelector('[role="alert"]')).toHaveTextContent('We couldn’t load the leaderboard.');
  await click('[role="alert"] button');
  expect(container.querySelector('[role="alert"]')).toBeNull();
  expect(container.querySelector('tbody')).toHaveTextContent('Player 3');
  expect(getEarningsMock).toHaveBeenCalledTimes(2);
});

it('pages through earners while keeping the server ranks', async () => {
  getEarningsMock.mockImplementation((_game, page) =>
    Promise.resolve(createPage([page === 4 ? createEntry(31, {rank: 31}) : createEntry(page)], 31)),
  );
  await renderLeaderboard();
  await click('[aria-label="Page 4 of 4"]');
  expect(getEarningsMock.mock.calls.map(([, page]) => page)).toEqual([1, 4]);
  expect(container.querySelector('tbody tr td')).toHaveTextContent('31');
  expect(container.querySelector('tbody tr')).toHaveTextContent('Center');
  expect(container.querySelector('[aria-label="Page 4 of 4"]')).toHaveAttribute('aria-current', 'page');
});
