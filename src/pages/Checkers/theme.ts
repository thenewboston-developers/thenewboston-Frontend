import {css} from 'styled-components';

import {fonts} from 'styles';

// One familiar board palette shared by the lobby, illustrations, and playable board.
export const board = {
  accent: '#b8d58c',
  accentDark: '#56783e',
  accentLight: '#d1e5b4',
  bronze: '#e3a878',
  deep: '#172b22',
  edge: '#102018',
  forest: '#1f382c',
  gold: '#f4ce72',
  green: '#769656',
  haze: '#acbea7',
  ink: '#172b22',
  ivory: '#eeeed2',
  ivoryLight: '#fff8e6',
  line: '#49644c',
  lineSoft: '#49644c73',
  mist: '#d2ddce',
  muted: '#52644e',
  pale: '#edf2e5',
  paleBorder: '#cad5bd',
  pieceDark: '#25332c',
  pieceLight: '#fff8e6',
  silver: '#dfe4ee',
  squareDark: '#769656',
  squareLight: '#eeeed2',
};

// Small uppercase labels, set like the hero's eyebrow
export const label = css`
  font-size: 12px;
  font-weight: ${fonts.weight.extraBold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

// A checkerboard of faint squares; the size is one light and one dark square
export const checkerPattern = (color: string, size: number) => css`
  background: conic-gradient(${color} 25%, transparent 0 50%, ${color} 0 75%, transparent 0) 0 0 / ${size}px ${size}px;
`;

// A forest-green frame with a quiet checker pattern that echoes the playable board.
// The squares sit behind the content, so children need no extra stacking.
export const boardPanel = css`
  background:
    radial-gradient(120% 90% at 100% 0%, #76965626, transparent 62%),
    linear-gradient(165deg, ${board.forest} 0%, ${board.deep} 52%, ${board.edge} 100%);
  border: 1px solid ${board.line};
  border-radius: 22px;
  box-shadow:
    0 6px 0 ${board.edge},
    0 22px 40px #10201826,
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
