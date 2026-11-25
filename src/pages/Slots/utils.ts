import {CasinoBet} from 'types/casino';

export type SlotSymbolId = 'cherry' | 'lemon' | 'bell' | 'bar' | 'diamond' | 'seven';

// Lowest to highest paying, the order the backend publishes for losing lines.
export const SLOT_SYMBOLS: SlotSymbolId[] = ['cherry', 'lemon', 'bell', 'bar', 'diamond', 'seven'];

export const SYMBOL_DETAILS: Record<SlotSymbolId, {multiplier: number; name: string; plural: string}> = {
  bar: {multiplier: 10, name: 'Bar', plural: 'bars'},
  bell: {multiplier: 5, name: 'Bell', plural: 'bells'},
  cherry: {multiplier: 1, name: 'Cherry', plural: 'cherries'},
  diamond: {multiplier: 50, name: 'Diamond', plural: 'diamonds'},
  lemon: {multiplier: 2, name: 'Lemon', plural: 'lemons'},
  seven: {multiplier: 100, name: 'Seven', plural: 'sevens'},
};

export const IDLE_LINE: SlotSymbolId[] = ['bell', 'seven', 'diamond'];

export type ReelColumn = [SlotSymbolId, SlotSymbolId, SlotSymbolId];

export type WinTier = 'loss' | 'push' | 'win' | 'nice' | 'big' | 'huge' | 'jackpot';

export const TIER_LABELS: Record<Exclude<WinTier, 'loss' | 'push'>, string> = {
  big: 'Big win',
  huge: 'Huge win',
  jackpot: 'Jackpot',
  nice: 'Nice win',
  win: 'Win',
};

export const isSlotSymbol = (value: unknown): value is SlotSymbolId => SLOT_SYMBOLS.includes(value as SlotSymbolId);

export const symbolForMultiplier = (multiplier: number) =>
  SLOT_SYMBOLS.find((symbol) => SYMBOL_DETAILS[symbol].multiplier === multiplier);

export const winTier = (multiplier: number): WinTier => {
  if (multiplier >= 100) return 'jackpot';
  if (multiplier >= 50) return 'huge';
  if (multiplier >= 10) return 'big';
  if (multiplier >= 5) return 'nice';
  if (multiplier >= 2) return 'win';
  return multiplier === 1 ? 'push' : 'loss';
};

// The payline of a settled slots receipt, or null when the receipt has no valid line to show.
export const receiptLine = (bet: CasinoBet | null | undefined): SlotSymbolId[] | null => {
  const symbols = bet?.game === 'slots' && bet.status === 'settled' ? bet.result.symbols : undefined;
  return symbols?.length === 3 && symbols.every(isSlotSymbol) ? symbols : null;
};

export const describeLine = (line: SlotSymbolId[], multiplier: number) => {
  if (multiplier > 0 && line.every((symbol) => symbol === line[0])) return `Three ${SYMBOL_DETAILS[line[0]].plural}`;
  return line.map((symbol) => SYMBOL_DETAILS[symbol].name).join(', ');
};

// A short description of any settled casino bet: the slots line, or the roulette number and color.
export const describeBet = (bet: CasinoBet) => {
  const line = receiptLine(bet);
  if (line) return describeLine(line, bet.result.multiplier);
  if (bet.game === 'roulette')
    return ['Roulette', bet.result.number, bet.result.color].filter((part) => part !== undefined).join(' ');
  if (bet.game === 'blackjack') return `Blackjack · ${bet.result.outcome ?? 'hand'}`;
  if (bet.game === 'plinko') return `Plinko · pocket ${(bet.result.slot ?? 0) + 1} · ${bet.result.multiplier}×`;
  return 'Slots spin';
};

// Park-Miller generator seeded from a string: decorative only, never used for outcomes.
export const seededRandom = (seed: string) => {
  let state = 1;
  for (let index = 0; index < seed.length; index += 1) state = (state * 31 + seed.charCodeAt(index)) % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

export const signOf = (value: number) => {
  if (value > 0) return 'up';
  return value < 0 ? 'down' : 'even';
};

const shuffled = (random: () => number, symbols: SlotSymbolId[]) => {
  const copy = [...symbols];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
};

/**
 * Builds what each reel shows around the payline. Only the payline is the result: the rows above and below are
 * decoration, so each of those rows holds three different symbols and never repeats the payline symbol on its reel.
 * Nothing off the payline can look like a near miss.
 */
export const buildReelColumns = (line: SlotSymbolId[], seed: string): ReelColumn[] => {
  const random = seededRandom(seed);
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const above = shuffled(random, SLOT_SYMBOLS).slice(0, 3);
    const below = shuffled(random, SLOT_SYMBOLS).slice(0, 3);
    if (line.every((symbol, reel) => above[reel] !== symbol && below[reel] !== symbol && above[reel] !== below[reel])) {
      return line.map((symbol, reel) => [above[reel], symbol, below[reel]]);
    }
  }
  // Rotating the payline itself always satisfies the rule when every attempt above was unlucky.
  return line.map((symbol, reel) => {
    const index = SLOT_SYMBOLS.indexOf(symbol);
    return [SLOT_SYMBOLS[(index + 1 + reel) % 6], symbol, SLOT_SYMBOLS[(index + 4 + reel) % 6]];
  });
};

const LADDER = Array.from({length: 10}, (_, exponent) => [1, 2, 5].map((base) => base * 10 ** exponent)).flat();

export const betSteps = (min: number, max: number) => {
  if (max < min) return [min];
  return Array.from(new Set([min, ...LADDER.filter((value) => value > min && value < max), max]));
};

export const betChips = (min: number, max: number) => {
  if (max < min) return [];
  return Array.from(new Set([min, ...LADDER.filter((value) => value > min && value < max)])).slice(-3);
};

export const stepBet = (current: number, min: number, max: number, direction: 1 | -1) => {
  const steps = betSteps(min, max);
  if (!Number.isFinite(current)) return min;
  if (direction > 0) return steps.find((value) => value > current) ?? steps[steps.length - 1];
  return [...steps].reverse().find((value) => value < current) ?? steps[0];
};

export const formatOdds = (probability: number) => {
  if (!(probability > 0)) return '—';
  const oneIn = 1 / probability;
  return `1 in ${oneIn >= 10 ? Math.round(oneIn).toLocaleString() : oneIn.toLocaleString(undefined, {maximumFractionDigits: 1})}`;
};

export const formatTnb = (value: number) => value.toLocaleString();

export interface SessionTotals {
  returned: number;
  spins: number;
  wagered: number;
}

export const addToSession = (totals: SessionTotals, bet: CasinoBet): SessionTotals => ({
  returned: totals.returned + bet.payout,
  spins: totals.spins + 1,
  wagered: totals.wagered + bet.total_stake,
});
