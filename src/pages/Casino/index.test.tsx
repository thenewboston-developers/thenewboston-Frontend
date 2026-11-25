import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, Route, Routes, useLocation, useNavigationType} from 'react-router-dom';

import {
  createCasinoCommitment,
  getActiveCasinoBet,
  getCasino,
  getCasinoBet,
  getCasinoBets,
  moveCasinoFunds,
  placeCasinoBet,
} from 'api/casino';
import Casino from 'pages/Casino';
import Roulette from 'pages/Roulette';
import Slots from 'pages/Slots';
import {CasinoBet, CasinoSummary} from 'types/casino';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';

jest.mock('api/casino', () => ({
  createCasinoCommitment: jest.fn(),
  getActiveCasinoBet: jest.fn(),
  getCasino: jest.fn(),
  getCasinoBet: jest.fn(),
  getCasinoBets: jest.fn(),
  moveCasinoFunds: jest.fn(),
  placeCasinoBet: jest.fn(),
}));
jest.mock('components/AuthButtons', () => () => <div>Sign In / Create Account</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => ({type: 'refresh-wallets'})}));
let mockAuthenticated = true;
let mockUserId = 7;
const mockDispatch = jest.fn(() => Promise.resolve());
jest.mock('hooks', () => ({useIsAuthenticated: () => mockAuthenticated}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      self: {id: mockUserId},
      wallets: {wallets: {1: {id: 1, balance: 200000, currency: {ticker: 'TNB'}, owner: mockUserId}}},
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
      payout_table: [{multiplier: 100, probability: 0.0005}],
    },
    {
      available: true,
      enabled: true,
      house_edge: 1 / 37,
      id: 'roulette',
      max_bet: 1000,
      max_multiplier: 36,
      min_bet: 1,
      name: 'Roulette',
      rules_version: 1,
      bet_types: [
        {id: 'red', label: 'Red', max_bet: 1000, multiplier: 2},
        {id: 'number', label: 'Single number', max_bet: 28, multiplier: 36},
      ],
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
  amount: 1,
  created_at: '2026-11-25T12:00:00Z',
  fairness: {
    algorithm: 'hmac-sha256-v1',
    client_seed: 'client',
    commitment_id: 'commitment-id',
    server_seed: 'seed',
    server_seed_hash: 'observed-before-bet',
  },
  fund,
  game: 'slots',
  id: 1,
  payout: 2,
  profit: 1,
  request_id: 'request-id',
  result: {draw: 8000, multiplier: 2, symbols: ['lemon', 'lemon', 'lemon']},
  rules_version: 1,
  settled_at: '2026-11-25T12:00:00Z',
  status: 'settled',
  total_stake: 1,
  wallet_balance: 200001,
};

const button = (label: string) =>
  Array.from(container.querySelectorAll('button')).find((element) => element.textContent?.includes(label))!;
const LocationProbe = () => {
  const {hash, pathname, search} = useLocation();
  const navigationType = useNavigationType();
  return (
    <output aria-label="Current location" data-navigation-type={navigationType}>
      {pathname}
      {search}
      {hash}
    </output>
  );
};

const render = async (path = '/slots/home') => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={[path]}>
        <LocationProbe />
        <Routes>
          <Route element={<Slots />} path="/slots/*" />
          <Route element={<Roulette />} path="/roulette/*" />
          <Route element={<Casino />} path="/casino/*" />
        </Routes>
      </MemoryRouter>,
    ),
  );
};
const change = (selector: string, value: string) => {
  const element = container.querySelector(selector) as HTMLInputElement;
  const prototype = element.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
  element.dispatchEvent(new Event(element.tagName === 'SELECT' ? 'change' : 'input', {bubbles: true}));
};

beforeEach(() => {
  mockAuthenticated = true;
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

it('shows the 100x slots cap and the 10 TNB limit supported by a 100,000 TNB fund', async () => {
  await render();
  expect(container).toHaveTextContent('UP TO 100×');
  expect(container).toHaveTextContent('Minimum 1 · Maximum 10 TNB');
  expect(container).toHaveTextContent('100,000');
  expect(button('Spin 1 TNB')).toBeEnabled();
  act(() => change('#casino-bet-amount', '11'));
  expect(button('Spin 11 TNB')).toBeDisabled();
  expect(container).toHaveTextContent('You can wager up to 10 TNB');
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('blocks unfunded or paused betting, and never offers practice play', async () => {
  (getCasino as jest.Mock).mockResolvedValue({...summary, games: summary.games.map((game) => ({...game, max_bet: 0}))});
  await render();
  expect(button('Spin 1 TNB')).toBeDisabled();
  expect(container).toHaveTextContent('cannot cover the minimum wager');
  expect(container.textContent).not.toMatch(/practice mode/i);
});

it('requires authentication and does not expose fund controls to regular players', async () => {
  mockAuthenticated = false;
  await render();
  expect(container).toHaveTextContent('Sign In / Create Account');
  expect(container.querySelector('#casino-bet-amount')).toBeNull();
  expect(container).not.toHaveTextContent('Manage casino funds');
});

it('persists a full uncertain wager before sending and retries it after remount without a second commitment', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network interrupted')).mockResolvedValueOnce(settled);
  await render();
  await act(async () => button('Spin 1 TNB').click());
  const firstPayload = (placeCasinoBet as jest.Mock).mock.calls[0][0];
  expect(readPendingCasinoBet(7)?.payload).toEqual(firstPayload);
  expect(container).toHaveTextContent('Retry same bet');
  act(() => root.unmount());
  root = createRoot(container);
  await render();
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenNthCalledWith(2, firstPayload);
  expect(createCasinoCommitment).toHaveBeenCalledTimes(1);
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container).toHaveTextContent('2 TNB returned');
});

it('retains uncertain wagers after authentication errors on a retry', async () => {
  (placeCasinoBet as jest.Mock)
    .mockRejectedValueOnce(new Error('Network'))
    .mockRejectedValueOnce({response: {status: 401}});
  await render();
  await act(async () => button('Spin 1 TNB').click());
  await act(async () => button('Retry same bet').click());
  expect(readPendingCasinoBet(7)).not.toBeNull();
  expect(container).toHaveTextContent('Retry same bet');
  expect(container.querySelector('#casino-bet-amount')).toBeNull();
});

it('recovers a settled wager by request ID without replaying its placement', async () => {
  savePendingCasinoBet(7, {
    payload: {
      amount: 1,
      client_seed: 'client',
      commitment_id: 'commitment-id',
      game: 'slots',
      request_id: 'request-id',
      rules_version: 1,
    },
    serverSeedHash: commitment.server_seed_hash,
  });
  (getCasinoBet as jest.Mock).mockResolvedValueOnce(settled);
  await render();
  expect(container).toHaveTextContent('2 TNB returned');
  expect(placeCasinoBet).not.toHaveBeenCalled();
  expect(readPendingCasinoBet(7)).toBeNull();
});

it('clears only a definite domain rejection and refreshes limits without charging', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {status: 400, data: {code: 'bet_limit', detail: 'The wager exceeds the current limit.'}},
  });
  await render();
  await act(async () => button('Spin 1 TNB').click());
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container).toHaveTextContent('The wager exceeds the current limit');
  expect(getCasino).toHaveBeenCalledTimes(2);
});

it('shows admin funding controls but never automatically deposits the prefilled 100,000 TNB', async () => {
  (getCasino as jest.Mock).mockResolvedValue({...summary, can_manage: true});
  await render();
  expect(container).toHaveTextContent('Manage casino funds');
  expect(container.querySelector('#casino-fund-amount')).toHaveValue(100000);
  expect(moveCasinoFunds).not.toHaveBeenCalled();
  await act(async () => button('Review transfer').click());
  expect(container).toHaveTextContent('100,000 TNB from your wallet into the casino?');
  expect(moveCasinoFunds).not.toHaveBeenCalled();
});

it('rejects a new spin while Blackjack is active without trapping a pending wager', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {status: 409, data: {code: 'game_in_progress', detail: 'Finish the existing casino game first.'}},
  });
  (getActiveCasinoBet as jest.Mock).mockResolvedValueOnce({game: 'blackjack', status: 'open'});
  await render();
  await act(async () => button('Spin 1 TNB').click());
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container.querySelector('a[href="/blackjack/home"]')).toHaveTextContent('Resume your Blackjack hand');
  expect(button('Retry same bet')).toBeUndefined();
  await act(async () => button('Spin 1 TNB').click());
  expect(container.querySelector('a[href="/blackjack/home"]')).toBeNull();
});

it('links to whichever game has the unfinished hand, and to none when that cannot be told', async () => {
  const inProgress = {
    response: {status: 409, data: {code: 'game_in_progress', detail: 'Finish the existing casino game first.'}},
  };
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce(inProgress).mockRejectedValueOnce(inProgress);
  (getActiveCasinoBet as jest.Mock)
    .mockResolvedValueOnce({game: 'let_it_ride', status: 'open'})
    .mockRejectedValueOnce(new Error('Network'));
  await render();
  await act(async () => button('Spin 1 TNB').click());
  expect(container.querySelector('a[href="/let-it-ride/home"]')).toHaveTextContent('Resume your Let It Ride hand');
  expect(container.querySelector('a[href="/blackjack/home"]')).toBeNull();
  expect(readPendingCasinoBet(7)).toBeNull();
  await act(async () => button('Spin 1 TNB').click());
  expect(container.querySelector('a[href="/let-it-ride/home"]')).toBeNull();
  expect(container).toHaveTextContent('Finish the existing casino game first.');
});

it('recovers an uncertain admin deposit after reload using the identical request ID', async () => {
  (getCasino as jest.Mock).mockResolvedValue({...summary, can_manage: true});
  (moveCasinoFunds as jest.Mock)
    .mockRejectedValueOnce(new Error('Network'))
    .mockResolvedValueOnce({amount: 100000, fund, id: 1, kind: 'deposit', wallet_balance: 100000});
  await render();
  await act(async () => button('Review transfer').click());
  await act(async () => button('Confirm transfer').click());
  const first = (moveCasinoFunds as jest.Mock).mock.calls[0];
  act(() => root.unmount());
  root = createRoot(container);
  await render();
  expect(container).toHaveTextContent('Retry same transfer');
  await act(async () => button('Retry same transfer').click());
  expect((moveCasinoFunds as jest.Mock).mock.calls[1]).toEqual(first);
  expect(container).toHaveTextContent('100,000 TNB added to the casino fund.');
});

it('does not recover another member’s pending wager', async () => {
  savePendingCasinoBet(8, {
    payload: {
      amount: 1,
      client_seed: 'client',
      commitment_id: 'commitment-id',
      game: 'slots',
      request_id: 'other-request',
      rules_version: 1,
    },
    serverSeedHash: commitment.server_seed_hash,
  });
  await render();
  expect(getCasinoBet).not.toHaveBeenCalled();
  expect(button('Spin 1 TNB')).toBeEnabled();
  expect(readPendingCasinoBet(8)?.payload.request_id).toBe('other-request');
});

it('does not render an unfinished history receipt as a settled payout', async () => {
  (getCasinoBets as jest.Mock).mockResolvedValue([
    {...settled, status: 'open', profit: null, result: {}, settled_at: null},
  ]);
  await render();
  expect(container).toHaveTextContent('Your settled bets will appear here.');
});

it.each([
  ['/slots/home', 'Slots'],
  ['/roulette/home', 'Roulette'],
])('renders the independent game page at %s without tabs to the other game', async (path, title) => {
  await render(path);
  expect(container.querySelector('h1')).toHaveTextContent(title);
  expect(container.querySelector('a[href="/slots/home"]')).toBeNull();
  expect(container.querySelector('a[href="/roulette/home"]')).toBeNull();
});

it.each([
  ['/casino/slots?source=bookmark#receipt', '/slots/home?source=bookmark#receipt', 'Slots'],
  ['/casino/roulette?source=bookmark#receipt', '/roulette/home?source=bookmark#receipt', 'Roulette'],
  ['/casino?source=bookmark#receipt', '/slots/home?source=bookmark#receipt', 'Slots'],
  ['/slots?source=bookmark#receipt', '/slots/home?source=bookmark#receipt', 'Slots'],
  ['/roulette?source=bookmark#receipt', '/roulette/home?source=bookmark#receipt', 'Roulette'],
])('replaces %s with its canonical page without losing URL context', async (from, to, title) => {
  await render(from);
  const location = container.querySelector('output');
  expect(location).toHaveTextContent(to);
  expect(location).toHaveAttribute('data-navigation-type', 'REPLACE');
  expect(container.querySelector('h1')).toHaveTextContent(title);
  expect(placeCasinoBet).not.toHaveBeenCalled();
  expect(createCasinoCommitment).not.toHaveBeenCalled();
});

it('recovers a pending Slots wager from the new Roulette page without changing its game or request ID', async () => {
  const original = {
    amount: 1,
    client_seed: 'client',
    commitment_id: 'commitment-id',
    game: 'slots' as const,
    request_id: 'request-id',
    rules_version: 1,
  };
  savePendingCasinoBet(7, {payload: original, serverSeedHash: commitment.server_seed_hash});
  await render('/roulette/home');
  expect(container.querySelector('h1')).toHaveTextContent('Roulette');
  expect(container).toHaveTextContent('1 TNB slots bet is awaiting confirmation');
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(original);
  expect(createCasinoCommitment).not.toHaveBeenCalled();
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container.querySelector('[aria-label="Roulette result"]')).toHaveTextContent('?');
  expect(container).toHaveTextContent('Bet receipt & fairness');
});

it('recovers an already settled bet after following a legacy route without placing a new wager', async () => {
  savePendingCasinoBet(7, {
    payload: {
      amount: 1,
      client_seed: 'client',
      commitment_id: 'commitment-id',
      game: 'slots',
      request_id: 'request-id',
      rules_version: 1,
    },
    serverSeedHash: commitment.server_seed_hash,
  });
  (getCasinoBet as jest.Mock).mockResolvedValueOnce(settled);
  await render('/casino/slots');
  expect(container.querySelector('output')).toHaveTextContent('/slots/home');
  expect(container).toHaveTextContent('2 TNB returned');
  expect(placeCasinoBet).not.toHaveBeenCalled();
  expect(readPendingCasinoBet(7)).toBeNull();
});
