import {CasinoBet, VideoPokerBet, VideoPokerCategory} from 'types/casino';
import {VIDEO_POKER_PAY_TABLE} from 'utils/videoPokerFairness';

export const HAND_SIZE = 5;
export const MAX_COINS = 5;
// The value of one coin in TNB. A wager is one to five coins, like the machine's Bet One and Bet Max buttons.
export const COIN_VALUES = [1, 5, 25, 100, 500, 1000];

const SUIT_NAMES: Record<string, string> = {C: 'clubs', D: 'diamonds', H: 'hearts', S: 'spades'};
const RANK_NAMES: Record<string, string> = {A: 'Ace', J: 'Jack', K: 'King', Q: 'Queen'};
export const SUIT_SYMBOLS: Record<string, string> = {C: '♣', D: '♦', H: '♥', S: '♠'};

export const cardRank = (card: string) => card.slice(0, -1);
export const cardSuit = (card: string) => card.slice(-1);
export const isRedCard = (card: string) => ['D', 'H'].includes(cardSuit(card));
export const describeCard = (card: string) =>
  `${RANK_NAMES[cardRank(card)] ?? cardRank(card)} of ${SUIT_NAMES[cardSuit(card)]}`;

export const categoryName = (category: VideoPokerCategory | undefined) =>
  VIDEO_POKER_PAY_TABLE.find((row) => row.hand === category)?.name ?? 'No win';

export const isVideoPokerBet = (bet: CasinoBet | null): bet is VideoPokerBet =>
  bet?.game === 'video_poker' &&
  Array.isArray(bet.result.hand) &&
  bet.result.hand.length === HAND_SIZE &&
  Array.isArray(bet.result.dealt) &&
  Number.isInteger(bet.result.revision);

/** The fewest and most coins of one value that the table limits allow, or null when no whole number of coins fits. */
export const coinRange = (value: number, minBet: number, maxBet: number) => {
  const min = Math.max(1, Math.ceil(minBet / value));
  const max = Math.min(MAX_COINS, Math.floor(maxBet / value));
  return min <= max ? {max, min} : null;
};

export const playableCoinValues = (minBet: number, maxBet: number) =>
  COIN_VALUES.filter((value) => coinRange(value, minBet, maxBet));

/** How a wager reads on the machine: coins of the preferred value when that works, otherwise the most coins that fit. */
export const describeWager = (amount: number, preferredValue: number) => {
  const fits = (value: number) => amount % value === 0 && amount / value <= MAX_COINS;
  const value = fits(preferredValue) ? preferredValue : COIN_VALUES.find(fits);
  return value ? {coins: amount / value, value} : {coins: 1, value: amount};
};

export const holdsToAction = (held: boolean[]) => `draw:${held.map((keep) => (keep ? '1' : '0')).join('')}`;

export const actionToHolds = (action: string) =>
  action
    .slice(5)
    .split('')
    .map((flag) => flag === '1');

export const formatCountdown = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
