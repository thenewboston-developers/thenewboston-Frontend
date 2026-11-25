import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {mdiFlash, mdiFlashOff, mdiVolumeHigh, mdiVolumeOff} from '@mdi/js';
import Icon from '@mdi/react';

import FundControls from 'components/Casino/FundControls';
import useCasinoWager from 'components/Casino/useCasinoWager';
import {CasinoBet} from 'types/casino';

import Bank from '../Bank';
import Celebration, {Burst} from '../Celebration';
import Chip from '../Chip';
import Felt, {FeltFlash} from '../Felt';
import {prefersReducedMotion, useCountUp} from '../hooks';
import Spins from '../Spins';
import useSounds from '../useSounds';
import {
  CHIPS,
  describeNumber,
  describeSpot,
  formatTnb,
  getPocketColor,
  getSpot,
  getSpotLimit,
  isRouletteResult,
  selectionSpot,
  Spot,
  spotSelection,
} from '../utils';
import Wheel, {WheelHandle} from '../Wheel';

import * as S from './Styles';

export const QUICK_SPIN_STORAGE_KEY = 'thenewboston.roulette.quickSpin';

const FLASH_DURATION = 5200;
const GAME_NAMES: Record<string, string> = {roulette: 'Roulette', slots: 'Slots'};
const RECENT_COUNT = 12;
const SPIN_DURATION = {calm: 1200, full: 6400, quick: 2800};

const readQuickSpin = () => {
  try {
    return window.localStorage.getItem(QUICK_SPIN_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * The roulette table: the wheel, the betting layout, the chip rail and everything a spin goes through. A wager is
 * settled by the casino the moment it is accepted; the table then plays the spin, holding the balance and the history
 * as they were, and only shows the result once the ball has come to rest.
 */
const Table = () => {
  const [burst, setBurst] = useState<Burst | null>(null);
  const [chip, setChip] = useState(5);
  const [flashing, setFlashing] = useState(false);
  const [foreignBet, setForeignBet] = useState<CasinoBet | null>(null);
  const [heldBalance, setHeldBalance] = useState<number | null>(null);
  const [heldHistory, setHeldHistory] = useState<CasinoBet[] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [notice, setNotice] = useState('');
  const [outcome, setOutcome] = useState<(CasinoBet & {result: {number: number}}) | null>(null);
  const [quickSpin, setQuickSpin] = useState(readQuickSpin);
  const [spotId, setSpotId] = useState<string | null>(null);
  const balanceLoaded = useRef(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const live = useRef(true);
  const movedHintShown = useRef(false);
  const shownReceipt = useRef<string | null>(null);
  const spinLock = useRef(false);
  const wheel = useRef<WheelHandle>(null);
  const wheelFrame = useRef<HTMLDivElement>(null);
  const {soundEnabled, sounds, toggleSound} = useSounds();
  const spot = getSpot(spotId);
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
    stake,
    storageError,
    summary,
    wallet,
  } = useCasinoWager({
    gameId: 'roulette',
    selection: spot ? spotSelection(spot) : undefined,
    validSelection: !!spot,
  });
  // The wager is the stack of chips on the chosen spot: no spot, no wager
  const amount = spot && Number.isSafeInteger(stake) ? stake : 0;
  const balance = heldBalance ?? wallet?.balance ?? 0;
  const history = heldHistory ?? settledHistory;
  const isLocked = isSpinning || isSubmitting || !!pending;
  const shownBalance = useCountUp(balance, 700, balanceLoaded.current);
  const spotLimit = getSpotLimit(game, spot);
  const walletBalance = wallet?.balance;
  const winnings = useCountUp(outcome?.payout ?? 0, 900);

  const setAmount = useCallback((value: number) => setStake(String(value)), [setStake]);

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
      // The chips go back where the bet was, so the table always matches the result it is showing
      const betSpot = selectionSpot(bet.selection);
      if (betSpot) {
        setSpotId(betSpot.id);
        setAmount(bet.amount);
      }
      setOutcome(bet);
      setFlashing(true);
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashing(false), FLASH_DURATION);
      if (!celebrate) return;
      if (bet.payout > 0) {
        setBurst({id: bet.id, multiplier: bet.result.multiplier});
        sounds.win(bet.result.multiplier);
      } else {
        sounds.lose();
      }
    },
    [setAmount, sounds],
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

  const clearFlash = () => {
    clearTimeout(flashTimer.current);
    setFlashing(false);
  };

  // The most a spot can take right now: its casino limit, and no more than the wallet holds
  const getCap = (target: Spot | undefined) => {
    const limit = getSpotLimit(game, target);
    return Math.max(0, Math.min(limit || Number.MAX_SAFE_INTEGER, walletBalance ?? Number.MAX_SAFE_INTEGER));
  };

  const getCapMessage = (target: Spot) => {
    const limit = getSpotLimit(game, target);
    if (limit && (walletBalance === undefined || limit <= walletBalance)) {
      return `${describeSpot(target)} takes up to ${formatTnb(limit)} right now.`;
    }
    return walletBalance
      ? `That is all ${formatTnb(walletBalance)} in your wallet.`
      : 'Your wallet has no TNB to wager.';
  };

  const changeAmount = (next: number) => {
    if (isLocked || !spot) return;
    clearFlash();
    const cap = getCap(spot);
    const whole = Math.max(0, Math.floor(next));
    setAmount(Math.min(whole, cap));
    setNotice(whole > cap ? getCapMessage(spot) : '');
    if (!Math.min(whole, cap)) setSpotId(null);
  };

  const handleAmountInput = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 10);
    changeAmount(Number(digits));
  };

  const handleClear = () => {
    if (isLocked) return;
    clearFlash();
    setAmount(0);
    setNotice('');
    setSpotId(null);
  };

  const handlePlace = (target: Spot) => {
    if (isLocked) return;
    clearFlash();
    const cap = getCap(target);
    let message = '';
    let next = chip;
    if (target.id === spotId && amount > 0) {
      next = amount + chip;
    } else if (amount > 0) {
      next = amount;
      if (!movedHintShown.current) {
        message = `One bet per spin: your chips moved to ${describeSpot(target)}.`;
        movedHintShown.current = true;
      }
    }
    if (next > cap) {
      message = getCapMessage(target);
      next = cap;
    }
    setAmount(next);
    setNotice(message);
    setSpotId(next ? target.id : null);
    if (next) sounds.chip();
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

  const handleRemove = () => changeAmount(amount - chip);

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
    // Hold the balance and the history as they were, so nothing gives the result away before the ball lands
    // The stake leaves the balance at once; a wager being retried was already taken
    setHeldBalance(walletBalance === undefined ? null : walletBalance - (pending ? 0 : amount));
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
  else if (!spot || !amount) blocker = 'Place a chip on the table to play.';
  else if (spotLimit < minBet)
    blocker = 'The casino fund cannot cover the minimum wager for this selection. Please check back later.';
  else if (amount < minBet) blocker = `The minimum bet is ${formatTnb(minBet)}.`;
  else if (amount > spotLimit) blocker = `This bet is above the current limit of ${formatTnb(spotLimit)}.`;
  else if (!wallet) blocker = 'You need TNB in your wallet to play.';
  else if (amount > wallet.balance) blocker = 'Your TNB wallet does not have enough coins for this wager.';
  else if (storageError) blocker = 'Saved bet recovery is unavailable on this device.';

  const canSpin = isAuthenticated && !isLocked && !blocker && !!spot;

  const handleRetry = () => {
    if (isSpinning || isSubmitting) return;
    start(pending?.payload.game === 'roulette');
  };

  const handleSpin = () => {
    if (!canSpin || !spot) return;
    start(true);
  };

  let availability = 'Opening the table…';
  if (loadError) availability = 'Casino status unavailable';
  else if (summary && !summary.fund.enabled) availability = 'Casino closed';
  else if (game && !game.enabled) availability = 'Table closed';
  else if (game) availability = 'Table open';

  let flash: FeltFlash = null;
  if (flashing && outcome) flash = outcome.payout > 0 ? 'won' : 'lost';
  const lastBet = history.find((bet) => bet.game === 'roulette' && selectionSpot(bet.selection));
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
    let label = amount ? `Spin · ${formatTnb(amount)}` : 'Spin';
    if (isSpinning) label = 'No more bets';
    return (
      <S.Action>
        <S.SpinButton $spinning={isSpinning} disabled={!canSpin} onClick={handleSpin} type="button">
          {label}
        </S.SpinButton>
        <S.ActionNote>
          {!isSpinning && blocker
            ? blocker
            : spot && `Returns ${formatTnb(amount * spot.multiplier)} if ${describeSpot(spot)} hits`}
        </S.ActionNote>
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
    return (
      <S.Ribbon $tone="hint">
        {spot && amount
          ? `${describeSpot(spot)} returns ${spot.multiplier}× your bet. Tap again to add chips.`
          : 'Pick a chip, then tap the table to place your bet.'}
      </S.Ribbon>
    );
  };

  return (
    <>
      <S.Console aria-label="Roulette table" id="roulette-table" tabIndex={-1}>
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
              amount={amount}
              disabled={isLocked}
              flash={flash}
              onPlace={handlePlace}
              onRemove={handleRemove}
              payout={outcome?.payout ?? 0}
              spotId={spotId}
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
                    role="radio"
                    type="button"
                  >
                    <Chip amount={value} />
                  </S.RackChip>
                ))}
              </S.Rack>
              <S.Slip>
                <S.SlipHeader>
                  <S.SlipLabel>Your bet</S.SlipLabel>
                  <S.SlipSpot>{spot && amount ? describeSpot(spot) : 'No chips down'}</S.SlipSpot>
                </S.SlipHeader>
                <S.Stepper>
                  <S.StepButton
                    aria-label="Remove a chip"
                    disabled={isLocked || !amount}
                    onClick={handleRemove}
                    type="button"
                  >
                    −
                  </S.StepButton>
                  <S.AmountField htmlFor="roulette-bet-amount">
                    <S.AmountInput
                      aria-describedby="roulette-bet-limit"
                      aria-label="Wager in TNB"
                      disabled={isLocked || !spot}
                      id="roulette-bet-amount"
                      inputMode="numeric"
                      onChange={handleAmountInput}
                      type="text"
                      value={amount ? String(amount) : ''}
                    />
                    <span>TNB</span>
                  </S.AmountField>
                  <S.StepButton
                    aria-label="Add a chip"
                    disabled={isLocked || !spot}
                    onClick={() => changeAmount(amount + chip)}
                    type="button"
                  >
                    +
                  </S.StepButton>
                </S.Stepper>
                <S.Quick>
                  <S.QuickButton
                    disabled={isLocked || amount < 2}
                    onClick={() => changeAmount(Math.max(minBet, amount / 2))}
                    type="button"
                  >
                    ½
                  </S.QuickButton>
                  <S.QuickButton disabled={isLocked || !amount} onClick={() => changeAmount(amount * 2)} type="button">
                    2×
                  </S.QuickButton>
                  <S.QuickButton
                    disabled={isLocked || !spot || !spotLimit}
                    onClick={() => changeAmount(getCap(spot))}
                    type="button"
                  >
                    Max
                  </S.QuickButton>
                  <S.QuickButton disabled={isLocked || !amount} onClick={handleClear} type="button">
                    Clear
                  </S.QuickButton>
                  {!amount && lastBet && !isLocked && (
                    <S.QuickButton
                      onClick={() => {
                        const target = selectionSpot(lastBet.selection)!;
                        const cap = getCap(target);
                        setAmount(Math.min(lastBet.amount, cap));
                        setNotice('');
                        setSpotId(Math.min(lastBet.amount, cap) ? target.id : null);
                        sounds.chip();
                      }}
                      type="button"
                    >
                      Repeat last bet
                    </S.QuickButton>
                  )}
                </S.Quick>
                <S.SlipNote id="roulette-bet-limit">
                  {game && spot && `Minimum ${minBet.toLocaleString()} · Maximum ${spotLimit.toLocaleString()} TNB`}
                  {game && !spot && `Minimum ${minBet.toLocaleString()} TNB · limits depend on the bet`}
                  {!game && 'Loading bet limits…'}
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
    </>
  );
};

export default Table;
