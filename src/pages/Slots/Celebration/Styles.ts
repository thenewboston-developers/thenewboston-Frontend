import styled, {keyframes} from 'styled-components';

import slotsTheme from '../theme';

const enter = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  55% {
    opacity: 1;
    transform: scale(1.12);
  }
  75% {
    transform: scale(0.96);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
`;

const flare = keyframes`
  0%, 100% {
    text-shadow:
      0 0 18px rgba(255, 215, 106, 0.45),
      0 3px 0 rgba(${slotsTheme.shadowRgb}, 0.9);
  }
  50% {
    text-shadow:
      0 0 34px rgba(255, 215, 106, 0.9),
      0 3px 0 rgba(${slotsTheme.shadowRgb}, 0.9);
  }
`;

export const BannerAmount = styled.span`
  animation: ${flare} 1.4s ease-in-out infinite;
  color: #ffffff;
  font-size: clamp(24px, 6.4cqi, 46px);
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.05;

  small {
    color: ${slotsTheme.goldLight};
    font-size: 0.45em;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-left: 0.3em;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const BannerLabel = styled.span`
  animation: ${shimmer} 2.2s linear infinite;
  background: linear-gradient(
    100deg,
    ${slotsTheme.gold} 0%,
    ${slotsTheme.goldLight} 30%,
    #ffffff 45%,
    ${slotsTheme.goldLight} 60%,
    ${slotsTheme.gold} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  color: transparent;
  filter: drop-shadow(0 3px 0 rgba(122, 74, 14, 0.85)) drop-shadow(0 0 16px rgba(255, 215, 106, 0.5));
  font-size: clamp(24px, 6.4cqi, 46px);
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.05;
  text-transform: uppercase;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Banner = styled.div`
  align-content: center;
  animation: ${enter} 0.6s cubic-bezier(0.2, 0.9, 0.25, 1.2) both;
  display: grid;
  gap: 4px;
  inset: 0;
  justify-items: center;
  pointer-events: none;
  position: absolute;

  &[data-tier='jackpot'] ${BannerLabel} {
    background: linear-gradient(
      100deg,
      ${slotsTheme.redLight} 0%,
      ${slotsTheme.gold} 25%,
      #ffffff 45%,
      ${slotsTheme.goldLight} 65%,
      ${slotsTheme.redLight} 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    background-size: 200% 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const BannerNote = styled.span`
  color: ${slotsTheme.textMuted};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-align: center;
  text-transform: uppercase;
`;

export const BannerRow = styled.span`
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.45em;
  justify-content: center;
`;

export const Canvas = styled.canvas`
  height: 100%;
  inset: 0;
  pointer-events: none;
  position: absolute;
  width: 100%;
  z-index: 20;
`;
