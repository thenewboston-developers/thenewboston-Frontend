import {CSSProperties, useCallback, useEffect, useId, useRef, useState} from 'react';

import {BlackjackBet} from 'types/casino';

import Card from '../Card';
import Celebration, {Burst} from '../Celebration';
import ChipStack from '../Chip';
import {prefersReducedMotion, useCountUp} from '../hooks';
import {TableView} from '../useDealer';
import {formatHandValue, getHandValue, getOutcomeCopy, isNatural} from '../utils';

import * as S from './Styles';

interface FeltProps {
  burst: Burst | null;
  // The hand the casino last returned; the table may still be catching up with it
  hand: BlackjackBet | null;
  // The player may hit, stand or double right now
  isPlayerTurn: boolean;
  speed: number;
  // The wager waiting in the betting circle for the next deal
  stake: number;
  view: TableView;
}

interface HandProps {
  cards: (string | null)[];
  clearing: boolean;
  doubled?: boolean;
  getOrigin(): DOMRect | null;
  handId: number | null;
  motion: boolean;
  speed: number;
  who: 'dealer' | 'player';
}

interface PrintProps {
  compact?: boolean;
}

const LANDING_TIME = 300;
const TRAY = ['#f1ecdd', '#cc2f3d', '#cc2f3d', '#1e8f5b', '#1e8f5b', '#22272c', '#22272c', '#6f43b8', '#dba92f'];

// Cards overlap like a dealt hand, and close up as the hand grows so it never outgrows the table
const getSpread = (count: number): number => (count <= 4 ? 0.58 : Math.max(0.3, 2 / (count - 1)));

// Half the width of a hand, in card widths: the total sits just beyond it
const getHalfWidth = (count: number): number => (Math.max(0, count - 1) * getSpread(count) + 1) / 2;

// An arc of the circle the table's lettering follows, drawn left to right so the words read from the player's seat
const getArc = (centerX: number, centerY: number, radius: number, half: number): string => {
  const x = radius * Math.sin(half);
  const y = (centerY + radius * Math.cos(half)).toFixed(1);
  return `M${(centerX - x).toFixed(1)} ${y}A${radius} ${radius} 0 0 0 ${(centerX + x).toFixed(1)} ${y}`;
};

// The band the house rule is printed in: two arcs joined at their ends
const getBand = (centerX: number, centerY: number, inner: number, outer: number, half: number): string => {
  const innerX = inner * Math.sin(half);
  const outerX = outer * Math.sin(half);
  const innerY = (centerY + inner * Math.cos(half)).toFixed(1);
  const outerY = (centerY + outer * Math.cos(half)).toFixed(1);
  return (
    `M${(centerX - innerX).toFixed(1)} ${innerY}A${inner} ${inner} 0 0 0 ${(centerX + innerX).toFixed(1)} ${innerY}` +
    `L${(centerX + outerX).toFixed(1)} ${outerY}A${outer} ${outer} 0 0 1 ${(centerX - outerX).toFixed(1)} ${outerY}Z`
  );
};

// The cards whose faces can be seen: a dealt card counts toward a total once it has landed and turned over
const useLanded = (cards: (string | null)[], lag: number): (string | null)[] => {
  const [landed, setLanded] = useState(cards);

  useEffect(() => {
    if (lag <= 0 || cards.length === 0) {
      setLanded(cards);
      return undefined;
    }
    const timer = setTimeout(() => setLanded(cards), lag);
    return () => clearTimeout(timer);
  }, [cards, lag]);

  return lag <= 0 || cards.length === 0 ? cards : landed;
};

const Hand = ({cards, clearing, doubled = false, getOrigin, handId, motion, speed, who}: HandProps) => {
  const spread = getSpread(cards.length);
  return (
    <S.Hand $clearing={clearing} $who={who}>
      {cards.map((card, index) => (
        <S.Slot
          // A card keeps its place in the hand from the deal to the discard tray
          // eslint-disable-next-line react/no-array-index-key
          key={`${handId}:${index}`}
          style={{'--x': (index - (cards.length - 1) / 2) * spread} as CSSProperties}
        >
          <Card animate={motion} card={card} getOrigin={getOrigin} sideways={doubled && index === 2} speed={speed} />
        </S.Slot>
      ))}
    </S.Hand>
  );
};

// What every blackjack table has printed on it: the payout in an arc, and the house rule in a band beneath it
const Print = ({compact = false}: PrintProps) => {
  const id = useId().replace(/:/g, '');
  const centerX = compact ? 280 : 500;
  const centerY = compact ? -330 : -590;
  const title = compact
    ? {half: 0.56, radius: 470, size: 30, spacing: 3}
    : {half: 0.5, radius: 800, size: 44, spacing: 6};
  const band = compact
    ? {half: 0.37, inner: 484, outer: 508, size: 14.5, spacing: 2.2, text: 502}
    : {half: 0.47, inner: 818, outer: 852, size: 19, spacing: 5, text: 845};
  return (
    <S.Print $compact={compact} aria-hidden="true" viewBox={compact ? '0 0 560 184' : '0 0 1000 268'}>
      <path d={getArc(centerX, centerY, title.radius, title.half)} fill="none" id={`${id}-title`} />
      <path d={getArc(centerX, centerY, band.text, band.half)} fill="none" id={`${id}-rule`} />
      <S.PrintBand d={getBand(centerX, centerY, band.inner, band.outer, band.half)} />
      <S.PrintTitle fontSize={title.size} letterSpacing={title.spacing}>
        <textPath href={`#${id}-title`} startOffset="50%" textAnchor="middle">
          BLACKJACK PAYS 3 TO 2
        </textPath>
      </S.PrintTitle>
      <S.PrintRule fontSize={band.size} letterSpacing={band.spacing}>
        <textPath href={`#${id}-rule`} startOffset="50%" textAnchor="middle">
          DEALER STANDS ON ALL 17s
        </textPath>
      </S.PrintRule>
    </S.Print>
  );
};

/**
 * The table itself: green felt inside a padded rail, the shoe the cards are dealt from, the dealer's and the
 * player's hands with their totals, the betting circle with its chips, and the result when a hand is over.
 */
const Felt = ({burst, hand, isPlayerTurn, speed, stake, view}: FeltProps) => {
  const circle = useRef<HTMLDivElement>(null);
  const mouth = useRef<HTMLSpanElement>(null);
  const shown = hand && view.handId === hand.id ? hand : null;
  const outcome = shown && view.revealed && shown.status === 'settled' ? getOutcomeCopy(shown) : null;
  const profit = useCountUp(outcome && shown && shown.profit > 0 ? shown.profit : 0, 800);
  const lag = view.motion && !prefersReducedMotion() ? LANDING_TIME * speed : 0;
  const dealerCards = useLanded(view.dealer, lag);
  const playerCards = useLanded(view.player, lag);
  const dealerDone = dealerCards.length > 0 && dealerCards.every(Boolean) && shown?.status === 'settled';
  const dealerValue = getHandValue(dealerCards);
  const inPlay = !!shown && view.stage !== 'idle';
  const playerValue = getHandValue(playerCards);
  const playerDone = shown?.status === 'settled';
  const wager = inPlay ? shown.amount : stake;

  const getOrigin = useCallback(() => mouth.current?.getBoundingClientRect() ?? null, []);

  const getDealerTone = (): S.Tone => {
    if (dealerValue.total > 21) return 'bust';
    if (isNatural(dealerCards)) return 'gold';
    return outcome?.tone === 'loss' && playerValue.total <= 21 ? 'win' : 'plain';
  };

  const getPlayerCaption = (): string => {
    if (playerValue.total > 21) return 'Bust';
    return isNatural(playerCards) ? 'Blackjack' : 'You';
  };

  const getPlayerTone = (): S.Tone => {
    if (playerValue.total > 21) return 'bust';
    if (isNatural(playerCards) || playerValue.total === 21) return 'gold';
    return outcome?.tone === 'win' ? 'win' : 'plain';
  };

  const renderBanner = () => {
    if (!outcome || !shown) return null;
    let amount = `${shown.total_stake.toLocaleString()} TNB returned`;
    if (outcome.tone === 'loss') amount = `−${shown.total_stake.toLocaleString()} TNB`;
    if (shown.profit > 0) amount = `+${profit.toLocaleString()} TNB`;
    return (
      <S.Banner $tone={outcome.tone} aria-hidden="true" key={shown.id}>
        <S.BannerTitle>{outcome.title}</S.BannerTitle>
        <S.BannerAmount>{amount}</S.BannerAmount>
      </S.Banner>
    );
  };

  const renderChips = () => {
    const doubled = inPlay && view.doubled;
    const exit = outcome?.tone === 'loss' ? 'dealer' : 'player';
    const leaving = view.stage === 'collect' ? exit : undefined;
    const paying = !!shown && shown.profit > 0 && (view.stage === 'payout' || view.stage === 'collect');
    return (
      <S.Circle $empty={wager <= 0} $waiting={view.stage === 'idle' && wager > 0} ref={circle}>
        {wager <= 0 && <S.CircleHint>Bet</S.CircleHint>}
        {wager > 0 && (
          <S.Pile
            $exit={leaving}
            $place="main"
            key={`main-${view.round}`}
            style={{'--pile-x': doubled ? -0.52 : 0} as CSSProperties}
          >
            <ChipStack amount={wager} />
          </S.Pile>
        )}
        {doubled && (
          <S.Pile
            $enter="player"
            $exit={leaving}
            $place="double"
            key={`double-${view.round}`}
            style={{'--pile-x': 0.52} as CSSProperties}
          >
            <ChipStack amount={shown.amount} />
          </S.Pile>
        )}
        {paying && (
          <S.Pile
            $enter="dealer"
            $exit={leaving}
            $place="payout"
            key={`payout-${view.round}`}
            style={{'--pile-x': doubled ? -1.56 : -1.04} as CSSProperties}
          >
            <ChipStack amount={shown.profit} />
          </S.Pile>
        )}
        {wager > 0 && view.stage !== 'collect' && view.stage !== 'payout' && (
          <S.Wager>
            {(doubled ? wager * 2 : wager).toLocaleString()} <small>TNB</small>
          </S.Wager>
        )}
      </S.Circle>
    );
  };

  const renderSeat = (who: 'dealer' | 'player') => {
    const isDealer = who === 'dealer';
    const cards = isDealer ? view.dealer : view.player;
    const landed = isDealer ? dealerCards : playerCards;
    const value = formatHandValue(landed, isDealer ? dealerDone : playerDone);
    const hidden = isDealer && landed.includes(null);
    let label = isDealer ? `Dealer has ${value}` : `You have ${value}`;
    if (hidden) label = `Dealer shows ${value}`;
    return (
      <S.Seat $who={who} style={{'--half': getHalfWidth(cards.length)} as CSSProperties}>
        <Hand
          cards={cards}
          clearing={view.clearing}
          doubled={!isDealer && view.doubled}
          getOrigin={getOrigin}
          handId={view.handId}
          motion={view.motion}
          speed={speed}
          who={who}
        />
        {value && !view.clearing && (
          <S.Total $active={!isDealer && isPlayerTurn} $tone={isDealer ? getDealerTone() : getPlayerTone()}>
            <S.TotalCaption>{isDealer ? 'Dealer' : getPlayerCaption()}</S.TotalCaption>
            <S.TotalValue aria-label={label} key={value} role="img">
              {value}
            </S.TotalValue>
          </S.Total>
        )}
      </S.Seat>
    );
  };

  return (
    <S.Rail>
      <S.Felt aria-label="Blackjack table" role="group" style={{'--speed': speed} as CSSProperties}>
        <S.Tray aria-hidden="true">
          {TRAY.map((color, index) => (
            // The dealer's float never changes
            // eslint-disable-next-line react/no-array-index-key
            <span key={index} style={{'--chip': color} as CSSProperties} />
          ))}
        </S.Tray>
        <S.Discard aria-hidden="true" viewBox="0 0 130 110">
          <g transform="rotate(12 65 55)">
            <rect fill="#000000" height="80" opacity="0.25" rx="10" width="94" x="21" y="19" />
            <rect
              fill="#c2212f"
              fillOpacity="0.3"
              height="80"
              rx="10"
              stroke="#ea6470"
              strokeWidth="2"
              width="94"
              x="18"
              y="14"
            />
            <g transform="rotate(-6 60 52)">
              <rect fill="#fdfcf7" height="44" rx="4" width="62" x="30" y="30" />
              <rect fill="#bb2433" height="37" rx="2.5" width="55" x="33.5" y="33.5" />
            </g>
            <g transform="rotate(4 66 58)">
              <rect fill="#fdfcf7" height="44" rx="4" width="62" x="35" y="36" />
              <rect fill="#bb2433" height="37" rx="2.5" width="55" x="38.5" y="39.5" />
            </g>
            <rect fill="#ffffff" height="6" opacity="0.2" rx="3" width="70" x="30" y="19" />
          </g>
        </S.Discard>
        <S.Shoe aria-hidden="true">
          <svg viewBox="0 0 150 120">
            <ellipse cx="84" cy="106" fill="#000000" opacity="0.3" rx="58" ry="8" />
            <g transform="rotate(-14 75 60)">
              <rect fill="#fdfcf7" height="46" rx="4.5" width="64" x="4" y="37" />
              <rect fill="#bb2433" height="39" rx="3" width="57" x="7.5" y="40.5" />
              <rect fill="#17191d" height="88" rx="13" width="104" x="36" y="16" />
              <rect fill="#0a0b0d" height="66" rx="7" width="80" x="50" y="27" />
              <rect fill="#f4f0e4" height="54" rx="4" width="66" x="57" y="33" />
              {[62, 68, 74, 80, 86, 92, 98, 104, 110, 116].map((x) => (
                <line key={x} stroke="#c9c2b0" strokeWidth="1" x1={x} x2={x} y1="34" y2="86" />
              ))}
              <rect fill="#272a30" height="88" rx="6.5" width="15" x="36" y="16" />
              <rect fill="#ffffff" height="4" opacity="0.14" rx="2" width="84" x="46" y="19" />
              <rect fill="none" height="88" rx="13" stroke="#e4bf62" strokeOpacity="0.45" width="104" x="36" y="16" />
            </g>
          </svg>
          <S.ShoeMouth ref={mouth} />
        </S.Shoe>
        <Print />
        <Print compact />
        {renderSeat('dealer')}
        {renderSeat('player')}
        {renderChips()}
        {renderBanner()}
        <Celebration anchor={circle} burst={burst} />
      </S.Felt>
    </S.Rail>
  );
};

export default Felt;
