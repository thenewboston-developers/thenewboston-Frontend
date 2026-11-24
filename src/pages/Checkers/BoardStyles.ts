import styled, {css, keyframes} from 'styled-components';

import {board} from './theme';

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const captured = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.35) rotate(-18deg);
  }
`;

const crown = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.2) translateY(30%);
  }

  60% {
    opacity: 1;
    transform: scale(1.35) translateY(-6%);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const mustCapture = keyframes`
  0%,
  100% {
    box-shadow: inset 0 0 0 2px ${board.edge}, inset 0 0 0 4px ${board.gold};
  }

  50% {
    box-shadow: inset 0 0 0 2px ${board.edge}, inset 0 0 0 6px ${board.gold};
  }
`;

export const BoardFrame = styled.div`
  background: ${board.forest};
  border: 1px solid ${board.line};
  border-radius: 22px;
  box-shadow:
    0 5px 0 ${board.edge},
    0 20px 40px #10201840,
    inset 0 1px 0 #ffffff12;
  margin: 0 auto;
  max-width: 640px;
  padding: 20px;
  width: 100%;

  @media (min-width: 1000px) and (min-height: 600px) {
    max-width: min(640px, calc(100dvh - 230px));
  }

  @media (max-width: 550px) {
    border-radius: 14px;
    padding: 10px;
  }
`;

export const BoardGrid = styled.div<{$dragging: boolean}>`
  border: 3px solid ${board.edge};
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  isolation: isolate;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  ${({$dragging}) =>
    $dragging &&
    css`
      &,
      & * {
        cursor: grabbing !important;
      }
    `}
`;

export const BoardTitle = styled.div`
  color: ${board.ivoryLight};
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 12px;
  justify-content: space-between;
  padding: 0 0 14px;
`;

export const Cell = styled.button<{
  $dark: boolean;
  $dropTarget: boolean;
  $last: boolean;
  $movable: boolean;
  $mustCapture: boolean;
  $selected: boolean;
  $target: boolean;
}>`
  align-items: center;
  aspect-ratio: 1;
  background: ${({$dark, $dropTarget, $last}) => {
    if ($dropTarget) return '#b7ca8c';
    if ($last) return '#9db577';
    return $dark ? board.squareDark : board.squareLight;
  }};
  border: 0;
  box-shadow: ${({$mustCapture, $selected}) =>
    $selected || $mustCapture ? `inset 0 0 0 2px ${board.edge}, inset 0 0 0 5px ${board.gold}` : 'none'};
  cursor: ${({$movable}) => ($movable ? 'grab' : 'pointer')};
  display: flex;
  justify-content: center;
  min-width: 0;
  padding: 0;
  position: relative;
  transition: background-color 160ms ease;

  &:disabled {
    cursor: default;
  }

  &:hover:not(:disabled) {
    box-shadow:
      inset 0 0 0 2px ${board.edge},
      inset 0 0 0 6px ${board.gold};
  }

  &:focus-visible {
    outline: 3px solid ${board.edge};
    outline-offset: -3px;
    z-index: 1;
  }

  &::after {
    background: ${board.gold};
    border: 2px solid ${board.edge};
    border-radius: 50%;
    content: ${({$target}) => ($target ? "''" : 'none')};
    height: ${({$dropTarget}) => ($dropTarget ? '32%' : '24%')};
    position: absolute;
    transition:
      height 120ms ease,
      width 120ms ease;
    width: ${({$dropTarget}) => ($dropTarget ? '32%' : '24%')};
  }

  ${({$mustCapture}) =>
    $mustCapture &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${mustCapture} 1.6s ease-in-out infinite;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Coordinate = styled.span<{$dark: boolean}>`
  bottom: 2px;
  color: ${({$dark}) => ($dark ? board.edge : board.muted)};
  font-size: clamp(8px, 1.1vw, 11px);
  left: 3px;
  line-height: 1;
  position: absolute;
`;

export const Crown = styled.span<{$delay: number | null}>`
  display: inline-block;
  line-height: 1;

  ${({$delay}) =>
    $delay !== null &&
    css`
      @media (prefers-reduced-motion: no-preference) {
        animation: ${crown} 420ms cubic-bezier(0.34, 1.56, 0.64, 1) ${$delay}ms both;
      }
    `}
`;

export const Legend = styled.div`
  color: ${board.mist};
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 16px;
  line-height: 1.5;
  padding-top: 14px;
`;

export const Piece = styled.span<{$lifted: boolean; $white: boolean}>`
  align-items: center;
  background: ${({$white}) =>
    $white
      ? `linear-gradient(145deg, ${board.pieceLight}, #e7dec2)`
      : `linear-gradient(145deg, #45554a, ${board.pieceDark})`};
  border: 2px solid ${({$white}) => ($white ? '#fff8e6' : '#a4b793')};
  border-radius: 50%;
  box-shadow: ${({$lifted, $white}) =>
    $lifted
      ? `0 6px 0 ${$white ? '#a49c83' : '#102018'}, 0 16px 18px #10201880, inset 0 0 0 4px ${$white ? '#c7bea354' : '#8a967c33'}`
      : `0 4px 0 ${$white ? '#a49c83' : '#102018'}, 0 6px 7px #10201866, inset 0 0 0 4px ${$white ? '#c7bea354' : '#8a967c33'}`};
  color: ${({$white}) => ($white ? board.ink : board.gold)};
  display: flex;
  font-size: clamp(18px, 4vw, 36px);
  height: 74%;
  justify-content: center;
  line-height: 1;
  transform: ${({$lifted}) => ($lifted ? 'translateY(-6px) scale(1.1)' : 'translateY(-2px)')};
  width: 74%;

  @media (prefers-reduced-motion: no-preference) {
    transition:
      box-shadow 140ms ease,
      transform 140ms ease;
  }
`;

export const PieceLayer = styled.div`
  inset: 0;
  pointer-events: none;
  position: absolute;
`;

export const PieceSlot = styled.div<{$state: 'entering' | 'exiting' | 'idle'; $delay: number}>`
  align-items: center;
  display: flex;
  height: 12.5%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 12.5%;
  will-change: transform;

  & > * {
    ${({$delay, $state}) => {
      // A captured piece stays hidden once its animation ends (or at once with reduced motion)
      if ($state === 'exiting')
        return css`
          opacity: 0;

          @media (prefers-reduced-motion: no-preference) {
            animation: ${captured} 240ms ease-in ${$delay}ms backwards;
          }
        `;
      if ($state === 'entering')
        return css`
          @media (prefers-reduced-motion: no-preference) {
            animation: ${appear} 260ms ease-out ${$delay}ms backwards;
          }
        `;
      return '';
    }}
  }
`;
