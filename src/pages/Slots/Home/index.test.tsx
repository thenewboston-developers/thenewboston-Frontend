import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, Route, Routes} from 'react-router-dom';

import {createCasinoCommitment, getCasino, getCasinoBet, getCasinoBets, placeCasinoBet} from 'api/casino';
import {CasinoBet, CasinoSummary} from 'types/casino';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';

import {SLOTS_SOUND_STORAGE_KEY} from '../useSlotSounds';

import Home from './index';

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
const mockDispatch = jest.fn(() => Promise.resolve());
jest.mock('hooks', () => ({useIsAuthenticated: () => true}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      self: {id: 7},
      wallets: {wallets: {1: {id: 1, balance: 5000, currency: {ticker: 'TNB'}, owner: 7}}},
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
      payout_table: [
        {multiplier: 0, probability: 0.5885},
        {multiplier: 1, probability: 0.16},
        {multiplier: 2, probability: 0.2},
        {multiplier: 5, probability: 0.04},
        {multiplier: 10, probability: 0.01},
        {multiplier: 50, probability: 0.001},
        {multiplier: 100, probability: 0.0005},
      ],
      rules_version: 2,
    },
  ],
};
const commitment = {
  algorithm: 'hmac-sha256-v1',
  expires_at: '2026-11-25T12:00:00Z',
  id: 'commitment-id',
  server_seed_hash: 'observed-before-bet',
};
const spin = (changes: Partial<CasinoBet> = {}): CasinoBet => ({
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
  result: {draw: 8368, multiplier: 2, symbols: ['lemon', 'lemon', 'lemon']},
  rules_version: 2,
  settled_at: '2026-11-25T12:00:00Z',
  status: 'settled',
  total_stake: 1,
  wallet_balance: 5001,
  ...changes,
});

const button = (label: string) =>
  Array.from(container.querySelectorAll('button')).find(
    (element) => element.textContent?.includes(label) || element.getAttribute('aria-label') === label,
  )!;
const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={['/slots/home']}>
        <Routes>
          <Route element={<Home />} path="/slots/home" />
        </Routes>
      </MemoryRouter>,
    ),
  );
};
const betInput = () => container.querySelector('#casino-bet-amount') as HTMLInputElement;

beforeEach(() => {
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
  (placeCasinoBet as jest.Mock).mockResolvedValue(spin());
  (getCasinoBet as jest.Mock).mockRejectedValue({response: {status: 404}});
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('lists every winning line with its odds and what it pays at the current bet', async () => {
  await render();
  const rows = Array.from(container.querySelectorAll('section[aria-labelledby="slots-paytable-heading"] li'));
  expect(rows.map((row) => row.querySelector('[role="img"]')?.getAttribute('aria-label'))).toEqual([
    'Three sevens',
    'Three diamonds',
    'Three bars',
    'Three bells',
    'Three lemons',
    'Three cherries',
  ]);
  expect(rows[0]).toHaveTextContent('100×100 TNB1 in 2,000');
  expect(rows[5]).toHaveTextContent('1×Stake back1 in 6.3');
  await act(async () => button('Max').click());
  expect(betInput()).toHaveValue(10);
  expect(rows[0]).toHaveTextContent('1,000 TNB');
  expect(container).toHaveTextContent('Top prize 1,000 TNB');
});

it('steps the bet through the limits with the controls and chips', async () => {
  await render();
  expect(button('Lower bet')).toBeDisabled();
  await act(async () => button('Raise bet').click());
  expect(betInput()).toHaveValue(2);
  await act(async () => button('Raise bet').click());
  expect(betInput()).toHaveValue(5);
  await act(async () => button('Raise bet').click());
  expect(betInput()).toHaveValue(10);
  expect(button('Raise bet')).toBeDisabled();
  await act(async () => button('Lower bet').click());
  expect(betInput()).toHaveValue(5);
  await act(async () => button('2').click());
  expect(betInput()).toHaveValue(2);
  expect(button('2')).toHaveAttribute('aria-pressed', 'true');
  expect(button('Spin 2 TNB')).toBeEnabled();
});

it('reveals a win on the payline, the paytable, the meters, the session and the history', async () => {
  await render();
  await act(async () => button('Spin 1 TNB').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(expect.objectContaining({game: 'slots', rules_version: 2}));
  expect(container.querySelector('[role="img"][aria-label^="Payline"]')).toHaveAttribute(
    'aria-label',
    'Payline: Lemon, Lemon, Lemon',
  );
  expect(container).toHaveTextContent('2 TNB returned');
  expect(container).toHaveTextContent('Three lemons · Stake: 1 TNB · Net +1 TNB');
  expect(container.querySelector('li[data-lit]')).toHaveTextContent('2×');
  expect(container).toHaveTextContent('Paid2TNB');
  expect(container).toHaveTextContent('1 spin');
  expect(container).toHaveTextContent('Wagered1Returned2Net+1');
  expect(container.querySelector('#slots-history-heading')?.closest('section')).toHaveTextContent('Three lemons');
});

it('shows a varied losing line without celebrating it', async () => {
  (placeCasinoBet as jest.Mock).mockResolvedValue(
    spin({payout: 0, profit: -1, result: {draw: 1640, multiplier: 0, symbols: ['diamond', 'cherry', 'lemon']}}),
  );
  await render();
  await act(async () => button('Spin 1 TNB').click());
  expect(container).toHaveTextContent('No payout this round');
  expect(container).toHaveTextContent('Diamond, Cherry, Lemon · Stake: 1 TNB · Net -1 TNB');
  expect(container.querySelector('li[data-lit]')).toBeNull();
  expect(container.querySelector('[data-winning]')).toBeNull();
});

it('settles a pending roulette bet from the slots page without spinning the reels for it', async () => {
  const payload = {
    amount: 3,
    client_seed: 'client',
    commitment_id: 'commitment-id',
    game: 'roulette' as const,
    request_id: 'roulette-request',
    rules_version: 1,
    selection: {type: 'black'},
  };
  savePendingCasinoBet(7, {payload, serverSeedHash: commitment.server_seed_hash});
  (placeCasinoBet as jest.Mock).mockResolvedValue(
    spin({
      amount: 3,
      game: 'roulette',
      payout: 6,
      profit: 3,
      request_id: 'roulette-request',
      result: {color: 'black', multiplier: 2, number: 17},
      selection: {type: 'black'},
      total_stake: 3,
    }),
  );
  await render();
  expect(container).toHaveTextContent('A 3 TNB roulette bet is awaiting confirmation');
  expect(container).toHaveTextContent('Bet3TNB');
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(payload);
  expect(createCasinoCommitment).not.toHaveBeenCalled();
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container).toHaveTextContent('6 TNB returned');
  expect(container).toHaveTextContent('Roulette 17 black · Stake: 3 TNB · Net +3 TNB');
  expect(container).toHaveTextContent('0 spins');
  expect(container.querySelector('li[data-lit]')).toBeNull();
});

it('opens a spin receipt from the history', async () => {
  (getCasinoBets as jest.Mock).mockResolvedValue([spin({request_id: 'earlier'})]);
  await render();
  expect(container).toHaveTextContent('Every spin can be checked.');
  await act(async () => button('View receipt for the 1 TNB spin').click());
  expect(container.querySelector('#slots-receipt-heading')).toHaveTextContent('Three lemons');
  expect(button('Verify receipt')).toBeEnabled();
  expect(container).toHaveTextContent('8368 of 10,000');
  await act(async () => button('Close receipt').click());
  expect(container.querySelector('#slots-receipt-heading')).toBeNull();
});

it('keeps game sound off until the player turns it on', async () => {
  await render();
  expect(button('Game sound')).toHaveAttribute('aria-pressed', 'false');
  await act(async () => button('Game sound').click());
  expect(button('Game sound')).toHaveAttribute('aria-pressed', 'true');
  expect(localStorage.getItem(SLOTS_SOUND_STORAGE_KEY)).toBe('true');
});
