import {CSSProperties, FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import {ShieldCheck, Volume2, VolumeX} from 'lucide-react';

import FundControls from 'components/Casino/FundControls';
import CasinoSession from 'components/Casino/Session';
import useCasinoWager from 'components/Casino/useCasinoWager';
import {CasinoBet} from 'types/casino';

import {CoinCanvas, CoinCanvasHandle, WinBanner} from '../Celebration';
import History from '../History';
import * as P from '../Panel';
import Paytable from '../Paytable';
import ReceiptPanel from '../ReceiptPanel';
import Reels, {ReelsHandle} from '../Reels';
import {SlotSymbol, SymbolDefs} from '../Symbols';
import useCountUp from '../useCountUp';
import useMotion from '../useMotion';
import useSlotSounds, {SlotSound} from '../useSlotSounds';
import {
  addToSession,
  betChips,
  buildReelColumns,
  describeBet,
  IDLE_LINE,
  receiptLine,
  SessionTotals,
  signOf,
  SlotSymbolId,
  stepBet,
  SYMBOL_DETAILS,
  WinTier,
  winTier,
} from '../utils';

import * as S from './Styles';

const BULBS = Array.from({length: 22}, (_, index) => index);
const ROULETTE_PATH = '/roulette/home';
const SLOTS_PATH = '/slots/home';

const WIN_SOUNDS: Partial<Record<WinTier, SlotSound>> = {
  big: 'big',
  huge: 'big',
  jackpot: 'jackpot',
  nice: 'nice',
  win: 'win',
};

interface MeterProps {
  animate: boolean;
  label: string;
  lit?: boolean;
  value: number | null;
}

const Meter = ({animate, label, lit, value}: MeterProps) => {
  const shown = useCountUp(value ?? 0, 900, animate);
  return (
    <S.Meter data-lit={lit || undefined}>
      <span>{label}</span>
      <strong>
        {value === null ? '—' : shown.toLocaleString()}
        {value !== null && <small>TNB</small>}
      </strong>
    </S.Meter>
  );
};

const SlotsGame = () => {
  const [anticipating, setAnticipating] = useState(false);
  const [banner, setBanner] = useState<CasinoBet | null>(null);
  const [heldBalance, setHeldBalance] = useState<number | null>(null);
  const [initialColumns] = useState(() => buildReelColumns(IDLE_LINE, 'idle'));
  const [line, setLine] = useState<SlotSymbolId[]>(IDLE_LINE);
  const [revealed, setRevealed] = useState<CasinoBet | null>(null);
  const [selected, setSelected] = useState<CasinoBet | null>(null);
  const [session, setSession] = useState<SessionTotals>({returned: 0, spins: 0, wagered: 0});
  const [settledIds, setSettledIds] = useState<string[] | null>(null);
  const [spinning, setSpinning] = useState(false);
  const {
    amount,
    availability,
    available,
    canPlace,
    error,
    game,
    handleFundSuccess,
    history,
    isAuthenticated,
    loadError,
    maxBet,
    minBet,
    pending,
    place,
    receipt,
    refresh,
    self,
    setAmount,
    stake,
    summary,
    unavailableMessage,
    wallet,
  } = useCasinoWager({gameId: 'slots'});
  const animate = useMotion();
  const anticipation = useRef(false);
  const cabinet = useRef<HTMLDivElement>(null);
  const coins = useRef<CoinCanvasHandle>(null);
  const inFlight = useRef(false);
  const live = useRef(true);
  const reels = useRef<ReelsHandle>(null);
  const reelsBox = useRef<HTMLDivElement>(null);
  const {playSound, soundEnabled, toggleSound, unlockSound} = useSlotSounds();
  const chips = betChips(minBet, maxBet);
  // Win effects belong to slots spins only; a recovered roulette bet just reports its result.
  const tier = revealed?.game === 'slots' ? winTier(revealed.result.multiplier) : null;
  const validStake = Number.isSafeInteger(stake) && stake > 0;
  const won = !!tier && tier !== 'loss' && tier !== 'push';

  const handleReelLand = useCallback(
    (reel: number) => {
      playSound('stop');
      if (!anticipation.current) return;
      if (reel === 1) {
        setAnticipating(true);
        playSound('anticipation');
      }
      if (reel === 2) setAnticipating(false);
    },
    [playSound],
  );

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  // A receipt that arrives without a spin on screen (recovered after a reload) is shown as it stands.
  useEffect(() => {
    if (!receipt || inFlight.current) return;
    const symbols = receiptLine(receipt);
    if (symbols) {
      reels.current?.set(buildReelColumns(symbols, receipt.request_id));
      reels.current?.highlight(winTier(receipt.result.multiplier) !== 'loss');
      setLine(symbols);
    }
    setRevealed(receipt);
  }, [receipt]);

  const celebrate = (bet: CasinoBet) => {
    const betTier = winTier(bet.result.multiplier);
    if (betTier === 'loss') return;
    reels.current?.highlight(true);
    if (betTier === 'push') {
      playSound('push');
      return;
    }
    playSound(WIN_SOUNDS[betTier]!);
    setBanner(bet);
    const box = reelsBox.current?.getBoundingClientRect();
    const frame = cabinet.current?.getBoundingClientRect();
    if (animate && box && frame) {
      coins.current?.burst(betTier, {
        x: box.left - frame.left + box.width / 2,
        y: box.top - frame.top + box.height / 2,
      });
    }
  };

  const handleBetChoice = (value: number) => {
    setAmount(String(value));
    playSound('click');
  };

  const handleSpin = async (event?: FormEvent) => {
    event?.preventDefault();
    if (inFlight.current || (!pending && !canPlace)) return;
    // Retrying a pending roulette bet from this page settles it without pretending the reels decide it.
    const spinsReels = !pending || pending.payload.game === 'slots';
    inFlight.current = true;
    unlockSound();
    setBanner(null);
    setRevealed(null);
    setSpinning(true);
    if (spinsReels) {
      playSound('spin');
      coins.current?.clear();
      reels.current?.highlight(false);
      // Hold the history and balance as they were, so nothing gives the result away before the reels stop.
      setSettledIds(history.map((bet) => bet.request_id));
      if (wallet) setHeldBalance(pending ? wallet.balance : wallet.balance - stake);
      reels.current?.start();
    }
    const bet = await place();
    if (!live.current) return;
    const symbols = receiptLine(bet);
    if (spinsReels) {
      anticipation.current = !!symbols && bet!.result.multiplier >= 10;
      await reels.current?.stop(buildReelColumns(symbols ?? line, bet?.request_id ?? String(Date.now())), {
        anticipation: anticipation.current,
      });
      if (!live.current) return;
    }
    inFlight.current = false;
    anticipation.current = false;
    setAnticipating(false);
    setHeldBalance(null);
    setSettledIds(null);
    setSpinning(false);
    if (!bet) return;
    setRevealed(bet);
    if (!symbols) return;
    setLine(symbols);
    setSession((totals) => addToSession(totals, bet));
    celebrate(bet);
  };

  const balance = heldBalance ?? wallet?.balance ?? null;
  const betShown = pending ? pending.payload.amount : stake;
  const net = session.returned - session.wagered;
  const slotsHistory = history.filter(
    (bet) => bet.game === 'slots' && (!settledIds || settledIds.includes(bet.request_id)),
  );
  const stakeText = `${validStake ? stake.toLocaleString() : '—'} TNB`;
  const topPrize = validStake ? stake * (game?.max_multiplier ?? 100) : null;
  let reelsResult: string | undefined;
  if (!spinning && tier && tier !== 'loss') reelsResult = tier === 'push' ? 'push' : 'win';
  let state = 'idle';
  if (spinning) state = 'spinning';
  else if (tier === 'jackpot') state = 'jackpot';
  else if (won) state = 'win';

  return (
    <S.Page>
      <SymbolDefs />
      <S.BackLink to="/games">← All games</S.BackLink>
      <S.Header>
        <div>
          <S.Eyebrow>THE THENEWBOSTON CASINO</S.Eyebrow>
          <S.Title>Slots</S.Title>
        </div>
        <S.HeaderSide>
          <S.Tabs aria-label="Casino games">
            <S.Tab to={SLOTS_PATH}>Slots</S.Tab>
            <S.Tab to={ROULETTE_PATH}>Roulette</S.Tab>
          </S.Tabs>
          <S.Status data-available={available || undefined} role="status">
            {availability}
          </S.Status>
        </S.HeaderSide>
      </S.Header>

      <S.Floor data-state={state}>
        <S.FloorGrid>
          <S.MachineColumn>
            <S.Sunburst aria-hidden="true" />
            <S.Cabinet data-state={state} ref={cabinet}>
              <S.Bulbs aria-hidden="true">
                {BULBS.map((bulb) => (
                  <S.Bulb key={bulb} style={{'--i': bulb} as CSSProperties} />
                ))}
              </S.Bulbs>
              <S.Marquee data-celebrating={banner ? '' : undefined}>
                <S.MarqueeTitle>
                  <SlotSymbol symbol="seven" />
                  <span>Slots</span>
                  <SlotSymbol symbol="seven" />
                </S.MarqueeTitle>
                <S.MarqueeTag>CLASSIC SLOTS · UP TO {game?.max_multiplier ?? 100}×</S.MarqueeTag>
                {banner && (
                  <WinBanner animate={animate} bet={banner} key={banner.request_id} onDone={() => setBanner(null)} />
                )}
              </S.Marquee>

              <S.ReelsFrame aria-busy={spinning} aria-label="Slot reels" ref={reelsBox}>
                <S.Marker $side="left" aria-hidden="true" />
                <Reels
                  animate={animate}
                  anticipating={anticipating}
                  initialColumns={initialColumns}
                  label={`Payline: ${line.map((symbol) => SYMBOL_DETAILS[symbol].name).join(', ')}`}
                  onLand={handleReelLand}
                  ref={reels}
                  result={reelsResult}
                />
                <S.Marker $side="right" aria-hidden="true" />
              </S.ReelsFrame>

              <S.Meters>
                <Meter animate={animate} label="Balance" value={isAuthenticated ? balance : null} />
                <Meter
                  animate={false}
                  label="Bet"
                  value={Number.isSafeInteger(betShown) && betShown > 0 ? betShown : null}
                />
                <Meter
                  animate={animate}
                  label="Paid"
                  lit={won}
                  value={isAuthenticated ? (revealed?.payout ?? 0) : null}
                />
              </S.Meters>

              {!isAuthenticated && (
                <S.SignIn>
                  <p>Sign in to wager coins from your TNB wallet.</p>
                  <S.AuthButtons />
                </S.SignIn>
              )}

              {isAuthenticated && pending && (
                <S.Pending>
                  <p>
                    A {pending.payload.amount.toLocaleString()} TNB {pending.payload.game} bet is awaiting confirmation.
                    Retrying uses the same wager, even after refreshing this page.
                  </p>
                  <S.RetryButton disabled={spinning} onClick={() => handleSpin()} type="button">
                    {spinning ? 'Checking your bet…' : 'Retry same bet'}
                  </S.RetryButton>
                </S.Pending>
              )}

              {isAuthenticated && !pending && (
                <S.Controls onSubmit={handleSpin}>
                  <S.BetBox>
                    <S.BetHeader>
                      <label htmlFor="casino-bet-amount">Bet</label>
                      <span id="casino-bet-limit">
                        {game
                          ? `Minimum ${minBet.toLocaleString()} · Maximum ${maxBet.toLocaleString()} TNB`
                          : 'Loading bet limits…'}
                      </span>
                    </S.BetHeader>
                    <S.Stepper>
                      <S.StepButton
                        aria-label="Lower bet"
                        disabled={spinning || !game || stake <= minBet}
                        onClick={() => handleBetChoice(stepBet(stake, minBet, maxBet, -1))}
                        type="button"
                      >
                        −
                      </S.StepButton>
                      <S.BetInput
                        aria-describedby="casino-bet-limit"
                        disabled={spinning}
                        id="casino-bet-amount"
                        inputMode="numeric"
                        min={minBet}
                        onChange={(event) => setAmount(event.target.value)}
                        required
                        step={1}
                        type="number"
                        value={amount}
                      />
                      <S.StepButton
                        aria-label="Raise bet"
                        disabled={spinning || !game || maxBet < minBet || stake >= maxBet}
                        onClick={() => handleBetChoice(stepBet(stake, minBet, maxBet, 1))}
                        type="button"
                      >
                        +
                      </S.StepButton>
                    </S.Stepper>
                    <S.Chips aria-label="Quick bets" role="group">
                      {chips.map((value, index) => (
                        <S.Chip
                          $tone={index}
                          aria-pressed={stake === value}
                          disabled={spinning}
                          key={value}
                          onClick={() => handleBetChoice(value)}
                          type="button"
                        >
                          {value.toLocaleString()}
                        </S.Chip>
                      ))}
                      {maxBet >= minBet && (
                        <S.MaxChip
                          aria-label={`Maximum bet, ${maxBet.toLocaleString()} TNB`}
                          aria-pressed={stake === maxBet}
                          disabled={spinning}
                          onClick={() => handleBetChoice(maxBet)}
                          type="button"
                        >
                          Max
                        </S.MaxChip>
                      )}
                    </S.Chips>
                  </S.BetBox>
                  <S.SpinButton data-spinning={spinning || undefined} disabled={spinning || !canPlace} type="submit">
                    {spinning ? (
                      <S.SpinLabel data-small>Spinning…</S.SpinLabel>
                    ) : (
                      <>
                        <S.SpinLabel>Spin</S.SpinLabel> <S.SpinAmount>{stakeText}</S.SpinAmount>
                      </>
                    )}
                  </S.SpinButton>
                </S.Controls>
              )}

              <S.Messages>
                {revealed && !spinning && (
                  <S.Result data-tier={tier ?? undefined} role="status">
                    <strong>
                      {revealed.payout ? `${revealed.payout.toLocaleString()} TNB returned` : 'No payout this round'}
                    </strong>
                    <span>
                      {describeBet(revealed)} · Stake: {revealed.amount.toLocaleString()} TNB · Net{' '}
                      {revealed.profit >= 0 ? '+' : ''}
                      {revealed.profit.toLocaleString()} TNB
                    </span>
                  </S.Result>
                )}
                {isAuthenticated && !pending && stake > maxBet && available && (
                  <S.Alert role="alert">
                    This bet is above the current limit. You can wager up to {maxBet.toLocaleString()} TNB.
                  </S.Alert>
                )}
                {isAuthenticated && !available && game && <S.Notice>{unavailableMessage}</S.Notice>}
                {isAuthenticated && !pending && wallet && stake > wallet.balance && (
                  <S.Notice>Your TNB wallet does not have enough coins for this wager.</S.Notice>
                )}
                {isAuthenticated && !wallet && <S.Notice>No TNB balance available</S.Notice>}
                {error && <S.Alert role="alert">{error}</S.Alert>}
                {loadError && (
                  <P.GhostButton onClick={refresh} type="button">
                    Refresh casino status
                  </P.GhostButton>
                )}
              </S.Messages>

              <S.CabinetFooter>
                <S.SoundButton
                  aria-label="Game sound"
                  aria-pressed={soundEnabled}
                  onClick={toggleSound}
                  title={soundEnabled ? 'Turn game sound off' : 'Turn game sound on'}
                  type="button"
                >
                  {soundEnabled ? <Volume2 aria-hidden size={16} /> : <VolumeX aria-hidden size={16} />}
                  Sound {soundEnabled ? 'on' : 'off'}
                </S.SoundButton>
                <S.FooterNote>
                  <ShieldCheck aria-hidden size={15} />
                  Provably fair · Top prize{' '}
                  {topPrize ? `${topPrize.toLocaleString()} TNB` : `${game?.max_multiplier ?? 100}×`}
                </S.FooterNote>
              </S.CabinetFooter>
              <CoinCanvas ref={coins} />
            </S.Cabinet>
          </S.MachineColumn>

          <S.Side>
            <Paytable
              game={game}
              lit={won && revealed ? revealed.result.multiplier : null}
              stake={validStake ? stake : null}
            />
            <P.Card aria-labelledby="slots-session-heading">
              <P.CardHeader>
                <P.CardTitle id="slots-session-heading">This session</P.CardTitle>
                <P.Badge>
                  {session.spins.toLocaleString()} {session.spins === 1 ? 'spin' : 'spins'}
                </P.Badge>
              </P.CardHeader>
              <S.Stats>
                <div>
                  <dt>Wagered</dt>
                  <dd>{session.wagered.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Returned</dt>
                  <dd>{session.returned.toLocaleString()}</dd>
                </div>
                <div>
                  <dt>Net</dt>
                  <dd data-sign={signOf(net)}>
                    {net > 0 ? '+' : ''}
                    {net.toLocaleString()}
                  </dd>
                </div>
              </S.Stats>
              <P.Note>Totals for spins on this page, in TNB. Play for fun and set yourself a limit.</P.Note>
            </P.Card>
          </S.Side>
        </S.FloorGrid>

        <S.Lower>
          <History
            bets={slotsHistory}
            isAuthenticated={isAuthenticated}
            onSelect={setSelected}
            selectedId={selected?.request_id}
          />
          <S.LowerSide>
            <ReceiptPanel
              bet={selected}
              key={selected?.request_id ?? 'fair'}
              onClose={() => setSelected(null)}
              userId={self.id}
            />
            <P.Card aria-labelledby="slots-fund-heading">
              <P.Eyebrow>The casino fund</P.Eyebrow>
              <P.CardTitle id="slots-fund-heading">Every wager is covered.</P.CardTitle>
              <P.Note>Separate from the board-game reward pool. Bet limits adjust to the funds available.</P.Note>
              <S.FundGrid>
                <div>
                  <dt>Total</dt>
                  <dd>{summary?.fund.balance.toLocaleString() ?? '—'}</dd>
                </div>
                <div>
                  <dt>Reserved</dt>
                  <dd>{summary?.fund.reserved.toLocaleString() ?? '—'}</dd>
                </div>
                <div>
                  <dt>Available</dt>
                  <dd>{summary?.fund.available.toLocaleString() ?? '—'}</dd>
                </div>
              </S.FundGrid>
            </P.Card>
          </S.LowerSide>
        </S.Lower>
      </S.Floor>
      {summary?.can_manage && self.id && (
        <S.Admin>
          <FundControls onSuccess={handleFundSuccess} userId={self.id} />
        </S.Admin>
      )}
    </S.Page>
  );
};

// Remount everything, including recovery of a pending wager, when the signed-in member changes.
const Home = () => (
  <CasinoSession>
    <SlotsGame />
  </CasinoSession>
);

export default Home;
