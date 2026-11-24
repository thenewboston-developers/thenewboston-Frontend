import {useId} from 'react';

import * as S from './Styles';

// Every emblem is decorative: the headings and text next to them carry the meaning.

type Side = 'black' | 'white';

// A faint light rim keeps black disks readable on the dark board
const BLACK_RIM = {stroke: '#b7b1cf', strokeOpacity: 0.45, strokeWidth: 0.9};

// The flipping example: black plays c4 and traps three disks along the row and one on the diagonal
const CELL = 30;
const DEMO_FLIPS = [
  {column: 3, delay: 0, row: 3},
  {column: 3, delay: 0, row: 4},
  {column: 4, delay: 0.22, row: 3},
  {column: 5, delay: 0.44, row: 3},
];
const DEMO_LINES = [
  {delay: 0, path: 'M85 115H205'},
  {delay: 0, path: 'M85 115L145 175'},
];
const DEMO_MOVE = {column: 2, row: 3};
const DEMO_STILL: {column: number; row: number; side: Side}[] = [
  {column: 4, row: 2, side: 'white'},
  {column: 6, row: 3, side: 'black'},
  {column: 4, row: 4, side: 'black'},
  {column: 5, row: 4, side: 'white'},
  {column: 4, row: 5, side: 'black'},
  {column: 5, row: 5, side: 'black'},
];
const GRID_LINES = Array.from({length: 7}, (_, index) => 40 + index * CELL)
  .map((offset) => `M${offset} 10V250M10 ${offset}H250`)
  .join('');
const STAR_POINTS = [70, 190].flatMap((x) => [70, 190].map((y) => ({x, y})));

const center = (index: number) => 25 + index * CELL;

const DiskGradients = ({ids}: {ids: Record<Side, string>}) => (
  <defs>
    <radialGradient cx="0.34" cy="0.28" fx="0.34" fy="0.28" id={ids.black} r="0.98">
      <stop offset="0" stopColor="#5a5666" />
      <stop offset="0.46" stopColor="#24212d" />
      <stop offset="1" stopColor="#0d0b12" />
    </radialGradient>
    <radialGradient cx="0.34" cy="0.28" fx="0.34" fy="0.28" id={ids.white} r="0.98">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="0.52" stopColor="#f1ebdd" />
      <stop offset="1" stopColor="#cfc5ae" />
    </radialGradient>
  </defs>
);

// Gradient references break on some characters React puts in generated IDs
const useGradientIds = (name: string) => {
  const id = `${name}-${useId().replace(/[^\w-]/g, '')}`;
  return {black: `${id}-black`, white: `${id}-white`};
};

export const CornerEmblem = () => {
  const ids = useGradientIds('corner');
  return (
    <S.Emblem aria-hidden="true" viewBox="0 0 64 64">
      <DiskGradients ids={ids} />
      <rect fill="#0b1934" height="62" rx="16" stroke="#f2c66d" strokeOpacity="0.5" width="62" x="1" y="1" />
      <path d="M12 26H54M12 40H54M26 12V54M40 12V54" stroke="#78edff" strokeOpacity="0.2" />
      <path d="M12 54V17C12 14.2 14.2 12 17 12H54" fill="none" stroke="#78edff" strokeOpacity="0.7" strokeWidth="2" />
      <circle cx="40" cy="40" fill="#78edff" fillOpacity="0.7" r="1.6" />
      <rect fill="#f2c66d" fillOpacity="0.16" height="12" rx="2" width="12" x="13" y="13" />
      <S.CornerGlow cx="19" cy="19" fill="#f2c66d" r="8" />
      <circle cx="19" cy="19" fill={`url(#${ids.black})`} r="5.2" stroke="#f2c66d" strokeWidth="1.3" />
      <circle cx="33" cy="19" fill={`url(#${ids.black})`} r="4.6" {...BLACK_RIM} />
      <circle cx="19" cy="33" fill={`url(#${ids.white})`} r="4.6" />
    </S.Emblem>
  );
};

// The four corners of an empty board, still waiting for someone to take them
export const CornersBoard = () => (
  <S.CornersBoard aria-hidden="true" viewBox="0 0 132 132">
    <rect fill="#0a1730" height="128" rx="10" stroke="#1a344e" width="128" x="2" y="2" />
    <path
      d={Array.from({length: 7}, (_, index) => 24 + index * 14)
        .map((offset) => `M${offset} 10V122M10 ${offset}H122`)
        .join('')}
      stroke="#78edff"
      strokeOpacity="0.14"
    />
    <rect fill="none" height="112" rx="3" stroke="#78edff" strokeOpacity="0.4" width="112" x="10" y="10" />
    {[10, 108].flatMap((x) =>
      [10, 108].map((y) => (
        <S.OpenCorner fill="#f2c66d" fillOpacity="0.1" height="14" key={`${x}-${y}`} width="14" x={x} y={y} />
      )),
    )}
    <circle cx="59" cy="59" fill="#f4efe3" r="5" />
    <circle cx="73" cy="59" fill="#24212d" r="5" {...BLACK_RIM} />
    <circle cx="59" cy="73" fill="#24212d" r="5" {...BLACK_RIM} />
    <circle cx="73" cy="73" fill="#f4efe3" r="5" />
  </S.CornersBoard>
);

export const FlipBoard = () => {
  const ids = useGradientIds('flip-board');
  const disk = (side: Side) => `url(#${ids[side]})`;
  return (
    <S.Figure>
      <S.FlipBoardArt aria-hidden="true" viewBox="0 0 260 260">
        <DiskGradients ids={ids} />
        <rect fill="#071022" height="256" rx="14" stroke="#1a344e" width="256" x="2" y="2" />
        <rect fill="#0a1730" height="240" rx="6" width="240" x="10" y="10" />
        <path d={GRID_LINES} stroke="#78edff" strokeOpacity="0.16" />
        <rect fill="none" height="240" rx="6" stroke="#78edff" strokeOpacity="0.5" width="240" x="10" y="10" />
        {STAR_POINTS.map(({x, y}) => (
          <circle cx={x} cy={y} fill="#78edff" fillOpacity="0.6" key={`${x}-${y}`} r="2.4" />
        ))}
        {DEMO_STILL.map(({column, row, side}) => (
          <circle
            cx={center(column)}
            cy={center(row)}
            fill={disk(side)}
            key={`${row}-${column}`}
            r="11.5"
            {...(side === 'black' ? BLACK_RIM : {})}
          />
        ))}
        {DEMO_FLIPS.map(({column, delay, row}) => (
          <S.FlippingDisk $delay={delay} key={`${row}-${column}`}>
            <S.DarkFace
              $delay={delay}
              cx={center(column)}
              cy={center(row)}
              fill={disk('black')}
              r="11.5"
              {...BLACK_RIM}
            />
            <S.LightFace $delay={delay} cx={center(column)} cy={center(row)} fill={disk('white')} r="11.5" />
          </S.FlippingDisk>
        ))}
        {DEMO_LINES.map(({delay, path}) => (
          <S.CaptureLine $delay={delay} d={path} key={path} pathLength={1} />
        ))}
        <S.MoveHint cx={center(DEMO_MOVE.column)} cy={center(DEMO_MOVE.row)} r="5" />
        <S.PlacedDisk
          cx={center(DEMO_MOVE.column)}
          cy={center(DEMO_MOVE.row)}
          fill={disk('black')}
          r="11.5"
          stroke="#78edff"
          strokeOpacity="0.7"
        />
      </S.FlipBoardArt>
      <S.FigureCaption>Black plays c4 and flips four disks at once.</S.FigureCaption>
    </S.Figure>
  );
};

export const FlipLoader = () => <S.Loader aria-hidden="true" />;

// The opening position, with the four moves black can make on the first turn
export const OpeningEmblem = () => {
  const ids = useGradientIds('opening');
  return (
    <S.Emblem aria-hidden="true" viewBox="0 0 64 64">
      <DiskGradients ids={ids} />
      <rect fill="#0b1934" height="62" rx="16" stroke="#78edff" strokeOpacity="0.45" width="62" x="1" y="1" />
      <path d="M8 20H56M8 32H56M8 44H56M20 8V56M32 8V56M44 8V56" stroke="#78edff" strokeOpacity="0.16" />
      <rect fill="none" height="48" rx="4" stroke="#78edff" strokeOpacity="0.32" width="48" x="8" y="8" />
      <circle cx="26" cy="26" fill={`url(#${ids.white})`} r="4.7" />
      <circle cx="38" cy="26" fill={`url(#${ids.black})`} r="4.7" {...BLACK_RIM} />
      <circle cx="26" cy="38" fill={`url(#${ids.black})`} r="4.7" {...BLACK_RIM} />
      <circle cx="38" cy="38" fill={`url(#${ids.white})`} r="4.7" />
      {[
        [26, 14],
        [14, 26],
        [50, 38],
        [38, 50],
      ].map(([x, y], index) => (
        <S.OpeningHint $index={index} cx={x} cy={y} key={`${x}-${y}`} r="2.2" />
      ))}
    </S.Emblem>
  );
};

// A black disk and an ivory disk squaring off
export const RivalsEmblem = () => {
  const ids = useGradientIds('rivals');
  return (
    <S.Emblem aria-hidden="true" viewBox="0 0 64 64">
      <DiskGradients ids={ids} />
      <circle cx="32" cy="32" fill="#0b1934" r="31" stroke="#78edff" strokeOpacity="0.45" />
      <S.RivalsOrbit cx="32" cy="32" fill="none" r="25" stroke="#78edff" strokeDasharray="2 5" strokeOpacity="0.35" />
      <circle cx="39.5" cy="29" fill="#00000059" r="11" transform="translate(1.5 2.5)" />
      <circle cx="39.5" cy="29" fill={`url(#${ids.white})`} r="11" />
      <circle cx="24.5" cy="35" fill="#00000073" r="11" transform="translate(1.5 2.5)" />
      <circle
        cx="24.5"
        cy="35"
        fill={`url(#${ids.black})`}
        r="11"
        stroke="#78edff"
        strokeOpacity="0.85"
        strokeWidth="1.2"
      />
    </S.Emblem>
  );
};
