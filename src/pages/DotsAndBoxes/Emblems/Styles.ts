import styled, {css, keyframes} from 'styled-components';

import {fonts} from 'styles';

import {dots} from '../theme';

// The demo game repeats every 12.8 seconds: its 24 lines take about ten, then the finished board rests and fades
const DEMO_LOOP = 12.8;
const DEMO_FADE = 12;
const DEMO_GONE = 12.4;

const at = (seconds: number) => `${((seconds / DEMO_LOOP) * 100).toFixed(2)}%`;

type Keyframes = ReturnType<typeof keyframes>;

const cached = (cache: Map<number, Keyframes>, start: number, create: () => Keyframes) => {
  if (!cache.has(start)) cache.set(start, create());
  return cache.get(start)!;
};

// A line appears the way the match board draws one, growing from its middle
const lineDraws = new Map<number, Keyframes>();
const getLineDraw = (start: number) =>
  cached(
    lineDraws,
    start,
    () => keyframes`
      0%, ${at(start)} { opacity: 0; transform: scale(0.3); }
      ${at(start + 0.2)}, ${at(DEMO_FADE)} { opacity: 1; transform: scale(1); }
      ${at(DEMO_GONE)}, 100% { opacity: 0; transform: scale(1); }
    `,
  );

const boxClaims = new Map<number, Keyframes>();
const getBoxClaim = (start: number) =>
  cached(
    boxClaims,
    start,
    () => keyframes`
      0%, ${at(start + 0.12)} { opacity: 0; transform: scale(0.55); }
      ${at(start + 0.36)}, ${at(DEMO_FADE)} { opacity: 1; transform: scale(1); }
      ${at(DEMO_GONE)}, 100% { opacity: 0; transform: scale(1); }
    `,
  );

const claim = keyframes`
  0%, 72% { opacity: 0; }
  82%, 100% { opacity: 1; }
`;

const pulse = keyframes`
  from { opacity: 0.3; }
  to { opacity: 1; }
`;

const trace = keyframes`
  0% { stroke-dashoffset: 4; }
  72%, 100% { stroke-dashoffset: 0; }
`;

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const sideStrokes = css`
  .blue {
    stroke: ${dots.blue};
  }

  .red {
    stroke: ${dots.red};
  }
`;

export const Demo = styled.svg`
  display: block;
  height: auto;
  overflow: visible;
  width: 100%;

  .dot {
    fill: ${dots.dot};
  }

  .open {
    stroke: #dfe3ec;
    stroke-linecap: round;
    stroke-width: 2.6;
  }

  line.blue {
    stroke: ${dots.blue};
  }

  line.red {
    stroke: ${dots.red};
  }
`;

// The base style is the finished game, which is what players who prefer reduced motion see
export const DemoBox = styled.rect<{$at: number}>`
  ${({$at}) => css`
    animation: ${getBoxClaim($at)} ${DEMO_LOOP}s linear infinite;
  `}
  transform-box: fill-box;
  transform-origin: center;
  ${still};

  &.blue {
    fill: #cfdcff;
    stroke: none;
  }

  &.red {
    fill: #ffd5cc;
    stroke: none;
  }
`;

export const DemoLine = styled.line<{$at: number}>`
  ${({$at}) => css`
    animation: ${getLineDraw($at)} ${DEMO_LOOP}s linear infinite;
  `}
  stroke-linecap: round;
  stroke-width: 4.4;
  transform-box: fill-box;
  transform-origin: center;
  ${still};
`;

export const Emblem = styled.svg`
  ${sideStrokes};
  display: block;
  flex-shrink: 0;
  height: 56px;
  overflow: visible;
  width: 56px;

  .dot {
    fill: ${dots.dot};
  }

  .fill.blue {
    fill: ${dots.blueFill};
    stroke: none;
  }

  .fill.red {
    fill: ${dots.redFill};
    stroke: none;
  }

  .initial {
    dominant-baseline: central;
    fill: ${dots.red};
    font-family: ${fonts.family.default};
    font-size: 21px;
    font-weight: ${fonts.weight.extraBold};
    stroke: none;
    text-anchor: middle;
  }

  .line {
    fill: none;
    stroke-linecap: round;
    stroke-width: 4;
  }

  @media (max-width: 480px) {
    height: 46px;
    width: 46px;
  }
`;

// Colours come from custom properties so that a choice can show its picture in pencil until it is picked
export const Meter = styled.svg`
  display: block;
  height: 26px;
  overflow: visible;
  width: 68px;

  .dot {
    fill: var(--sketch-dot, ${dots.dot});
  }

  .free {
    fill: transparent;
    stroke: var(--sketch-free, ${dots.pencil});
    stroke-width: 2;
  }

  .taken {
    fill: var(--sketch-blue-fill, ${dots.blueFill});
    stroke: var(--sketch-blue, ${dots.blue});
    stroke-width: 2.6;
  }
`;

export const Podium = styled.svg`
  display: block;
  height: auto;
  max-width: 210px;
  overflow: visible;
  width: 100%;

  circle {
    fill: ${dots.dot};
  }

  rect {
    fill: #ffffffd9;
    stroke: ${dots.pencilDark};
    stroke-dasharray: 3 3.5;
    stroke-width: 1.8;
  }

  text {
    dominant-baseline: central;
    fill: ${dots.inkSoft};
    font-family: ${fonts.family.default};
    font-size: 11px;
    font-weight: ${fonts.weight.extraBold};
    text-anchor: middle;
  }

  .place-1 text {
    fill: ${dots.goldDeep};
    font-size: 13px;
  }

  .next {
    animation: ${pulse} 0.9s ease-in-out infinite alternate;
    stroke: ${dots.blue};
    stroke-linecap: round;
    stroke-width: 3.6;
    ${still};
  }
`;

export const Sketch = styled.svg`
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;

  line {
    stroke-linecap: round;
  }

  .blue {
    stroke: var(--sketch-blue, ${dots.blue});
    stroke-width: 2.2;
  }

  .box.blue {
    fill: var(--sketch-blue-fill, ${dots.blueFill});
    stroke: none;
  }

  .box.red {
    fill: var(--sketch-red-fill, ${dots.redFill});
    stroke: none;
  }

  .dot {
    fill: var(--sketch-dot, ${dots.dot});
  }

  .open {
    stroke: var(--sketch-open, #e3e7ef);
    stroke-width: 1.2;
  }

  .red {
    stroke: var(--sketch-red, ${dots.red});
    stroke-width: 2.2;
  }
`;

export const Spinner = styled.svg`
  display: block;
  flex-shrink: 0;
  height: 28px;
  overflow: visible;
  width: 28px;

  circle {
    fill: ${dots.dot};
  }

  .fill {
    animation: ${claim} 1.6s linear infinite;
    fill: ${dots.blueFill};
    ${still};
  }

  .trace {
    animation: ${trace} 1.6s ease-in-out infinite;
    fill: none;
    stroke: ${dots.blue};
    stroke-dasharray: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.6;
    ${still};
  }
`;
