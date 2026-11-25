import {css} from 'styled-components';

import {fonts} from 'styles';
import {DotsAndBoxesSide} from 'types/dotsAndBoxes';

// The colours of each player's lines and boxes on the board
export const sideColors: Record<DotsAndBoxesSide, {fill: string; ink: string; soft: string}> = {
  blue: {fill: '#dbe7ff', ink: '#2457d6', soft: '#8fb0f5'},
  red: {fill: '#ffe0da', ink: '#d2412f', soft: '#f2a093'},
};

// The look of the lobby and the match page: a sheet of dot-grid paper, navy ink dots, the blue and red lines of the
// board and the hero's ultramarine. Every choice is a box on the sheet, and picking one claims it in blue, the colour
// of the player who sets up the game.
export const dots = {
  blue: sideColors.blue.ink,
  blueFill: '#e6eeff',
  blueSoft: sideColors.blue.soft,
  dot: '#1f2a44',
  gold: '#f5c445',
  goldDeep: '#b78313',
  grid: '#1738782b',
  ink: '#16295a',
  inkSoft: '#56627f',
  mint: '#d5eed6',
  mintDeep: '#3d7a62',
  navy: '#173878',
  paper: '#fffdf8',
  pencil: '#cdd3e1',
  pencilDark: '#8f9ab6',
  red: sideColors.red.ink,
  redFill: '#ffe6e1',
  redSoft: sideColors.red.soft,
  rule: '#e3e6ee',
  ultramarine: '#234bc5',
};

// Four dots on the corners of the element, centred on its border line. `size` is the dot's diameter and `border`
// the element's border width; a negative width centres them on the border of a child that fills the element.
export const cornerDots = (color: string, size: number, border: number) => css`
  &::after {
    background:
      radial-gradient(circle closest-side, ${color} 86%, transparent) left top / ${size}px ${size}px no-repeat,
      radial-gradient(circle closest-side, ${color} 86%, transparent) right top / ${size}px ${size}px no-repeat,
      radial-gradient(circle closest-side, ${color} 86%, transparent) left bottom / ${size}px ${size}px no-repeat,
      radial-gradient(circle closest-side, ${color} 86%, transparent) right bottom / ${size}px ${size}px no-repeat;
    content: '';
    inset: ${-(size / 2 + border / 2)}px;
    pointer-events: none;
    position: absolute;
  }
`;

// The dot grid printed on the paper
export const dotGrid = (color: string = dots.grid, spacing = 24) =>
  `radial-gradient(circle, ${color} 1.3px, transparent 1.8px) ${spacing / 2}px ${spacing / 2}px / ${spacing}px ${spacing}px`;

// A label with a row of dots running to the end of the line, like the grid it sits on
export const dottedLeader = css`
  align-items: center;
  display: flex;
  gap: 12px;

  &::after {
    background: radial-gradient(circle, ${dots.pencilDark} 1.2px, transparent 1.7px) left center / 10px 6px repeat-x;
    content: '';
    flex: 1;
    height: 6px;
    min-width: 24px;
  }
`;

// A white button drawn in ink, for the second choice beside an ink button. Use it after `inkButton`.
export const ghostButton = css`
  background: #ffffff;
  border-color: ${dots.ink};
  box-shadow: 2px 2px 0 ${dots.ink};
  color: ${dots.ink};

  &:hover:not(:disabled) {
    background: ${dots.blueFill};
    box-shadow: 4px 4px 0 ${dots.ink};
  }

  &:active:not(:disabled) {
    box-shadow: 1px 1px 0 ${dots.ink};
  }
`;

// Native radios stay focusable and clickable through their label; the box next to them is what players see
export const hiddenInput = css`
  input {
    height: 1px;
    margin: 0;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

// The ultramarine button of the hero, with the same hard navy shadow
export const inkButton = css`
  align-items: center;
  background: ${dots.ultramarine};
  border: 2px solid ${dots.navy};
  border-radius: 6px;
  box-shadow: 3px 3px 0 ${dots.navy};
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  transition:
    box-shadow 0.12s ease,
    transform 0.12s ease;

  &:hover:not(:disabled) {
    box-shadow: 5px 5px 0 ${dots.navy};
    transform: translate(-2px, -2px);
  }

  &:active:not(:disabled) {
    box-shadow: 1px 1px 0 ${dots.navy};
    transform: translate(2px, 2px);
  }

  &:focus-visible {
    outline: 3px solid ${dots.gold};
    outline-offset: 4px;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const label = css`
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.14em;
  line-height: 1.4;
  text-transform: uppercase;
`;

// The faint pencil a board sketch is drawn in until it is picked or played on
export const pencilSketch = css`
  --sketch-blue: #98a2bb;
  --sketch-blue-fill: #eceef4;
  --sketch-dot: #98a2bb;
  --sketch-free: #c9cfdd;
  --sketch-open: #e6e9f0;
  --sketch-red: #b6bccd;
  --sketch-red-fill: #f1f2f6;
`;

// A sheet of dot-grid paper drawn as one big box: an ink border with a dot on every corner
export const sheet = css`
  ${cornerDots(dots.dot, 12, 2)};
  background: ${dotGrid()}, ${dots.paper};
  border: 2px solid ${dots.ink};
  border-radius: 4px;
  box-shadow:
    0 24px 44px -32px #17387880,
    0 2px 0 #1738780f;
  color: ${dots.ink};
  position: relative;
`;
