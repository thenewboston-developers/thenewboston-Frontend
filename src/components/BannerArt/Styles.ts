import styled, {css, keyframes} from 'styled-components';

import {BannerArtVariant} from 'enums';
import {breakpoints} from 'styles';

const pulse = keyframes`
  from {
    opacity: 0.7;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(3.4);
  }
`;

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.25;
    transform: scale(0.7);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Each surface is a dark base with a couple of glows. The glows stay dark enough for white text to sit on them
const SURFACES = {
  [BannerArtVariant.board]: css`
    background:
      radial-gradient(60% 90% at 0% 0%, rgb(91 71 214 / 55%), transparent 60%),
      radial-gradient(50% 80% at 40% 115%, rgb(52 36 169 / 55%), transparent 65%),
      linear-gradient(135deg, #14124a, #0d0c38);
  `,
  [BannerArtVariant.chart]: css`
    background:
      radial-gradient(90% 140% at 100% 0%, rgb(16 185 129 / 55%), transparent 60%),
      radial-gradient(70% 120% at 0% 100%, rgb(13 148 136 / 35%), transparent 65%),
      linear-gradient(135deg, #05332c, #04261f);
  `,
  [BannerArtVariant.coins]: css`
    background:
      radial-gradient(75% 150% at 100% 100%, rgb(168 85 247 / 50%), transparent 62%),
      radial-gradient(60% 120% at 0% 0%, rgb(79 70 229 / 35%), transparent 65%),
      linear-gradient(135deg, #2a1259, #1a0b3b);
  `,
  [BannerArtVariant.depth]: css`
    background:
      radial-gradient(60% 120% at 55% 115%, rgb(34 197 94 / 22%), transparent 60%),
      radial-gradient(60% 130% at 100% 100%, rgb(244 63 94 / 24%), transparent 60%),
      linear-gradient(135deg, #151c2c, #0a0e18);
  `,
  [BannerArtVariant.engraving]: css`
    background:
      radial-gradient(70% 150% at 100% 50%, rgb(217 119 6 / 42%), transparent 62%),
      radial-gradient(50% 120% at 0% 0%, rgb(120 53 15 / 45%), transparent 65%),
      linear-gradient(135deg, #1f1508, #120c05);
  `,
  [BannerArtVariant.ledger]: css`
    background:
      radial-gradient(80% 140% at 100% 0%, rgb(34 211 238 / 45%), transparent 60%),
      radial-gradient(70% 120% at 10% 120%, rgb(99 102 241 / 55%), transparent 60%),
      linear-gradient(135deg, #1e3a9f, #0f1f6b);
  `,
  [BannerArtVariant.ribbon]: css`
    background:
      radial-gradient(70% 160% at 100% 100%, rgb(217 119 6 / 42%), transparent 62%),
      radial-gradient(50% 140% at 0% 100%, rgb(120 53 15 / 45%), transparent 65%),
      linear-gradient(135deg, #1f1508, #120c05);
  `,
  [BannerArtVariant.ripples]: css`
    background:
      radial-gradient(75% 150% at 100% 0%, rgb(234 88 12 / 55%), transparent 62%),
      radial-gradient(65% 130% at 60% 120%, rgb(219 39 119 / 38%), transparent 62%),
      linear-gradient(135deg, #3c1046, #260a30);
  `,
};

// A pattern covers the whole banner and thins out toward the far corner. Every other artwork is drawn once: it hugs the
// right side and fades out toward the copy, and it steps back further on small screens, where the copy runs over it
export const Art = styled.svg<{$isPattern: boolean}>`
  height: 100%;
  position: absolute;
  top: 0;

  ${({$isPattern}) =>
    $isPattern
      ? css`
          left: 0;
          mask-image: radial-gradient(120% 130% at 0% 100%, #000000 30%, transparent 85%);
          width: 100%;
        `
      : css`
          mask-image: linear-gradient(to right, transparent 10%, #000000 72%);
          right: 0;
          width: min(100%, 760px);

          @media (max-width: ${breakpoints.tablet}) {
            opacity: 0.5;
          }
        `}
`;

export const Container = styled.div<{$variant: BannerArtVariant}>`
  ${({$variant}) => SURFACES[$variant]};
  border-radius: inherit;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;

  /* A hairline of light along the edge keeps the dark surface crisp against the page */
  &::after {
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%);
    content: '';
    inset: 0;
    position: absolute;
  }
`;

export const Pulse = styled.circle`
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${pulse} 2.4s ease-out infinite;
  }
`;

export const Sparkle = styled.path<{$delay: number}>`
  opacity: 0.8;
  transform-box: fill-box;
  transform-origin: center;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${twinkle} 3.6s ease-in-out infinite;
    animation-delay: ${({$delay}) => `${$delay}s`};
  }
`;
