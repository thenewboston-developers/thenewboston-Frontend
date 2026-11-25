import styled, {keyframes} from 'styled-components';

import slotsTheme from '../theme';

const winPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0 rgba(255, 215, 106, 0));
  }
  50% {
    transform: scale(1.14);
    filter: drop-shadow(0 0 14px rgba(255, 215, 106, 0.95));
  }
`;

const paylineSweep = keyframes`
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
`;

export const Cell = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  will-change: transform;

  svg {
    height: 74%;
    max-height: 112px;
    overflow: visible;
    transition: transform 0.2s ease;
    width: 74%;
  }

  &[data-winning] svg {
    animation: ${winPulse} 0.9s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-winning] svg {
      animation: none;
      filter: drop-shadow(0 0 12px rgba(255, 215, 106, 0.95));
    }
  }
`;

export const Payline = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 233, 168, 0) 0%,
    rgba(255, 233, 168, 0.55) 12%,
    rgba(255, 233, 168, 0.55) 88%,
    rgba(255, 233, 168, 0) 100%
  );
  background-size: 100% 100%;
  height: 2px;
  left: 6px;
  opacity: 0.55;
  pointer-events: none;
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  transition:
    opacity 0.25s ease,
    box-shadow 0.25s ease;
  z-index: 3;
`;

export const Reel = styled.div`
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.55) 33.4%,
      rgba(255, 255, 255, 0.55) 66.6%,
      rgba(255, 255, 255, 0) 70%
    ),
    linear-gradient(
      180deg,
      ${slotsTheme.reelEdge} 0%,
      ${slotsTheme.reelShade} 16%,
      ${slotsTheme.reel} 50%,
      ${slotsTheme.reelShade} 84%,
      ${slotsTheme.reelEdge} 100%
    );
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 1px rgba(${slotsTheme.shadowRgb}, 0.35),
    inset 0 10px 18px rgba(${slotsTheme.shadowRgb}, 0.18),
    inset 0 -10px 18px rgba(${slotsTheme.shadowRgb}, 0.18);
  height: var(--slots-reel-height);
  min-width: 0;
  overflow: hidden;
  position: relative;

  /* Cylinder shading over the symbols */
  &::after {
    background: linear-gradient(
      180deg,
      rgba(${slotsTheme.shadowRgb}, 0.62) 0%,
      rgba(${slotsTheme.shadowRgb}, 0.12) 22%,
      rgba(${slotsTheme.shadowRgb}, 0) 34%,
      rgba(${slotsTheme.shadowRgb}, 0) 66%,
      rgba(${slotsTheme.shadowRgb}, 0.12) 78%,
      rgba(${slotsTheme.shadowRgb}, 0.62) 100%
    );
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }
`;

export const Window = styled.div`
  --slots-reel-height: clamp(204px, 30vw, 312px);

  display: grid;
  gap: clamp(6px, 1.2vw, 12px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  position: relative;

  &[data-result='win'] ${Payline} {
    animation: ${paylineSweep} 1.6s linear infinite;
    background: linear-gradient(
      90deg,
      rgba(255, 215, 106, 0.2) 0%,
      ${slotsTheme.goldLight} 25%,
      #ffffff 50%,
      ${slotsTheme.goldLight} 75%,
      rgba(255, 215, 106, 0.2) 100%
    );
    background-size: 200% 100%;
    box-shadow:
      0 0 12px rgba(255, 215, 106, 0.9),
      0 0 28px rgba(${slotsTheme.accentRgb}, 0.45);
    height: 4px;
    opacity: 1;
  }

  &[data-anticipating] ${Reel}[data-reel='2'] {
    box-shadow:
      inset 0 0 0 2px ${slotsTheme.gold},
      0 0 26px rgba(255, 215, 106, 0.75),
      0 0 60px rgba(${slotsTheme.accentRgb}, 0.45);
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-result='win'] ${Payline} {
      animation: none;
    }
  }
`;
