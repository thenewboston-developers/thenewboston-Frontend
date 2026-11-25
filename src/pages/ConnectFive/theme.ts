import {css} from 'styled-components';

import {fonts} from 'styles';

// One classic tabletop palette across the lobby, board, stones, and match controls.
// Warm wood makes black and ivory pieces readable without relying on hue alone.
export const classic = {
  accent: '#edc58b',
  accentInk: '#2c1d10',
  accentSoft: 'rgba(237, 197, 139, 0.12)',
  blackStone: '#20201e',
  board: '#d8b47a',
  boardGrid: '#755231',
  boardRim: '#8a6038',
  border: '#514137',
  borderStrong: '#85664a',
  focus: '#edc58b',
  focusSoft: 'rgba(237, 197, 139, 0.14)',
  grid: 'rgba(237, 197, 139, 0.075)',
  muted: '#ad9b85',
  negative: '#ffb3b0',
  negativeSoft: 'rgba(255, 179, 176, 0.13)',
  positive: '#a7dbb5',
  positiveSoft: 'rgba(167, 219, 181, 0.12)',
  surface: '#211a16',
  surfaceInset: '#17120f',
  surfaceRaised: '#30261f',
  text: '#fff9ee',
  textMuted: '#c0af99',
  textSecondary: '#e4d7c6',
  whiteStone: '#fff8e7',
};

// Board intersections sit every GRID_CELL pixels and a star point marks every fifth line, as on a real board
export const GRID_CELL = 32;
const STAR_SPACING = GRID_CELL * 5;
// The star tile paints its dot in its own center, the offset moves that center onto an intersection of the grid
const STAR_OFFSET = `${GRID_CELL * 2 + 0.5 - STAR_SPACING / 2}px`;

// A walnut panel with a go-board grid that fades out from the top right corner. Content needs no extra stacking: the
// grid sits behind it. Nothing is clipped, so a dropdown inside the panel can open past its edge.
export const boardPanel = css`
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(170, 117, 56, 0.2), transparent 55%),
    linear-gradient(180deg, #30261f, #211a16);
  border: 1px solid ${classic.border};
  border-radius: 24px;
  box-shadow:
    0 18px 40px rgba(33, 26, 22, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  color: ${classic.text};
  color-scheme: dark;
  isolation: isolate;
  min-width: 0;
  position: relative;

  &::before {
    background-image:
      radial-gradient(circle, rgba(237, 197, 139, 0.34) 1.5px, transparent 2.5px),
      linear-gradient(${classic.grid} 1px, transparent 1px),
      linear-gradient(90deg, ${classic.grid} 1px, transparent 1px);
    background-position:
      ${STAR_OFFSET} ${STAR_OFFSET},
      0 0,
      0 0;
    background-size:
      ${`${STAR_SPACING}px ${STAR_SPACING}px`}, ${`${GRID_CELL}px ${GRID_CELL}px`}, ${`${GRID_CELL}px ${GRID_CELL}px`};
    border-radius: inherit;
    content: '';
    inset: 0;
    mask-image: radial-gradient(130% 100% at 100% 0%, #000000, transparent 72%);
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }
`;

// Small uppercase labels, the hero's eyebrow at panel scale
export const eyebrow = css`
  color: ${classic.focus};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.12em;
  line-height: 1.5;
  text-transform: uppercase;
`;

export const fieldLabel = css`
  color: ${classic.textMuted};
  display: block;
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.1em;
  line-height: 1.4;
  margin: 0 0 8px;
  text-transform: uppercase;
`;

export const fieldControl = css`
  background: ${classic.surfaceInset};
  border: 1px solid ${classic.border};
  border-radius: 14px;
  color: ${classic.text};
  font-family: inherit;
  font-size: 15px;
  height: 48px;
  outline: none;
  padding: 0 16px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;

  &::placeholder {
    color: ${classic.muted};
    opacity: 1;
  }

  &:hover {
    border-color: ${classic.borderStrong};
  }

  &:focus {
    border-color: ${classic.focus};
    box-shadow: 0 0 0 3px rgba(237, 197, 139, 0.22);
  }
`;

// The primary action of a panel, in the gold of the winning line
export const goldButton = css`
  align-items: center;
  background: linear-gradient(180deg, #ffe6ad, #f7c96c);
  border: 1px solid #fff0cc;
  border-radius: 999px;
  box-shadow:
    0 8px 24px rgba(255, 196, 92, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  color: ${classic.accentInk};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  transition:
    box-shadow 0.15s ease,
    filter 0.15s ease;

  &:hover:not(:disabled) {
    box-shadow:
      0 10px 30px rgba(255, 196, 92, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
    filter: brightness(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${classic.accent};
    outline-offset: 4px;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    color: ${classic.muted};
    cursor: not-allowed;
  }

  /* A game or challenge that is being created keeps its gold, only dimmed */
  &[aria-busy='true']:disabled {
    background: linear-gradient(180deg, #ffe6ad, #f7c96c);
    border-color: #fff0cc;
    color: ${classic.accentInk};
    cursor: progress;
    opacity: 0.75;
  }
`;

export const ghostButton = css`
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${classic.borderStrong};
  border-radius: 999px;
  color: ${classic.text};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  gap: 6px;
  justify-content: center;
  min-height: 40px;
  padding: 0 18px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: ${classic.focusSoft};
    border-color: ${classic.focus};
  }

  &:focus-visible {
    outline: 2px solid ${classic.focus};
    outline-offset: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// The shared light pagination, recolored for the walnut panels
export const paginationStyle = css`
  button {
    background: ${classic.surfaceInset};
    border-color: ${classic.border};
    color: ${classic.textSecondary};
  }

  button:hover:not(:disabled) {
    background: ${classic.surfaceRaised};
    border-color: ${classic.borderStrong};
  }

  button:disabled {
    background: transparent;
    color: ${classic.muted};
    opacity: 0.5;
  }

  button:focus-visible {
    border-color: ${classic.focus};
    box-shadow: 0 0 0 2px rgba(237, 197, 139, 0.45);
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${classic.accent};
    border-color: ${classic.accent};
    color: ${classic.accentInk};
  }

  span {
    color: ${classic.muted};
  }
`;
