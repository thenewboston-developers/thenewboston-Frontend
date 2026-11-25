import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, Route, Routes} from 'react-router-dom';

import {
  createCasinoCommitment,
  getCasino,
  getCasinoBet,
  getCasinoBets,
  moveCasinoFunds,
  placeCasinoBet,
} from 'api/casino';
import Roulette from 'pages/Roulette';
import {CasinoBet, CasinoSummary} from 'types/casino';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';

jest.mock('api/casino', () => ({
  createCasinoCommitment: jest.fn(),
  getCasino: jest.fn(),
  getCasinoBet: jest.fn(),
  getCasinoBets: jest.fn(),
  moveCasinoFunds: jest.fn(),
  placeCasinoBet: jest.fn(),
}));
jest.mock('components/AuthButtons', () => () => <div>Sign In / Create Account</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => ({type: 'refresh-wallets'})}));
jest.mock('pages/Roulette/Celebration', () => () => null);

// The real wheel animates for seconds; this one lands the ball when the test says so
let mockHoldBall = false;
let mockLandBall: (() => void) | null = null;
const mockRest = jest.fn();
const mockThrowBall = jest.fn();
jest.mock('pages/Roulette/Wheel', () => {
  const {forwardRef, useImperativeHandle} = jest.requireActual('react');
  return {
    __esModule: true,
    default: forwardRef(({winning}: {winning: number | null}, ref: unknown) => {
      useImperativeHandle(ref, () => ({
        rest: mockRest,
        spinDown: jest.fn(),
        spinUp: jest.fn(),
        throwBall: (number: number) => {
          mockThrowBall(number);
          if (!mockHoldBall) return Promise.resolve();
          return new Promise<void>((resolve) => {
            mockLandBall = resolve;
          });
        },
      }));
      return <div data-testid="wheel" data-winning={winning ?? ''} />;
    }),
  };
});

let mockAuthenticated = true;
let mockBalance = 200000;
let mockUserId = 7;
const mockDispatch = jest.fn(() => Promise.resolve());
jest.mock('hooks', () => ({useIsAuthenticated: () => mockAuthenticated}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      self: {id: mockUserId},
      wallets: {wallets: {1: {id: 1, balance: mockBalance, currency: {ticker: 'TNB'}, owner: mockUserId}}},
    }),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const fund = {
  available: 100000,
  balance: 100000,
  currency: 'TNB' as const,
  enabled: true,
  reserved: 0,
  risk_limit_bps: 100,
};
const summary: CasinoSummary = {
  can_manage: false,
  fund,
  games: [
    {
      available: true,
      enabled: true,
      house_edge: 0.04,
      id: 'slots',
      max_bet: 10,
      max_multiplier: 100,
      min_bet: 1,
      name: 'Slots',
      rules_version: 1,
    },
    {
      available: true,
      bet_types: [
        {id: 'red', label: 'Red', max_bet: 1000, multiplier: 2},
        {id: 'black', label: 'Black', max_bet: 1000, multiplier: 2},
        {id: 'dozen', label: 'Dozen', max_bet: 500, multiplier: 3},
        {id: 'number', label: 'Single number', max_bet: 28, multiplier: 36},
      ],
      enabled: true,
      house_edge: 1 / 37,
      id: 'roulette',
      max_bet: 1000,
      max_multiplier: 36,
      min_bet: 1,
      name: 'Roulette',
      rules_version: 1,
    },
  ],
};
const commitment = {
  algorithm: 'hmac-sha256-v1',
  expires_at: '2026-11-25T12:00:00Z',
  id: 'commitment-id',
  server_seed_hash: 'observed-before-bet',
};
const settled: CasinoBet = {
  amount: 5,
  created_at: '2026-11-25T12:00:00Z',
  fairness: {
    algorithm: 'hmac-sha256-v1',
    client_seed: 'client',
    commitment_id: 'commitment-id',
    server_seed: 'seed',
    server_seed_hash: 'observed-before-bet',
  },
  fund,
  game: 'roulette',
  id: 1,
  payout: 10,
  profit: 5,
  request_id: 'request-id',
  result: {color: 'red', multiplier: 2, number: 23},
  rules_version: 1,
  selection: {type: 'red'},
  settled_at: '2026-11-25T12:00:00Z',
  status: 'settled',
  total_stake: 5,
  wallet_balance: 200005,
};
const slotsPayload = {
  amount: 1,
  client_seed: 'client',
  commitment_id: 'commitment-id',
  game: 'slots' as const,
  request_id: 'request-id',
  rules_version: 1,
};
const slotsBet: CasinoBet = {
  ...settled,
  amount: 1,
  game: 'slots',
  payout: 2,
  profit: 1,
  result: {draw: 8000, multiplier: 2, symbols: ['lemon', 'lemon', 'lemon']},
  selection: undefined,
  total_stake: 1,
};

const button = (label: string) =>
  Array.from(container.querySelectorAll('button')).find((element) => element.textContent?.includes(label))!;
const clickSpot = (id: string) =>
  act(() => (container.querySelector(`[data-spot="${id}"]`) as HTMLButtonElement).click());
const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={['/roulette/home']}>
        <Routes>
          <Route element={<Roulette />} path="/roulette/*" />
        </Routes>
      </MemoryRouter>,
    ),
  );
};
const result = () => container.querySelector('[aria-label="Roulette result"]');
const wager = () => (container.querySelector('#roulette-bet-amount') as HTMLInputElement).value;

beforeEach(() => {
  mockAuthenticated = true;
  mockBalance = 200000;
  mockHoldBall = false;
  mockLandBall = null;
  mockUserId = 7;
  jest.clearAllMocks();
  mockDispatch.mockResolvedValue(undefined);
  localStorage.clear();
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: {randomUUID: jest.fn().mockReturnValue('request-id')},
  });
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (getCasino as jest.Mock).mockResolvedValue(summary);
  (getCasinoBets as jest.Mock).mockResolvedValue([]);
  (createCasinoCommitment as jest.Mock).mockResolvedValue(commitment);
  (placeCasinoBet as jest.Mock).mockResolvedValue(settled);
  (getCasinoBet as jest.Mock).mockRejectedValue({response: {status: 404}});
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('is its own game page: a Roulette hero, an open table, and no tabs to other casino games', async () => {
  await render();
  expect(container.querySelector('h1')).toHaveTextContent('Roulette');
  expect(container).toHaveTextContent('Table open');
  expect(container.querySelector('a[href="/games"]')).not.toBeNull();
  expect(container.querySelector('a[href="/slots/home"]')).toBeNull();
  expect(container.querySelectorAll('[data-spot]')).toHaveLength(49);
  expect(result()).toHaveTextContent('?');
});

it('stacks chips on a spot, moves them when another spot is tapped, and applies each spot limit', async () => {
  await render();
  expect(button('Spin')).toBeDisabled();
  expect(container).toHaveTextContent('Place a chip on the table to play.');
  clickSpot('red');
  expect(wager()).toBe('5');
  expect(container).toHaveTextContent('Minimum 1 · Maximum 1,000 TNB');
  clickSpot('red');
  expect(wager()).toBe('10');
  expect(button('Spin · 10 TNB')).toBeEnabled();
  expect(container).toHaveTextContent('Returns 20 TNB if Red hits');
  clickSpot('number-17');
  expect(wager()).toBe('10');
  expect(container).toHaveTextContent('One bet per spin: your chips moved to 17 straight up.');
  expect(container).toHaveTextContent('Minimum 1 · Maximum 28 TNB');
  expect(container.querySelector('[data-spot="number-17"]')).toHaveAttribute('aria-pressed', 'true');
  expect(container.querySelector('[data-spot="red"]')).toHaveAttribute('aria-pressed', 'false');
  act(() => button('Max').click());
  expect(wager()).toBe('28');
  clickSpot('number-17');
  expect(wager()).toBe('28');
  expect(container).toHaveTextContent('17 straight up takes up to 28 TNB right now.');
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('never lets a bet exceed the wallet', async () => {
  mockBalance = 12;
  await render();
  act(() => (container.querySelector('[aria-label="25 TNB chip"]') as HTMLButtonElement).click());
  clickSpot('black');
  expect(wager()).toBe('12');
  expect(container).toHaveTextContent('That is all 12 TNB in your wallet.');
  expect(button('Spin · 12 TNB')).toBeEnabled();
});

it('submits the spot as an integer selection and shows the result once the ball has landed', async () => {
  mockHoldBall = true;
  await render();
  clickSpot('red');
  await act(async () => button('Spin · 5 TNB').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(
    expect.objectContaining({amount: 5, game: 'roulette', rules_version: 1, selection: {type: 'red'}}),
  );
  expect(mockThrowBall).toHaveBeenCalledWith(23);
  // The wager is already settled, but nothing gives the result away while the ball is rolling
  expect(container).toHaveTextContent('No more bets');
  expect(result()).toHaveTextContent('?');
  expect(container).not.toHaveTextContent('you won');
  expect(container).toHaveTextContent('Your settled bets will appear here.');
  expect(container.querySelector('[data-spot="red"]')).toBeDisabled();
  expect(container.querySelector('[aria-label^="Wallet balance"]')).toHaveTextContent('199,995');
  expect(container.querySelector('[aria-label="Your recent results"]')).not.toHaveTextContent('23');
  await act(async () => mockLandBall!());
  expect(result()).toHaveTextContent('23');
  expect(result()).toHaveTextContent('Red · Odd · 19–36');
  expect(result()).toHaveTextContent('10 TNB returned');
  expect(container).toHaveTextContent('23 Red — you won 10 TNB');
  expect(container.querySelector('[data-testid="wheel"]')).toHaveAttribute('data-winning', '23');
  expect(container).not.toHaveTextContent('Your settled bets will appear here.');
  expect(container.querySelector('[aria-label="Your recent results"]')).toHaveTextContent('23');
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(button('Spin · 5 TNB')).toBeEnabled();
});

it('submits a straight-up bet on zero', async () => {
  (placeCasinoBet as jest.Mock).mockResolvedValue({
    ...settled,
    payout: 0,
    profit: -5,
    result: {color: 'black', multiplier: 0, number: 8},
    selection: {type: 'number', value: 0},
    wallet_balance: 199995,
  });
  await render();
  clickSpot('number-0');
  await act(async () => button('Spin · 5 TNB').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(expect.objectContaining({selection: {type: 'number', value: 0}}));
  expect(container).toHaveTextContent('8 Black — no win this spin');
  expect(result()).toHaveTextContent('No payout this round');
});

it('blocks unfunded or paused betting, and never offers practice play', async () => {
  (getCasino as jest.Mock).mockResolvedValue({
    ...summary,
    games: summary.games.map((game) => ({
      ...game,
      bet_types: game.bet_types?.map((betType) => ({...betType, max_bet: 0})),
      max_bet: 0,
    })),
  });
  await render();
  clickSpot('red');
  expect(button('Spin')).toBeDisabled();
  expect(container.textContent).not.toMatch(/practice/i);
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('says when the casino is closed and keeps the spin locked', async () => {
  (getCasino as jest.Mock).mockResolvedValue({...summary, fund: {...fund, enabled: false}});
  await render();
  clickSpot('red');
  expect(container).toHaveTextContent('Casino closed');
  expect(container).toHaveTextContent('The casino is closed to new wagers.');
  expect(button('Spin')).toBeDisabled();
});

it('requires authentication and does not expose fund controls to regular players', async () => {
  mockAuthenticated = false;
  await render();
  expect(container).toHaveTextContent('Sign In / Create Account');
  expect(button('Spin')).toBeUndefined();
  expect(container).toHaveTextContent('Sign in to view your bet history.');
  expect(container).not.toHaveTextContent('Manage casino funds');
  expect(getCasinoBets).not.toHaveBeenCalled();
});

it('persists a full uncertain wager before sending and retries it after remount without a second commitment', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network interrupted')).mockResolvedValueOnce(settled);
  await render();
  clickSpot('red');
  await act(async () => button('Spin · 5 TNB').click());
  const firstPayload = (placeCasinoBet as jest.Mock).mock.calls[0][0];
  expect(readPendingCasinoBet(7)?.payload).toEqual(firstPayload);
  expect(container).toHaveTextContent('Retry the same bet without paying twice');
  expect(container).toHaveTextContent('A 5 TNB roulette bet is awaiting confirmation');
  expect(container.querySelector('[data-spot="black"]')).toBeDisabled();
  act(() => root.unmount());
  root = createRoot(container);
  await render();
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenNthCalledWith(2, firstPayload);
  expect(createCasinoCommitment).toHaveBeenCalledTimes(1);
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(mockThrowBall).toHaveBeenCalledWith(23);
  expect(result()).toHaveTextContent('10 TNB returned');
});

it('retains uncertain wagers after authentication errors on a retry', async () => {
  (placeCasinoBet as jest.Mock)
    .mockRejectedValueOnce(new Error('Network'))
    .mockRejectedValueOnce({response: {status: 401}});
  await render();
  clickSpot('red');
  await act(async () => button('Spin · 5 TNB').click());
  await act(async () => button('Retry same bet').click());
  expect(readPendingCasinoBet(7)).not.toBeNull();
  expect(container).toHaveTextContent('Retry same bet');
  expect(button('Spin ·')).toBeUndefined();
});

it('clears only a definite domain rejection and refreshes limits without charging', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {data: {code: 'bet_limit', detail: 'The wager exceeds the current limit.'}, status: 400},
  });
  await render();
  clickSpot('red');
  await act(async () => button('Spin · 5 TNB').click());
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container).toHaveTextContent('The wager exceeds the current limit');
  expect(getCasino).toHaveBeenCalledTimes(2);
  expect(mockThrowBall).not.toHaveBeenCalled();
  expect(button('Spin · 5 TNB')).toBeEnabled();
});

it('shows a roulette bet that settled while the page was closed without replaying its placement', async () => {
  savePendingCasinoBet(7, {
    payload: {...slotsPayload, amount: 5, game: 'roulette', selection: {type: 'red'}},
    serverSeedHash: commitment.server_seed_hash,
  });
  (getCasinoBet as jest.Mock).mockResolvedValueOnce(settled);
  await render();
  expect(placeCasinoBet).not.toHaveBeenCalled();
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(mockRest).toHaveBeenCalledWith(23);
  expect(mockThrowBall).not.toHaveBeenCalled();
  expect(result()).toHaveTextContent('10 TNB returned');
  expect(wager()).toBe('5');
  expect(container.querySelector('[data-spot="red"]')).toHaveAttribute('aria-pressed', 'true');
});

it('confirms a pending Slots wager from the Roulette page without changing it or spinning the wheel', async () => {
  savePendingCasinoBet(7, {payload: slotsPayload, serverSeedHash: commitment.server_seed_hash});
  (placeCasinoBet as jest.Mock).mockResolvedValue(slotsBet);
  await render();
  expect(container).toHaveTextContent('A 1 TNB slots bet is awaiting confirmation');
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(slotsPayload);
  expect(createCasinoCommitment).not.toHaveBeenCalled();
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(mockThrowBall).not.toHaveBeenCalled();
  expect(result()).toHaveTextContent('?');
  expect(container).toHaveTextContent('Your Slots bet was confirmed: 2 TNB returned.');
  expect(container).toHaveTextContent('Bet receipt & fairness');
});

it('does not recover another member’s pending wager', async () => {
  savePendingCasinoBet(8, {
    payload: {...slotsPayload, request_id: 'other-request'},
    serverSeedHash: commitment.server_seed_hash,
  });
  await render();
  expect(getCasinoBet).not.toHaveBeenCalled();
  clickSpot('red');
  expect(button('Spin · 5 TNB')).toBeEnabled();
  expect(readPendingCasinoBet(8)?.payload.request_id).toBe('other-request');
});

it('lists settled roulette bets only, and offers to repeat the last one', async () => {
  (getCasinoBets as jest.Mock).mockResolvedValue([
    {...settled, request_id: 'open', result: {}, settled_at: null, status: 'open'},
    {...settled, amount: 40, request_id: 'dozen', selection: {type: 'dozen', value: 2}},
    {...slotsBet, request_id: 'slots'},
  ]);
  await render();
  const rows = container.querySelectorAll('[aria-labelledby="roulette-spins-heading"] tbody tr');
  expect(rows).toHaveLength(1);
  expect(rows[0]).toHaveTextContent('2nd dozen (13–24)');
  expect(container.querySelector('[aria-label="Your recent results"]')).toHaveTextContent('23');
  act(() => button('Repeat last bet').click());
  expect(wager()).toBe('40');
  expect(container.querySelector('[data-spot="dozen-2"]')).toHaveAttribute('aria-pressed', 'true');
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('shows admin funding controls but never deposits the prefilled amount on its own', async () => {
  (getCasino as jest.Mock).mockResolvedValue({...summary, can_manage: true});
  await render();
  expect(container).toHaveTextContent('Manage casino funds');
  expect(moveCasinoFunds).not.toHaveBeenCalled();
});
