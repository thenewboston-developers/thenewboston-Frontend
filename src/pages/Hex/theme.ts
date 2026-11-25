import {css} from 'styled-components';

import {fonts} from 'styles';
import {HexSide} from 'types/hex';

// The lobby's look, taken from the hero and the board: midnight navy, ivory porcelain cells, ruby and cobalt glass
// stones and the gold of a winning chain
export const hex = {
  cobalt: '#2f72da',
  cobaltDeep: '#153f8f',
  cobaltLight: '#8db6ff',
  gold: '#ffd666',
  goldDeep: '#d9a730',
  groove: '#b3ab94',
  haze: '#8e9ac4',
  ice: '#eef2ff',
  line: '#26355f',
  lineBright: '#3b4f87',
  midnight: '#0b142c',
  mist: '#bcc6e6',
  navy: '#121f3f',
  porcelain: '#f2eee2',
  ruby: '#e0483c',
  rubyDeep: '#9a261d',
  rubyLight: '#ff8f80',
};

// A regular hexagon standing on a point, like the cells of the board
export const HEXAGON = 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)';

// The same hexagon inside a square box, for square images such as avatars
export const SQUARE_HEXAGON = 'polygon(50% 0, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)';

// One tile of a honeycomb of 15px cells standing on a point; it repeats without seams
const LATTICE_TILE = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="45"><path d="M13 0V7.5M0 15L13 7.5L26 15M0 15V30M26 15V30M0 30L13 37.5L26 30M13 37.5V45" fill="none" stroke="#ffffff" stroke-opacity="0.08"/></svg>`;

export const lattice = `url("data:image/svg+xml,${encodeURIComponent(LATTICE_TILE)}")`;

const ACCENTS = {
  blue: css`
    --accent: ${hex.cobaltLight};
    --accent-deep: ${hex.cobaltDeep};
    --accent-glow: #2f72da40;
    --accent-soft: #2f72da24;
    --accent-strong: ${hex.cobalt};
    --button-bottom: #2462c8;
    --button-top: #3d82ea;
    --stone-dark: ${hex.cobaltDeep};
    --stone-light: #9cc4ff;
  `,
  red: css`
    --accent: ${hex.rubyLight};
    --accent-deep: ${hex.rubyDeep};
    --accent-glow: #e0483c40;
    --accent-soft: #e0483c21;
    --accent-strong: ${hex.ruby};
    --button-bottom: #bb3428;
    --button-top: #e2503f;
    --stone-dark: #9c2219;
    --stone-light: #ff9d8f;
  `,
};

const EDGE_BANDS: Record<HexSide, string> = {
  blue: [
    `linear-gradient(180deg, transparent 8%, ${hex.cobalt} 32% 68%, transparent 92%) left / 2px 100% no-repeat`,
    `linear-gradient(180deg, transparent 8%, ${hex.cobalt} 32% 68%, transparent 92%) right / 2px 100% no-repeat`,
  ].join(', '),
  red: [
    `linear-gradient(90deg, transparent 6%, ${hex.ruby} 30% 70%, transparent 94%) top / 100% 2px no-repeat`,
    `linear-gradient(90deg, transparent 6%, ${hex.ruby} 30% 70%, transparent 94%) bottom / 100% 2px no-repeat`,
  ].join(', '),
};

// Background layers that draw a side's two edges along the border of a box, as on the board: red along the top and
// bottom, blue along the sides
export const edgeBands = (side: HexSide) => EDGE_BANDS[side];

// Sets the custom properties that color a container's accents, buttons and stones after one of the two sides
export const sideAccent = (side: HexSide) => ACCENTS[side];

// A raised glass button in the side color of its container, pressed down when clicked like the hero's
export const glassButton = css`
  align-items: center;
  background: linear-gradient(180deg, var(--button-top), var(--button-bottom));
  border: 0;
  border-radius: 12px;
  box-shadow:
    0 4px 0 var(--accent-deep),
    0 14px 26px var(--accent-glow),
    inset 0 1px 0 #ffffff40;
  color: #ffffff;
  cursor: pointer;
  font-family: inherit;
  font-weight: ${fonts.weight.bold};
  gap: 10px;
  justify-content: center;
  text-shadow: 0 1px 1px #00000040;
  transition:
    box-shadow 0.12s ease,
    filter 0.15s ease,
    transform 0.12s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.07);
  }

  &:active:not(:disabled) {
    box-shadow:
      0 1px 0 var(--accent-deep),
      0 8px 18px var(--accent-glow),
      inset 0 1px 0 #ffffff40;
    transform: translateY(3px);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }
`;

// A glass stone like the ones on the board, in the side color of its container
export const glassStone = css`
  background: radial-gradient(
    circle at 35% 30%,
    var(--stone-light) 0,
    var(--accent-strong) 55%,
    var(--stone-dark) 100%
  );
  border-radius: 50%;
  box-shadow:
    0 1px 2px #050b1a99,
    inset 0 -1px 1px #00000033;
`;

// Small uppercase labels, as in the hero's eyebrow
export const label = css`
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.12em;
  line-height: 1.4;
  text-transform: uppercase;
`;

// A midnight panel with a honeycomb fading out of one corner. Content needs no extra stacking: the honeycomb sits
// behind it.
export const honeycombPanel = css`
  background:
    radial-gradient(90% 70% at 100% 0%, var(--panel-glow, #2456b42e), transparent 70%),
    linear-gradient(165deg, ${hex.navy}, ${hex.midnight} 75%);
  border: 1px solid #ffffff17;
  border-radius: 22px;
  box-shadow:
    0 20px 44px #0b142c24,
    inset 0 1px 0 #ffffff0d;
  color: ${hex.ice};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    background-image: ${lattice};
    background-position: right -1px top -1px;
    border-radius: inherit;
    content: '';
    inset: 0;
    mask-image: radial-gradient(75% 65% at 100% 0%, #000000, transparent);
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }
`;

// A midnight board: the honeycomb panel with edge bands like the board's own, red along the top and bottom and blue
// along the sides. The bands stay inside the padding.
export const boardPanel = css`
  ${honeycombPanel};

  &::after {
    background: ${edgeBands('red')}, ${edgeBands('blue')};
    border-radius: inherit;
    content: '';
    inset: 0;
    opacity: 0.6;
    pointer-events: none;
    position: absolute;
  }
`;
