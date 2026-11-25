import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter, Route, Routes} from 'react-router-dom';

import {
  actOnCasinoBet,
  createCasinoCommitment,
  getActiveCasinoBet,
  getCasino,
  getCasinoBet,
  getCasinoBets,
  placeCasinoBet,
} from 'api/casino';
import {CasinoSummary, LetItRideBet} from 'types/casino';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';
import {PAYTABLE} from 'utils/letItRide';
import {verifyLetItRideReceipt} from 'utils/letItRideFairness';

import LetItRide from './index';
import {readPendingLetItRideAction, savePendingLetItRideAction} from './storage';
import {HINTS_STORAGE_KEY} from './Table';

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
jest.mock('utils/letItRideFairness', () => ({verifyLetItRideReceipt: jest.fn()}));
let mockAuthenticated = true;
let mockBalance = 2000;
const mockDispatch = jest.fn(() => Promise.resolve());
jest.mock('hooks', () => ({useIsAuthenticated: () => mockAuthenticated}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      self: {id: 7},
      wallets: {wallets: {1: {id: 1, balance: mockBalance, currency: {ticker: 'TNB'}, owner: 7}}},
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
const game = {
  available: true,
  bet_increment: 3,
  bets: 3,
  enabled: true,
  house_edge: 0.0106,
  house_edge_per_bet: 0.0319,
  id: 'let_it_ride' as const,
  max_bet: 9,
  max_multiplier: 101,
  min_bet: 3,
  name: 'Let It Ride',
  paytable: PAYTABLE.map(({hand, odds}) => ({hand, odds})),
  rules_version: 1,
  timeout_seconds: 600,
};
const summary: CasinoSummary = {can_manage: false, fund, games: [game]};
const commitment = {
  algorithm: 'hmac-sha256-v1',
  expires_at: '2030-01-01T12:00:00Z',
  id: 'commitment-id',
  server_seed_hash: 'observed-hash',
};
// A pair of tens from the deal, three of a kind on the last card
const dealt: LetItRideBet = {
  amount: 3,
  created_at: '2026-11-25T12:00:00Z',
  fairness: {
    algorithm: 'hmac-sha256-v1',
    client_seed: 'client',
    commitment_id: 'commitment-id',
    server_seed: '',
    server_seed_hash: 'observed-hash',
  },
  fund,
  game: 'let_it_ride',
  id: 1,
  payout: 0,
  profit: 0,
  request_id: 'request-id',
  result: {
    available_actions: ['ride', 'pull'],
    cards: ['TC', 'TD', '2H'],
    community: [null, null],
    decisions: [],
    expires_at: '2030-01-01T12:00:00Z',
    hand: null,
    multiplier: 0,
    odds: null,
    phase: 'first',
    revision: 0,
    riding: 3,
  },
  rules_version: 1,
  settled_at: '',
  settlement_reason: '',
  status: 'open',
  total_stake: 3,
  wallet_balance: 1997,
};
const turned: LetItRideBet = {
  ...dealt,
  result: {...dealt.result, community: ['3S', null], decisions: ['ride'], phase: 'second', revision: 1},
};
const won: LetItRideBet = {
  ...dealt,
  fairness: {...dealt.fairness, server_seed: 'ab'.repeat(32)},
  payout: 12,
  profit: 9,
  result: {
    ...dealt.result,
    available_actions: [],
    community: ['3S', 'TH'],
    decisions: ['ride', 'ride'],
    expires_at: null,
    hand: 'three_of_a_kind',
    odds: 3,
    phase: 'settled',
    revision: 2,
  },
  settled_at: '2026-11-25T12:01:00Z',
  settlement_reason: 'completed',
  status: 'settled',
  wallet_balance: 2009,
};
// Nothing in the cards: both optional bets pulled back, the third lost
const lost: LetItRideBet = {
  ...won,
  id: 2,
  payout: 2,
  profit: -1,
  request_id: 'lost-request',
  result: {
    ...won.result,
    cards: ['AS', '7D', '2H'],
    community: ['9C', '4H'],
    decisions: ['pull', 'pull'],
    hand: 'no_win',
    odds: 0,
    riding: 1,
  },
};

const button = (text: string) =>
  Array.from(container.querySelectorAll('button')).find((item) => item.textContent?.includes(text));
const cards = (group: string) =>
  Array.from(container.querySelectorAll(`[aria-label="${group}"] [role="img"]`)).map((card) =>
    card.getAttribute('aria-label'),
  );
const spot = (label: string) => container.querySelector(`[aria-label^="Bet ${label}:"]`)?.getAttribute('aria-label');
const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter
        future={{v7_relativeSplatPath: true, v7_startTransition: true}}
        initialEntries={['/let-it-ride/home']}
      >
        <Routes>
          <Route element={<LetItRide />} path="/let-it-ride/*" />
        </Routes>
      </MemoryRouter>,
    ),
  );
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  localStorage.clear();
  mockAuthenticated = true;
  mockBalance = 2000;
  mockDispatch.mockImplementation(() => Promise.resolve());
  (getCasino as jest.Mock).mockResolvedValue(summary);
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(null);
  (getCasinoBets as jest.Mock).mockResolvedValue([]);
  (createCasinoCommitment as jest.Mock).mockResolvedValue(commitment);
  (placeCasinoBet as jest.Mock).mockResolvedValue(dealt);
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: {randomUUID: jest.fn().mockReturnValueOnce('client-seed').mockReturnValueOnce('request-id')},
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it('shows a guest the table, the paytable and the rules without asking for a wager', async () => {
  mockAuthenticated = false;
  await render();
  expect(container.querySelector('h1')).toHaveTextContent('Let It Ride');
  expect(container).toHaveTextContent('Sign in to take a seat');
  expect(container).toHaveTextContent('Sign in to play');
  expect(button('Deal')).toBeUndefined();
  expect(cards('Your cards')).toEqual(['Face-down card', 'Face-down card', 'Face-down card']);
  expect(container).toHaveTextContent('Royal flush');
  expect(container).toHaveTextContent('100 to 1');
  expect(container).toHaveTextContent('When to let it ride');
  expect(container).toHaveTextContent('Sign in to view your hands.');
  expect(getActiveCasinoBet).not.toHaveBeenCalled();
  expect(getCasinoBets).not.toHaveBeenCalled();
});

it('deals three equal bets and keeps both community cards face down', async () => {
  await render();
  expect(container).toHaveTextContent('Table open');
  expect(button('Deal · 3 TNB')).toBeEnabled();
  await act(async () => button('Deal · 3 TNB')!.click());
  expect(placeCasinoBet).toHaveBeenCalledWith({
    amount: 3,
    client_seed: 'client-seed',
    commitment_id: 'commitment-id',
    game: 'let_it_ride',
    request_id: 'request-id',
    rules_version: 1,
  });
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(cards('Your cards')).toEqual(['ten of clubs', 'ten of diamonds', 'two of hearts']);
  expect(cards('Community cards')).toEqual(['Face-down card', 'Face-down card']);
  expect(container).toHaveTextContent('Pair of tens — it already pays');
  expect(container).toHaveTextContent('You have this');
  expect(spot('1')).toBe('Bet 1: Your call');
  expect(spot('3')).toBe('Bet 3: Always plays');
  expect(button('Let it ride')).toBeEnabled();
  expect(button('Pull back')).toBeEnabled();
  expect(button('Deal')).toBeUndefined();
});

it('turns a card after each decision and pays every riding bet at the end', async () => {
  (actOnCasinoBet as jest.Mock).mockResolvedValueOnce(turned).mockResolvedValueOnce(won);
  (globalThis.crypto.randomUUID as jest.Mock).mockReturnValueOnce('first-action').mockReturnValueOnce('second-action');
  await render();
  await act(async () => button('Deal · 3 TNB')!.click());
  await act(async () => button('Let it ride')!.click());
  expect(actOnCasinoBet).toHaveBeenNthCalledWith(1, 'request-id', {
    action: 'ride',
    action_id: 'first-action',
    expected_revision: 0,
  });
  expect(cards('Community cards')).toEqual(['three of spades', 'Face-down card']);
  expect(spot('1')).toBe('Bet 1: Riding');
  expect(spot('2')).toBe('Bet 2: Your call');
  expect(container.querySelector('[data-testid="let-it-ride-outcome"]')).toBeNull();
  await act(async () => button('Let it ride')!.click());
  expect(actOnCasinoBet).toHaveBeenNthCalledWith(2, 'request-id', {
    action: 'ride',
    action_id: 'second-action',
    expected_revision: 1,
  });
  expect(readPendingLetItRideAction(7)).toBeNull();
  expect(cards('Community cards')).toEqual(['three of spades', 'ten of hearts']);
  expect(container).toHaveTextContent('Three of a kind — you won 9 TNB');
  expect(container.querySelector('[data-testid="let-it-ride-outcome"]')).toHaveTextContent('12 TNB returned');
  expect(container).toHaveTextContent('Three of a kind pays 3 to 1 on 3 bets');
  expect(container).toHaveTextContent('Winner');
  expect(spot('2')).toBe('Bet 2: +3');
  // The finished hand joins the history, and the table is ready for the same bet again
  expect(container.querySelector('[aria-labelledby="let-it-ride-hands-heading"]')).toHaveTextContent('3 of 3 riding');
  expect(button('Deal again · 3 TNB')).toBeEnabled();
});

it('returns a pulled bet and says what a losing hand kept', async () => {
  const bust = {...lost, request_id: 'request-id'};
  const bustDealt = {...dealt, id: 2, result: {...dealt.result, cards: bust.result.cards}};
  const bustTurned = {
    ...bustDealt,
    result: {
      ...bustDealt.result,
      community: ['9C', null],
      decisions: ['pull'],
      phase: 'second',
      revision: 1,
      riding: 2,
    },
  } as LetItRideBet;
  (placeCasinoBet as jest.Mock).mockResolvedValue(bustDealt);
  (actOnCasinoBet as jest.Mock).mockResolvedValueOnce(bustTurned).mockResolvedValueOnce(bust);
  (globalThis.crypto.randomUUID as jest.Mock).mockReturnValueOnce('first-pull').mockReturnValueOnce('second-pull');
  await render();
  await act(async () => button('Deal · 3 TNB')!.click());
  expect(container).toHaveTextContent('Decide bet 1');
  await act(async () => button('Pull back')!.click());
  expect((actOnCasinoBet as jest.Mock).mock.calls[0][1]).toMatchObject({action: 'pull', expected_revision: 0});
  expect(spot('1')).toBe('Bet 1: Pulled back');
  await act(async () => button('Pull back')!.click());
  expect(container).toHaveTextContent('No paying hand — you kept 2 TNB');
  expect(container).toHaveTextContent('No paying hand · 1 bet lost, 2 bets pulled back');
  expect(spot('3')).toBe('Bet 3: Lost');
  expect(container).not.toHaveTextContent('Winner');
});

it('picks up an unfinished hand, and shows a hand that timed out as the casino finished it', async () => {
  jest.useFakeTimers();
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(turned);
  (getCasinoBet as jest.Mock).mockResolvedValue({...won, settlement_reason: 'timeout'});
  await render();
  expect(placeCasinoBet).not.toHaveBeenCalled();
  expect(cards('Community cards')).toEqual(['three of spades', 'Face-down card']);
  expect(spot('2')).toBe('Bet 2: Your call');
  expect(container).toHaveTextContent('Finishes on its own in');
  await act(async () => {
    jest.advanceTimersByTime(5000);
  });
  expect(getCasinoBet).toHaveBeenCalledWith('request-id');
  expect(container).toHaveTextContent('Three of a kind — you won 9 TNB');
  expect(container).toHaveTextContent('finished for you when the time ran out');
  expect(button('Let it ride')).toBeUndefined();
});

it('repeats an unconfirmed decision with the same ID instead of deciding again', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(dealt);
  (actOnCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network')).mockResolvedValueOnce(turned);
  (globalThis.crypto.randomUUID as jest.Mock).mockReset().mockReturnValueOnce('only-action');
  await render();
  await act(async () => button('Pull back')!.click());
  const saved = {action: 'pull', action_id: 'only-action', expected_revision: 0};
  expect(readPendingLetItRideAction(7)).toEqual({payload: saved, requestId: 'request-id'});
  expect(container).toHaveTextContent('Your decision to pull back is awaiting confirmation');
  expect(button('Let it ride')).toBeUndefined();
  await act(async () => button('Retry same decision')!.click());
  expect(actOnCasinoBet).toHaveBeenNthCalledWith(2, 'request-id', saved);
  expect(readPendingLetItRideAction(7)).toBeNull();
  expect(cards('Community cards')).toEqual(['three of spades', 'Face-down card']);
});

it('shows the hand as the casino has it when a saved decision is refused', async () => {
  savePendingLetItRideAction(7, {
    payload: {action: 'ride', action_id: 'stale-action', expected_revision: 0},
    requestId: 'request-id',
  });
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(turned);
  (actOnCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {status: 409, data: {code: 'revision_conflict', detail: 'This hand has changed. Refresh before acting.'}},
  });
  (getCasinoBet as jest.Mock).mockResolvedValue(turned);
  await render();
  await act(async () => button('Retry same decision')!.click());
  expect(readPendingLetItRideAction(7)).toBeNull();
  expect(container.querySelector('[role="alert"]')).toHaveTextContent('the table now shows it as the casino has it');
  expect(button('Let it ride')).toBeEnabled();
  expect(spot('2')).toBe('Bet 2: Your call');
});

it('retries an unconfirmed deal with the same request instead of betting twice', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce(new Error('Network')).mockResolvedValueOnce(dealt);
  await render();
  await act(async () => button('Deal · 3 TNB')!.click());
  const payload = readPendingCasinoBet(7)?.payload;
  expect(payload).toMatchObject({amount: 3, game: 'let_it_ride', request_id: 'request-id'});
  expect(container).toHaveTextContent('Your 3 TNB Let It Ride wager is awaiting confirmation');
  await act(async () => button('Retry same bet')!.click());
  expect(placeCasinoBet).toHaveBeenNthCalledWith(2, payload);
  expect(createCasinoCommitment).toHaveBeenCalledTimes(1);
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(cards('Your cards')).toEqual(['ten of clubs', 'ten of diamonds', 'two of hearts']);
});

it('points to another casino game whose hand is still open', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue({
    ...dealt,
    game: 'blackjack',
    result: {available_actions: ['hit'], multiplier: 0, phase: 'player_turn', player_cards: ['10S', '6D'], revision: 0},
  });
  await render();
  expect(container.querySelector('a[href="/blackjack/home"]')).toHaveTextContent('Finish your Blackjack hand');
  expect(button('Deal')).toBeUndefined();
  expect(cards('Your cards')).toEqual(['Face-down card', 'Face-down card', 'Face-down card']);
});

it('clears a deal the casino refused because another game is open, and points to that game', async () => {
  (placeCasinoBet as jest.Mock).mockRejectedValueOnce({
    response: {status: 409, data: {code: 'game_in_progress', detail: 'Finish the existing casino game first.'}},
  });
  (getActiveCasinoBet as jest.Mock)
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce({...dealt, game: 'blackjack', result: {multiplier: 0}});
  await render();
  await act(async () => button('Deal · 3 TNB')!.click());
  expect(readPendingCasinoBet(7)).toBeNull();
  expect(button('Retry same bet')).toBeUndefined();
  expect(container.querySelector('a[href="/blackjack/home"]')).toHaveTextContent('Finish your Blackjack hand');
});

it('keeps each bet inside the table limits and the wallet', async () => {
  await render();
  expect(container).toHaveTextContent('Limit 1 to 3 TNB a bet');
  expect(button('Lower each bet') ?? container.querySelector('[aria-label="Lower each bet"]')).toBeDisabled();
  await act(async () => (container.querySelector('[aria-label="Raise each bet"]') as HTMLButtonElement).click());
  expect(button('Deal · 6 TNB')).toBeEnabled();
  await act(async () => button('Max')!.click());
  expect(button('Deal · 9 TNB')).toBeEnabled();
  expect(container.querySelector('[aria-label="Raise each bet"]')).toBeDisabled();
  expect(container.querySelector('[aria-label="Bet 5 TNB on each spot"]')).toBeNull();
  await act(async () =>
    (container.querySelector('[aria-label="Bet 2 TNB on each spot"]') as HTMLButtonElement).click(),
  );
  await act(async () => button('Deal · 6 TNB')!.click());
  expect((placeCasinoBet as jest.Mock).mock.calls[0][0]).toMatchObject({amount: 6});
});

it('starts from the size of the last hand and will not deal more than the wallet holds', async () => {
  (getCasinoBets as jest.Mock).mockResolvedValue([{...won, amount: 6, total_stake: 6}]);
  mockBalance = 5;
  await render();
  expect(button('Deal · 6 TNB')).toBeDisabled();
  expect(container).toHaveTextContent('does not have enough coins for three bets this size');
  await act(async () => (container.querySelector('[aria-label="Lower each bet"]') as HTMLButtonElement).click());
  expect(button('Deal · 3 TNB')).toBeEnabled();
});

it.each([
  ['a closed casino', {...summary, fund: {...fund, enabled: false}}, 'The casino is closed to new wagers.'],
  ['a closed table', {...summary, games: [{...game, enabled: false}]}, 'Let It Ride is currently closed.'],
  [
    'a fund too small for the minimum',
    {...summary, games: [{...game, max_bet: 0}]},
    'cannot cover the minimum bets right now',
  ],
  ['newer rules', {...summary, games: [{...game, rules_version: 2}]}, 'This table has updated rules.'],
  [
    'a different paytable',
    {...summary, games: [{...game, paytable: [{hand: 'royal_flush', odds: 1000}, ...game.paytable.slice(1)]}]},
    'This table has updated rules.',
  ],
])('does not deal at %s', async (_, data, message) => {
  (getCasino as jest.Mock).mockResolvedValue(data);
  await render();
  expect(container).toHaveTextContent(message);
  expect(button('Deal')).toBeDisabled();
});

it('points out the best play only when hints are on, and remembers the choice', async () => {
  (getActiveCasinoBet as jest.Mock).mockResolvedValue({
    ...dealt,
    result: {...dealt.result, cards: ['7S', '8D', 'KH']},
  });
  await render();
  expect(container).not.toHaveTextContent('Best play');
  const toggle = container.querySelector('[aria-label="Best-play hints"]') as HTMLButtonElement;
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await act(async () => toggle.click());
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(container).toHaveTextContent('Best play: pull back.');
  expect(localStorage.getItem(HINTS_STORAGE_KEY)).toBe('true');
  act(() => root.unmount());
  root = createRoot(container);
  (getActiveCasinoBet as jest.Mock).mockResolvedValue(dealt);
  await render();
  expect(container).toHaveTextContent('Best play: let it ride — this hand already pays and cannot lose.');
});

it('verifies a finished hand against the commitment seen before the bet', async () => {
  (getCasinoBets as jest.Mock).mockResolvedValue([won, lost]);
  (verifyLetItRideReceipt as jest.Mock).mockResolvedValue('Verified hand');
  savePendingCasinoBet(7, {
    payload: {
      amount: 3,
      client_seed: 'client',
      commitment_id: 'commitment-id',
      game: 'let_it_ride',
      request_id: 'request-id',
      rules_version: 1,
    },
    serverSeedHash: 'observed-hash',
  });
  (getCasinoBet as jest.Mock).mockResolvedValue(won);
  await render();
  const history = container.querySelector('[aria-labelledby="let-it-ride-hands-heading"]')!;
  expect(history).toHaveTextContent('10♣10♦2♥3♠10♥');
  expect(history).toHaveTextContent('No paying hand');
  const receipts = Array.from(history.querySelectorAll('button')).filter((item) => item.textContent === 'Receipt');
  expect(receipts).toHaveLength(2);
  await act(async () => receipts[1].click());
  expect(history).toHaveTextContent('Bet 1: let it ride · Bet 2: let it ride');
  await act(async () => button('Verify this hand')!.click());
  expect(verifyLetItRideReceipt).toHaveBeenCalledWith(won, 'observed-hash');
  expect(history.querySelector('[role="status"]')).toHaveTextContent('Verified hand');
});
