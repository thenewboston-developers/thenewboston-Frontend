import {css} from 'styled-components';

import {fonts} from 'styles';

// The lobby's lacquered board look, taken from the hero artwork: deep cobalt, warm ivory squares and pieces, ruby
// pieces and buttons, and the gold of the move dots and crowns
export const board = {
  bronze: '#e3a878',
  cobalt: '#2a46c9',
  deep: '#13227a',
  edge: '#0a1547',
  gold: '#f4c95d',
  haze: '#9aa6dc',
  ink: '#0d1846',
  ivory: '#fdebcf',
  ivoryLight: '#fff8eb',
  line: '#2e49b9',
  lineSoft: '#2e49b973',
  mist: '#c3cbf2',
  navy: '#0f1c5c',
  ruby: '#e32b44',
  rubyDark: '#8d1229',
  rubyLight: '#ff98a8',
  silver: '#dfe4ee',
};

// Small uppercase labels, set like the hero's eyebrow
export const label = css`
  font-size: 11px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

// A checkerboard of faint squares; the size is one light and one dark square
export const checkerPattern = (color: string, size: number) => css`
  background: conic-gradient(${color} 25%, transparent 0 50%, ${color} 0 75%, transparent 0) 0 0 / ${size}px ${size}px;
`;

// A lacquered cobalt board: a thick dark edge underneath and faint squares that fade out from the top right corner.
// The squares sit behind the content, so children need no extra stacking.
export const boardPanel = css`
  background:
    radial-gradient(120% 90% at 100% 0%, #3553d64d, transparent 62%),
    linear-gradient(165deg, #1b309a 0%, ${board.deep} 52%, ${board.navy} 100%);
  border: 1px solid ${board.line};
  border-radius: 22px;
  box-shadow:
    0 6px 0 ${board.edge},
    0 22px 40px #0f1c5c33,
    inset 0 1px 0 #ffffff26;
  color: ${board.ivoryLight};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    ${checkerPattern('#ffffff0d', 72)};
    border-radius: inherit;
    content: '';
    inset: 0;
    mask-image: radial-gradient(85% 75% at 100% 0%, #000000, transparent 72%);
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }
`;
