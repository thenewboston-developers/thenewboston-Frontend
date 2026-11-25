import {symbolHref} from '../Symbols';
import {ReelColumn, SLOT_SYMBOLS, SlotSymbolId} from '../utils';

export const CELLS_PER_REEL = 5;

// Speeds are in cells per second; positions are in cells.
const SPEED = 21;
const START_STAGGER_MS = 90;
const WINDUP = 0.22;
const WINDUP_TIME = 0.14;
const ACCELERATION_TIME = 0.26;
const MIN_SPIN_MS = 700;
const STOP_STAGGER_MS = 320;
const ANTICIPATION_MS = 1150;
const MIN_TRAVEL = 4.4;
// Back easing that leaves the brake at full speed and settles with a small overshoot.
const OVERSHOOT = 0.9;
const BRAKE_SLOPE = OVERSHOOT + 3;

const backEase = (progress: number) => {
  const x = progress - 1;
  return 1 + (OVERSHOOT + 1) * x * x * x + OVERSHOOT * x * x;
};

const easeOut = (progress: number) => 1 - (1 - progress) * (1 - progress);

const mod = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

export interface ReelElements {
  cells: HTMLElement[];
  root: HTMLElement;
  uses: SVGUseElement[];
}

export interface StopOptions {
  anticipation?: boolean;
}

interface Brake {
  distance: number;
  duration: number;
  from: number;
  landed: boolean;
  startedAt: number;
  target: number;
}

interface ReelState {
  base: number;
  blurred: boolean;
  brake: Brake | null;
  phase: 'idle' | 'spinning' | 'braking';
  position: number;
  shown: (SlotSymbolId | null)[];
  spinStartedAt: number;
  stopAt: number | null;
  strip: Map<number, SlotSymbolId>;
  target: ReelColumn | null;
}

const brakeReel = (reel: ReelState, now: number) => {
  const target = Math.ceil(reel.position + MIN_TRAVEL);
  const [above, payline, below] = reel.target!;
  // Rows at target are top (above), target - 1 is the payline and target - 2 the bottom row: none is visible yet.
  reel.strip.set(target, above);
  reel.strip.set(target - 1, payline);
  reel.strip.set(target - 2, below);
  reel.strip.delete(target + 1);
  const distance = target - reel.position;
  reel.brake = {
    distance,
    duration: (distance * BRAKE_SLOPE) / SPEED,
    from: reel.position,
    landed: false,
    startedAt: now,
    target,
  };
  reel.phase = 'braking';
};

const pruneStrip = (reel: ReelState) => {
  const lowest = Math.floor(reel.position) - 4;
  reel.strip.forEach((_, index) => {
    if (index < lowest) reel.strip.delete(index);
  });
};

// Filler symbols are decorative and never repeat a neighbour on the same reel.
const symbolAt = (reel: ReelState, index: number) => {
  const existing = reel.strip.get(index);
  if (existing) return existing;
  const neighbours = [reel.strip.get(index - 1), reel.strip.get(index + 1)];
  const options = SLOT_SYMBOLS.filter((symbol) => !neighbours.includes(symbol));
  const symbol = options[Math.floor(Math.random() * options.length)];
  reel.strip.set(index, symbol);
  return symbol;
};

export interface ReelEngineCallbacks {
  onLand?: (reel: number) => void;
}

/**
 * Drives the three reels with requestAnimationFrame. Each reel recycles five cells: the three visible rows plus one
 * entering and one leaving, positioned with transforms so a spin never re-renders React.
 */
export default class ReelEngine {
  private cellHeight = 0;

  private frame = 0;

  private readonly reels: ReelState[];

  private settle: (() => void) | null = null;

  constructor(
    private readonly elements: ReelElements[],
    columns: ReelColumn[],
    private readonly callbacks: ReelEngineCallbacks = {},
  ) {
    this.reels = elements.map(() => ({
      base: 0,
      blurred: false,
      brake: null,
      phase: 'idle',
      position: 0,
      shown: Array(CELLS_PER_REEL).fill(null),
      spinStartedAt: 0,
      stopAt: null,
      strip: new Map(),
      target: null,
    }));
    this.measure();
    this.set(columns);
  }

  get spinning() {
    return this.reels.some((reel) => reel.phase !== 'idle');
  }

  destroy() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.finish();
  }

  measure() {
    const height = this.elements[0]?.root.clientHeight ?? 0;
    this.cellHeight = height / 3;
    this.elements.forEach((element) => {
      element.cells.forEach((cell) => {
        cell.style.height = `${this.cellHeight}px`;
      });
    });
    this.reels.forEach((_, index) => this.render(index));
  }

  // The payline cell of each reel, for win highlights once the reels are idle.
  paylineCells() {
    return this.reels.map((reel, index) => this.elements[index].cells[mod(Math.round(reel.position) - 1, 5)]);
  }

  set(columns: ReelColumn[]) {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.reels.forEach((reel, index) => {
      const [above, payline, below] = columns[index];
      reel.phase = 'idle';
      reel.brake = null;
      reel.stopAt = null;
      reel.target = null;
      reel.position = 2;
      reel.strip = new Map([
        [0, below],
        [1, payline],
        [2, above],
      ]);
      this.setBlur(index, false);
      this.render(index);
    });
    this.finish();
  }

  start(now = performance.now()) {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.reels.forEach((reel, index) => {
      reel.base = reel.position;
      reel.brake = null;
      reel.phase = 'spinning';
      reel.spinStartedAt = now + index * START_STAGGER_MS;
      reel.stopAt = null;
      reel.target = null;
    });
    this.frame = requestAnimationFrame(this.tick);
  }

  stop(columns: ReelColumn[], {anticipation = false}: StopOptions = {}, now = performance.now()) {
    if (!this.spinning) {
      this.set(columns);
      return Promise.resolve();
    }
    const earliest = Math.max(now, this.reels[0].spinStartedAt + MIN_SPIN_MS);
    this.reels.forEach((reel, index) => {
      reel.target = columns[index];
      reel.stopAt = earliest + index * STOP_STAGGER_MS + (anticipation && index === 2 ? ANTICIPATION_MS : 0);
    });
    return new Promise<void>((resolve) => {
      this.finish();
      this.settle = resolve;
    });
  }

  private finish() {
    const {settle} = this;
    this.settle = null;
    settle?.();
  }

  private readonly tick = (now: number) => {
    this.reels.forEach((reel, index) => this.advance(reel, index, now));
    if (this.spinning) {
      this.frame = requestAnimationFrame(this.tick);
      return;
    }
    this.frame = 0;
    this.finish();
  };

  private advance(reel: ReelState, index: number, now: number) {
    if (reel.phase === 'spinning') {
      const elapsed = (now - reel.spinStartedAt) / 1000;
      if (elapsed <= 0) return;
      const atSpeed = elapsed >= WINDUP_TIME + ACCELERATION_TIME;
      if (elapsed < WINDUP_TIME) {
        reel.position = reel.base - WINDUP * easeOut(elapsed / WINDUP_TIME);
      } else {
        const accelerating = Math.min(elapsed - WINDUP_TIME, ACCELERATION_TIME);
        const cruising = Math.max(0, elapsed - WINDUP_TIME - ACCELERATION_TIME);
        reel.position =
          reel.base - WINDUP + (0.5 * SPEED * accelerating * accelerating) / ACCELERATION_TIME + SPEED * cruising;
      }
      this.setBlur(index, elapsed > WINDUP_TIME + ACCELERATION_TIME / 2);
      if (atSpeed && reel.target && reel.stopAt !== null && now >= reel.stopAt) brakeReel(reel, now);
    } else if (reel.phase === 'braking' && reel.brake) {
      const {brake} = reel;
      const progress = Math.min(1, (now - brake.startedAt) / (brake.duration * 1000));
      reel.position = brake.from + brake.distance * backEase(progress);
      this.setBlur(index, progress < 0.55);
      if (!brake.landed && reel.position >= brake.target) {
        brake.landed = true;
        this.callbacks.onLand?.(index);
      }
      if (progress >= 1) {
        reel.position = brake.target;
        reel.phase = 'idle';
        reel.brake = null;
        reel.target = null;
        reel.stopAt = null;
        this.setBlur(index, false);
        pruneStrip(reel);
      }
    }
    this.render(index);
  }

  private setBlur(index: number, blurred: boolean) {
    const reel = this.reels[index];
    if (reel.blurred === blurred) return;
    reel.blurred = blurred;
    this.elements[index].root.toggleAttribute('data-blurred', blurred);
    this.elements[index].uses.forEach((use) => {
      if (blurred) use.setAttribute('filter', 'url(#tnbs-motion)');
      else use.removeAttribute('filter');
    });
  }

  private render(index: number) {
    const reel = this.reels[index];
    const element = this.elements[index];
    if (!element) return;
    const top = Math.floor(reel.position) + 1;
    for (let stripIndex = top - 4; stripIndex <= top; stripIndex += 1) {
      const slot = mod(stripIndex, CELLS_PER_REEL);
      const symbol = symbolAt(reel, stripIndex);
      if (reel.shown[slot] !== symbol) {
        reel.shown[slot] = symbol;
        element.uses[slot]?.setAttribute('href', symbolHref(symbol));
      }
      const offset = (reel.position - stripIndex) * this.cellHeight;
      const cell = element.cells[slot];
      if (cell) cell.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }
  }
}
