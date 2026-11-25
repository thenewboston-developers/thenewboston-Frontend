import styled, {css, keyframes} from 'styled-components';

import {HexSide} from 'types/hex';

import {SIDE_COLORS} from '../BoardStyles';
import {hex} from '../theme';

// The side seal's ring: lit for the player to move, pulsing on your own turn, running round while the other side
// thinks
export type SealRing = 'none' | 'pulse' | 'still' | 'trace';

// The demo game repeats every 11 seconds: a stone every 0.75 seconds, then the winning chain, a pause and a fade
const DEMO_LOOP = 11;
const DEMO_FADE = 10.1;
const DEMO_GONE = 10.5;

const at = (seconds: number) => `${((seconds / DEMO_LOOP) * 100).toFixed(2)}%`;

const drops = new Map<number, ReturnType<typeof keyframes>>();

const getDrop = (move: number) => {
  let drop = drops.get(move);
  if (!drop) {
    const start = 0.5 + move * 0.75;
    drop = keyframes`
      0%, ${at(start)} { opacity: 0; transform: scale(1.6); }
      ${at(start + 0.3)}, ${at(DEMO_FADE)} { opacity: 1; transform: scale(1); }
      ${at(DEMO_GONE)}, 100% { opacity: 0; transform: scale(1); }
    `;
    drops.set(move, drop);
  }
  return drop;
};

const chainDraw = keyframes`
  0%, ${at(6.9)} { opacity: 0; stroke-dashoffset: 1; }
  ${at(6.95)} { opacity: 1; stroke-dashoffset: 1; }
  ${at(7.75)}, ${at(DEMO_FADE)} { opacity: 1; stroke-dashoffset: 0; }
  ${at(DEMO_GONE)}, 100% { opacity: 0; stroke-dashoffset: 0; }
`;

const ringGlow = keyframes`
  0%, ${at(7.6)} { opacity: 0; transform: scale(0.6); }
  ${at(7.95)}, ${at(DEMO_FADE)} { opacity: 1; transform: scale(1); }
  ${at(DEMO_GONE)}, 100% { opacity: 0; transform: scale(1); }
`;

const appear = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const trace = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`;

const stillForReducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const DemoCells = styled.path`
  fill: ${hex.porcelain};
  stroke: ${hex.groove};
  stroke-width: 1.2;
`;

// Drawn complete; the animation hides it until the last stone is down
export const DemoChain = styled.polyline`
  animation: ${chainDraw} ${DEMO_LOOP}s linear infinite;
  fill: none;
  stroke: ${hex.gold};
  stroke-dasharray: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-opacity: 0.95;
  stroke-width: 7;
  ${stillForReducedMotion};
`;

export const DemoFrame = styled.div`
  background: #1d2640;
  border: 1px solid #323e68;
  border-radius: 16px;
  box-shadow: 0 18px 30px #02081766;
  padding: 10px 10px 8px;
  width: 100%;

  svg {
    display: block;
    height: auto;
    width: 100%;
  }
`;

export const DemoRing = styled.circle`
  animation: ${ringGlow} ${DEMO_LOOP}s linear infinite;
  fill: none;
  stroke: ${hex.gold};
  stroke-width: 2.6;
  transform-box: fill-box;
  transform-origin: center;
  ${stillForReducedMotion};
`;

export const DemoStone = styled.circle<{$move: number}>`
  ${({$move}) => css`
    animation: ${getDrop($move)} ${DEMO_LOOP}s linear infinite;
  `}
  filter: drop-shadow(0 1.5px 1.5px #10182f73);
  transform-box: fill-box;
  transform-origin: center;
  ${stillForReducedMotion};
`;

export const EdgeBand = styled.polygon<{$dim?: boolean; $side: HexSide}>`
  fill: ${({$side}) => SIDE_COLORS[$side]};
  opacity: ${({$dim}) => ($dim ? 0.6 : 1)};
`;

export const Emblem = styled.span`
  display: flex;
  filter: drop-shadow(0 8px 12px #02081780);
  flex-shrink: 0;
  height: 60px;
  width: 60px;

  svg {
    display: block;
    height: 100%;
    overflow: visible;
    width: 100%;
  }
`;

export const GlassStone = styled.circle`
  filter: drop-shadow(0 1.5px 1.5px #10182f73);
`;

// Colors come from custom properties so that a choice card can dim the boards that are not picked
export const MiniBoard = styled.svg`
  display: block;
  height: auto;
  overflow: visible;
  width: 100%;

  .red {
    fill: var(--board-red, ${SIDE_COLORS.red});
    transition: fill 0.15s ease;
  }

  .blue {
    fill: var(--board-blue, ${SIDE_COLORS.blue});
    transition: fill 0.15s ease;
  }

  .cells {
    fill: var(--board-cells, ${hex.porcelain});
    stroke: var(--board-grout, #1d2640);
    stroke-width: 0.75px;
    transition: fill 0.15s ease;
    vector-effect: non-scaling-stroke;
  }
`;

export const Podium = styled.svg`
  display: block;
  height: auto;
  width: 176px;

  polygon {
    stroke-dasharray: 5 4;
    stroke-width: 1.6;
  }

  text {
    dominant-baseline: central;
    font-size: 17px;
    font-weight: 800;
    text-anchor: middle;
  }

  .place-1 polygon {
    fill: #ffd66617;
    stroke: ${hex.gold};
  }

  .place-1 text {
    fill: ${hex.gold};
    font-size: 22px;
  }

  .place-2 polygon {
    fill: #dfe5f212;
    stroke: #c9d1e6;
  }

  .place-2 text {
    fill: #c9d1e6;
  }

  .place-3 polygon {
    fill: #e0a47712;
    stroke: #e0a477;
  }

  .place-3 text {
    fill: #e0a477;
  }
`;

export const PorcelainCell = styled.polygon`
  fill: ${hex.porcelain};
  stroke: ${hex.groove};
  stroke-width: 1.2;
`;

export const PreviewRing = styled.polygon`
  fill: none;
  stroke: ${hex.ruby};
  stroke-dasharray: 5 3;
  stroke-width: 2.4;
`;

export const ResultArt = styled.svg`
  .halo {
    stop-color: var(--accent-strong);
  }
`;

// Drawn from one edge to the other once the picture has arrived
export const ResultChain = styled.polyline`
  animation: ${trace} 0.9s ease-in-out 0.45s both;
  fill: none;
  stroke: ${hex.gold};
  stroke-dasharray: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-opacity: 0.95;
  stroke-width: 7;
  ${stillForReducedMotion};
`;

// Rings the chain's stones once the line has reached the far edge
export const ResultRing = styled.circle`
  animation: ${appear} 0.4s ease 1.3s both;
  fill: none;
  stroke: ${hex.gold};
  stroke-width: 2.6;
  ${stillForReducedMotion};
`;

export const Seal = styled.svg<{$ring: SealRing}>`
  display: block;
  filter: drop-shadow(0 6px 10px #02081766);
  height: auto;
  overflow: visible;
  width: 100%;

  .stone-dark {
    stop-color: var(--stone-dark);
  }

  .stone-light {
    stop-color: var(--stone-light);
  }

  .stone-strong {
    stop-color: var(--accent-strong);
  }

  .ring {
    fill: none;
    stroke: var(--accent);
    stroke-linejoin: round;
    stroke-width: 2.4;

    ${({$ring}) =>
      $ring === 'pulse' &&
      css`
        animation: ${pulse} 1.6s ease-in-out infinite;
      `}

    ${({$ring}) =>
      $ring === 'still' &&
      css`
        opacity: 0.85;
      `}

    ${({$ring}) =>
      $ring === 'trace' &&
      css`
        animation: ${trace} 1.4s linear infinite;
        stroke-dasharray: 0.3 0.7;
        stroke-linecap: round;
      `}

    ${stillForReducedMotion};
  }
`;

export const Spinner = styled.svg`
  display: block;
  flex-shrink: 0;
  height: 24px;
  width: 22px;

  polygon {
    animation: ${trace} 1.4s linear infinite;
    fill: none;
    stroke: ${hex.cobaltLight};
    stroke-dasharray: 0.35 0.65;
    stroke-linecap: round;
    stroke-width: 3;
    ${stillForReducedMotion};
  }
`;

// The cells, stones and shine of a difficulty chain take their colors from the card around them
export const StoneChain = styled.svg`
  display: block;
  height: 18px;
  overflow: visible;
  width: auto;

  polygon {
    fill: var(--chain-cell, #1a2850);
    stroke: var(--chain-edge, ${hex.lineBright});
    stroke-width: 1.6;
    transition:
      fill 0.15s ease,
      stroke 0.15s ease;
  }

  .stone {
    fill: var(--chain-stone, #66739e);
    transition: fill 0.15s ease;
  }

  .shine {
    fill: #ffffff;
    opacity: 0.38;
  }
`;

export const SwapArc = styled.path`
  fill: none;
  stroke: ${hex.gold};
  stroke-linecap: round;
  stroke-width: 2.6;
`;

export const SwapHead = styled.polygon`
  fill: ${hex.gold};
`;
