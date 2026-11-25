import styled, {css, keyframes} from 'styled-components';

import {plate, room, roomSerif} from '../theme';

export type Tone = 'bust' | 'gold' | 'plain' | 'win';

type OutcomeTone = 'blackjack' | 'loss' | 'push' | 'win';
type Side = 'dealer' | 'player';

const COMPACT = '560px';

// A fine grain over the felt, so it reads as cloth instead of a flat color
const GRAIN =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E` +
  `%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix ` +
  `values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='180' height='180' ` +
  `filter='url(%23n)'/%3E%3C/svg%3E")`;

const bannerIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.55);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fromDealer = keyframes`
  from {
    opacity: 0;
    transform: translate(calc(var(--pile-x) * var(--chip-w)), -62cqh);
  }
`;

const fromPlayer = keyframes`
  from {
    opacity: 0;
    transform: translate(calc(var(--pile-x) * var(--chip-w)), 22cqh);
  }
`;

const invite = keyframes`
  0%, 100% {
    box-shadow:
      inset 0 0 0 4px #04281b66,
      inset 0 0 20px #00000059,
      0 0 0 0 ${room.gold}00;
  }

  50% {
    box-shadow:
      inset 0 0 0 4px #04281b66,
      inset 0 0 20px #00000059,
      0 0 0 7px ${room.gold}2e;
  }
`;

const pop = keyframes`
  from {
    transform: scale(0.72);
  }

  60% {
    transform: scale(1.12);
  }

  to {
    transform: scale(1);
  }
`;

const shine = keyframes`
  from {
    transform: translateX(-140%) skewX(-18deg);
  }

  to {
    transform: translateX(340%) skewX(-18deg);
  }
`;

const sweep = keyframes`
  to {
    opacity: 0;
    transform: translate(-44cqw, var(--sweep-y)) rotate(-34deg) scale(0.5);
  }
`;

const turn = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 ${room.goldLight}00;
  }

  50% {
    box-shadow: 0 0 0 5px ${room.goldLight}40;
  }
`;

const bannerTones: Record<OutcomeTone, ReturnType<typeof css>> = {
  blackjack: css`
    background: linear-gradient(180deg, #fff3c4, ${room.goldLight} 30%, ${room.gold} 68%, ${room.goldDeep});
    border-color: #fff8dc;
    box-shadow:
      0 0 0 4px #1b140433,
      0 14px 44px ${room.gold}8c;
    color: ${room.ink};
  `,
  loss: css`
    background: linear-gradient(180deg, #2a1215f2, #17090bf2);
    border-color: ${room.redDeep};
    box-shadow: 0 14px 34px #00000073;
    color: #ffdcd9;
  `,
  push: css`
    background: linear-gradient(180deg, #17241ff2, #0a1310f2);
    border-color: ${room.lineStrong};
    box-shadow: 0 14px 34px #00000073;
    color: ${room.ivory};
  `,
  win: css`
    background: linear-gradient(180deg, #37d184, ${room.green} 45%, ${room.greenDeep});
    border-color: ${room.goldLight};
    box-shadow:
      0 0 0 4px #04281b40,
      0 14px 40px #21ad6680;
    color: #ffffff;
  `,
};

const totalTones: Record<Tone, ReturnType<typeof css>> = {
  bust: css`
    background: linear-gradient(180deg, ${room.red}, ${room.redDeep});
    border-color: #ff8b8b;
    color: #ffffff;
  `,
  gold: css`
    background: linear-gradient(180deg, ${room.goldLight}, ${room.gold});
    border-color: #fff3c4;
    color: ${room.ink};
  `,
  plain: css`
    background: #04160fd9;
    border-color: ${room.gold}8c;
    color: ${room.ivory};
  `,
  win: css`
    background: linear-gradient(180deg, #2fc97c, ${room.greenDeep});
    border-color: ${room.mint};
    color: #ffffff;
  `,
};

export const Banner = styled.div<{$tone: OutcomeTone}>`
  ${({$tone}) => bannerTones[$tone]};
  animation: ${bannerIn} calc(520ms * var(--speed, 1)) cubic-bezier(0.2, 1.5, 0.35, 1) both;
  border-radius: 999px;
  border-style: solid;
  border-width: 2px;
  left: 50%;
  max-width: 94cqw;
  overflow: hidden;
  padding: clamp(7px, 1.6cqh, 12px) clamp(20px, 5cqw, 52px);
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 41.5cqh;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  z-index: 5;

  &::after {
    animation: ${shine} 1.5s ease-in-out 0.35s 2 both;
    background: linear-gradient(90deg, transparent, #ffffff8c, transparent);
    content: '';
    display: ${({$tone}) => ($tone === 'blackjack' || $tone === 'win' ? 'block' : 'none')};
    inset: 0 auto 0 0;
    position: absolute;
    width: 30%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::after {
      display: none;
    }
  }
`;

export const BannerAmount = styled.div`
  font-size: clamp(12px, 3.1cqh, 16px);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.3;
  opacity: 0.92;
`;

export const BannerTitle = styled.div`
  font-family: ${roomSerif};
  font-size: clamp(21px, 6.2cqh, 38px);
  font-weight: 700;
  letter-spacing: 0.07em;
  line-height: 1.1;
  text-transform: uppercase;
`;

// The betting circle printed on the felt in front of the player
export const Circle = styled.div<{$empty: boolean; $waiting: boolean}>`
  animation: ${({$waiting}) =>
    $waiting
      ? css`
          ${invite} 2.6s ease-in-out infinite
        `
      : 'none'};
  aspect-ratio: 1;
  background: radial-gradient(circle, #ffffff12, transparent 68%);
  border: 2px solid ${room.gold}${({$empty}) => ($empty ? '73' : 'b3')};
  border-radius: 50%;
  bottom: 4.5cqh;
  box-shadow:
    inset 0 0 0 4px #04281b66,
    inset 0 0 20px #00000059;
  display: grid;
  left: 50%;
  place-items: center;
  position: absolute;
  transform: translateX(-50%);
  width: min(27cqw, 20cqh);
  z-index: 3;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CircleHint = styled.span`
  color: ${room.gold}8c;
  font-family: ${roomSerif};
  font-size: clamp(12px, 3.4cqh, 18px);
  font-weight: 700;
  letter-spacing: 0.22em;
  padding-left: 0.22em;
  text-transform: uppercase;
`;

export const Discard = styled.svg`
  display: block;
  left: 3.5cqw;
  pointer-events: none;
  position: absolute;
  top: 4.5cqh;
  width: calc(var(--card-w) * 1.3);
  z-index: 1;

  @container (max-width: ${COMPACT}) {
    display: none;
  }
`;

export const Felt = styled.div`
  --card-h: calc(var(--card-w) * 1.4);
  --card-w: min(21cqw, 19cqh);
  --chip-w: min(13.5cqw, 11cqh);
  background:
    radial-gradient(ellipse 62% 48% at 50% 26%, #23a973b3, transparent 72%),
    radial-gradient(ellipse 90% 85% at 50% 42%, ${room.felt}, ${room.feltDeep} 72%, ${room.feltEdge});
  border-radius: 26px 26px 50% 50% / 26px 26px 56% 56%;
  box-shadow:
    inset 0 0 0 2px ${room.gold}66,
    inset 0 0 0 6px #04281b8c,
    inset 0 12px 70px #00000073;
  container-type: size;
  height: clamp(380px, calc(100vh - 400px), 640px);
  isolation: isolate;
  overflow: hidden;
  position: relative;

  &::before {
    background-image: ${GRAIN};
    content: '';
    inset: 0;
    mix-blend-mode: overlay;
    opacity: 0.32;
    pointer-events: none;
    position: absolute;
    z-index: 0;
  }

  @media (max-width: 640px) {
    border-radius: 20px 20px 50% 50% / 20px 20px 44% 44%;
    height: clamp(340px, 96vw, 420px);
  }
`;

export const Hand = styled.div<{$clearing: boolean; $who: Side}>`
  --sweep-y: ${({$who}) => ($who === 'dealer' ? '-2cqh' : '-46cqh')};
  inset: 0;
  position: absolute;

  ${({$clearing}) =>
    $clearing &&
    css`
      > * {
        animation: ${sweep} calc(400ms * var(--speed, 1)) cubic-bezier(0.5, 0, 0.8, 0.4) both;
      }
    `}
`;

// A stack of chips in the betting circle: it slides in from the side that put it there and leaves toward its winner
export const Pile = styled.div<{$enter?: Side; $exit?: Side; $place: 'double' | 'main' | 'payout'}>`
  animation: ${({$enter}) => {
    if (!$enter) return 'none';
    return css`
      ${$enter === 'dealer'
        ? fromDealer
        : fromPlayer} calc(460ms * var(--speed, 1)) cubic-bezier(0.25, 0.8, 0.3, 1) backwards
    `;
  }};
  left: 50%;
  margin: calc(var(--chip-w) / -2) 0 0 calc(var(--chip-w) / -2);
  opacity: ${({$exit}) => ($exit ? 0 : 1)};
  position: absolute;
  top: 50%;
  transform: translate(
    calc(var(--pile-x) * var(--chip-w)),
    ${({$exit}) => {
      if (!$exit) return '0';
      return $exit === 'dealer' ? '-70cqh' : '26cqh';
    }}
  );
  transition:
    opacity calc(360ms * var(--speed, 1)) ease calc(220ms * var(--speed, 1)),
    transform calc(580ms * var(--speed, 1)) cubic-bezier(0.55, 0, 0.45, 1);
  width: var(--chip-w);
  z-index: ${({$place}) => ($place === 'main' ? 1 : 2)};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

export const Print = styled.svg<{$compact: boolean}>`
  bottom: calc(24cqh + var(--card-h) + 0.6cqh);
  display: ${({$compact}) => ($compact ? 'none' : 'block')};
  left: 50%;
  overflow: visible;
  pointer-events: none;
  position: absolute;
  transform: translateX(-50%);
  width: ${({$compact}) => ($compact ? '92cqw' : 'min(80cqw, 170cqh)')};
  z-index: 1;

  @container (max-width: ${COMPACT}) {
    display: ${({$compact}) => ($compact ? 'block' : 'none')};
  }
`;

export const PrintBand = styled.path`
  fill: #04281b61;
  stroke: ${room.gold}a6;
  stroke-width: 1.5;
`;

export const PrintRule = styled.text`
  fill: ${room.ivory};
  font-family: ${roomSerif};
  font-weight: 700;
  opacity: 0.86;
`;

export const PrintTitle = styled.text`
  fill: #ecca6c;
  font-family: ${roomSerif};
  font-weight: 700;
  opacity: 0.95;
  paint-order: stroke;
  stroke: #05301f73;
  stroke-width: 1.5px;
`;

// The padded rail around the felt: straight on the dealer's side, round on the player's
export const Rail = styled.div`
  background:
    linear-gradient(180deg, #ffffff14, transparent 14%),
    linear-gradient(180deg, #553623, ${room.walnut} 30%, ${room.walnutDeep});
  border-radius: 40px 40px 50% 50% / 40px 40px 57% 57%;
  box-shadow:
    inset 0 1px 0 #ffffff29,
    inset 0 -4px 8px #00000080,
    0 24px 44px #00000066;
  padding: clamp(9px, 1.25vw, 16px);
  position: relative;

  @media (max-width: 640px) {
    border-radius: 28px 28px 50% 50% / 28px 28px 45% 45%;
  }
`;

export const Seat = styled.div<{$who: Side}>`
  bottom: ${({$who}) => ($who === 'player' ? '24cqh' : 'auto')};
  height: var(--card-h);
  left: 50%;
  position: absolute;
  top: ${({$who}) => ($who === 'dealer' ? '7cqh' : 'auto')};
  width: 0;
  z-index: 2;
`;

export const Shoe = styled.div`
  pointer-events: none;
  position: absolute;
  right: 3.5cqw;
  top: 3.5cqh;
  width: calc(var(--card-w) * 1.5);
  z-index: 1;

  svg {
    display: block;
    width: 100%;
  }
`;

// The point cards are dealt from
export const ShoeMouth = styled.span`
  height: 1px;
  left: 24%;
  position: absolute;
  top: 52%;
  width: 1px;
`;

export const Slot = styled.div`
  left: calc(var(--card-w) / -2);
  position: absolute;
  top: 0;
  transform: translateX(calc(var(--x) * var(--card-w)));
  transition: transform calc(340ms * var(--speed, 1)) cubic-bezier(0.3, 0.7, 0.3, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Total = styled.div<{$active: boolean; $tone: Tone}>`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  right: calc(var(--half) * var(--card-w) + clamp(8px, 1.8cqw, 20px));
  top: 50%;
  transform: translateY(-50%);
  transition: right calc(340ms * var(--speed, 1)) cubic-bezier(0.3, 0.7, 0.3, 1);

  > :last-child {
    ${({$tone}) => totalTones[$tone]};
    animation: ${({$active}) =>
      $active
        ? css`
            ${pop} 280ms ease-out both, ${turn} 1.8s ease-in-out 280ms infinite
          `
        : css`
            ${pop} 280ms ease-out both
          `};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    > :last-child {
      animation: none;
    }
  }
`;

export const TotalCaption = styled.span`
  ${plate};
  color: #d5e4dc;
  font-size: 10px;
  text-shadow: 0 1px 2px #00000080;
  white-space: nowrap;

  @container (max-width: ${COMPACT}) {
    font-size: 9px;
    letter-spacing: 0.12em;
  }
`;

export const TotalValue = styled.span`
  border-radius: 999px;
  border-style: solid;
  border-width: 1.5px;
  box-shadow: 0 4px 12px #00000059;
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  line-height: 1;
  min-width: 46px;
  padding: 8px 12px;
  text-align: center;
  white-space: nowrap;

  @container (max-width: ${COMPACT}) {
    font-size: 15px;
    min-width: 38px;
    padding: 6px 9px;
  }
`;

// The dealer's float: tubes of chips along the top edge of the table
export const Tray = styled.div`
  background: linear-gradient(180deg, #0b0c0e, #1d2024);
  border-radius: 0 0 10px 10px;
  box-shadow:
    0 3px 9px #00000073,
    inset 0 -1px 0 #ffffff1f;
  display: flex;
  gap: 3px;
  height: max(18px, 4.6cqh);
  left: 50%;
  padding: 0 6px 4px;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: min(44cqw, 320px);
  z-index: 1;

  span {
    background: repeating-linear-gradient(180deg, var(--chip) 0 3px, #00000061 3px 4px);
    border-radius: 0 0 3px 3px;
    box-shadow:
      inset 2px 0 2px #ffffff38,
      inset -2px 0 3px #00000073;
    flex: 1;
  }
`;

export const Wager = styled.span`
  background: #04160fe6;
  border: 1px solid ${room.gold}8c;
  border-radius: 999px;
  bottom: -5px;
  color: ${room.goldLight};
  font-size: clamp(11px, 2.9cqh, 14px);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  left: 50%;
  line-height: 1;
  padding: 4px 9px;
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 3;

  small {
    font-size: 0.72em;
    letter-spacing: 0.08em;
    opacity: 0.8;
  }
`;
