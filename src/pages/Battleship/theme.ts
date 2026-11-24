import {css} from 'styled-components';

// The lobby's naval command look: the hero's midnight navy, an ice-blue tactical grid and amber targeting accents
export const naval = {
  abyss: '#061323',
  amber: '#ffad6a',
  amberLight: '#ffc89c',
  amberSoft: 'rgba(255, 173, 106, 0.14)',
  bronze: '#e0a477',
  deep: '#081a2d',
  flare: '#ff7a4d',
  fog: '#7d97ab',
  gold: '#f6cb6f',
  grid: 'rgba(125, 190, 228, 0.075)',
  hull: '#0d2439',
  ice: '#eaf6fd',
  ink: '#1a1209',
  kelp: '#6fdca0',
  mist: '#a9c2d4',
  silver: '#cfdbe6',
  sonar: '#64d2ec',
  sonarSoft: 'rgba(100, 210, 236, 0.14)',
  steel: '#1f3d56',
  steelBright: '#33607f',
};

export const navalMono = `'SFMono-Regular', ui-monospace, Menlo, Consolas, 'Liberation Mono', monospace`;

// Small uppercase instrument-style labels
export const readout = css`
  font-family: ${navalMono};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

// A dark console with a fading tactical grid and HUD corner brackets. Content needs no extra stacking: the grid sits
// behind it and the brackets stay inside the padding.
export const navalConsole = css`
  background:
    radial-gradient(110% 70% at 100% 0%, #4da3d129, transparent 60%), linear-gradient(180deg, #0c2238, #071526);
  border: 1px solid ${naval.steel};
  border-radius: 20px;
  box-shadow:
    0 18px 42px #0613231f,
    inset 0 1px 0 #ffffff0a;
  color: ${naval.ice};
  color-scheme: dark;
  isolation: isolate;
  position: relative;

  &::before {
    background-image:
      linear-gradient(${naval.grid} 1px, transparent 1px), linear-gradient(90deg, ${naval.grid} 1px, transparent 1px);
    background-position: -1px -1px;
    background-size: 28px 28px;
    border-radius: inherit;
    content: '';
    inset: 0;
    mask-image: linear-gradient(180deg, #000000, transparent 85%);
    pointer-events: none;
    position: absolute;
    z-index: -1;
  }

  &::after {
    background:
      linear-gradient(${naval.amber}, ${naval.amber}) left top / 18px 2px,
      linear-gradient(${naval.amber}, ${naval.amber}) left top / 2px 18px,
      linear-gradient(${naval.amber}, ${naval.amber}) right top / 18px 2px,
      linear-gradient(${naval.amber}, ${naval.amber}) right top / 2px 18px,
      linear-gradient(${naval.amber}, ${naval.amber}) left bottom / 18px 2px,
      linear-gradient(${naval.amber}, ${naval.amber}) left bottom / 2px 18px,
      linear-gradient(${naval.amber}, ${naval.amber}) right bottom / 18px 2px,
      linear-gradient(${naval.amber}, ${naval.amber}) right bottom / 2px 18px;
    background-repeat: no-repeat;
    content: '';
    inset: 10px;
    opacity: 0.45;
    pointer-events: none;
    position: absolute;
  }
`;
