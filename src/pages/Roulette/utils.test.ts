import {CasinoGame} from 'types/casino';

import {
  describeNumber,
  describeSpot,
  formatChip,
  getChipStyle,
  getPocketColor,
  getPocketIndex,
  getSpot,
  getSpotLimit,
  getStackHeight,
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
