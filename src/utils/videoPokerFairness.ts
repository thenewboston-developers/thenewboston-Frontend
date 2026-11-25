import {CasinoBet, VideoPokerCategory} from 'types/casino';

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['C', 'D', 'H', 'S'];
const HAND_SIZE = 5;
// Rank indexes follow RANKS: only a pair of jacks, queens, kings or aces returns the wager.
const HIGH_PAIR_RANKS = [0, 10, 11, 12];

// Immutable Video Poker v1: total returns, wager included, for 9/6 Jacks or Better with a flat royal flush.
export const VIDEO_POKER_PAY_TABLE: {hand: VideoPokerCategory; multiplier: number; name: string}[] = [
  {hand: 'royal_flush', multiplier: 250, name: 'Royal Flush'},
  {hand: 'straight_flush', multiplier: 50, name: 'Straight Flush'},
  {hand: 'four_of_a_kind', multiplier: 25, name: 'Four of a Kind'},
  {hand: 'full_house', multiplier: 9, name: 'Full House'},
  {hand: 'flush', multiplier: 6, name: 'Flush'},
  {hand: 'straight', multiplier: 4, name: 'Straight'},
  {hand: 'three_of_a_kind', multiplier: 3, name: 'Three of a Kind'},
  {hand: 'two_pair', multiplier: 2, name: 'Two Pair'},
  {hand: 'jacks_or_better', multiplier: 1, name: 'Jacks or Better'},
];

export const videoPokerMultiplier = (category: VideoPokerCategory) =>
  VIDEO_POKER_PAY_TABLE.find((row) => row.hand === category)?.multiplier ?? 0;

/** What five different cards make. An ace is high in 10-J-Q-K-A and low in A-2-3-4-5; straights never wrap. */
export const evaluateVideoPokerHand = (cards: string[]): VideoPokerCategory => {
  if (cards.length !== HAND_SIZE || new Set(cards).size !== HAND_SIZE) {
    throw new Error('A Video Poker hand has five different cards.');
  }
  const ranks = cards.map((card) => RANKS.indexOf(card.slice(0, -1))).sort((first, second) => first - second);
  if (ranks[0] < 0 || cards.some((card) => !SUITS.includes(card.slice(-1)))) {
    throw new Error('The hand contains an unknown card.');
  }
  const groups = new Map<number, number>();
  ranks.forEach((rank) => groups.set(rank, (groups.get(rank) ?? 0) + 1));
  const counts = Array.from(groups.values()).sort((first, second) => second - first);
  const flush = cards.every((card) => card.slice(-1) === cards[0].slice(-1));
  const royal = ranks.join() === '0,9,10,11,12';
  const straight = counts[0] === 1 && (ranks[4] - ranks[0] === 4 || royal);
  if (straight && flush) return royal ? 'royal_flush' : 'straight_flush';
  if (counts[0] === 4) return 'four_of_a_kind';
  if (counts[0] === 3 && counts[1] === 2) return 'full_house';
  if (flush) return 'flush';
  if (straight) return 'straight';
  if (counts[0] === 3) return 'three_of_a_kind';
  if (counts[0] === 2 && counts[1] === 2) return 'two_pair';
  if (counts[0] === 2) {
    const pair = Array.from(groups.entries()).find(([, count]) => count === 2)![0];
    if (HIGH_PAIR_RANKS.includes(pair)) return 'jacks_or_better';
  }
  return 'nothing';
};

const hex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');

/** Independently replay immutable Video Poker v1 from the revealed seed and the recorded holds. */
export const verifyVideoPokerReceipt = async (bet: CasinoBet, observedHash?: string): Promise<string> => {
  if (
    bet.game !== 'video_poker' ||
    bet.rules_version !== 1 ||
    bet.fairness.algorithm !== 'hmac-sha256-v1' ||
    bet.status !== 'settled'
  ) {
    throw new Error('This receipt uses an unsupported rules version or is not settled.');
  }
  if (
    !Number.isSafeInteger(bet.amount) ||
    bet.amount < 1 ||
    bet.amount > 1000000000 ||
    (bet.selection && Object.keys(bet.selection).length > 0)
  ) {
    throw new Error('The receipt contains an invalid Video Poker wager.');
  }
  const {result} = bet;
  const action = result.actions?.[0];
  if (
    !Array.isArray(result.actions) ||
    result.actions.length !== 1 ||
    typeof action !== 'string' ||
    !/^draw:[01]{5}$/.test(action)
  ) {
    throw new Error('The receipt is missing a valid record of the cards that were held.');
  }
  const serverSeed = bet.fairness.server_seed;
  if (typeof serverSeed !== 'string' || !/^[0-9a-f]{64}$/.test(serverSeed)) throw new Error('Invalid server seed.');
  const encoder = new TextEncoder();
  const hash = hex(await crypto.subtle.digest('SHA-256', encoder.encode(serverSeed)));
  if (hash !== bet.fairness.server_seed_hash || (observedHash && hash !== observedHash)) {
    throw new Error('The revealed seed does not match the committed hash.');
  }
  const keyBytes = new Uint8Array(serverSeed.match(/../g)!.map((byte) => parseInt(byte, 16)));
  const key = await crypto.subtle.importKey('raw', keyBytes, {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  let counter = 0;
  const randomBelow = async (maximum: number) => {
    const bound = BigInt(maximum);
    const range = BigInt(2) ** BigInt(64);
    const threshold = range - (range % bound);
    for (let attempt = 0; attempt < 1000; attempt += 1) {
      const message = JSON.stringify([
        'casino-v1',
        bet.game,
        bet.rules_version,
        bet.fairness.commitment_id,
        bet.fairness.client_seed,
        counter,
      ]);
      counter += 1;
      // A rejected candidate consumes its counter before the next candidate is derived.
      // eslint-disable-next-line no-await-in-loop
      const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
      let candidate = BigInt(0);
      for (const byte of bytes.slice(0, 8)) candidate = candidate * BigInt(256) + BigInt(byte);
      if (candidate < threshold) return Number(candidate % bound);
    }
    throw new Error('Unable to derive the Video Poker shuffle.');
  };

  // One deck, suit first and rank second; descending Fisher–Yates draws share one HMAC counter.
  const deck = SUITS.flatMap((suit) => RANKS.map((rank) => rank + suit));
  for (let index = deck.length - 1; index > 0; index -= 1) {
    // The next swap depends on the previous draw, including any rejection sampling.
    // eslint-disable-next-line no-await-in-loop
    const selected = await randomBelow(index + 1);
    [deck[index], deck[selected]] = [deck[selected], deck[index]];
  }
  const dealt = deck.slice(0, HAND_SIZE);
  const held = action
    .slice(5)
    .split('')
    .map((flag) => flag === '1');
  // Replacements come off the top of the remaining deck, filling discarded positions from left to right.
  let cursor = HAND_SIZE;
  const hand = dealt.map((card, index) => {
    if (held[index]) return card;
    cursor += 1;
    return deck[cursor - 1];
  });
  const category = evaluateVideoPokerHand(hand);
  const multiplier = videoPokerMultiplier(category);
  if (
    JSON.stringify(result.dealt) !== JSON.stringify(dealt) ||
    JSON.stringify(result.hand) !== JSON.stringify(hand) ||
    JSON.stringify(result.held) !== JSON.stringify(held) ||
    result.category !== category ||
    result.multiplier !== multiplier ||
    result.phase !== 'settled' ||
    result.revision !== 1 ||
    JSON.stringify(result.available_actions) !== '[]' ||
    result.expires_at !== null
  ) {
    throw new Error('The Video Poker hand does not match the committed cards and the recorded holds.');
  }
  const payout = bet.amount * multiplier;
  if (bet.total_stake !== bet.amount || bet.payout !== payout || bet.profit !== payout - bet.amount) {
    throw new Error('The Video Poker payout does not match the verified hand.');
  }
  return observedHash
    ? 'Verified: the pre-bet commitment, cards, recorded holds, and payout all match.'
    : 'Cards, recorded holds, and payout verified. The original pre-bet commitment was not saved on this device.';
};
