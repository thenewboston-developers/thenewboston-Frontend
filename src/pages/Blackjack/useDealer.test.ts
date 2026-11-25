import {BlackjackBet} from 'types/casino';

import {EMPTY_VIEW, getNextStep, getSettledView, TableView} from './useDealer';

const open = {
  amount: 10,
  id: 5,
  result: {dealer_cards: ['9C', null], player_cards: ['10S', '6D']},
  status: 'open',
  total_stake: 10,
} as BlackjackBet;

const settle = (result: Partial<BlackjackBet['result']>, money: Partial<BlackjackBet> = {}) =>
  ({...open, ...money, result: {...open.result, ...result}, status: 'settled'}) as BlackjackBet;

// Plays every step the dealer takes and records what each one did
const play = (start: TableView, hand: BlackjackBet) => {
  const cues: (string | undefined)[] = [];
  let view = start;
  for (let count = 0; count < 40; count += 1) {
    const step = getNextStep(view, hand);
    if (!step) return {cues, view};
    cues.push(step.cue);
    view = step.view;
  }
  throw new Error('The dealer never finished the hand.');
};

it('deals player, dealer, player, then the hole card face down', () => {
  const views: TableView[] = [];
  let view = EMPTY_VIEW;
  for (let step = getNextStep(view, open); step; step = getNextStep(view, open)) {
    view = step.view;
    views.push(view);
  }
  expect(views.map(({dealer, player}) => [player.length, dealer.length])).toEqual([
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [2, 2],
  ]);
  expect(view).toMatchObject({dealer: ['9C', null], handId: 5, motion: true, player: ['10S', '6D'], revealed: false});
  expect(view.stage).toBe('play');
});

it('turns the hole card before the dealer draws, and shows the result last', () => {
  const dealt = play(EMPTY_VIEW, open).view;
  const stood = settle({dealer_cards: ['9C', '5H', 'KD']}, {payout: 20});
  const steps: TableView[] = [];
  let view = dealt;
  for (let step = getNextStep(view, stood); step; step = getNextStep(view, stood)) {
    view = step.view;
    steps.push(view);
  }
  expect(steps[0]).toMatchObject({dealer: ['9C', '5H'], revealed: false});
  expect(steps[1]).toMatchObject({dealer: ['9C', '5H', 'KD'], revealed: false});
  expect(steps[2]).toMatchObject({revealed: true, stage: 'payout'});
  expect(steps[3].stage).toBe('collect');
  expect(view).toMatchObject({revealed: true, round: dealt.round + 1, stage: 'idle'});
});

it('puts the second stake down before the one card of a double', () => {
  const dealt = play(EMPTY_VIEW, open).view;
  const doubled = settle({dealer_cards: ['9C', '10H'], player_cards: ['10S', '6D', '4C']}, {total_stake: 20});
  const first = getNextStep(dealt, doubled)!;
  expect(first).toMatchObject({cue: 'chips', view: {doubled: true, player: ['10S', '6D']}});
  expect(getNextStep(first.view, doubled)!.view.player).toEqual(['10S', '6D', '4C']);
});

it('sweeps the last hand away before dealing the next one', () => {
  const finished = play(play(EMPTY_VIEW, open).view, settle({dealer_cards: ['9C', '10H']})).view;
  const next = {...open, id: 6} as BlackjackBet;
  const sweep = getNextStep(finished, next)!;
  expect(sweep).toMatchObject({cue: 'clear', view: {clearing: true, handId: 5}});
  const start = getNextStep(sweep.view, next)!;
  expect(start.view).toMatchObject({clearing: false, dealer: [], handId: 6, player: [], revealed: false});
  expect(play(start.view, next).cues).toEqual(['card', 'card', 'card', 'card']);
});

it('deals a blackjack that was settled on the deal like any other hand', () => {
  const natural = settle({dealer_cards: ['9C', '7H'], player_cards: ['AS', 'KD']}, {payout: 25, total_stake: 10});
  const {cues, view} = play(EMPTY_VIEW, natural);
  expect(cues.slice(0, 6)).toEqual([undefined, 'card', 'card', 'card', 'card', 'flip']);
  expect(view).toMatchObject({dealer: ['9C', '7H'], player: ['AS', 'KD'], revealed: true, stage: 'idle'});
});

it('lays a restored hand on the table without dealing it', () => {
  expect(getSettledView(open, 2)).toMatchObject({
    dealer: ['9C', null],
    motion: false,
    player: ['10S', '6D'],
    revealed: false,
    round: 2,
    stage: 'play',
  });
  expect(getNextStep(getSettledView(open, 2), open)).toBeNull();
  expect(getSettledView(settle({dealer_cards: ['9C', '10H']}), 0)).toMatchObject({revealed: true, stage: 'idle'});
  expect(getNextStep(EMPTY_VIEW, null)).toBeNull();
});
