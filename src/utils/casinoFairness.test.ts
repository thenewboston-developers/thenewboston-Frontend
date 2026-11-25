import {webcrypto} from 'crypto';
import {TextEncoder} from 'util';

import {CasinoBet} from 'types/casino';

import {verifyCasinoReceipt} from './casinoFairness';

const hash = '60e05bd1b195af2f94112fa7197a5c88289058840ce7c6df9693756bc6250f55';
const bet = {
  amount: 10,
  game: 'slots',
  payout: 0,
  profit: -10,
  rules_version: 1,
  status: 'settled',
  total_stake: 10,
  fairness: {
    algorithm: 'hmac-sha256-v1',
    client_seed: 'test-client',
    commitment_id: '00000000-0000-0000-0000-000000000001',
    server_seed: '00'.repeat(32),
    server_seed_hash: hash,
  },
  result: {draw: 802, multiplier: 0, symbols: ['cherry', 'lemon', 'bar']},
} as CasinoBet;

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', {configurable: true, value: webcrypto});
  Object.defineProperty(globalThis, 'TextEncoder', {configurable: true, value: TextEncoder});
});

it('reproduces the independent backend slot vector and validates the observed pre-bet hash', async () => {
  await expect(verifyCasinoReceipt(bet, hash)).resolves.toContain('pre-bet commitment, result, and payout all match');
});

it('reproduces the independent roulette vector and verifies its selection payout', async () => {
  const roulette = {
    ...bet,
    game: 'roulette' as const,
    payout: 20,
    profit: 10,
    selection: {type: 'black'},
    result: {color: 'black', multiplier: 2, number: 20},
  };
  await expect(verifyCasinoReceipt(roulette, hash)).resolves.toContain('Verified:');
  await expect(verifyCasinoReceipt({...roulette, payout: 36}, hash)).rejects.toThrow('payout');
});

it('rejects a substituted commitment even if the receipt is internally self-consistent', async () => {
  await expect(verifyCasinoReceipt(bet, 'ff'.repeat(32))).rejects.toThrow('committed hash');
});

it('rejects altered outcomes and distinguishes receipts without a locally observed commitment', async () => {
  await expect(verifyCasinoReceipt({...bet, result: {...bet.result, draw: 9000}}, hash)).rejects.toThrow('outcome');
  await expect(verifyCasinoReceipt(bet)).resolves.toContain('not saved on this device');
});

it('reproduces independent backend slot vectors for rules v2, including its varied losing line', async () => {
  const loss = {...bet, rules_version: 2, result: {draw: 1640, multiplier: 0, symbols: ['diamond', 'cherry', 'lemon']}};
  await expect(verifyCasinoReceipt(loss, hash)).resolves.toContain('Verified:');
  await expect(
    verifyCasinoReceipt({...loss, result: {...loss.result, symbols: ['cherry', 'lemon', 'bar']}}, hash),
  ).rejects.toThrow('outcome');
  const win = {
    ...loss,
    fairness: {...loss.fairness, client_seed: 'v2-b'},
    payout: 20,
    profit: 10,
    result: {draw: 8368, multiplier: 2, symbols: ['lemon', 'lemon', 'lemon']},
  };
  await expect(verifyCasinoReceipt(win, hash)).resolves.toContain('Verified:');
  await expect(verifyCasinoReceipt({...win, rules_version: 3}, hash)).rejects.toThrow('unsupported rules version');
});
