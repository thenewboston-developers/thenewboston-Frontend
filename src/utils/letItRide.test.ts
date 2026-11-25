import {DECK, getBestPlay, getMadeHand, getOdds, getPayout, PAYTABLE, rankHand, RANKS, SUITS} from './letItRide';

it('ranks every paying hand, with the ace high or low in a straight', () => {
  expect(rankHand(['AS', 'KS', 'QS', 'JS', 'TS'])).toBe('royal_flush');
  expect(rankHand(['5C', '4C', '3C', '2C', 'AC'])).toBe('straight_flush');
  expect(rankHand(['9C', '9D', '9H', '9S', '2C'])).toBe('four_of_a_kind');
  expect(rankHand(['TC', 'TD', '4H', '4S', '4C'])).toBe('full_house');
  expect(rankHand(['2H', '7H', '9H', 'JH', 'KH'])).toBe('flush');
  expect(rankHand(['5C', '4D', '3C', '2C', 'AC'])).toBe('straight');
  expect(rankHand(['TC', 'JD', 'QH', 'KS', 'AC'])).toBe('straight');
  expect(rankHand(['7C', '7D', '7H', 'KS', '2C'])).toBe('three_of_a_kind');
  expect(rankHand(['4C', '4D', 'JH', 'JS', 'AC'])).toBe('two_pair');
  expect(rankHand(['TC', 'TD', '2H', '5S', '9C'])).toBe('tens_or_better');
  expect(rankHand(['9C', '9D', '2H', '5S', 'AC'])).toBe('no_win');
  expect(rankHand(['QC', 'KD', 'AC', '2C', '3C'])).toBe('no_win');
  expect(() => rankHand(['AS', 'AS', 'KS', 'QS', 'JS'])).toThrow('five different cards');
  expect(() => rankHand(['AS', 'KS', 'QS', 'JS'])).toThrow('five different cards');
  expect(() => rankHand(['AS', 'KS', 'QS', 'JS', '1S'])).toThrow('five different cards');
});

it('knows the hand already held before the last card', () => {
  expect(getMadeHand(['TC', 'TD', '2H'])).toBe('tens_or_better');
  expect(getMadeHand(['9C', '9D', '2H'])).toBeNull();
  expect(getMadeHand(['2C', '2D', '2H'])).toBe('three_of_a_kind');
  expect(getMadeHand(['2C', '2D', '3H', '3S'])).toBe('two_pair');
  expect(getMadeHand(['2C', '2D', '2H', '2S'])).toBe('four_of_a_kind');
  expect(getMadeHand(['AC', 'KC', 'QC', 'JC'])).toBeNull();
  expect(getMadeHand(['AC', 'KC', 'QC', 'JC', 'TC'])).toBe('royal_flush');
  expect(getMadeHand(['AC', 'KC', 'QC', 'JC', '2D'])).toBeNull();
});

it('pays the casino table and returns every pulled bet', () => {
  expect(PAYTABLE.map((line) => line.odds)).toEqual([100, 50, 25, 15, 10, 6, 3, 2, 1]);
  expect(getOdds('flush')).toBe(10);
  expect(getOdds('no_win')).toBe(0);
  expect(getOdds(null)).toBe(0);
  // Three bets of 5: three of a kind pays 3 to 1 on each bet left riding
  expect(getPayout(15, 3, 'three_of_a_kind')).toBe(60);
  expect(getPayout(15, 2, 'three_of_a_kind')).toBe(45);
  expect(getPayout(15, 1, 'three_of_a_kind')).toBe(30);
  expect(getPayout(15, 3, 'no_win')).toBe(0);
  expect(getPayout(15, 1, 'no_win')).toBe(10);
  expect(getPayout(3, 3, 'royal_flush')).toBe(303);
});

it('suggests the printed strategy', () => {
  expect(getBestPlay(['TC', 'TD', '2H'])).toBe('ride');
  expect(getBestPlay(['9C', '9D', '2H'])).toBe('pull');
  expect(getBestPlay(['TS', 'JS', 'AS'])).toBe('ride');
  expect(getBestPlay(['8S', '9S', 'TS'])).toBe('ride');
  expect(getBestPlay(['7S', '8S', '9S'])).toBe('pull');
  expect(getBestPlay(['AS', '2S', '3S'])).toBe('pull');
  expect(getBestPlay(['7S', '8S', 'TS'])).toBe('ride');
  expect(getBestPlay(['7S', 'TS', 'JS'])).toBe('ride');
  expect(getBestPlay(['6S', '7S', 'TS'])).toBe('pull');
  expect(getBestPlay(['TC', 'JD', 'QH'])).toBe('ride');
  expect(getBestPlay(['JC', 'QD', 'KH'])).toBe('pull');
  expect(getBestPlay(['2S', '7S', '9S', 'KS'])).toBe('ride');
  expect(getBestPlay(['2C', '3D', '4H', '5S'])).toBe('ride');
  expect(getBestPlay(['AC', '2D', '3H', '4S'])).toBe('pull');
  expect(getBestPlay(['TC', 'JD', 'QH', 'AS'])).toBe('ride');
  expect(getBestPlay(['9C', 'JD', 'QH', 'KS'])).toBe('pull');
  expect(getBestPlay(['2C', '2D', '9H', 'KS'])).toBe('pull');
});

// Solved from scratch here, independently of the backend's proof: every one of the 22,100 three-card hands against
// every pair of cards that can follow.
it('suggests the best play for every possible deal, and that play loses exactly 7,979 / 249,900 of a bet', () => {
  const cards = DECK.map((card) => ({name: card, rank: RANKS.indexOf(card[0]), suit: SUITS.indexOf(card[1])}));
  // What one riding bet returns, by the five ranks and whether the suits all match
  const returns = new Map<number, number>();
  const getReturn = (hand: typeof cards) => {
    const isFlush = hand.every((card) => card.suit === hand[0].suit);
    const ranks = hand.map((card) => card.rank).sort((a, b) => a - b);
    const key = ranks.reduce((sum, rank) => sum * 13 + rank, isFlush ? 1 : 0);
    let value = returns.get(key);
    if (value === undefined) {
      const odds = getOdds(rankHand(hand.map((card) => card.name)));
      value = odds ? odds + 1 : 0;
      returns.set(key, value);
    }
    return value;
  };
  let hands = 0;
  let mismatches = 0;
  let returned = 0;
  const solve = (three: typeof cards, weight: number) => {
    const rest = cards.filter((card) => !three.includes(card));
    const totals = rest.map(() => 0);
    let everything = 0;
    for (let first = 0; first < rest.length; first += 1) {
      for (let second = first + 1; second < rest.length; second += 1) {
        const value = getReturn([...three, rest[first], rest[second]]);
        totals[first] += value;
        totals[second] += value;
        everything += value;
      }
    }
    // A bet is worth leaving out only when it returns more than itself on average
    const rideFirst = everything > 1176;
    if ((getBestPlay(three.map((card) => card.name)) === 'ride') !== rideFirst) mismatches += 1;
    rest.forEach((fourth, index) => {
      const rideSecond = totals[index] > 48;
      if ((getBestPlay([...three, fourth].map((card) => card.name)) === 'ride') !== rideSecond) mismatches += 1;
      returned += weight * ((rideFirst ? totals[index] : 48) + (rideSecond ? totals[index] : 48) + totals[index]);
    });
    hands += weight;
  };
  for (let a = 0; a < 52; a += 1) {
    for (let b = a + 1; b < 52; b += 1) {
      for (let c = b + 1; c < 52; c += 1) {
        const three = [cards[a], cards[b], cards[c]];
        // Hands that differ only by which suit is which play identically. When the lowest card is alone in its
        // rank, solve the hand where it is a club and count it four times
        const isLowestAlone = three[0].rank < three[1].rank;
        if (!isLowestAlone) solve(three, 1);
        else if (three[0].suit === 0) solve(three, 4);
      }
    }
  }
  expect(hands).toBe(22100);
  expect(mismatches).toBe(0);
  const deals = 22100 * 49 * 48;
  expect((3 * deals - returned) * 249900).toBe(7979 * deals);
});
