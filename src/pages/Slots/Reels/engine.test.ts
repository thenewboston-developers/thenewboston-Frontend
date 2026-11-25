import {ReelColumn} from '../utils';

import ReelEngine, {CELLS_PER_REEL} from './engine';

let clock = 0;
let frames: FrameRequestCallback[] = [];

const reel = () => {
  const root = document.createElement('div');
  Object.defineProperty(root, 'clientHeight', {configurable: true, value: 300});
  const cells = Array.from({length: CELLS_PER_REEL}, () => document.createElement('div'));
  const uses = cells.map(() => document.createElementNS('http://www.w3.org/2000/svg', 'use'));
  return {cells, root, uses};
};

// Runs animation frames on a scripted clock until the reels are idle or the time runs out.
const runUntil = (from: number, to: number) => {
  for (let now = from; now <= to && frames.length; now += 16) {
    clock = now;
    const pending = frames;
    frames = [];
    pending.forEach((callback) => callback(now));
  }
};

const paylineSymbols = (engine: ReelEngine) =>
  engine.paylineCells().map((cell) => cell.querySelector('use')?.getAttribute('href') ?? '');

const IDLE: ReelColumn[] = [
  ['cherry', 'bell', 'diamond'],
  ['bell', 'seven', 'cherry'],
  ['seven', 'diamond', 'bar'],
];
const TARGET: ReelColumn[] = [
  ['bell', 'seven', 'lemon'],
  ['cherry', 'seven', 'bar'],
  ['lemon', 'seven', 'diamond'],
];

beforeEach(() => {
  frames = [];
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.push(callback);
    return frames.length;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
    frames = [];
  });
});

const build = (onLand = jest.fn()) => {
  const elements = [reel(), reel(), reel()];
  elements.forEach((element) => element.cells.forEach((cell, index) => cell.appendChild(element.uses[index])));
  return {elements, engine: new ReelEngine(elements, IDLE, {onLand}), onLand};
};

it('shows the idle line on the payline before any spin', () => {
  const {engine} = build();
  expect(paylineSymbols(engine)).toEqual(['#tnbs-bell', '#tnbs-seven', '#tnbs-diamond']);
  expect(engine.paylineCells().map((cell) => cell.style.transform)).toEqual(
    Array(3).fill('translate3d(0, 100.00px, 0)'),
  );
});

it('lands every reel exactly on the result, in order, and settles once all have stopped', async () => {
  const {elements, engine, onLand} = build();
  engine.start(0);
  runUntil(0, 500);
  expect(elements[0].root).toHaveAttribute('data-blurred');
  let settled = false;
  const stopped = engine.stop(TARGET, {}, 500).then(() => {
    settled = true;
  });
  runUntil(500, 6000);
  await stopped;
  expect(settled).toBe(true);
  expect(onLand.mock.calls.map(([index]) => index)).toEqual([0, 1, 2]);
  expect(paylineSymbols(engine)).toEqual(['#tnbs-seven', '#tnbs-seven', '#tnbs-seven']);
  expect(engine.paylineCells().map((cell) => cell.style.transform)).toEqual(
    Array(3).fill('translate3d(0, 100.00px, 0)'),
  );
  elements.forEach((element) => {
    expect(element.root).not.toHaveAttribute('data-blurred');
    element.uses.forEach((use) => expect(use).not.toHaveAttribute('filter'));
  });
});

it('keeps the third reel spinning longer when a big win is on its way', () => {
  const landings: number[] = [];
  const {engine} = build(jest.fn(() => landings.push(clock)));
  engine.start(0);
  engine.stop(TARGET, {anticipation: true}, 0);
  runUntil(0, 8000);
  expect(landings).toHaveLength(3);
  expect(landings[2] - landings[1]).toBeGreaterThan(landings[1] - landings[0] + 900);
});

it('jumps straight to a line when set while idle and resolves a stop without a spin', async () => {
  const {engine} = build();
  await engine.stop(TARGET);
  expect(paylineSymbols(engine)).toEqual(['#tnbs-seven', '#tnbs-seven', '#tnbs-seven']);
  expect(frames).toHaveLength(0);
});
