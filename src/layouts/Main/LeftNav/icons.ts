import {createLucideIcon} from 'lucide-react';

// Lucide's "coins" shape without the "1" drawn on each coin, which read as a number instead of a currency
export const Coins = createLucideIcon('coins-plain', [
  ['circle', {cx: '8', cy: '8', key: 'front-coin', r: '6'}],
  ['path', {d: 'M18.09 10.37A6 6 0 1 1 10.34 18', key: 'back-coin'}],
]);
