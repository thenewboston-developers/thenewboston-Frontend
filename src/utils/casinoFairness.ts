import {CasinoBet} from 'types/casino';
import {verifyBlackjackReceipt} from 'utils/blackjackFairness';
import {verifyLetItRideReceipt} from 'utils/letItRideFairness';
import {verifyVideoPokerReceipt} from 'utils/videoPokerFairness';

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const SLOT_SYMBOL_ORDER = ['cherry', 'lemon', 'bell', 'bar', 'diamond', 'seven'];
// Slots rules v2 show a losing draw d as line d % 120 of every ordered line of three different symbols, enumerated
// like Python's itertools.permutations(SLOT_SYMBOL_ORDER, 3).
const SLOT_LOSING_LINES = SLOT_SYMBOL_ORDER.flatMap((first) =>
  SLOT_SYMBOL_ORDER.filter((second) => second !== first).flatMap((second) =>
    SLOT_SYMBOL_ORDER.filter((third) => third !== first && third !== second).map((third) => [first, second, third]),
  ),
);
// Immutable Plinko v1: 12 fair binary steps, with a whole-TNB return for every pocket.
const PLINKO_MULTIPLIERS = [50, 18, 8, 3, 1, 0, 0, 0, 1, 3, 8, 18, 50];
const ROULETTE_MULTIPLIERS: Record<string, number> = {
  black: 2,
  column: 3,
  dozen: 3,
  even: 2,
  high: 2,
  low: 2,
  number: 36,
  odd: 2,
  red: 2,
};
const SUPPORTED_RULES: Record<string, number[]> = {plinko: [1], roulette: [1, 2], slots: [1, 2]};
const SLOT_OUTCOMES = [
  {multiplier: 0, symbols: ['cherry', 'lemon', 'bar'], weight: 5885},
  {multiplier: 1, symbols: ['cherry', 'cherry', 'cherry'], weight: 1600},
  {multiplier: 2, symbols: ['lemon', 'lemon', 'lemon'], weight: 2000},
  {multiplier: 5, symbols: ['bell', 'bell', 'bell'], weight: 400},
  {multiplier: 10, symbols: ['bar', 'bar', 'bar'], weight: 100},
  {multiplier: 50, symbols: ['diamond', 'diamond', 'diamond'], weight: 10},
  {multiplier: 100, symbols: ['seven', 'seven', 'seven'], weight: 5},
];

const hex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');

export const verifyCasinoReceipt = async (bet: CasinoBet, observedHash?: string) => {
  if (bet.game === 'blackjack') return verifyBlackjackReceipt(bet, observedHash);
  if (bet.game === 'let_it_ride') return verifyLetItRideReceipt(bet, observedHash);
  if (bet.game === 'video_poker') return verifyVideoPokerReceipt(bet, observedHash);
  if (
    !SUPPORTED_RULES[bet.game]?.includes(bet.rules_version) ||
    bet.fairness.algorithm !== 'hmac-sha256-v1' ||
    bet.status !== 'settled'
  ) {
    throw new Error('This receipt uses an unsupported rules version or is not settled.');
  }
  if (!/^[0-9a-f]{64}$/.test(bet.fairness.server_seed)) throw new Error('Invalid server seed.');
  const encoder = new TextEncoder();
  const hash = hex(await crypto.subtle.digest('SHA-256', encoder.encode(bet.fairness.server_seed)));
  if (hash !== bet.fairness.server_seed_hash || (observedHash && hash !== observedHash)) {
    throw new Error('The revealed seed does not match the committed hash.');
  }
  const keyBytes = new Uint8Array(bet.fairness.server_seed.match(/../g)!.map((byte) => parseInt(byte, 16)));
  const key = await crypto.subtle.importKey('raw', keyBytes, {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  const bounds = {plinko: 4096, roulette: 37, slots: 10000};
  const bound = BigInt(bounds[bet.game]);
  const range = BigInt(2) ** BigInt(64);
  const threshold = range - (range % bound);
  let draw: number | null = null;
  for (let counter = 0; counter < 1000; counter += 1) {
    const message = JSON.stringify([
      'casino-v1',
      bet.game,
      bet.rules_version,
      bet.fairness.commitment_id,
      bet.fairness.client_seed,
      counter,
    ]);
    // Each subsequent candidate depends on rejection of the previous draw.
    // eslint-disable-next-line no-await-in-loop
    const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(message)));
    let candidate = BigInt(0);
    for (const byte of bytes.slice(0, 8)) candidate = candidate * BigInt(256) + BigInt(byte);
    if (candidate < threshold) {
      draw = Number(candidate % bound);
      break;
    }
  }
  if (draw === null) throw new Error('Unable to derive the result.');
  let multiplier = 0;
  // Set by a ruleset that records a total payout; the others pay their stake times one multiplier
  let payout: number | null = null;
  if (bet.game === 'slots') {
    let boundary = 0;
    const outcome = SLOT_OUTCOMES.find((item) => {
      boundary += item.weight;
      return draw! < boundary;
    })!;
    multiplier = outcome.multiplier;
    const symbols =
      bet.rules_version === 2 && multiplier === 0
        ? SLOT_LOSING_LINES[draw % SLOT_LOSING_LINES.length]
        : outcome.symbols;
    if (bet.result.draw !== draw || JSON.stringify(bet.result.symbols) !== JSON.stringify(symbols)) {
      throw new Error('The slot outcome does not match the committed result.');
    }
  } else if (bet.game === 'plinko') {
    const path = Array.from({length: 12}, (_, index) => Math.floor(draw! / 2 ** (11 - index)) % 2);
    const slot = path.reduce((sum, direction) => sum + direction, 0);
    multiplier = PLINKO_MULTIPLIERS[slot];
    if (
      bet.result.draw !== draw ||
      bet.result.slot !== slot ||
      JSON.stringify(bet.result.path) !== JSON.stringify(path) ||
      (bet.selection && Object.keys(bet.selection).length > 0)
    ) {
      throw new Error('The Plinko outcome does not match the committed result.');
    }
  } else if (bet.game === 'roulette') {
    let color = RED_NUMBERS.includes(draw) ? 'red' : 'black';
    if (draw === 0) color = 'green';
    if (bet.result.number !== draw || bet.result.color !== color)
      throw new Error('The roulette outcome does not match the committed result.');
    const wins = (type: string, value?: number): boolean =>
      ({
        black: color === 'black',
        column: draw! > 0 && ((draw! - 1) % 3) + 1 === value,
        dozen: draw! > 0 && Math.ceil(draw! / 12) === value,
        even: draw! > 0 && draw! % 2 === 0,
        high: draw! >= 19,
        low: draw! > 0 && draw! <= 18,
        number: draw === value,
        odd: draw! % 2 === 1,
        red: color === 'red',
      })[type] ?? false;
    if (bet.rules_version === 2) {
      // One spin settles the chips on every spot: the payout is the sum of the bets that win on the number drawn
      const bets = bet.selection?.bets;
      if (
        !Array.isArray(bets) ||
        !bets.length ||
        bets.some(
          (item) => !(item.type in ROULETTE_MULTIPLIERS) || !Number.isSafeInteger(item.amount) || item.amount < 1,
        )
      ) {
        throw new Error('The receipt is missing its roulette bets.');
      }
      const staked = bets.reduce((sum, item) => sum + item.amount, 0);
      payout = bets.reduce(
        (sum, item) => sum + (wins(item.type, item.value) ? item.amount * ROULETTE_MULTIPLIERS[item.type] : 0),
        0,
      );
      if (staked !== bet.amount || bet.result.payout !== payout) {
        throw new Error('The payout does not match the verified outcome.');
      }
    } else {
      const {type, value} = bet.selection || {};
      if (!type || !(type in ROULETTE_MULTIPLIERS)) throw new Error('The receipt is missing its roulette selection.');
      multiplier = wins(type, value) ? ROULETTE_MULTIPLIERS[type] : 0;
    }
  } else throw new Error('Unsupported game.');
  if (payout === null) {
    if (bet.result.multiplier !== multiplier) throw new Error('The payout does not match the verified outcome.');
    payout = bet.amount * multiplier;
  }
  if (bet.payout !== payout || bet.profit !== bet.payout - bet.total_stake) {
    throw new Error('The payout does not match the verified outcome.');
  }
  return observedHash
    ? 'Verified: the pre-bet commitment, result, and payout all match.'
    : 'Result and payout verified. The original pre-bet commitment was not saved on this device.';
};
