import {useEffect, useRef, useState} from 'react';
import {mdiLightbulbOnOutline, mdiLightbulbOutline} from '@mdi/js';
import Icon from '@mdi/react';

import FundControls from 'components/Casino/FundControls';
import {CasinoBet, LetItRideAction} from 'types/casino';
import {getCasinoGameLink} from 'utils/casino';
import {BETS, getBestPlay, getMadeHand} from 'utils/letItRide';

import Bank from '../Bank';
import Card from '../Card';
import Chip from '../Chip';
import Hands from '../Hands';
import {prefersReducedMotion, useCountUp} from '../hooks';
import Paytable from '../Paytable';
import useLetItRide from '../useLetItRide';
import {
  describeMadeHand,
  describeOutcome,
  formatCountdown,
  formatTnb,
  getBet,
  getHandLabel,
  getPayingCards,
  getPulled,
  getVisibleCards,
} from '../utils';

import * as S from './Styles';

export const HINTS_STORAGE_KEY = 'thenewboston.letItRide.hints';

const BET_CHIPS = [1, 2, 5, 10, 25, 100];
const SPOTS = ['1', '2', '3'];
// A card turning over, and a beat to take it in before anything else can be pressed
const TURN_DURATION = 750;

type SpotState = 'deciding' | 'empty' | 'lost' | 'pulled' | 'riding' | 'waiting' | 'won';

const readHints = () => {
  try {
    return window.localStorage.getItem(HINTS_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * The Let It Ride table: five cards, three bets and the two decisions in between. The casino fixes the whole deal when
 * the bets are placed; the table shows three cards, turns a community card after each decision, and only shows what a
 * hand paid once its last card has finished turning.
 */
const Table = () => {
  const [heldBalance, setHeldBalance] = useState<number | null>(null);
  const [hintsOn, setHintsOn] = useState(readHints);
  const [isRecovering, setIsRecovering] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [now, setNow] = useState(Date.now());
  const balanceLoaded = useRef(false);
  const felt = useRef<HTMLDivElement>(null);
  const live = useRef(true);
  const turnTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const seat = useLetItRide();
  const {game, hand, otherBet, pendingAction, pendingBet, summary, wallet} = seat;
  const balance = heldBalance ?? wallet?.balance ?? 0;
  const isOpen = hand?.status === 'open';
  // A finished hand is only "over" on screen once its last card has turned
  const isOver = hand?.status === 'settled' && !isTurning;
  const isLocked = seat.isBusy || isTurning || !!pendingAction || !!pendingBet || seat.storageError;
  const bet = hand ? getBet(hand) : seat.unit;
  const decision = hand?.result.decisions.length ?? 0;
  const payingCards = hand && isOver ? getPayingCards(getVisibleCards(hand)) : [];
  const remaining = hand?.result.expires_at
    ? Math.max(0, Math.ceil((Date.parse(hand.result.expires_at) - now) / 1000))
    : 0;
  const shownBalance = useCountUp(balance, 700, balanceLoaded.current);
  const visibleCards = hand ? getVisibleCards(hand) : [];
  const madeHand = visibleCards.length >= 3 ? getMadeHand(visibleCards) : null;
  const walletBalance = wallet?.balance;
  const winnings = useCountUp(isOver && hand ? hand.payout : 0, 900);

  useEffect(() => {
    live.current = true;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      live.current = false;
      clearInterval(timer);
      clearTimeout(turnTimer.current);
    };
  }, []);

  // A saved deal or decision only needs the player once a send has ended without confirming it; while the first send
  // is still on its way the table simply waits
  useEffect(() => {
    if (!pendingAction && !pendingBet) setIsRecovering(false);
    else if (!seat.isBusy) setIsRecovering(true);
  }, [pendingAction, pendingBet, seat.isBusy]);

  // The balance appears as soon as the wallet loads; only later changes roll
  useEffect(() => {
    if (walletBalance !== undefined) balanceLoaded.current = true;
  }, [walletBalance]);

  const getSpotNote = (state: SpotState, index: number) => {
    if (state === 'deciding') return 'Your call';
    if (state === 'lost') return 'Lost';
    if (state === 'pulled') return 'Pulled back';
    if (state === 'won' && hand) return `+${(bet * (hand.result.odds ?? 0)).toLocaleString()}`;
    if (state === 'empty' || index === BETS - 1) return index === BETS - 1 ? 'Always plays' : 'Yours to pull';
    return state === 'riding' ? 'Riding' : 'Still to decide';
  };

  const getSpotState = (index: number): SpotState => {
    if (!hand) return 'empty';
    const choice = hand.result.decisions[index];
    if (choice === 'pull') return 'pulled';
    if (isOver) return hand.result.odds ? 'won' : 'lost';
    if (index === BETS - 1 || choice === 'ride') return 'riding';
    // While a card is still turning nothing new is asked of the player
    if (isOpen && index === decision && !isTurning) return 'deciding';
    return 'waiting';
  };

  const handleAct = async (action?: LetItRideAction) => {
    if (seat.isBusy || isTurning) return;
    setHeldBalance(walletBalance ?? null);
    present(await seat.act(action));
  };

  const handleDeal = async () => {
    if (seat.isBusy || isTurning) return;
    showFelt();
    present(await seat.deal());
  };

  const handleHintsToggle = () => {
    setHintsOn((value) => {
      try {
        window.localStorage.setItem(HINTS_STORAGE_KEY, String(!value));
      } catch {
        // The preference simply lasts for this visit
      }
      return !value;
    });
  };

  const handleUnitChange = (value: number) => {
    if (isLocked || isOpen) return;
    seat.setUnit(Math.max(seat.minUnit, Math.min(seat.maxUnit, Math.floor(value))));
  };

  // After a deal or a decision is confirmed: let the cards finish moving before anything else can be pressed, and hold
  // the balance where it was so the payout never arrives before the card that explains it
  const present = (confirmed: CasinoBet | null) => {
    if (!live.current) return;
    if (!confirmed || prefersReducedMotion()) {
      setHeldBalance(null);
      return;
    }
    setIsTurning(true);
    clearTimeout(turnTimer.current);
    turnTimer.current = setTimeout(() => {
      setHeldBalance(null);
      setIsTurning(false);
    }, TURN_DURATION);
  };

  // On a phone the Deal button sits below the cards: bring the felt back into view for the deal
  const showFelt = () => {
    const element = felt.current;
    if (!element?.scrollIntoView) return;
    const {bottom, top} = element.getBoundingClientRect();
    if (top >= 0 && bottom <= window.innerHeight) return;
    element.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'});
  };

  let availability = 'Opening the table…';
  if (seat.loadError) availability = 'Casino status unavailable';
  else if (summary && !summary.fund.enabled) availability = 'Casino closed';
  else if (game && !game.enabled) availability = 'Table closed';
  else if (game) availability = 'Table open';

  let blocker = '';
  if (seat.loadError) blocker = 'Refresh the casino status before placing a bet.';
  else if (!summary || !game) blocker = 'Opening the table…';
  else if (!summary.fund.enabled) blocker = 'The casino is closed to new wagers.';
  else if (!game.enabled) blocker = 'Let It Ride is currently closed.';
  else if (!seat.isSupported) blocker = 'This table has updated rules. Refresh the page before placing a new wager.';
  else if (seat.maxUnit < seat.minUnit)
    blocker = 'The casino fund cannot cover the minimum bets right now. Please check back later.';
  else if (!wallet) blocker = 'You need TNB in your wallet to play.';
  else if (seat.stake > wallet.balance)
    blocker = 'Your TNB wallet does not have enough coins for three bets this size.';

  const renderDecision = () => {
    const advice = hintsOn && hand ? getBestPlay(visibleCards) : null;
    return (
      <>
        <S.Prompt>
          Bet {SPOTS[decision]} of {formatTnb(bet)}: leave it on the table, or take it back?
        </S.Prompt>
        <S.Choices>
          <S.ChoiceButton
            $suggested={advice === 'pull'}
            disabled={isLocked || !hand?.result.available_actions.includes('pull')}
            onClick={() => handleAct('pull')}
            type="button"
          >
            Pull back
            <small>Take {formatTnb(bet)} back</small>
          </S.ChoiceButton>
          <S.ChoiceButton
            $primary
            $suggested={advice === 'ride'}
            disabled={isLocked || !hand?.result.available_actions.includes('ride')}
            onClick={() => handleAct('ride')}
            type="button"
          >
            Let it ride
            <small>Keep {formatTnb(bet)} in play</small>
          </S.ChoiceButton>
        </S.Choices>
        {advice && (
          <S.Advice>
            <Icon aria-hidden path={mdiLightbulbOnOutline} size="16px" />
            Best play: {advice === 'ride' ? 'let it ride' : 'pull back'}
            {madeHand ? ' — this hand already pays and cannot lose.' : '.'}
          </S.Advice>
        )}
        <S.Note>
          {remaining
            ? `Finishes on its own in ${formatCountdown(remaining)}. Your hand is saved if you leave.`
            : 'Time is up. The casino is finishing this hand…'}
        </S.Note>
      </>
    );
  };

  const renderBetting = () => (
    <>
      <S.BetRow>
        <S.BetLabel id="let-it-ride-bet-label">Each bet</S.BetLabel>
        <S.Stepper>
          <S.StepButton
            aria-label="Lower each bet"
            disabled={isLocked || seat.unit <= seat.minUnit}
            onClick={() => handleUnitChange(seat.unit - 1)}
            type="button"
          >
            −
          </S.StepButton>
          <S.BetValue aria-labelledby="let-it-ride-bet-label" aria-live="polite" role="status">
            {seat.unit.toLocaleString()} <span>TNB</span>
          </S.BetValue>
          <S.StepButton
            aria-label="Raise each bet"
            disabled={isLocked || seat.unit >= seat.maxUnit}
            onClick={() => handleUnitChange(seat.unit + 1)}
            type="button"
          >
            +
          </S.StepButton>
        </S.Stepper>
        <S.Rack aria-label="Quick bet sizes">
          {BET_CHIPS.filter((value) => value >= seat.minUnit && value <= Math.max(seat.maxUnit, seat.minUnit)).map(
            (value) => (
              <S.RackButton
                $selected={seat.unit === value}
                aria-label={`Bet ${value} TNB on each spot`}
                aria-pressed={seat.unit === value}
                disabled={isLocked || value > seat.maxUnit}
                key={value}
                onClick={() => handleUnitChange(value)}
                type="button"
              >
                {value}
              </S.RackButton>
            ),
          )}
          <S.RackButton
            disabled={isLocked || seat.maxUnit < seat.minUnit || seat.unit === seat.maxUnit}
            onClick={() => handleUnitChange(seat.maxUnit)}
            type="button"
          >
            Max
          </S.RackButton>
        </S.Rack>
      </S.BetRow>
      <S.DealButton disabled={!seat.canDeal || isTurning} onClick={handleDeal} type="button">
        {seat.isBusy ? 'Dealing…' : `${hand ? 'Deal again' : 'Deal'} · ${formatTnb(seat.stake)}`}
      </S.DealButton>
      <S.Note>
        {blocker ||
          `Three bets of ${formatTnb(seat.unit)}. You can pull two of them back. Limit ${seat.minUnit.toLocaleString()} to ${seat.maxUnit.toLocaleString()} TNB a bet.`}
      </S.Note>
    </>
  );

  const renderControls = () => {
    if (!seat.isAuthenticated) {
      return (
        <>
          <S.Note>Sign in to take a seat and play with TNB from your wallet.</S.Note>
          <S.AuthButtons />
        </>
      );
    }
    if (pendingAction && isRecovering) {
      return (
        <>
          <S.Note>
            Your decision to {pendingAction.payload.action === 'ride' ? 'let it ride' : 'pull back'} is awaiting
            confirmation. Retrying sends the same decision; it can only be applied once.
          </S.Note>
          <S.DealButton disabled={seat.isBusy || seat.storageError} onClick={() => handleAct()} type="button">
            {seat.isBusy ? 'Confirming…' : 'Retry same decision'}
          </S.DealButton>
        </>
      );
    }
    if (pendingBet && isRecovering) {
      const pendingGame = getCasinoGameLink(pendingBet.payload.game);
      return (
        <>
          <S.Note>
            Your {formatTnb(pendingBet.payload.amount)} {pendingGame.name} wager is awaiting confirmation. Retrying uses
            the same wager, even after refreshing this page.
          </S.Note>
          <S.DealButton disabled={seat.isBusy || seat.storageError} onClick={handleDeal} type="button">
            {seat.isBusy ? 'Confirming…' : 'Retry same bet'}
          </S.DealButton>
        </>
      );
    }
    if (!seat.isReady) {
      return (
        <>
          <S.Note>Checking for your unfinished hand…</S.Note>
          <S.GhostButton disabled={seat.isBusy || seat.storageError} onClick={seat.reconnect} type="button">
            Reconnect
          </S.GhostButton>
        </>
      );
    }
    if (isOpen) return renderDecision();
    if (otherBet?.status === 'open') {
      const other = getCasinoGameLink(otherBet.game);
      return (
        <S.Note>
          <S.TextLink to={other.path}>Finish your {other.name} hand</S.TextLink> before dealing here. One casino game
          can be in play at a time.
        </S.Note>
      );
    }
    return renderBetting();
  };

  const renderRibbon = () => {
    if (hand && isOver) {
      const kept = formatTnb(hand.payout);
      return hand.profit > 0 ? (
        <S.Ribbon $tone="won">
          {describeMadeHand(visibleCards) ?? getHandLabel(hand.result.hand)} — you won {formatTnb(hand.profit)}
        </S.Ribbon>
      ) : (
        <S.Ribbon $tone="lost">No paying hand{hand.payout ? ` — you kept ${kept}` : ''}</S.Ribbon>
      );
    }
    if (hand && isTurning)
      return <S.Ribbon $tone="live">{decision === BETS - 1 ? 'Last card…' : 'Cards on the table'}</S.Ribbon>;
    if (hand && isOpen) {
      return (
        <S.Ribbon $tone="live">
          {madeHand ? `${describeMadeHand(visibleCards)} — it already pays` : `Decide bet ${SPOTS[decision]}`}
        </S.Ribbon>
      );
    }
    return <S.Ribbon $tone="hint">Three equal bets. Pull two back, or let them ride.</S.Ribbon>;
  };

  const renderSummary = () => {
    if (!hand || !isOver) return null;
    const pulled = getPulled(hand);
    return (
      <S.Outcome $won={hand.profit > 0} data-testid="let-it-ride-outcome">
        <strong>{hand.profit > 0 ? `${winnings.toLocaleString()} TNB returned` : describeOutcome(hand)}</strong>
        <span>
          {hand.profit > 0 ? describeOutcome(hand) : `${formatTnb(hand.total_stake)} staked`}
          {hand.profit > 0 && pulled > 0 && ` · ${pulled === 1 ? '1 bet' : '2 bets'} pulled back`}
          {hand.settlement_reason === 'timeout' && ' · finished for you when the time ran out'}
        </span>
      </S.Outcome>
    );
  };

  return (
    <>
      <S.Console aria-label="Let It Ride table" id="let-it-ride-table" tabIndex={-1}>
        <S.Header>
          <div>
            <S.Eyebrow>Three bets · Five cards</S.Eyebrow>
            <S.Title>Take a seat</S.Title>
          </div>
          <S.Tools>
            <S.Status $open={availability === 'Table open'} role="status">
              {availability}
            </S.Status>
            {seat.isAuthenticated && (
              <S.Balance aria-label={`Wallet balance ${formatTnb(balance)}`}>
                <small>Balance</small>
                <strong>{wallet || heldBalance !== null ? shownBalance.toLocaleString() : '—'}</strong>
                <span>TNB</span>
              </S.Balance>
            )}
            <S.Toggle
              $active={hintsOn}
              aria-label="Best-play hints"
              aria-pressed={hintsOn}
              onClick={handleHintsToggle}
              title={hintsOn ? 'Best-play hints are on' : 'Best-play hints are off'}
              type="button"
            >
              <Icon aria-hidden path={hintsOn ? mdiLightbulbOnOutline : mdiLightbulbOutline} size="18px" />
              <span>Hints</span>
            </S.Toggle>
          </S.Tools>
        </S.Header>
        <S.Play>
          <S.FeltColumn>
            <S.Felt $won={!!hand && isOver && hand.profit > 0} ref={felt}>
              <S.Deal key={hand?.id ?? 'empty'}>
                <S.Group>
                  <S.GroupLabel>Community cards</S.GroupLabel>
                  <S.Cards aria-label="Community cards" role="group">
                    {[0, 1].map((index) => {
                      const card = hand?.result.community[index] ?? null;
                      return (
                        <Card
                          card={card}
                          dealOrder={index + 3}
                          dimmed={payingCards.length > 0 && !!card && !payingCards.includes(card)}
                          key={index}
                          lifted={!!card && payingCards.includes(card)}
                        />
                      );
                    })}
                  </S.Cards>
                </S.Group>
                <S.Group>
                  <S.GroupLabel>Your cards</S.GroupLabel>
                  <S.Cards aria-label="Your cards" role="group">
                    {[0, 1, 2].map((index) => {
                      const card = hand?.result.cards[index] ?? null;
                      return (
                        <Card
                          card={card}
                          dealOrder={index}
                          dimmed={payingCards.length > 0 && !!card && !payingCards.includes(card)}
                          key={index}
                          lifted={!!card && payingCards.includes(card)}
                        />
                      );
                    })}
                  </S.Cards>
                </S.Group>
              </S.Deal>
              <S.RibbonSlot aria-live="polite" role="status">
                {renderRibbon()}
              </S.RibbonSlot>
              <S.Spots aria-label="Your three bets" role="group">
                {SPOTS.map((label, index) => {
                  const state = getSpotState(index);
                  return (
                    <S.Spot $state={state} aria-label={`Bet ${label}: ${getSpotNote(state, index)}`} key={label}>
                      <S.SpotCaption aria-hidden="true">Bet {label}</S.SpotCaption>
                      <S.Circle $state={state}>
                        <b aria-hidden="true">{label}</b>
                        {(hand || seat.isAuthenticated) && state !== 'pulled' && state !== 'lost' && (
                          <S.SpotChip $ghost={!hand}>
                            <Chip amount={bet} />
                          </S.SpotChip>
                        )}
                      </S.Circle>
                      <S.SpotNote $state={state}>{getSpotNote(state, index)}</S.SpotNote>
                    </S.Spot>
                  );
                })}
              </S.Spots>
              <S.Marque aria-hidden="true">Let It Ride · Tens or better pay</S.Marque>
            </S.Felt>
            <S.Rail>
              {renderSummary()}
              {renderControls()}
              {otherBet?.status === 'settled' && (
                <S.Note>
                  Your {getCasinoGameLink(otherBet.game).name} wager was confirmed: {formatTnb(otherBet.payout)}{' '}
                  returned. Its receipt is on the{' '}
                  <S.TextLink to={getCasinoGameLink(otherBet.game).path}>
                    {getCasinoGameLink(otherBet.game).name} page
                  </S.TextLink>
                  .
                </S.Note>
              )}
              {seat.error && <S.Error role="alert">{seat.error}</S.Error>}
              {seat.loadError && (
                <S.GhostButton onClick={seat.refresh} type="button">
                  Refresh casino status
                </S.GhostButton>
              )}
            </S.Rail>
          </S.FeltColumn>
          <Paytable
            bet={bet}
            held={hand && !isOver ? madeHand : null}
            riding={hand ? hand.result.riding : BETS}
            won={hand && isOver ? hand.result.hand : null}
          />
        </S.Play>
      </S.Console>
      <S.Panels>
        <Hands
          bets={seat.history.filter((item) => isOver || item.id !== hand?.id)}
          isAuthenticated={seat.isAuthenticated}
          userId={seat.self.id}
        />
        <Bank game={game} summary={summary} />
      </S.Panels>
      {summary?.can_manage && seat.self.id && (
        <S.Admin>
          <FundControls onSuccess={seat.handleFundSuccess} userId={seat.self.id} />
        </S.Admin>
      )}
    </>
  );
};

export default Table;
