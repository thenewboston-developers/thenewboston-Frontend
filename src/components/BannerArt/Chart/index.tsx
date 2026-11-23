import {FC} from 'react';

import * as S from '../Styles';
import {createRandom, getSmoothPath, Point} from '../utils';

const CANDLE_WIDTH = 9;
const GRID_LINES = [48, 96, 144, 192];
const MINT = '#6ee7b7';

const LINE_POINTS: Point[] = [
  [280, 204],
  [320, 196],
  [360, 200],
  [400, 180],
  [440, 166],
  [480, 138],
  [520, 104],
  [560, 86],
  [600, 92],
  [640, 68],
  [680, 72],
  [716, 56],
  [746, 50],
];

const [LAST_X, LAST_Y] = LINE_POINTS[LINE_POINTS.length - 1];
const LINE_PATH = getSmoothPath(LINE_POINTS);
const AREA_PATH = `${LINE_PATH}V240H${LINE_POINTS[0][0]}Z`;

const random = createRandom(11);

// The candles climb with the line, each one wandering a little around the trend
const CANDLES = Array.from({length: 17}, (_, index) => {
  const middle = 196 - index * 8.5;
  const open = middle + (random() - 0.5) * 24;
  const close = middle - 6 + (random() - 0.5) * 30;
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);

  return {
    bodyHeight: Math.max(bodyBottom - bodyTop, 3),
    bodyTop,
    high: bodyTop - 4 - random() * 12,
    isRising: close < open,
    low: bodyBottom + 4 + random() * 12,
    x: 318 + index * 26,
  };
});

const Chart: FC = () => {
  return (
    <>
      <defs>
        <linearGradient id="banner-art-chart-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={MINT} stopOpacity="0.3" />
          <stop offset="1" stopColor={MINT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="banner-art-chart-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={MINT} stopOpacity="0" />
          <stop offset="0.5" stopColor={MINT} />
          <stop offset="1" stopColor="#ecfdf5" />
        </linearGradient>
      </defs>
      <g stroke="#ffffff" strokeOpacity="0.08">
        {GRID_LINES.map((y) => (
          <line key={y} x1="250" x2="760" y1={y} y2={y} />
        ))}
      </g>
      {CANDLES.map(({bodyHeight, bodyTop, high, isRising, low, x}) => (
        <g
          fill={isRising ? MINT : '#ffffff'}
          key={x}
          opacity={isRising ? 0.5 : 0.22}
          stroke={isRising ? MINT : '#ffffff'}
        >
          <line x1={x} x2={x} y1={high} y2={low} />
          <rect height={bodyHeight} rx="2" stroke="none" width={CANDLE_WIDTH} x={x - CANDLE_WIDTH / 2} y={bodyTop} />
        </g>
      ))}
      <path d={AREA_PATH} fill="url(#banner-art-chart-area)" />
      <path
        d={LINE_PATH}
        fill="none"
        stroke="url(#banner-art-chart-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <S.Pulse cx={LAST_X} cy={LAST_Y} fill={MINT} r="5" />
      <circle cx={LAST_X} cy={LAST_Y} fill={MINT} fillOpacity="0.3" r="9" />
      <circle cx={LAST_X} cy={LAST_Y} fill="#ffffff" r="4" />
    </>
  );
};

export default Chart;
