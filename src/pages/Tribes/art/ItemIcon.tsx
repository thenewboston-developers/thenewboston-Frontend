import {ReactNode} from 'react';

import {art, palette} from '../theme';

// Extra shades used only by the icons
const BARN = palette.ember;
const BARN_DARK = palette.emberDeep;
const CLOTH_SHADE = '#d6cab0';
const COAL_BRIGHT = '#7a838c';
const COAL_MID = '#5a626a';
const COAL_SHADE = '#363b40';
const CRUST = '#b47a30';
const CRUST_DARK = '#93601f';
const FIRE = '#f39a35';
const FIRE_BRIGHT = '#ffd66e';
const GRASS = '#93c672';
const HOLLOW = '#3a2616';
const ORE_LIGHT = '#e79c5f';
const ROCK = '#5f6c74';
const ROCK_DARK = '#48545c';
const ROCK_LIGHT = '#7d8b92';
const ROOF = '#55707f';
const ROOF_DARK = '#3f5766';
const SKIN = '#e6b98f';

const crate = (x: number, y: number, size: number) => (
  <g>
    <rect fill={art.woodCut} height={size} rx={size * 0.08} width={size} x={x} y={y} />
    <path
      d={`M${x + size * 0.16} ${y + size * 0.16}L${x + size * 0.84} ${y + size * 0.84}M${x + size * 0.84} ${
        y + size * 0.16
      }L${x + size * 0.16} ${y + size * 0.84}`}
      stroke={art.woodLight}
      strokeWidth={size * 0.12}
    />
    <rect
      fill="none"
      height={size * 0.88}
      rx={size * 0.05}
      stroke={art.wood}
      strokeWidth={size * 0.12}
      width={size * 0.88}
      x={x + size * 0.06}
      y={y + size * 0.06}
    />
    <rect fill={art.woodLight} height={size * 0.07} opacity="0.7" width={size * 0.76} x={x + size * 0.12} y={y} />
  </g>
);

const ground = (rx = 16, cx = 24, cy = 41.4) => <ellipse cx={cx} cy={cy} fill={art.shadow} rx={rx} ry="2.8" />;

const ingot = (x: number, y: number) => (
  <g>
    <path d={`M${x} ${y + 10}L${x + 2.8} ${y + 2}H${x + 15.2}L${x + 18} ${y + 10}Z`} fill={art.iron} />
    <path d={`M${x + 2.8} ${y + 2}L${x + 7} ${y - 2}H${x + 19.4}L${x + 15.2} ${y + 2}Z`} fill={art.ironLight} />
    <path
      d={`M${x + 15.2} ${y + 2}L${x + 19.4} ${y - 2}L${x + 22.2} ${y + 6}L${x + 18} ${y + 10}Z`}
      fill={art.ironDark}
    />
    <path d={`M${x + 3.6} ${y + 5.2}H${x + 12}`} opacity="0.6" stroke={art.ironLight} strokeLinecap="round" />
  </g>
);

const log = (cx: number, cy: number) => (
  <g>
    <circle cx={cx} cy={cy} fill={art.woodDark} r="7.6" />
    <circle cx={cx} cy={cy} fill={art.woodCut} r="5.8" />
    <circle cx={cx} cy={cy} fill="none" r="3.1" stroke={art.woodLight} strokeWidth="1.3" />
    <circle cx={cx} cy={cy} fill={art.woodLight} r="1" />
  </g>
);

const logBody = (cx: number, cy: number) => (
  <g>
    <path d={`M${cx} ${cy}l-8 -5`} stroke={art.wood} strokeLinecap="round" strokeWidth="15.2" />
    <path
      d={`M${cx - 3.2} ${cy - 6.6}l-7.4 -4.6`}
      opacity="0.55"
      stroke={art.woodLight}
      strokeLinecap="round"
      strokeWidth="2"
    />
  </g>
);

const pine = (x: number, y: number, height: number) => {
  const half = height * 0.4;
  return (
    <g>
      <rect fill={art.woodDark} height={height * 0.22} rx="1" width="3" x={x - 1.5} y={y - height * 0.22} />
      <path
        d={`M${x} ${y - height * 0.66}L${x + half} ${y - height * 0.16}H${x - half}Z`}
        fill={art.foliageDark}
        strokeLinejoin="round"
      />
      <path
        d={`M${x} ${y - height * 0.85}L${x + half * 0.8} ${y - height * 0.4}H${x - half * 0.8}Z`}
        fill={art.foliage}
      />
      <path
        d={`M${x} ${y - height}L${x + half * 0.58} ${y - height * 0.62}H${x - half * 0.58}Z`}
        fill={art.foliageLight}
      />
    </g>
  );
};

const plank = (x: number, y: number) => (
  <g>
    <rect fill={art.woodLight} height="8" rx="1.5" width="34" x={x} y={y} />
    <rect fill={art.wood} height="2.2" opacity="0.5" rx="1" width="28" x={x} y={y + 5.8} />
    <rect fill={art.woodCut} height="2.4" rx="1.2" width="34" x={x} y={y} />
    <rect fill={art.woodCut} height="8" rx="1.5" width="7" x={x + 27} y={y} />
    <path d={`M${x + 29.4} ${y + 2.6}v3M${x + 31.8} ${y + 2.6}v3`} stroke={art.wood} strokeLinecap="round" />
  </g>
);

const stake = (x: number, rotation: number) => (
  <g transform={`translate(${x} 41) rotate(${rotation})`}>
    <rect fill={art.wood} height="24" rx="1" width="5" x="-2.5" y="-24" />
    <rect fill={art.woodLight} height="24" opacity="0.6" rx="0.8" width="1.7" x="-2.5" y="-24" />
    <path d="M-2.5 -23.6L0 -31.5L2.5 -23.6Z" fill={art.woodCut} />
  </g>
);

const wheatHead = (cx: number, cy: number, rotation: number) => (
  <g transform={`rotate(${rotation} ${cx} ${cy})`}>
    <ellipse cx={cx} cy={cy} fill={art.wheat} rx="3.3" ry="7.2" />
    <path d={`M${cx} ${cy - 6}v12`} stroke={art.wheatDark} strokeLinecap="round" strokeWidth="1.1" />
    <ellipse cx={cx - 1.5} cy={cy - 1.5} fill={art.wheatLight} opacity="0.75" rx="0.9" ry="3.6" />
  </g>
);

const ART: Record<string, ReactNode> = {
  animal_hide: (
    <>
      <path
        d="M24 5.5c2.6 0 3.6 2.8 5.8 4L38.5 6.5l-1 8.5c-.6 3-1.9 5.2-1.9 8.4 0 4 2 7 6.4 10.8l-5.4 6.3-5-3.9C29.4 39 27 42 24 42s-5.4-3-7.6-5.4l-5 3.9L6 34.2c4.4-3.8 6.4-6.8 6.4-10.8 0-3.2-1.3-5.4-1.9-8.4l-1-8.5L18.2 9.5c2.2-1.2 3.2-4 5.8-4z"
        fill={art.hideDark}
      />
      <path
        d="M24 8.6c1.7 0 2.6 2.4 5 3.7l6.1-2.1-.6 5.2c-.6 2.8-1.9 5-1.9 8.2 0 4.2 1.9 7.3 5.3 10.4l-2.4 2.8-4.3-3.4C29.2 36 27 38.8 24 38.8S18.8 36 16.8 33.4l-4.3 3.4-2.4-2.8c3.4-3.1 5.3-6.2 5.3-10.4 0-3.2-1.3-5.4-1.9-8.2l-.6-5.2 6.1 2.1c2.4-1.3 3.3-3.7 5-3.7z"
        fill={art.hide}
      />
      <path d="M24 14c3 0 5.2 3.6 5.2 9S27 33.5 24 33.5 18.8 28.4 18.8 23 21 14 24 14z" fill={art.hideLight} />
    </>
  ),
  axe: (
    <>
      {ground(13, 22)}
      <path d="M14.5 40.5L30.5 9.5" stroke={art.wood} strokeLinecap="round" strokeWidth="4.2" />
      <path d="M13.8 38.5L20 26.5" opacity="0.5" stroke={art.woodDark} strokeLinecap="round" strokeWidth="4.2" />
      <path d="M24.8 15.8L27.6 7.8L38.8 4.5C44.8 10 45.2 19.8 40.6 26.5Z" fill={art.iron} />
      <path d="M24.8 15.8L27.6 7.8L31.8 6.6L29.6 17.8Z" fill={art.ironDark} />
      <path
        d="M38.8 4.5C44.8 10 45.2 19.8 40.6 26.5"
        fill="none"
        stroke={art.ironLight}
        strokeLinecap="round"
        strokeWidth="2.4"
      />
    </>
  ),
  barricade: (
    <>
      {ground(19)}
      <path d="M5 31.5H43" stroke={art.woodDark} strokeLinecap="round" strokeWidth="4.4" />
      {stake(9, 24)}
      {stake(21, -24)}
      {stake(27, 24)}
      {stake(39, -24)}
      <path d="M12.6 29.5l4.8 2.2M30.6 29.5l4.8 2.2" stroke={art.cloth} strokeLinecap="round" strokeWidth="2" />
    </>
  ),
  bread: (
    <>
      {ground(18)}
      <path d="M5 31c0-9.5 8.5-15.5 19-15.5S43 21.5 43 31c0 5.6-4.5 8.5-19 8.5S5 36.6 5 31z" fill={CRUST_DARK} />
      <path d="M5.5 28.5c1-8 9-13 18.5-13s17.5 5 18.5 13c-1.5 4.5-7 6.5-18.5 6.5S7 33 5.5 28.5z" fill={CRUST} />
      <path
        d="M13.5 20.5l5.5 9M21.8 18.5l5.5 9M30.2 19.5l5.3 8.5"
        stroke={art.bread}
        strokeLinecap="round"
        strokeWidth="3.2"
      />
      <path
        d="M9.5 26c1.2-3.8 4-6.6 8-8"
        fill="none"
        opacity="0.5"
        stroke={art.bread}
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </>
  ),
  catapult: (
    <>
      {ground(19)}
      <path d="M19 32.5L25 15.5L31 32.5" fill="none" stroke={art.woodDark} strokeLinejoin="round" strokeWidth="3.6" />
      <rect fill={art.wood} height="4.8" rx="2" width="36" x="5" y="30.5" />
      <path d="M9 27.5l2.2 4" stroke={art.cloth} strokeLinecap="round" strokeWidth="1.6" />
      <path d="M8 27.5L39 9.5" stroke={art.woodLight} strokeLinecap="round" strokeWidth="3.8" />
      <circle cx="40" cy="7" fill={art.stoneLight} r="3.8" />
      <path d="M38.2 5.2a2.6 2.6 0 012.6-.8" fill="none" stroke={art.stoneBright} strokeLinecap="round" />
      <path d="M34 9.5c1.6 4.8 8.2 5.4 11 .6z" fill={art.woodDark} />
      <circle cx="25" cy="17" fill={art.ironDark} r="2.6" />
      <circle cx="12" cy="36.5" fill={art.woodDark} r="5.4" />
      <circle cx="12" cy="36.5" fill={art.woodCut} r="2" />
      <circle cx="34" cy="36.5" fill={art.woodDark} r="5.4" />
      <circle cx="34" cy="36.5" fill={art.woodCut} r="2" />
    </>
  ),
  coal: (
    <>
      {ground(18)}
      <path d="M9 39L6.5 27.5L15 17L27.5 13.5L37.5 21L41.5 32.5L38 39Z" fill={art.coal} />
      <path d="M27.5 13.5L37.5 21L41.5 32.5L38 39H26L30 26Z" fill={COAL_SHADE} />
      <path d="M15 17L27.5 13.5L30 26L19.5 24Z" fill={COAL_BRIGHT} />
      <path d="M6.5 27.5L15 17L19.5 24L12 30.5Z" fill={COAL_MID} />
      <path d="M30 26L37.5 21L41.5 32.5Z" fill={art.coal} />
      <path d="M4 41L6 33.5L13.5 32L18 37L16 41Z" fill={COAL_SHADE} />
      <path d="M6 33.5L13.5 32L11.5 36.5Z" fill={COAL_BRIGHT} />
      <path d="M20.5 18.2l5.5-1.6" opacity="0.8" stroke={art.stoneBright} strokeLinecap="round" strokeWidth="1.3" />
    </>
  ),
  coal_deposit: (
    <>
      {ground(22)}
      <path d="M2.5 40L19 11.5L36 40Z" fill={ROCK} />
      <path d="M19 11.5L36 40H21.5L23.5 26Z" fill={ROCK_DARK} />
      <path d="M21 40L33 21L45.5 40Z" fill={ROCK_LIGHT} />
      <path d="M33 21L45.5 40H36.5L36 29.5Z" fill={ROCK} />
      <path d="M11.5 26.5l6-3 3 5-6 3z" fill={COAL_SHADE} />
      <path d="M11.5 26.5l6-3 .5 2.8z" fill={COAL_BRIGHT} />
      <path d="M26.5 33l5.5-3 3 4.5-5.5 3z" fill={COAL_SHADE} />
      <path d="M26.5 33l5.5-3 .6 2.6z" fill={COAL_BRIGHT} />
      <path d="M36.5 30.5l3.5-1.5 1.5 3-3.5 1.5z" fill={COAL_SHADE} />
      <path d="M6 42l2-6 6.5-1.5 5 4L18.5 42Z" fill={art.coal} />
      <path d="M8 36l6.5-1.5-2 4z" fill={COAL_BRIGHT} />
      <path d="M17 42l1.5-4 5-1 3.5 2.5V42Z" fill={COAL_SHADE} />
      <path d="M18.5 38l5-1-1.5 2.6z" fill={COAL_MID} />
    </>
  ),
  farm: (
    <>
      {ground(22)}
      <ellipse cx="24" cy="38.5" fill={GRASS} rx="21.5" ry="4" />
      <path d="M26 40.5L30.5 29.5H46V40.5Z" fill={art.wheat} />
      <path d="M34.5 29.5L32 40.5M39 29.5L38.5 40.5M43.5 29.5L45 40.5" stroke={art.wheatDark} strokeWidth="1.6" />
      <path d="M5 39.5V24L15.5 13L26 24V39.5Z" fill={BARN} />
      <path d="M15.5 13L26 24V39.5H21V20Z" fill={BARN_DARK} opacity="0.45" />
      <rect fill={art.cloth} height="11.5" rx="1" width="9" x="11" y="28" />
      <path d="M11.5 28.5L19.5 39M19.5 28.5L11.5 39" stroke={BARN_DARK} strokeWidth="1.3" />
      <circle cx="15.5" cy="21" fill={art.cloth} r="2.1" />
      <path
        d="M3.5 25.5L15.5 12L27.5 25.5"
        fill="none"
        stroke={BARN_DARK}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.4"
      />
    </>
  ),
  flour: (
    <>
      {ground(15)}
      <path d="M16.5 15.5L12.5 8.5L20 11.5L24 8.5L28 11.5L35.5 8.5L31.5 15.5Z" fill={CLOTH_SHADE} />
      <path d="M11.5 40.5C8.5 31 10.5 20.5 16 15.5h16c5.5 5 7.5 15.5 4.5 25z" fill={art.cloth} />
      <path d="M28 15.5h4c5.5 5 7.5 15.5 4.5 25H29c3-8 3-17-1-25z" fill={CLOTH_SHADE} />
      <rect fill={art.wood} height="3.2" rx="1.6" width="18" x="15" y="14" />
      <ellipse cx="22.5" cy="27.5" fill={art.wheat} rx="2.6" ry="5.6" transform="rotate(-14 22.5 27.5)" />
      <path d="M21.5 33.5L20.5 37" stroke={art.wheatDark} strokeLinecap="round" strokeWidth="1.4" />
      <path d="M22.8 22.8L21.6 32.5" stroke={art.wheatDark} strokeLinecap="round" />
    </>
  ),
  forest: (
    <>
      <ellipse cx="24" cy="38.5" fill={GRASS} rx="21" ry="5" />
      {pine(12, 37.5, 22)}
      {pine(36, 37.5, 24)}
      {pine(24, 41, 32)}
    </>
  ),
  furnace: (
    <>
      {ground(19)}
      <circle cx="26.5" cy="3" fill={art.stoneBright} opacity="0.8" r="2.3" />
      <rect fill={art.stoneDark} height="11" rx="1" width="9" x="19.5" y="6.5" />
      <rect fill={art.stone} height="3.4" rx="1.2" width="12" x="18" y="5.5" />
      <path d="M8 40.5L11 22.5c.5-7.5 25.5-7.5 26 0l3 18z" fill={art.stoneLight} />
      <path d="M29 17c4.5 1 7.8 3 8 5.5l3 18h-8z" fill={art.stone} />
      <path
        d="M10 28.5H38.5M9 34.5H15M33 34.5H39.5M18 22.5v6M30 22.5v6M12.5 28.5v6M36 28.5v6"
        stroke={art.stone}
        strokeWidth="1.1"
      />
      <path d="M15 40.5V32c0-8 18-8 18 0v8.5z" fill={art.stoneDark} />
      <path d="M17.5 40.5V32.5c0-6 13-6 13 0v8z" fill={art.coalDark} />
      <path d="M19.5 40.5c-1-5 2.5-6 3.5-10.5 2 2.5 3 3 3.5 1.5 2.5 3 3 6 2 9z" fill={FIRE} />
      <path d="M22 40.5c-.5-3 1.5-4 2-6.5 1.5 2 2.5 4 2 6.5z" fill={FIRE_BRIGHT} />
    </>
  ),
  infantry: (
    <>
      {ground(15)}
      <path d="M38.5 42L36.5 8" stroke={art.wood} strokeLinecap="round" strokeWidth="2.8" />
      <path d="M36 1.5L39.8 9.2L32.9 9.6Z" fill={art.ironLight} />
      <path d="M24 9.5c0-5 5.5-6.5 9-4.5-3 .5-4.8 2.2-5.2 5z" fill={palette.ember} />
      <path d="M14 21C14 8.5 34 8.5 34 21z" fill={art.iron} />
      <path d="M17.2 18c.4-4.8 3.2-7 6.8-7.4-2.4 1.8-3.4 4.4-3.8 7.4z" fill={art.ironLight} />
      <rect fill={art.ironDark} height="3.4" rx="1.7" width="23" x="12.5" y="19.5" />
      <circle cx="24" cy="31.5" fill={art.ironDark} r="11.6" />
      <circle cx="24" cy="31.5" fill={palette.ember} r="9.5" />
      <path d="M24 22a9.5 9.5 0 019.5 9.5H24z" fill={palette.emberDeep} />
      <path d="M24 41a9.5 9.5 0 01-9.5-9.5H24z" fill={palette.emberDeep} />
      <circle cx="24" cy="31.5" fill={palette.goldBright} r="3.2" />
      <circle cx="24" cy="31.5" fill={palette.gold} r="1.5" />
    </>
  ),
  iron_deposit: (
    <>
      {ground(22)}
      <path d="M12 40L29 10.5L45.5 40Z" fill={ROCK} />
      <path d="M29 10.5L45.5 40H31L33 26Z" fill={ROCK_DARK} />
      <path d="M29 10.5l4.2 7.5-3.2-1.5-2.5 2.8-2.3-2z" fill={art.stoneBright} />
      <path d="M2.5 40L15 20L27 40Z" fill={ROCK_LIGHT} />
      <path d="M15 20L27 40H18.5L18 28.5Z" fill={ROCK} />
      <path d="M24.5 25l4-2.5 2 4.5-4 2.5z" fill={art.ore} />
      <path d="M24.5 25l4-2.5.5 2.3z" fill={ORE_LIGHT} />
      <path d="M8.5 33.5l4.5-2 1.5 4-4.5 2z" fill={art.ore} />
      <path d="M8.5 33.5l4.5-2 .2 2z" fill={ORE_LIGHT} />
      <path d="M34.5 32.5l4-2 2 4-4 2z" fill={art.ore} />
      <path d="M34.5 32.5l4-2 .4 2z" fill={ORE_LIGHT} />
    </>
  ),
  iron_ingot: (
    <>
      {ground(20)}
      {ingot(2.5, 30)}
      {ingot(23.3, 30)}
      {ingot(12.9, 17)}
    </>
  ),
  iron_ore: (
    <>
      {ground(18)}
      <path d="M7 39L9 26L18 16L30 13.5L39.5 22L42.5 34.5L39 39Z" fill={ROCK} />
      <path d="M9 26L18 16L22.5 24L14 30.5Z" fill={ROCK_LIGHT} />
      <path d="M30 13.5L39.5 22L42.5 34.5L39 39H29L27 26Z" fill={ROCK_DARK} />
      <path d="M18.5 20.5L25.5 17L29 22.5L23 27Z" fill={art.ore} />
      <path d="M18.5 20.5L25.5 17L24 21.5Z" fill={ORE_LIGHT} />
      <path d="M12 33L18.5 30.5L21 35.5L14.5 38Z" fill={art.ore} />
      <path d="M12 33L18.5 30.5L17.5 33.5Z" fill={ORE_LIGHT} />
      <path d="M30 28.5L36.5 26L38.5 32L32 34.5Z" fill={art.ore} />
      <path d="M30 28.5L36.5 26L35.5 29.5Z" fill={ORE_LIGHT} />
    </>
  ),
  leather: (
    <>
      {ground(20)}
      <path d="M11.5 41.5H43v-1.8H11.5z" fill={art.hideDark} />
      <path d="M5.5 29.5H37L43 40H11.5Z" fill={art.hideLight} />
      <path d="M14 37.2H39.5" stroke={art.hideDark} strokeDasharray="2.4 2.2" strokeLinecap="round" strokeWidth="1.2" />
      <rect fill={art.hideDark} height="15.5" rx="7.7" width="32" x="5.5" y="16.2" />
      <rect fill={art.hide} height="15" rx="7.5" width="32" x="5.5" y="15" />
      <rect fill={art.hideLight} height="3.6" opacity="0.7" rx="1.8" width="20" x="9.5" y="17" />
      <ellipse cx="35" cy="22.5" fill={art.hideDark} rx="6.5" ry="7.5" />
      <ellipse cx="35" cy="22.5" fill={art.hideLight} rx="4.8" ry="5.8" />
      <path
        d="M35 19c-2 0-3 1.5-3 3.5s1.2 3.3 3 3.3 2.4-1.2 2.4-2.6"
        fill="none"
        stroke={art.hideDark}
        strokeLinecap="round"
        strokeWidth="1.4"
      />
      <rect fill={art.woodDark} height="16.2" rx="1.5" width="3.4" x="16.5" y="15" />
    </>
  ),
  lumber: (
    <>
      {ground(19)}
      {plank(7, 30.5)}
      {plank(4, 21.5)}
      {plank(9, 12.5)}
    </>
  ),
  lumber_camp: (
    <>
      {ground(22)}
      {pine(10, 39.5, 30)}
      <rect fill={art.woodLight} height="15" rx="1" width="24" x="19" y="25" />
      <path d="M19 30H43M19 35H43" stroke={art.wood} strokeWidth="1.2" />
      <rect fill={HOLLOW} height="10" rx="1" width="6.5" x="28" y="30" />
      <path d="M15.5 27L31 11.5L46.5 27Z" fill={art.woodDark} />
      <path d="M15.5 27L31 11.5L34 14.5L21.5 27Z" fill={art.wood} />
      <circle cx="6.5" cy="38" fill={art.woodDark} r="3.5" />
      <circle cx="6.5" cy="38" fill={art.woodCut} r="2.3" />
      <circle cx="13.8" cy="38" fill={art.woodDark} r="3.5" />
      <circle cx="13.8" cy="38" fill={art.woodCut} r="2.3" />
    </>
  ),
  mine: (
    <>
      {ground(22)}
      <path d="M3 40.5C5 25 13 12 24 12s19 13 21 28.5z" fill={ROCK} />
      <path d="M24 12c11 0 19 13 21 28.5H34c1-12-3-22-10-28.5z" fill={ROCK_DARK} />
      <path d="M8 31c2-8 6.5-14 13-16.5-4 5-6.5 10.5-7 17z" fill={ROCK_LIGHT} />
      <path d="M16 40.5V25H32V40.5Z" fill={palette.ink} />
      <circle cx="24" cy="28.4" fill={palette.goldBright} r="1.7" />
      <path d="M19.5 32.2l2.5-2 3 1 2.5-1.2 1.5 2.2z" fill={art.ore} />
      <path d="M18.5 32h11l-1.5 5.5h-8z" fill={art.ironDark} />
      <path d="M18.5 32h11l-.4 1.6H18.9z" fill={art.iron} />
      <circle cx="21.2" cy="38.6" fill={art.coalLight} r="1.9" />
      <circle cx="26.8" cy="38.6" fill={art.coalLight} r="1.9" />
      <rect fill={art.wood} height="16.5" width="3.8" x="13.8" y="24" />
      <rect fill={art.wood} height="16.5" width="3.8" x="30.4" y="24" />
      <rect fill={art.woodLight} height="4.6" rx="1.2" width="25" x="11.5" y="20.8" />
      <path d="M37 31l3-1.5 1.5 3-3 1.5z" fill={art.ore} />
      <path d="M7.5 35.5l2.5-1 1 2.5-2.5 1z" fill={art.ore} />
    </>
  ),
  pickaxe: (
    <>
      {ground(13, 20)}
      <g transform="rotate(35 24 26)">
        <rect fill={art.wood} height="35" rx="2.1" width="4.2" x="21.9" y="9" />
        <rect fill={art.woodDark} height="13" opacity="0.45" rx="2.1" width="4.2" x="21.9" y="31" />
        <path d="M4.5 19C12 6.5 36 6.5 43.5 19C35 12 13 12 4.5 19Z" fill={art.iron} />
        <path
          d="M10 13.2C17 8.6 31 8.6 38 13.2"
          fill="none"
          stroke={art.ironLight}
          strokeLinecap="round"
          strokeWidth="1.7"
        />
        <rect fill={art.ironDark} height="6.6" rx="1.5" width="7" x="20.5" y="7.8" />
      </g>
    </>
  ),
  plains: (
    <>
      <path d="M2.5 39c2-8.5 12-13.5 21.5-13.5S43.5 30.5 45.5 39c-6 3.5-37 3.5-43 0z" fill={GRASS} />
      <path d="M5 37.5c7-6.5 31-6.5 38 0-8 2.5-30 2.5-38 0z" fill={art.wheat} />
      <path
        d="M10 36.5c4.5-3 8-4 14-4s9.5 1 14 4"
        fill="none"
        stroke={art.wheatDark}
        strokeLinecap="round"
        strokeWidth="1.3"
      />
      <path d="M14 38L13 24M24 39V19M34 38L35 24" stroke={art.wheatDark} strokeLinecap="round" strokeWidth="1.8" />
      {wheatHead(13, 19.5, -6)}
      {wheatHead(24, 13, 0)}
      {wheatHead(35, 19.5, 6)}
    </>
  ),
  quarry: (
    <>
      {ground(21)}
      <path d="M4 40.5V15.5H17V23.5H28V31.5H38V40.5Z" fill={art.stone} />
      <path d="M4 40.5V15.5H9V40.5Z" fill={art.stoneLight} opacity="0.6" />
      <rect fill={art.stoneBright} height="3" width="13" x="4" y="15.5" />
      <rect fill={art.stoneBright} height="3" width="11" x="17" y="23.5" />
      <rect fill={art.stoneBright} height="3" width="10" x="28" y="31.5" />
      <path d="M4 26.5H17M4 34.5H28M11 18.5v8M22 26.5v8M14 34.5v6M33 34.5v6" stroke={art.stoneDark} strokeWidth="1.1" />
      <path d="M33 41l1.5-5.5 6-1.5 4 3.5V41z" fill={art.stoneLight} />
      <path d="M40.5 34l4 3.5V41h-5z" fill={art.stoneDark} />
    </>
  ),
  quarry_building: (
    <>
      {ground(22)}
      <path d="M3 40.5V21H13V28H21V35H29V40.5Z" fill={art.stone} />
      <rect fill={art.stoneBright} height="2.8" width="10" x="3" y="21" />
      <rect fill={art.stoneBright} height="2.8" width="8" x="13" y="28" />
      <rect fill={art.stoneBright} height="2.8" width="8" x="21" y="35" />
      <path d="M3 31H13M8 23.8v7.2M17 30.8v9.7" stroke={art.stoneDark} strokeWidth="1.1" />
      <rect fill={art.woodDark} height="3.8" rx="1" width="12" x="32.5" y="36.8" />
      <path d="M38.5 22.5L28.5 9.5" stroke={art.wood} strokeLinecap="round" strokeWidth="2.2" />
      <path d="M38.5 38V10" stroke={art.wood} strokeLinecap="round" strokeWidth="3.4" />
      <path d="M38.5 11L20 7" stroke={art.woodLight} strokeLinecap="round" strokeWidth="3.2" />
      <path d="M21 7.5V15" stroke={art.cloth} strokeWidth="1.3" />
      <rect fill={art.stoneLight} height="7.5" rx="1" width="10" x="16" y="14.5" />
      <rect fill={art.stoneBright} height="2.4" rx="1" width="10" x="16" y="14.5" />
    </>
  ),
  stone: (
    <>
      {ground(19)}
      <path d="M8 39L11 25L20 16L31 17L39 27L40.5 39Z" fill={art.stone} />
      <path d="M11 25L20 16L24 25.5L16 30.5Z" fill={art.stoneLight} />
      <path d="M20 16L31 17L24 25.5Z" fill={art.stoneBright} />
      <path d="M24 25.5L31 17L39 27L40.5 39H28Z" fill={art.stoneDark} />
      <path d="M29.5 41L31.5 34L38 32L43.5 36V41Z" fill={art.stoneLight} />
      <path d="M38 32L43.5 36V41H37Z" fill={art.stone} />
      <path d="M3.5 41L5.5 35.5L11 34.5L13.5 41Z" fill={art.stoneLight} />
    </>
  ),
  stone_block: (
    <>
      {ground(20)}
      <path d="M6 27L10.5 22.5H44.5L40 27Z" fill={art.stoneBright} />
      <rect fill={art.stoneLight} height="13" width="34" x="6" y="27" />
      <path d="M40 27L44.5 22.5V35.5L40 40Z" fill={art.stone} />
      <path d="M23 27V40" stroke={art.stone} strokeWidth="1.3" />
      <rect fill={art.stone} height="2.4" opacity="0.45" width="34" x="6" y="37.6" />
      <path d="M13 15L17.5 10.5H38.5L34 15Z" fill={art.stoneBright} />
      <rect fill={art.stoneLight} height="12" width="21" x="13" y="15" />
      <path d="M34 15L38.5 10.5V22.5L34 27Z" fill={art.stone} />
      <path d="M17 19.5h5M25.5 23h4.5M10 32h5M28.5 33.5h5" stroke={art.stone} strokeLinecap="round" />
    </>
  ),
  stone_wall: (
    <>
      {ground(21)}
      <rect fill={art.stoneLight} height="11" rx="1" width="9.5" x="5" y="10.5" />
      <rect fill={art.stoneLight} height="11" rx="1" width="9.5" x="19.2" y="10.5" />
      <rect fill={art.stoneLight} height="11" rx="1" width="9.5" x="33.5" y="10.5" />
      <rect fill={art.stoneLight} height="21.5" rx="1.5" width="38" x="5" y="19" />
      <rect fill={art.stoneBright} height="2.4" rx="1" width="9.5" x="5" y="10.5" />
      <rect fill={art.stoneBright} height="2.4" rx="1" width="9.5" x="19.2" y="10.5" />
      <rect fill={art.stoneBright} height="2.4" rx="1" width="9.5" x="33.5" y="10.5" />
      <path
        d="M5 26.5H43M5 33.5H43M16.5 19.5v7M31 19.5v7M10.5 26.5v7M24 26.5v7M37.5 26.5v7M16.5 33.5v7M31 33.5v7"
        stroke={art.stone}
        strokeWidth="1.3"
      />
      <rect fill={art.stone} height="3" opacity="0.5" rx="1.5" width="38" x="5" y="37.5" />
    </>
  ),
  timber: (
    <>
      {ground(19, 23)}
      {logBody(16.5, 33)}
      {logBody(33.5, 33)}
      {log(16.5, 33)}
      {log(33.5, 33)}
      {logBody(25.5, 20)}
      {log(25.5, 20)}
    </>
  ),
  tnb: (
    <>
      <circle cx="24" cy="25.8" fill={palette.goldDeep} r="17.5" />
      <circle cx="24" cy="23" fill={palette.gold} r="17.5" />
      <circle cx="24" cy="23" fill="none" r="13.6" stroke={palette.goldBright} strokeWidth="2" />
      <path d="M16 15.2h16v4.4h-5.7V31.5h-4.6V19.6H16z" fill={palette.goldDeep} />
      <path
        d="M10.5 17.5A14.5 14.5 0 0121 9"
        fill="none"
        opacity="0.6"
        stroke={palette.white}
        strokeLinecap="round"
        strokeWidth="2"
      />
    </>
  ),
  treasury: (
    <>
      {ground(20)}
      <rect fill={art.woodDark} height="16" rx="3" width="33" x="7.5" y="7.5" />
      <rect fill={HOLLOW} height="10" rx="1.5" width="27" x="10.5" y="10.5" />
      <path d="M8.5 26c2.5-8.5 28.5-8.5 31 0z" fill={palette.gold} />
      <circle cx="16.5" cy="21.5" fill={palette.goldBright} r="3" />
      <circle cx="24.5" cy="19.2" fill={palette.goldBright} r="3.3" />
      <circle cx="32" cy="21.8" fill={palette.goldBright} r="2.8" />
      <circle cx="24.5" cy="19.2" fill={palette.gold} r="1.5" />
      <rect fill={art.wood} height="17" rx="2.5" width="37" x="5.5" y="23.5" />
      <rect fill={art.woodLight} height="3" rx="1.5" width="37" x="5.5" y="23.5" />
      <rect fill={art.ironDark} height="17" width="4" x="10.5" y="23.5" />
      <rect fill={art.ironDark} height="17" width="4" x="33.5" y="23.5" />
      <rect fill={palette.goldBright} height="7.5" rx="1.5" width="7" x="20.5" y="26.5" />
      <circle cx="24" cy="29.8" fill={palette.goldDeep} r="1.3" />
    </>
  ),
  trebuchet: (
    <>
      {ground(19)}
      <path d="M11 40L24 13.5L37 40" fill="none" stroke={art.wood} strokeLinejoin="round" strokeWidth="3.6" />
      <path d="M16.8 30.5H31.2" stroke={art.wood} strokeWidth="2.8" />
      <path d="M6.5 40H41.5" stroke={art.woodDark} strokeLinecap="round" strokeWidth="3.8" />
      <path d="M43 4.5c2.4 4.5 1.6 8.5-1.4 11.5" fill="none" stroke={art.cloth} strokeWidth="1.4" />
      <circle cx="40.8" cy="17.5" fill={art.stoneLight} r="3" />
      <path d="M12.5 19.5L43 4.5" stroke={art.woodLight} strokeLinecap="round" strokeWidth="3.4" />
      <path d="M13 19.5V23" stroke={art.ironDark} strokeWidth="1.6" />
      <rect fill={art.stoneDark} height="10.5" rx="2" width="13" x="6.5" y="21.8" />
      <rect fill={art.stone} height="3.2" rx="1.6" width="13" x="6.5" y="21.8" />
      <circle cx="24" cy="13.8" fill={art.ironDark} r="2.5" />
    </>
  ),
  unknown: (
    <>
      {ground(17)}
      {crate(10, 12.5, 28)}
    </>
  ),
  warehouse: (
    <>
      {ground(21)}
      {crate(4.5, 23.5, 17.5)}
      {crate(24.5, 22, 19)}
      {crate(13.5, 6.5, 17)}
    </>
  ),
  wheat: (
    <>
      {ground(12)}
      <path
        d="M24 31L11.5 21.5M24 31L16.5 15M24 31V12M24 31L31.5 15M24 31L36.5 21.5"
        stroke={art.wheatDark}
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path d="M20 31.5h8l5.5 10.5h-19z" fill={art.wheat} />
      <path d="M22 33.5l-2.5 8.5M26 33.5l2.5 8.5M24 33.5v8.5" stroke={art.wheatDark} strokeLinecap="round" />
      {wheatHead(9.5, 18.5, -52)}
      {wheatHead(38.5, 18.5, 52)}
      {wheatHead(15.5, 11.5, -24)}
      {wheatHead(32.5, 11.5, 24)}
      {wheatHead(24, 9, 0)}
      <rect fill={palette.ember} height="4.4" rx="2.2" width="11" x="18.5" y="29" />
    </>
  ),
  wilderness: (
    <>
      <ellipse cx="24" cy="38.5" fill={art.foliageLight} rx="21" ry="5" />
      <path d="M14.5 28.5L13.5 38M19 29.5V38M26.5 29.5V38M30 28.5L31 38" stroke={art.hideDark} strokeWidth="2.2" />
      <ellipse cx="22" cy="25.5" fill={art.hide} rx="9.5" ry="5.8" />
      <ellipse cx="21.5" cy="27.8" fill={art.hideLight} rx="6" ry="2.6" />
      <path d="M26.5 23.5L31 12.5L35.5 14L32.5 27Z" fill={art.hide} />
      <ellipse cx="35" cy="12.8" fill={art.hide} rx="4.3" ry="3" />
      <path d="M37.5 11.2L42 13.6L37.8 15.5Z" fill={art.hide} />
      <path d="M32.2 10.5L29.8 6.5L34 9Z" fill={art.hideDark} />
      <path
        d="M33.5 10L31.5 2.5M32.5 6L28.5 4M34.5 10L38.5 2.5M36.8 5.8L41 5"
        fill="none"
        stroke={art.woodDark}
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle cx="12.5" cy="22.5" fill={art.cloth} r="2.2" />
      <circle cx="36.2" cy="12.4" fill={palette.ink} r="0.8" />
      <path d="M5 40l2-6 2 4.5 2-5.5 2 7z" fill={art.foliage} />
      <path d="M35 40l2-5.5 2 4 2-6 2.5 7.5z" fill={art.foliage} />
    </>
  ),
  worker: (
    <>
      <path d="M36 41L41.5 12" stroke={art.wood} strokeLinecap="round" strokeWidth="3.2" />
      <path d="M33 11.5c5-4 10.5-2.5 13.5 3.5-4-2.5-8.5-3-13.5-3.5z" fill={art.iron} />
      <path d="M8 43c0-10 6.5-15 16-15s16 5 16 15z" fill={palette.moss} />
      <path d="M24 28c9.5 0 16 5 16 15h-9c0-6-2-11-7-15z" fill={palette.forest} opacity="0.5" />
      <circle cx="24" cy="21" fill={SKIN} r="8" />
      <path d="M14.5 18.5C14.5 7.5 33.5 7.5 33.5 18.5z" fill={palette.gold} />
      <rect fill={palette.goldBright} height="8" rx="1.5" width="3.4" x="22.3" y="9.5" />
      <rect fill={palette.goldDeep} height="3.4" rx="1.7" width="24" x="12" y="17" />
    </>
  ),
  workshop: (
    <>
      {ground(22)}
      <rect fill={art.woodLight} height="17.5" rx="1" width="34" x="7" y="23" />
      <path d="M7 28.5H41M7 34.5H41" opacity="0.7" stroke={art.wood} strokeWidth="1.1" />
      <rect fill={HOLLOW} height="13.5" rx="1" width="20" x="14" y="27" />
      <path d="M17 31.5h14.5v2.3L27.5 35v2l2.8 3.5H18l2.8-3.5v-2L15 33z" fill={art.ironLight} />
      <path d="M3 25.5L24 8L45 25.5Z" fill={ROOF} />
      <path d="M24 8L45 25.5H35Z" fill={ROOF_DARK} />
      <circle cx="24" cy="18" fill={art.cloth} r="4.6" />
      <path d="M22.2 20.5L25 16.5" stroke={art.woodDark} strokeLinecap="round" strokeWidth="1.5" />
      <path d="M23.2 14.8L27.2 16.8L26.2 18.8L22.2 16.8Z" fill={art.ironDark} />
    </>
  ),
};

export const ITEM_ICON_KEYS = Object.keys(ART);

const ItemIcon = ({item, size = 24, title}: {item: string; size?: number; title?: string}) => (
  <svg
    aria-hidden={title ? undefined : true}
    aria-label={title}
    height={size}
    role={title ? 'img' : undefined}
    style={{display: 'block', flexShrink: 0}}
    viewBox="0 0 48 48"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    {ART[item] ?? ART.unknown}
  </svg>
);

export default ItemIcon;
