import {FC} from 'react';

import * as S from '../Styles';
import {getStarPath} from '../utils';

const GOLD = 'url(#banner-art-coins-gold)';

// The largest coin sits past the corner, so only its rim sweeps through the banner
const COINS = [
  {hasStar: false, radius: 150, x: 690, y: 252},
  {hasStar: true, radius: 54, x: 548, y: 46},
  {hasStar: true, radius: 30, x: 438, y: 172},
  {hasStar: true, radius: 26, x: 722, y: 68},
  {hasStar: false, radius: 14, x: 372, y: 72},
];

const SPARKLES = [
  {delay: 0, radius: 7, x: 478, y: 66},
  {delay: 1.1, radius: 4.5, x: 404, y: 122},
  {delay: 2.3, radius: 6, x: 640, y: 112},
  {delay: 0.6, radius: 4, x: 334, y: 178},
  {delay: 1.7, radius: 5, x: 748, y: 124},
];

const Coins: FC = () => {
  return (
    <>
      <defs>
        <linearGradient id="banner-art-coins-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.26" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="banner-art-coins-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#fcd34d" strokeDasharray="2 7" strokeLinecap="round" strokeOpacity="0.35">
        <ellipse cx="560" cy="130" rx="252" ry="92" transform="rotate(-14 560 130)" />
        <ellipse cx="560" cy="130" rx="176" ry="58" transform="rotate(-14 560 130)" />
      </g>
      {COINS.map(({hasStar, radius, x, y}) => (
        <g key={`${x}-${y}`}>
          <circle
            cx={x}
            cy={y}
            fill="url(#banner-art-coins-fill)"
            r={radius}
            stroke={GOLD}
            strokeWidth={radius > 60 ? 2 : 1.5}
          />
          <circle
            cx={x}
            cy={y}
            fill="none"
            r={radius * 0.88}
            stroke={GOLD}
            strokeDasharray="1 3"
            strokeOpacity="0.7"
            strokeWidth={Math.max(radius * 0.07, 2)}
          />
          <circle cx={x} cy={y} fill="none" r={radius * 0.7} stroke={GOLD} strokeOpacity="0.6" />
          {hasStar && <path d={getStarPath(x, y, radius * 0.4, 5, 0.45)} fill={GOLD} fillOpacity="0.85" />}
        </g>
      ))}
      {SPARKLES.map(({delay, radius, x, y}) => (
        <S.Sparkle $delay={delay} d={getStarPath(x, y, radius, 4, 0.28)} fill="#fef3c7" key={`${x}-${y}`} />
      ))}
    </>
  );
};

export default Coins;
