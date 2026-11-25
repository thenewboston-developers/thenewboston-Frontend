import {LetItRideAction, LetItRideHand} from 'types/casino';

// Let It Ride rules version 1, exactly as the casino deals and pays it. The backend owns the game; this copy lets the
// browser name hands, suggest the best play and check a receipt for itself.
export const BETS = 3;
export const RANKS = '23456789TJQKA';
export const SUITS = 'CDHS';
// A fresh deck in deal order: 2C, 2D, 2H, 2S, 3C ... AS
export const DECK = [...RANKS].flatMap((rank) => [...SUITS].map((suit) => rank + suit));

// Odds are paid "to one" on each bet still riding, and the bet comes back as well
export const PAYTABLE: {hand: LetItRideHand; label: string; odds: number}[] = [
  {hand: 'royal_flush', label: 'Royal flush', odds: 100},
  {hand: 'straight_flush', label: 'Straight flush', odds: 50},
  {hand: 'four_of_a_kind', label: 'Four of a kind', odds: 25},
  {hand: 'full_house', label: 'Full house', odds: 15},
  {hand: 'flush', label: 'Flush', odds: 10},
  {hand: 'straight', label: 'Straight', odds: 6},
  {hand: 'three_of_a_kind', label: 'Three of a kind', odds: 3},
  {hand: 'two_pair', label: 'Two pair', odds: 2},
  {hand: 'tens_or_better', label: 'Pair of tens or better', odds: 1},
];

export const MAX_ODDS = 100;

const ACE = RANKS.indexOf('A');
const TEN = RANKS.indexOf('T');

const rankOf = (card: string) => RANKS.indexOf(card[0]);

// Rank groups, largest first; a tie goes to the higher rank
const groupRanks = (cards: string[]) => {
  const counts = new Map<number, number>();
  cards.forEach((card) => counts.set(rankOf(card), (counts.get(rankOf(card)) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0]);
};

export const getOdds = (hand: LetItRideHand | null): number => PAYTABLE.find((line) => line.hand === hand)?.odds ?? 0;

// The paying hand five cards make, or no_win
export const rankHand = (cards: string[]): LetItRideHand => {
  if (cards.length !== 5 || new Set(cards).size !== 5 || cards.some((card) => !DECK.includes(card))) {
    throw new Error('A hand is five different cards.');
  }
  const groups = groupRanks(cards);
  const shape = groups.map(([, count]) => count).join('');
  const ranks = groups.map(([rank]) => rank).sort((a, b) => a - b);
  const isFlush = new Set(cards.map((card) => card[1])).size === 1;
  // The ace also plays low, in A-2-3-4-5
  const isStraight = ranks.length === 5 && (ranks[4] - ranks[0] === 4 || ranks.join() === [0, 1, 2, 3, ACE].join());
  if (isStraight && isFlush) return ranks[0] === TEN ? 'royal_flush' : 'straight_flush';
  if (shape === '41') return 'four_of_a_kind';
  if (shape === '32') return 'full_house';
  if (isFlush) return 'flush';
  if (isStraight) return 'straight';
  if (shape === '311') return 'three_of_a_kind';
  if (shape === '221') return 'two_pair';
  if (shape === '2111' && groups[0][0] >= TEN) return 'tens_or_better';
  return 'no_win';
};

// The paying hand already held by three, four or five cards. A hand made early can only get better
export const getMadeHand = (cards: string[]): LetItRideHand | null => {
  if (cards.length === 5) {
    const hand = rankHand(cards);
    return hand === 'no_win' ? null : hand;
  }
  const groups = groupRanks(cards);
  const [first, second] = groups.map(([, count]) => count);
  if (first === 4) return 'four_of_a_kind';
  if (first === 3) return 'three_of_a_kind';
  if (first === 2 && second === 2) return 'two_pair';
  if (first === 2 && groups[0][0] >= TEN) return 'tens_or_better';
  return null;
};

/**
 * The best decision for the next bet, from the three or four cards on show. This is the strategy printed on the rules
 * page; the backend's tests prove it is the best play for every possible deal with this paytable. Aces count high.
 */
export const getBestPlay = (cards: string[]): LetItRideAction => {
  if (getMadeHand(cards)) return 'ride';
  const ranks = cards.map(rankOf).sort((a, b) => a - b);
  const isSuited = new Set(cards.map((card) => card[1])).size === 1;
  const hasPair = new Set(ranks).size < ranks.length;
  const high = ranks.filter((rank) => rank >= TEN).length;
  const spread = ranks[ranks.length - 1] - ranks[0];
  if (cards.length === 3) {
    if (hasPair) return 'pull';
    if (isSuited) {
      // In a row or one gap needs one card ten or higher; two gaps need two
      const gaps = spread - 2;
      return (gaps <= 1 && high >= 1) || (gaps === 2 && high >= 2) ? 'ride' : 'pull';
    }
    return ranks.join() === [TEN, TEN + 1, TEN + 2].join() ? 'ride' : 'pull';
  }
  if (isSuited) return 'ride';
  if (hasPair) return 'pull';
  // Four tens-or-higher, or four in a row that can be completed at either end
  return ranks[0] >= TEN || (spread === 3 && ranks[3] < ACE) ? 'ride' : 'pull';
};

// Total returned for a finished hand: every pulled bet, plus each riding bet with its winnings
export const getPayout = (amount: number, riding: number, hand: LetItRideHand): number => {
  const bet = amount / BETS;
  const odds = getOdds(hand);
  return bet * (BETS - riding) + (odds ? bet * riding * (odds + 1) : 0);
};
