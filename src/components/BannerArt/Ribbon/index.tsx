import {FC} from 'react';

import {getTracedPath} from '../utils';

const GOLD = '#fcd34d';
const LINE_COUNT = 18;

// A band of lines that follows one slow wave while its width swells and pinches, so the lines cross over like a ribbon
// turning in the air
const LINES = Array.from({length: LINE_COUNT}, (_, index) => {
  const offset = index / (LINE_COUNT - 1) - 0.5;

  return getTracedPath(0, 760, (x) => 120 + 20 * Math.sin(x / 110 + 1) + offset * 68 * Math.cos(x / 150 - 0.4));
});

const Ribbon: FC = () => {
  return (
    <g fill="none" stroke={GOLD} strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="0.8">
      {LINES.map((line) => (
        <path d={line} key={line} />
      ))}
    </g>
  );
};

export default Ribbon;
