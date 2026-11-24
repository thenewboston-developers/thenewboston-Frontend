import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import {getGameEarnings} from 'api/gameEarnings';
import {GameEarningsEntry, GameEarningsPage, RewardGame} from 'types/gameEarnings';

import GameEarningsLeaderboard from '.';

jest.mock('api/gameEarnings', () => ({getGameEarnings: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
const emptyPage: GameEarningsPage = {count: 0, next: null, previous: null, results: []};
const getEarningsMock = getGameEarnings as jest.MockedFunction<typeof getGameEarnings>;

const clickButton = async (selector: string) => {
  await act(async () => {
    (container.querySelector(selector) as HTMLButtonElement).click();
  });
};

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

const deferredPage = () => {
  let reject: (reason: Error) => void = () => undefined;
  let resolve: (value: GameEarningsPage) => void = () => undefined;
  const promise = new Promise<GameEarningsPage>((resolvePromise, rejectPromise) => {
    reject = rejectPromise;
    resolve = resolvePromise;
  });
  return {promise, reject, resolve};
};

const renderLeaderboard = async (game: RewardGame = 'battleship') => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <GameEarningsLeaderboard game={game} />
      </MemoryRouter>,
    );
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  getEarningsMock.mockReset();
  getEarningsMock.mockResolvedValue(emptyPage);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('shows the server-paid TNB totals and shared ranks with linked player profiles', async () => {
  getEarningsMock.mockResolvedValue(
    createPage([
      createEntry(8, {rank: 1, rewarded_wins: 123, total_earned: 1230}),
      createEntry(2, {rank: 1, rewarded_wins: 123, total_earned: 1230}),
      createEntry(5, {rank: 3, total_earned: 17}),
    ]),
  );
  await renderLeaderboard('connect_five');
  expect(getGameEarnings).toHaveBeenCalledWith('connect_five', 1, 10, expect.any(AbortSignal));
  const rows = Array.from(container.querySelectorAll('tbody tr'));
  expect(rows.map((row) => row.querySelector('td')!.textContent)).toEqual(['#1', '#1', '#3']);
  expect(rows[0].querySelector('td:last-child')).toHaveTextContent(`${(1230).toLocaleString()}TNB`);
  expect(rows[2].querySelector('td:last-child')).toHaveTextContent('17TNB');
  expect(rows[0]).toHaveTextContent('123 rewarded wins');
  expect(rows[2]).toHaveTextContent('1 rewarded win');
  expect(rows[0].querySelector('a[href="/profile/8"]')).not.toBeNull();
  expect(container).toHaveTextContent('Guest games and player stakes aren’t included.');
  expect(container.querySelector('nav[aria-label="Pagination"]')).toBeNull();
});

it('distinguishes loading from an empty leaderboard without claiming a guest has earned coins', async () => {
  const request = deferredPage();
  getEarningsMock.mockReturnValue(request.promise);
  await renderLeaderboard();
  expect(container.querySelector('[role="status"]')).toHaveTextContent('Loading top earners');
  expect(container).not.toHaveTextContent('The first spot is up for grabs.');
  await act(async () => request.resolve(emptyPage));
  expect(container.querySelector('[role="status"]')).toBeNull();
  expect(container).toHaveTextContent('The first spot is up for grabs.');
  expect(container).toHaveTextContent('with an account to earn TNB while the fund has coins');
  expect(container.querySelector('table')).toBeNull();
  expect(container.querySelector('nav[aria-label="Pagination"]')).toBeNull();
});

it('offers a retry after a failed request and recovers without leaving the error visible', async () => {
  const retry = deferredPage();
  getEarningsMock.mockRejectedValueOnce(new Error('Network unavailable')).mockReturnValueOnce(retry.promise);
  await renderLeaderboard('hex');
  expect(container.querySelector('[role="alert"]')).toHaveTextContent('We couldn’t load the leaderboard.');
  await clickButton('[role="alert"] button');
  expect(container.querySelector('[role="alert"]')).toBeNull();
  expect(container.querySelector('[role="status"]')).toHaveTextContent('Loading top earners');
  expect(getEarningsMock.mock.calls.map(([game, page]) => [game, page])).toEqual([
    ['hex', 1],
    ['hex', 1],
  ]);
  await act(async () => retry.resolve(createPage([createEntry(9, {rank: 1})])));
  expect(container.querySelector('tbody')).toHaveTextContent('Player 9');
  expect(container.querySelector('[role="alert"]')).toBeNull();
});

it('requests each page and retains server ranks when navigating forward and back', async () => {
  const secondPage = deferredPage();
  getEarningsMock
    .mockResolvedValueOnce(createPage([createEntry(1)], 11))
    .mockReturnValueOnce(secondPage.promise)
    .mockResolvedValueOnce(createPage([createEntry(1)], 11));
  await renderLeaderboard();
  expect(container.querySelector('[aria-label="Previous page"]')).toBeDisabled();
  await clickButton('[aria-label="Next page"]');
  expect(container.querySelector('tbody')).toBeNull();
  expect(container.querySelector('[role="status"]')).toHaveTextContent('Loading top earners');
  await act(async () => secondPage.resolve(createPage([createEntry(11, {rank: 7, total_earned: 5})], 11)));
  expect(container.querySelector('tbody tr td')).toHaveTextContent('#7');
  expect(container.querySelector('[aria-label="Page 2 of 2"]')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelector('[aria-label="Next page"]')).toBeDisabled();
  await clickButton('[aria-label="Previous page"]');
  expect(container.querySelector('[aria-label="Page 1 of 2"]')).toHaveAttribute('aria-current', 'page');
  expect(container.querySelector('tbody')).toHaveTextContent('Player 1');
  expect(getEarningsMock.mock.calls.map(([, page]) => page)).toEqual([1, 2, 1]);
});

it.each(['resolve', 'reject'] as const)(
  'resets pagination on a game change and ignores an aborted request that later %ss',
  async (settlement) => {
    const oldRequest = deferredPage();
    getEarningsMock
      .mockResolvedValueOnce(createPage([createEntry(1)], 21))
      .mockResolvedValueOnce(createPage([createEntry(11)], 21))
      .mockReturnValueOnce(oldRequest.promise)
      .mockResolvedValueOnce(createPage([createEntry(99, {rank: 1, total_earned: 70})]));
    await renderLeaderboard('battleship');
    await clickButton('[aria-label="Next page"]');
    await clickButton('[aria-label="Next page"]');
    const oldSignal = getEarningsMock.mock.calls[2][3]!;
    expect(oldSignal.aborted).toBe(false);
    await renderLeaderboard('hex');
    expect(oldSignal.aborted).toBe(true);
    expect(getEarningsMock).toHaveBeenLastCalledWith('hex', 1, 10, expect.any(AbortSignal));
    await act(async () => {
      if (settlement === 'resolve') oldRequest.resolve(createPage([createEntry(21)]));
      else oldRequest.reject(new Error('Old request failed after cancellation'));
    });
    expect(container.querySelector('tbody')).toHaveTextContent('Player 99');
    expect(container.querySelector('tbody')).not.toHaveTextContent('Player 21');
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(container.querySelector('[role="status"]')).toBeNull();
    expect(container.querySelector('nav[aria-label="Pagination"]')).toBeNull();
  },
);
