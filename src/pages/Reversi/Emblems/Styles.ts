import styled, {css, keyframes} from 'styled-components';

import {BLACK_DISK, reversi, WHITE_DISK} from '../theme';

// One cycle of the flipping example: the hint, the move, the flips, a pause, then the board resets
const DEMO_CYCLE = '6.4s';

// The placed disk lands at about 15%, the trapped disks turn edge-on at 20% and turn back at 90% for the next loop
const capture = keyframes`
  0%, 15% { opacity: 0; stroke-dashoffset: 1; }
  17% { opacity: 1; stroke-dashoffset: 1; }
  25% { opacity: 1; stroke-dashoffset: 0; }
  40%, 100% { opacity: 0; stroke-dashoffset: 0; }
`;

const cornerGlow = keyframes`
  0%, 100% { opacity: 0.14; }
  50% { opacity: 0.34; }
`;

const darkFace = keyframes`
  0%, 19.9% { opacity: 0; }
  20%, 89.9% { opacity: 1; }
  90%, 100% { opacity: 0; }
`;

const flipTurn = keyframes`
  0%, 16% { transform: scaleX(1); }
  20% { transform: scaleX(0.06); }
  24%, 86% { transform: scaleX(1); }
  90% { transform: scaleX(0.06); }
  94%, 100% { transform: scaleX(1); }
`;

const hintPulse = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.8); }
  50% { opacity: 0.95; transform: scale(1.15); }
`;

const lightFace = keyframes`
  0%, 19.9% { opacity: 1; }
  20%, 89.9% { opacity: 0; }
  90%, 100% { opacity: 1; }
`;

const loaderFlip = keyframes`
  0% { background: ${BLACK_DISK}; transform: scaleX(1); }
  24.9% { background: ${BLACK_DISK}; transform: scaleX(0.06); }
  25% { background: ${WHITE_DISK}; transform: scaleX(0.06); }
  50% { background: ${WHITE_DISK}; transform: scaleX(1); }
  74.9% { background: ${WHITE_DISK}; transform: scaleX(0.06); }
  75% { background: ${BLACK_DISK}; transform: scaleX(0.06); }
  100% { background: ${BLACK_DISK}; transform: scaleX(1); }
`;

const moveHint = keyframes`
  0%, 12% { opacity: 0.95; }
  6% { opacity: 0.45; }
  13%, 89% { opacity: 0; }
  92%, 100% { opacity: 0.95; }
`;

const orbit = keyframes`
  to { transform: rotate(360deg); }
`;

const place = keyframes`
  0%, 12% { opacity: 0; transform: scale(0.4); }
  15% { opacity: 1; transform: scale(1.08); }
  17%, 84% { opacity: 1; transform: scale(1); }
  88%, 100% { opacity: 0; transform: scale(1); }
`;

const demoAnimation = (name: ReturnType<typeof keyframes>, delay = 0) => css`
  animation: ${name} ${DEMO_CYCLE} ease-in-out ${delay}s infinite both;
  ${reducedMotion};
`;

// Transforms on SVG shapes turn around their own center
const ownCenter = css`
  transform-box: fill-box;
  transform-origin: center;
`;

const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Without motion the example shows the board after the move: the faces and lines below default to that state
export const CaptureLine = styled.path<{$delay: number}>`
  ${({$delay}) => demoAnimation(capture, $delay)};
  fill: none;
  opacity: 0;
  stroke: ${reversi.mint};
  stroke-dasharray: 1;
  stroke-linecap: round;
  stroke-width: 2.5;
`;

export const CornerGlow = styled.circle`
  animation: ${cornerGlow} 3.2s ease-in-out infinite;
  opacity: 0.24;
  ${reducedMotion};
`;

export const CornersBoard = styled.svg`
  display: block;
  height: auto;
  width: 120px;
`;

export const DarkFace = styled.circle<{$delay: number}>`
  ${({$delay}) => demoAnimation(darkFace, $delay)};
`;

export const Emblem = styled.svg`
  display: block;
  flex-shrink: 0;
  height: 56px;
  width: 56px;

  @media (max-width: 600px) {
    height: 48px;
    width: 48px;
  }
`;

export const Figure = styled.figure`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: auto 0;
  padding: 8px 0;
`;

export const FigureCaption = styled.figcaption`
  color: ${reversi.mist};
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
`;

export const FlipBoardArt = styled.svg`
  display: block;
  filter: drop-shadow(0 16px 30px ${reversi.night}73) drop-shadow(0 0 22px ${reversi.mint}1a);
  height: auto;
  max-width: 280px;
  width: 100%;
`;

export const FlippingDisk = styled.g<{$delay: number}>`
  ${ownCenter};
  ${({$delay}) => demoAnimation(flipTurn, $delay)};
`;

export const LightFace = styled.circle<{$delay: number}>`
  ${({$delay}) => demoAnimation(lightFace, $delay)};
  opacity: 0;
`;

export const Loader = styled.span`
  animation: ${loaderFlip} 1.6s ease-in-out infinite;
  background: ${BLACK_DISK};
  border-radius: 50%;
  box-shadow:
    0 0 0 1px ${reversi.mint}59,
    0 0 14px ${reversi.mint}33;
  display: inline-block;
  flex-shrink: 0;
  height: 22px;
  width: 22px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: linear-gradient(90deg, #202522 50%, #f1ebdd 50%);
  }
`;

export const MoveHint = styled.circle`
  ${ownCenter};
  ${demoAnimation(moveHint)};
  fill: ${reversi.mint};
  opacity: 0;
`;

export const OpenCorner = styled.rect`
  stroke: ${reversi.gold};
  stroke-dasharray: 3 3;
  stroke-opacity: 0.85;
`;

export const OpeningHint = styled.circle<{$index: number}>`
  ${ownCenter};
  animation: ${hintPulse} 2.8s ease-in-out ${({$index}) => $index * 0.35}s infinite both;
  fill: ${reversi.mint};
  opacity: 0.7;
  ${reducedMotion};
`;

export const PlacedDisk = styled.circle`
  ${ownCenter};
  ${demoAnimation(place)};
`;

export const RivalsOrbit = styled.circle`
  ${ownCenter};
  animation: ${orbit} 24s linear infinite;
  ${reducedMotion};
`;
