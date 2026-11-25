import {BlackjackBet} from 'types/casino';

import {
  describeCard,
  formatHandValue,
  getChips,
  getHandValue,
  getOutcomeCopy,
  getRack,
  getSessionNet,
  isNatural,
  toEven,
} from './utils';

const hand = (result: Partial<BlackjackBet['result']>, money: Partial<BlackjackBet> = {}) =>
  ({
    amount: 10,
    payout: 0,
    profit: -10,
    total_stake: 10,
    ...money,
    result: {dealer_cards: ['10S', '8D'], dealer_total: 18, player_cards: ['10H', '7C'], player_total: 17, ...result},
  }) as BlackjackBet;

describe('hand values', () => {
  it('counts an ace as 11 until that would bust the hand', () => {
    expect(getHandValue(['AS', '6H'])).toEqual({soft: true, total: 17});
    expect(getHandValue(['AS', '6H', '9D'])).toEqual({soft: false, total: 16});
    expect(getHandValue(['AS', 'AH', '9D'])).toEqual({soft: true, total: 21});
    expect(getHandValue(['KS', 'QH', '5D'])).toEqual({soft: false, total: 25});
  });

  it('ignores the dealer card that is still face down', () => {
    expect(getHandValue(['9C', null])).toEqual({soft: false, total: 9});
    expect(formatHandValue(['AC', null], false)).toBe('1/11');
    expect(formatHandValue([null], false)).toBe('');
  });

  it('shows both values of a soft hand only while it can still change', () => {
    expect(formatHandValue(['AS', '6H'], false)).toBe('7/17');
    expect(formatHandValue(['AS', '6H'], true)).toBe('17');
    expect(formatHandValue(['AS', 'KH'], false)).toBe('21');
    expect(formatHandValue(['10S', '6H'], false)).toBe('16');
  });

  it('recognizes a blackjack only on the first two cards', () => {
    expect(isNatural(['AS', 'KH'])).toBe(true);
    expect(isNatural(['7S', '7H', '7D'])).toBe(false);
    expect(isNatural(['AS', null])).toBe(false);
  });
});

describe('chips', () => {
  it('stacks a wager from its largest chips down', () => {
    expect(getChips(10)).toEqual([10]);
    expect(getChips(64)).toEqual([50, 10, 2, 2]);
    expect(getChips(1612)).toEqual([1000, 500, 100, 10, 2]);
  });

  it('pays the odd coin of a 3 to 2 payout with the pink 1', () => {
    expect(getChips(15)).toEqual([10, 2, 2, 1]);
    expect(getChips(3)).toEqual([2, 1]);
  });

  it('keeps a tall stack to its largest chips', () => {
    expect(getChips(498)).toEqual([100, 100, 100, 100, 50, 10, 10, 10, 10]);
    expect(getChips(0)).toEqual([]);
  });

  it('offers every denomination the table limit has room for', () => {
    expect(getRack(498)).toEqual([2, 10, 50, 100]);
    expect(getRack(500)).toEqual([2, 10, 50, 100, 500]);
    expect(getRack(4000)).toEqual([2, 10, 50, 100, 500, 1000]);
    expect(getRack(0)).toEqual([2, 10, 50, 100]);
  });

  it('rounds a wager down to an even amount', () => {
    expect(toEven(11)).toBe(10);
    expect(toEven(2.9)).toBe(2);
    expect(toEven(-4)).toBe(0);
  });
});

describe('outcomes', () => {
  it('names each way a hand can end', () => {
    expect(getOutcomeCopy(hand({outcome: 'blackjack', player_cards: ['AS', 'KH'], player_total: 21}))).toMatchObject({
      title: 'Blackjack!',
      tone: 'blackjack',
    });
    expect(getOutcomeCopy(hand({dealer_total: 23, outcome: 'win'}))).toEqual({
      detail: 'Dealer busts with 23',
      title: 'You win',
      tone: 'win',
    });
    expect(getOutcomeCopy(hand({outcome: 'win', player_total: 20})).detail).toBe("Your 20 beats the dealer's 18");
    expect(getOutcomeCopy(hand({dealer_total: 17, outcome: 'push'}))).toEqual({
      detail: 'Both hands have 17',
      title: 'Push',
      tone: 'push',
    });
    expect(getOutcomeCopy(hand({outcome: 'loss', player_total: 24}))).toMatchObject({title: 'Bust', tone: 'loss'});
    expect(getOutcomeCopy(hand({dealer_cards: ['AS', 'KD'], dealer_total: 21, outcome: 'loss'})).detail).toBe(
      'The dealer has blackjack',
    );
    expect(getOutcomeCopy(hand({outcome: 'loss'})).detail).toBe("The dealer's 18 beats your 17");
  });

  it('describes cards for screen readers and totals a session', () => {
    expect(describeCard('KH')).toBe('King of hearts');
    expect(describeCard('10C')).toBe('10 of clubs');
    expect(describeCard(null)).toBe('Face-down card');
    expect(getSessionNet({hands: 3, returned: 45, wagered: 60})).toBe(-15);
  });
});
