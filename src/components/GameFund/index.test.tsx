import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {getGameFund} from 'api/gameFund';
import {GameFund as GameFundData} from 'types/gameFund';

import GameFund from './index';

jest.mock('api/gameFund', () => ({getGameFund: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: () => false}));
jest.mock(
  './ContributionModal',
  () =>
    ({close, onSuccess}: {close(): void; onSuccess(fund: GameFundData, message: string): void}) => (
      <div aria-label="Contribution" role="dialog">
        <button
          onClick={() => {
            onSuccess(
              {
                balance: 25,
                currency: 'TNB',
                reward_amount: 10,
                wins_remaining: 2,
                total_deposited: 25,
                total_paid: 0,
                enabled: true,
                available: true,
              },
              'Contributed 25 TNB',
            );
            close();
          }}
          type="button"
        >
          Complete contribution
        </button>
      </div>
    ),
);

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const fund = {
  balance: 230,
  currency: 'TNB',
  reward_amount: 10,
  wins_remaining: 23,
  total_deposited: 260,
  total_paid: 30,
  enabled: true,
  available: true,
};
const render = async () => {
  await act(async () => root.render(<GameFund />));
};
const button = (text: string) =>
  Array.from(container.querySelectorAll('button')).find((element) => element.textContent?.includes(text))!;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (getGameFund as jest.Mock).mockResolvedValue(fund);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it('leads with winning coins and opens contributions only from the small link', async () => {
  await render();
  expect(container).toHaveTextContent('Play for fun.Win real coins.');
  expect(container).toHaveTextContent('+10TNB');
  expect(container).toHaveTextContent('Rewards available');
  expect(container.querySelector('a')).toHaveAttribute('href', '#featured-game-heading');
  expect(container.querySelector('input')).toBeNull();
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  act(() => button('Contribute to the reward pool').click());
  expect(container.querySelector('[role="dialog"]')).not.toBeNull();
  act(() => button('Complete contribution').click());
  expect(container.querySelector('[role="dialog"]')).toBeNull();
  expect(container).toHaveTextContent('Contributed 25 TNB');
  expect(container).toHaveTextContent('25 TNB');
});

it('uses the live reward amount and explains eligibility even to guests', async () => {
  (getGameFund as jest.Mock).mockResolvedValue({...fund, reward_amount: 25, wins_remaining: 9});
  await render();
  expect(container).toHaveTextContent('+25TNB');
  expect(container).toHaveTextContent('earn 25 TNB');
  expect(container).toHaveTextContent('fewer than 25 TNB');
  expect(container).toHaveTextContent('Sign in before starting a computer match');
  expect(container).toHaveTextContent('Guest wins do not earn coins');
});

it('distinguishes an empty pool from paused rewards without promising available rewards', async () => {
  (getGameFund as jest.Mock).mockResolvedValueOnce({...fund, available: false, balance: 0, wins_remaining: 0});
  await render();
  expect(container).toHaveTextContent('More rewards on the way');
  expect(container).toHaveTextContent('free play continues without a reward');
  act(() => root.unmount());
  root = createRoot(container);
  (getGameFund as jest.Mock).mockResolvedValueOnce({...fund, available: false, enabled: false});
  await render();
  expect(container).toHaveTextContent('Rewards paused');
  expect(container).not.toHaveTextContent('Rewards available');
});

it('does not imply rewards are available before loading or on failure and supports retry', async () => {
  (getGameFund as jest.Mock).mockRejectedValueOnce(new Error('Offline'));
  await render();
  expect(container).toHaveTextContent('The fund balance is temporarily unavailable');
  expect(container).toHaveTextContent('Reward status unavailable');
  expect(container).not.toHaveTextContent('+10');
  await act(async () => button('Refresh fund balance').click());
  expect(container).toHaveTextContent('Rewards available');
});

it('marks previously loaded data as stale after a failed refresh', async () => {
  jest.useFakeTimers();
  await render();
  (getGameFund as jest.Mock).mockRejectedValueOnce(new Error('Offline'));
  await act(async () => jest.advanceTimersByTime(30000));
  expect(container).toHaveTextContent('Last known reward pool');
  expect(container).toHaveTextContent('Reward status unavailable');
  expect(container).not.toHaveTextContent('Rewards available');
});
