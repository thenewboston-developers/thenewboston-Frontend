import {memo, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {prefersReducedMotion} from '../hooks';
import {room, roomSerif} from '../theme';
import {describeCard, getRank, getSuit, isRedSuit, Suit} from '../utils';

import * as S from './Styles';

interface CardProps {
  // Dealt from the shoe: the card flies to its place and turns over as it lands
  animate?: boolean;
  // `null` is a card lying face down
  card: string | null;
  className?: string;
  // The middle of the shoe's mouth, where a dealt card starts from
  getOrigin?(): DOMRect | null;
  // The one card of a double down lies across the hand
  sideways?: boolean;
  // Shortens every movement: 1 is the normal pace
  speed?: number;
}

interface Pip {
  flip?: boolean;
  x: number;
  y: number;
}

const CENTER = 125;
const LEFT = 84;
const RIGHT = 166;
const ROWS = [80, 143, 207, 270];
const TURN_DELAY = 230;

const column = (x: number, rows: number[]): Pip[] => rows.map((y) => ({flip: y > 175, x, y}));

// Where the pips sit on each number card, the way every deck prints them
const PIPS: Record<string, Pip[]> = {
  '10': [...column(LEFT, ROWS), ...column(RIGHT, ROWS), {x: CENTER, y: 112}, {flip: true, x: CENTER, y: 238}],
  '2': column(CENTER, [80, 270]),
  '3': column(CENTER, [80, 175, 270]),
  '4': [...column(LEFT, [80, 270]), ...column(RIGHT, [80, 270])],
  '5': [...column(LEFT, [80, 270]), ...column(RIGHT, [80, 270]), {x: CENTER, y: 175}],
  '6': [...column(LEFT, [80, 175, 270]), ...column(RIGHT, [80, 175, 270])],
  '7': [...column(LEFT, [80, 175, 270]), ...column(RIGHT, [80, 175, 270]), {x: CENTER, y: 127}],
  '8': [
    ...column(LEFT, [80, 175, 270]),
    ...column(RIGHT, [80, 175, 270]),
    {x: CENTER, y: 127},
    {flip: true, x: CENTER, y: 223},
  ],
  '9': [...column(LEFT, ROWS), ...column(RIGHT, ROWS), {x: CENTER, y: 175}],
};

// Each suit drawn in a 100 by 100 box, so the cards look the same on every device
const SUIT_PATHS: Record<Suit, string> = {
  C:
    'M50 5a21.5 21.5 0 1 1 0 43a21.5 21.5 0 1 1 0-43ZM27 36.5a21.5 21.5 0 1 1 0 43a21.5 21.5 0 1 1 0-43Z' +
    'M73 36.5a21.5 21.5 0 1 1 0 43a21.5 21.5 0 1 1 0-43ZM38 40h24v26H38ZM50 58c1 16 6 29 17 37H33c11-8 16-21 17-37Z',
  D: 'M50 3C59 21 72 37 89 50 72 63 59 79 50 97 41 79 28 63 11 50 28 37 41 21 50 3Z',
  H: 'M50 91C18 66 5 49 5 31 5 16 16 6 29 6c9 0 17 5 21 14 4-9 12-14 21-14 13 0 24 10 24 25 0 18-13 35-45 60Z',
  S:
    'M50 4C38 24 6 40 6 63c0 13 10 22 22 22 8 0 15-4 19-10-1 10-5 17-13 22h32c-8-5-12-12-13-22 4 6 11 10 19 10 12 0 ' +
    '22-9 22-22C94 40 62 24 50 4Z',
};

const SuitMark = ({flip, size, suit, x, y}: Pip & {size: number; suit: Suit}) => (
  <path
    d={SUIT_PATHS[suit]}
    transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 100})${flip ? ' rotate(180 50 50)' : ''}`}
  />
);

const renderCrown = (rank: string) => {
  if (rank === 'J')
    return <path d="M125 50c9 5 14 12 14 22h-28c0-10 5-17 14-22Zm-17 26h34v6h-34Z" fill="#c9a144" stroke="#8a6a1f" />;
  const points = rank === 'K' ? 'M103 80l3-20 9 10 10-18 10 18 9-10 3 20Z' : 'M105 80l2-16 8 8 10-16 10 16 8-8 2 16Z';
  return (
    <g fill="#c9a144" stroke="#8a6a1f">
      <path d={points} />
      {(rank === 'K' ? [106, 125, 144] : [107, 125, 143]).map((x) => (
        <circle cx={x} cy={rank === 'K' && x === 125 ? 50 : 58} key={x} r={rank === 'K' ? 3 : 3.6} />
      ))}
    </g>
  );
};

// A court card is drawn twice, the second time upside down, so it reads the same from both ends of the table
const renderCourt = (rank: string, suit: Suit, ink: string): ReactNode => {
  const half = (
    <>
      {renderCrown(rank)}
      <text fontFamily={roomSerif} fontSize="84" fontWeight="700" textAnchor="middle" x="125" y="156">
        {rank}
      </text>
      <SuitMark size={22} suit={suit} x={76} y={66} />
    </>
  );
  return (
    <>
      <rect fill={isRedSuit(suit) ? '#fdf1ee' : '#eef1f6'} height="262" rx="9" width="138" x="56" y="44" />
      <rect fill="none" height="262" rx="9" stroke={ink} strokeWidth="2.5" width="138" x="56" y="44" />
      <rect fill="none" height="250" rx="6" stroke="#c9a144" strokeWidth="1.2" width="126" x="62" y="50" />
      <rect height="10" width="126" x="62" y="170" />
      <rect fill="#c9a144" height="2" width="126" x="62" y="174" />
      {half}
      <g transform="rotate(180 125 175)">{half}</g>
    </>
  );
};

const renderCenter = (rank: string, suit: Suit, ink: string): ReactNode => {
  if (rank === 'A') {
    const size = suit === 'S' ? 132 : 108;
    return (
      <>
        <SuitMark size={size} suit={suit} x={CENTER} y={175} />
        {suit === 'S' && (
          <g fill={room.cardFace}>
            <SuitMark size={44} suit={suit} x={CENTER} y={178} />
          </g>
        )}
      </>
    );
  }
  if (PIPS[rank]) return PIPS[rank].map((pip) => <SuitMark key={`${pip.x}:${pip.y}`} size={46} suit={suit} {...pip} />);
  return renderCourt(rank, suit, ink);
};

export const CardFace = memo(({card}: {card: string}) => {
  const rank = getRank(card);
  const suit = getSuit(card);
  const ink = isRedSuit(suit) ? room.cardRed : room.cardInk;
  const index = (
    <>
      <text
        fontFamily={roomSerif}
        fontSize={rank === '10' ? 38 : 44}
        fontWeight="700"
        letterSpacing={rank === '10' ? -4 : 0}
        textAnchor="middle"
        x="30"
        y="50"
      >
        {rank}
      </text>
      <SuitMark size={26} suit={suit} x={30} y={74} />
    </>
  );
  return (
    <svg aria-hidden="true" fill={ink} viewBox="0 0 250 350">
      {index}
      <g transform="rotate(180 125 175)">{index}</g>
      {renderCenter(rank, suit, ink)}
    </svg>
  );
});

CardFace.displayName = 'CardFace';

/**
 * A playing card on the felt. A dealt card leaves the shoe face down, flies to its place and turns over as it lands;
 * the dealer's hole card turns over where it lies once its value is known.
 */
const Card = ({animate = false, card, className, getOrigin, sideways = false, speed = 1}: CardProps) => {
  const [flying] = useState(() => animate && !prefersReducedMotion());
  const [faceUp, setFaceUp] = useState(() => !!card && !flying);
  const flyer = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  // The face stays drawn while a card is turned back over
  const shown = useRef(card);
  if (card) shown.current = card;

  useLayoutEffect(() => {
    const element = flyer.current;
    const origin = flying ? getOrigin?.() : null;
    if (!element || !origin) return;
    const bounds = element.getBoundingClientRect();
    const x = origin.left + origin.width / 2 - (bounds.left + bounds.width / 2);
    const y = origin.top + origin.height / 2 - (bounds.top + bounds.height / 2);
    // A card lying across the hand measures its flight along its own turned axes
    element.style.setProperty('--from-x', `${sideways ? y : x}px`);
    element.style.setProperty('--from-y', `${sideways ? -x : y}px`);
    // The flight happens once, when the card is dealt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const dealt = flying && !mounted.current;
    mounted.current = true;
    if (!card) {
      setFaceUp(false);
      return undefined;
    }
    if (!dealt) {
      setFaceUp(true);
      return undefined;
    }
    const timer = setTimeout(() => setFaceUp(true), TURN_DELAY * speed);
    return () => clearTimeout(timer);
    // Only a change of the card itself turns it over
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  return (
    <S.Card $sideways={sideways} aria-label={describeCard(card)} className={className} role="img">
      <S.Flyer $flying={flying} ref={flyer}>
        <S.Flipper $faceUp={faceUp}>
          <S.Front>{shown.current && <CardFace card={shown.current} />}</S.Front>
          <S.Back />
        </S.Flipper>
      </S.Flyer>
    </S.Card>
  );
};

export default Card;
