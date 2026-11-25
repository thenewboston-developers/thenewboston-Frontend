import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, Route, Routes, useLocation} from 'react-router-dom';

import {
  actOnCasinoBet,
  createCasinoCommitment,
  getActiveCasinoBet,
  getCasino,
  getCasinoBet,
  getCasinoBets,
  placeCasinoBet,
} from 'api/casino';
import Casino from 'pages/Casino';
import {BlackjackBet, CasinoSummary} from 'types/casino';
import {verifyBlackjackReceipt} from 'utils/blackjackFairness';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';

import Blackjack from './index';
import {readPendingBlackjackAction} from './storage';

jest.mock('api/casino', () => ({
  actOnCasinoBet: jest.fn(),
  createCasinoCommitment: jest.fn(),
  getActiveCasinoBet: jest.fn(),
  getCasino: jest.fn(),
  getCasinoBet: jest.fn(),
  getCasinoBets: jest.fn(),
  placeCasinoBet: jest.fn(),
}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => ({type: 'refresh-wallets'})}));
jest.mock('store/wallets', () => ({setWallet: (wallet: unknown) => ({payload: wallet, type: 'set-wallet'})}));
jest.mock('utils/blackjackFairness', () => ({verifyBlackjackReceipt: jest.fn()}));
let mockAuthenticated = true;
let mockUserId = 7;
const mockDispatch = jest.fn(() => Promise.resolve());
jest.mock('hooks', () => ({useIsAuthenticated: () => mockAuthenticated}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      self: {id: mockUserId},
      wallets: {wallets: {1: {id: 1, balance: 2000, currency: {ticker: 'TNB'}, owner: mockUserId}}},
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
      house_edge: null,
      id: 'blackjack',
      max_bet: 500,
      max_multiplier: 4,
      min_bet: 2,
      name: 'Blackjack',
      rules_version: 1,
    },
  ],
};
const commitment = {
  algorithm: 'hmac-sha256-v1',
  expires_at: '2030-01-01T12:00:00Z',
  id: 'commitment-id',
  server_seed_hash: 'observed-hash',
};
const openHand: BlackjackBet = {
  amount: 10,
  created_at: '2026-11-25T12:00:00Z',
  fairness: {
    algorithm: 'hmac-sha256-v1',
    client_seed: 'client',
    commitment_id: 'commitment-id',
    server_seed: '',
    server_seed_hash: 'observed-hash',
  },
  fund,
  game: 'blackjack',
  id: 1,
  payout: 0,
  profit: 0,
  request_id: 'request-id',
  result: {
    available_actions: ['hit', 'stand', 'double'],
    dealer_cards: ['3H', null],
    dealer_total: 3,
    expires_at: '2030-01-01T12:00:00Z',
    multiplier: 0,
    outcome: null,
    phase: 'player_turn',
    player_cards: ['10S', '6D'],
    player_total: 16,
    revision: 0,
  },
  rules_version: 1,
  settled_at: '',
  status: 'open',
  total_stake: 10,
  wallet_balance: 1990,
};
const settled: BlackjackBet = {
  ...openHand,
  payout: 20,
  profit: 10,
  status: 'settled',
  settled_at: '2026-11-25T12:02:00Z',
  result: {
    ...openHand.result,
    actions: ['stand'],
    available_actions: [],
    dealer_cards: ['3H', '10C', '10D'],
    dealer_total: 23,
    expires_at: null,
    multiplier: 2,
    outcome: 'win',
    phase: 'settled',
    revision: 1,
  },
};
const payload = {
  amount: 10,
  client_seed: 'client',
  commitment_id: 'commitment-id',
  game: 'blackjack' as const,
  request_id: 'request-id',
  rules_version: 1,
};
const button = (label: string) =>
  Array.from(container.querySelectorAll('button')).find((item) => item.textContent?.includes(label))!;
const LocationProbe = () => {
  const {hash, pathname, search} = useLocation();
  return (
    <output>
      {pathname}
      {search}
      {hash}
    </output>
  );
};
const render = async (path = '/blackjack/home') => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={[path]}>
        <LocationProbe />
        <Routes>
          <Route element={<Blackjack />} path="/blackjack/*" />
          <Route element={<Casino />} path="/casino/*" />
        </Routes>
      </MemoryRouter>,
    ),
  );
};
const changeAmount = (value: string) => {
  const input = container.querySelector('#blackjack-wager') as HTMLInputElement;
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
  input.dispatchEvent(new Event('input', {bubbles: true}));
};
const remount = async () => {
  act(() => root.unmount());
  root = createRoot(container);
  await render();
};

beforeEach(() => {
  jest.clearAllMocks();
  mockDispatch.mockResolvedValue(undefined);
  mockAuthenticated = true;
  mockUserId = 7;
  localStorage.clear();
  let id = 0;
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: {
      randomUUID: jest.fn(() => {
        id += 1;
        return `uuid-${id}`;
      }),
    },
  });
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (getCasino as jest.Mock).mockResolvedValue(summary);
  (getCasinoBets as jest.Mock).mockResolvedValue([]);
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(null);
  (getCasinoBet as jest.Mock).mockRejectedValue({response: {status: 404}});
  (createCasinoCommitment as jest.Mock).mockResolvedValue(commitment);
  (placeCasinoBet as jest.Mock).mockResolvedValue(openHand);
  (actOnCasinoBet as jest.Mock).mockResolvedValue(settled);
  (verifyBlackjackReceipt as jest.Mock).mockResolvedValue('Verified hand');
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it('offers even TNB wagers and disables invalid or uncovered amounts before sending', async () => {
  await render();
  expect(button('Deal 10 TNB')).toBeEnabled();
  expect(container).toHaveTextContent('Table limits 2 – 500 TNB');
  act(() => changeAmount('3'));
  expect(button('Deal 3 TNB')).toBeDisabled();
  act(() => changeAmount('502'));
  expect(button('Deal 502 TNB')).toBeDisabled();
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('shows the table to signed-out visitors without requesting private hands', async () => {
  mockAuthenticated = false;
  await render();
  expect(container).toHaveTextContent('Sign in to play');
  expect(container.querySelector('#blackjack-wager')).toBeNull();
  expect(getActiveCasinoBet).not.toHaveBeenCalled();
});

it('resumes an active hand with a hidden dealer card after loading the page', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  await render();
  expect(button('Hit')).toBeEnabled();
  expect(button('Stand')).toBeEnabled();
  expect(container.querySelectorAll('[aria-label="Face-down card"]')).toHaveLength(1);
  expect(container.querySelector('[aria-label="Dealer shows 3"]')).toHaveTextContent('3');
  expect(container.querySelector('[aria-label="You have 16"]')).toHaveTextContent('16');
  expect(container.querySelector('h2')).toHaveTextContent('Your move');
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('persists a move before sending and prevents duplicate submissions in the same event turn', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  let finish!: (bet: BlackjackBet) => void;
  (actOnCasinoBet as jest.Mock).mockImplementation(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  await render();
  act(() => {
    button('Double').click();
    button('Double').click();
  });
  expect(actOnCasinoBet).toHaveBeenCalledTimes(1);
  const saved = readPendingBlackjackAction(7)!;
  expect(saved.payload).toEqual({action: 'double', action_id: 'uuid-1', expected_revision: 0});
  expect(actOnCasinoBet).toHaveBeenCalledWith('request-id', saved.payload);
  await act(async () => finish({...settled, total_stake: 20, payout: 40, profit: 20}));
  expect(readPendingBlackjackAction(7)).toBeNull();
  expect(container).toHaveTextContent('40 TNB returned');
});

it('retries a lost move response after reload using the exact same action ID and revision', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  (actOnCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network')).mockResolvedValueOnce(settled);
  await render();
  await act(async () => button('Stand').click());
  const first = (actOnCasinoBet as jest.Mock).mock.calls[0];
  await remount();
  expect(button('Retry same move')).toBeEnabled();
  await act(async () => button('Retry same move').click());
  expect((actOnCasinoBet as jest.Mock).mock.calls[1]).toEqual(first);
  expect(readPendingBlackjackAction(7)).toBeNull();
  expect(createCasinoCommitment).not.toHaveBeenCalled();
});

it('retains an uncertain deal across reload and retries its original commitment', async () => {
  (placeCasinoBet as jest.Mock)
    .mockRejectedValueOnce(new Error('Network'))
    .mockImplementationOnce(async (data) => ({...openHand, request_id: data.request_id}));
  await render();
  await act(async () => button('Deal 10 TNB').click());
  const first = (placeCasinoBet as jest.Mock).mock.calls[0][0];
  await remount();
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenNthCalledWith(2, first);
  expect(createCasinoCommitment).toHaveBeenCalledTimes(1);
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(button('Hit')).toBeEnabled();
});

it('clears an older confirmed pending wager while preserving a newer active hand', async () => {
  savePendingCasinoBet(7, {payload, serverSeedHash: 'observed-hash'});
  (getActiveCasinoBet as jest.Mock).mockResolvedValue({...openHand, id: 2, request_id: 'newer-hand'});
  (getCasinoBet as jest.Mock).mockResolvedValue(settled);
  await render();
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(button('Hit')).toBeEnabled();
  await act(async () => button('Stand').click());
  expect(actOnCasinoBet).toHaveBeenCalledWith('newer-hand', expect.anything());
});

it('does not let a stale poll restore controls after a more recent settlement', async () => {
  jest.useFakeTimers();
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  let finishPoll!: (bet: BlackjackBet) => void;
  (getCasinoBet as jest.Mock).mockImplementation(
    () =>
      new Promise((resolve) => {
        finishPoll = resolve;
      }),
  );
  await render();
  await act(async () => jest.advanceTimersByTime(5000));
  await act(async () => button('Stand').click());
  await act(async () => finishPoll(openHand));
  expect(container).toHaveTextContent('20 TNB returned');
  expect(button('Hit')).toBeUndefined();
  expect(button('Deal 10 TNB')).toBeEnabled();
});

it('remounts account state and ignores a response from the previous member', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  let finishOld!: (bet: BlackjackBet) => void;
  (actOnCasinoBet as jest.Mock).mockImplementation(
    () =>
      new Promise((resolve) => {
        finishOld = resolve;
      }),
  );
  await render();
  act(() => button('Stand').click());
  mockUserId = 8;
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(null);
  await render();
  await act(async () => finishOld(settled));
  expect(container).not.toHaveTextContent('20 TNB returned');
  expect(button('Deal 10 TNB')).toBeEnabled();
  expect(readPendingBlackjackAction(7)).not.toBeNull();
  expect(readPendingBlackjackAction(8)).toBeNull();
});

it('blocks wagering when recovery storage is corrupt', async () => {
  localStorage.setItem('casino.pending.blackjack.action:7', 'not-json');
  await render();
  expect(container).toHaveTextContent('Saved wager recovery is unavailable');
  expect(button('Reconnect')).toBeDisabled();
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('requires a successful active-hand check before a fresh wager', async () => {
  (getActiveCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network')).mockResolvedValueOnce(null);
  await render();
  expect(button('Deal 10 TNB')).toBeUndefined();
  await act(async () => button('Reconnect').click());
  expect(button('Deal 10 TNB')).toBeEnabled();
});

it.each(['/casino/blackjack?from=bookmark#receipt', '/blackjack?from=bookmark#receipt'])(
  'redirects %s without losing URL context',
  async (path) => {
    await render(path);
    expect(container.querySelector('output')).toHaveTextContent('/blackjack/home?from=bookmark#receipt');
    expect(container.querySelector('h1')).toHaveTextContent('Blackjack');
  },
);

it('builds the wager from chips, and takes changes back with undo and clear', async () => {
  await render();
  const chip = (amount: number) =>
    container.querySelector(`[aria-label="Add ${amount} TNB to your bet"]`) as HTMLButtonElement;
  act(() => chip(50).click());
  act(() => chip(2).click());
  expect(button('Deal 62 TNB')).toBeEnabled();
  expect(container.querySelector('#blackjack-wager')).toHaveValue(62);
  act(() => button('Undo').click());
  expect(button('Deal 60 TNB')).toBeEnabled();
  act(() => button('Max').click());
  expect(button('Deal 500 TNB')).toBeEnabled();
  expect(chip(2)).toBeDisabled();
  act(() => button('Clear').click());
  expect(button('Deal 0 TNB')).toBeDisabled();
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('remembers the last dealt wager for the next visit', async () => {
  (placeCasinoBet as jest.Mock).mockImplementation(async (data) => ({...settled, request_id: data.request_id}));
  await render();
  act(() => changeAmount('40'));
  await act(async () => button('Deal 40 TNB').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(expect.objectContaining({amount: 40}));
  await remount();
  expect(container.querySelector('#blackjack-wager')).toHaveValue(40);
  expect(button('Deal 40 TNB')).toBeEnabled();
});

it('plays a move from the keyboard, but not while typing or with a modifier held', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  await render();
  const press = (init: KeyboardEventInit, target: EventTarget = document.body) =>
    target.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, ...init}));
  const field = document.createElement('input');
  document.body.appendChild(field);
  await act(async () => {
    press({key: 's'}, field);
    press({ctrlKey: true, key: 's'});
  });
  field.remove();
  expect(actOnCasinoBet).not.toHaveBeenCalled();
  await act(async () => {
    press({key: 'S'});
  });
  expect(actOnCasinoBet).toHaveBeenCalledWith('request-id', expect.objectContaining({action: 'stand'}));
});

it('shows the result on the table and in the history once the hand is over', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  await render();
  expect(container).toHaveTextContent('Your finished Blackjack hands will appear here.');
  await act(async () => button('Stand').click());
  expect(container.querySelector('h2')).toHaveTextContent('You win');
  expect(container.querySelector('[aria-label="Dealer has 23"]')).toHaveTextContent('23');
  expect(container.querySelectorAll('[aria-label="Face-down card"]')).toHaveLength(0);
  expect(container).toHaveTextContent('Dealer busts with 23');
  expect(container).toHaveTextContent('1 hand');
  expect(container).not.toHaveTextContent('Your finished Blackjack hands will appear here.');
  await act(async () => button('Receipt').click());
  await act(async () => button('Verify this hand').click());
  expect(container).toHaveTextContent('Verified hand');
});
