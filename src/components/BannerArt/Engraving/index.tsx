import {FC} from 'react';

import {getWavyRingPath} from '../utils';

const GOLD = '#fcd34d';

interface Band {
  amplitude: number;
  copies: number;
  radius: number;
  waves: number;
}

interface Rosette {
  bands: Band[];
  id: string;
  rings: number[];
  x: number;
  y: number;
}

// Banknote engraving: every band is one wavy ring, repeated a few times with a slight turn so the copies braid
const ROSETTES: Rosette[] = [
  {
    bands: [
      {amplitude: 20, copies: 6, radius: 206, waves: 34},
      {amplitude: 24, copies: 6, radius: 148, waves: 24},
      {amplitude: 22, copies: 6, radius: 88, waves: 16},
      {amplitude: 14, copies: 5, radius: 38, waves: 9},
    ],
    id: 'banner-art-engraving-large',
    rings: [118, 178],
    x: 690,
    y: 120,
  },
  {
    bands: [
      {amplitude: 14, copies: 5, radius: 62, waves: 14},
      {amplitude: 10, copies: 4, radius: 28, waves: 8},
    ],
    id: 'banner-art-engraving-small',
    rings: [42, 82],
    x: 404,
    y: 236,
  },
];

const Engraving: FC = () => {
  return (
    <g fill="none" stroke={GOLD}>
      {ROSETTES.map(({bands, id, rings, x, y}) => (
        <g key={id}>
          <defs>
            {bands.map(({amplitude, radius, waves}) => (
              <path d={getWavyRingPath(x, y, radius, amplitude, waves)} id={`${id}-${radius}`} key={radius} />
            ))}
          </defs>
          {bands.map(({copies, radius, waves}) =>
            Array.from({length: copies}, (_, copy) => (
              <use
                href={`#${id}-${radius}`}
                key={`${radius}-${copy}`}
                strokeOpacity="0.5"
                strokeWidth="0.7"
                transform={`rotate(${(360 / waves) * (copy / copies)} ${x} ${y})`}
              />
            )),
          )}
          {rings.map((radius) => (
            <circle cx={x} cy={y} key={radius} r={radius} strokeOpacity="0.4" />
          ))}
        </g>
      ))}
    </g>
  );
};

export default Engraving;
