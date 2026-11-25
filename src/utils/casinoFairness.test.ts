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

const plinko = {
  ...bet,
  game: 'plinko' as const,
  result: {draw: 366, path: [0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0], slot: 6, multiplier: 0},
};

it('reproduces the independent backend Plinko vector, including every bounce in order', async () => {
  await expect(verifyCasinoReceipt(plinko, hash)).resolves.toContain(
    'pre-bet commitment, result, and payout all match',
  );
  await expect(verifyCasinoReceipt(plinko)).resolves.toContain('not saved on this device');
});

// Generated separately with Python's hmac/hashlib over the published compact-JSON message, without game code.
it.each([
  {
    clientSeed: 'plinko-vector-30',
    draw: 1041,
    multiplier: 3,
    path: [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    slot: 3,
  },
  {
    clientSeed: 'plinko-vector-3052',
    draw: 0,
    multiplier: 50,
    path: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    slot: 0,
  },
  {
    clientSeed: 'plinko-vector-5646',
    draw: 4095,
    multiplier: 50,
    path: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    slot: 12,
  },
])('verifies the independent Plinko payout for pocket $slot', async ({clientSeed, draw, multiplier, path, slot}) => {
  const win = {
    ...plinko,
    fairness: {...plinko.fairness, client_seed: clientSeed},
    payout: plinko.amount * multiplier,
    profit: plinko.amount * multiplier - plinko.total_stake,
    result: {draw, multiplier, path, slot},
  };
  await expect(verifyCasinoReceipt(win, hash)).resolves.toContain('Verified:');
});

it.each([
  {field: 'draw', receipt: {...plinko, result: {...plinko.result, draw: 367}}},
  {
    field: 'bounce order with the same pocket',
    receipt: {...plinko, result: {...plinko.result, path: [...plinko.result.path].reverse()}},
  },
  {field: 'pocket', receipt: {...plinko, result: {...plinko.result, slot: 5}}},
  {field: 'multiplier', receipt: {...plinko, result: {...plinko.result, multiplier: 50}}},
  {field: 'payout', receipt: {...plinko, payout: 1, profit: -9}},
  {field: 'profit', receipt: {...plinko, profit: 0}},
  {field: 'selection', receipt: {...plinko, selection: {type: 'black'}}},
])('rejects a Plinko receipt with an altered $field', async ({receipt}) => {
  await expect(verifyCasinoReceipt(receipt, hash)).rejects.toThrow();
});

it('rejects unsupported Plinko rules and substituted pre-bet commitments', async () => {
  await expect(verifyCasinoReceipt({...plinko, rules_version: 2}, hash)).rejects.toThrow('unsupported rules version');
  await expect(verifyCasinoReceipt(plinko, 'ff'.repeat(32))).rejects.toThrow('committed hash');
});

it('reproduces independent backend roulette vectors for rules v2, where one spin settles several bets', async () => {
  const bets = [
    {amount: 4, type: 'red'},
    {amount: 3, type: 'black'},
    {amount: 2, type: 'dozen', value: 2},
    {amount: 1, type: 'number', value: 17},
  ];
  // 17 is black and in the second dozen: 3 x 2 + 2 x 3 + 1 x 36
  const table = {
    ...bet,
    game: 'roulette' as const,
    payout: 48,
    profit: 38,
    result: {color: 'black', number: 17, payout: 48} as CasinoBet['result'],
    rules_version: 2,
    selection: {bets},
  };
  await expect(verifyCasinoReceipt(table, hash)).resolves.toContain('Verified:');
  await expect(verifyCasinoReceipt({...table, payout: 84, profit: 74}, hash)).rejects.toThrow('payout');
  await expect(
    verifyCasinoReceipt({...table, result: {...table.result, payout: 12}, payout: 12, profit: 2}, hash),
  ).rejects.toThrow('payout');
  // Bets that do not add up to the wager, or a bet the table never had, cannot verify
  await expect(verifyCasinoReceipt({...table, selection: {bets: bets.slice(0, 3)}}, hash)).rejects.toThrow('payout');
  await expect(verifyCasinoReceipt({...table, selection: {bets: [{amount: 10, type: 'split'}]}}, hash)).rejects.toThrow(
    'roulette bets',
  );
  await expect(verifyCasinoReceipt({...table, selection: {type: 'black'}}, hash)).rejects.toThrow('roulette bets');
  // Only black wins on 4
  const small = {
    ...table,
    fairness: {...table.fairness, client_seed: 'v2-b'},
    payout: 6,
    profit: -4,
    result: {color: 'black', number: 4, payout: 6} as CasinoBet['result'],
  };
  await expect(verifyCasinoReceipt(small, hash)).resolves.toContain('Verified:');
});
