import {LetItRideBet, LetItRideHand} from 'types/casino';
import {BETS, getMadeHand, PAYTABLE, RANKS} from 'utils/letItRide';

const RANK_NAMES: Record<string, string> = {
  A: 'ace',
  J: 'jack',
  K: 'king',
  Q: 'queen',
  T: 'ten',
};
const RANK_WORDS = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const SUIT_NAMES: Record<string, string> = {C: 'clubs', D: 'diamonds', H: 'hearts', S: 'spades'};

export const SUIT_SYMBOLS: Record<string, string> = {C: '♣', D: '♦', H: '♥', S: '♠'};

// "T" is how the deck writes a ten; the table prints 10
export const getRankLabel = (card: string) => (card[0] === 'T' ? '10' : card[0]);

export const getRankName = (rank: string) => RANK_NAMES[rank] ?? RANK_WORDS[RANKS.indexOf(rank)];

export const describeCard = (card: string) => `${getRankName(card[0])} of ${SUIT_NAMES[card[1]]}`;

export const formatCard = (card: string) => `${getRankLabel(card)}${SUIT_SYMBOLS[card[1]]}`;

export const formatTnb = (amount: number) => `${amount.toLocaleString()} TNB`;

export const isRedCard = (card: string) => card[1] === 'D' || card[1] === 'H';

export const getHandLabel = (hand: LetItRideHand | null | undefined) =>
  PAYTABLE.find((line) => line.hand === hand)?.label ?? 'No paying hand';

// The hand the cards on show already hold, named with its ranks where that helps: "Pair of kings"
export const describeMadeHand = (cards: string[]): string | null => {
  const hand = getMadeHand(cards);
  if (!hand) return null;
  if (hand !== 'tens_or_better') return getHandLabel(hand);
  const paired = cards.find((card) => cards.filter((other) => other[0] === card[0]).length === 2)!;
  return `Pair of ${getRankName(paired[0])}s`;
};

// The cards that make the paying hand, to lift them out of the row: the matching ranks of a pair, two pair, three or
// four of a kind, and all five cards of anything bigger
export const getPayingCards = (cards: string[]): string[] => {
  const hand = getMadeHand(cards);
  if (!hand) return [];
  if (!['four_of_a_kind', 'three_of_a_kind', 'two_pair', 'tens_or_better'].includes(hand)) return cards;
  return cards.filter((card) => cards.filter((other) => other[0] === card[0]).length > 1);
};

export const getBet = (hand: LetItRideBet) => hand.amount / BETS;

export const getCards = (hand: LetItRideBet) => [...hand.result.cards, ...hand.result.community];

// The cards the player has been shown so far
export const getVisibleCards = (hand: LetItRideBet) =>
  getCards(hand).filter((card): card is string => typeof card === 'string');

export const getPulled = (hand: LetItRideBet) => hand.result.decisions.filter((decision) => decision === 'pull').length;

// One line for a finished hand: what it made and what happened to the bets
export const describeOutcome = (hand: LetItRideBet): string => {
  const {odds, riding} = hand.result;
  const bets = riding === 1 ? '1 bet' : `${riding} bets`;
  if (odds) return `${getHandLabel(hand.result.hand)} pays ${odds} to 1 on ${bets}`;
  const pulled = getPulled(hand);
  if (!pulled) return 'No paying hand · all three bets lost';
  return `No paying hand · ${bets} lost, ${pulled === 1 ? '1 bet' : '2 bets'} pulled back`;
};

export const formatCountdown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
