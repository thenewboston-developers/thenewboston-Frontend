import styled, {css, keyframes} from 'styled-components';

import UIcon from 'components/Icon';
import {colors} from 'styles';

const bombFlash = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
  }
  15% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
  }
  30% {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
`;

const bombFragment = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.6) rotate(var(--fragment-rotation));
  }
  18% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--fragment-x)), calc(-50% + var(--fragment-y)))
      scale(0.95)
      rotate(calc(var(--fragment-rotation) + 160deg));
  }
`;

const bombPiece = keyframes`
  0% {
    filter: brightness(1);
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    filter: brightness(1.2);
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.12);
  }
  60% {
    filter: blur(0.8px);
    opacity: 0.55;
    transform: translate(-50%, -50%) scale(1.25);
  }
  100% {
    filter: blur(1.8px);
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.4);
  }
`;

const bombRing = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.8);
  }
`;

const bombShard = keyframes`
  0% {
    filter: brightness(2);
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4) rotate(0deg);
  }
  15% {
    filter: brightness(1.6);
    opacity: 1;
  }
  100% {
    filter: brightness(0.9);
    opacity: 0;
    transform: translate(calc(-50% + var(--blast-x)), calc(-50% + var(--blast-y))) scale(0.9) rotate(200deg);
  }
`;

const bombSmoke = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.4);
  }
  40% {
    opacity: 0.55;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.6);
  }
`;

const impact = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.16);
  }
  20% {
    opacity: 0.99;
  }
  60% {
    opacity: 0.55;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.05);
  }
`;

const impactGlow = keyframes`
  0% {
    opacity: 0.65;
  }
  100% {
    opacity: 0;
  }
`;

const starTwinkle = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(0.9) rotate(-8deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1) rotate(8deg);
  }
`;

const winPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.08);
  }
`;

export const Board = styled.div`
  --board-grid-inset: calc(100% / 30);

  aspect-ratio: 1 / 1;
  background-color: #d7b07a;
  background-image:
    linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 55%),
    radial-gradient(circle at 18% 28%, rgba(120, 82, 46, 0.2), transparent 55%),
    radial-gradient(circle at 76% 72%, rgba(120, 82, 46, 0.12), transparent 60%),
    linear-gradient(90deg, rgba(145, 100, 59, 0.16) 0%, rgba(117, 80, 44, 0.08) 100%);
  border: 2px solid #b48353;
  border-radius: 16px;
  box-shadow:
    inset 0 0 0 1px rgba(73, 46, 19, 0.35),
    0 12px 22px rgba(36, 22, 9, 0.2);
  display: grid;
  gap: 0;
  grid-template-columns: repeat(15, minmax(0, 1fr));
  grid-template-rows: repeat(15, minmax(0, 1fr));
  margin: 0 auto;
  max-width: calc(100vh - 360px);
  overflow: hidden;
  position: relative;
  width: 100%;

  &::before {
    background-image:
      linear-gradient(to right, rgba(76, 52, 24, 0.55) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(76, 52, 24, 0.55) 1px, transparent 1px);
    background-position: 0 0;
    background-size: calc((100% - 1px) / 14) calc((100% - 1px) / 14);
    content: '';
    inset: var(--board-grid-inset);
    pointer-events: none;
    position: absolute;
    z-index: 0;
  }

  &::after {
    background-color: rgba(76, 52, 24, 0.55);
    border-radius: 50%;
    content: '';
    height: 7px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 7px;
    z-index: 0;
  }
`;

export const BombBlast = styled.span`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 4;
`;

export const BombBlastPiece = styled.span<{$variant: 'black' | 'white'}>`
  animation: ${bombPiece} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  background: ${({$variant}) => ($variant === 'black' ? '#141414' : '#f8f5ef')};
  border: 1px solid ${({$variant}) => ($variant === 'black' ? '#0a0a0a' : '#2b2b2b')};
  border-radius: 50%;
  box-shadow: ${({$variant}) =>
    $variant === 'black'
      ? '0 8px 16px rgba(0, 0, 0, 0.45)'
      : '0 8px 14px rgba(0, 0, 0, 0.35), inset 0 -2px 3px rgba(0, 0, 0, 0.18)'};
  height: 75%;
  left: 50%;
  opacity: 1;
  position: absolute;
  top: 50%;
  width: 75%;
  z-index: 3;
`;

export const BombFlash = styled.span`
  animation: ${bombFlash} 0.45s ease-out forwards;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 240, 200, 0.98) 20%,
    rgba(255, 180, 60, 0.9) 45%,
    rgba(255, 100, 0, 0.6) 70%,
    transparent 100%
  );
  border-radius: 50%;
  height: 100%;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: 100%;
`;

export const BombFragment = styled.span<{
  $delay: number;
  $offsetX: number;
  $offsetY: number;
  $rotation: number;
  $size: number;
  $variant: 'black' | 'white';
}>`
  --fragment-x: ${({$offsetX}) => `${$offsetX}px`};
  --fragment-y: ${({$offsetY}) => `${$offsetY}px`};
  --fragment-rotation: ${({$rotation}) => `${$rotation}deg`};

  animation: ${bombFragment} 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: ${({$delay}) => `${$delay}s`};
  background: ${({$variant}) =>
    $variant === 'black'
      ? 'linear-gradient(135deg, #2a2a2a 0%, #141414 50%, #0a0a0a 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8f5ef 50%, #e8e4dc 100%)'};
  border: 1px solid ${({$variant}) => ($variant === 'black' ? '#000000' : '#c0b8a8')};
  box-shadow: ${({$variant}) =>
    $variant === 'black'
      ? '0 3px 8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 3px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'};
  clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
  height: ${({$size}) => `${$size}%`};
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: ${({$size}) => `${$size * 0.7}%`};
  z-index: 5;
`;

export const BombRing = styled.span`
  animation: ${bombRing} 0.5s ease-out forwards;
  border: 3px solid rgba(255, 180, 60, 0.85);
  border-radius: 50%;
  box-shadow:
    0 0 16px rgba(255, 138, 0, 0.8),
    0 0 30px rgba(255, 80, 0, 0.4);
  height: 95%;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: 95%;
`;

export const BombShard = styled.span<{$delay: number; $offsetX: number; $offsetY: number; $size: number}>`
  --blast-x: ${({$offsetX}) => `${$offsetX}px`};
  --blast-y: ${({$offsetY}) => `${$offsetY}px`};

  animation: ${bombShard} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: ${({$delay}) => `${$delay}s`};
  background: linear-gradient(145deg, #fff4d6 0%, #ffb040 30%, #ff6b00 70%, #ff3d00 100%);
  border-radius: 50%;
  box-shadow:
    0 0 10px rgba(255, 138, 0, 0.9),
    0 0 20px rgba(255, 80, 0, 0.5);
  height: ${({$size}) => `${$size}%`};
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: ${({$size}) => `${$size}%`};
`;

export const BombSmoke = styled.span`
  animation: ${bombSmoke} 0.85s ease-out forwards;
  background: radial-gradient(circle, rgba(92, 82, 70, 0.55) 0%, rgba(92, 82, 70, 0.3) 45%, transparent 75%);
  border-radius: 50%;
  filter: blur(1px);
  height: 100%;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  width: 100%;
`;

export const Cell = styled.button<{$isPreview: boolean; $isPreviewInvalid: boolean}>`
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;
  position: relative;
  z-index: 1;

  ${({$isPreviewInvalid}) =>
    $isPreviewInvalid &&
    css`
      cursor: not-allowed;
    `}
`;

export const ImpactRing = styled.span<{$variant: 'black' | 'white'}>`
  --impact-color: ${({$variant}) => ($variant === 'black' ? '0, 0, 0' : '255, 255, 255')};

  animation: ${impactGlow} 0.65s ease-out forwards;
  background:
    radial-gradient(
      circle at 48% 52%,
      rgba(var(--impact-color), 0.52) 0%,
      rgba(var(--impact-color), 0.26) 42%,
      transparent 70%
    ),
    radial-gradient(
      circle at 52% 48%,
      rgba(var(--impact-color), 0.4) 0%,
      rgba(var(--impact-color), 0.2) 36%,
      transparent 72%
    );
  border-radius: 50%;
  height: 92%;
  left: 50%;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 92%;
  z-index: 1;

  &::before,
  &::after {
    animation: ${impact} 0.95s ease-out forwards;
    border: 2px solid rgba(var(--impact-color), 0.7);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(var(--impact-color), 0.45);
    content: '';
    height: 100%;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  &::after {
    animation-delay: 0.14s;
    border-width: 1px;
    box-shadow: 0 0 26px rgba(var(--impact-color), 0.4);
  }
`;

export const Piece = styled.div<{$isLastMove: boolean; $isWinning: boolean; $variant: 'black' | 'white'}>`
  background: ${({$variant}) => ($variant === 'black' ? '#141414' : '#f8f5ef')};
  border: 1px solid ${({$variant}) => ($variant === 'black' ? '#0a0a0a' : '#2b2b2b')};
  border-radius: 50%;
  box-shadow: ${({$isWinning, $variant}) => {
    const baseShadow =
      $variant === 'black'
        ? '0 6px 10px rgba(0, 0, 0, 0.35)'
        : '0 6px 10px rgba(0, 0, 0, 0.25), inset 0 -2px 3px rgba(0, 0, 0, 0.18)';
    const winningShadow = $isWinning
      ? `, 0 0 0 3px ${colors.palette.orange[400]}, 0 0 14px rgba(255, 152, 0, 0.45)`
      : '';

    return `${baseShadow}${winningShadow}`;
  }};
  height: 75%;
  position: relative;
  transform-origin: center;
  width: 75%;
  z-index: 2;

  &::after {
    border-radius: 50%;
    content: '';
    height: 16%;
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 16%;
  }

  ${({$isLastMove, $variant}) =>
    $isLastMove &&
    css`
      &::after {
        background: ${$variant === 'black' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.7)'};
        box-shadow: 0 0 6px ${$variant === 'black' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.35)'};
        opacity: 1;
      }
    `}

  ${({$isWinning}) =>
    $isWinning &&
    css`
      animation: ${winPulse} 1.6s ease-in-out infinite;
    `}
`;

export const Preview = styled.div<{$isInvalid: boolean; $variant: 'black' | 'white'}>`
  border: 1px solid transparent;
  border-radius: 50%;
  height: 75%;
  left: 50%;
  opacity: 0.6;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  z-index: 3;

  ${({$isInvalid, $variant}) =>
    $isInvalid
      ? css`
          background: radial-gradient(
            circle,
            rgba(239, 83, 80, 0.12) 0%,
            rgba(239, 83, 80, 0.35) 55%,
            rgba(239, 83, 80, 0.65) 100%
          );
          border-color: rgba(239, 83, 80, 0.9);
          box-shadow: 0 0 10px rgba(239, 83, 80, 0.45);
        `
      : css`
          background: ${$variant === 'black' ? 'rgba(20, 20, 20, 0.65)' : 'rgba(248, 245, 239, 0.7)'};
          border-color: ${$variant === 'black' ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.2)'};
        `}
`;

export const WinningStar = styled(UIcon)`
  animation: ${starTwinkle} 1.4s ease-in-out infinite;
  color: ${colors.palette.orange[400]};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35));
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  z-index: 4;
`;
