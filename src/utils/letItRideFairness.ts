import {CasinoBet} from 'types/casino';
import {BETS, DECK, getOdds, getPayout, rankHand} from 'utils/letItRide';

const hex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');

/** Independently re-deal an immutable Let It Ride v1 hand from the revealed seed and replay the recorded decisions. */
export const verifyLetItRideReceipt = async (bet: CasinoBet, observedHash?: string): Promise<string> => {
  if (
    bet.game !== 'let_it_ride' ||
    bet.rules_version !== 1 ||
    bet.fairness.algorithm !== 'hmac-sha256-v1' ||
    bet.status !== 'settled'
  ) {
    throw new Error('This receipt uses an unsupported rules version or is not settled.');
  }
  if (
    !Number.isSafeInteger(bet.amount) ||
    bet.amount < BETS ||
    bet.amount > 1000000000 ||
    bet.amount % BETS !== 0 ||
    bet.total_stake !== bet.amount ||
    (bet.selection && Object.keys(bet.selection).length > 0)
  ) {
    throw new Error('The receipt contains an invalid Let It Ride wager.');
  }
  const {result} = bet;
  const {decisions}: {decisions?: string[]} = result;
  if (
    !Array.isArray(decisions) ||
    decisions.length !== BETS - 1 ||
    decisions.some((decision) => !['ride', 'pull'].includes(decision))
  ) {
    throw new Error('The receipt is missing its two Let It Ride decisions.');
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
    throw new Error('Unable to derive the Let It Ride deal.');
  };

  // Five draws without replacement from a fresh deck: three player cards, then the two community cards.
  const deck = [...DECK];
  const dealt: string[] = [];
  for (let index = 0; index < 5; index += 1) {
    // Each draw depends on the cards already removed, and on any rejection sampling before it.
    // eslint-disable-next-line no-await-in-loop
    dealt.push(deck.splice(await randomBelow(deck.length), 1)[0]);
  }
  const hand = rankHand(dealt);
  const riding = BETS - decisions.filter((decision) => decision === 'pull').length;
  if (
    JSON.stringify(result.cards) !== JSON.stringify(dealt.slice(0, 3)) ||
    JSON.stringify(result.community) !== JSON.stringify(dealt.slice(3)) ||
    result.hand !== hand ||
    result.odds !== getOdds(hand) ||
    result.riding !== riding ||
    result.phase !== 'settled' ||
    result.revision !== decisions.length ||
    JSON.stringify(result.available_actions) !== '[]' ||
    result.expires_at !== null
  ) {
    throw new Error('The Let It Ride hand does not match the committed cards and recorded decisions.');
  }
  const payout = getPayout(bet.amount, riding, hand);
  if (bet.payout !== payout || bet.profit !== payout - bet.total_stake) {
    throw new Error('The Let It Ride payout does not match the verified hand.');
  }
  return observedHash
    ? 'Verified: the pre-bet commitment, all five cards, your decisions, and the payout all match.'
    : 'Cards, decisions, and payout verified. The original pre-bet commitment was not saved on this device.';
};
