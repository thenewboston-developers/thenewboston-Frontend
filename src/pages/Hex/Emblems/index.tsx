import {useId} from 'react';

import {HexSide} from 'types/hex';

import {getBoardLayout, getHexPoints, HEX_RADIUS, Point} from '../utils';

import * as S from './Styles';

// Every picture here is decorative: the headings and text next to them carry the meaning.

const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
const STONE_RADIUS = HEX_RADIUS * 0.62;

// A short game on a 5 × 5 board, Red first: Blue blocks every step, but Red always keeps a second way forward
// and joins the two red edges.
const DEMO_SIZE = 5;
const DEMO_MOVES = [12, 8, 7, 17, 16, 21, 20, 3, 2];
const DEMO_PATH = [2, 7, 12, 16, 20];

const cellPaths = new Map<string, string>();

// All cells of a board as one path, which keeps even a 13 × 13 picture to a single element
const getCellPath = (size: number, radius = HEX_RADIUS) => {
  const key = `${size}:${radius}`;
  let path = cellPaths.get(key);
  if (!path) {
    path = getBoardLayout(size)
      .cells.map((centre) => `M${getHexPoints(centre, false, radius)}Z`)
      .join('');
    cellPaths.set(key, path);
  }
  return path;
};

// Gradient references break on some characters React puts in generated IDs
const useSvgId = (name: string) => `${name}-${useId().replace(/[^\w-]/g, '')}`;

const StoneGradients = ({id}: {id: string}) => (
  <defs>
    <radialGradient cx="35%" cy="30%" id={`${id}-red`} r="75%">
      <stop offset="0%" stopColor="#ff9d8f" />
      <stop offset="55%" stopColor="#dc463b" />
      <stop offset="100%" stopColor="#9c2219" />
    </radialGradient>
    <radialGradient cx="35%" cy="30%" id={`${id}-blue`} r="75%">
      <stop offset="0%" stopColor="#9cc4ff" />
      <stop offset="55%" stopColor="#2f72da" />
      <stop offset="100%" stopColor="#153f8f" />
    </radialGradient>
  </defs>
);

const Cell = ({centre}: {centre: Point}) => <S.PorcelainCell points={getHexPoints(centre)} />;

const Stone = ({centre, gradients, side}: {centre: Point; gradients: string; side: HexSide}) => (
  <S.GlassStone cx={centre.x} cy={centre.y} fill={`url(#${gradients}-${side})`} r={STONE_RADIUS} />
);

// Two stones already down and a dashed outline where yours goes next, as on the match page
export const PracticeEmblem = () => {
  const gradients = useSvgId('practice');
  const cells = [
    {x: HEX_WIDTH / 2, y: HEX_RADIUS},
    {x: HEX_WIDTH * 1.5, y: HEX_RADIUS},
    {x: HEX_WIDTH, y: HEX_RADIUS * 2.5},
  ];
  return (
    <S.Emblem aria-hidden="true">
      <svg viewBox={`-2 -2 ${HEX_WIDTH * 2 + 4} ${HEX_RADIUS * 3.5 + 4}`}>
        <StoneGradients id={gradients} />
        {cells.map((centre) => (
          <Cell centre={centre} key={`${centre.x}-${centre.y}`} />
        ))}
        <Stone centre={cells[0]} gradients={gradients} side="red" />
        <Stone centre={cells[1]} gradients={gradients} side="blue" />
        <S.PreviewRing points={getHexPoints(cells[2], false, HEX_RADIUS - 4)} />
      </svg>
    </S.Emblem>
  );
};

// The swap arc above the rivalry emblem's two cells, with a head at each end
const ARC = {end: {x: HEX_WIDTH * 1.5, y: 17}, peak: {x: HEX_WIDTH, y: -6}, start: {x: HEX_WIDTH / 2, y: 17}};

// A triangle pointing along `direction` with its tip just past `end`
const arrowHead = (end: Point, direction: Point) => {
  const length = Math.hypot(direction.x, direction.y);
  const along = {x: direction.x / length, y: direction.y / length};
  const across = {x: -along.y, y: along.x};
  const tip = {x: end.x + along.x * 3, y: end.y + along.y * 3};
  const base = {x: end.x - along.x * 4.5, y: end.y - along.y * 4.5};
  return [
    tip,
    {x: base.x + across.x * 4.5, y: base.y + across.y * 4.5},
    {x: base.x - across.x * 4.5, y: base.y - across.y * 4.5},
  ]
    .map(({x, y}) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
};

// A red and a blue stone side by side under the arc of the swap, which only matches between players have
export const RivalryEmblem = () => {
  const gradients = useSvgId('rivalry');
  const cells = [
    {x: HEX_WIDTH / 2, y: HEX_RADIUS * 2.25},
    {x: HEX_WIDTH * 1.5, y: HEX_RADIUS * 2.25},
  ];
  const {end, peak, start} = ARC;
  return (
    <S.Emblem aria-hidden="true">
      <svg viewBox={`-2 -2 ${HEX_WIDTH * 2 + 4} ${HEX_RADIUS * 3.5 + 4}`}>
        <StoneGradients id={gradients} />
        <S.SwapArc d={`M${start.x} ${start.y}Q${peak.x} ${peak.y} ${end.x} ${end.y}`} />
        <S.SwapHead points={arrowHead(end, {x: end.x - peak.x, y: end.y - peak.y})} />
        <S.SwapHead points={arrowHead(start, {x: start.x - peak.x, y: start.y - peak.y})} />
        {cells.map((centre) => (
          <Cell centre={centre} key={centre.x} />
        ))}
        <Stone centre={cells[0]} gradients={gradients} side="red" />
        <Stone centre={cells[1]} gradients={gradients} side="blue" />
      </svg>
    </S.Emblem>
  );
};

// Three joined cells holding one stone per level of difficulty, colored by the card around them
export const StoneChain = ({level}: {level: number}) => (
  <S.StoneChain aria-hidden="true" viewBox={`-1 -1 ${HEX_WIDTH * 3 + 2} ${HEX_RADIUS * 2 + 2}`}>
    {[0, 1, 2].map((index) => {
      const centre = {x: HEX_WIDTH * (index + 0.5), y: HEX_RADIUS};
      return (
        <g key={index}>
          <polygon points={getHexPoints(centre)} />
          {index < level && (
            <>
              <circle className="stone" cx={centre.x} cy={centre.y} r={STONE_RADIUS} />
              <circle className="shine" cx={centre.x - 3.6} cy={centre.y - 4} r={3.6} />
            </>
          )}
        </g>
      );
    })}
  </S.StoneChain>
);

// The board at its real proportions. Its colors come from custom properties on the element around it, so a choice
// card can dim the boards that are not picked.
export const MiniBoard = ({preview, size}: {preview?: number; size: number}) => {
  const layout = getBoardLayout(size);
  return (
    <S.MiniBoard aria-hidden="true" viewBox={layout.viewBox}>
      {layout.edges.map((edge) => (
        <polygon className={edge.side} key={edge.points} points={edge.points} />
      ))}
      <path className="cells" d={getCellPath(size)} />
      {preview !== undefined && <S.PreviewRing points={getHexPoints(layout.cells[preview], false, HEX_RADIUS - 4.5)} />}
    </S.MiniBoard>
  );
};

// A game playing itself out, stone by stone, until Red's chain joins the two red edges. With reduced motion it shows
// the finished game.
export const DemoBoard = () => {
  const gradients = useSvgId('demo');
  const layout = getBoardLayout(DEMO_SIZE);
  const path = DEMO_PATH.map((cell) => `${layout.cells[cell].x},${layout.cells[cell].y}`).join(' ');
  return (
    <S.DemoFrame aria-hidden="true">
      <svg viewBox={layout.viewBox}>
        <StoneGradients id={gradients} />
        {layout.edges.map((edge) => (
          <S.EdgeBand $side={edge.side} key={edge.points} points={edge.points} />
        ))}
        <S.DemoCells d={getCellPath(DEMO_SIZE)} />
        {DEMO_MOVES.map((cell, move) => (
          <S.DemoStone
            $move={move}
            cx={layout.cells[cell].x}
            cy={layout.cells[cell].y}
            fill={`url(#${gradients}-${move % 2 ? 'blue' : 'red'})`}
            key={cell}
            r={STONE_RADIUS}
          />
        ))}
        <S.DemoChain pathLength={1} points={path} />
        {DEMO_PATH.map((cell) => (
          <S.DemoRing cx={layout.cells[cell].x} cy={layout.cells[cell].y} key={cell} r={STONE_RADIUS + 1.6} />
        ))}
      </svg>
    </S.DemoFrame>
  );
};

// A hexagon drawing itself, for loading states
export const HexSpinner = () => (
  <S.Spinner aria-hidden="true" viewBox="0 0 40 44">
    <polygon pathLength={1} points={getHexPoints({x: 20, y: 22}, false, 19)} />
  </S.Spinner>
);

// Three empty places for the first three earners, the winner's raised in the middle
export const EmptyPodium = () => {
  const places = [
    {centre: {x: 34, y: 62}, rank: 2, scale: 0.8},
    {centre: {x: 80, y: 44}, rank: 1, scale: 1},
    {centre: {x: 126, y: 62}, rank: 3, scale: 0.8},
  ];
  return (
    <S.Podium aria-hidden="true" viewBox="0 0 160 100">
      {places.map(({centre, rank, scale}) => (
        <g className={`place-${rank}`} key={rank}>
          <polygon points={getHexPoints(centre, false, 30 * scale)} />
          <text x={centre.x} y={centre.y}>
            {rank}
          </text>
        </g>
      ))}
    </S.Podium>
  );
};
