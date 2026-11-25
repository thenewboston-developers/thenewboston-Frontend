import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, Route, Routes, useLocation} from 'react-router-dom';

import {createCasinoCommitment, getCasino, getCasinoBet, getCasinoBets, placeCasinoBet} from 'api/casino';
import Casino from 'pages/Casino';
import {CasinoBet, CasinoSummary} from 'types/casino';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';

import Plinko from './index';
import {DROP_DURATION, MAX_BALLS, MULTIPLIERS, POCKET_WEIGHTS} from './utils';

const mockPlayDrop = jest.fn();
const mockPlayLanding = jest.fn();
const mockPlayPeg = jest.fn();
const mockUnlockSound = jest.fn();
jest.mock('./usePlinkoSounds', () => {
  const {useState} = jest.requireActual('react');
  return {
    __esModule: true,
    default: function useMockPlinkoSounds() {
      const [soundEnabled, setSoundEnabled] = useState(false);
      return {
        playDrop: mockPlayDrop,
        playLanding: mockPlayLanding,
        playPeg: mockPlayPeg,
        soundEnabled,
        toggleSound: () => setSoundEnabled((value: boolean) => !value),
        unlockSound: mockUnlockSound,
      };
    },
  };
});

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
let mockAuthenticated = true;
let mockUserId = 7;
const mockDispatch = jest.fn(() => Promise.resolve());
jest.mock('hooks', () => ({useIsAuthenticated: () => mockAuthenticated}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      self: {id: mockUserId},
      wallets: {wallets: {1: {id: 1, balance: 200, currency: {ticker: 'TNB'}, owner: mockUserId}}},
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
      house_edge: 0.04833984375,
      id: 'plinko',
      max_bet: 20,
      max_multiplier: 50,
      min_bet: 1,
      name: 'Plinko',
      rows: 12,
      rules_version: 1,
      payout_table: MULTIPLIERS.map((multiplier, slot) => ({
        slot,
        multiplier,
        probability: POCKET_WEIGHTS[slot] / 4096,
      })),
    },
  ],
};
const commitment = {
  algorithm: 'hmac-sha256-v1',
  expires_at: '2026-11-25T12:00:00Z',
  id: 'commitment-id',
  server_seed_hash: 'observed',
};
const settled: CasinoBet = {
  amount: 1,
  created_at: '2026-11-25T12:00:00Z',
  fund,
  game: 'plinko',
  id: 1,
  payout: 3,
  profit: 2,
  request_id: 'request-id',
  result: {draw: 1041, multiplier: 3, path: [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], slot: 3},
  rules_version: 1,
  settled_at: '2026-11-25T12:00:00Z',
  status: 'settled',
  total_stake: 1,
  wallet_balance: 202,
  fairness: {
    algorithm: 'hmac-sha256-v1',
    client_seed: 'client',
    commitment_id: 'commitment-id',
    server_seed: 'seed',
    server_seed_hash: 'observed',
  },
};

const button = (label: string) =>
  Array.from(container.querySelectorAll('button')).find((element) => element.textContent?.includes(label))!;
const Location = () => {
  const {hash, pathname, search} = useLocation();
  return (
    <output>
      {pathname}
      {search}
      {hash}
    </output>
  );
};
const render = async (path = '/plinko/home') => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={[path]}>
        <Location />
        <Routes>
          <Route element={<Plinko />} path="/plinko/*" />
          <Route element={<Casino />} path="/casino/*" />
        </Routes>
      </MemoryRouter>,
    ),
  );
};
const changeAmount = (value: string) => {
  const input = container.querySelector('#plinko-bet-amount')!;
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
  input.dispatchEvent(new Event('input', {bubbles: true}));
};

beforeEach(() => {
  mockAuthenticated = true;
  mockUserId = 7;
  jest.clearAllMocks();
  localStorage.clear();
  mockDispatch.mockResolvedValue(undefined);
  Object.defineProperty(window, 'matchMedia', {configurable: true, value: undefined});
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
  jest.restoreAllMocks();
});

it('shows the board, full rules and funded wager limits', async () => {
  await render();
  expect(container.querySelector('h1')).toHaveTextContent('Plinko');
  expect(container).toHaveTextContent('Minimum 1 · Maximum 20 TNB');
  expect(container).toHaveTextContent('95.166015625%');
  expect(container.querySelector('[aria-label="Plinko board"]')).not.toBeNull();
  expect(button('Drop ball')).toBeEnabled();
  act(() => changeAmount('21'));
  expect(button('Drop ball')).toBeDisabled();
  act(() => changeAmount('1.5'));
  expect(button('Drop ball')).toBeDisabled();
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('places one server-authoritative wager and reveals its recorded pocket and receipt', async () => {
  await render();
  await act(async () => button('Drop ball').click());
  expect(placeCasinoBet).toHaveBeenCalledTimes(1);
  expect(placeCasinoBet).toHaveBeenCalledWith(expect.objectContaining({amount: 1, game: 'plinko', rules_version: 1}));
  expect((placeCasinoBet as jest.Mock).mock.calls[0][0].selection).toBeUndefined();
  expect(container.querySelector('[aria-label="Plinko result"]')).toHaveTextContent('Pocket 4 · 3× · Net +2 TNB');
  expect(container.querySelector('[aria-label="Plinko board"] [data-selected="true"]')).toHaveTextContent('3×');
  await act(async () => button('View').click());
  expect(button('Verify receipt')).toBeEnabled();
  expect(readPendingCasinoBet(7)).toBeNull();
});

it('prevents overlapping drops while the first request is unresolved', async () => {
  let resolve!: (value: CasinoBet) => void;
  (placeCasinoBet as jest.Mock).mockReturnValue(
    new Promise<CasinoBet>((done) => {
      resolve = done;
    }),
  );
  await render();
  await act(async () => {
    button('Drop ball').click();
    button('Drop ball')?.click();
  });
  expect(placeCasinoBet).toHaveBeenCalledTimes(1);
  expect(button('Checking your bet')).toBeDisabled();
  await act(async () => resolve(settled));
  expect(button('Drop ball')).toBeEnabled();
});

it('retries an uncertain wager with its exact persisted identity after reload', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network interrupted')).mockResolvedValueOnce(settled);
  await render();
  await act(async () => button('Drop ball').click());
  const payload = (placeCasinoBet as jest.Mock).mock.calls[0][0];
  expect(readPendingCasinoBet(7)?.payload).toEqual(payload);
  act(() => root.unmount());
  root = createRoot(container);
  await render();
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenNthCalledWith(2, payload);
  expect(createCasinoCommitment).toHaveBeenCalledTimes(1);
  expect(readPendingCasinoBet(7)).toBeNull();
});

it('links back to an active Blackjack hand without trapping an unaccepted Plinko wager', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {status: 409, data: {code: 'game_in_progress', detail: 'Finish the existing casino game first.'}},
  });
  await render();
  await act(async () => button('Drop ball').click());
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container.querySelector('a[href="/blackjack/home"]')).toHaveTextContent('Resume your Blackjack hand');
  expect(button('Retry same bet')).toBeUndefined();
});

it('recovers a pending different-game bet without animating a false Plinko outcome', async () => {
  const payload = {
    amount: 1,
    client_seed: 'client',
    commitment_id: 'commitment-id',
    game: 'slots' as const,
    request_id: 'request-id',
    rules_version: 2,
  };
  savePendingCasinoBet(7, {payload, serverSeedHash: 'observed'});
  (placeCasinoBet as jest.Mock).mockResolvedValue({
    ...settled,
    game: 'slots',
    result: {draw: 8000, multiplier: 2, symbols: ['lemon', 'lemon', 'lemon']},
    payout: 2,
    profit: 1,
  });
  await render();
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenCalledWith(payload);
  expect(createCasinoCommitment).not.toHaveBeenCalled();
  expect(container.querySelector('[aria-label="Plinko result"]')).toHaveTextContent('Your slots bet was confirmed');
  expect(container.querySelector('[aria-label="Plinko board"] [data-selected="true"]')).toBeNull();
});

it('recovers a settled loss without placing another wager', async () => {
  savePendingCasinoBet(7, {
    payload: {
      amount: 1,
      client_seed: 'client',
      commitment_id: 'commitment-id',
      game: 'plinko',
      request_id: 'request-id',
      rules_version: 1,
    },
    serverSeedHash: 'observed',
  });
  (getCasinoBet as jest.Mock).mockResolvedValue({
    ...settled,
    payout: 0,
    profit: -1,
    result: {draw: 366, path: [0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0], slot: 6, multiplier: 0},
  });
  await render();
  expect(container.querySelector('[aria-label="Plinko result"]')).toHaveTextContent('0 TNB returned');
  expect(container.querySelector('[aria-label="Plinko result"]')).toHaveTextContent('Pocket 7 · 0× · Net -1 TNB');
  expect(placeCasinoBet).not.toHaveBeenCalled();
  expect(mockPlayDrop).not.toHaveBeenCalled();
  expect(mockPlayLanding).not.toHaveBeenCalled();
  expect(mockPlayPeg).not.toHaveBeenCalled();
});

it('requires authentication and keeps admin controls hidden', async () => {
  mockAuthenticated = false;
  await render();
  expect(container).toHaveTextContent('Sign In / Create Account');
  expect(container.querySelector('#plinko-bet-amount')).toBeNull();
  expect(container).not.toHaveTextContent('Manage casino funds');
});

it.each([{enabled: false}, {max_bet: 0}, {rules_version: 2}, {rows: 16}, {payout_table: []}])(
  'disables wagering for closed, unfunded or unsupported rules: %j',
  async (changes) => {
    (getCasino as jest.Mock).mockResolvedValue({...summary, games: [{...summary.games[0], ...changes}]});
    await render();
    expect(button('Drop ball')).toBeDisabled();
  },
);

it.each(['/plinko?source=bookmark#receipt', '/casino/plinko?source=bookmark#receipt'])(
  'preserves context on the canonical redirect from %s',
  async (path) => {
    await render(path);
    expect(container.querySelector('output')).toHaveTextContent('/plinko/home?source=bookmark#receipt');
    expect(placeCasinoBet).not.toHaveBeenCalled();
  },
);

it('clears a definite rejection and refreshes the fund limits', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {status: 400, data: {code: 'bet_limit', detail: 'The wager exceeds the current limit.'}},
  });
  await render();
  await act(async () => button('Drop ball').click());
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container).toHaveTextContent('The wager exceeds the current limit.');
  expect(getCasino).toHaveBeenCalledTimes(2);
});

const enableAnimation = () => {
  const frames = new Map<number, FrameRequestCallback>();
  let frameId = 0;
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: () => ({matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn()}),
  });
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frameId += 1;
    frames.set(frameId, callback);
    return frameId;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    frames.delete(id);
  });
  return (time: number) => {
    const current = [...frames.values()];
    frames.clear();
    act(() => current.forEach((callback) => callback(time)));
  };
};

it('accepts a second wager while the first ball is bouncing and reveals each receipt on its own landing', async () => {
  const advance = enableAnimation();
  (crypto.randomUUID as jest.Mock)
    .mockReturnValueOnce('first-client')
    .mockReturnValueOnce('request-id')
    .mockReturnValueOnce('second-client')
    .mockReturnValueOnce('second');
  const second = {
    ...settled,
    request_id: 'second',
    payout: 50,
    profit: 49,
    result: {draw: 4095, multiplier: 50, path: Array(12).fill(1), slot: 12},
  };
  (placeCasinoBet as jest.Mock).mockResolvedValueOnce(settled).mockResolvedValueOnce(second);
  await render();
  await act(async () => button('Drop ball').click());
  advance(0);
  advance(400);
  expect(button('Drop ball')).toBeEnabled();
  const firstBall = container.querySelector('[data-ball-id="request-id"] circle')!;
  const firstHeight = firstBall.getAttribute('cy');
  await act(async () => button('Drop ball').click());
  expect(firstBall).toHaveAttribute('cy', firstHeight);
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(2);
  expect(container).toHaveTextContent('2 balls in play');
  expect(container.querySelector('[aria-labelledby="plinko-history-heading"] tbody')).toBeNull();
  advance(500);
  advance(DROP_DURATION);
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(1);
  expect(container.querySelector('[aria-label="Plinko result"]')).toHaveTextContent('3 TNB returned');
  expect(container.querySelectorAll('[aria-labelledby="plinko-history-heading"] tbody tr')).toHaveLength(1);
  advance(DROP_DURATION + 500);
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(0);
  expect(container.querySelector('[aria-label="Plinko result"]')).toHaveTextContent('50 TNB returned');
  expect(container.querySelectorAll('[aria-labelledby="plinko-history-heading"] tbody tr')).toHaveLength(2);
  expect(mockPlayDrop).toHaveBeenCalledTimes(2);
  expect(mockPlayLanding).toHaveBeenNthCalledWith(1, 3);
  expect(mockPlayLanding).toHaveBeenNthCalledWith(2, 50);
});

it('caps simultaneous balls at eight and allows another only after a landing', async () => {
  const advance = enableAnimation();
  let sequence = 0;
  (crypto.randomUUID as jest.Mock).mockImplementation(() => {
    sequence += 1;
    return `ball-${sequence}`;
  });
  (placeCasinoBet as jest.Mock).mockImplementation(async (payload) => ({...settled, request_id: payload.request_id}));
  await render();
  for (let index = 0; index < MAX_BALLS; index += 1) {
    // Each wager awaits server confirmation before the next manual click.
    // eslint-disable-next-line no-await-in-loop
    await act(async () => button('Drop ball').click());
    advance(index * 100);
  }
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(8);
  expect(button('Drop ball')).toBeDisabled();
  await act(async () => button('Drop ball').click());
  expect(placeCasinoBet).toHaveBeenCalledTimes(8);
  advance(DROP_DURATION);
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(7);
  expect(button('Drop ball')).toBeEnabled();
  await act(async () => button('Drop ball').click());
  expect(placeCasinoBet).toHaveBeenCalledTimes(9);
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(8);
});

it('pauses new wagers after an uncertain response while earlier balls keep moving', async () => {
  const advance = enableAnimation();
  (crypto.randomUUID as jest.Mock)
    .mockReturnValueOnce('first-client')
    .mockReturnValueOnce('request-id')
    .mockReturnValueOnce('second-client')
    .mockReturnValueOnce('second');
  (placeCasinoBet as jest.Mock).mockResolvedValueOnce(settled).mockRejectedValueOnce(new Error('Network'));
  await render();
  await act(async () => button('Drop ball').click());
  advance(0);
  await act(async () => button('Drop ball').click());
  expect(button('Drop ball')).toBeUndefined();
  expect(button('Retry same bet')).toBeEnabled();
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(1);
  advance(DROP_DURATION);
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(0);
  expect(button('Retry same bet')).toBeEnabled();
  expect(readPendingCasinoBet(7)).not.toBeNull();
});

it('does not replay a duplicate receipt and keeps mute toggles independent of running balls', async () => {
  const advance = enableAnimation();
  await render();
  expect(button('Sound off')).toHaveAttribute('aria-pressed', 'false');
  await act(async () => button('Sound off').click());
  expect(button('Sound on')).toHaveAttribute('aria-pressed', 'true');
  await act(async () => button('Drop ball').click());
  advance(0);
  advance(400);
  const firstBall = container.querySelector('[data-ball-id] circle')!;
  const firstHeight = firstBall.getAttribute('cy');
  await act(async () => button('Sound on').click());
  expect(firstBall).toHaveAttribute('cy', firstHeight);
  await act(async () => button('Drop ball').click());
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(1);
  expect(mockPlayDrop).toHaveBeenCalledTimes(1);
  advance(DROP_DURATION);
  expect(mockPlayLanding).toHaveBeenCalledTimes(1);
});
