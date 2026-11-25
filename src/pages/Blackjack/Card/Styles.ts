import styled, {css, keyframes} from 'styled-components';

import {room} from '../theme';

const fly = keyframes`
  from {
    opacity: 0.35;
    transform: translate(var(--from-x, 0), var(--from-y, 0)) rotate(-38deg) scale(0.7);
  }

  14% {
    opacity: 1;
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const face = css`
  backface-visibility: hidden;
  border-radius: inherit;
  inset: 0;
  overflow: hidden;
  position: absolute;
`;

// The lattice of a classic red card back, sized with the card
export const Back = styled.div`
  ${face};
  background:
    radial-gradient(circle at 50% 50%, ${room.cardFace} 0 5%, transparent 5.6%),
    radial-gradient(circle at 50% 50%, ${room.cardBackDeep} 0 15%, transparent 15.6%),
    radial-gradient(circle at 50% 50%, ${room.cardFace} 0 18%, transparent 18.6%),
    repeating-linear-gradient(
      45deg,
      #ffffff33 0 calc(var(--card-w) * 0.02),
      transparent calc(var(--card-w) * 0.02) calc(var(--card-w) * 0.105)
    ),
    repeating-linear-gradient(
      -45deg,
      #ffffff33 0 calc(var(--card-w) * 0.02),
      transparent calc(var(--card-w) * 0.02) calc(var(--card-w) * 0.105)
    ),
    linear-gradient(155deg, #cf3140, ${room.cardBack} 45%, ${room.cardBackDeep});
  border: calc(var(--card-w) * 0.055) solid ${room.cardFace};
  box-shadow: inset 0 0 0 1px #5b0d18;
  transform: rotateY(180deg);
`;

export const Card = styled.div<{$sideways: boolean}>`
  aspect-ratio: 5 / 7;
  border-radius: calc(var(--card-w) * 0.085);
  flex: 0 0 auto;
  position: relative;
  transform: ${({$sideways}) => ($sideways ? 'rotate(90deg)' : 'none')};
  width: var(--card-w);
`;

export const Flipper = styled.div<{$faceUp: boolean}>`
  border-radius: inherit;
  height: 100%;
  position: relative;
  transform: rotateY(${({$faceUp}) => ($faceUp ? 0 : 180)}deg);
  transform-style: preserve-3d;
  transition: transform calc(420ms * var(--speed, 1)) cubic-bezier(0.3, 0.7, 0.25, 1);
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Flyer = styled.div<{$flying: boolean}>`
  animation: ${({$flying}) =>
    $flying
      ? css`
          ${fly} calc(430ms * var(--speed, 1)) cubic-bezier(0.2, 0.75, 0.25, 1) both
        `
      : 'none'};
  border-radius: inherit;
  box-shadow:
    0 1px 0 #cfc9b9,
    0 2px 0 #b9b3a3,
    0 calc(var(--card-w) * 0.07) calc(var(--card-w) * 0.16) #00140cb3;
  height: 100%;
  perspective: 900px;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Front = styled.div`
  ${face};
  background: linear-gradient(150deg, #ffffff, ${room.cardFace} 55%, #ece7da);

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;
