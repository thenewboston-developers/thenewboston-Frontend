import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import useGameEarnings from 'components/GameEarningsLeaderboard/useGameEarnings';

import TopEarners from './index';

jest.mock('components/GameEarningsLeaderboard/useGameEarnings', () => jest.fn());

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const retry = jest.fn();
const setPage = jest.fn();

const entry = (id: number, rank: number, totalEarned: number, rewardedWins = 1) => ({
  rank,
  rewarded_wins: rewardedWins,
  total_earned: totalEarned,
  user: {avatar: null, id, username: `player${id}`},
});

const mockEarnings = (state: object) => {
  (useGameEarnings as jest.Mock).mockReturnValue({
    data: null,
    error: false,
    loading: false,
    page: 1,
    retry,
    setPage,
    totalPages: 1,
    ...state,
  });
};

const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <TopEarners />
      </MemoryRouter>,
    ),
  );
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('lists Connect Five earners with their rank stones and profile links', async () => {
  const results = [
    entry(1, 1, 50, 5),
    entry(2, 2, 30),
    entry(3, 2, 30),
    entry(4, 4, 20),
    entry(5, 5, 10),
    entry(6, 6, 5),
  ];
  mockEarnings({data: {count: results.length, next: null, previous: null, results}});
  await render();
  expect(useGameEarnings).toHaveBeenCalledWith('connect_five');
  expect(container.querySelector('#top-earners')).toHaveTextContent('The winning line');
  const rows = Array.from(container.querySelectorAll('tbody tr'));
  expect(rows.map((row) => row.querySelector('td')!.textContent)).toEqual(['1', '2', '2', '4', '5', '6']);
  expect(rows[0]).toHaveTextContent('player1');
  expect(rows[0]).toHaveTextContent('5 rewarded wins');
  expect(rows[1]).toHaveTextContent('1 rewarded win');
  expect(rows[0]).toHaveTextContent('50TNB');
  // The avatar and the username both lead to the profile, only the username link is in the tab order
  const links = Array.from(rows[0].querySelectorAll('a[href="/profile/1"]'));
  expect(links.map((link) => [link.textContent, link.getAttribute('tabindex')])).toEqual([
    ['', '-1'],
    ['player1', null],
  ]);
});

it('offers the first spot when nobody has earned yet', async () => {
  mockEarnings({data: {count: 0, next: null, previous: null, results: []}});
  await render();
  expect(container).toHaveTextContent('The first spot is up for grabs.');
  expect(container.querySelector('table')).toBeNull();
});

it('retries after a failed load', async () => {
  mockEarnings({error: true});
  await render();
  expect(container.querySelector('[role="alert"]')).toHaveTextContent('We couldn’t load the leaderboard.');
  await act(async () => (container.querySelector('[role="alert"] button') as HTMLButtonElement).click());
  expect(retry).toHaveBeenCalledTimes(1);
});
