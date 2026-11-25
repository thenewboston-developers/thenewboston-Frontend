import {CasinoBet, CasinoGame, RouletteSelection} from 'types/casino';

export type PocketColor = 'black' | 'green' | 'red';

// One place on the felt where a chip can sit. `type` and `value` are the selection the casino API accepts.
export interface Spot {
  id: string;
  label: string;
  multiplier: number;
  name: string;
  type: string;
  value?: number;
}

export interface ChipStyle {
  base: string;
  face: string;
  inlay: string;
  text: string;
  value: number;
}

export const POCKET_COUNT = 37;
export const POCKET_ANGLE = 360 / POCKET_COUNT;

// The single-zero wheel, clockwise from zero
export const WHEEL_ORDER = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7,
  28, 12, 35, 3, 26,
];

const ORDINALS = ['1st', '2nd', '3rd'];
const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export const CHIPS: ChipStyle[] = [
  {base: '#ece6d6', face: '#fbf7ec', inlay: '#3f72b8', text: '#1d2a36', value: 1},
  {base: '#c9303f', face: '#b22434', inlay: '#f6f0df', text: '#ffffff', value: 5},
  {base: '#1e8f5b', face: '#16774a', inlay: '#f6f0df', text: '#ffffff', value: 25},
  {base: '#20252a', face: '#12161a', inlay: '#d9b25f', text: '#f6e0a0', value: 100},
  {base: '#6f43b8', face: '#5b339f', inlay: '#f6f0df', text: '#ffffff', value: 500},
  {base: '#dba92f', face: '#c39220', inlay: '#20252a', text: '#1c1405', value: 1000},
];

export const NUMBER_SPOTS: Spot[] = Array.from({length: POCKET_COUNT}, (_, value) => ({
  id: `number-${value}`,
  label: String(value),
  multiplier: 36,
  name: String(value),
  type: 'number',
  value,
}));

export const DOZEN_SPOTS: Spot[] = [1, 2, 3].map((value) => ({
  id: `dozen-${value}`,
  label: `${ORDINALS[value - 1]} 12`,
  multiplier: 3,
  name: `${ORDINALS[value - 1]} dozen (${value * 12 - 11}–${value * 12})`,
  type: 'dozen',
  value,
}));

export const COLUMN_SPOTS: Spot[] = [1, 2, 3].map((value) => ({
  id: `column-${value}`,
  label: '2 to 1',
  multiplier: 3,
  name: `${ORDINALS[value - 1]} column`,
  type: 'column',
  value,
}));

// In table order, left to right
export const EVEN_MONEY_SPOTS: Spot[] = [
  {id: 'low', label: '1–18', multiplier: 2, name: '1–18', type: 'low'},
  {id: 'even', label: 'Even', multiplier: 2, name: 'Even', type: 'even'},
  {id: 'red', label: 'Red', multiplier: 2, name: 'Red', type: 'red'},
  {id: 'black', label: 'Black', multiplier: 2, name: 'Black', type: 'black'},
  {id: 'odd', label: 'Odd', multiplier: 2, name: 'Odd', type: 'odd'},
  {id: 'high', label: '19–36', multiplier: 2, name: '19–36', type: 'high'},
];

export const SPOTS: Spot[] = [...NUMBER_SPOTS, ...DOZEN_SPOTS, ...COLUMN_SPOTS, ...EVEN_MONEY_SPOTS];

const SPOTS_BY_ID = new Map(SPOTS.map((spot) => [spot.id, spot]));

// The amount written on a chip: whole below 1,000, then rounded down so a chip never overstates its stack
export const formatChip = (amount: number): string => {
  const units: [number, string][] = [
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
  ];
  for (const [size, suffix] of units) {
    if (amount >= size) {
      const scaled = amount / size;
      return `${scaled >= 100 ? Math.floor(scaled) : Math.floor(scaled * 10) / 10}${suffix}`;
    }
  }
  return String(amount);
};

export const formatTnb = (amount: number): string => `${amount.toLocaleString()} TNB`;

// The chip that represents a stack: the largest denomination it contains
export const getChipStyle = (amount: number): ChipStyle =>
  [...CHIPS].reverse().find((chip) => chip.value <= amount) ?? CHIPS[0];

export const getPocketColor = (number: number): PocketColor => {
  if (number === 0) return 'green';
  return RED_NUMBERS.has(number) ? 'red' : 'black';
};

export const getPocketIndex = (number: number): number => WHEEL_ORDER.indexOf(number);

export const getSpot = (id: string | null | undefined): Spot | undefined => (id ? SPOTS_BY_ID.get(id) : undefined);

// The limit comes from the casino fund and differs per bet type: a 36x number risks far more than an even-money bet
export const getSpotLimit = (game: CasinoGame | undefined, spot: Spot | undefined): number =>
  (spot && game?.bet_types?.find((betType) => betType.id === spot.type)?.max_bet) || 0;

// How many chips tall a stack is drawn, from the fewest chips that make up the amount
export const getStackHeight = (amount: number): number => {
  let count = 0;
  let remaining = amount;
  [...CHIPS].reverse().forEach((chip) => {
    count += Math.floor(remaining / chip.value);
    remaining %= chip.value;
  });
  return Math.max(1, Math.min(5, count));
};

// "Black · Odd · 1–18": every outside bet a number wins, for the result plaque
export const describeNumber = (number: number): string => {
  if (number === 0) return 'Green · Zero';
  const color = getPocketColor(number) === 'red' ? 'Red' : 'Black';
  return `${color} · ${number % 2 ? 'Odd' : 'Even'} · ${number <= 18 ? '1–18' : '19–36'}`;
};

export const selectionSpot = (selection?: RouletteSelection | null): Spot | undefined => {
  if (!selection?.type) return undefined;
  return getSpot(selection.value === undefined ? selection.type : `${selection.type}-${selection.value}`);
};

// Mirrors the casino's own settlement: zero loses every outside bet
export const spotCovers = (spot: Spot, number: number): boolean => {
  switch (spot.type) {
    case 'number':
      return number === spot.value;
    case 'dozen':
      return number > 0 && Math.ceil(number / 12) === spot.value;
    case 'column':
      return number > 0 && ((number - 1) % 3) + 1 === spot.value;
    case 'red':
    case 'black':
      return getPocketColor(number) === spot.type;
    case 'odd':
      return number % 2 === 1;
    case 'even':
      return number > 0 && number % 2 === 0;
    case 'low':
      return number >= 1 && number <= 18;
    case 'high':
      return number >= 19;
    default:
      return false;
  }
};

export const spotSelection = (spot: Spot): RouletteSelection =>
  spot.value === undefined ? {type: spot.type} : {type: spot.type, value: spot.value};

// "17 straight up", "Red", "2nd dozen (13–24)"
export const describeSpot = (spot: Spot): string => (spot.type === 'number' ? `${spot.name} straight up` : spot.name);

export const describeBet = (bet: CasinoBet): string => {
  const spot = selectionSpot(bet.selection);
  return spot ? describeSpot(spot) : 'Roulette';
};

export const isRouletteResult = (bet: CasinoBet | null | undefined): bet is CasinoBet & {result: {number: number}} =>
  !!bet && bet.game === 'roulette' && bet.status === 'settled' && Number.isInteger(bet.result?.number);
