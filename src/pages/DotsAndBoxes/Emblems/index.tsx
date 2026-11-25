import {DotsAndBoxesOwner, DotsAndBoxesSide} from 'types/dotsAndBoxes';

import {boxLines, horizontalLine, lineCount, verticalLine} from '../utils';

import * as S from './Styles';

const OWNERS: Record<number, DotsAndBoxesSide> = {1: 'blue', 2: 'red'};

interface Point {
  x: number;
  y: number;
}

interface Segment {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

// Every line of a `size` by `size` board by its API number, in a square of `span` units that starts at `margin`
const getSegments = (size: number, span: number, margin: number): Map<number, Segment> => {
  const cell = span / size;
  const at = (index: number) => margin + index * cell;
  const indexes = Array.from({length: size + 1}, (_, index) => index);
  const segments = new Map<number, Segment>();
  indexes.forEach((row) =>
    indexes.slice(0, size).forEach((column) => {
      segments.set(horizontalLine(size, row, column), {x1: at(column), x2: at(column + 1), y1: at(row), y2: at(row)});
    }),
  );
  indexes.slice(0, size).forEach((row) =>
    indexes.forEach((column) => {
      segments.set(verticalLine(size, row, column), {x1: at(column), x2: at(column), y1: at(row), y2: at(row + 1)});
    }),
  );
  return segments;
};

const getDots = (size: number, span: number, margin: number): Point[] => {
  const cell = span / size;
  const indexes = Array.from({length: size + 1}, (_, index) => index);
  return indexes.flatMap((row) => indexes.map((column) => ({x: margin + column * cell, y: margin + row * cell})));
};

interface SketchProps {
  boxes?: DotsAndBoxesOwner[];
  lines?: DotsAndBoxesOwner[];
  size: number;
}

// A small drawing of a board: open lines faint, drawn lines and claimed boxes in their player's colour
export const BoardSketch = ({boxes = [], lines = [], size}: SketchProps) => {
  const margin = 4;
  const span = 40;
  const cell = span / size;
  return (
    <S.Sketch aria-hidden="true" viewBox="0 0 48 48">
      {boxes.map((owner, box) =>
        OWNERS[owner] ? (
          <rect
            className={`box ${OWNERS[owner]}`}
            height={cell}
            key={`box-${box}`}
            width={cell}
            x={margin + (box % size) * cell}
            y={margin + Math.floor(box / size) * cell}
          />
        ) : null,
      )}
      {Array.from(getSegments(size, span, margin), ([line, segment]) => (
        <line className={OWNERS[lines[line]] ?? 'open'} key={`line-${line}`} {...segment} />
      ))}
      {getDots(size, span, margin).map(({x, y}) => (
        <circle className="dot" cx={x} cy={y} key={`${x}-${y}`} r={size > 4 ? 1.6 : 1.9} />
      ))}
    </S.Sketch>
  );
};

// A box drawing itself side by side, for loading states
export const BoxSpinner = () => (
  <S.Spinner aria-hidden="true" viewBox="0 0 28 28">
    <rect className="fill" height={18} width={18} x={5} y={5} />
    <path className="trace" d="M5 5H23V23H5Z" pathLength={4} />
    {[5, 23].flatMap((x) => [5, 23].map((y) => <circle cx={x} cy={y} key={`${x}-${y}`} r={2.4} />))}
  </S.Spinner>
);

// Difficulty as a chain of three boxes with one, two or all three of them taken. Taken boxes are drawn last so
// that their sides cover the sides they share with free ones.
export const ChainMeter = ({level}: {level: number}) => {
  const boxes = [0, 1, 2];
  const order = [...boxes.filter((box) => box >= level), ...boxes.filter((box) => box < level)];
  return (
    <S.Meter aria-hidden="true" viewBox="0 0 68 26">
      {order.map((box) => (
        <rect className={box < level ? 'taken' : 'free'} height={20} key={box} width={20} x={4 + box * 20} y={3} />
      ))}
      {[4, 24, 44, 64].flatMap((x) =>
        [3, 23].map((y) => <circle className="dot" cx={x} cy={y} key={`${x}-${y}`} r={2.4} />),
      )}
    </S.Meter>
  );
};

// A box the computer has taken, marked with its initial the way the board marks claimed boxes
export const ComputerEmblem = () => (
  <S.Emblem aria-hidden="true" viewBox="0 0 60 60">
    <rect className="fill red" height={36} width={36} x={12} y={12} />
    <path className="line blue" d="M12 12H48M48 48H12" />
    <path className="line red" d="M48 12V48M12 48V12" />
    <text className="initial red" x={30} y={30}>
      C
    </text>
    {[12, 48].flatMap((x) => [12, 48].map((y) => <circle className="dot" cx={x} cy={y} key={`${x}-${y}`} r={3.6} />))}
  </S.Emblem>
);

// The lines of a whole 3 × 3 game in the order they are drawn. Blue opens, and a player who closes a box goes again:
// Blue is handed a box and later takes a chain of three, then Red takes the last five boxes and wins 5–4.
export const DEMO_MOVES: [number, DotsAndBoxesSide][] = [
  [0, 'blue'],
  [11, 'red'],
  [20, 'blue'],
  [15, 'red'],
  [17, 'blue'],
  [7, 'red'],
  [2, 'blue'],
  [9, 'red'],
  [13, 'blue'],
  [19, 'red'],
  [22, 'blue'],
  [3, 'red'],
  [12, 'blue'],
  [1, 'blue'],
  [16, 'red'],
  [6, 'blue'],
  [21, 'blue'],
  [10, 'blue'],
  [14, 'blue'],
  [4, 'red'],
  [18, 'red'],
  [5, 'red'],
  [8, 'red'],
  [23, 'red'],
];

const DEMO_SIZE = 3;

// When each line is drawn, in seconds from the start of the loop: a little quicker while one player keeps the turn
export const DEMO_TIMES = DEMO_MOVES.reduce<number[]>((times, [, side], move) => {
  if (!move) return [0.6];
  return [...times, times[move - 1] + (DEMO_MOVES[move - 1][1] === side ? 0.3 : 0.45)];
}, []);

// Each box with the move that closes it, worked out from the lines rather than written down by hand
export const DEMO_CLAIMS = Array.from({length: DEMO_SIZE * DEMO_SIZE}, (_, box) => {
  const move = Math.max(...boxLines(DEMO_SIZE, box).map((line) => DEMO_MOVES.findIndex(([drawn]) => drawn === line)));
  return {box, move, side: DEMO_MOVES[move][1]};
});

export const DemoBoard = () => {
  const margin = 8;
  const span = 84;
  const cell = span / DEMO_SIZE;
  const segments = getSegments(DEMO_SIZE, span, margin);
  return (
    <S.Demo aria-hidden="true" viewBox="0 0 100 100">
      {Array.from(segments, ([line, segment]) => (
        <line className="open" key={`open-${line}`} {...segment} />
      ))}
      {DEMO_CLAIMS.map(({box, move, side}) => (
        <S.DemoBox
          $at={DEMO_TIMES[move]}
          className={side}
          height={cell - 8}
          key={box}
          rx={2.5}
          width={cell - 8}
          x={margin + (box % DEMO_SIZE) * cell + 4}
          y={margin + Math.floor(box / DEMO_SIZE) * cell + 4}
        />
      ))}
      {DEMO_MOVES.map(([line, side], move) => (
        <S.DemoLine $at={DEMO_TIMES[move]} className={side} key={line} {...segments.get(line)!} />
      ))}
      {getDots(DEMO_SIZE, span, margin).map(({x, y}) => (
        <circle className="dot" cx={x} cy={y} key={`${x}-${y}`} r={3.3} />
      ))}
    </S.Demo>
  );
};

// Three columns of empty boxes, the tallest in the middle, waiting for the first earners
export const EmptyPodium = () => {
  const base = 80;
  const cell = 22;
  const columns = [
    {height: 2, rank: 2, x: 34},
    {height: 3, rank: 1, x: 56},
    {height: 1, rank: 3, x: 78},
  ];
  const corners = Array.from(
    new Set(
      columns.flatMap(({height, x}) =>
        Array.from({length: height + 1}, (_, level) => [
          `${x},${base - level * cell}`,
          `${x + cell},${base - level * cell}`,
        ]).flat(),
      ),
    ),
    (corner) => corner.split(',').map(Number),
  );
  return (
    <S.Podium aria-hidden="true" viewBox="0 0 134 90">
      {columns.map(({height, rank, x}) => (
        <g className={`place-${rank}`} key={rank}>
          {Array.from({length: height}, (_, level) => (
            <rect height={cell} key={level} width={cell} x={x} y={base - (level + 1) * cell} />
          ))}
          <text x={x + cell / 2} y={base - height * cell + cell / 2}>
            {rank}
          </text>
        </g>
      ))}
      <path className="next" d={`M56 ${base - 3 * cell}H78`} />
      {corners.map(([x, y]) => (
        <circle cx={x} cy={y} key={`${x}-${y}`} r={2.6} />
      ))}
    </S.Podium>
  );
};

// The position drawn on each board size choice: the top-left box taken by blue, the bottom-right one by red
export const getSamplePosition = (size: number): Required<Omit<SketchProps, 'size'>> => {
  const boxes: DotsAndBoxesOwner[] = Array(size * size).fill(0);
  const last = size * size - 1;
  const lines: DotsAndBoxesOwner[] = Array(lineCount(size)).fill(0);
  boxLines(size, 0).forEach((line) => {
    lines[line] = 1;
  });
  boxLines(size, last).forEach((line) => {
    lines[line] = 2;
  });
  lines[horizontalLine(size, 0, 1)] = 2;
  lines[verticalLine(size, 1, 0)] = 1;
  lines[horizontalLine(size, size, 0)] = 2;
  boxes[0] = 1;
  boxes[last] = 2;
  return {boxes, lines};
};

// Two boxes side by side, one taken by each player
export const RivalryEmblem = () => (
  <S.Emblem aria-hidden="true" viewBox="0 0 60 60">
    <rect className="fill blue" height={24} width={24} x={6} y={18} />
    <rect className="fill red" height={24} width={24} x={30} y={18} />
    <path className="line blue" d="M6 18H30M6 42H30M6 18V42" />
    <path className="line red" d="M30 18H54M30 42H54M54 18V42M30 18V42" />
    {[6, 30, 54].flatMap((x) =>
      [18, 42].map((y) => <circle className="dot" cx={x} cy={y} key={`${x}-${y}`} r={3.4} />),
    )}
  </S.Emblem>
);
