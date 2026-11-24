import {css} from 'styled-components';

import {fonts} from 'styles';

export const BLACK_DISK = 'radial-gradient(circle at 34% 28%, #5a5666 0%, #24212d 46%, #0d0b12 100%)';
export const WHITE_DISK = 'radial-gradient(circle at 34% 28%, #ffffff 0%, #f1ebdd 52%, #cfc5ae 100%)';

// A disk caught mid-flip, ivory on one half and black on the other, split by the hero's cyan edge light
export const SPLIT_DISK =
  'radial-gradient(circle at 34% 28%, #ffffff59, transparent 58%), linear-gradient(135deg, #f4efe3 0 46%, #78edff 46% 54%, #1d1a26 54% 100%)';

// The lobby's obsidian board look, taken from the hero: a midnight board, a hairline cyan grid, black and ivory disks
export const reversi = {
  bronze: '#dca274',
  cyan: '#78edff',
  cyanLight: '#c5f8ff',
  cyanSoft: '#78edff1f',
  edge: '#1a344e',
  edgeBright: '#2d5479',
  fog: '#8095b0',
  gold: '#f2c66d',
  ink: '#061525',
  ivory: '#f4efe3',
  mist: '#aebdd2',
  night: '#050c18',
  obsidian: '#0a1730',
  rose: '#ff9b8f',
  silver: '#cfd9e6',
  text: '#edf6ff',
};

// Small uppercase labels, like the hero eyebrow
export const caption = css`
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.14em;
  line-height: 1.5;
  text-transform: uppercase;
`;

export const disk = (side: 'black' | 'random' | 'white') => {
  if (side === 'random') return SPLIT_DISK;
  return side === 'black' ? BLACK_DISK : WHITE_DISK;
};

// A dark board: a hairline grid with the four board dots every four squares, fading out under the content, and the
// slim cyan inlay that runs around the hero board. Content needs no extra stacking: both layers sit behind it.
export const boardPanel = css`
  background:
    radial-gradient(120% 80% at 100% 0%, #3fc8f01c, transparent 58%),
    radial-gradient(90% 70% at 0% 100%, #7c6cff12, transparent 62%), linear-gradient(180deg, #0a1730, #060e1d);
  border: 1px solid ${reversi.edge};
  border-radius: 22px;
  box-shadow:
    0 18px 44px #050c1824,
    inset 0 1px 0 #ffffff0d;
  color: ${reversi.text};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    background-image:
      radial-gradient(circle, #78edff4d 0 2px, transparent 2.5px), linear-gradient(#78edff14 1px, transparent 1px),
      linear-gradient(90deg, #78edff14 1px, transparent 1px);
    background-position:
      -88px -88px,
      -1px -1px,
      -1px -1px;
    background-size:
      176px 176px,
      44px 44px,
      44px 44px;
    border-radius: inherit;
    content: '';
    inset: 0;
    mask-image: radial-gradient(130% 100% at 100% 0%, #000000 0%, transparent 72%);
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }

  &::after {
    border: 1px solid #78edff21;
    border-radius: 16px;
    box-shadow:
      inset 0 0 22px #78edff0a,
      0 0 14px #78edff08;
    content: '';
    inset: 7px;
    pointer-events: none;
    position: absolute;
  }
`;
