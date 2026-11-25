import {BlackjackBet} from 'types/casino';

export type Suit = 'C' | 'D' | 'H' | 'S';

export interface ChipStyle {
  base: string;
  face: string;
  inlay: string;
  text: string;
  value: number;
}

export interface HandValue {
  // An ace is still counted as 11
  soft: boolean;
  total: number;
}

export interface OutcomeCopy {
  detail: string;
  title: string;
  tone: 'blackjack' | 'loss' | 'push' | 'win';
}

export interface SessionTotals {
  hands: number;
  returned: number;
  wagered: number;
}

// The colors players know from other tables: white, red, green, black, purple and gold. Wagers are even so that a
// 3 to 2 payout is always whole coins; the pink 1 only appears in a payout, like the half chip a casino pays with.
export const CHIPS: ChipStyle[] = [
  {base: '#f29bb7', face: '#f7b6cb', inlay: '#fff4f8', text: '#5a1730', value: 1},
  {base: '#ece6d6', face: '#fbf7ec', inlay: '#3f72b8', text: '#1d2a36', value: 2},
  {base: '#cc2f3d', face: '#b32333', inlay: '#f6f0df', text: '#ffffff', value: 10},
  {base: '#1e8f5b', face: '#16774a', inlay: '#f6f0df', text: '#ffffff', value: 50},
  {base: '#20252a', face: '#12161a', inlay: '#e4bf62', text: '#f9e5a6', value: 100},
  {base: '#6f43b8', face: '#5b339f', inlay: '#f6f0df', text: '#ffffff', value: 500},
  {base: '#dba92f', face: '#c39220', inlay: '#20252a', text: '#1c1405', value: 1000},
];

export const DEFAULT_WAGER = 10;

const RACK_VALUES = [2, 10, 50, 100, 500, 1000];
const RANK_NAMES: Record<string, string> = {A: 'Ace', J: 'Jack', K: 'King', Q: 'Queen'};
const STACK_LIMIT = 9;
const SUIT_NAMES: Record<Suit, string> = {C: 'clubs', D: 'diamonds', H: 'hearts', S: 'spades'};

// The variation selector keeps a suit a plain glyph where a device would otherwise draw an emoji
export const SUIT_SYMBOLS: Record<Suit, string> = {C: '♣\uFE0E', D: '♦\uFE0E', H: '♥\uFE0E', S: '♠\uFE0E'};

export const getRank = (card: string): string => card.slice(0, -1);

export const getSuit = (card: string): Suit => card.slice(-1) as Suit;

export const isRedSuit = (suit: Suit): boolean => suit === 'D' || suit === 'H';

// "King of hearts", for screen readers
export const describeCard = (card: string | null): string => {
  if (!card) return 'Face-down card';
  const rank = getRank(card);
  return `${RANK_NAMES[rank] ?? rank} of ${SUIT_NAMES[getSuit(card)]}`;
};

// "K♥ 7♠", for the history
export const formatCard = (card: string): string => `${getRank(card)}${SUIT_SYMBOLS[getSuit(card)]}`;

export const formatClock = (seconds: number): string =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export const formatSigned = (amount: number): string => `${amount > 0 ? '+' : ''}${amount.toLocaleString()}`;

export const formatTnb = (amount: number): string => `${amount.toLocaleString()} TNB`;

// The chips that make up an amount, largest first: the order they are stacked in, from the felt up. A tall stack
// keeps its largest chips.
export const getChips = (amount: number, limit = STACK_LIMIT): number[] => {
  const chips: number[] = [];
  let remaining = Math.max(0, Math.floor(amount));
  [...CHIPS].reverse().forEach(({value}) => {
    while (remaining >= value && chips.length < limit) {
      chips.push(value);
      remaining -= value;
    }
  });
  return chips;
};

export const getChipStyle = (value: number): ChipStyle =>
  [...CHIPS].reverse().find((chip) => chip.value <= value) ?? CHIPS[0];

// Cards the dealer has not turned over yet count for nothing
export const getHandValue = (cards: (string | null)[]): HandValue => {
  let aces = 0;
  let total = 0;
  cards.forEach((card) => {
    if (!card) return;
    const rank = getRank(card);
    if (rank === 'A') {
      aces += 1;
      total += 11;
    } else total += ['J', 'K', 'Q'].includes(rank) ? 10 : Number(rank);
  });
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return {soft: aces > 0, total};
};

// A hand that can still change shows both ways an ace counts, the way every table writes it: "7/17"
export const formatHandValue = (cards: (string | null)[], final: boolean): string => {
  const {soft, total} = getHandValue(cards);
  if (!cards.some(Boolean)) return '';
  return soft && total < 21 && !final ? `${total - 10}/${total}` : String(total);
};

export const isNatural = (cards: (string | null)[]): boolean =>
  cards.length === 2 && cards.every(Boolean) && getHandValue(cards).total === 21;

export const getOutcomeCopy = (hand: BlackjackBet): OutcomeCopy => {
  const {dealer_cards: dealerCards, dealer_total: dealerTotal, outcome, player_total: playerTotal} = hand.result;
  if (outcome === 'blackjack') return {detail: 'Blackjack pays 3 to 2', title: 'Blackjack!', tone: 'blackjack'};
  if (outcome === 'win') {
    const detail =
      dealerTotal > 21 ? `Dealer busts with ${dealerTotal}` : `Your ${playerTotal} beats the dealer's ${dealerTotal}`;
    return {detail, title: 'You win', tone: 'win'};
  }
  if (outcome === 'push') {
    const detail = isNatural(hand.result.player_cards) ? 'Both hands are blackjack' : `Both hands have ${playerTotal}`;
    return {detail, title: 'Push', tone: 'push'};
  }
  if (playerTotal > 21) return {detail: `You went over with ${playerTotal}`, title: 'Bust', tone: 'loss'};
  if (isNatural(dealerCards)) return {detail: 'The dealer has blackjack', title: 'Dealer wins', tone: 'loss'};
  return {detail: `The dealer's ${dealerTotal} beats your ${playerTotal}`, title: 'Dealer wins', tone: 'loss'};
};

// The chips offered for betting: every denomination the table limit has room for
export const getRack = (maxBet: number): number[] => {
  const rack = RACK_VALUES.filter((value) => value <= maxBet);
  return rack.length >= 4 ? rack : RACK_VALUES.slice(0, 4);
};

export const getSessionNet = ({returned, wagered}: SessionTotals): number => returned - wagered;

// Wagers are even whole amounts; an odd figure rounds down to the wager below it
export const toEven = (amount: number): number => Math.max(0, Math.floor(amount / 2) * 2);
