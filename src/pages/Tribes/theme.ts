import {css, keyframes} from 'styled-components';

/* eslint-disable sort-keys */

// One palette for the whole game: the interface, the item icons, the hero scene and the world map all draw from it.
export const palette = {
  // Night forest: hero, navigation, map backdrop and other showpiece panels
  ink: '#0d1f1a',
  pine: '#11302a',
  forest: '#17443a',
  moss: '#2c6b55',
  leaf: '#4f9a6d',
  mint: '#a7d6b4',

  // Parchment: the workspace behind cards and forms
  paper: '#fbf9f3',
  sand: '#f4efe2',
  dune: '#e9e1cd',
  line: '#e4dcc8',
  lineSoft: '#eee8d9',

  // Text on parchment
  text: '#1c2b25',
  muted: '#647069',
  faint: '#8d978f',

  // Accents
  gold: '#e6aa3c',
  goldBright: '#f6c865',
  goldDeep: '#9a6a17',
  goldWash: '#fbf1d9',
  ember: '#d9573b',
  emberDeep: '#a53a24',
  emberWash: '#fcebe5',
  sky: '#4a9cc9',
  skyWash: '#e6f2f8',
  white: '#ffffff',
};

// Shared illustration colors (icons, hero and map sprites)
export const art = {
  woodDark: '#6b4226',
  wood: '#8a5a34',
  woodLight: '#b27a48',
  woodCut: '#d9a66b',
  foliageDark: '#2f6b4f',
  foliage: '#4a8f5c',
  foliageLight: '#7bb86a',
  stoneDark: '#6c777a',
  stone: '#8f9a9c',
  stoneLight: '#b9c2c3',
  stoneBright: '#dfe5e4',
  ironDark: '#7c8e9c',
  iron: '#9fb0bd',
  ironLight: '#d5e0e8',
  ore: '#c7773f',
  coalDark: '#2b2f33',
  coal: '#454b52',
  coalLight: '#6a737c',
  wheatDark: '#c9912b',
  wheat: '#e3b341',
  wheatLight: '#f3d27a',
  hideDark: '#8f5730',
  hide: '#b9794a',
  hideLight: '#d9a273',
  breadDark: '#c9964f',
  bread: '#e8c98a',
  cloth: '#efe6d2',
  shadow: 'rgba(13, 31, 26, 0.18)',
};

export const fonts = {
  display: "'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
  ui: "'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const shadows = {
  card: '0 1px 2px rgba(28, 43, 37, 0.04), 0 8px 24px -12px rgba(28, 43, 37, 0.12)',
  lifted: '0 2px 4px rgba(28, 43, 37, 0.06), 0 18px 40px -16px rgba(28, 43, 37, 0.28)',
  glow: '0 0 0 1px rgba(230, 170, 60, 0.45), 0 10px 30px -10px rgba(230, 170, 60, 0.55)',
  focus: '0 0 0 3px rgba(230, 170, 60, 0.45)',
};

export const easing = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const pop = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.86);
  }

  60% {
    opacity: 1;
    transform: scale(1.04);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const pulse = keyframes`
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.45;
  }
`;

export const shimmer = keyframes`
  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }
`;

export const stripes = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 28px 0;
  }
`;

// Entrance animation for cards; siblings arrive one after another
export const stagger = css`
  animation: ${fadeUp} 0.5s ${easing.out} both;

  &:nth-child(2) {
    animation-delay: 0.05s;
  }

  &:nth-child(3) {
    animation-delay: 0.1s;
  }

  &:nth-child(4) {
    animation-delay: 0.15s;
  }

  &:nth-child(5) {
    animation-delay: 0.2s;
  }

  &:nth-child(n + 6) {
    animation-delay: 0.25s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
`;
