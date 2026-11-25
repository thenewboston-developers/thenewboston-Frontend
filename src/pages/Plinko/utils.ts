import {CasinoBet} from 'types/casino';

export const ROWS = 12;
export const MULTIPLIERS = [50, 18, 8, 3, 1, 0, 0, 0, 1, 3, 8, 18, 50];
export const POCKET_WEIGHTS = [1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1];
export const DROP_DURATION = 2400;
export const MAX_BALLS = 8;

export interface Point {
  x: number;
  y: number;
}

// These coordinates are shared by pegs, the ball, its trail and the payout pockets.
export const CENTER = 350;
export const SPACING = 46;
export const TOP = 80;
export const ROW_HEIGHT = 29;
export const POCKET_Y = TOP + ROWS * ROW_HEIGHT + 6;

export const isPlinkoResult = (bet: CasinoBet | null): bet is CasinoBet & {result: {path: number[]; slot: number}} =>
  !!bet &&
  bet.game === 'plinko' &&
  bet.rules_version === 1 &&
  bet.status === 'settled' &&
  bet.result.path?.length === ROWS &&
  bet.result.path.every((direction) => direction === 0 || direction === 1) &&
  bet.result.slot === bet.result.path.reduce<number>((sum, direction) => sum + direction, 0) &&
  bet.result.multiplier === MULTIPLIERS[bet.result.slot];

export const pathPoints = (path: number[]): Point[] => {
  const points: Point[] = [
    {x: CENTER, y: TOP - 34},
    {x: CENTER, y: TOP - 10},
  ];
  let x = CENTER;
  path.forEach((direction, index) => {
    x += (direction === 1 ? 1 : -1) * (SPACING / 2);
    points.push({x, y: TOP + (index + 1) * ROW_HEIGHT - 10});
  });
  points.push({x, y: POCKET_Y - 9});
  return points;
};

export const ballPosition = (points: Point[], progress: number): Point => {
  const step = Math.max(0, Math.min(1, progress)) * (points.length - 1);
  const index = Math.min(Math.floor(step), points.length - 2);
  const fraction = step - index;
  const from = points[index];
  const to = points[index + 1];
  return {
    x: from.x + (to.x - from.x) * fraction,
    y: from.y + (to.y - from.y) * fraction - Math.sin(fraction * Math.PI) * (index ? 9 : 0),
  };
};

export const pocketColor = (multiplier: number) => {
  if (multiplier >= 18) return '#ff786d';
  if (multiplier >= 3) return '#ffc57a';
  if (multiplier >= 1) return '#6ce0c4';
  return '#29454e';
};
