/**
 * The illustrated boards are laid out in board units, 400 wide and 150 tall, and positioned in percentages of the
 * board so they scale with the panel. Stones are oval glass, 10 units wide.
 */
export const BOARD_HEIGHT = 150;
export const BOARD_WIDTH = 400;
export const PIT_SIZE = 38;
export const STONE_RATIO = 1.22;
export const STONE_SIZE = 10;
export const STONE_HEIGHT = STONE_SIZE / STONE_RATIO;
export const STORE = {height: 118, top: 16, width: 40};
export const STORE_LEFT = {far: 14, near: 346};

export interface Point {
  x: number;
  y: number;
}

export type Row = 'far' | 'near';

/** A repeatable number from 0 to 1, so every visit draws the same piles. */
export const noise = (seed: number) => {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
};

/** How far a stone is turned, in degrees: stones never lie in a neat row. */
export const tilt = (seed: number) => Math.round(noise(seed) * 80 - 40);

export const pitCenter = (row: Row, column: number): Point => ({
  x: 87 + column * 45.2,
  y: row === 'far' ? 48 : 102,
});

// Four stones resting in a pit, around its center
const CLUSTER: Point[] = [
  {x: -5.5, y: -4.5},
  {x: 5, y: -5},
  {x: -5, y: 5},
  {x: 5.5, y: 4.5},
];

/** Where the four stones of a pit rest, nudged a little so no two pits look the same. */
export const pile = (seed: number): Point[] =>
  CLUSTER.map((offset, stone) => ({
    x: offset.x + (noise(seed * 4 + stone) - 0.5) * 3,
    y: offset.y + (noise(seed * 4 + stone + 50) - 0.5) * 3,
  }));

/** The opening move the demonstration plays: the near player's third pit, which ends in their store. */
export const SOURCE_COLUMN = 2;
const SOURCE_SEED = 6 + SOURCE_COLUMN;

// Each sown stone starts in the third pit and lands one place further on: pits four to six, then the store
export const SOWN = pile(SOURCE_SEED).map((offset, stone) => {
  const source = pitCenter('near', SOURCE_COLUMN);
  const from = {x: source.x + offset.x, y: source.y + offset.y};
  const to =
    stone < 3
      ? {x: pitCenter('near', SOURCE_COLUMN + 1 + stone).x + 0.5, y: pitCenter('near', 0).y - 0.5}
      : {x: STORE_LEFT.near + STORE.width / 2, y: STORE.top + STORE.height - 14};
  return {from, tilt: tilt(SOURCE_SEED * 4 + stone), to};
});

export const toLeft = (x: number) => `${(x / BOARD_WIDTH) * 100}%`;
export const toTop = (y: number) => `${(y / BOARD_HEIGHT) * 100}%`;
