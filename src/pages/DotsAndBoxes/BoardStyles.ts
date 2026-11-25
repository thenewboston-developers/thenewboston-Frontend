import styled, {css, keyframes} from 'styled-components';

import {fonts} from 'styles';
import {DotsAndBoxesSide} from 'types/dotsAndBoxes';

import {dots, dottedLeader, label, sheet, sideColors} from './theme';

const claim = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const draw = keyframes`
  from {
    opacity: 0.2;
    transform: scale(0.4);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  from {
    opacity: 0.45;
  }

  to {
    opacity: 0.9;
  }
`;

// The board is a sheet of dot-grid paper like the lobby's panels, with the game drawn on a clean page in the middle
export const BoardFrame = styled.div`
  ${sheet};
  isolation: isolate;
  margin: 0 auto;
  max-width: 600px;
  padding: 16px 20px 14px;
  width: 100%;

  @media (min-width: 1000px) and (min-height: 600px) {
    max-width: min(600px, calc(100dvh - 300px));
  }

  @media (max-width: 550px) {
    padding: 12px 12px 10px;
  }
`;

export const BoardGrid = styled.div<{$size: number}>`
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: ${({$size}) => `repeat(${$size}, minmax(0, 1fr) minmax(0, 4.5fr)) minmax(0, 1fr)`};
  grid-template-rows: ${({$size}) => `repeat(${$size}, minmax(0, 1fr) minmax(0, 4.5fr)) minmax(0, 1fr)`};
`;

// The board's name with a row of dots running to its size
export const BoardTitle = styled.div`
  align-items: center;
  color: ${dots.inkSoft};
  display: flex;
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  gap: 12px;
  padding: 0 0 12px;

  strong {
    ${label};
    ${dottedLeader};
    color: ${dots.ink};
    flex: 1;
  }
`;

export const Box = styled.div<{$owner?: DotsAndBoxesSide}>`
  align-items: center;
  background: ${({$owner}) => ($owner ? sideColors[$owner].fill : 'transparent')};
  border-radius: 8%;
  color: ${({$owner}) => ($owner ? sideColors[$owner].ink : 'transparent')};
  display: flex;
  font-size: clamp(16px, 5vw, 34px);
  font-weight: 700;
  justify-content: center;
  line-height: 1;
  margin: 6%;
  min-height: 0;
  min-width: 0;

  span {
    animation: ${claim} 260ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      animation: none;
    }
  }
`;

export const Dot = styled.span`
  background: ${dots.dot};
  border-radius: 50%;
  box-shadow: 0 1px 0 #ffffff;
  margin: 12%;
  pointer-events: none;
  z-index: 2;
`;

export const Legend = styled.div`
  align-items: center;
  color: ${dots.inkSoft};
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px 18px;
  line-height: 1.5;
  padding-top: 12px;
`;

// Each player's name after a line drawn between two dots in their colour
export const LegendItem = styled.span<{$side: DotsAndBoxesSide}>`
  align-items: center;
  color: ${dots.ink};
  display: inline-flex;
  gap: 8px;
  overflow-wrap: anywhere;

  &::before {
    background:
      radial-gradient(circle closest-side, ${dots.dot} 86%, transparent) left center / 7px 7px no-repeat,
      radial-gradient(circle closest-side, ${dots.dot} 86%, transparent) right center / 7px 7px no-repeat,
      linear-gradient(${({$side}) => `${sideColors[$side].ink}, ${sideColors[$side].ink}`}) center / calc(100% - 6px)
        4px no-repeat;
    content: '';
    flex-shrink: 0;
    height: 7px;
    width: 26px;
  }
`;

export const Stroke = styled.span`
  border-radius: 999px;
  pointer-events: none;
  position: absolute;
`;

export const Line = styled.button<{
  $owner?: DotsAndBoxesSide;
  $pending: boolean;
  $recent: boolean;
  $side: DotsAndBoxesSide;
  $vertical: boolean;
}>`
  background: none;
  border: 0;
  cursor: pointer;
  min-height: 0;
  min-width: 0;
  padding: 0;
  position: relative;
  touch-action: manipulation;
  z-index: 1;

  /* A wider target than the stroke itself, kept clear of the dots where lines meet. */
  &::after {
    content: '';
    inset: ${({$vertical}) => ($vertical ? '20% -12px' : '-12px 20%')};
    position: absolute;
  }

  ${Stroke} {
    background: ${({$owner, $pending, $side}) => ($owner || $pending ? sideColors[$owner ?? $side].ink : '#d9deea')};
    box-shadow: ${({$owner, $recent}) => ($owner && $recent ? `0 0 0 3px ${sideColors[$owner].soft}66` : 'none')};
    inset: ${({$vertical}) => ($vertical ? '7.7% 32%' : '32% 7.7%')};
    ${({$owner, $pending}) => {
      if ($owner)
        return css`
          animation: ${draw} 220ms ease-out;
        `;
      if ($pending)
        return css`
          animation: ${pulse} 700ms ease-in-out infinite alternate;
        `;
      return css`
        opacity: 0.75;
      `;
    }}
  }

  &:disabled {
    cursor: default;
  }

  &:focus-visible ${Stroke} {
    background: ${({$side}) => sideColors[$side].ink};
    opacity: 1;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) ${Stroke} {
      background: ${({$side}) => sideColors[$side].ink};
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: 1px;
    z-index: 3;
  }

  @media (prefers-reduced-motion: reduce) {
    ${Stroke} {
      animation: none;
    }
  }
`;

// A clean page with no printed grid, so the only dots on it are the game's
export const Paper = styled.div`
  background: #ffffff;
  border: 1px solid ${dots.rule};
  border-radius: 3px;
  box-shadow: 0 16px 26px -18px #17387873;
  padding: clamp(10px, 3.5%, 22px);
`;
