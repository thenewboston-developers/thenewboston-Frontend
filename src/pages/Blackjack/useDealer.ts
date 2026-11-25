import {RefObject, useEffect, useRef, useState} from 'react';

import {BlackjackBet} from 'types/casino';

import {prefersReducedMotion} from './hooks';

// Where the chips of a hand are: waiting in the circle, in play, being paid, or on their way off the table
export type ChipStage = 'collect' | 'idle' | 'payout' | 'play';

export type DealerCue = 'card' | 'chips' | 'clear' | 'collect' | 'flip';

export interface TableView {
  // The last hand's cards are being swept to the discard tray
  clearing: boolean;
  // `null` is the hole card, still face down
  dealer: (string | null)[];
  doubled: boolean;
  handId: number | null;
  // Cards placed from here on are dealt from the shoe; a hand restored on page load simply lies on the felt
  motion: boolean;
  player: string[];
  // The result is on the table: the banner, the final totals and the chips being settled
  revealed: boolean;
  // Counts the wagers that have left the circle, so the next one drops in as a new stack
  round: number;
  stage: ChipStage;
}

interface DealerStep {
  cue?: DealerCue;
  duration: number;
  view: TableView;
}

interface UseDealerProps {
  hand: BlackjackBet | null;
  // Set once the player has dealt or moved during this visit: from then on the table plays every step
  live: RefObject<boolean>;
  onCue(cue: DealerCue): void;
  // Shortens every step: 1 is the normal pace
  speed: number;
}

export const EMPTY_VIEW: TableView = {
  clearing: false,
  dealer: [],
  doubled: false,
  handId: null,
  motion: false,
  player: [],
  revealed: false,
  round: 0,
  stage: 'idle',
};

const DURATION = {
  card: 340,
  chips: 300,
  clear: 400,
  collect: 620,
  draw: 640,
  flip: 660,
  // How long the result stands before the chips move: a win is paid first, a lost wager is simply taken
  lost: 380,
  payout: 880,
  start: 60,
};

const isDoubled = (hand: BlackjackBet) => hand.total_stake > hand.amount;

// The whole hand at once, for a hand restored on page load and for players who prefer reduced motion
export const getSettledView = (hand: BlackjackBet, round: number): TableView => ({
  clearing: false,
  dealer: hand.result.dealer_cards,
  doubled: isDoubled(hand),
  handId: hand.id,
  motion: false,
  player: hand.result.player_cards,
  revealed: hand.status === 'settled',
  round,
  stage: hand.status === 'settled' ? 'idle' : 'play',
});

const isSameView = (first: TableView, second: TableView): boolean =>
  first.clearing === second.clearing &&
  first.doubled === second.doubled &&
  first.handId === second.handId &&
  first.revealed === second.revealed &&
  first.stage === second.stage &&
  first.dealer.join() === second.dealer.join() &&
  first.player.join() === second.player.join();

/**
 * The next thing the dealer does to bring the table in line with the hand the casino returned: one card, one turn of
 * the hole card, one movement of chips. `null` once the table shows everything the hand holds.
 */
export const getNextStep = (view: TableView, hand: BlackjackBet | null): DealerStep | null => {
  if (!hand) return null;
  const {dealer_cards: dealerCards, player_cards: playerCards} = hand.result;
  const settled = hand.status === 'settled';
  if (view.handId !== hand.id) {
    const leaving = view.stage === 'collect' || view.stage === 'payout';
    const round = leaving ? view.round + 1 : view.round;
    if (!view.clearing && (view.dealer.length > 0 || view.player.length > 0))
      return {
        cue: 'clear',
        duration: DURATION.clear,
        view: {...view, clearing: true, motion: true, round, stage: 'idle'},
      };
    return {duration: DURATION.start, view: {...EMPTY_VIEW, handId: hand.id, motion: true, round, stage: 'play'}};
  }
  const live = {...view, motion: true};
  // Player, dealer, player, and the dealer's hole card face down
  if (view.player.length < 1) return {cue: 'card', duration: DURATION.card, view: {...live, player: [playerCards[0]]}};
  if (view.dealer.length < 1) return {cue: 'card', duration: DURATION.card, view: {...live, dealer: [dealerCards[0]]}};
  if (view.player.length < 2)
    return {cue: 'card', duration: DURATION.card, view: {...live, player: playerCards.slice(0, 2)}};
  if (view.dealer.length < 2)
    return {cue: 'card', duration: DURATION.card + 120, view: {...live, dealer: [dealerCards[0], null]}};
  if (isDoubled(hand) && !view.doubled) return {cue: 'chips', duration: DURATION.chips, view: {...live, doubled: true}};
  if (view.player.length < playerCards.length)
    return {
      cue: 'card',
      duration: DURATION.card + 80,
      view: {...live, player: playerCards.slice(0, view.player.length + 1)},
    };
  if (settled && view.dealer[1] === null)
    return {cue: 'flip', duration: DURATION.flip, view: {...live, dealer: dealerCards.slice(0, 2)}};
  if (settled && view.dealer.length < dealerCards.length)
    return {
      cue: 'card',
      duration: DURATION.draw,
      view: {...live, dealer: dealerCards.slice(0, view.dealer.length + 1)},
    };
  if (settled && !view.revealed)
    return {
      duration: hand.profit > 0 ? DURATION.payout : DURATION.lost,
      view: {...live, revealed: true, stage: 'payout'},
    };
  if (view.stage === 'payout') return {cue: 'collect', duration: DURATION.collect, view: {...live, stage: 'collect'}};
  if (view.stage === 'collect') return {duration: 0, view: {...live, round: view.round + 1, stage: 'idle'}};
  return null;
};

/**
 * The dealer's hands. The casino answers a deal or a move with the whole hand at once; this plays it onto the table
 * one step at a time, so cards leave the shoe in order, the hole card turns before the dealer draws, and the result
 * only shows once the last card is down.
 */
const useDealer = ({hand, live, onCue, speed}: UseDealerProps) => {
  const [isStepping, setIsStepping] = useState(false);
  const [tick, setTick] = useState(0);
  const [view, setView] = useState<TableView>(EMPTY_VIEW);
  const cue = useRef(onCue);
  const pace = useRef(speed);
  const stepping = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  cue.current = onCue;
  pace.current = speed;

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      stepping.current = false;
    },
    [],
  );

  useEffect(() => {
    if (stepping.current || !hand) return;
    if (prefersReducedMotion() || (!live.current && view.handId !== hand.id)) {
      // A wager that has just been settled leaves the circle
      const leaves = hand.status === 'settled' && !(view.handId === hand.id && view.revealed);
      const settled = getSettledView(hand, leaves ? view.round + 1 : view.round);
      if (!isSameView(view, settled)) setView(settled);
      return;
    }
    const step = getNextStep(view, hand);
    if (!step) return;
    stepping.current = true;
    setIsStepping(true);
    setView(step.view);
    if (step.cue) cue.current(step.cue);
    timer.current = setTimeout(() => {
      stepping.current = false;
      setIsStepping(false);
      setTick((value) => value + 1);
    }, step.duration * pace.current);
  }, [hand, live, tick, view]);

  const shown = !!hand && view.handId === hand.id;
  // Every card the hand holds is on the felt and, for a finished hand, its result is showing
  const isCurrent =
    shown &&
    !view.clearing &&
    view.player.length === hand.result.player_cards.length &&
    view.dealer.length === hand.result.dealer_cards.length &&
    view.dealer[1] === hand.result.dealer_cards[1] &&
    view.doubled === isDoubled(hand) &&
    (hand.status === 'open' || view.revealed);

  return {isCurrent, isStepping, view};
};

export default useDealer;
