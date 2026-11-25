import {webcrypto} from 'crypto';
import {TextEncoder} from 'util';

import {BlackjackAction, BlackjackResult, CasinoBet} from 'types/casino';

import {verifyBlackjackReceipt} from './blackjackFairness';

const hash = '60e05bd1b195af2f94112fa7197a5c88289058840ce7c6df9693756bc6250f55';
// Fixed vectors generated independently in Python using the published deck order and HMAC algorithm.
const vectors: {
  actions: BlackjackAction[];
  dealer: string[];
  dealerTotal: number;
  multiplier: number;
  name: string;
  outcome: BlackjackResult['outcome'];
  player: string[];
  playerTotal: number;
  seed: string;
}[] = [
  {
    name: 'a 3:2 natural without drawing the dealer',
    seed: 'vector-29',
    player: ['AD', 'JC'],
    dealer: ['6H', '10S'],
    playerTotal: 21,
    dealerTotal: 16,
    actions: [],
    outcome: 'blackjack',
    multiplier: 2.5,
  },
  {
    name: 'a doubled win with a four-times-initial-stake return',
    seed: 'vector-1',
    player: ['6D', '2S', 'JS'],
    dealer: ['3H', '8H', '4S', '2C'],
    playerTotal: 18,
    dealerTotal: 17,
    actions: ['double'],
    outcome: 'win',
    multiplier: 4,
  },
  {
    name: 'a doubled push returning both stakes',
    seed: 'vector-15',
    player: ['4C', '6D', 'KC'],
    dealer: ['2C', '8D', 'QS'],
    playerTotal: 20,
    dealerTotal: 20,
    actions: ['double'],
    outcome: 'push',
    multiplier: 2,
  },
  {
    name: 'a player bust without unnecessary dealer cards',
    seed: 'vector-0',
    player: ['QH', 'JH', '7D'],
    dealer: ['QS', '6S'],
    playerTotal: 27,
    dealerTotal: 16,
    actions: ['hit'],
    outcome: 'loss',
    multiplier: 0,
  },
  {
    name: 'automatic dealer play when a hit reaches 21',
    seed: 'vector-25',
    player: ['4D', 'JD', '7S'],
    dealer: ['6H', '2S', 'JC'],
    playerTotal: 21,
    dealerTotal: 18,
    actions: ['hit'],
    outcome: 'win',
    multiplier: 2,
  },
  {
    name: 'the dealer standing on soft 17',
    seed: 'vector-67',
    player: ['KH', '8C'],
    dealer: ['6H', 'AH'],
    playerTotal: 18,
    dealerTotal: 17,
    actions: ['stand'],
    outcome: 'win',
    multiplier: 2,
  },
  {
    name: 'an ace changing from eleven to one over multiple hits',
    seed: 'vector-28',
    player: ['AD', '5C', '4H', '10C', 'JC'],
    dealer: ['6D', '7D'],
    playerTotal: 30,
    dealerTotal: 13,
    actions: ['hit', 'hit', 'hit'],
    outcome: 'loss',
    multiplier: 0,
  },
  {
    name: 'a push returning the original stake',
    seed: 'vector-39',
    player: ['AS', '9D'],
    dealer: ['JH', 'KD'],
    playerTotal: 20,
    dealerTotal: 20,
    actions: ['stand'],
    outcome: 'push',
    multiplier: 1,
  },
  {
    name: 'an immediate loss to a dealer natural',
    seed: 'vector-20',
    player: ['10H', '4C'],
    dealer: ['AS', 'QD'],
    playerTotal: 14,
    dealerTotal: 21,
    actions: [],
    outcome: 'loss',
    multiplier: 0,
  },
];

const makeBet = (vector = vectors[0]): CasinoBet => {
  const amount = 10;
  const payout = vector.multiplier * amount;
  const totalStake = amount * (vector.actions.includes('double') ? 2 : 1);
  return {
    amount,
    created_at: '2026-11-25T12:00:00Z',
    fund: {available: 100000, balance: 100000, currency: 'TNB', enabled: true, reserved: 0, risk_limit_bps: 100},
    game: 'blackjack',
    id: 1,
    payout,
    profit: payout - totalStake,
    request_id: '00000000-0000-0000-0000-000000000002',
    rules_version: 1,
    settled_at: '2026-11-25T12:01:00Z',
    status: 'settled',
    total_stake: totalStake,
    wallet_balance: 1000 - totalStake + payout,
    fairness: {
      algorithm: 'hmac-sha256-v1',
      client_seed: vector.seed,
      commitment_id: '00000000-0000-0000-0000-000000000001',
      server_seed: '00'.repeat(32),
      server_seed_hash: hash,
    },
    result: {
      actions: vector.actions,
      available_actions: [],
      dealer_cards: vector.dealer,
      dealer_total: vector.dealerTotal,
      expires_at: null,
      multiplier: vector.multiplier,
      outcome: vector.outcome,
      phase: 'settled',
      player_cards: vector.player,
      player_total: vector.playerTotal,
      revision: vector.actions.length,
    },
  };
};

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', {configurable: true, value: webcrypto});
  Object.defineProperty(globalThis, 'TextEncoder', {configurable: true, value: TextEncoder});
});

it.each(vectors)('replays $name from an independent deterministic vector', async (vector) => {
  await expect(verifyBlackjackReceipt(makeBet(vector), hash)).resolves.toContain('pre-bet commitment');
});

it('distinguishes history verification from a locally observed pre-bet commitment', async () => {
  await expect(verifyBlackjackReceipt(makeBet())).resolves.toContain('not saved on this device');
  await expect(verifyBlackjackReceipt(makeBet(), 'ff'.repeat(32))).rejects.toThrow('committed hash');
});

it('rejects an altered revealed seed and unsupported rules', async () => {
  const bet = makeBet();
  await expect(
    verifyBlackjackReceipt({...bet, fairness: {...bet.fairness, server_seed: '11'.repeat(32)}}, hash),
  ).rejects.toThrow('committed hash');
  await expect(verifyBlackjackReceipt({...bet, rules_version: 2}, hash)).rejects.toThrow('unsupported rules');
  await expect(verifyBlackjackReceipt({...bet, status: 'open'}, hash)).rejects.toThrow('not settled');
});

it('rejects changed cards, totals, results, and action revisions', async () => {
  const bet = makeBet(vectors[1]);
  const changes = [
    {dealer_cards: ['3H', '8H', '4S', '3C']},
    {player_cards: ['6D', '2S', 'QS']},
    {dealer_total: 18},
    {player_total: 19},
    {outcome: 'push' as const},
    {revision: 3},
  ];
  for (const change of changes) {
    // eslint-disable-next-line no-await-in-loop
    await expect(verifyBlackjackReceipt({...bet, result: {...bet.result, ...change}}, hash)).rejects.toThrow('outcome');
  }
});

it('checks stake, payout, profit, and multiplier independently', async () => {
  const bet = makeBet(vectors[1]);
  await expect(verifyBlackjackReceipt({...bet, total_stake: 10}, hash)).rejects.toThrow('payout');
  await expect(verifyBlackjackReceipt({...bet, payout: 20}, hash)).rejects.toThrow('payout');
  await expect(verifyBlackjackReceipt({...bet, profit: 30}, hash)).rejects.toThrow('payout');
  await expect(verifyBlackjackReceipt({...bet, result: {...bet.result, multiplier: 2}}, hash)).rejects.toThrow(
    'payout',
  );
});

it('rejects actions after a natural, doubling after a hit, and incomplete hands', async () => {
  const natural = makeBet();
  const aceHand = makeBet(vectors[6]);
  const double = makeBet(vectors[1]);
  await expect(
    verifyBlackjackReceipt({...natural, result: {...natural.result, actions: ['stand']}}, hash),
  ).rejects.toThrow('after the hand ended');
  await expect(
    verifyBlackjackReceipt({...aceHand, result: {...aceHand.result, actions: ['hit', 'double']}}, hash),
  ).rejects.toThrow('doubles after hitting');
  await expect(verifyBlackjackReceipt({...double, result: {...double.result, actions: []}}, hash)).rejects.toThrow(
    'does not complete',
  );
});

it('rejects invalid stakes and a missing transcript before replaying', async () => {
  const bet = makeBet();
  await expect(verifyBlackjackReceipt({...bet, amount: 3}, hash)).rejects.toThrow('invalid Blackjack wager');
  await expect(verifyBlackjackReceipt({...bet, amount: 0}, hash)).rejects.toThrow('invalid Blackjack wager');
  await expect(verifyBlackjackReceipt({...bet, result: {...bet.result, actions: undefined}}, hash)).rejects.toThrow(
    'action transcript',
  );
});
