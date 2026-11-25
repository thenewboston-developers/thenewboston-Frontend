import {css} from 'styled-components';

import {fonts} from 'styles';

/**
 * The Mancala lobby is a set of carved walnut boards: honey bevels like the hero's board, dark carved hollows like the
 * match board's pits, and the hero's jewel-colored glass stones. Selections glow jade, like a playable pit; primary
 * actions are amber glass.
 */
export const mancala = {
  amber: '#f6b14f',
  amberDeep: '#8f4c12',
  amberEdge: '#c06f1d',
  amberLight: '#ffd995',
  cream: '#fff4e2',
  dust: '#d2aa7c',
  edge: '#2f1709',
  honey: '#f7bd6c',
  ink: '#3b1d0b',
  jade: '#7fe6d0',
  jadeInk: '#073a33',
  line: '#f3c88f29',
  lineBright: '#f3c88f5c',
  sand: '#ead0aa',
  walnut: '#5d331b',
  walnutDark: '#4a2812',
  walnutLight: '#7a4826',
};

export interface StoneTone {
  base: string;
  deep: string;
  light: string;
}

export const STONES = {
  amber: {base: '#f2a637', deep: '#8a4609', light: '#ffe7b0'},
  amethyst: {base: '#9a5ad6', deep: '#3d1665', light: '#ead0ff'},
  coral: {base: '#ec7a5f', deep: '#8a2d1c', light: '#ffd6c8'},
  ivory: {base: '#f1e3c9', deep: '#9a7d55', light: '#ffffff'},
  jade: {base: '#5fd3bd', deep: '#0f6457', light: '#d4fff4'},
  turquoise: {base: '#27bfb0', deep: '#0a5b55', light: '#b2fff4'},
};

// The hero's stones, in the order a pit is filled
export const STONE_CYCLE: StoneTone[] = [STONES.turquoise, STONES.amethyst, STONES.amber, STONES.ivory];

// Fine straight grain plus a few broad growth rings, both faint enough to keep text crisp
export const WOOD_GRAIN = [
  'repeating-linear-gradient(177deg, transparent 0 11px, #ffdcaa0a 12px 13px, transparent 14px 23px)',
  'repeating-radial-gradient(ellipse 160% 70% at 15% -35%, transparent 0 24px, #1a0a0212 25px 27px, transparent 28px 52px)',
].join(', ');

const ENGRAVED_PITS = Array.from({length: 12}, (_, index) => {
  const column = index % 6;
  return `<circle cx="${87 + column * 45.2}" cy="${index < 6 ? 48 : 102}" r="18"/>`;
}).join('');

// Two rows of six pits between two stores, cut faintly into the corner of every board
const ENGRAVED_BOARD = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150"><g fill="#1a0a02" fill-opacity="0.18" stroke="#ffd9a2" stroke-opacity="0.12" stroke-width="1.5"><rect x="14" y="16" width="40" height="118" rx="20"/><rect x="346" y="16" width="40" height="118" rx="20"/>${ENGRAVED_PITS}</g></svg>`,
);

export const carved = css`
  background: radial-gradient(ellipse 120% 90% at 50% 20%, #3b2111, #2a160a 62%, #1f1007);
  border: 1px solid #f3c88f1a;
  box-shadow:
    inset 0 5px 10px #0d0603b3,
    inset 0 -1px 2px #f7c98a1f,
    0 1px 0 #ffd9a21f;
`;

export const eyebrow = css`
  color: ${mancala.honey};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.16em;
  line-height: 1.4;
  text-transform: uppercase;
`;

export const focusRing = css`
  outline: 3px solid ${mancala.jade};
  outline-offset: 3px;
`;

// Polished glass like the hero's stones. Callers set the size; stones are a little wider than tall.
export const glassStone = (tone: StoneTone) => css`
  background:
    radial-gradient(circle at 31% 27%, #ffffffe6 0 7%, #ffffff4d 16%, transparent 36%),
    radial-gradient(circle at 68% 78%, ${tone.deep}b3, transparent 62%),
    radial-gradient(circle at 46% 40%, ${tone.light}, ${tone.base} 56%, ${tone.deep});
  border-radius: 48% 52% 50% 50% / 52% 48% 52% 48%;
  box-shadow:
    inset 0 -2px 3px ${tone.deep}80,
    0 2px 3px #0a0402a6;
`;

// The honey wood of the hero's board, for the match board, the small illustrated boards and emblem tiles
export const honeyWood = css`
  background:
    ${WOOD_GRAIN}, radial-gradient(ellipse 70% 60% at 25% 0%, #ffe1ad59, transparent 70%),
    linear-gradient(160deg, #eaa75f, #cf8a45 52%, #b56f31);
  box-shadow:
    inset 0 2px 1px #ffe2b399,
    inset 0 -3px 2px #7a3f1666,
    0 4px 0 #6b3412,
    0 10px 18px #1a0a0240;
`;

// Light from the top left leaves the upper rim of a carved bowl in shadow, like the pits of the hero's board
export const HONEY_HOLLOW_SHADOW = 'inset 2px 5px 7px #5e2a0bb3, inset -1px -2px 3px #ffdcaa66, 0 1px 0 #ffe7bf80';

export const honeyHollow = css`
  background: radial-gradient(ellipse 110% 100% at 60% 72%, #eba862 0%, #cd8642 50%, #9e5b24 100%);
  box-shadow: ${HONEY_HOLLOW_SHADOW};
`;

export const label = css`
  color: ${mancala.sand};
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.12em;
  line-height: 1.4;
  text-transform: uppercase;
`;

export const amberButton = css`
  align-items: center;
  background: linear-gradient(180deg, ${mancala.amberLight} 0%, ${mancala.amber} 48%, #e8912c 100%);
  border: 0;
  border-radius: 999px;
  box-shadow:
    inset 0 1px 0 #fff3d0,
    inset 0 -2px 0 ${mancala.amberEdge},
    0 4px 0 ${mancala.amberDeep},
    0 10px 18px #2b120566;
  color: ${mancala.ink};
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
    filter 150ms ease,
    transform 150ms ease;

  &:hover:not(:disabled) {
    filter: brightness(1.06);
  }

  &:active:not(:disabled) {
    transform: translateY(2px);
  }

  &:focus-visible {
    ${focusRing};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ghostButton = css`
  align-items: center;
  background: #1f10071f;
  border: 1px solid ${mancala.lineBright};
  border-radius: 999px;
  color: ${mancala.cream};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;

  &:hover:not(:disabled) {
    background: #ffe7c414;
    border-color: ${mancala.sand};
  }

  &:focus-visible {
    ${focusRing};
  }
`;

export const woodPanel = css`
  background:
    ${WOOD_GRAIN}, radial-gradient(ellipse 80% 60% at 12% 0%, #a2643433, transparent 70%),
    linear-gradient(165deg, ${mancala.walnutLight}, ${mancala.walnut} 45%, ${mancala.walnutDark});
  border: 1px solid ${mancala.line};
  border-radius: 30px;
  box-shadow:
    inset 0 1px 0 #ffd9a259,
    inset 0 -3px 0 #2412084d,
    0 6px 0 ${mancala.edge},
    0 18px 30px #3d1e0c38;
  color: ${mancala.cream};
`;

/**
 * A board with the faint outline of a Mancala board cut into its top right corner. The carving is a pseudo-element,
 * so the board itself never needs `overflow: hidden` (which would clip the member search popover).
 */
export const engravedBoard = css`
  ${woodPanel};
  isolation: isolate;
  position: relative;

  &::before {
    background: url('data:image/svg+xml,${ENGRAVED_BOARD}') no-repeat right 18px top 16px / 330px auto;
    content: '';
    height: 160px;
    mask-image: radial-gradient(ellipse 80% 110% at 100% 0%, #000 32%, transparent 72%);
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: min(70%, 360px);
    z-index: -1;
  }

  @media (max-width: 600px) {
    &::before {
      display: none;
    }
  }
`;
