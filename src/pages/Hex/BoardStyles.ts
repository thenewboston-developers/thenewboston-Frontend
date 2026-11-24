import styled, {css} from 'styled-components';

import {HexSide} from 'types/hex';

export const SIDE_COLORS: Record<HexSide, string> = {blue: '#2c6fd6', red: '#d9463c'};

export const BoardFrame = styled.div<{$upright: boolean}>`
  background: #1d2640;
  border: 1px solid #323e68;
  border-radius: 22px;
  box-shadow: 0 16px 32px #1d26401f;
  margin: 0 auto;
  max-width: 980px;
  padding: 18px;
  width: 100%;

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

export const EdgeBand = styled.polygon<{$side: HexSide}>`
  fill: ${({$side}) => SIDE_COLORS[$side]};
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

export const LastMoveMark = styled.circle`
  fill: #ffffff;
  opacity: 0.95;
  pointer-events: none;
`;

export const Legend = styled.div`
  color: #d5dbee;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 6px 18px;
  line-height: 1.5;
  padding: 12px 4px 0;

  @media (max-width: 700px) {
    padding: 10px 6px 4px;
  }
`;

export const LegendDot = styled.span<{$side: HexSide}>`
  background: ${({$side}) => SIDE_COLORS[$side]};
  border: 1px solid #ffffff66;
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-right: 6px;
  width: 10px;
`;

export const PreviewRing = styled.polygon<{$side: HexSide}>`
  fill: none;
  pointer-events: none;
  stroke: ${({$side}) => SIDE_COLORS[$side]};
  stroke-dasharray: 5 3;
  stroke-width: 2.4;
`;

export const Stone = styled.circle<{$preview?: boolean}>`
  filter: drop-shadow(0 1.5px 1.5px #10182f73);
  opacity: ${({$preview}) => ($preview ? 0.6 : 1)};
  pointer-events: none;
`;

export const WinningLine = styled.polyline`
  fill: none;
  pointer-events: none;
  stroke: #ffd666;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-opacity: 0.95;
  stroke-width: 7;
`;

export const WinningRing = styled.circle`
  fill: none;
  pointer-events: none;
  stroke: #ffd666;
  stroke-width: 2.6;
`;
