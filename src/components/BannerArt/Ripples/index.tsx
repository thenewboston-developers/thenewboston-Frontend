import {FC} from 'react';

const RING_COUNT = 13;
const RING_SPACING = 15;

// Buyers on one side and sellers on the other: the rings spread from both, and weave a pattern where they meet
const SOURCES = [
  {color: '#f9a8d4', x: 540, y: 200},
  {color: '#fed7aa', x: 704, y: 44},
];

const RINGS = Array.from({length: RING_COUNT}, (_, index) => ({
  opacity: 0.8 - index * 0.048,
  radius: (index + 1) * RING_SPACING,
}));

const Ripples: FC = () => {
  return (
    <>
      {SOURCES.map(({color, x, y}) => (
        <g key={color}>
          <g fill="none" stroke={color}>
            {RINGS.map(({opacity, radius}) => (
              <circle cx={x} cy={y} key={radius} r={radius} strokeOpacity={opacity} />
            ))}
          </g>
          <circle cx={x} cy={y} fill={color} fillOpacity="0.3" r="8" />
          <circle cx={x} cy={y} fill="#ffffff" r="3.5" />
        </g>
      ))}
    </>
  );
};

export default Ripples;
