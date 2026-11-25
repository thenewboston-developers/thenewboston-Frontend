import styled, {css, keyframes} from 'styled-components';

import {HexSide} from 'types/hex';

import {glassStone, hex, honeycombPanel, sideAccent} from './theme';

export const SIDE_COLORS: Record<HexSide, string> = {blue: '#2c6fd6', red: '#d9463c'};

const appear = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const draw = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`;

const settle = keyframes`
  from { opacity: 0; transform: scale(1.45); }
  to { opacity: 1; transform: scale(1); }
`;

const stillForReducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const BoardFrame = styled.div<{$upright: boolean}>`
  ${honeycombPanel};
  margin: 0 auto;
  max-width: 980px;
  padding: 18px;
  width: 100%;

  /* The honeycomb shows in the two corners the slanted board leaves empty */
  &::before {
    mask-image:
      radial-gradient(55% 75% at 100% 0%, #000000, transparent),
      radial-gradient(55% 75% at 0% 100%, #000000, transparent);
  }

  @media (min-width: 1000px) and (min-height: 600px) {
    max-width: min(980px, calc((100dvh - 330px) * var(--board-aspect)));
  }

  @media (max-width: 700px) {
    border-radius: 14px;
    max-width: ${({$upright}) => ($upright ? '520px' : '980px')};
    padding: 8px;
  }
`;

export const BoardSvg = styled.svg`
  display: block;
  height: auto;
  touch-action: manipulation;
  width: 100%;
`;

export const Cell = styled.g<{$interactive: boolean; $side: HexSide}>`
  outline: none;

  polygon:first-child {
    fill: #f2eee2;
    stroke: #b3ab94;
    stroke-width: 1.2;
    transition: fill 0.12s ease;
  }

  ${({$interactive, $side}) =>
    $interactive &&
    css`
      cursor: pointer;

      @media (hover: hover) {
        &:hover polygon:first-child {
          fill: ${$side === 'red' ? '#f6cbc5' : '#c8dbf8'};
        }
      }
    `}

  &:focus-visible polygon:last-child {
    opacity: 1;
  }
`;

// The edges of the side to move, or of the winner, stay lit while the other side's dim
export const EdgeBand = styled.polygon<{$dim: boolean; $side: HexSide}>`
  fill: ${({$side}) => SIDE_COLORS[$side]};
  opacity: ${({$dim}) => ($dim ? 0.6 : 1)};
  transition: opacity 0.35s ease;
`;

export const EdgeLabel = styled.text`
  dominant-baseline: central;
  fill: #ffffff;
  font-size: 9px;
  font-weight: 700;
  opacity: 0.92;
  pointer-events: none;
  text-anchor: middle;
  user-select: none;
`;

export const FocusRing = styled.polygon`
  fill: none;
  opacity: 0;
  pointer-events: none;
  stroke: #f2b63c;
  stroke-width: 3;
`;

// Shows once the newest stone has settled
export const LastMoveMark = styled.circle`
  animation: ${appear} 0.2s ease 0.25s both;
  fill: #ffffff;
  pointer-events: none;
  ${stillForReducedMotion};
`;

export const Legend = styled.div`
  color: ${hex.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 6px 18px;
  line-height: 1.5;
  padding: 12px 4px 0;

  > span {
    align-items: center;
    display: inline-flex;
    gap: 8px;
  }

  @media (max-width: 700px) {
    padding: 10px 6px 4px;
  }
`;

export const LegendChain = styled.span`
  background: ${hex.gold};
  border-radius: 2px;
  flex-shrink: 0;
  height: 4px;
  width: 18px;
`;

export const LegendPreview = styled.span<{$side: HexSide}>`
  border: 1.5px dashed ${({$side}) => SIDE_COLORS[$side]};
  border-radius: 50%;
  flex-shrink: 0;
  height: 12px;
  width: 12px;
`;

export const LegendStone = styled.span<{$side: HexSide}>`
  ${({$side}) => sideAccent($side)};
  ${glassStone};
  flex-shrink: 0;
  height: 12px;
  width: 12px;
`;

export const PreviewRing = styled.polygon<{$side: HexSide}>`
  fill: none;
  pointer-events: none;
  stroke: ${({$side}) => SIDE_COLORS[$side]};
  stroke-dasharray: 5 3;
  stroke-width: 2.4;
`;

// The newest stone settles into its cell
export const Stone = styled.circle<{$fresh: boolean; $preview: boolean}>`
  filter: drop-shadow(0 1.5px 1.5px #10182f73);
  opacity: ${({$preview}) => ($preview ? 0.6 : 1)};
  pointer-events: none;

  ${({$fresh}) =>
    $fresh &&
    css`
      animation: ${settle} 0.32s cubic-bezier(0.2, 0.8, 0.3, 1) both;
      transform-box: fill-box;
      transform-origin: center;
      ${stillForReducedMotion};
    `}
`;

// Draws itself from one edge to the other
export const WinningLine = styled.polyline`
  animation: ${draw} 0.9s ease-in-out 0.2s both;
  fill: none;
  pointer-events: none;
  stroke: ${hex.gold};
  stroke-dasharray: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-opacity: 0.95;
  stroke-width: 7;
  ${stillForReducedMotion};
`;

// Rings the chain's stones once the line has reached the far edge
export const WinningRing = styled.circle`
  animation: ${appear} 0.4s ease 1s both;
  fill: none;
  pointer-events: none;
  stroke: ${hex.gold};
  stroke-width: 2.6;
  ${stillForReducedMotion};
`;
