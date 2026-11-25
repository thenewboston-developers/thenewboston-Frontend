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
import {CasinoSummary, VideoPokerBet} from 'types/casino';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';
import {verifyVideoPokerReceipt, VIDEO_POKER_PAY_TABLE} from 'utils/videoPokerFairness';

import VideoPoker from './index';
import {readPendingVideoPokerDraw} from './storage';

jest.mock('api/casino', () => ({
  actOnCasinoBet: jest.fn(),
  createCasinoCommitment: jest.fn(),
  getActiveCasinoBet: jest.fn(),
  getCasino: jest.fn(),
  getCasinoBet: jest.fn(),
  getCasinoBets: jest.fn(),
  moveCasinoFunds: jest.fn(),
  placeCasinoBet: jest.fn(),
}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => ({type: 'refresh-wallets'})}));
jest.mock('utils/videoPokerFairness', () => ({
  ...jest.requireActual('utils/videoPokerFairness'),
  verifyVideoPokerReceipt: jest.fn(),
}));
let mockAuthenticated = true;
let mockBalance = 2000;
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
      house_edge: 0.01626543,
      id: 'video_poker',
      max_bet: 4,
      max_multiplier: 250,
      min_bet: 1,
      name: 'Video Poker',
      optimal_return: 0.98373457,
      pay_table: VIDEO_POKER_PAY_TABLE,
      rules_version: 1,
      timeout_seconds: 900,
    },
  ],
};
const withLimits = (minBet: number, maxBet: number): CasinoSummary => ({
  ...summary,
  games: [{...summary.games[0], max_bet: maxBet, min_bet: minBet}],
});
const commitment = {
  algorithm: 'hmac-sha256-v1',
  expires_at: '2030-01-01T12:00:00Z',
  id: 'commitment-id',
  server_seed_hash: 'observed-hash',
};
const openHand: VideoPokerBet = {
  amount: 1,
  created_at: '2026-11-25T12:00:00Z',
  fairness: {
    algorithm: 'hmac-sha256-v1',
    client_seed: 'client',
    commitment_id: 'commitment-id',
    server_seed: '',
    server_seed_hash: 'observed-hash',
  },
  fund,
  game: 'video_poker',
  id: 1,
  payout: 0,
  profit: 0,
  request_id: 'request-id',
  result: {
    available_actions: ['draw'],
    category: 'three_of_a_kind',
    dealt: ['KS', 'KH', '4D', '7C', 'KD'],
    expires_at: '2030-01-01T12:00:00Z',
    hand: ['KS', 'KH', '4D', '7C', 'KD'],
    held: null,
    multiplier: 0,
    phase: 'draw',
    revision: 0,
  },
  rules_version: 1,
  settled_at: '',
  status: 'open',
  total_stake: 1,
  wallet_balance: 1999,
};
const settled: VideoPokerBet = {
  ...openHand,
  payout: 9,
  profit: 8,
  settled_at: '2026-11-25T12:02:00Z',
  settlement_reason: 'completed',
  status: 'settled',
  result: {
    ...openHand.result,
    actions: ['draw:11001'],
    available_actions: [],
    category: 'full_house',
    expires_at: null,
    hand: ['KS', 'KH', '2S', '2H', 'KD'],
    held: [true, true, false, false, true],
    multiplier: 9,
    phase: 'settled',
    revision: 1,
  },
};
const lost: VideoPokerBet = {
  ...settled,
  payout: 0,
  profit: -1,
  result: {
    ...settled.result,
    actions: ['draw:00000'],
    category: 'nothing',
    hand: ['2S', '2H', '9C', '5D', '8H'],
    held: [false, false, false, false, false],
    multiplier: 0,
  },
};
const payload = {
  amount: 1,
  client_seed: 'client',
  commitment_id: 'commitment-id',
  game: 'video_poker' as const,
  request_id: 'request-id',
  rules_version: 1,
};
const button = (label: string) =>
  Array.from(container.querySelectorAll('button')).find((item) => item.textContent?.includes(label))!;
const card = (label: string) => container.querySelector(`button[aria-label^="${label}"]`) as HTMLButtonElement;
const cardLabels = () =>
  Array.from(container.querySelectorAll('[aria-label="Your hand"] button, [aria-label="Sample hand"] button')).map(
    (item) => item.getAttribute('aria-label'),
  );
const meter = (name: string) =>
  Array.from(container.querySelectorAll('dt')).find((item) => item.textContent === name)!.nextElementSibling!
    .textContent;
const litColumn = (hand: string) => container.querySelector(`tr[data-hand="${hand}"] td[data-active]`)!.textContent;
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
const render = async (path = '/video-poker/home') => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}} initialEntries={[path]}>
        <LocationProbe />
        <Routes>
          <Route element={<VideoPoker />} path="/video-poker/*" />
          <Route element={<Casino />} path="/casino/*" />
        </Routes>
      </MemoryRouter>,
    ),
  );
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
  mockBalance = 2000;
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
  // Like the server, the receipt carries the request ID and wager it was asked for.
  (placeCasinoBet as jest.Mock).mockImplementation(async (data) => ({
    ...openHand,
    amount: data.amount,
    request_id: data.request_id,
    total_stake: data.amount,
  }));
  (actOnCasinoBet as jest.Mock).mockResolvedValue(settled);
  (verifyVideoPokerReceipt as jest.Mock).mockResolvedValue('Verified hand');
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it('shows the classic pay table with a column for every coin the table allows and lights the chosen bet', async () => {
  await render();
  const headings = Array.from(container.querySelectorAll('thead th')).map((item) => item.textContent);
  expect(headings).toEqual(['Coins', '1', '2', '3', '4']);
  expect(Array.from(container.querySelectorAll('tbody th')).map((item) => item.textContent)).toEqual([
    'Royal Flush',
    'Straight Flush',
    '4 of a Kind',
    'Full House',
    'Flush',
    'Straight',
    '3 of a Kind',
    'Two Pair',
    'Jacks or Better',
  ]);
  expect(litColumn('royal_flush')).toBe('250');
  expect(litColumn('jacks_or_better')).toBe('1');
  expect(meter('Bet')).toBe('1');
  expect(meter('Credits')).toBe('2,000');
  act(() => button('Bet one').click());
  act(() => button('Bet one').click());
  expect(litColumn('royal_flush')).toBe('750');
  expect(litColumn('full_house')).toBe('27');
  expect(meter('Bet')).toBe('3');
  expect(button('Deal')).toHaveTextContent('3 TNB');
  act(() => button('Bet one').click());
  act(() => button('Bet one').click());
  expect(meter('Bet')).toBe('1');
  expect(container).toHaveTextContent('Perfect play returns 98.37%');
  expect(container).toHaveTextContent('Table limits 1 to 4 TNB a hand');
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('offers larger coins once the table can cover them and never a wager outside its limits', async () => {
  (getCasino as jest.Mock).mockResolvedValue(withLimits(1, 40));
  await render();
  expect(container.querySelectorAll('thead th')).toHaveLength(6);
  expect(button('Coin')).toHaveTextContent('1 TNB');
  act(() => button('Coin').click());
  expect(button('Coin')).toHaveTextContent('5 TNB');
  expect(litColumn('royal_flush')).toBe('1,250');
  act(() => button('Bet one').click());
  expect(meter('Bet')).toBe('10');
  act(() => button('Coin').click());
  expect(button('Coin')).toHaveTextContent('25 TNB');
  expect(container.querySelectorAll('thead th')).toHaveLength(2);
  expect(meter('Bet')).toBe('25');
  expect(button('Bet one')).toBeDisabled();
  await remount();
  expect(button('Coin')).toHaveTextContent('25 TNB');
});

it('shows the machine to signed-out visitors without requesting private hands or offering play', async () => {
  mockAuthenticated = false;
  await render();
  expect(container).toHaveTextContent('Sign in to play');
  expect(cardLabels()).toEqual([
    '10 of spades',
    'Jack of spades',
    'Queen of spades',
    'King of spades',
    'Ace of spades',
  ]);
  expect(button('Deal')).toBeDisabled();
  expect(button('Bet max')).toBeDisabled();
  expect(meter('Credits')).toBe('—');
  expect(getActiveCasinoBet).not.toHaveBeenCalled();
  expect(container).not.toHaveTextContent(/practice|demo/i);
});

it('deals five cards, holds the tapped ones and draws to the final hand', async () => {
  await render();
  expect(cardLabels()).toEqual(Array(5).fill('Face-down card'));
  await act(async () => button('Deal').click());
  expect(placeCasinoBet).toHaveBeenCalledWith({...payload, client_seed: 'uuid-1', request_id: 'uuid-2'});
  expect(cardLabels()).toEqual(['King of spades', 'King of hearts', '4 of diamonds', '7 of clubs', 'King of diamonds']);
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Three of a Kind');
  expect(container.querySelector('tr[data-lit]')).toHaveAttribute('data-hand', 'three_of_a_kind');
  expect(button('Deal')).toBeUndefined();
  expect(button('Bet one')).toBeDisabled();
  act(() => card('King of spades').click());
  act(() => card('King of hearts').click());
  act(() => card('7 of clubs').click());
  act(() => card('7 of clubs').click());
  act(() => card('King of diamonds').click());
  expect(card('King of spades')).toHaveAttribute('aria-pressed', 'true');
  expect(card('King of spades')).toHaveAttribute('aria-label', 'King of spades, held');
  expect(card('7 of clubs')).toHaveAttribute('aria-pressed', 'false');
  await act(async () => button('Draw').click());
  expect(actOnCasinoBet).toHaveBeenCalledWith('uuid-2', {
    action: 'draw:11001',
    action_id: 'uuid-3',
    expected_revision: 0,
  });
  expect(cardLabels()).toEqual([
    'King of spades, held',
    'King of hearts, held',
    '2 of spades',
    '2 of hearts',
    'King of diamonds, held',
  ]);
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Full House');
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Paid 9 TNB');
  expect(container.querySelector('tr[data-lit]')).toHaveAttribute('data-hand', 'full_house');
  expect(meter('Win')).toBe('9');
  expect(button('Deal')).toBeEnabled();
  expect(container.querySelector('#video-poker-history-heading')!.parentElement).toHaveTextContent('Full House');
  expect(readPendingVideoPokerDraw(7)).toBeNull();
  expect(readPendingCasinoBet(7)).toBeNull();
});

it('toggles holds from the keyboard and from the hold keys under the cards', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  await render();
  const machine = container.querySelector('[aria-label="Video Poker machine"]')!;
  act(() => {
    machine.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: '1'}));
    machine.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: '5'}));
  });
  expect(card('King of spades')).toHaveAttribute('aria-pressed', 'true');
  expect(card('King of diamonds')).toHaveAttribute('aria-pressed', 'true');
  act(() => {
    machine.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: '5'}));
    machine.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key: '6'}));
  });
  expect(card('King of diamonds')).toHaveAttribute('aria-pressed', 'false');
  const holdKeys = Array.from(container.querySelectorAll('button[aria-hidden="true"]')) as HTMLButtonElement[];
  expect(holdKeys).toHaveLength(5);
  expect(holdKeys[0]).toHaveTextContent('Held');
  act(() => holdKeys[1].click());
  expect(card('King of hearts')).toHaveAttribute('aria-pressed', 'true');
  await act(async () => button('Draw').click());
  expect((actOnCasinoBet as jest.Mock).mock.calls[0][1].action).toBe('draw:11000');
});

it('ends a losing hand with game over and no payout', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  (actOnCasinoBet as jest.Mock).mockResolvedValue(lost);
  await render();
  await act(async () => button('Draw').click());
  expect((actOnCasinoBet as jest.Mock).mock.calls[0][1].action).toBe('draw:00000');
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Game over');
  expect(container.querySelector('tr[data-lit]')).toBeNull();
  expect(meter('Win')).toBe('0');
  expect(cardLabels()).toEqual(['2 of spades', '2 of hearts', '9 of clubs', '5 of diamonds', '8 of hearts']);
});

it('bets the most coins the table and the wallet allow with Bet Max and deals at once', async () => {
  mockBalance = 3;
  await render();
  await act(async () => button('Bet max').click());
  expect(placeCasinoBet).toHaveBeenCalledTimes(1);
  expect((placeCasinoBet as jest.Mock).mock.calls[0][0].amount).toBe(3);
  expect(meter('Bet')).toBe('3');
  expect(litColumn('royal_flush')).toBe('750');
  expect(button('Draw')).toBeEnabled();
});

it('refuses wagers the wallet cannot cover before anything is sent', async () => {
  mockBalance = 0;
  await render();
  expect(button('Deal')).toBeDisabled();
  expect(button('Bet max')).toBeDisabled();
  expect(container).toHaveTextContent('Your TNB wallet needs enough coins for this wager.');
  act(() => {
    button('Deal').click();
    button('Bet max').click();
  });
  expect(createCasinoCommitment).not.toHaveBeenCalled();
});

it('explains a closed or underfunded machine instead of offering a deal', async () => {
  (getCasino as jest.Mock).mockResolvedValue(withLimits(1, 0));
  await render();
  expect(button('Deal')).toBeDisabled();
  expect(container).toHaveTextContent('The casino fund cannot cover the minimum wager.');
  expect(container.querySelectorAll('thead th')).toHaveLength(6);
  (getCasino as jest.Mock).mockResolvedValue({...summary, games: [{...summary.games[0], enabled: false}]});
  await remount();
  expect(container).toHaveTextContent('This machine is currently closed.');
  (getCasino as jest.Mock).mockResolvedValue({...summary, fund: {...fund, enabled: false}});
  await remount();
  expect(container).toHaveTextContent('The casino is closed to new wagers.');
  expect(button('Deal')).toBeDisabled();
});

it('resumes an open hand after loading the page, with nothing held yet', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue({...openHand, amount: 4, total_stake: 4});
  await render();
  expect(cardLabels()[0]).toBe('King of spades');
  expect(button('Draw')).toBeEnabled();
  expect(meter('Bet')).toBe('4');
  expect(litColumn('three_of_a_kind')).toBe('12');
  expect(container.querySelectorAll('[aria-pressed="true"]')).toHaveLength(0);
  expect(container.querySelector('[role="timer"]')).toHaveTextContent(/^The dealt hand is kept in \d+:\d\d$/);
  expect(container.querySelector('[aria-live] [role="timer"]')).toBeNull();
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('persists a draw before sending and prevents duplicate submissions in the same event turn', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  let finish!: (bet: VideoPokerBet) => void;
  (actOnCasinoBet as jest.Mock).mockImplementation(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  await render();
  act(() => card('King of spades').click());
  act(() => {
    button('Draw').click();
    button('Draw').click();
  });
  expect(actOnCasinoBet).toHaveBeenCalledTimes(1);
  const saved = readPendingVideoPokerDraw(7)!;
  expect(saved.payload).toEqual({action: 'draw:10000', action_id: 'uuid-1', expected_revision: 0});
  expect(actOnCasinoBet).toHaveBeenCalledWith('request-id', saved.payload);
  act(() => card('King of hearts').click());
  expect(card('King of hearts')).toHaveAttribute('aria-pressed', 'false');
  await act(async () => finish(settled));
  expect(readPendingVideoPokerDraw(7)).toBeNull();
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Paid 9 TNB');
});

it('keeps the credit meter still until the drawn cards are on screen', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  let finish!: (bet: VideoPokerBet) => void;
  (actOnCasinoBet as jest.Mock).mockImplementation(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  await render();
  expect(meter('Credits')).toBe('2,000');
  act(() => button('Draw').click());
  // The wallet is told about the payout before the draw's own response arrives.
  mockBalance = 2009;
  await render();
  expect(meter('Credits')).toBe('2,000');
  expect(meter('Win')).toBe('0');
  await act(async () => finish(settled));
  expect(meter('Credits')).toBe('2,009');
  expect(meter('Win')).toBe('9');
});

it('retries a lost draw response after reload using the exact same action ID and held cards', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  (actOnCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network')).mockResolvedValueOnce(settled);
  await render();
  act(() => card('King of spades').click());
  await act(async () => button('Draw').click());
  const first = (actOnCasinoBet as jest.Mock).mock.calls[0];
  expect(container).toHaveTextContent('We could not confirm this draw');
  await remount();
  expect(button('Retry same draw')).toBeEnabled();
  expect(button('Draw')).toBeDisabled();
  await act(async () => button('Retry same draw').click());
  expect((actOnCasinoBet as jest.Mock).mock.calls[1]).toEqual(first);
  expect(readPendingVideoPokerDraw(7)).toBeNull();
  expect(createCasinoCommitment).not.toHaveBeenCalled();
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Full House');
});

it('drops a draw the server rejected and shows the hand as the server has it', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  (actOnCasinoBet as jest.Mock).mockRejectedValue({
    response: {status: 409, data: {code: 'hand_settled', detail: 'This hand is already settled.'}},
  });
  (getCasinoBet as jest.Mock).mockResolvedValue({...settled, settlement_reason: 'timeout'});
  await render();
  await act(async () => button('Draw').click());
  expect(readPendingVideoPokerDraw(7)).toBeNull();
  expect(container).toHaveTextContent('This hand is already settled.');
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Time ran out, so the dealt hand was kept');
  expect(button('Deal')).toBeEnabled();
});

it('retains an uncertain deal across reload and retries its original commitment', async () => {
  (placeCasinoBet as jest.Mock)
    .mockRejectedValueOnce(new Error('Network'))
    .mockImplementationOnce(async (data) => ({...openHand, request_id: data.request_id}));
  await render();
  await act(async () => button('Deal').click());
  const first = (placeCasinoBet as jest.Mock).mock.calls[0][0];
  expect(container).toHaveTextContent('We could not confirm the deal');
  expect(cardLabels()).toEqual(Array(5).fill('Face-down card'));
  await remount();
  expect(button('Deal')).toBeDisabled();
  await act(async () => button('Retry same bet').click());
  expect(placeCasinoBet).toHaveBeenNthCalledWith(2, first);
  expect(createCasinoCommitment).toHaveBeenCalledTimes(1);
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(button('Draw')).toBeEnabled();
});

it('clears a refused deal and points to the other game whose hand is still open', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {status: 409, data: {code: 'game_in_progress', detail: 'Finish the existing casino game first.'}},
  });
  await render();
  (getActiveCasinoBet as jest.Mock).mockResolvedValue({
    ...openHand,
    game: 'blackjack',
    id: 5,
    result: {multiplier: 0, player_cards: ['10S', '6D'], revision: 0},
  });
  await act(async () => button('Deal').click());
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(container.querySelector('a[href="/blackjack/home"]')).toHaveTextContent('Resume your Blackjack hand');
  expect(button('Deal')).toBeDisabled();
  expect(button('Retry same bet')).toBeUndefined();
  expect(cardLabels()).toEqual(Array(5).fill('Face-down card'));
});

it('links to another game whose hand was already open when the page loaded', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue({
    ...openHand,
    game: 'blackjack',
    result: {multiplier: 0, player_cards: ['10S', '6D'], revision: 0},
  });
  await render();
  expect(container.querySelector('a[href="/blackjack/home"]')).toHaveTextContent('Resume your Blackjack hand');
  expect(button('Deal')).toBeDisabled();
  expect(button('Draw')).toBeUndefined();
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('clears an older confirmed pending wager while preserving a newer active hand', async () => {
  savePendingCasinoBet(7, {payload, serverSeedHash: 'observed-hash'});
  (getActiveCasinoBet as jest.Mock).mockResolvedValue({...openHand, id: 2, request_id: 'newer-hand'});
  (getCasinoBet as jest.Mock).mockResolvedValue(settled);
  await render();
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(button('Draw')).toBeEnabled();
  await act(async () => button('Draw').click());
  expect(actOnCasinoBet).toHaveBeenCalledWith('newer-hand', expect.anything());
});

it('picks up a hand the server settled when its time ran out', async () => {
  jest.useFakeTimers();
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  (getCasinoBet as jest.Mock).mockResolvedValue({
    ...settled,
    payout: 3,
    profit: 2,
    settlement_reason: 'timeout',
    result: {
      ...settled.result,
      actions: ['draw:11111'],
      category: 'three_of_a_kind',
      hand: openHand.result.hand,
      held: [true, true, true, true, true],
      multiplier: 3,
    },
  });
  await render();
  expect(button('Draw')).toBeEnabled();
  await act(async () => jest.advanceTimersByTime(5000));
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Three of a Kind');
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Time ran out, so the dealt hand was kept');
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Paid 3 TNB');
  expect(button('Draw')).toBeUndefined();
  expect(button('Deal')).toBeEnabled();
});

it('does not let a stale poll restore the draw controls after a more recent settlement', async () => {
  jest.useFakeTimers();
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  let finishPoll!: (bet: VideoPokerBet) => void;
  (getCasinoBet as jest.Mock).mockImplementation(
    () =>
      new Promise((resolve) => {
        finishPoll = resolve;
      }),
  );
  await render();
  await act(async () => jest.advanceTimersByTime(5000));
  await act(async () => button('Draw').click());
  await act(async () => finishPoll(openHand));
  expect(container.querySelector('[aria-live]')).toHaveTextContent('Paid 9 TNB');
  expect(button('Draw')).toBeUndefined();
  expect(button('Deal')).toBeEnabled();
});

it('remounts account state and ignores a response from the previous member', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(openHand);
  let finishOld!: (bet: VideoPokerBet) => void;
  (actOnCasinoBet as jest.Mock).mockImplementation(
    () =>
      new Promise((resolve) => {
        finishOld = resolve;
      }),
  );
  await render();
  act(() => button('Draw').click());
  mockUserId = 8;
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(null);
  await render();
  await act(async () => finishOld(settled));
  expect(container).not.toHaveTextContent('Paid 9 TNB');
  expect(cardLabels()).toEqual(Array(5).fill('Face-down card'));
  expect(button('Deal')).toBeEnabled();
  expect(readPendingVideoPokerDraw(7)).not.toBeNull();
  expect(readPendingVideoPokerDraw(8)).toBeNull();
});

it('blocks wagering when recovery storage is corrupt', async () => {
  localStorage.setItem('casino.pending.video-poker.action:7', 'not-json');
  await render();
  expect(container).toHaveTextContent('Saved wager recovery is unavailable');
  expect(button('Reconnect')).toBeDisabled();
  expect(button('Deal')).toBeDisabled();
  expect(placeCasinoBet).not.toHaveBeenCalled();
});

it('requires a successful active-hand check before a fresh wager', async () => {
  (getActiveCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network')).mockResolvedValueOnce(null);
  await render();
  expect(button('Deal')).toBeDisabled();
  await act(async () => button('Reconnect').click());
  expect(button('Deal')).toBeEnabled();
});

it('lists settled hands with the cards that were held and verifies a receipt in the browser', async () => {
  localStorage.setItem('casino.commitments:7', JSON.stringify({'request-id': 'observed-hash'}));
  (getCasinoBets as jest.Mock).mockResolvedValue([
    {...lost, id: 3, request_id: 'lost-hand'},
    settled,
    {game: 'slots', id: 2, result: {multiplier: 0, symbols: ['cherry', 'lemon', 'bar']}, status: 'settled'},
  ]);
  await render();
  const history = container.querySelector('#video-poker-history-heading')!.parentElement!;
  const rows = Array.from(history.querySelectorAll('button[aria-pressed]'));
  expect(rows).toHaveLength(2);
  expect(rows[0]).toHaveTextContent('No win · 1 wagered');
  expect(rows[0]).toHaveTextContent('-1 TNB');
  expect(rows[1]).toHaveTextContent('K♠K♥2♠2♥K♦');
  expect(rows[1]).toHaveTextContent('Full House · 1 wagered');
  expect(rows[1]).toHaveTextContent('+8 TNB');
  await act(async () => (rows[1] as HTMLButtonElement).click());
  await act(async () => button('Verify this hand').click());
  expect(verifyVideoPokerReceipt).toHaveBeenCalledWith(settled, 'observed-hash');
  expect(history).toHaveTextContent('Verified hand');
  (verifyVideoPokerReceipt as jest.Mock).mockRejectedValue(new Error('The revealed seed does not match.'));
  await act(async () => button('Verify this hand').click());
  expect(history).toHaveTextContent('The revealed seed does not match.');
  // The last hand is not put back on the machine: the screen waits for a new bet.
  expect(cardLabels()).toEqual(Array(5).fill('Face-down card'));
});

it('lets the sound be switched on and remembers the choice', async () => {
  await render();
  const toggle = container.querySelector('button[aria-label="Turn sound on"]') as HTMLButtonElement;
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  act(() => toggle.click());
  expect(container.querySelector('button[aria-label="Turn sound off"]')).toHaveAttribute('aria-pressed', 'true');
  expect(localStorage.getItem('thenewboston.videoPoker.soundEnabled')).toBe('true');
});

it.each(['/casino/video-poker?from=bookmark#receipt', '/video-poker?from=bookmark#receipt'])(
  'redirects %s without losing URL context',
  async (path) => {
    await render(path);
    expect(container.querySelector('output')).toHaveTextContent('/video-poker/home?from=bookmark#receipt');
    expect(container.querySelector('h1')).toHaveTextContent('Video Poker');
  },
);
