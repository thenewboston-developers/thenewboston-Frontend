import {CasinoBet} from 'types/casino';

import {
  addToSession,
  betChips,
  betSteps,
  buildReelColumns,
  describeBet,
  formatOdds,
  receiptLine,
  SLOT_SYMBOLS,
  SlotSymbolId,
  stepBet,
  winTier,
} from './utils';

const bet = (changes: Partial<CasinoBet>) =>
  ({
    amount: 1,
    game: 'slots',
    payout: 0,
    profit: -1,
    request_id: 'request',
    result: {draw: 1640, multiplier: 0, symbols: ['diamond', 'cherry', 'lemon']},
    status: 'settled',
    total_stake: 1,
    ...changes,
  }) as CasinoBet;

it('keeps the payline and never lets the decorative rows look like a win or a near miss', () => {
  SLOT_SYMBOLS.forEach((first) =>
    SLOT_SYMBOLS.forEach((second) =>
      SLOT_SYMBOLS.forEach((third) => {
        const line: SlotSymbolId[] = [first, second, third];
        const columns = buildReelColumns(line, `${first}-${second}-${third}`);
        expect(columns.map((column) => column[1])).toEqual(line);
        [0, 2].forEach((row) => expect(new Set(columns.map((column) => column[row])).size).toBe(3));
        columns.forEach(([above, payline, below]) => {
          expect(above).not.toBe(payline);
          expect(below).not.toBe(payline);
          expect(above).not.toBe(below);
        });
        expect(buildReelColumns(line, `${first}-${second}-${third}`)).toEqual(columns);
      }),
    ),
  );
});

it('offers bet steps and chips inside the current limits', () => {
  expect(betSteps(1, 10)).toEqual([1, 2, 5, 10]);
  expect(betChips(1, 10)).toEqual([1, 2, 5]);
  expect(betChips(1, 1000)).toEqual([100, 200, 500]);
  expect(betChips(1, 0)).toEqual([]);
  expect(stepBet(1, 1, 10, 1)).toBe(2);
  expect(stepBet(3, 1, 10, 1)).toBe(5);
  expect(stepBet(3, 1, 10, -1)).toBe(2);
  expect(stepBet(10, 1, 10, 1)).toBe(10);
  expect(stepBet(1, 1, 10, -1)).toBe(1);
  expect(stepBet(Number.NaN, 1, 10, 1)).toBe(1);
});

it('names win tiers and does not treat a returned stake as a win', () => {
  expect([0, 1, 2, 5, 10, 50, 100].map(winTier)).toEqual(['loss', 'push', 'win', 'nice', 'big', 'huge', 'jackpot']);
});

it('formats odds as one in N', () => {
  expect(formatOdds(0.0005)).toBe('1 in 2,000');
  expect(formatOdds(0.2)).toBe('1 in 5');
  expect(formatOdds(0.16)).toBe('1 in 6.3');
  expect(formatOdds(0)).toBe('—');
});

it('describes slots lines and roulette results, and only reads settled slots lines', () => {
  expect(describeBet(bet({}))).toBe('Diamond, Cherry, Lemon');
  expect(describeBet(bet({result: {draw: 8368, multiplier: 2, symbols: ['lemon', 'lemon', 'lemon']}}))).toBe(
    'Three lemons',
  );
  expect(describeBet(bet({game: 'roulette', result: {color: 'black', multiplier: 0, number: 17}}))).toBe(
    'Roulette 17 black',
  );
  expect(receiptLine(bet({status: 'open'}))).toBeNull();
  expect(receiptLine(bet({result: {multiplier: 0, symbols: ['cherry', 'star', 'bar']}}))).toBeNull();
  expect(addToSession({returned: 0, spins: 0, wagered: 0}, bet({payout: 2, total_stake: 1}))).toEqual({
    returned: 2,
    spins: 1,
    wagered: 1,
  });
});
