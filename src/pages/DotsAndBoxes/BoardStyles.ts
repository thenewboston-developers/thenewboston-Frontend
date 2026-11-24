import styled, {css, keyframes} from 'styled-components';

import {DotsAndBoxesSide} from 'types/dotsAndBoxes';

export const sideColors: Record<DotsAndBoxesSide, {fill: string; ink: string; soft: string}> = {
  blue: {fill: '#dbe7ff', ink: '#2457d6', soft: '#8fb0f5'},
  red: {fill: '#ffe0da', ink: '#d2412f', soft: '#f2a093'},
};

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

export const BoardFrame = styled.div`
  background: #1f2a44;
  border: 1px solid #34436a;
  border-radius: 22px;
  box-shadow: 0 16px 32px #1f2a441c;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
  width: 100%;

  @media (min-width: 1000px) and (min-height: 600px) {
    max-width: min(600px, calc(100dvh - 300px));
  }

  @media (max-width: 550px) {
    border-radius: 14px;
    padding: 10px;
  }
`;

export const BoardGrid = styled.div<{$size: number}>`
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: ${({$size}) => `repeat(${$size}, minmax(0, 1fr) minmax(0, 4.5fr)) minmax(0, 1fr)`};
  grid-template-rows: ${({$size}) => `repeat(${$size}, minmax(0, 1fr) minmax(0, 4.5fr)) minmax(0, 1fr)`};
`;

export const BoardTitle = styled.div`
  color: #e9eefc;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 12px;
  justify-content: space-between;
  padding: 0 0 14px;
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
  background: #1f2a44;
  border-radius: 50%;
  box-shadow: 0 1px 0 #ffffff;
  margin: 12%;
  pointer-events: none;
  z-index: 2;
`;

export const Legend = styled.div`
  align-items: center;
  color: #cdd6ee;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 16px;
  line-height: 1.5;
  padding-top: 14px;
`;

export const LegendItem = styled.span<{$side: DotsAndBoxesSide}>`
  align-items: center;
  display: inline-flex;
  gap: 8px;

  &::before {
    background: ${({$side}) => sideColors[$side].soft};
    border-radius: 3px;
    content: '';
    height: 6px;
    width: 22px;
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
    outline: 3px solid #f2b63d;
    outline-offset: 1px;
    z-index: 3;
  }

  @media (prefers-reduced-motion: reduce) {
    ${Stroke} {
      animation: none;
    }
  }
`;

export const Paper = styled.div`
  background: #fbfaf6;
  border: 3px solid #141c30;
  border-radius: 10px;
  padding: clamp(10px, 3.5%, 22px);
`;
