import {CasinoBet} from 'types/casino';

import {
  actionToHolds,
  categoryName,
  coinRange,
  describeCard,
  describeWager,
  formatCountdown,
  holdsToAction,
  isRedCard,
  isVideoPokerBet,
  playableCoinValues,
} from './utils';

it('names cards and hands the way the machine announces them', () => {
  expect(describeCard('AS')).toBe('Ace of spades');
  expect(describeCard('10H')).toBe('10 of hearts');
  expect(describeCard('QD')).toBe('Queen of diamonds');
  expect(isRedCard('10H')).toBe(true);
  expect(isRedCard('KC')).toBe(false);
  expect(categoryName('four_of_a_kind')).toBe('Four of a Kind');
  expect(categoryName('nothing')).toBe('No win');
  expect(categoryName(undefined)).toBe('No win');
});

it('offers only coin values whose one to five coins fit the table limits', () => {
  expect(playableCoinValues(1, 4)).toEqual([1]);
  expect(coinRange(1, 1, 4)).toEqual({max: 4, min: 1});
  expect(playableCoinValues(1, 40)).toEqual([1, 5, 25]);
  expect(coinRange(25, 1, 40)).toEqual({max: 1, min: 1});
  expect(coinRange(5, 1, 40)).toEqual({max: 5, min: 1});
  expect(playableCoinValues(10, 12)).toEqual([5]);
  expect(coinRange(5, 10, 12)).toEqual({max: 2, min: 2});
  expect(coinRange(1, 10, 12)).toBeNull();
  expect(playableCoinValues(1, 0)).toEqual([]);
  expect(playableCoinValues(3, 3)).toEqual([1]);
});

it('reads any accepted wager back as coins, preferring the coin value in use', () => {
  expect(describeWager(4, 1)).toEqual({coins: 4, value: 1});
  expect(describeWager(5, 1)).toEqual({coins: 5, value: 1});
  expect(describeWager(5, 5)).toEqual({coins: 1, value: 5});
  expect(describeWager(20, 1)).toEqual({coins: 4, value: 5});
  expect(describeWager(7, 5)).toEqual({coins: 1, value: 7});
});

it('encodes the held cards from left to right and reads them back', () => {
  expect(holdsToAction([true, false, true, true, false])).toBe('draw:10110');
  expect(holdsToAction([false, false, false, false, false])).toBe('draw:00000');
  expect(actionToHolds('draw:10110')).toEqual([true, false, true, true, false]);
  expect(formatCountdown(900)).toBe('15:00');
  expect(formatCountdown(65)).toBe('1:05');
});

it('recognizes only complete Video Poker receipts', () => {
  const bet = {
    game: 'video_poker',
    result: {dealt: ['AS', 'KS', 'QS', 'JS', '10S'], hand: ['AS', 'KS', 'QS', 'JS', '10S'], revision: 0},
  } as CasinoBet;
  expect(isVideoPokerBet(bet)).toBe(true);
  expect(isVideoPokerBet({...bet, game: 'blackjack'})).toBe(false);
  expect(isVideoPokerBet({...bet, result: {...bet.result, hand: ['AS']}})).toBe(false);
  expect(isVideoPokerBet({...bet, result: {multiplier: 0}})).toBe(false);
  expect(isVideoPokerBet(null)).toBe(false);
});
