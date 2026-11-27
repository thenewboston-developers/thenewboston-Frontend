import {CSSProperties, useId} from 'react';
import styled, {css, keyframes} from 'styled-components';

import {art, palette} from '../theme';

export type HeroPhase = 'upcoming' | 'active' | 'final' | 'finished';

interface Mood {
  cloud: string;
  cloudOpacity: number;
  cloudStyle: 'puffy' | 'streak';
  embers: boolean;
  fireScale: number;
  foreground: string;
  glow: string;
  glowOpacity: number;
  haze: string;
  hazeOpacity: number;
  hill: string;
  hillRim: string;
  hillShade: string;
  hillsFar: string;
  hillsLow: string;
  hillsNear: string;
  mist: string;
  mistOpacity: number;
  moon: boolean;
  mountainFar: string;
  mountainFarShade: string;
  mountainNear: string;
  mountainNearShade: string;
  path: string;
  pineFar: string;
  pineLow: string;
  pineNear: string;
  sky: [string, string, string, string, string];
  snow: string;
  snowShade: string;
  stars: boolean;
  sun: string;
  sunRadius: number;
  sunX: number;
  sunY: number;
  tint: string;
  tintAmount: number;
  torches: boolean;
  window: string;
  windowGlow: number;
}

// The scene is drawn once in a 1600 x 600 space; the settlement sits around x = 1170
const HEIGHT = 600;
const WIDTH = 1600;
const SKY_STOPS = [0, 0.3, 0.48, 0.62, 0.74];

const MOODS: Record<HeroPhase, Mood> = {
  // Dawn: the tribes gather
  upcoming: {
    cloud: '#f4b98a',
    cloudOpacity: 0.62,
    cloudStyle: 'streak',
    embers: false,
    fireScale: 1,
    foreground: '#081a1b',
    glow: '#ffbf66',
    glowOpacity: 0.85,
    haze: '#f2b67a',
    hazeOpacity: 0.5,
    hill: '#2c5c4a',
    hillRim: '#d8a765',
    hillShade: '#1f4a3e',
    hillsFar: '#2b5a55',
    hillsLow: '#102e2e',
    hillsNear: '#1b4341',
    mist: '#f8dcb6',
    mistOpacity: 0.42,
    moon: false,
    mountainFar: '#5b808a',
    mountainFarShade: '#476b7b',
    mountainNear: '#35616c',
    mountainNearShade: '#28505e',
    path: '#9a875f',
    pineFar: '#204c49',
    pineLow: '#0c2627',
    pineNear: '#143937',
    sky: ['#0b2530', '#15495a', '#3f7880', '#e3a268', '#f6ca7e'],
    snow: '#f8dfc2',
    snowShade: '#bfb1b6',
    stars: false,
    sun: '#ffe9b5',
    sunRadius: 40,
    sunX: 968,
    sunY: 318,
    tint: '#1d3a44',
    tintAmount: 0.3,
    torches: false,
    window: '#ffd27a',
    windowGlow: 0.55,
  },
  // Golden-hour day: the tournament is under way
  active: {
    cloud: '#ffffff',
    cloudOpacity: 0.9,
    cloudStyle: 'puffy',
    embers: false,
    fireScale: 0.9,
    foreground: '#0f2a25',
    glow: '#ffe7a0',
    glowOpacity: 0.6,
    haze: '#d4e9d6',
    hazeOpacity: 0.45,
    hill: '#62a866',
    hillRim: '#a3d47c',
    hillShade: '#45895a',
    hillsFar: '#4c9c69',
    hillsLow: '#215641',
    hillsNear: '#357d57',
    mist: '#ffffff',
    mistOpacity: 0.14,
    moon: false,
    mountainFar: '#86aeba',
    mountainFarShade: '#6791a3',
    mountainNear: '#4f8f8d',
    mountainNearShade: '#3c7778',
    path: '#dcc48c',
    pineFar: '#357f5a',
    pineLow: '#184536',
    pineNear: '#276646',
    sky: ['#0d4560', '#1f6f8c', '#4fa0b0', '#a9d3c4', '#f1dfa8'],
    snow: '#ffffff',
    snowShade: '#d3e4ec',
    stars: false,
    sun: '#fff5d0',
    sunRadius: 36,
    sunX: 1005,
    sunY: 222,
    tint: '#fff0c0',
    tintAmount: 0.04,
    torches: false,
    window: '#ffe39a',
    windowGlow: 0.2,
  },
  // Dusk before the war: the last day
  final: {
    cloud: '#f58553',
    cloudOpacity: 0.6,
    cloudStyle: 'streak',
    embers: true,
    fireScale: 1.15,
    foreground: '#0e0813',
    glow: '#ff6d3d',
    glowOpacity: 0.9,
    haze: '#f2733f',
    hazeOpacity: 0.4,
    hill: '#35253c',
    hillRim: '#e8794a',
    hillShade: '#261a2e',
    hillsFar: '#301d37',
    hillsLow: '#160c1c',
    hillsNear: '#22142a',
    mist: '#f78d5a',
    mistOpacity: 0.18,
    moon: false,
    mountainFar: '#5e3454',
    mountainFarShade: '#482642',
    mountainNear: '#3e2340',
    mountainNearShade: '#2e1933',
    path: '#70494b',
    pineFar: '#26172e',
    pineLow: '#110916',
    pineNear: '#1a0f21',
    sky: ['#170f2c', '#43193f', '#9a2f47', '#e5633a', '#f9a94e'],
    snow: '#f5a78d',
    snowShade: '#b0677a',
    stars: false,
    sun: '#ffb961',
    sunRadius: 50,
    sunX: 940,
    sunY: 344,
    tint: '#2b1530',
    tintAmount: 0.56,
    torches: true,
    window: '#ffc35a',
    windowGlow: 0.75,
  },
  // Calm night: the battle is over
  finished: {
    cloud: '#2f4f7e',
    cloudOpacity: 0.55,
    cloudStyle: 'streak',
    embers: true,
    fireScale: 0.75,
    foreground: '#050b16',
    glow: '#9cc0ee',
    glowOpacity: 0.5,
    haze: '#3f668e',
    hazeOpacity: 0.4,
    hill: '#18344c',
    hillRim: '#668db6',
    hillShade: '#10263a',
    hillsFar: '#142d46',
    hillsLow: '#091726',
    hillsNear: '#0e2237',
    mist: '#a9c8ee',
    mistOpacity: 0.13,
    moon: true,
    mountainFar: '#2b456c',
    mountainFarShade: '#203759',
    mountainNear: '#1c3253',
    mountainNearShade: '#152744',
    path: '#3f5873',
    pineFar: '#0f253c',
    pineLow: '#07121f',
    pineNear: '#0b1b2e',
    sky: ['#060d22', '#0c1b3a', '#17305a', '#24466c', '#33597b'],
    snow: '#d2def1',
    snowShade: '#8fa6c9',
    stars: true,
    sun: '#f4f2e2',
    sunRadius: 32,
    sunX: 1015,
    sunY: 214,
    tint: '#0b1a33',
    tintAmount: 0.58,
    torches: false,
    window: '#ffc86a',
    windowGlow: 0.8,
  },
};

const channels = (hex: string) => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
const mix = (from: string, to: string, amount: number) => {
  const target = channels(to);
  return `#${channels(from)
    .map((channel, index) =>
      Math.round(channel + (target[index] - channel) * amount)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
};
const round = (value: number) => Math.round(value * 10) / 10;
// Small deterministic generator so the forests and stars are identical on every render
const seeded = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

const pine = (x: number, y: number, height: number) => {
  const width = height * 0.36;
  const point = (dx: number, dy: number) => `${round(x + dx * width)},${round(y - dy * height)}`;
  const right = `M${point(0, 1)}L${point(0.5, 0.62)}L${point(0.24, 0.62)}L${point(0.78, 0.33)}L${point(0.4, 0.33)}L${point(1, 0.07)}`;
  return {
    full: `${right}L${point(0.12, 0.07)}L${point(0.12, 0)}L${point(-0.12, 0)}L${point(-0.12, 0.07)}L${point(-1, 0.07)}L${point(-0.4, 0.33)}L${point(-0.78, 0.33)}L${point(-0.24, 0.62)}L${point(-0.5, 0.62)}Z`,
    shade: `${right}L${point(0, 0.07)}Z`,
  };
};

const forest = (
  seed: number,
  count: number,
  from: number,
  to: number,
  ground: (x: number) => number,
  smallest: number,
  tallest: number,
) => {
  const random = seeded(seed);
  return Array.from({length: count}, () => {
    const x = from + random() * (to - from);
    return pine(x, ground(x) + 3 + random() * 9, smallest + random() * (tallest - smallest)).full;
  }).join('');
};

const ridge = (ground: (x: number) => number) =>
  `M0,${HEIGHT}${Array.from({length: WIDTH / 20 + 1}, (_, index) => `L${index * 20},${round(ground(index * 20))}`).join('')}L${WIDTH},${HEIGHT}Z`;

const farHills = (x: number) => 448 + 16 * Math.sin(x / 240 + 1.2) + 7 * Math.sin(x / 95 + 0.4);
const nearHills = (x: number) => 482 + 20 * Math.sin(x / 200 + 3.6) + 9 * Math.sin(x / 70 + 1.3);
// The low hills roll in from the left and sink below the frame before they reach the settlement
const lowHills = (x: number) =>
  528 + 16 * Math.sin(x / 170 + 5.1) + 6 * Math.sin(x / 50 + 2) + Math.max(0, x - 620) * 0.22;
const frontGround = (x: number) => 570 + 10 * Math.sin(x / 260 + 0.5) + 4 * Math.sin(x / 60);

const FAR_HILLS = ridge(farHills);
const FAR_FOREST = forest(11, 70, 0, WIDTH, farHills, 16, 30);
const NEAR_HILLS = ridge(nearHills);
const NEAR_FOREST = forest(23, 60, 0, 1000, nearHills, 24, 44);
const NEAR_FOREST_RIGHT = forest(29, 10, 1420, WIDTH, nearHills, 24, 40);
const LOW_HILLS = ridge(lowHills);
const LOW_FOREST = forest(37, 34, 0, 860, lowHills, 38, 70);
const FRONT_GROUND = ridge(frontGround);
const FRONT_PINES = [
  pine(34, 660, 400),
  pine(128, 668, 320),
  pine(212, 650, 236),
  pine(1588, 664, 360),
  pine(1512, 668, 268),
]
  .map((tree) => tree.full)
  .join('');

interface Peak {
  left: number;
  right: number;
  snow?: boolean;
  top: number;
  x: number;
}

const peak = ({left, right, snow, top, x}: Peak, base: number) => {
  const height = base - top;
  const point = (dx: number, dy: number) =>
    `${round(x + (dx < 0 ? dx * left : dx * right))},${round(top + dy * height)}`;
  return {
    body: `M${point(-1, 1)}L${point(-0.62, 0.56)}L${point(-0.5, 0.5)}L${point(-0.22, 0.2)}L${point(0, 0)}L${point(0.3, 0.26)}L${point(0.42, 0.3)}L${point(1, 1)}Z`,
    shade: `M${point(0, 0)}L${point(0.3, 0.26)}L${point(0.42, 0.3)}L${point(1, 1)}L${point(0.12, 1)}L${point(-0.03, 0.55)}L${point(0.06, 0.3)}Z`,
    snow: snow
      ? `M${point(0, 0)}L${point(-0.22, 0.2)}L${point(-0.313, 0.3)}L${point(-0.2, 0.27)}L${point(-0.12, 0.36)}L${point(-0.02, 0.26)}L${point(0.1, 0.37)}L${point(0.2, 0.28)}L${point(0.3, 0.35)}L${point(0.42, 0.3)}L${point(0.3, 0.26)}Z`
      : '',
    snowShade: snow
      ? `M${point(0, 0)}L${point(0.3, 0.26)}L${point(0.42, 0.3)}L${point(0.3, 0.35)}L${point(0.2, 0.28)}L${point(0.1, 0.37)}L${point(0.06, 0.3)}Z`
      : '',
  };
};

const FAR_PEAKS = [
  {left: 150, right: 170, top: 304, x: 120},
  {left: 160, right: 170, top: 296, x: 560},
  {left: 170, right: 180, top: 284, x: 1010},
  {left: 170, right: 190, snow: true, top: 262, x: 330},
  {left: 190, right: 210, snow: true, top: 242, x: 760},
  {left: 180, right: 200, snow: true, top: 268, x: 1480},
  {left: 200, right: 220, snow: true, top: 226, x: 1230},
].map((entry) => peak(entry, 446));
const NEAR_PEAKS = [
  {left: 140, right: 160, top: 352, x: 30},
  {left: 130, right: 150, top: 376, x: 240},
  {left: 150, right: 160, top: 344, x: 470},
  {left: 130, right: 150, top: 370, x: 680},
  {left: 150, right: 160, top: 350, x: 900},
  {left: 140, right: 150, top: 366, x: 1120},
  {left: 160, right: 170, top: 342, x: 1360},
  {left: 130, right: 140, top: 360, x: 1560},
].map((entry) => peak(entry, 456));

const STARS = (() => {
  const random = seeded(5);
  return Array.from({length: 54}, () => ({
    radius: round(0.7 + random() * 1.3),
    x: round(random() * WIDTH),
    y: round(8 + random() * 300),
  }));
})();

const CLOUD_SHAPES = {
  puffy: [
    'M14,44C-4,44 -4,26 14,25C14,10 38,4 50,17C60,-2 96,-2 104,16C122,8 144,18 140,30C158,28 170,44 152,44Z',
    'M10,34C-4,34 -2,18 12,19C16,4 44,2 50,14C62,4 86,10 84,22C98,20 106,34 92,34Z',
  ],
  streak: [
    'M0,7C50,-2 130,-2 210,3C270,0 330,4 380,8C310,12 230,13 170,11C110,14 40,13 0,7Z',
    'M0,5C40,0 90,-1 150,2C190,0 230,3 260,6C210,9 160,10 120,8C80,11 30,10 0,5Z',
  ],
};
const CLOUDS = {
  puffy: [
    {duration: 200, scale: 1.1, shape: 0, x: 110, y: 168},
    {duration: 160, scale: 0.7, shape: 1, x: 500, y: 226},
    {duration: 220, scale: 0.9, shape: 0, x: 800, y: 150},
    {duration: 180, scale: 0.8, shape: 1, x: 1250, y: 196},
    {duration: 240, scale: 1, shape: 0, x: 1400, y: 128},
  ],
  streak: [
    {duration: 260, scale: 1.2, shape: 0, x: 40, y: 246},
    {duration: 200, scale: 1, shape: 1, x: 430, y: 188},
    {duration: 280, scale: 1.3, shape: 0, x: 720, y: 268},
    {duration: 220, scale: 1, shape: 1, x: 1160, y: 196},
    {duration: 300, scale: 1.1, shape: 0, x: 1290, y: 150},
  ],
};

// Ground line under the palisade: the hilltop is very slightly domed
const wallBase = (x: number) => 446 + 0.00011 * (x - 1180) ** 2;
const PALISADE = (() => {
  const random = seeded(7);
  const logs = ['', ''];
  Array.from({length: 29}, (_, index) => 1012 + index * 11).forEach((x, index) => {
    if (x > 1136 && x < 1196) return;
    const base = wallBase(x) + 8;
    const top = wallBase(x) - 38 - random() * 7;
    logs[index % 2] +=
      `M${x},${round(base)}L${x},${round(top + 7)}L${x + 5.5},${round(top)}L${x + 11},${round(top + 7)}L${x + 11},${round(base)}Z`;
  });
  const beam = (from: number, to: number) => {
    const xs = Array.from({length: Math.ceil((to - from) / 16) + 1}, (_, index) => Math.min(to, from + index * 16));
    const upper = xs.map((x) => `${x},${round(wallBase(x) - 22)}`);
    const lower = [...xs].reverse().map((x) => `${x},${round(wallBase(x) - 17)}`);
    return `M${[...upper, ...lower].join('L')}Z`;
  };
  return {beams: beam(1012, 1144) + beam(1198, 1331), dark: logs[0], light: logs[1]};
})();

const TORCHES = [1040, 1095, 1148, 1192, 1246, 1306];

const drift = keyframes`
  from {
    transform: translateX(var(--from));
  }

  to {
    transform: translateX(var(--to));
  }
`;

const breathe = keyframes`
  0%,
  100% {
    opacity: 0.82;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.07);
  }
`;

const flap = keyframes`
  0%,
  100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(0.35);
  }
`;

const flicker = keyframes`
  0%,
  100% {
    transform: scale(1, 1) skewX(0deg);
  }

  25% {
    transform: scale(0.92, 1.12) skewX(-3deg);
  }

  50% {
    transform: scale(1.06, 0.94) skewX(2deg);
  }

  75% {
    transform: scale(0.96, 1.08) skewX(4deg);
  }
`;

const glide = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }

  8%,
  90% {
    opacity: 0.75;
  }

  100% {
    opacity: 0;
    transform: translate(780px, -64px);
  }
`;

const rise = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.6);
  }

  18% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
    transform: translate(18px, -96px) scale(2.1);
  }
`;

const spark = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }

  15% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translate(var(--sway), -84px);
  }
`;

const sway = keyframes`
  from {
    transform: translateX(-44px);
  }

  to {
    transform: translateX(44px);
  }
`;

const twinkle = keyframes`
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.28;
  }
`;

const wave = keyframes`
  0%,
  100% {
    transform: skewY(-5deg) scaleX(1);
  }

  50% {
    transform: skewY(6deg) scaleX(0.92);
  }
`;

const still = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Bird = styled.path`
  animation: ${flap} 1.1s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
  ${still};
`;

const Canvas = styled.svg`
  --focus: 0.72;
  --scene-width: max(100cqw, 266.667cqh);
  bottom: 0;
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;

  /* Cover the hero like a background image, but keep the settlement (x = 1170 of 1600) at --focus across the width */
  @supports (width: 1cqw) {
    height: calc(var(--scene-width) * 0.375);
    left: clamp(100cqw - var(--scene-width), var(--focus) * 100cqw - 0.73125 * var(--scene-width), 0px);
    width: var(--scene-width);
  }

  /* Narrow heroes carry their text on top: draw the scene smaller, in the lower part, with the settlement centered */
  @container (max-width: 720px) {
    --focus: 0.5;
    --scene-width: max(100cqw, 200cqh);
  }
`;

const Cloud = styled.g`
  animation: ${drift} linear infinite;
  ${still};
`;

const Flag = styled.g`
  animation: ${wave} 3.4s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: left center;
  ${still};
`;

const Flame = styled.path`
  animation: ${flicker} 0.9s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center bottom;
  ${still};
`;

const Flock = styled.g`
  animation: ${glide} 52s linear infinite;
  opacity: 0.75;
  ${still};
`;

const Halo = styled.circle`
  animation: ${breathe} 7s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
  ${still};
`;

const Mist = styled.ellipse`
  animation: ${sway} 38s ease-in-out infinite alternate;
  ${still};
`;

const Puff = styled.circle`
  animation: ${rise} 7s ease-out infinite;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.4;
  }
`;

const Scene = styled.div`
  container-type: size;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
`;

const Spark = styled.circle`
  animation: ${spark} 3.6s ease-out infinite;
  opacity: 0;
  ${still};
`;

const Stars = styled.g`
  animation: ${twinkle} 4.5s ease-in-out infinite;
  ${still};
`;

const FLAME = 'M0,0C-11,-9 -10,-24 0,-40C10,-24 11,-9 0,0Z';

const Banner = ({base, color, tint, top, x}: {base: number; color: string; tint: string; top: number; x: number}) => (
  <g>
    <rect fill={tint} height={base - top} width={3} x={x - 1.5} y={top} />
    <circle cx={x} cy={top} fill={palette.goldBright} r={3} />
    <g transform={`translate(${x + 1.5},${top + 5})`}>
      <Flag style={{animationDelay: `${-(x % 7) * 0.4}s`}}>
        <path d="M0,0L48,3L37,13.5L48,24L0,27Z" fill={color} />
        <path d="M0,0L9,0.6L9,26.4L0,27Z" fill={mix(color, '#000000', 0.22)} />
        <path d="M9,10L40,11.4L37,13.5L40,15.6L9,17Z" fill={mix(color, '#ffffff', 0.38)} />
      </Flag>
    </g>
  </g>
);

const Fire = ({glow, scale, x, y}: {glow: string; scale: number; x: number; y: number}) => (
  <g transform={`translate(${x},${y})`}>
    <ellipse cx={0} cy={3} fill={glow} rx={78 * scale} ry={24 * scale} />
    <g transform={`scale(${scale})`}>
      <g transform="scale(1.05)">
        <Flame d={FLAME} fill={palette.ember} style={{animationDuration: '1.1s'}} />
      </g>
      <g transform="scale(0.72)">
        <Flame d={FLAME} fill={palette.gold} style={{animationDelay: '-0.3s'}} />
      </g>
      <g transform="scale(0.4)">
        <Flame d={FLAME} fill="#fff1c2" style={{animationDelay: '-0.6s', animationDuration: '0.7s'}} />
      </g>
    </g>
  </g>
);

const Hut = ({
  crest,
  eave,
  glow,
  half,
  roof,
  roofShade,
  top,
  wall,
  wallShade,
  window: light,
  x,
}: {
  crest?: string;
  eave: number;
  glow: string;
  half: number;
  roof: string;
  roofShade: string;
  top: number;
  wall: string;
  wallShade: string;
  window: string;
  x: number;
}) => {
  const lamp = top + (eave - top) * 0.66;
  const radius = half * 0.13;
  return (
    <g>
      <rect fill={wallShade} height={38} width={(half - 12) * 2} x={x - half + 12} y={eave} />
      <path d={`M${x},${top + 12}L${x - half + 8},${eave + 5}L${x + half - 8},${eave + 5}Z`} fill={wall} />
      <path d={`M${x},${top + 12}L${x + half - 8},${eave + 5}L${x},${eave + 5}Z`} fill={wallShade} />
      <circle cx={x} cy={lamp} fill={glow} r={radius * 4.2} />
      <circle cx={x} cy={lamp} fill={light} r={radius} />
      <path d={`M${x},${top}L${x - half - 5},${eave}L${x - half + 7},${eave + 7}L${x},${top + 15}Z`} fill={roof} />
      <path d={`M${x},${top}L${x + half + 5},${eave}L${x + half - 7},${eave + 7}L${x},${top + 15}Z`} fill={roofShade} />
      {crest && (
        <path
          d={`M${x - 3},${top + 6}L${x + 13},${top - 16}L${x + 17},${top - 13}L${x + 3},${top + 8}ZM${x + 3},${top + 6}L${x - 13},${top - 16}L${x - 17},${top - 13}L${x - 3},${top + 8}Z`}
          fill={crest}
        />
      )}
    </g>
  );
};

const Tent = ({cloth, dark, shade, x, y}: {cloth: string; dark: string; shade: string; x: number; y: number}) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M0,-28L16,0L37,-5L21,-30Z" fill={shade} />
    <path d="M-16,0L0,-28L16,0Z" fill={cloth} />
    <path d="M-5,0L0,-13L5,0Z" fill={dark} />
  </g>
);

const HeroScene = ({phase}: {phase: HeroPhase}) => {
  const id = `tribes-hero-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const mood = MOODS[phase];
  const shade = (color: string, amount = 1) => mix(color, mood.tint, mood.tintAmount * amount);
  const cloth = shade(art.cloth);
  const clothShade = shade(mix(art.cloth, art.wood, 0.3));
  const dark = shade('#2a1a10');
  const smoke = shade('#ffffff', 0.8);
  const thatch = shade('#c79a45');
  const thatchShade = shade('#9c7430');
  const wood = shade(art.wood);
  const woodDark = shade(art.woodDark);
  const woodLight = shade(art.woodLight);
  const fireGlow = `url(#${id}-fire)`;
  const hut = {
    glow: fireGlow,
    roof: thatch,
    roofShade: thatchShade,
    wall: woodLight,
    wallShade: wood,
    window: mood.window,
  };

  const renderPeaks = (peaks: typeof FAR_PEAKS, lit: string, dim: string) =>
    peaks.map((entry, index) => (
      <g key={index}>
        <path d={entry.body} fill={lit} />
        <path d={entry.shade} fill={dim} />
        {entry.snow && <path d={entry.snow} fill={mood.snow} />}
        {entry.snowShade && <path d={entry.snowShade} fill={mood.snowShade} />}
      </g>
    ));

  return (
    <Scene aria-hidden="true" style={{background: mood.sky[0]}}>
      <Canvas
        preserveAspectRatio="xMaxYMax slice"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
            {/* The extra stop eases the sky in, so no edge shows where it meets the flat color above a short scene */}
            <stop offset="0" stopColor={mood.sky[0]} />
            <stop offset="0.14" stopColor={mix(mood.sky[0], mood.sky[1], 0.26)} />
            {mood.sky.slice(1).map((color, index) => (
              <stop key={color} offset={SKY_STOPS[index + 1]} stopColor={color} />
            ))}
          </linearGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor={mood.glow} stopOpacity={mood.glowOpacity} />
            <stop offset="0.45" stopColor={mood.glow} stopOpacity={mood.glowOpacity * 0.32} />
            <stop offset="1" stopColor={mood.glow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-fire`}>
            <stop offset="0" stopColor={mood.window} stopOpacity={0.25 + mood.windowGlow * 0.45} />
            <stop offset="1" stopColor={mood.window} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-smoke`}>
            <stop offset="0" stopColor={smoke} stopOpacity="0.9" />
            <stop offset="0.55" stopColor={smoke} stopOpacity="0.5" />
            <stop offset="1" stopColor={smoke} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-mist`}>
            <stop offset="0" stopColor={mood.mist} stopOpacity={mood.mistOpacity} />
            <stop offset="1" stopColor={mood.mist} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-haze`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={mood.haze} stopOpacity="0" />
            <stop offset="1" stopColor={mood.haze} stopOpacity={mood.hazeOpacity} />
          </linearGradient>
        </defs>

        <rect fill={`url(#${id}-sky)`} height={HEIGHT} width={WIDTH} />
        {mood.stars &&
          [0, 1, 2].map((group) => (
            <Stars key={group} style={{animationDelay: `${-group * 1.5}s`}}>
              {STARS.filter((_, index) => index % 3 === group).map((star) => (
                <circle cx={star.x} cy={star.y} fill="#eaf1ff" key={`${star.x}-${star.y}`} r={star.radius} />
              ))}
            </Stars>
          ))}
        <ellipse cx={mood.sunX} cy={430} fill={`url(#${id}-glow)`} rx={820} ry={250} />
        <Halo cx={mood.sunX} cy={mood.sunY} fill={`url(#${id}-glow)`} r={mood.sunRadius * 4.6} />
        <circle cx={mood.sunX} cy={mood.sunY} fill={mood.sun} r={mood.sunRadius} />
        {mood.moon && (
          <g fill={mix(mood.sun, mood.sky[2], 0.28)}>
            <circle cx={mood.sunX - 10} cy={mood.sunY - 8} r={7} />
            <circle cx={mood.sunX + 11} cy={mood.sunY + 5} r={5} />
            <circle cx={mood.sunX - 3} cy={mood.sunY + 14} r={3.5} />
          </g>
        )}
        {CLOUDS[mood.cloudStyle].map((cloud) => {
          const from = -(cloud.x + 520);
          const to = WIDTH - cloud.x + 80;
          return (
            <Cloud
              key={cloud.x}
              style={
                {
                  '--from': `${from}px`,
                  '--to': `${to}px`,
                  animationDelay: `${round((cloud.duration * from) / (to - from))}s`,
                  animationDuration: `${cloud.duration}s`,
                } as CSSProperties
              }
            >
              <path
                d={CLOUD_SHAPES[mood.cloudStyle][cloud.shape]}
                fill={mood.cloud}
                opacity={mood.cloudOpacity}
                transform={`translate(${cloud.x},${cloud.y}) scale(${cloud.scale})`}
              />
            </Cloud>
          );
        })}

        {renderPeaks(FAR_PEAKS, mood.mountainFar, mood.mountainFarShade)}
        <rect fill={`url(#${id}-haze)`} height={130} width={WIDTH} y={330} />
        {renderPeaks(NEAR_PEAKS, mood.mountainNear, mood.mountainNearShade)}
        <rect fill={`url(#${id}-haze)`} height={90} opacity={0.7} width={WIDTH} y={380} />

        {!mood.stars && (
          <g transform="translate(620,236)">
            <Flock fill={mood.foreground}>
              <Bird d="M-10,0Q-5,-7 0,-1Q5,-7 10,0Q5,-4 0,2Q-5,-4 -10,0Z" />
              <g transform="translate(34,-16)">
                <Bird d="M-8,0Q-4,-6 0,-1Q4,-6 8,0Q4,-3 0,2Q-4,-3 -8,0Z" style={{animationDelay: '-0.4s'}} />
              </g>
              <g transform="translate(-30,-22)">
                <Bird d="M-7,0Q-3.5,-5 0,-1Q3.5,-5 7,0Q3.5,-3 0,1.5Q-3.5,-3 -7,0Z" style={{animationDelay: '-0.7s'}} />
              </g>
            </Flock>
          </g>
        )}

        <path d={FAR_HILLS} fill={mood.hillsFar} />
        <path d={FAR_FOREST} fill={mood.pineFar} />
        <Mist cx={380} cy={474} fill={`url(#${id}-mist)`} rx={520} ry={40} />
        <path d={NEAR_HILLS} fill={mood.hillsNear} />
        <path d={NEAR_FOREST + NEAR_FOREST_RIGHT} fill={mood.pineNear} />
        <Mist
          cx={1020}
          cy={500}
          fill={`url(#${id}-mist)`}
          rx={620}
          ry={46}
          style={{animationDelay: '-14s', animationDuration: '46s'}}
        />

        {/* The settlement hill */}
        <path
          d="M700,600C820,548 900,470 1020,449C1100,437 1260,435 1340,447C1440,463 1540,498 1600,512L1600,600Z"
          fill={mood.hill}
        />
        <path
          d="M1340,447C1440,463 1540,498 1600,512L1600,600L1150,600C1250,566 1318,508 1340,447Z"
          fill={mood.hillShade}
        />
        <path
          d="M700,600C820,548 900,470 1020,449C1100,437 1260,435 1340,447C1260,441 1108,444 1030,459C915,482 836,549 722,600Z"
          fill={mood.hillRim}
          opacity={0.75}
        />
        <path
          d="M1160,452C1152,476 1112,492 1062,506C1002,523 962,560 932,600L982,600C1004,566 1034,536 1088,518C1138,501 1172,484 1180,452Z"
          fill={mood.path}
        />
        {[
          pine(868, 536, 84),
          pine(912, 510, 66),
          pine(952, 488, 56),
          pine(1396, 474, 82),
          pine(1444, 490, 100),
          pine(1502, 504, 86),
          pine(1554, 520, 104),
        ].map((tree, index) => (
          <g key={index}>
            <path d={tree.full} fill={mood.pineNear} />
            <path d={tree.shade} fill={mood.pineLow} />
          </g>
        ))}

        {/* Buildings stand behind the palisade */}
        <Banner base={452} color={shade(palette.ember, 0.3)} tint={woodDark} top={318} x={1034} />
        <Hut {...hut} eave={410} half={26} top={382} x={1110} />
        <Hut {...hut} eave={412} half={38} top={366} x={1064} />
        <Hut {...hut} eave={412} half={34} top={372} x={1256} />
        <Banner base={340} color={shade(palette.gold, 0.3)} tint={woodDark} top={274} x={1170} />
        <Hut {...hut} crest={woodDark} eave={406} half={60} top={336} x={1170} />
        <Banner base={282} color={shade(palette.sky, 0.3)} tint={woodDark} top={238} x={1300} />
        <g>
          <path d="M1281,452L1288,452L1294,346L1289,346Z" fill={wood} />
          <path d="M1312,452L1319,452L1311,346L1306,346Z" fill={woodDark} />
          <path d="M1286,432L1309,384L1312,386L1289,434ZM1314,432L1291,384L1288,386L1311,434Z" fill={woodDark} />
          <rect fill={woodDark} height={9} width={46} x={1277} y={340} />
          <rect fill={woodLight} height={18} width={40} x={1280} y={322} />
          <rect fill={dark} height={14} width={22} x={1289} y={308} />
          <circle cx={1300} cy={316} fill={fireGlow} r={22} />
          <rect fill={mood.window} height={9} rx={2} width={8} x={1296} y={312} />
          <rect fill={wood} height={34} width={4} x={1281} y={300} />
          <rect fill={woodDark} height={34} width={4} x={1315} y={300} />
          <path d="M1300,278L1270,304L1300,304Z" fill={thatch} />
          <path d="M1300,278L1330,304L1300,304Z" fill={thatchShade} />
        </g>

        {/* Smoke from the roofs */}
        {[0, 1, 2].map((index) => (
          <Puff
            cx={1090 + index * 2}
            cy={370}
            fill={`url(#${id}-smoke)`}
            key={`hall-${index}`}
            r={8}
            style={{animationDelay: `${-index * 2.3}s`}}
          />
        ))}
        {[0, 1].map((index) => (
          <Puff
            cx={1238}
            cy={372}
            fill={`url(#${id}-smoke)`}
            key={`hut-${index}`}
            r={7}
            style={{animationDelay: `${-1.2 - index * 3.4}s`}}
          />
        ))}

        {/* Palisade and gate */}
        <ellipse cx={1172} cy={457} fill={mood.hillShade} opacity={0.5} rx={176} ry={7} />
        <path d={PALISADE.dark} fill={wood} />
        <path d={PALISADE.light} fill={woodLight} />
        <path d={PALISADE.beams} fill={woodDark} />
        <rect fill={dark} height={60} width={34} x={1153} y={396} />
        <ellipse cx={1170} cy={458} fill={fireGlow} rx={40} ry={13} />
        <path
          d="M1141,456L1141,392L1147.5,384L1154,392L1154,456ZM1186,456L1186,392L1192.5,384L1199,392L1199,456Z"
          fill={woodDark}
        />
        <rect fill={woodDark} height={8} width={66} x={1137} y={394} />
        {[
          [1124, palette.ember],
          [1216, palette.sky],
        ].map(([x, color]) => (
          <g key={x}>
            <circle cx={x} cy={wallBase(Number(x)) - 30} fill={shade(String(color), 0.3)} r={6.5} />
            <circle cx={x} cy={wallBase(Number(x)) - 30} fill={shade(palette.goldBright, 0.3)} r={2.2} />
          </g>
        ))}
        {mood.torches &&
          TORCHES.map((x) => {
            const top = wallBase(x) - 48;
            return (
              <g key={x}>
                <rect fill={woodDark} height={16} width={3} x={x - 1.5} y={top - 12} />
                <circle cx={x} cy={top - 18} fill={fireGlow} r={24} />
                <g transform={`translate(${x},${top - 11}) scale(0.34)`}>
                  <Flame d={FLAME} fill={palette.ember} style={{animationDelay: `${-(x % 5) * 0.2}s`}} />
                  <g transform="scale(0.6)">
                    <Flame d={FLAME} fill={palette.goldBright} style={{animationDelay: `${-(x % 3) * 0.3}s`}} />
                  </g>
                </g>
              </g>
            );
          })}

        {/* Camp outside the gate */}
        <Tent cloth={cloth} dark={dark} shade={clothShade} x={1306} y={502} />
        <Tent cloth={cloth} dark={dark} shade={clothShade} x={1362} y={516} />
        <ellipse cx={1232} cy={499} fill={mood.hillShade} opacity={0.55} rx={26} ry={6} />
        <path d="M1212,498L1250,490L1252,495L1214,503ZM1252,498L1214,490L1212,495L1250,503Z" fill={dark} />
        <Fire glow={fireGlow} scale={mood.fireScale} x={1232} y={496} />
        {[0, 1, 2].map((index) => (
          <Puff
            cx={1232 + index * 3}
            cy={458}
            fill={`url(#${id}-smoke)`}
            key={`fire-${index}`}
            r={7}
            style={{animationDelay: `${-0.6 - index * 2.2}s`}}
          />
        ))}
        {mood.embers &&
          [0, 1, 2, 3, 4].map((index) => (
            <Spark
              cx={1224 + index * 4}
              cy={470}
              fill={palette.goldBright}
              key={index}
              r={1.6}
              style={{'--sway': `${(index - 2) * 9}px`, animationDelay: `${-index * 0.7}s`} as CSSProperties}
            />
          ))}

        <path d={LOW_HILLS} fill={mood.hillsLow} />
        <path d={LOW_FOREST} fill={mood.pineLow} />
        <path d={FRONT_GROUND} fill={mood.foreground} />
        <path d={FRONT_PINES} fill={mood.foreground} />
      </Canvas>
    </Scene>
  );
};

export default HeroScene;
