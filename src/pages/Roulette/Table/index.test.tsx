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
      multiple_bets: true,
      name: 'Roulette',
      rules_version: 2,
    },
  ],
};
// A casino still on Roulette rules version 1: one spot per spin
const legacySummary: CasinoSummary = {
  ...summary,
  games: summary.games.map((game) =>
    game.id === 'roulette' ? {...game, multiple_bets: undefined, rules_version: 1} : game,
  ),
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
  result: {color: 'red', number: 23, payout: 10} as CasinoBet['result'],
  rules_version: 2,
  selection: {bets: [{amount: 5, type: 'red'}]},
  settled_at: '2026-11-25T12:00:00Z',
  status: 'settled',
  total_stake: 5,
  wallet_balance: 200005,
};
// The same win as rules version 1 recorded it
const legacySettled: CasinoBet = {
  ...settled,
  result: {color: 'red', multiplier: 2, number: 23},
  rules_version: 1,
  selection: {type: 'red'},
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
  ...legacySettled,
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
// A button of the chip rail by its exact label ("2×" is also part of every even-money spot's text)
const rail = (label: string) =>
  Array.from(container.querySelectorAll('button')).find((element) => element.textContent === label)!;
const spot = (id: string) => container.querySelector(`[data-spot="${id}"]`) as HTMLButtonElement;
const clickSpot = (id: string) => act(() => spot(id).click());
const pickChip = (value: number) =>
  act(() =>
    (container.querySelector(`[aria-label="${value.toLocaleString()} TNB chip"]`) as HTMLButtonElement).click(),
  );
const placed = () =>
  Object.fromEntries(
    Array.from(container.querySelectorAll('[data-spot][aria-pressed="true"]')).map((element) => [
      (element as HTMLElement).dataset.spot,
      Number(/, ([\d,]+) TNB placed/.exec(element.getAttribute('aria-label')!)![1].replace(/,/g, '')),
    ]),
  );
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
const stack = () => (container.querySelector('#roulette-bet-amount') as HTMLInputElement).value;
const type = (value: string) => {
  const input = container.querySelector('#roulette-bet-amount') as HTMLInputElement;
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
  act(() => {
    input.dispatchEvent(new Event('input', {bubbles: true}));
  });
};

// A mouse drag as the page sees it: a press on the chips, travel past the click threshold, and a release over `to`
const release = (from: Element, to: Element | null) => {
  const pointer = (name: string, x: number) => new MouseEvent(name, {bubbles: true, button: 0, clientX: x, clientY: 0});
  document.elementFromPoint = jest.fn(() => to);
  act(() => {
    from.dispatchEvent(pointer('pointerdown', 0));
  });
  act(() => {
    window.dispatchEvent(pointer('pointermove', 40));
  });
  act(() => {
    window.dispatchEvent(pointer('pointerup', 40));
  });
};
// The same drag once the browser has moved on from the release, as it has before any later click
const drag = async (from: Element, to: Element | null) => {
  release(from, to);
  await act(async () => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
  });
};

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

describe('a table that settles several bets in one spin', () => {
  it('stacks chips on as many spots as the player taps', async () => {
    await render();
    expect(button('Spin')).toBeDisabled();
    expect(container).toHaveTextContent('Place a chip on the table to play.');
    clickSpot('red');
    clickSpot('number-17');
    clickSpot('red');
    pickChip(25);
    clickSpot('dozen-2');
    expect(placed()).toEqual({'dozen-2': 25, 'number-17': 5, red: 10});
    expect(container).toHaveTextContent('3 bets · 40 TNB');
    expect(button('Spin · 40 TNB')).toBeEnabled();
    // 17 is black and in the second dozen: 5 x 36 + 25 x 3
    expect(container).toHaveTextContent('Your best number returns 255 TNB');
    expect(placeCasinoBet).not.toHaveBeenCalled();
  });

  it('edits the stack that was touched last, takes chips off, and steps back with Undo', async () => {
    await render();
    clickSpot('red');
    clickSpot('black');
    expect(stack()).toBe('5');
    act(() => rail('+').click());
    expect(placed()).toEqual({black: 10, red: 5});
    type('37');
    expect(placed()).toEqual({black: 37, red: 5});
    act(() => spot('red').dispatchEvent(new MouseEvent('contextmenu', {bubbles: true, cancelable: true})));
    expect(placed()).toEqual({black: 37});
    act(() => rail('Undo').click());
    expect(placed()).toEqual({black: 37, red: 5});
    act(() => rail('2×').click());
    expect(placed()).toEqual({black: 74, red: 10});
    act(() => rail('½').click());
    expect(placed()).toEqual({black: 37, red: 5});
    act(() => rail('Clear').click());
    expect(placed()).toEqual({});
    expect(button('Spin')).toBeDisabled();
    act(() => rail('Undo').click());
    expect(placed()).toEqual({black: 37, red: 5});
  });

  it('limits the table by its worst number, not bet by bet', async () => {
    // 100,000 TNB at a 1% risk limit: one spin may cost the casino 1,000 TNB
    await render();
    pickChip(100);
    clickSpot('number-17');
    expect(placed()).toEqual({'number-17': 28});
    expect(container).toHaveTextContent('17 straight up takes up to 28 TNB right now.');
    // 17 is black, so chips on black add to what 17 would cost: only 20 more fit
    pickChip(25);
    clickSpot('black');
    expect(placed()).toEqual({black: 20, 'number-17': 28});
    expect(container).toHaveTextContent('Black takes up to 20 TNB right now.');
    // Red can never win together with 17, so it has its whole limit left
    pickChip(1000);
    clickSpot('red');
    expect(placed()).toEqual({black: 20, 'number-17': 28, red: 1000});
    act(() => rail('2×').click());
    expect(container).toHaveTextContent('Doubling these bets would pass your wallet or the table limit.');
    expect(placed()).toEqual({black: 20, 'number-17': 28, red: 1000});
    expect(button('Spin · 1,048 TNB')).toBeEnabled();
  });

  it('never lets the chips on the table exceed the wallet', async () => {
    mockBalance = 12;
    await render();
    clickSpot('black');
    clickSpot('red');
    clickSpot('odd');
    expect(placed()).toEqual({black: 5, odd: 2, red: 5});
    expect(container).toHaveTextContent('That is all 12 TNB in your wallet.');
    clickSpot('even');
    expect(placed()).toEqual({black: 5, odd: 2, red: 5});
    expect(button('Spin · 12 TNB')).toBeEnabled();
  });

  it('refuses chips the casino fund cannot cover at all', async () => {
    (getCasino as jest.Mock).mockResolvedValue({...summary, fund: {...fund, available: 50}});
    await render();
    clickSpot('red');
    expect(placed()).toEqual({});
    expect(container).toHaveTextContent('The casino fund cannot cover a bet on Red right now.');
    expect(button('Spin')).toBeDisabled();
    expect(container.textContent).not.toMatch(/practice/i);
  });

  it('sends every stack with its own stake and shows the result once the ball has landed', async () => {
    mockHoldBall = true;
    (placeCasinoBet as jest.Mock).mockResolvedValue({
      ...settled,
      amount: 20,
      payout: 20,
      profit: 0,
      result: {color: 'red', number: 23, payout: 20},
      selection: {
        bets: [
          {amount: 10, type: 'red'},
          {amount: 5, type: 'black'},
          {amount: 5, type: 'number', value: 17},
        ],
      },
      total_stake: 20,
      wallet_balance: 200000,
    });
    await render();
    clickSpot('number-17');
    clickSpot('red');
    clickSpot('red');
    clickSpot('black');
    await act(async () => button('Spin · 20 TNB').click());
    expect(placeCasinoBet).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 20,
        game: 'roulette',
        rules_version: 2,
        selection: {
          bets: [
            {amount: 5, type: 'number', value: 17},
            {amount: 10, type: 'red'},
            {amount: 5, type: 'black'},
          ],
        },
      }),
    );
    expect(mockThrowBall).toHaveBeenCalledWith(23);
    // The wager is already settled, but nothing gives the result away while the ball is rolling
    expect(container).toHaveTextContent('No more bets');
    expect(result()).toHaveTextContent('?');
    expect(container).not.toHaveTextContent('you won');
    expect(container).toHaveTextContent('Your settled bets will appear here.');
    expect(spot('red')).toBeDisabled();
    expect(container.querySelector('[aria-label^="Wallet balance"]')).toHaveTextContent('199,980');
    expect(container.querySelector('[aria-label="Your recent results"]')).not.toHaveTextContent('23');
    await act(async () => mockLandBall!());
    expect(result()).toHaveTextContent('23');
    expect(result()).toHaveTextContent('Red · Odd · 19–36');
    expect(result()).toHaveTextContent('20 TNB returned');
    expect(container).toHaveTextContent('23 Red — you won 20 TNB');
    expect(container.querySelector('[data-testid="wheel"]')).toHaveAttribute('data-winning', '23');
    // Each stack shows its own fate: only red was paid
    expect(spot('red')).toHaveTextContent('+20');
    expect(spot('black')).not.toHaveTextContent('+');
    expect(spot('number-17')).not.toHaveTextContent('+');
    expect(container.querySelector('[aria-label="Your recent results"]')).toHaveTextContent('23');
    expect(container.querySelector('[aria-labelledby="roulette-spins-heading"] tbody tr')).toHaveTextContent('3 bets');
    expect(readPendingCasinoBet(7)).toBeNull();
    // The chips stay down for the next spin
    expect(placed()).toEqual({black: 5, 'number-17': 5, red: 10});
    expect(button('Spin · 20 TNB')).toBeEnabled();
  });

  it('shows a losing spin without a payout', async () => {
    (placeCasinoBet as jest.Mock).mockResolvedValue({
      ...settled,
      payout: 0,
      profit: -5,
      result: {color: 'black', number: 8, payout: 0},
      selection: {bets: [{amount: 5, type: 'number', value: 0}]},
      wallet_balance: 199995,
    });
    await render();
    clickSpot('number-0');
    await act(async () => button('Spin · 5 TNB').click());
    expect(placeCasinoBet).toHaveBeenCalledWith(
      expect.objectContaining({selection: {bets: [{amount: 5, type: 'number', value: 0}]}}),
    );
    expect(container).toHaveTextContent('8 Black — no win this spin');
    expect(result()).toHaveTextContent('No payout this round');
  });

  it('drags a chip from the rack onto a spot', async () => {
    await render();
    await drag(container.querySelector('[aria-label="100 TNB chip"]')!, spot('red'));
    expect(placed()).toEqual({red: 100});
    // The chip that was dragged becomes the one in hand
    expect(container.querySelector('[role="radio"][aria-checked="true"]')).toHaveAttribute(
      'aria-label',
      '100 TNB chip',
    );
    await drag(container.querySelector('[aria-label="25 TNB chip"]')!, spot('red'));
    expect(placed()).toEqual({red: 125});
    // Let go anywhere else and nothing is placed
    await drag(container.querySelector('[aria-label="25 TNB chip"]')!, null);
    expect(placed()).toEqual({red: 125});
  });

  it('drags a stack to another spot, onto another stack, and off the table', async () => {
    await render();
    clickSpot('red');
    clickSpot('red');
    clickSpot('black');
    await drag(spot('red'), spot('number-8'));
    expect(placed()).toEqual({black: 5, 'number-8': 10});
    await drag(spot('black'), spot('number-8'));
    expect(placed()).toEqual({'number-8': 15});
    // Only as much as the table can cover moves; the rest stays where it was. 55 on 10 pays 1,980 against the 1,015
    // staked, which is about the most the casino will risk.
    pickChip(1000);
    clickSpot('red');
    await drag(spot('red'), spot('number-10'));
    expect(placed()).toEqual({'number-10': 55, 'number-8': 15, red: 945});
    expect(container).toHaveTextContent('Only 55 TNB could move to 10 straight up. The rest stayed on Red.');
    expect(button('Spin · 1,015 TNB')).toBeEnabled();
    // Chips left on a spot that wins with the new one count too: with 1,000 on even, nothing more fits on 8
    act(() => rail('Clear').click());
    clickSpot('even');
    await drag(spot('even'), spot('number-8'));
    expect(placed()).toEqual({even: 1000});
    expect(container).toHaveTextContent('8 straight up cannot take those chips right now.');
    await drag(spot('even'), null);
    expect(placed()).toEqual({});
    expect(container).toHaveTextContent('Chips taken off Even.');
    act(() => rail('Undo').click());
    expect(placed()).toEqual({even: 1000});
  });

  it('does not read the click that ends a drag as a tap, and leaves touches to tapping', async () => {
    await render();
    clickSpot('red');
    // Picked up and put back on its own spot: the browser still sends a click
    release(spot('red'), spot('red'));
    act(() => spot('red').click());
    expect(placed()).toEqual({red: 5});
    await act(async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 0);
      });
    });
    clickSpot('red');
    expect(placed()).toEqual({red: 10});
    // A finger pressing a chip scrolls or taps; it never drags
    document.elementFromPoint = jest.fn(() => spot('black'));
    const touch = new MouseEvent('pointerdown', {bubbles: true, button: 0});
    Object.defineProperty(touch, 'pointerType', {value: 'touch'});
    act(() => {
      spot('red').dispatchEvent(touch);
    });
    act(() => {
      window.dispatchEvent(new MouseEvent('pointermove', {clientX: 60}));
      window.dispatchEvent(new MouseEvent('pointerup', {clientX: 60}));
    });
    expect(placed()).toEqual({red: 10});
  });

  it('puts the chips of a bet that settled while the page was closed back on the table', async () => {
    savePendingCasinoBet(7, {
      payload: {...slotsPayload, amount: 15, game: 'roulette', selection: {bets: [{amount: 15, type: 'red'}]}},
      serverSeedHash: commitment.server_seed_hash,
    });
    (getCasinoBet as jest.Mock).mockResolvedValueOnce({
      ...settled,
      amount: 15,
      payout: 20,
      result: {color: 'red', number: 23, payout: 20},
      selection: {
        bets: [
          {amount: 10, type: 'red'},
          {amount: 5, type: 'dozen', value: 1},
        ],
      },
      total_stake: 15,
    });
    await render();
    expect(placeCasinoBet).not.toHaveBeenCalled();
    expect(readPendingCasinoBet(7)).toBeNull();
    expect(mockRest).toHaveBeenCalledWith(23);
    expect(mockThrowBall).not.toHaveBeenCalled();
    expect(result()).toHaveTextContent('20 TNB returned');
    expect(placed()).toEqual({'dozen-1': 5, red: 10});
  });

  it('lists settled roulette bets only, and repeats the last table', async () => {
    (getCasinoBets as jest.Mock).mockResolvedValue([
      {...settled, request_id: 'open', result: {}, settled_at: null, status: 'open'},
      {
        ...settled,
        amount: 45,
        request_id: 'table',
        selection: {
          bets: [
            {amount: 40, type: 'dozen', value: 2},
            {amount: 5, type: 'number', value: 23},
          ],
        },
      },
      {...legacySettled, request_id: 'single'},
      {...slotsBet, request_id: 'slots'},
    ]);
    await render();
    const rows = container.querySelectorAll('[aria-labelledby="roulette-spins-heading"] tbody tr');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent('2 bets');
    expect(rows[1]).toHaveTextContent('Red');
    act(() => button('Receipt').click());
    const bets = container.querySelector('[aria-label="Bets on this spin"]');
    expect(bets).toHaveTextContent('2nd dozen (13–24)40 TNBreturned 120');
    expect(bets).toHaveTextContent('23 straight up5 TNBreturned 180');
    act(() => button('Repeat last bet').click());
    expect(placed()).toEqual({'dozen-2': 40, 'number-23': 5});
    expect(placeCasinoBet).not.toHaveBeenCalled();
  });
});

describe('a table on rules version 1, which settles one spot per spin', () => {
  beforeEach(() => {
    (getCasino as jest.Mock).mockResolvedValue(legacySummary);
    (placeCasinoBet as jest.Mock).mockResolvedValue(legacySettled);
  });

  it('moves the chips when another spot is tapped, and applies each spot limit', async () => {
    await render();
    clickSpot('red');
    expect(stack()).toBe('5');
    expect(container).toHaveTextContent('Minimum 1 · Maximum 1,000 TNB');
    clickSpot('red');
    expect(button('Spin · 10 TNB')).toBeEnabled();
    expect(container).toHaveTextContent('Returns 20 TNB if Red hits');
    clickSpot('number-17');
    expect(placed()).toEqual({'number-17': 10});
    expect(container).toHaveTextContent('One bet per spin: your chips moved to 17 straight up.');
    expect(container).toHaveTextContent('Minimum 1 · Maximum 28 TNB');
    type('999');
    expect(placed()).toEqual({'number-17': 28});
    expect(container).toHaveTextContent('17 straight up takes up to 28 TNB right now.');
    await drag(spot('number-17'), spot('black'));
    expect(placed()).toEqual({black: 28});
  });

  it('submits the single spot the way version 1 expects it', async () => {
    await render();
    clickSpot('number-0');
    await act(async () => button('Spin · 5 TNB').click());
    expect(placeCasinoBet).toHaveBeenCalledWith(
      expect.objectContaining({amount: 5, rules_version: 1, selection: {type: 'number', value: 0}}),
    );
    expect(container).toHaveTextContent('23 Red — you won 10 TNB');
  });

  it('blocks unfunded betting, and never offers practice play', async () => {
    (getCasino as jest.Mock).mockResolvedValue({
      ...legacySummary,
      games: legacySummary.games.map((game) => ({
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
  expect(spot('black')).toBeDisabled();
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

it('shows admin funding controls but never deposits the prefilled amount on its own', async () => {
  (getCasino as jest.Mock).mockResolvedValue({...summary, can_manage: true});
  await render();
  expect(container).toHaveTextContent('Manage casino funds');
  expect(moveCasinoFunds).not.toHaveBeenCalled();
});
