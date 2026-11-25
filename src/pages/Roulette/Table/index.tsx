import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {mdiFlash, mdiFlashOff, mdiVolumeHigh, mdiVolumeOff} from '@mdi/js';
import Icon from '@mdi/react';

import FundControls from 'components/Casino/FundControls';
import useCasinoWager from 'components/Casino/useCasinoWager';
import {CasinoBet} from 'types/casino';

import Bank from '../Bank';
import Celebration, {Burst} from '../Celebration';
import Chip from '../Chip';
import Felt from '../Felt';
import {hasFinePointer, prefersReducedMotion, useCountUp} from '../hooks';
import Spins from '../Spins';
import useChipDrag, {DragSource} from '../useChipDrag';
import useSounds from '../useSounds';
import {
  Bets,
  betsSelection,
  CHIPS,
  describeBets,
  describeNumber,
  describeSpot,
  formatChip,
  formatTnb,
  getBestReturn,
  getExposure,
  getMovable,
  getPocketColor,
  getRiskCapacity,
  getRoom,
  getShortName,
  getSpot,
  getSpotLimit,
  getTotal,
  isRouletteResult,
  MAX_WAGER,
  selectionBets,
  Spot,
} from '../utils';
import Wheel, {WheelHandle} from '../Wheel';

import * as S from './Styles';

export const QUICK_SPIN_STORAGE_KEY = 'thenewboston.roulette.quickSpin';

const FLASH_DURATION = 5200;
const GAME_NAMES: Record<string, string> = {plinko: 'Plinko', roulette: 'Roulette', slots: 'Slots'};
const RECENT_COUNT = 12;
const SPIN_DURATION = {calm: 1200, full: 6400, quick: 2800};
const UNDO_DEPTH = 50;

const readQuickSpin = () => {
  try {
    return window.localStorage.getItem(QUICK_SPIN_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

const without = (bets: Bets, id: string): Bets =>
  Object.fromEntries(Object.entries(bets).filter(([key]) => key !== id));

/**
 * The roulette table: the wheel, the betting layout, the chip rail and everything a spin goes through. Chips can sit
 * on as many spots as the player likes; they are placed by tapping, or dragged from the rack and between spots. A
 * wager is settled by the casino the moment it is accepted; the table then plays the spin, holding the balance and
 * the history as they were, and only shows the result once the ball has come to rest.
 */
const Table = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [bets, setBets] = useState<Bets>({});
  const [burst, setBurst] = useState<Burst | null>(null);
  const [canDrag] = useState(hasFinePointer);
  const [chip, setChip] = useState(5);
  const [flashing, setFlashing] = useState(false);
  const [foreignBet, setForeignBet] = useState<CasinoBet | null>(null);
  const [heldBalance, setHeldBalance] = useState<number | null>(null);
  const [heldHistory, setHeldHistory] = useState<CasinoBet[] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  // One spin settles chips on several spots since rules version 2; an older ruleset takes a single spot
  const [multiple, setMultiple] = useState(true);
  const [notice, setNotice] = useState('');
  const [outcome, setOutcome] = useState<(CasinoBet & {result: {number: number}}) | null>(null);
  const [past, setPast] = useState<Bets[]>([]);
  const [quickSpin, setQuickSpin] = useState(readQuickSpin);
  const balanceLoaded = useRef(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const live = useRef(true);
  const movedHintShown = useRef(false);
  const shownReceipt = useRef<string | null>(null);
  const spinLock = useRef(false);
  const wheel = useRef<WheelHandle>(null);
  const wheelFrame = useRef<HTMLDivElement>(null);
  const {soundEnabled, sounds, toggleSound} = useSounds();
  const count = Object.keys(bets).length;
  const exposure = getExposure(bets);
  const total = getTotal(bets);
  const {
    error,
    game,
    handleFundSuccess,
    history: settledHistory,
    isAuthenticated,
    isSubmitting,
    loadError,
    minBet,
    pending,
    place,
    receipt,
    refresh,
    self,
    setAmount: setStake,
    storageError,
    summary,
    wallet,
  } = useCasinoWager({
    gameId: 'roulette',
    // A table of several bets is limited by its worst case, which this page checks itself before it lets a spin start
    maxBet: multiple ? MAX_WAGER : undefined,
    selection: betsSelection(bets, multiple),
    validSelection: multiple ? count > 0 : count === 1,
  });
  const active = activeId && bets[activeId] ? getSpot(activeId) : undefined;
  const balance = heldBalance ?? wallet?.balance ?? 0;
  const bestReturn = getBestReturn(bets);
  const capacity = getRiskCapacity(summary?.fund);
  const history = heldHistory ?? settledHistory;
  const isLocked = isSpinning || isSubmitting || !!pending;
  const shownBalance = useCountUp(balance, 700, balanceLoaded.current);
  const spotLimit = getSpotLimit(game, active);
  const walletBalance = wallet?.balance;
  const winnings = useCountUp(outcome?.payout ?? 0, 900);

  const clearFlash = () => {
    clearTimeout(flashTimer.current);
    setFlashing(false);
  };

  // Puts a new arrangement of chips on the table and keeps the old one for Undo
  const commit = (next: Bets, nextActiveId: string | null, message = '') => {
    clearFlash();
    setActiveId(nextActiveId && next[nextActiveId] ? nextActiveId : (Object.keys(next).pop() ?? null));
    setBets(next);
    setNotice(message);
    setPast((previous) => [...previous.slice(1 - UNDO_DEPTH), bets]);
    setStake(String(getTotal(next)));
  };

  // How many more chips a spot can take with the given chips already down: the casino's limit, then the wallet
  const getTableRoom = (target: Spot, table: Bets) => {
    if (!game) return MAX_WAGER - getTotal(table);
    const room = multiple ? getRoom(table, target, capacity) : getSpotLimit(game, target) - (table[target.id] ?? 0);
    return Math.max(0, Math.min(room, MAX_WAGER - getTotal(table)));
  };

  const getWalletRoom = (table: Bets) =>
    walletBalance === undefined ? Number.MAX_SAFE_INTEGER : Math.max(0, walletBalance - getTotal(table));

  const getLimitMessage = (target: Spot, table: Bets) => {
    const tableRoom = getTableRoom(target, table);
    if (getWalletRoom(table) <= tableRoom) {
      return walletBalance
        ? `That is all ${formatTnb(walletBalance)} in your wallet.`
        : 'Your wallet has no TNB to wager.';
    }
    const limit = (table[target.id] ?? 0) + tableRoom;
    return limit
      ? `${describeSpot(target)} takes up to ${formatTnb(limit)} right now.`
      : `The casino fund cannot cover a bet on ${describeSpot(target)} right now.`;
  };

  const getRoomFor = (target: Spot, table: Bets) => Math.min(getTableRoom(target, table), getWalletRoom(table));

  // Whether a whole arrangement fits the wallet and what the casino will risk
  const fits = (table: Bets) => {
    const tableTotal = getTotal(table);
    if (tableTotal > MAX_WAGER || (walletBalance !== undefined && tableTotal > walletBalance)) return false;
    if (!game) return true;
    if (multiple) return getExposure(table) <= capacity;
    return Object.entries(table).every(([id, amount]) => amount <= getSpotLimit(game, getSpot(id)));
  };

  const addChips = (target: Spot, value: number) => {
    if (isLocked) return;
    if (!multiple && count && !bets[target.id]) {
      // One bet per spin on this ruleset: the chips move to the new spot
      const moved = Math.min(total, getRoomFor(target, {}));
      let message = moved < total ? getLimitMessage(target, {}) : '';
      if (!message && !movedHintShown.current) {
        message = `One bet per spin: your chips moved to ${describeSpot(target)}.`;
        movedHintShown.current = true;
      }
      commit(moved ? {[target.id]: moved} : {}, target.id, message);
      if (moved) sounds.chip();
      return;
    }
    const added = Math.min(value, getRoomFor(target, bets));
    if (!added) {
      clearFlash();
      setNotice(getLimitMessage(target, bets));
      return;
    }
    const next = {...bets, [target.id]: (bets[target.id] ?? 0) + added};
    commit(next, target.id, added < value ? getLimitMessage(target, next) : '');
    sounds.chip();
  };

  // Lifts a stack onto another spot, as far as the table allows; what cannot move stays where it was
  const moveStack = (fromId: string, target: Spot) => {
    const amount = bets[fromId] ?? 0;
    const from = getSpot(fromId);
    if (!amount || !from) return;
    let moved = amount;
    if (game)
      moved = multiple ? getMovable(bets, from, target, capacity) : Math.min(amount, getSpotLimit(game, target));
    if (!moved) {
      clearFlash();
      setNotice(`${describeSpot(target)} cannot take those chips right now.`);
      return;
    }
    const others = multiple ? without(bets, fromId) : {};
    const next = {...others, [target.id]: (others[target.id] ?? 0) + moved};
    let message = '';
    if (moved < amount) {
      if (multiple) next[fromId] = amount - moved;
      message = multiple
        ? `Only ${formatTnb(moved)} could move to ${describeSpot(target)}. The rest stayed on ${describeSpot(from)}.`
        : getLimitMessage(target, next);
    }
    commit(next, target.id, message);
    sounds.chip();
  };

  const setSpotAmount = (target: Spot, amount: number) => {
    if (isLocked) return;
    const others = without(bets, target.id);
    const wanted = Math.max(0, Math.floor(amount));
    const value = Math.min(wanted, getRoomFor(target, others));
    // Rebuilt in place so the stack keeps its position among the bets
    const next = Object.fromEntries(
      Object.entries(bets).flatMap(([id, current]) => {
        if (id !== target.id) return [[id, current]];
        return value ? [[id, value]] : [];
      }),
    );
    commit(next, target.id, value < wanted ? getLimitMessage(target, {...others, [target.id]: value}) : '');
  };

  const handleDrop = (source: DragSource, spotId: string | null) => {
    const target = getSpot(spotId);
    if (source.fromId === null) {
      if (!target) return;
      setChip(source.value);
      addChips(target, source.value);
    } else if (!target) {
      // Let go off the table: the chips go back to the player
      const spot = getSpot(source.fromId);
      commit(without(bets, source.fromId), null, spot ? `Chips taken off ${describeSpot(spot)}.` : '');
    } else if (target.id !== source.fromId) {
      moveStack(source.fromId, target);
    }
  };

  const {consumeDrop, drag, dropId, ghost, pressChips} = useChipDrag({disabled: isLocked, onDrop: handleDrop});

  // On a phone the wheel sits above the betting layout: bring it into view for the spin
  const showWheel = () => {
    const frame = wheelFrame.current;
    if (!frame?.scrollIntoView) return;
    const {bottom, top} = frame.getBoundingClientRect();
    if (top >= 0 && bottom <= window.innerHeight) return;
    frame.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest'});
  };

  // A wager from another casino game that was waiting for confirmation: there is no spin to show, only its receipt
  const showForeignBet = (bet: CasinoBet) => {
    setForeignBet(bet);
    setNotice(`Your ${GAME_NAMES[bet.game] ?? bet.game} bet was confirmed: ${formatTnb(bet.payout)} returned.`);
  };

  const showOutcome = useCallback(
    (bet: CasinoBet & {result: {number: number}}, celebrate: boolean) => {
      // The chips go back where the bets were, so the table always matches the result it is showing
      const settled = selectionBets(bet.selection, bet.amount);
      if (Object.keys(settled).length) {
        setActiveId((current) => (current && settled[current] ? current : (Object.keys(settled).pop() ?? null)));
        setBets(settled);
        setStake(String(getTotal(settled)));
      }
      setOutcome(bet);
      setFlashing(true);
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashing(false), FLASH_DURATION);
      if (!celebrate) return;
      if (bet.payout > 0) {
        // How many times the whole wager came back decides how big the moment is
        const times = bet.payout / bet.amount;
        setBurst({id: bet.id, times});
        sounds.win(times);
      } else {
        sounds.lose();
      }
    },
    [setStake, sounds],
  );

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
      clearTimeout(flashTimer.current);
    };
  }, []);

  // The balance appears as soon as the wallet loads; only later changes roll
  useEffect(() => {
    if (walletBalance !== undefined) balanceLoaded.current = true;
  }, [walletBalance]);

  useEffect(() => {
    if (game) setMultiple(!!game.multiple_bets);
  }, [game]);

  // A bet that was confirmed while the page was closed arrives as a receipt nobody spun for: show where the ball
  // landed without replaying the spin
  useEffect(() => {
    if (!receipt || spinLock.current || receipt.request_id === shownReceipt.current) return;
    shownReceipt.current = receipt.request_id;
    if (isRouletteResult(receipt)) {
      wheel.current?.rest(receipt.result.number);
      showOutcome(receipt, false);
    } else {
      showForeignBet(receipt);
    }
  }, [receipt, showOutcome]);

  const handleAmountInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!active) return;
    setSpotAmount(active, Number(event.target.value.replace(/\D/g, '').slice(0, 10)));
  };

  const handleClear = () => {
    if (!isLocked) commit({}, null);
  };

  const handleDouble = () => {
    if (isLocked) return;
    const next = Object.fromEntries(Object.entries(bets).map(([id, amount]) => [id, amount * 2]));
    if (fits(next)) commit(next, activeId);
    else setNotice('Doubling these bets would pass your wallet or the table limit.');
  };

  const handleHalve = () => {
    if (isLocked) return;
    const next = Object.fromEntries(
      Object.entries(bets).flatMap(([id, amount]) => (amount > 1 ? [[id, Math.floor(amount / 2)]] : [])),
    );
    commit(next, activeId);
  };

  const handlePlace = (target: Spot) => {
    // The click that ends a drag is not a tap
    if (consumeDrop()) return;
    addChips(target, chip);
  };

  const handleQuickSpinToggle = () => {
    setQuickSpin((current) => {
      try {
        window.localStorage.setItem(QUICK_SPIN_STORAGE_KEY, String(!current));
      } catch {
        // The preference simply lasts for this visit
      }
      return !current;
    });
  };

  const handleRemove = (target: Spot) => setSpotAmount(target, (bets[target.id] ?? 0) - chip);

  const handleRepeat = (bet: CasinoBet) => {
    let last = selectionBets(bet.selection, bet.amount);
    if (!multiple) last = Object.fromEntries(Object.entries(last).slice(0, 1));
    if (fits(last)) {
      commit(last, null);
      sounds.chip();
    } else {
      setNotice('Your last bet no longer fits your wallet or the table limit.');
    }
  };

  const handleUndo = () => {
    if (isLocked || !past.length) return;
    const previous = past[past.length - 1];
    clearFlash();
    setActiveId((current) => (current && previous[current] ? current : (Object.keys(previous).pop() ?? null)));
    setBets(previous);
    setNotice('');
    setPast(past.slice(0, -1));
    setStake(String(getTotal(previous)));
  };

  // Plays a settled bet out on the wheel, then shows what it paid
  const present = async (bet: CasinoBet) => {
    if (!isRouletteResult(bet)) {
      wheel.current?.spinDown();
      setHeldBalance(null);
      setHeldHistory(null);
      setIsSpinning(false);
      showForeignBet(bet);
      return;
    }
    setHeldBalance(bet.wallet_balance - bet.payout);
    wheel.current?.spinUp();
    let duration = quickSpin ? SPIN_DURATION.quick : SPIN_DURATION.full;
    if (prefersReducedMotion()) duration = SPIN_DURATION.calm;
    await wheel.current?.throwBall(bet.result.number, duration);
    if (!live.current) return;
    sounds.land();
    showOutcome(bet, true);
    setHeldBalance(null);
    setHeldHistory(null);
    setIsSpinning(false);
  };

  // Sends the wager (or retries the one awaiting confirmation) and plays out whatever the casino settled
  const start = async (spinUp: boolean) => {
    if (spinLock.current) return;
    spinLock.current = true;
    clearFlash();
    setBurst(null);
    // Hold the balance and the history as they were, so nothing gives the result away before the ball lands. The
    // stake leaves the balance at once; a wager being retried was already taken.
    setHeldBalance(walletBalance === undefined ? null : walletBalance - (pending ? 0 : total));
    setHeldHistory(settledHistory);
    setIsSpinning(true);
    setNotice('');
    setOutcome(null);
    if (spinUp) {
      wheel.current?.spinUp();
      sounds.spin();
      showWheel();
    }
    const bet = await place();
    if (bet) shownReceipt.current = bet.request_id;
    spinLock.current = false;
    if (!live.current) return;
    if (!bet) {
      wheel.current?.spinDown();
      setHeldBalance(null);
      setHeldHistory(null);
      setIsSpinning(false);
      return;
    }
    await present(bet);
  };

  let blocker = '';
  if (loadError) blocker = 'Refresh the casino status before placing a bet.';
  else if (!summary || !game) blocker = 'Opening the table…';
  else if (!summary.fund.enabled) blocker = 'The casino is closed to new wagers.';
  else if (!game.enabled) blocker = 'Roulette is currently closed.';
  else if (!count) blocker = 'Place a chip on the table to play.';
  else if (!multiple && spotLimit < minBet)
    blocker = 'The casino fund cannot cover the minimum wager for this selection. Please check back later.';
  else if (total < minBet) blocker = `The minimum bet is ${formatTnb(minBet)}.`;
  else if (multiple && exposure > capacity)
    blocker = 'These bets are more than the casino fund can cover right now. Take some chips off.';
  else if (!multiple && total > spotLimit) blocker = `This bet is above the current limit of ${formatTnb(spotLimit)}.`;
  else if (!wallet) blocker = 'You need TNB in your wallet to play.';
  else if (total > wallet.balance) blocker = 'Your TNB wallet does not have enough coins for this wager.';
  else if (storageError) blocker = 'Saved bet recovery is unavailable on this device.';

  const canSpin = isAuthenticated && !isLocked && !blocker;

  const handleRetry = () => {
    if (isSpinning || isSubmitting) return;
    start(pending?.payload.game === 'roulette');
  };

  const handleSpin = () => {
    if (canSpin) start(true);
  };

  let availability = 'Opening the table…';
  if (loadError) availability = 'Casino status unavailable';
  else if (summary && !summary.fund.enabled) availability = 'Casino closed';
  else if (game && !game.enabled) availability = 'Table closed';
  else if (game) availability = 'Table open';

  const lastBet = history.find(
    (bet) => bet.game === 'roulette' && Object.keys(selectionBets(bet.selection, bet.amount)).length,
  );
  const recent = history.filter(isRouletteResult).slice(0, RECENT_COUNT);
  const resultColor = outcome ? getPocketColor(outcome.result.number) : null;

  const renderAction = () => {
    if (!isAuthenticated) {
      return (
        <S.Action>
          <S.ActionNote>Sign in to wager coins from your TNB wallet.</S.ActionNote>
          <S.AuthButtons />
        </S.Action>
      );
    }
    if (pending && !isSpinning) {
      return (
        <S.Action>
          <S.ActionNote>
            A {formatTnb(pending.payload.amount)} {pending.payload.game} bet is awaiting confirmation. Retrying uses the
            same wager, even after refreshing this page.
          </S.ActionNote>
          <S.SpinButton disabled={isSubmitting} onClick={handleRetry} type="button">
            {isSubmitting ? 'Checking your bet…' : 'Retry same bet'}
          </S.SpinButton>
        </S.Action>
      );
    }
    let label = total ? `Spin · ${formatTnb(total)}` : 'Spin';
    if (isSpinning) label = 'No more bets';
    let returns = '';
    if (count === 1) {
      const [only] = Object.keys(bets);
      returns = `Returns ${formatTnb(bestReturn)} if ${describeSpot(getSpot(only)!)} hits`;
    } else if (count) {
      returns = `Your best number returns ${formatTnb(bestReturn)}`;
    }
    return (
      <S.Action>
        <S.SpinButton $spinning={isSpinning} disabled={!canSpin} onClick={handleSpin} type="button">
          {label}
        </S.SpinButton>
        <S.ActionNote>{!isSpinning && blocker ? blocker : returns}</S.ActionNote>
      </S.Action>
    );
  };

  const renderRibbon = () => {
    if (isSpinning) {
      return (
        <S.Ribbon $tone="live">
          No more bets <S.Dots aria-hidden="true" />
        </S.Ribbon>
      );
    }
    if (outcome && flashing) {
      const landed = `${outcome.result.number} ${describeNumber(outcome.result.number).split(' · ')[0]}`;
      return outcome.payout > 0 ? (
        <S.Ribbon $tone="won">
          {landed} — you won {formatTnb(outcome.payout)}
        </S.Ribbon>
      ) : (
        <S.Ribbon $tone="lost">{landed} — no win this spin</S.Ribbon>
      );
    }
    if (notice) return <S.Ribbon $tone="note">{notice}</S.Ribbon>;
    let hint = 'Pick a chip, then tap the table to place your bet.';
    if (multiple) {
      hint = canDrag
        ? 'Pick a chip, then tap the table or drag the chip onto it. Cover as many spots as you like.'
        : 'Pick a chip, then tap the table. Cover as many spots as you like.';
    }
    if (count === 1 && active) {
      hint = `${describeSpot(active)} returns ${active.multiplier}× your bet. Tap again to add chips.`;
    } else if (count > 1) {
      hint = canDrag
        ? `${count} bets down for ${formatTnb(total)}. Drag a stack to move it, or off the table to take it back.`
        : `${count} bets down for ${formatTnb(total)}. Tap a spot to add chips, or a bet below to change it.`;
    }
    return <S.Ribbon $tone="hint">{hint}</S.Ribbon>;
  };

  return (
    <>
      <S.Console $dragging={!!drag} aria-label="Roulette table" id="roulette-table" tabIndex={-1}>
        <Celebration anchor={wheelFrame} burst={burst} />
        <S.Header>
          <div>
            <S.Eyebrow>Single-zero table</S.Eyebrow>
            <S.Title>Place your bets</S.Title>
          </div>
          <S.Tools>
            <S.Status $open={availability === 'Table open'} role="status">
              {availability}
            </S.Status>
            {isAuthenticated && (
              <S.Balance aria-label={`Wallet balance ${formatTnb(balance)}`}>
                <small>Balance</small>
                <strong>{wallet || heldBalance !== null ? shownBalance.toLocaleString() : '—'}</strong>
                <span>TNB</span>
              </S.Balance>
            )}
            <S.Toggle
              $active={quickSpin}
              aria-label="Quick spin"
              aria-pressed={quickSpin}
              onClick={handleQuickSpinToggle}
              title={quickSpin ? 'Quick spin is on' : 'Quick spin is off'}
              type="button"
            >
              <Icon aria-hidden path={quickSpin ? mdiFlash : mdiFlashOff} size="18px" />
            </S.Toggle>
            <S.Toggle
              $active={soundEnabled}
              aria-label="Table sounds"
              aria-pressed={soundEnabled}
              onClick={toggleSound}
              title={soundEnabled ? 'Sound is on' : 'Sound is off'}
              type="button"
            >
              <Icon aria-hidden path={soundEnabled ? mdiVolumeHigh : mdiVolumeOff} size="18px" />
            </S.Toggle>
          </S.Tools>
        </S.Header>
        <S.Play>
          <S.WheelColumn>
            <S.WheelFrame ref={wheelFrame}>
              <Wheel
                onFret={sounds.fret}
                onRoll={sounds.roll}
                ref={wheel}
                winning={outcome ? outcome.result.number : null}
              />
            </S.WheelFrame>
            <S.Result aria-busy={isSpinning} aria-label="Roulette result">
              <S.Plaque $color={resultColor} $spinning={isSpinning} key={outcome?.request_id ?? 'waiting'}>
                {outcome ? outcome.result.number : '?'}
              </S.Plaque>
              <S.ResultCopy>
                {outcome ? (
                  <>
                    <strong>{describeNumber(outcome.result.number)}</strong>
                    <span>
                      {outcome.payout > 0
                        ? `${winnings.toLocaleString()} TNB returned`
                        : `No payout this round · ${formatTnb(outcome.amount)} staked`}
                    </span>
                  </>
                ) : (
                  <>
                    <strong>{isSpinning ? 'The ball is rolling' : '37 pockets. One ball.'}</strong>
                    <span>{isSpinning ? 'Your wager is locked in.' : 'Your result shows here.'}</span>
                  </>
                )}
              </S.ResultCopy>
            </S.Result>
            <S.Recent aria-label="Your recent results">
              {recent.length ? (
                recent.map((bet, index) => (
                  <S.RecentNumber
                    $color={getPocketColor(bet.result.number)}
                    $latest={index === 0}
                    key={bet.request_id}
                    title={describeNumber(bet.result.number)}
                  >
                    {bet.result.number}
                  </S.RecentNumber>
                ))
              ) : (
                <S.RecentEmpty>Your last numbers line up here.</S.RecentEmpty>
              )}
            </S.Recent>
          </S.WheelColumn>
          <S.FeltColumn>
            <S.RibbonSlot aria-live="polite" role="status">
              {renderRibbon()}
            </S.RibbonSlot>
            <Felt
              activeId={activeId}
              bets={bets}
              disabled={isLocked}
              dragFromId={drag?.fromId ?? null}
              dropId={dropId}
              onPlace={handlePlace}
              onRemove={handleRemove}
              onStackPress={(event, target) => pressChips(event, {fromId: target.id, value: bets[target.id] ?? 0})}
              winning={flashing && outcome ? outcome.result.number : null}
            />
            <S.Rail>
              <S.Rack aria-label="Chip value" role="radiogroup">
                {CHIPS.map(({value}) => (
                  <S.RackChip
                    $selected={chip === value}
                    aria-checked={chip === value}
                    aria-label={`${value.toLocaleString()} TNB chip`}
                    key={value}
                    onClick={() => setChip(value)}
                    onPointerDown={(event) => pressChips(event, {fromId: null, value})}
                    role="radio"
                    type="button"
                  >
                    <Chip amount={value} />
                  </S.RackChip>
                ))}
              </S.Rack>
              <S.Slip>
                <S.SlipHeader>
                  <S.SlipLabel>{multiple ? 'Your bets' : 'Your bet'}</S.SlipLabel>
                  <S.SlipSpot>
                    {count > 1 ? `${describeBets(bets)} · ${formatTnb(total)}` : null}
                    {count === 1 ? describeBets(bets) : null}
                    {count ? null : 'No chips down'}
                  </S.SlipSpot>
                </S.SlipHeader>
                {count > 0 && (
                  <S.BetList aria-label="Chips on the table">
                    {Object.entries(bets).map(([id, amount]) => {
                      const item = getSpot(id)!;
                      return (
                        <S.BetPill $active={id === activeId} key={id}>
                          <button
                            aria-label={`${describeSpot(item)}, ${formatTnb(amount)}`}
                            aria-pressed={id === activeId}
                            disabled={isLocked}
                            onClick={() => setActiveId(id)}
                            type="button"
                          >
                            {getShortName(item)} <strong>{formatChip(amount)}</strong>
                          </button>
                          <button
                            aria-label={`Take the chips off ${describeSpot(item)}`}
                            disabled={isLocked}
                            onClick={() => setSpotAmount(item, 0)}
                            type="button"
                          >
                            ×
                          </button>
                        </S.BetPill>
                      );
                    })}
                  </S.BetList>
                )}
                <S.Stepper>
                  <S.StepButton
                    aria-label="Remove a chip"
                    disabled={isLocked || !active}
                    onClick={() => active && handleRemove(active)}
                    type="button"
                  >
                    −
                  </S.StepButton>
                  <S.AmountField htmlFor="roulette-bet-amount">
                    <S.AmountInput
                      aria-describedby="roulette-bet-limit"
                      aria-label={
                        active ? `Chips on ${describeSpot(active)}, in TNB` : 'Chips on the selected spot, in TNB'
                      }
                      disabled={isLocked || !active}
                      id="roulette-bet-amount"
                      inputMode="numeric"
                      onChange={handleAmountInput}
                      type="text"
                      value={active ? String(bets[active.id]) : ''}
                    />
                    <span>TNB</span>
                  </S.AmountField>
                  <S.StepButton
                    aria-label="Add a chip"
                    disabled={isLocked || !active}
                    onClick={() => active && addChips(active, chip)}
                    type="button"
                  >
                    +
                  </S.StepButton>
                </S.Stepper>
                <S.Quick>
                  <S.QuickButton disabled={isLocked || total < 2} onClick={handleHalve} type="button">
                    ½
                  </S.QuickButton>
                  <S.QuickButton disabled={isLocked || !count} onClick={handleDouble} type="button">
                    2×
                  </S.QuickButton>
                  <S.QuickButton disabled={isLocked || !past.length} onClick={handleUndo} type="button">
                    Undo
                  </S.QuickButton>
                  <S.QuickButton disabled={isLocked || !count} onClick={handleClear} type="button">
                    Clear
                  </S.QuickButton>
                  {!count && lastBet && !isLocked && (
                    <S.QuickButton onClick={() => handleRepeat(lastBet)} type="button">
                      Repeat last bet
                    </S.QuickButton>
                  )}
                </S.Quick>
                <S.SlipNote id="roulette-bet-limit">
                  {!game && 'Loading bet limits…'}
                  {game &&
                    !multiple &&
                    active &&
                    `Minimum ${minBet.toLocaleString()} · Maximum ${spotLimit.toLocaleString()} TNB`}
                  {game &&
                    multiple &&
                    active &&
                    `${describeSpot(active)} · room for ${getRoomFor(active, bets).toLocaleString()} TNB more`}
                  {game &&
                    !active &&
                    `Minimum ${minBet.toLocaleString()} TNB · limits depend on ${multiple ? 'your bets' : 'the bet'}`}
                </S.SlipNote>
              </S.Slip>
              <S.RailAction>{renderAction()}</S.RailAction>
            </S.Rail>
            {error && <S.Error role="alert">{error}</S.Error>}
            {loadError && (
              <S.GhostButton onClick={refresh} type="button">
                Refresh casino status
              </S.GhostButton>
            )}
          </S.FeltColumn>
        </S.Play>
        <S.Dock>{renderAction()}</S.Dock>
      </S.Console>
      <S.Panels>
        <Spins
          bets={history.filter((bet) => bet.game === 'roulette' || bet.request_id === foreignBet?.request_id)}
          focusId={foreignBet?.request_id ?? null}
          isAuthenticated={isAuthenticated}
          userId={self.id}
        />
        <Bank game={game} summary={summary} />
      </S.Panels>
      {summary?.can_manage && self.id && (
        <S.Admin>
          <FundControls onSuccess={handleFundSuccess} userId={self.id} />
        </S.Admin>
      )}
      {createPortal(
        <S.Ghost $active={!!drag} aria-hidden="true" ref={ghost}>
          {drag && <Chip amount={drag.value} stacked={drag.fromId !== null} />}
        </S.Ghost>,
        document.body,
      )}
    </>
  );
};

export default Table;
