import {CasinoBet} from 'types/casino';

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['C', 'D', 'H', 'S'];
const ACTIONS = ['hit', 'stand', 'double'];

interface BlackjackReceiptResult {
  actions?: string[];
  available_actions?: string[];
  dealer_cards?: (string | null)[];
  dealer_total?: number;
  expires_at?: string | null;
  multiplier: number;
  outcome?: string | null;
  phase?: string;
  player_cards?: string[];
  player_total?: number;
  revision?: number;
}

const cardTotal = (cards: string[]) => {
  let aces = 0;
  let total = 0;
  cards.forEach((card) => {
    const rank = card.slice(0, -1);
    if (rank === 'A') {
      aces += 1;
      total += 11;
    } else total += ['J', 'Q', 'K'].includes(rank) ? 10 : Number(rank);
  });
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
};

const hex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');

/** Independently replay immutable Blackjack v1 rules from the revealed seed and recorded actions. */
export const verifyBlackjackReceipt = async (bet: CasinoBet, observedHash?: string): Promise<string> => {
  if (
    bet.game !== 'blackjack' ||
    bet.rules_version !== 1 ||
    bet.fairness.algorithm !== 'hmac-sha256-v1' ||
    bet.status !== 'settled'
  ) {
    throw new Error('This receipt uses an unsupported rules version or is not settled.');
  }
  if (
    !Number.isSafeInteger(bet.amount) ||
    bet.amount < 2 ||
    bet.amount > 1000000000 ||
    bet.amount % 2 !== 0 ||
    (bet.selection && Object.keys(bet.selection).length > 0)
  ) {
    throw new Error('The receipt contains an invalid Blackjack wager.');
  }
  const result = bet.result as BlackjackReceiptResult;
  if (
    !Array.isArray(result.actions) ||
    result.actions.length > 312 ||
    result.actions.some((action) => !ACTIONS.includes(action))
  ) {
    throw new Error('The receipt is missing a valid Blackjack action transcript.');
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
    throw new Error('Unable to derive the Blackjack shuffle.');
  };

  // Six complete decks, suit first and rank second; descending Fisher–Yates draws share one HMAC counter.
  const deck = Array.from({length: 6}, () => SUITS.flatMap((suit) => RANKS.map((rank) => rank + suit))).flat();
  for (let index = deck.length - 1; index > 0; index -= 1) {
    // The next swap depends on the previous draw, including any rejection sampling.
    // eslint-disable-next-line no-await-in-loop
    const selected = await randomBelow(index + 1);
    [deck[index], deck[selected]] = [deck[selected], deck[index]];
  }
  const playerCards = [deck[0], deck[2]];
  const dealerCards = [deck[1], deck[3]];
  let cursor = 4;
  let doubled = false;
  let outcome: string | null = null;
  const drawCard = () => {
    if (cursor >= deck.length) throw new Error('The Blackjack transcript exhausts the deck.');
    const card = deck[cursor];
    cursor += 1;
    return card;
  };
  const settle = () => {
    const playerTotal = cardTotal(playerCards);
    if (playerTotal > 21) {
      outcome = 'loss';
      return;
    }
    while (cardTotal(dealerCards) < 17) dealerCards.push(drawCard());
    const dealerTotal = cardTotal(dealerCards);
    if (dealerTotal > 21 || playerTotal > dealerTotal) outcome = 'win';
    else outcome = playerTotal === dealerTotal ? 'push' : 'loss';
  };
  if (cardTotal(playerCards) === 21 || cardTotal(dealerCards) === 21) {
    if (cardTotal(playerCards) === cardTotal(dealerCards)) outcome = 'push';
    else outcome = cardTotal(playerCards) === 21 ? 'blackjack' : 'loss';
  }
  for (const action of result.actions) {
    if (outcome) throw new Error('The Blackjack transcript contains an action after the hand ended.');
    if (action === 'double') {
      if (playerCards.length !== 2) throw new Error('The Blackjack transcript doubles after hitting.');
      doubled = true;
      playerCards.push(drawCard());
      settle();
    } else if (action === 'hit') {
      playerCards.push(drawCard());
      if (cardTotal(playerCards) >= 21) settle();
    } else settle();
  }
  if (!outcome) throw new Error('The Blackjack transcript does not complete the hand.');
  if (
    JSON.stringify(result.player_cards) !== JSON.stringify(playerCards) ||
    JSON.stringify(result.dealer_cards) !== JSON.stringify(dealerCards) ||
    result.player_total !== cardTotal(playerCards) ||
    result.dealer_total !== cardTotal(dealerCards) ||
    result.outcome !== outcome ||
    result.phase !== 'settled' ||
    result.revision !== result.actions.length ||
    JSON.stringify(result.available_actions) !== '[]' ||
    result.expires_at !== null
  ) {
    throw new Error('The Blackjack outcome does not match the committed cards and recorded actions.');
  }
  const totalStake = bet.amount * (doubled ? 2 : 1);
  let payout = 0;
  if (outcome === 'blackjack') payout = (bet.amount * 5) / 2;
  else if (outcome === 'win') payout = totalStake * 2;
  else if (outcome === 'push') payout = totalStake;
  if (
    bet.total_stake !== totalStake ||
    bet.payout !== payout ||
    bet.profit !== payout - totalStake ||
    result.multiplier !== payout / bet.amount
  ) {
    throw new Error('The Blackjack payout does not match the verified outcome.');
  }
  return observedHash
    ? 'Verified: the pre-bet commitment, cards, recorded actions, and payout all match.'
    : 'Cards, recorded actions, and payout verified. The original pre-bet commitment was not saved on this device.';
};
