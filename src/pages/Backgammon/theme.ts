import {css} from 'styled-components';

import {fonts} from 'styles';

// The hero's walnut and brass board around the match board's felt, points and checkers, so the lobby looks like the
// table players are about to sit down at.
export const backgammon = {
  brass: '#c9a45c',
  brassBright: '#f2d9a7',
  brassDeep: '#8a6a35',
  brassText: '#dfc48f',
  coral: '#bb765b',
  felt: '#063a35',
  feltDeep: '#042e2b',
  feltLight: '#0d5a4f',
  forest: '#2a4c41',
  ink: '#fff2d9',
  ivory: '#ddcdaa',
  mist: '#bdd0c5',
  walnut: '#4a2a17',
  walnutDeep: '#2a170c',
  walnutLight: '#74452a',
};

// The same checkers as the match board: white plays ivory, black plays forest green
export const IVORY_CHECKER = 'radial-gradient(circle at 34% 28%, #fffaf0, #ebe0c5 52%, #cdbf9c)';
export const FOREST_CHECKER = 'radial-gradient(circle at 34% 28%, #5f8071, #2a4c41 52%, #102c27)';

const svgData = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;
const svgUrl = (svg: string) => `url("${svgData(svg)}")`;

// One ivory and one coral point per tile, hanging from the top edge and fading toward the middle of the board
const POINTS = svgUrl(
  `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='132' viewBox='0 0 96 132' preserveAspectRatio='none'>` +
    `<linearGradient id='i' x1='0' x2='0' y1='0' y2='1'><stop stop-color='${backgammon.ivory}' stop-opacity='.2'/><stop offset='1' stop-color='${backgammon.ivory}' stop-opacity='0'/></linearGradient>` +
    `<linearGradient id='c' x1='0' x2='0' y1='0' y2='1'><stop stop-color='${backgammon.coral}' stop-opacity='.32'/><stop offset='1' stop-color='${backgammon.coral}' stop-opacity='0'/></linearGradient>` +
    `<path d='M3 0h42L24 132z' fill='url(#i)'/><path d='M51 0h42L72 132z' fill='url(#c)'/></svg>`,
);

const FELT_GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 .09 0 0 0 0'/></filter><rect width='160' height='160' filter='url(#f)'/></svg>`;
const FELT_GRAIN = svgUrl(FELT_GRAIN_SVG);

// The same grain as image sources for the match board's SVG patterns, which cannot use CSS backgrounds. The wood is
// long dark streaks that run along the rails.
export const FELT_GRAIN_IMAGE = svgData(FELT_GRAIN_SVG);
export const WOOD_GRAIN_IMAGE = svgData(
  `<svg xmlns='http://www.w3.org/2000/svg' width='720' height='160'><filter id='w' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.0035 .11' numOctaves='3' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .1 0 0 0 0 .05 0 0 0 0 .02 .9 0 0 0 -.4'/></filter><rect width='720' height='160' filter='url(#w)'/></svg>`,
);

const WALNUT = `
  repeating-linear-gradient(97deg, #ffffff08 0 1px, transparent 1px 5px, #00000014 5px 6px, transparent 6px 11px),
  linear-gradient(160deg, ${backgammon.walnutLight} 0%, ${backgammon.walnut} 42%, ${backgammon.walnutDeep} 100%)
`;

const FELT = `
  ${FELT_GRAIN},
  radial-gradient(ellipse at 80% 0%, ${backgammon.feltLight}, transparent 62%),
  linear-gradient(180deg, ${backgammon.felt}, ${backgammon.feltDeep})
`;

/**
 * An open board: a walnut frame (the border) with a brass inlay around green felt. With points, a row of faint ivory
 * and coral points hangs from the top edge of the felt.
 */
export const boardPanel = ({frame = 10, points = true}: {frame?: number; points?: boolean} = {}) => css`
  background-clip: ${points ? 'padding-box, ' : ''}padding-box, padding-box, padding-box, border-box, border-box;
  background-image:
    ${points ? `${POINTS}, ` : ''}${FELT},
    ${WALNUT};
  background-origin: padding-box, padding-box, padding-box, ${points ? 'padding-box, ' : ''}border-box, border-box;
  background-position:
    ${points ? 'center top, ' : ''}0 0,
    0 0,
    0 0,
    0 0,
    0 0;
  background-repeat: ${points ? 'repeat-x, ' : ''}repeat, no-repeat, no-repeat, repeat, no-repeat;
  background-size:
    ${points ? '96px 132px, ' : ''}160px 160px,
    auto,
    auto,
    auto,
    auto;
  border: ${frame}px solid transparent;
  border-radius: ${frame + 8}px;
  box-shadow:
    inset 0 0 0 1px ${backgammon.brass}8c,
    inset 0 0 0 4px #00000026,
    0 2px 0 #1b0e06,
    0 16px 32px #1d0f0630;
  color: ${backgammon.ink};
`;

// The brass fittings of the board, for the main action on a panel
export const brassButton = css`
  align-items: center;
  background: linear-gradient(180deg, #f8e6bd, #e8c98a);
  border: 1px solid #fff0c9;
  border-radius: 8px;
  box-shadow:
    0 3px 0 ${backgammon.brassDeep},
    0 10px 20px #0000004d;
  color: #173b31;
  cursor: pointer;
  font-family: inherit;
  font-weight: ${fonts.weight.bold};
  gap: 8px;
  justify-content: center;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(180deg, #fff1d1, #efd59f);
  }

  &:active:not(:disabled) {
    box-shadow:
      0 1px 0 ${backgammon.brassDeep},
      0 4px 10px #0000004d;
    transform: translateY(2px);
  }

  &:focus-visible {
    outline: 2px solid ${backgammon.brassBright};
    outline-offset: 4px;
  }
`;

export const caption = css`
  font-size: 11px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: 0.14em;
  line-height: 1.5;
  text-transform: uppercase;
`;

export const serif = css`
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: ${fonts.weight.regular};
`;

// A round checker with the turned ring of the match board's pieces
export const checker = css`
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;

  &::after {
    border: 1px solid currentcolor;
    border-radius: 50%;
    content: '';
    inset: 18%;
    opacity: 0.35;
    position: absolute;
  }
`;
