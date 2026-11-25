import {KeyboardEvent, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {mdiVolumeHigh, mdiVolumeOff} from '@mdi/js';
import Icon from '@mdi/react';

import FundControls from 'components/Casino/FundControls';
import {getCasinoGameLink} from 'utils/casino';

import PayTable from './PayTable';
import PlayingCard from './PlayingCard';
import Receipt from './Receipt';
import * as S from './Styles';
import useMotion from './useMotion';
import useSounds from './useSounds';
import useVideoPoker from './useVideoPoker';
import {
  cardRank,
  cardSuit,
  categoryName,
  coinRange,
  describeCard,
  describeWager,
  formatCountdown,
  HAND_SIZE,
  isRedCard,
  MAX_COINS,
  SUIT_SYMBOLS,
} from './utils';

// idle: nothing dealt · dealing: cards on their way · holding: the player picks holds · drawing: discards are
// being replaced · done: the final hand and its payout are on screen
type Stage = 'idle' | 'dealing' | 'holding' | 'drawing' | 'done';

interface ScreenMessage {
  blink?: boolean;
  detail: string;
  text: string;
  tone: 'info' | 'lose' | 'win';
}

const BACKS: (string | null)[] = Array(HAND_SIZE).fill(null);
const NO_HOLDS: boolean[] = Array(HAND_SIZE).fill(false);
// What the screen shows a visitor who is not signed in: the hand at the top of the pay table.
const SAMPLE_HAND = ['10S', 'JS', 'QS', 'KS', 'AS'];
const DEAL_STEP = 110;
const DRAW_STEP = 150;
const DRAW_PAUSE = 220;

const Machine = () => {
  const machine = useVideoPoker();
  const {hand} = machine;
  const animate = useMotion();
  const {soundEnabled, sounds, toggleSound} = useSounds();
  const [credits, setCredits] = useState<number | null>(null);
  const [faces, setFaces] = useState(BACKS);
  const [holds, setHolds] = useState(NO_HOLDS);
  const [now, setNow] = useState(Date.now());
  const [paid, setPaid] = useState(0);
  const [selectedReceipt, setSelectedReceipt] = useState<number | null>(null);
  // After Bet One or a new coin value the bet meter follows the choice again instead of the last hand.
  const [showChoice, setShowChoice] = useState(true);
  const [stage, setStage] = useState<Stage>('idle');
  const expectDeal = useRef(false);
  const justPlayed = useRef(false);
  const latest = useRef(hand);
  const motion = useRef(animate);
  const shown = useRef<{id: number; status: string} | null>(null);
  const timers = useRef<number[]>([]);
  latest.current = hand;
  motion.current = animate;

  const handId = hand?.id;
  const handStatus = hand?.status;
  const isGuest = !machine.isAuthenticated;
  const isOpen = handStatus === 'open';
  const isSettled = handStatus === 'settled' && stage === 'done';
  const locked = machine.isBusy || !!machine.pendingDraw || !!machine.pendingBet || machine.storageError;
  const canHold = isOpen && stage === 'holding' && !locked;
  const canBet = machine.canWager && (stage === 'idle' || stage === 'done');
  const wager =
    hand && !showChoice
      ? describeWager(hand.amount, machine.coinValue)
      : {coins: machine.coins, value: machine.coinValue};
  const tableCoins = coinRange(wager.value, machine.minBet, machine.maxBet)?.max ?? MAX_COINS;
  const columns = Math.min(MAX_COINS, Math.max(wager.coins, tableCoins));
  const balance = machine.wallet?.balance;
  // The wallet can change before the last card turns over. The credit meter waits for the cards.
  const creditsFrozen =
    stage === 'drawing' ||
    (stage === 'holding' && (handStatus === 'settled' || machine.isBusy || !!machine.pendingDraw));
  const remaining = hand?.result.expires_at
    ? Math.max(0, Math.ceil((Date.parse(hand.result.expires_at) - now) / 1000))
    : 0;
  const history = machine.history.filter((bet) => !(stage === 'drawing' && bet.id === handId));
  const chosenReceipt = history.find((bet) => bet.id === selectedReceipt) ?? history[0];
  const otherGame = machine.receipt && !hand ? machine.receipt : null;
  const otherLink = otherGame ? getCasinoGameLink(otherGame.game) : null;

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  const later = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  useEffect(() => clearTimers, []);

  // Put a newly dealt or newly drawn hand on screen, one card at a time when the player just asked for it.
  useEffect(() => {
    const bet = latest.current;
    if (!bet) return;
    const previous = shown.current;
    shown.current = {id: bet.id, status: bet.status};
    clearTimers();
    setShowChoice(false);
    const cards = bet.result.hand;
    const turn = (index: number) => {
      setFaces((current) => current.map((face, position) => (position === index ? cards[index] : face)));
      sounds.card();
    };
    if (bet.status === 'open') {
      justPlayed.current = false;
      setHolds(NO_HOLDS);
      setPaid(0);
      if (motion.current && expectDeal.current) {
        setStage('dealing');
        setFaces(BACKS);
        cards.forEach((_, index) => later(() => turn(index), DEAL_STEP * (index + 1)));
        later(() => setStage('holding'), DEAL_STEP * (HAND_SIZE + 1));
      } else {
        setFaces(cards);
        setStage('holding');
      }
    } else {
      const held = bet.result.held ?? NO_HOLDS;
      justPlayed.current = previous?.id === bet.id && previous.status === 'open';
      setHolds(held);
      if (motion.current && justPlayed.current) {
        setStage('drawing');
        setFaces((current) => current.map((face, index) => (held[index] ? face : null)));
        let step = 0;
        held.forEach((keep, index) => {
          if (keep) return;
          step += 1;
          later(() => turn(index), DRAW_PAUSE + DRAW_STEP * step);
        });
        later(() => setStage('done'), DRAW_PAUSE + DRAW_STEP * (step + 1));
      } else {
        setFaces(cards);
        setStage('done');
      }
    }
    expectDeal.current = false;
  }, [handId, handStatus, sounds]);

  // A deal that was refused or never confirmed leaves the screen waiting for a bet, not for cards.
  useEffect(() => {
    if (stage === 'dealing' && !machine.isBusy && shown.current?.status !== 'open') setStage('idle');
  }, [machine.isBusy, stage]);

  // Count the payout onto the Win meter once the final hand is showing.
  useEffect(() => {
    const bet = latest.current;
    if (stage !== 'done' || !bet || bet.status !== 'settled') return undefined;
    const total = bet.payout;
    if (!justPlayed.current || !motion.current || !total) {
      setPaid(total);
      if (justPlayed.current && !total) sounds.lose();
      return undefined;
    }
    sounds.win();
    const step = Math.max(1, Math.ceil(total / 40));
    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(total, value + step);
      setPaid(value);
      sounds.credit();
      if (value >= total) window.clearInterval(timer);
    }, 45);
    return () => window.clearInterval(timer);
  }, [handId, sounds, stage]);

  useEffect(() => {
    if (!creditsFrozen) setCredits(balance ?? null);
  }, [balance, creditsFrozen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  const toggleHold = (index: number) => {
    if (!canHold) return;
    sounds.hold(!holds[index]);
    setHolds((current) => current.map((held, position) => (position === index ? !held : held)));
  };

  const startDeal = (run: () => void) => {
    expectDeal.current = true;
    clearTimers();
    setFaces(BACKS);
    setHolds(NO_HOLDS);
    setPaid(0);
    setStage('dealing');
    sounds.bet();
    run();
  };

  const handleBetOne = () => {
    sounds.bet();
    setShowChoice(true);
    machine.betOne();
  };

  const handleCoinValue = () => {
    sounds.bet();
    setShowChoice(true);
    machine.nextCoinValue();
  };

  const handleDraw = () => {
    if (!canHold) return;
    sounds.bet();
    machine.draw(holds);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const index = ['1', '2', '3', '4', '5'].indexOf(event.key);
    if (index < 0 || !canHold) return;
    event.preventDefault();
    toggleHold(index);
  };

  const getMessage = (): ScreenMessage => {
    if (isGuest) return {detail: 'Sign in to play with TNB', text: 'Royal flush pays 250 for 1', tone: 'win'};
    if (stage === 'dealing') return {detail: 'Dealing five cards', text: 'Good luck', tone: 'info'};
    if (stage === 'drawing') return {detail: 'Replacing the cards you let go', text: 'Drawing', tone: 'info'};
    if (isOpen && hand) {
      const pays = hand.result.category !== 'nothing';
      return {
        blink: pays,
        detail: remaining ? 'Tap the cards you want to keep, then draw' : 'Time is up. Your dealt hand is being kept…',
        text: pays ? categoryName(hand.result.category) : 'Hold cards, then draw',
        tone: pays ? 'win' : 'info',
      };
    }
    if (isSettled && hand) {
      const timedOut = hand.settlement_reason === 'timeout';
      if (hand.payout > 0)
        return {
          blink: justPlayed.current,
          detail: `${timedOut ? 'Time ran out, so the dealt hand was kept · ' : ''}Paid ${hand.payout.toLocaleString()} TNB`,
          text: categoryName(hand.result.category),
          tone: 'win',
        };
      return {
        detail: timedOut ? 'Time ran out, so the dealt hand was kept' : 'No win this hand',
        text: 'Game over',
        tone: 'lose',
      };
    }
    return {detail: 'Choose your coins, then press Deal', text: 'Place your bet', tone: 'info'};
  };

  const getLitHand = () => {
    if (isGuest) return 'royal_flush' as const;
    if (!hand || hand.result.category === 'nothing') return undefined;
    return stage === 'holding' || stage === 'done' ? hand.result.category : undefined;
  };

  const renderService = () => {
    if (isGuest)
      return (
        <>
          <p>Sign in to drop your coins and play with TNB.</p>
          <S.ServiceActions>
            <S.AuthButtons />
          </S.ServiceActions>
        </>
      );
    if (machine.pendingDraw)
      return (
        <>
          <p>Your draw is awaiting confirmation. The cards you held are saved, so it can only happen once.</p>
          <S.ServiceActions>
            <S.Key
              $tone="deal"
              disabled={machine.isBusy || machine.storageError}
              onClick={() => machine.draw()}
              type="button"
            >
              {machine.isBusy ? 'Confirming…' : 'Retry same draw'}
            </S.Key>
          </S.ServiceActions>
        </>
      );
    if (machine.pendingBet)
      return (
        <>
          <p>
            Your {machine.pendingBet.payload.amount.toLocaleString()} TNB{' '}
            {getCasinoGameLink(machine.pendingBet.payload.game).name} wager is awaiting confirmation.
          </p>
          <S.ServiceActions>
            <S.Key
              $tone="deal"
              disabled={machine.isBusy || machine.storageError}
              onClick={() => startDeal(() => machine.deal())}
              type="button"
            >
              {machine.isBusy ? 'Confirming…' : 'Retry same bet'}
            </S.Key>
          </S.ServiceActions>
        </>
      );
    if (!machine.isReady)
      return (
        <>
          <p>Checking for your unfinished hand…</p>
          <S.ServiceActions>
            <S.Key disabled={machine.isBusy || machine.storageError} onClick={machine.reconnect} type="button">
              Reconnect
            </S.Key>
          </S.ServiceActions>
        </>
      );
    if (otherGame?.status === 'open' && otherLink)
      return (
        <p>
          <Link to={otherLink.path}>Resume your {otherLink.name} hand</Link> before placing another wager.
        </p>
      );
    if (isOpen) return <p>Press 1 to 5 to hold a card. Your hand is saved if you leave the page.</p>;
    if (!machine.summary) return <p>Checking the machine…</p>;
    if (machine.loadError) return <p>Casino status is unavailable. Reconnect to check the table limits.</p>;
    if (!machine.summary.fund.enabled) return <p>The casino is closed to new wagers.</p>;
    if (!machine.game?.enabled) return <p>This machine is currently closed.</p>;
    if (!machine.range) return <p>The casino fund cannot cover the minimum wager. Please check back later.</p>;
    if (!machine.wallet || machine.stake > machine.wallet.balance)
      return <p>Your TNB wallet needs enough coins for this wager.</p>;
    return (
      <p>
        One coin is {machine.coinValue.toLocaleString()} TNB · Table limits {machine.minBet.toLocaleString()} to{' '}
        {machine.maxBet.toLocaleString()} TNB a hand
      </p>
    );
  };

  const message = getMessage();
  const litHand = getLitHand();
  const visibleFaces = isGuest ? SAMPLE_HAND : faces;

  return (
    <>
      <S.Layout>
        <S.Cabinet aria-label="Video Poker machine" onKeyDown={handleKeyDown}>
          <S.Marquee>
            <S.MarqueeTitle>
              Jacks or Better
              <small>DRAW POKER · 9/6 PAY TABLE</small>
            </S.MarqueeTitle>
            <S.SoundButton
              aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
              aria-pressed={soundEnabled}
              onClick={toggleSound}
              type="button"
            >
              <Icon path={soundEnabled ? mdiVolumeHigh : mdiVolumeOff} size="20px" />
            </S.SoundButton>
          </S.Marquee>
          <S.Screen>
            <PayTable
              coinValue={wager.value}
              coins={wager.coins}
              columns={columns}
              game={machine.game}
              lit={litHand}
              won={isSettled && !!hand && hand.payout > 0}
            />
            <S.Message $blink={message.blink} $tone={message.tone}>
              <div aria-atomic="true" aria-live="polite">
                <strong>{message.text}</strong>
                <small>{message.detail}</small>
              </div>
              {/* Outside the announced region: a clock that changes every second is not read out every second */}
              {isOpen && remaining > 0 && (
                <small role="timer">The dealt hand is kept in {formatCountdown(remaining)}</small>
              )}
            </S.Message>
            <S.Cards aria-label={isGuest ? 'Sample hand' : 'Your hand'} role="group">
              {visibleFaces.map((card, index) => {
                const held = !isGuest && holds[index] && stage !== 'idle' && stage !== 'dealing';
                let label = card ? describeCard(card) : 'Face-down card';
                if (held) label += ', held';
                return (
                  <S.CardSlot
                    aria-label={label}
                    aria-pressed={isOpen && stage === 'holding' ? holds[index] : undefined}
                    disabled={!canHold}
                    // The position is the identity: a slot keeps its place while its card changes
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onClick={() => toggleHold(index)}
                    type="button"
                  >
                    <S.HeldTag $visible={held}>Held</S.HeldTag>
                    <PlayingCard
                      card={card}
                      dim={isSettled && !!hand && hand.payout === 0}
                      held={held}
                      key={card ?? 'back'}
                    />
                  </S.CardSlot>
                );
              })}
            </S.Cards>
            <S.Meters>
              <div>
                <dt>Win</dt>
                <dd>{paid.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Bet</dt>
                <dd>{(hand && !showChoice ? hand.amount : machine.stake).toLocaleString()}</dd>
              </div>
              <div>
                <dt>Credits</dt>
                <dd>{credits === null || isGuest ? '—' : credits.toLocaleString()}</dd>
              </div>
            </S.Meters>
          </S.Screen>
          <S.Deck>
            <S.HoldRow>
              {holds.map((held, index) => (
                <S.Key
                  $lit={held && canHold}
                  $tone="hold"
                  aria-hidden="true"
                  disabled={!canHold}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => toggleHold(index)}
                  tabIndex={-1}
                  type="button"
                >
                  {held && isOpen ? 'Held' : 'Hold'}
                  <small>{index + 1}</small>
                </S.Key>
              ))}
            </S.HoldRow>
            <S.BetRow>
              <S.Key
                aria-label={`Coin value: ${machine.coinValue.toLocaleString()} TNB. Change coin value`}
                disabled={!canBet || machine.coinValues.length < 2}
                onClick={handleCoinValue}
                type="button"
              >
                Coin
                <small>{machine.coinValue.toLocaleString()} TNB</small>
              </S.Key>
              <S.Key
                $tone="bet"
                disabled={!canBet || !machine.range || machine.range.min === machine.range.max}
                onClick={handleBetOne}
                type="button"
              >
                Bet one
              </S.Key>
              <S.Key
                $tone="bet"
                disabled={!canBet || !machine.range || machine.maxCoins < machine.range.min}
                onClick={() => startDeal(machine.betMax)}
                type="button"
              >
                Bet max
              </S.Key>
              {isOpen ? (
                <S.Key $tone="deal" disabled={!canHold} onClick={handleDraw} type="button">
                  {machine.isBusy ? 'Drawing…' : 'Draw'}
                </S.Key>
              ) : (
                <S.Key
                  $tone="deal"
                  disabled={!canBet || !machine.canDeal}
                  onClick={() => startDeal(() => machine.deal())}
                  type="button"
                >
                  {machine.isBusy && stage === 'dealing' ? 'Dealing…' : 'Deal'}
                  <small>{machine.stake.toLocaleString()} TNB</small>
                </S.Key>
              )}
            </S.BetRow>
            <S.Service>
              {renderService()}
              {otherGame?.status === 'settled' && otherLink && (
                <p>
                  Your previous {otherLink.name} wager was confirmed: {otherGame.payout.toLocaleString()} TNB returned.
                  Its receipt is on the <Link to={otherLink.path}>{otherLink.name} page</Link>.
                </p>
              )}
              {machine.error && <p role="alert">{machine.error}</p>}
            </S.Service>
          </S.Deck>
        </S.Cabinet>
        <S.Panel aria-labelledby="video-poker-rules-heading">
          <S.Eyebrow>How to play</S.Eyebrow>
          <S.Heading id="video-poker-rules-heading">Five cards. One draw.</S.Heading>
          <S.Rules>
            <div>
              <h3>Bet and deal</h3>
              <p>
                Bet one to five coins with Bet One, or press Bet Max to bet the most and deal at once. Five cards are
                dealt from one freshly shuffled deck.
              </p>
            </div>
            <div>
              <h3>Hold and draw</h3>
              <p>
                Tap the cards you want to keep, or press <kbd>1</kbd> to <kbd>5</kbd>. Draw replaces every other card
                once, and that final hand is paid from the table on the screen.
              </p>
            </div>
            <div>
              <h3>What pays</h3>
              <p>
                A pair of jacks, queens, kings or aces returns your wager, and better hands pay more, up to 250 for 1 on
                a royal flush. Every payout on the table includes your wager.
              </p>
            </div>
            <div>
              <h3>Your return</h3>
              <p>
                {machine.game?.optimal_return
                  ? `Perfect play returns ${(machine.game.optimal_return * 100).toFixed(2)}% of what is wagered. `
                  : ''}
                The return depends on the cards you hold. A hand left open for{' '}
                {Math.round((machine.game?.timeout_seconds ?? 900) / 60)} minutes is settled with the cards as dealt.
              </p>
            </div>
          </S.Rules>
        </S.Panel>
      </S.Layout>
      <S.Layout>
        <S.Panel aria-labelledby="video-poker-history-heading">
          <S.Eyebrow>Your hands</S.Eyebrow>
          <S.Heading id="video-poker-history-heading">Recent hands</S.Heading>
          {history.length ? (
            <S.History>
              {history.slice(0, 8).map((bet) => (
                <S.HistoryButton
                  $selected={bet.id === chosenReceipt?.id}
                  aria-pressed={bet.id === chosenReceipt?.id}
                  key={bet.id}
                  onClick={() => setSelectedReceipt(bet.id)}
                  type="button"
                >
                  <S.MiniHand aria-label={bet.result.hand.map(describeCard).join(', ')}>
                    {bet.result.hand.map((card, index) => (
                      <S.MiniCard
                        $kept={!!bet.result.held?.[index]}
                        $red={isRedCard(card)}
                        aria-hidden="true"
                        key={card}
                      >
                        {cardRank(card)}
                        {SUIT_SYMBOLS[cardSuit(card)]}
                      </S.MiniCard>
                    ))}
                  </S.MiniHand>
                  <S.Net $won={bet.profit > 0}>
                    {bet.profit > 0 ? '+' : ''}
                    {bet.profit.toLocaleString()} TNB
                  </S.Net>
                  <span>
                    {categoryName(bet.result.category)} · {bet.total_stake.toLocaleString()} wagered
                  </span>
                </S.HistoryButton>
              ))}
            </S.History>
          ) : (
            <S.Note>
              {isGuest ? 'Sign in to see your hands here.' : 'Your settled Video Poker hands will appear here.'}
            </S.Note>
          )}
          {chosenReceipt && machine.self.id && (
            <Receipt bet={chosenReceipt} key={chosenReceipt.id} userId={machine.self.id} />
          )}
        </S.Panel>
        <S.Panel aria-labelledby="video-poker-fund-heading">
          <S.Eyebrow>The casino fund</S.Eyebrow>
          <S.Heading id="video-poker-fund-heading">Your payout is covered.</S.Heading>
          <S.Note>
            The moment your cards are dealt, the fund sets aside enough to pay a royal flush on your wager. This fund is
            separate from board-game rewards.
          </S.Note>
          <S.Facts>
            <div>
              <dt>Total TNB</dt>
              <dd>{machine.summary?.fund.balance.toLocaleString() ?? '—'}</dd>
            </div>
            <div>
              <dt>Reserved</dt>
              <dd>{machine.summary?.fund.reserved.toLocaleString() ?? '—'}</dd>
            </div>
            <div>
              <dt>Available</dt>
              <dd>{machine.summary?.fund.available.toLocaleString() ?? '—'}</dd>
            </div>
          </S.Facts>
          {machine.summary?.can_manage && machine.self.id && (
            <FundControls onSuccess={machine.handleFundSuccess} userId={machine.self.id} />
          )}
        </S.Panel>
      </S.Layout>
    </>
  );
};

export default Machine;
