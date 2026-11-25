import {CasinoGame} from 'types/casino';

import {
  betsSelection,
  describeBets,
  describeNumber,
  describeSpot,
  formatChip,
  getBestReturn,
  getChipStyle,
  getExposure,
  getMovable,
  getPocketColor,
  getPocketIndex,
  getReturn,
  getRiskCapacity,
  getRoom,
  getSpot,
  getSpotLimit,
  getStackHeight,
  getTotal,
  selectionBets,
  selectionSpot,
  spotCovers,
  SPOTS,
  spotSelection,
  WHEEL_ORDER,
} from './utils';

const NUMBERS = Array.from({length: 37}, (_, number) => number);
// The casino's own list: a number painted the wrong color here would show a winning bet as lost
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

describe('the wheel', () => {
  it('holds every number from 0 to 36 exactly once, starting at zero', () => {
    expect([...WHEEL_ORDER].sort((a, b) => a - b)).toEqual(NUMBERS);
    expect(WHEEL_ORDER[0]).toBe(0);
    expect(getPocketIndex(26)).toBe(36);
  });

  it('colors the pockets as the casino settles them', () => {
    NUMBERS.forEach((number) => {
      let expected = RED_NUMBERS.includes(number) ? 'red' : 'black';
      if (number === 0) expected = 'green';
      expect(getPocketColor(number)).toBe(expected);
    });
  });

  it('alternates red and black all the way around', () => {
    for (let index = 1; index < WHEEL_ORDER.length - 1; index += 1) {
      expect(getPocketColor(WHEEL_ORDER[index])).not.toBe(getPocketColor(WHEEL_ORDER[index + 1]));
    }
  });
});

describe('the betting spots', () => {
  it('offers the 49 bets the casino accepts', () => {
    expect(SPOTS).toHaveLength(49);
    expect(new Set(SPOTS.map((spot) => spot.id)).size).toBe(49);
  });

  it('returns 36/37 of the stakes on every spot', () => {
    SPOTS.forEach((spot) => {
      const winners = NUMBERS.filter((number) => spotCovers(spot, number)).length;
      expect(winners * spot.multiplier).toBe(36);
    });
  });

  it('lets zero win only a straight-up bet on zero', () => {
    expect(SPOTS.filter((spot) => spotCovers(spot, 0)).map((spot) => spot.id)).toEqual(['number-0']);
  });

  it('settles dozens, columns and even-money bets like the casino', () => {
    expect(spotCovers(getSpot('dozen-2')!, 13)).toBe(true);
    expect(spotCovers(getSpot('dozen-2')!, 25)).toBe(false);
    expect(spotCovers(getSpot('column-3')!, 36)).toBe(true);
    expect(spotCovers(getSpot('column-1')!, 34)).toBe(true);
    expect(spotCovers(getSpot('column-2')!, 34)).toBe(false);
    expect(spotCovers(getSpot('low')!, 18)).toBe(true);
    expect(spotCovers(getSpot('high')!, 19)).toBe(true);
    expect(spotCovers(getSpot('odd')!, 35)).toBe(true);
    expect(spotCovers(getSpot('even')!, 36)).toBe(true);
    expect(spotCovers(getSpot('black')!, 26)).toBe(true);
  });

  it('sends the selection shape the casino API expects and reads it back', () => {
    expect(spotSelection(getSpot('red')!)).toEqual({type: 'red'});
    expect(spotSelection(getSpot('number-0')!)).toEqual({type: 'number', value: 0});
    expect(spotSelection(getSpot('column-2')!)).toEqual({type: 'column', value: 2});
    SPOTS.forEach((spot) => expect(selectionSpot(spotSelection(spot))).toBe(spot));
    expect(selectionSpot(undefined)).toBeUndefined();
    expect(selectionSpot({type: 'split', value: 3})).toBeUndefined();
  });

  it('reads each spot limit from its bet type', () => {
    const game = {
      bet_types: [
        {id: 'red', label: 'Red', max_bet: 1000, multiplier: 2},
        {id: 'number', label: 'Single number', max_bet: 28, multiplier: 36},
      ],
    } as CasinoGame;
    expect(getSpotLimit(game, getSpot('red'))).toBe(1000);
    expect(getSpotLimit(game, getSpot('number-17'))).toBe(28);
    expect(getSpotLimit(game, getSpot('dozen-1'))).toBe(0);
    expect(getSpotLimit(undefined, getSpot('red'))).toBe(0);
  });

  it('names spots and results for the table', () => {
    expect(describeSpot(getSpot('number-17')!)).toBe('17 straight up');
    expect(describeSpot(getSpot('dozen-2')!)).toBe('2nd dozen (13–24)');
    expect(describeNumber(0)).toBe('Green · Zero');
    expect(describeNumber(17)).toBe('Black · Odd · 1–18');
    expect(describeNumber(36)).toBe('Red · Even · 19–36');
  });
});

describe('chips', () => {
  it('never writes more on a chip than the stack holds', () => {
    expect(formatChip(1)).toBe('1');
    expect(formatChip(999)).toBe('999');
    expect(formatChip(1000)).toBe('1K');
    expect(formatChip(1500)).toBe('1.5K');
    expect(formatChip(1999)).toBe('1.9K');
    expect(formatChip(125000)).toBe('125K');
    expect(formatChip(2500000)).toBe('2.5M');
  });

  it('shows a stack in the color of its largest chip, a few chips tall at most', () => {
    expect(getChipStyle(4).value).toBe(1);
    expect(getChipStyle(30).value).toBe(25);
    expect(getChipStyle(250000).value).toBe(1000);
    expect(getStackHeight(1)).toBe(1);
    expect(getStackHeight(30)).toBe(2);
    expect(getStackHeight(4)).toBe(4);
    expect(getStackHeight(9999)).toBe(5);
  });
});

describe('a table with chips on several spots', () => {
  const table = {'number-17': 2, red: 10, 'dozen-2': 6, odd: 4, 'column-2': 3};

  it('pays the sum of the bets that win on a number, like the casino', () => {
    // 17 is black, odd, in the second dozen and the second column
    expect(getReturn(table, 17)).toBe(2 * 36 + 6 * 3 + 4 * 2 + 3 * 3);
    expect(getReturn(table, 14)).toBe(10 * 2 + 6 * 3 + 3 * 3);
    expect(getReturn(table, 0)).toBe(0);
    expect(getTotal(table)).toBe(25);
    expect(getBestReturn(table)).toBe(107);
    expect(getExposure(table)).toBe(82);
  });

  it('risks nothing on a table that covers itself', () => {
    expect(getExposure({black: 100, red: 100})).toBe(0);
    expect(getExposure(Object.fromEntries(NUMBERS.map((number) => [`number-${number}`, 1])))).toBe(0);
    expect(getExposure({})).toBe(0);
  });

  it('works out what the casino will risk on one spin the way the API does', () => {
    const fund = {available: 100000, balance: 100000, currency: 'TNB' as const, enabled: true, reserved: 0};
    expect(getRiskCapacity({...fund, risk_limit_bps: 100})).toBe(1000);
    expect(getRiskCapacity({...fund, available: 9999, risk_limit_bps: 1})).toBe(0);
    expect(getRiskCapacity({...fund, available: 123456789, risk_limit_bps: 250})).toBe(3086419);
    expect(getRiskCapacity({...fund, available: 9007199254740991, risk_limit_bps: 10000})).toBe(9007199254740991);
    expect(getRiskCapacity(undefined)).toBe(0);
  });

  it('gives a spot the room its own worst numbers leave', () => {
    expect(getRoom({}, getSpot('number-17')!, 1000)).toBe(28);
    expect(getRoom({}, getSpot('red')!, 1000)).toBe(1000);
    // 17 is black: chips on black add to what 17 costs, chips on red do not
    expect(getRoom({'number-17': 28}, getSpot('black')!, 1000)).toBe(20);
    expect(getRoom({'number-17': 28}, getSpot('red')!, 1000)).toBe(1028);
    expect(getRoom({'number-17': 28}, getSpot('number-17')!, 1000)).toBe(0);
    expect(getRoom({red: 5000}, getSpot('red')!, 1000)).toBe(0);
  });

  it('moves only as much of a stack as keeps the table within reach, counting the chips left behind', () => {
    // 8 is black, so 15 on it and 1,000 on red never win together: the table is within the 1,000 the casino risks
    const bets = {'number-8': 15, red: 1000};
    expect(getExposure(bets)).toBe(985);
    // 55 chips on 10 pay 1,980 against the 1,015 staked
    expect(getMovable(bets, getSpot('red')!, getSpot('number-10')!, 1000)).toBe(55);
    expect(getMovable(bets, getSpot('red')!, getSpot('odd')!, 1000)).toBe(1000);
    // Chips left on a spot that wins with the new one count too
    expect(getMovable({even: 1000}, getSpot('even')!, getSpot('number-8')!, 1000)).toBe(0);
    expect(getMovable({even: 10}, getSpot('even')!, getSpot('number-8')!, 1000)).toBe(10);
    NUMBERS.forEach((number) => {
      const target = `number-${number}`;
      const moved = getMovable(bets, getSpot('red')!, getSpot(target)!, 1000);
      const next: Record<string, number> = {...bets, red: 1000 - moved};
      next[target] = (next[target] ?? 0) + moved;
      expect(getExposure(next)).toBeLessThanOrEqual(1000);
      expect(getTotal(next)).toBe(1015);
    });
  });

  it('builds the selection each ruleset takes and reads receipts back into chips', () => {
    expect(betsSelection({red: 10, 'number-0': 2}, true)).toEqual({
      bets: [
        {amount: 10, type: 'red'},
        {amount: 2, type: 'number', value: 0},
      ],
    });
    expect(betsSelection({'dozen-3': 7}, false)).toEqual({type: 'dozen', value: 3});
    expect(betsSelection({}, true)).toBeUndefined();
    expect(
      selectionBets(
        {
          bets: [
            {amount: 4, type: 'column', value: 1},
            {amount: 6, type: 'odd'},
          ],
        },
        10,
      ),
    ).toEqual({
      'column-1': 4,
      odd: 6,
    });
    expect(selectionBets({type: 'number', value: 36}, 9)).toEqual({'number-36': 9});
    expect(selectionBets(undefined, 9)).toEqual({});
    expect(describeBets({red: 1})).toBe('Red');
    expect(describeBets({'number-5': 1, red: 1})).toBe('2 bets');
  });
});
