import {css} from 'styled-components';

import {fonts} from 'styles';

// The lobby's midnight board: the hero's cosmic violet, a lavender go-board grid, ivory and obsidian stones and the gold
// of the winning line
export const cosmos = {
  edge: '#3d2d5e',
  edgeBright: '#5f4889',
  gold: '#ffd990',
  goldInk: '#2e1c03',
  goldSoft: 'rgba(255, 217, 144, 0.12)',
  grid: 'rgba(206, 181, 255, 0.075)',
  haze: '#dfd5f3',
  lavender: '#ceb5ff',
  lavenderSoft: 'rgba(206, 181, 255, 0.14)',
  lilac: '#ecdfff',
  mint: '#9cf0cb',
  mintSoft: 'rgba(120, 230, 180, 0.12)',
  mist: '#b5a8cd',
  muted: '#9384ae',
  night: '#100b26',
  raised: '#1f1742',
  rose: '#ffb3c2',
  roseSoft: 'rgba(255, 128, 156, 0.13)',
  starlight: '#fbf8ff',
  well: '#0c0820',
};

// Board intersections sit every GRID_CELL pixels and a star point marks every fifth line, as on a real board
export const GRID_CELL = 32;
const STAR_SPACING = GRID_CELL * 5;
// The star tile paints its dot in its own center, the offset moves that center onto an intersection of the grid
const STAR_OFFSET = `${GRID_CELL * 2 + 0.5 - STAR_SPACING / 2}px`;

// A midnight panel with a go-board grid that fades out from the top right corner. Content needs no extra stacking: the
// grid sits behind it. Nothing is clipped, so a dropdown inside the panel can open past its edge.
export const boardPanel = css`
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(132, 84, 224, 0.2), transparent 55%),
    linear-gradient(180deg, #1b1339, #110b27);
  border: 1px solid ${cosmos.edge};
  border-radius: 24px;
  box-shadow:
    0 18px 40px rgba(16, 11, 38, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  color: ${cosmos.starlight};
  color-scheme: dark;
  isolation: isolate;
  min-width: 0;
  position: relative;

  &::before {
    background-image:
      radial-gradient(circle, rgba(206, 181, 255, 0.34) 1.5px, transparent 2.5px),
      linear-gradient(${cosmos.grid} 1px, transparent 1px), linear-gradient(90deg, ${cosmos.grid} 1px, transparent 1px);
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
  color: ${cosmos.lavender};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.12em;
  line-height: 1.5;
  text-transform: uppercase;
`;

export const fieldLabel = css`
  color: ${cosmos.mist};
  display: block;
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.1em;
  line-height: 1.4;
  margin: 0 0 8px;
  text-transform: uppercase;
`;

export const fieldControl = css`
  background: ${cosmos.well};
  border: 1px solid ${cosmos.edge};
  border-radius: 14px;
  color: ${cosmos.starlight};
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
    color: ${cosmos.muted};
    opacity: 1;
  }

  &:hover {
    border-color: ${cosmos.edgeBright};
  }

  &:focus {
    border-color: ${cosmos.lavender};
    box-shadow: 0 0 0 3px rgba(206, 181, 255, 0.22);
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
  color: ${cosmos.goldInk};
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
    outline: 2px solid ${cosmos.gold};
    outline-offset: 4px;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    color: ${cosmos.muted};
    cursor: not-allowed;
  }

  /* A game or challenge that is being created keeps its gold, only dimmed */
  &[aria-busy='true']:disabled {
    background: linear-gradient(180deg, #ffe6ad, #f7c96c);
    border-color: #fff0cc;
    color: ${cosmos.goldInk};
    cursor: progress;
    opacity: 0.75;
  }
`;

export const ghostButton = css`
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${cosmos.edgeBright};
  border-radius: 999px;
  color: ${cosmos.lilac};
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
    background: ${cosmos.lavenderSoft};
    border-color: ${cosmos.lavender};
  }

  &:focus-visible {
    outline: 2px solid ${cosmos.lavender};
    outline-offset: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// The shared light pagination, recolored for the midnight panels
export const paginationStyle = css`
  button {
    background: ${cosmos.well};
    border-color: ${cosmos.edge};
    color: ${cosmos.haze};
  }

  button:hover:not(:disabled) {
    background: ${cosmos.raised};
    border-color: ${cosmos.edgeBright};
  }

  button:disabled {
    background: transparent;
    color: ${cosmos.muted};
    opacity: 0.5;
  }

  button:focus-visible {
    border-color: ${cosmos.lavender};
    box-shadow: 0 0 0 2px rgba(206, 181, 255, 0.45);
  }

  button[aria-current='page'],
  button[aria-current='page']:hover {
    background: ${cosmos.gold};
    border-color: ${cosmos.gold};
    color: ${cosmos.goldInk};
  }

  span {
    color: ${cosmos.muted};
  }
`;
