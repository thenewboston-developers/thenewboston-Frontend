import {css} from 'styled-components';

import {fonts} from 'styles';

export const BLACK_DISK = 'radial-gradient(circle at 34% 28%, #4c514e 0%, #202522 46%, #090d0a 100%)';
export const WHITE_DISK = 'radial-gradient(circle at 34% 28%, #ffffff 0%, #f4efe3 52%, #cfc5ae 100%)';

// Classic green felt and black/ivory disks shared by the lobby, illustrations, and live board.
export const reversi = {
  bronze: '#dca274',
  edge: '#315644',
  edgeBright: '#47765d',
  felt: '#278052',
  feltDark: '#12452e',
  feltHover: '#319361',
  fog: '#8eac9a',
  forest: '#102b21',
  gold: '#f2cc79',
  ink: '#0b2118',
  ivory: '#f4efe3',
  mint: '#b9efcf',
  mintLight: '#e0f6e7',
  mintSoft: '#b9efcf1f',
  mist: '#b4cbbc',
  night: '#071a12',
  panel: '#102b21',
  rose: '#ffaca0',
  silver: '#d4dfd7',
  text: '#f4f7ee',
};

export const SPLIT_DISK = `radial-gradient(circle at 34% 28%, #ffffff59, transparent 58%), linear-gradient(135deg, ${reversi.ivory} 0 48%, ${reversi.gold} 48% 52%, #202522 52% 100%)`;

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

// A quiet board grid and inset frame carry the felt-green identity through every panel.
export const boardPanel = css`
  background:
    radial-gradient(120% 80% at 100% 0%, ${reversi.felt}33, transparent 58%),
    linear-gradient(180deg, ${reversi.panel}, ${reversi.ink});
  border: 1px solid ${reversi.edge};
  border-radius: 22px;
  box-shadow:
    0 18px 44px ${reversi.night}24,
    inset 0 1px 0 #ffffff0d;
  color: ${reversi.text};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    background-image:
      radial-gradient(circle, ${reversi.mint}4d 0 2px, transparent 2.5px),
      linear-gradient(${reversi.mint}14 1px, transparent 1px),
      linear-gradient(90deg, ${reversi.mint}14 1px, transparent 1px);
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
    border: 1px solid ${reversi.mint}21;
    border-radius: 16px;
    box-shadow:
      inset 0 0 22px ${reversi.mint}0a,
      0 0 14px ${reversi.mint}08;
    content: '';
    inset: 7px;
    pointer-events: none;
    position: absolute;
  }
`;
