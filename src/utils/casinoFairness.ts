import {CasinoBet} from 'types/casino';

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
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
  if (bet.rules_version !== 1 || bet.fairness.algorithm !== 'hmac-sha256-v1' || bet.status !== 'settled') {
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
  const bound = BigInt(bet.game === 'slots' ? 10000 : 37);
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
  if (bet.game === 'slots') {
    let boundary = 0;
    const outcome = SLOT_OUTCOMES.find((item) => {
      boundary += item.weight;
      return draw! < boundary;
    })!;
    multiplier = outcome.multiplier;
    if (bet.result.draw !== draw || JSON.stringify(bet.result.symbols) !== JSON.stringify(outcome.symbols)) {
      throw new Error('The slot outcome does not match the committed result.');
    }
  } else if (bet.game === 'roulette') {
    let color = RED_NUMBERS.includes(draw) ? 'red' : 'black';
    if (draw === 0) color = 'green';
    if (bet.result.number !== draw || bet.result.color !== color)
      throw new Error('The roulette outcome does not match the committed result.');
    const {type, value} = bet.selection || {};
    const matches: Record<string, boolean> = {
      black: color === 'black',
      column: draw > 0 && ((draw - 1) % 3) + 1 === value,
      dozen: draw > 0 && Math.ceil(draw / 12) === value,
      even: draw > 0 && draw % 2 === 0,
      high: draw >= 19,
      low: draw > 0 && draw <= 18,
      number: draw === value,
      odd: draw % 2 === 1,
      red: color === 'red',
    };
    if (!type || !(type in matches)) throw new Error('The receipt is missing its roulette selection.');
    let winMultiplier = ['column', 'dozen'].includes(type) ? 3 : 2;
    if (type === 'number') winMultiplier = 36;
    multiplier = matches[type] ? winMultiplier : 0;
  } else throw new Error('Unsupported game.');
  if (
    bet.result.multiplier !== multiplier ||
    bet.payout !== bet.amount * multiplier ||
    bet.profit !== bet.payout - bet.total_stake
  ) {
    throw new Error('The payout does not match the verified outcome.');
  }
  return observedHash
    ? 'Verified: the pre-bet commitment, result, and payout all match.'
    : 'Result and payout verified. The original pre-bet commitment was not saved on this device.';
};
