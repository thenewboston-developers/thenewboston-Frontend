import {webcrypto} from 'crypto';
import {TextEncoder} from 'util';

import {CasinoBet} from 'types/casino';

import {verifyCasinoReceipt} from './casinoFairness';
import {verifyLetItRideReceipt} from './letItRideFairness';

const hash = '60e05bd1b195af2f94112fa7197a5c88289058840ce7c6df9693756bc6250f55';

// The backend publishes these deals for server seed 00...00 and the commitment below (let_it_ride/README.md)
const receipt = (clientSeed: string, changes: Partial<CasinoBet>, result: Partial<CasinoBet['result']>) =>
  ({
    amount: 9,
    fairness: {
      algorithm: 'hmac-sha256-v1',
      client_seed: clientSeed,
      commitment_id: '00000000-0000-0000-0000-000000000001',
      server_seed: '00'.repeat(32),
      server_seed_hash: hash,
    },
    game: 'let_it_ride',
    rules_version: 1,
    status: 'settled',
    total_stake: 9,
    ...changes,
    result: {available_actions: [], expires_at: null, phase: 'settled', revision: 2, ...result},
  }) as CasinoBet;

const loss = receipt(
  'test-client',
  {payout: 6, profit: -3},
  {
    cards: ['QS', '3H', '7S'],
    community: ['TH', 'JH'],
    decisions: ['pull', 'pull'],
    hand: 'no_win',
    odds: 0,
    riding: 1,
  },
);

const straight = receipt(
  'vector-0',
  {payout: 63, profit: 54},
  {
    cards: ['KH', 'JS', 'TD'],
    community: ['QD', '9C'],
    decisions: ['ride', 'ride'],
    hand: 'straight',
    odds: 6,
    riding: 3,
  },
);

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', {configurable: true, value: webcrypto});
  Object.defineProperty(globalThis, 'TextEncoder', {configurable: true, value: TextEncoder});
});

it('reproduces the backend deals and pays each riding bet', async () => {
  await expect(verifyLetItRideReceipt(loss, hash)).resolves.toContain('all five cards, your decisions, and the payout');
  await expect(verifyLetItRideReceipt(straight, hash)).resolves.toContain('Verified:');
  const quads = receipt(
    'vector-44',
    {amount: 3, payout: 78, profit: 75, total_stake: 3},
    {
      cards: ['4D', '4H', '4C'],
      community: ['TH', '4S'],
      decisions: ['ride', 'ride'],
      hand: 'four_of_a_kind',
      odds: 25,
      riding: 3,
    },
  );
  await expect(verifyLetItRideReceipt(quads, hash)).resolves.toContain('Verified:');
  // The same deal with the first bet pulled back: one bet returned, two paid 6 to 1
  const pulled = {
    ...straight,
    payout: 45,
    profit: 36,
    result: {...straight.result, decisions: ['pull', 'ride'], riding: 2},
  } as CasinoBet;
  await expect(verifyLetItRideReceipt(pulled, hash)).resolves.toContain('Verified:');
});

it('is what the shared receipt verifier uses for Let It Ride', async () => {
  await expect(verifyCasinoReceipt(straight, hash)).resolves.toContain('Verified:');
  await expect(verifyCasinoReceipt(straight)).resolves.toContain('not saved on this device');
});

it('rejects a substituted commitment or seed', async () => {
  await expect(verifyLetItRideReceipt(straight, 'ff'.repeat(32))).rejects.toThrow('committed hash');
  const forged = {...straight, fairness: {...straight.fairness, server_seed: '01'.repeat(32)}};
  await expect(verifyLetItRideReceipt(forged, hash)).rejects.toThrow('committed hash');
  const malformed = {...straight, fairness: {...straight.fairness, server_seed: 'xyz'}};
  await expect(verifyLetItRideReceipt(malformed, hash)).rejects.toThrow('Invalid server seed');
});

it.each([
  ['a swapped community card', {community: ['QD', '9D']}],
  ['a swapped player card', {cards: ['KH', 'JS', 'TS']}],
  ['a better hand than the cards make', {hand: 'straight_flush', odds: 50}],
  ['the wrong odds', {odds: 10}],
  ['the wrong number of riding bets', {riding: 2}],
  ['an unfinished phase', {phase: 'second'}],
  ['a stale revision', {revision: 1}],
  ['actions still on offer', {available_actions: ['ride', 'pull']}],
])('rejects %s', async (_, change) => {
  const altered = {...straight, result: {...straight.result, ...change}} as CasinoBet;
  await expect(verifyLetItRideReceipt(altered, hash)).rejects.toThrow('does not match the committed cards');
});

it('rejects a payout that the verified hand does not pay', async () => {
  await expect(verifyLetItRideReceipt({...straight, payout: 64}, hash)).rejects.toThrow('payout');
  await expect(verifyLetItRideReceipt({...straight, profit: 55}, hash)).rejects.toThrow('payout');
  await expect(verifyLetItRideReceipt({...loss, payout: 9, profit: 0}, hash)).rejects.toThrow('payout');
});

it('rejects receipts it cannot replay', async () => {
  await expect(verifyLetItRideReceipt({...straight, status: 'open'}, hash)).rejects.toThrow('not settled');
  await expect(verifyLetItRideReceipt({...straight, rules_version: 2}, hash)).rejects.toThrow('unsupported');
  await expect(verifyLetItRideReceipt({...straight, game: 'blackjack'}, hash)).rejects.toThrow('unsupported');
  await expect(verifyLetItRideReceipt({...straight, amount: 10, total_stake: 10}, hash)).rejects.toThrow('wager');
  await expect(verifyLetItRideReceipt({...straight, total_stake: 12}, hash)).rejects.toThrow('wager');
  await expect(verifyLetItRideReceipt({...straight, selection: {type: 'red'}}, hash)).rejects.toThrow('wager');
  const short = {...straight, result: {...straight.result, decisions: ['ride']}} as CasinoBet;
  await expect(verifyLetItRideReceipt(short, hash)).rejects.toThrow('two Let It Ride decisions');
  const odd = {...straight, result: {...straight.result, decisions: ['ride', 'fold']}} as unknown as CasinoBet;
  await expect(verifyLetItRideReceipt(odd, hash)).rejects.toThrow('two Let It Ride decisions');
});
