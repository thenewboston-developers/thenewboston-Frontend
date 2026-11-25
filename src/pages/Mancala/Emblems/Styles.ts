import styled, {css, keyframes} from 'styled-components';

import {fonts} from 'styles';

import {carved, glassStone, mancala, STONES, StoneTone, WOOD_GRAIN} from '../theme';

import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PIT_SIZE,
  SOWN,
  STONE_HEIGHT,
  STONE_RATIO,
  STONE_SIZE,
  STORE,
  toLeft,
  toTop,
} from './geometry';

// One loop of the demonstration: cue the pit, lift the stones, sow them one by one, celebrate, reset
const CYCLE = '7.2s';
const LIFT = -5;

// The honey wood of the hero's board, for the small illustrated boards and emblem tiles
const honeyWood = css`
  background:
    ${WOOD_GRAIN}, radial-gradient(ellipse 70% 60% at 25% 0%, #ffe1ad59, transparent 70%),
    linear-gradient(160deg, #eaa75f, #cf8a45 52%, #b56f31);
  box-shadow:
    inset 0 2px 1px #ffe2b399,
    inset 0 -3px 2px #7a3f1666,
    0 4px 0 #6b3412,
    0 10px 18px #1a0a0240;
`;

// Light from the top left leaves the upper rim of a carved bowl in shadow, like the pits of the hero's board
const HONEY_HOLLOW_SHADOW = 'inset 2px 5px 7px #5e2a0bb3, inset -1px -2px 3px #ffdcaa66, 0 1px 0 #ffe7bf80';

const honeyHollow = css`
  background: radial-gradient(ellipse 110% 100% at 60% 72%, #eba862 0%, #cd8642 50%, #9e5b24 100%);
  box-shadow: ${HONEY_HOLLOW_SHADOW};
`;

// A move in board units, as a transform of a stone (whose own size the percentages refer to), then its turn
const shift = (x: number, y: number, turn: number, scale = 1) =>
  `translate(${(x / STONE_SIZE) * 100}%, ${(y / STONE_HEIGHT) * 100}%) scale(${scale}) rotate(${turn}deg)`;

// Every sown stone waits, lifted, in the third pit, then hops along a parabola to the pit or store it lands in
const FLIGHTS = SOWN.map(({from, tilt, to}, stone) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const start = 14 + stone * 9;
  const end = start + (stone === SOWN.length - 1 ? 10 : 8);
  // Longer hops arc higher, so the stone bound for the store clears the pits it passes
  const peak = Math.min(LIFT, dy) - 22 - Math.abs(dx) * 0.14;
  const hops = [0.2, 0.4, 0.6, 0.8]
    .map((t) => {
      const y = (1 - t) * (1 - t) * LIFT + 2 * (1 - t) * t * peak + t * t * dy;
      return `${(start + (end - start) * t).toFixed(1)}% { transform: ${shift(t * dx, y, tilt + t * 160, 1.12)}; }`;
    })
    .join('\n');
  return keyframes`
    0%, 7% { opacity: 1; transform: ${shift(0, 0, tilt)}; }
    11%, ${start}% { opacity: 1; transform: ${shift(0, LIFT, tilt, 1.06)}; }
    ${hops}
    ${end}%, 84% { opacity: 1; transform: ${shift(dx, dy, tilt + 160)}; }
    90% { opacity: 0; transform: ${shift(dx, dy, tilt + 160)}; }
    91% { opacity: 0; transform: ${shift(0, 0, tilt)}; }
    97%, 100% { opacity: 1; transform: ${shift(0, 0, tilt)}; }
  `;
});

const STORE_GLOW = `${HONEY_HOLLOW_SHADOW}, 0 0 0 2px #fff0c8, 0 0 22px #ffd27acc`;

const bob = keyframes`
  0%, 100% { transform: translate(-50%, 0) rotate(-12deg); }
  50% { transform: translate(-50%, -7px) rotate(-4deg); }
`;

const celebrate = keyframes`
  0%, 50% { opacity: 0; transform: translateY(6px) scale(0.9); }
  55%, 84% { opacity: 1; transform: translateY(0) scale(1); }
  90%, 100% { opacity: 0; transform: translateY(-4px) scale(0.95); }
`;

const cueSource = keyframes`
  0%, 1% { box-shadow: ${HONEY_HOLLOW_SHADOW}, 0 0 0 0 #7fe6d000; }
  4%, 13% { box-shadow: ${HONEY_HOLLOW_SHADOW}, 0 0 0 2px #7fe6d0, 0 0 16px #7fe6d0b3; }
  20%, 100% { box-shadow: ${HONEY_HOLLOW_SHADOW}, 0 0 0 0 #7fe6d000; }
`;

const fillStore = keyframes`
  0%, 50% { box-shadow: ${HONEY_HOLLOW_SHADOW}; }
  54%, 84% { box-shadow: ${STORE_GLOW}; }
  92%, 100% { box-shadow: ${HONEY_HOLLOW_SHADOW}; }
`;

// A stone hopping from pit to pit, for loading states. The pits are 2.5 stones apart.
const hop = keyframes`
  0% { opacity: 0; transform: translate(0, -2px); }
  8%, 22% { opacity: 1; transform: translate(0, 0); }
  36% { transform: translate(125%, -130%) rotate(90deg); }
  50%, 64% { transform: translate(250%, 0) rotate(180deg); }
  78% { transform: translate(375%, -130%) rotate(270deg); }
  92% { opacity: 1; transform: translate(500%, 0) rotate(360deg); }
  100% { opacity: 0; transform: translate(500%, 0) rotate(360deg); }
`;

const shadowBob = keyframes`
  0%, 100% { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.55; transform: translate(-50%, -50%) scale(0.8); }
`;

export const Caption = styled.p`
  color: ${mancala.sand};
  font-size: 13px;
  line-height: 1.6;
  margin: 18px auto 0;
  max-width: 400px;
  text-align: center;
`;

export const Demo = styled.figure`
  margin: auto auto 0;
  max-width: 460px;
  padding-top: 18px;
  width: 100%;
`;

export const DemoBoard = styled.div`
  ${honeyWood};
  aspect-ratio: ${BOARD_WIDTH} / ${BOARD_HEIGHT};
  border-radius: 8.5% / 22.7%;
  position: relative;
  width: 100%;
`;

export const DemoPit = styled.span<{$source?: boolean}>`
  ${honeyHollow};
  border-radius: 50%;
  height: ${toTop(PIT_SIZE)};
  position: absolute;
  transform: translate(-50%, -50%);
  width: ${toLeft(PIT_SIZE)};

  ${({$source}) =>
    $source &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${cueSource} ${CYCLE} ease-in-out infinite both;
      }
    `}
`;

// A sown stone sits where it landed; with motion allowed, it replays the sowing on a loop
export const DemoStone = styled.span<{$flight?: number; $tone: StoneTone}>`
  ${({$tone}) => glassStone($tone)};
  aspect-ratio: ${STONE_RATIO} / 1;
  position: absolute;
  transform: rotate(var(--tilt, 0deg));
  width: ${toLeft(STONE_SIZE)};

  ${({$flight}) => {
    if ($flight === undefined) return null;
    const {from, tilt, to} = SOWN[$flight];
    return css`
      transform: ${shift(to.x - from.x, to.y - from.y, tilt + 160)};
      z-index: 2;

      @media (prefers-reduced-motion: no-preference) {
        animation: ${FLIGHTS[$flight]} ${CYCLE} linear infinite both;
      }
    `;
  }}
`;

export const DemoStore = styled.span<{$filled?: boolean}>`
  ${honeyHollow};
  border-radius: 999px;
  height: ${toTop(STORE.height)};
  position: absolute;
  top: ${toTop(STORE.top)};
  width: ${toLeft(STORE.width)};

  ${({$filled}) =>
    $filled &&
    css`
      box-shadow: ${STORE_GLOW};

      @media (prefers-reduced-motion: no-preference) {
        animation: ${fillStore} ${CYCLE} ease-in-out infinite both;
      }
    `}
`;

// Two pits of each row, facing each other across the board
export const EmblemRows = styled.span`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 20px);
`;

export const EmblemStore = styled.span<{$width?: number}>`
  ${honeyHollow};
  border-radius: 999px;
  display: block;
  flex: 0 0 auto;
  height: 42px;
  position: relative;
  width: ${({$width = 16}) => $width}px;
`;

export const EmblemTile = styled.span`
  ${honeyWood};
  align-items: center;
  border-radius: 18px;
  display: flex;
  flex: 0 0 auto;
  gap: 5px;
  height: 60px;
  justify-content: center;
  position: relative;
  width: 60px;
`;

export const EmptyBoard = styled.div`
  flex: 0 0 auto;
  max-width: 230px;
  width: 42%;

  @media (max-width: 600px) {
    max-width: 260px;
    width: 100%;
  }
`;

export const Loader = styled.span`
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 4px;
  position: relative;
`;

export const LoaderPit = styled.span`
  ${carved};
  border-radius: 50%;
  display: block;
  height: 16px;
  width: 16px;
`;

export const LoaderStone = styled.span`
  ${glassStone(STONES.amber)};
  height: 7px;
  left: 4px;
  position: absolute;
  top: 4.5px;
  width: 8px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${hop} 1.6s ease-in-out infinite;
  }
`;

export const Pit = styled.span<{$honey?: boolean; $size: number}>`
  ${({$honey}) => ($honey ? honeyHollow : carved)};
  border-radius: 50%;
  display: block;
  flex: 0 0 auto;
  height: ${({$size}) => $size}px;
  position: relative;
  width: ${({$size}) => $size}px;
`;

export const PitStone = styled.span<{$tone: StoneTone}>`
  ${({$tone}) => glassStone($tone)};
  aspect-ratio: ${STONE_RATIO} / 1;
  position: absolute;
  transform: translate(-50%, -50%) rotate(var(--tilt, 0deg));
  width: var(--stone-size, 30%);
`;

export const PlayAgain = styled.span`
  background: linear-gradient(180deg, ${mancala.amberLight}, ${mancala.amber});
  border-radius: 999px;
  box-shadow:
    inset 0 1px 0 #fff3d0,
    0 2px 0 ${mancala.amberDeep},
    0 6px 12px #1a0a0259;
  color: ${mancala.ink};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  padding: 4px 10px;
  position: absolute;
  right: 1%;
  top: -12px;
  white-space: nowrap;
  z-index: 3;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${celebrate} ${CYCLE} ease-out infinite both;
  }
`;

export const Podium = styled.div`
  ${honeyWood};
  border-radius: 999px;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
`;

// A rank pit with its number cut into the wood
export const PodiumPit = styled.span`
  ${honeyHollow};
  align-items: center;
  border-radius: 50%;
  color: #7a3a10;
  display: flex;
  font-size: 17px;
  font-weight: ${fonts.weight.extraBold};
  height: 48px;
  justify-content: center;
  position: relative;
  text-shadow: 0 1px 0 #ffd9a080;
  width: 48px;
`;

// The first stone, hovering over the empty first place
export const PodiumStone = styled.span`
  ${glassStone(STONES.amber)};
  height: 19px;
  left: 50%;
  position: absolute;
  top: -15px;
  transform: translate(-50%, 0) rotate(-12deg);
  width: 23px;
  z-index: 1;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${bob} 2.8s ease-in-out infinite;
  }
`;

export const PodiumStoneShadow = styled.span`
  background: radial-gradient(ellipse at center, #5a2a0c80, transparent 70%);
  height: 10px;
  left: 50%;
  position: absolute;
  top: 52%;
  transform: translate(-50%, -50%);
  width: 26px;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${shadowBob} 2.8s ease-in-out infinite;
  }
`;

export const ScoreStore = styled.span<{$leading: boolean}>`
  ${carved};
  align-items: center;
  border-radius: 999px;
  color: ${({$leading}) => ($leading ? mancala.amberLight : mancala.cream)};
  display: flex;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.extraBold};
  height: 40px;
  justify-content: center;
  width: 24px;

  ${({$leading}) =>
    $leading &&
    css`
      box-shadow:
        inset 0 5px 10px #0d0603b3,
        0 0 0 1px #ffe2a3b3,
        0 0 10px #ffc76b66;
    `}
`;

export const ScoreTile = styled.span`
  ${honeyWood};
  align-items: center;
  border-radius: 16px;
  display: flex;
  flex: 0 0 auto;
  gap: 5px;
  height: 56px;
  justify-content: center;
  width: 64px;
`;
