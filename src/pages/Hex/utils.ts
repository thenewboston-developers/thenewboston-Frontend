import axios from 'axios';

import {HexBoardSize, HexMatch, HexSide} from 'types/hex';

export interface Point {
  x: number;
  y: number;
}

export interface BoardLayout {
  aspectRatio: number;
  cells: Point[];
  edges: {points: string; side: HexSide}[];
  labels: (Point & {text: string})[];
  viewBox: string;
}

export const BOARD_SIZES: {description: string; value: HexBoardSize}[] = [
  {description: 'Quick game', value: 7},
  {description: 'Short game', value: 9},
  {description: 'Classic', value: 11},
  {description: 'Long game', value: 13},
];
export const HEX_RADIUS = 20;
export const SIDE_NAMES: Record<HexSide, string> = {blue: 'Blue', red: 'Red'};

const EDGE_BAND = 15;
const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
const layouts = new Map<string, BoardLayout>();

const round = (value: number): number => Math.round(value * 100) / 100;

const toPoints = (points: Point[]): string => points.map(({x, y}) => `${round(x)},${round(y)}`).join(' ');

export const cellLabel = (cell: number, size: number): string =>
  `${String.fromCharCode(97 + (cell % size))}${Math.floor(cell / size) + 1}`;

export const formatClock = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

/**
 * Rows are drawn left to right and each row sits half a cell further right than the one above it, so
 * the board is a rhombus: red edges at the top and bottom, blue edges at the sides. A narrow screen
 * gets the same board with rows and columns exchanged, which stands it upright and makes the cells
 * almost twice as large. Only the drawing changes: cell numbers and labels stay the same.
 */
export const getBoardLayout = (size: number, portrait = false): BoardLayout => {
  const key = `${size}:${portrait}`;
  const cached = layouts.get(key);
  if (cached) return cached;
  const turn = ({x, y}: Point): Point => (portrait ? {x: y, y: x} : {x, y});
  const bottom = HEX_RADIUS * (1.5 * (size - 1) + 2) + EDGE_BAND;
  const top = -EDGE_BAND;
  // A band of even thickness along the slanted sides is wider when measured across the page.
  const slantedBand = (EDGE_BAND * 2) / Math.sqrt(3);
  const left = (y: number): number => (HEX_WIDTH * (y - HEX_RADIUS)) / (3 * HEX_RADIUS) - slantedBand;
  const right = (y: number): number => left(y) + HEX_WIDTH * size + 2 * slantedBand;
  const corners = {
    bottomLeft: {x: left(bottom), y: bottom},
    bottomRight: {x: right(bottom), y: bottom},
    topLeft: {x: left(top), y: top},
    topRight: {x: right(top), y: top},
  };
  const centre = {x: (corners.topLeft.x + corners.bottomRight.x) / 2, y: (top + bottom) / 2};
  const edge = (side: HexSide, first: Point, second: Point) => ({
    points: toPoints([first, second, centre].map(turn)),
    side,
  });
  const cells = Array.from({length: size * size}, (_, cell) => {
    const row = Math.floor(cell / size);
    return turn({x: HEX_WIDTH * ((cell % size) + row / 2 + 0.5), y: HEX_RADIUS * (1.5 * row + 1)});
  });
  const labels = Array.from({length: size}, (_, index) => [
    {text: String.fromCharCode(97 + index), ...turn({x: HEX_WIDTH * (index + 0.5), y: -EDGE_BAND / 2})},
    {
      text: String(index + 1),
      ...turn({x: (HEX_WIDTH * index) / 2 - slantedBand / 2 - 1, y: HEX_RADIUS * (1.5 * index + 1)}),
    },
  ]).flat();
  const margin = 2;
  const origin = turn({x: corners.topLeft.x - margin, y: top - margin});
  const extent = turn({
    x: corners.bottomRight.x - corners.topLeft.x + 2 * margin,
    y: bottom - top + 2 * margin,
  });
  const layout = {
    aspectRatio: round(extent.x / extent.y),
    cells,
    edges: [
      edge('red', corners.topLeft, corners.topRight),
      edge('red', corners.bottomLeft, corners.bottomRight),
      edge('blue', corners.topLeft, corners.bottomLeft),
      edge('blue', corners.topRight, corners.bottomRight),
    ],
    labels,
    viewBox: [origin.x, origin.y, extent.x, extent.y].map(round).join(' '),
  };
  layouts.set(key, layout);
  return layout;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) return 'The match changed. The board has been refreshed; please try again.';
    if (error.response?.status === 404)
      return 'This match is unavailable. Pending challenges are visible only to their players.';
    const data = error.response?.data;
    if (data && typeof data === 'object') {
      const messages = Object.values(data)
        .flat()
        .filter((value) => typeof value === 'string');
      if (messages.length) return messages.join(' ');
    }
  }
  return 'We could not reach the game. Please try again.';
};

export const getHexPoints = (centre: Point, portrait = false, radius = HEX_RADIUS): string =>
  toPoints(
    Array.from({length: 6}, (_, corner) => {
      const angle = (Math.PI / 180) * (60 * corner + (portrait ? 0 : 30));
      return {x: centre.x + radius * Math.cos(angle), y: centre.y + radius * Math.sin(angle)};
    }),
  );

export const getPlayerName = (match: HexMatch, side: HexSide): string =>
  match[side]?.username ?? match.computer_name ?? 'Computer';

/** The cell Blue's stone lands on when Blue takes over a red opening stone: its row and column exchanged. */
export const mirrorCell = (cell: number, size: number): number => (cell % size) * size + Math.floor(cell / size);

/** The cell a keyboard arrow leads to, or the same cell at the edge of the board. */
export const stepCell = (cell: number, size: number, key: string, portrait = false): number => {
  const steps: Record<string, [number, number]> = {
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
    ArrowUp: [-1, 0],
  };
  const step = steps[key];
  if (!step) return cell;
  // On an upright board the rows run across the screen instead of down it.
  const [rowStep, columnStep] = portrait ? [step[1], step[0]] : step;
  const row = Math.floor(cell / size) + rowStep;
  const column = (cell % size) + columnStep;
  return row < 0 || row >= size || column < 0 || column >= size ? cell : row * size + column;
};
