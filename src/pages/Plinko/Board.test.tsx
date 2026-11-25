import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {CasinoBet} from 'types/casino';

import Board from './Board';
import {DROP_DURATION, POCKET_Y} from './utils';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
let frames: Map<number, FrameRequestCallback>;
let frameId: number;
const complete = jest.fn();
const peg = jest.fn();
const bet = {
  game: 'plinko',
  request_id: 'first',
  rules_version: 1,
  status: 'settled',
  result: {draw: 0, path: Array(12).fill(0), slot: 0, multiplier: 50},
} as CasinoBet;
const secondBet = {
  ...bet,
  request_id: 'second',
  result: {draw: 4095, path: Array(12).fill(1), slot: 12, multiplier: 50},
};
const advance = (time: number) => {
  const current = [...frames.values()];
  frames.clear();
  act(() => current.forEach((callback) => callback(time)));
};
const render = (bets: CasinoBet[], animate = true, lastBet: CasinoBet | null = null) => {
  act(() => root.render(<Board animate={animate} bets={bets} lastBet={lastBet} onComplete={complete} onPeg={peg} />));
};

beforeEach(() => {
  jest.clearAllMocks();
  frames = new Map();
  frameId = 0;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frameId += 1;
    frames.set(frameId, callback);
    return frameId;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    frames.delete(id);
  });
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

it('keeps independent trajectories and completion times when another ball arrives', () => {
  render([bet]);
  advance(0);
  advance(400);
  const firstBall = container.querySelector('[data-ball-id="first"] circle')!;
  const firstHeight = firstBall.getAttribute('cy');
  render([bet, secondBet]);
  expect(firstBall).toHaveAttribute('cy', firstHeight);
  expect(container.querySelectorAll('[data-ball-id]')).toHaveLength(2);
  advance(500);
  advance(DROP_DURATION);
  expect(complete).toHaveBeenCalledTimes(1);
  expect(complete).toHaveBeenCalledWith(bet);
  expect(firstBall).toHaveAttribute('cx', '74');
  expect(firstBall).toHaveAttribute('cy', String(POCKET_Y - 9));
  const requests = (window.requestAnimationFrame as jest.Mock).mock.calls.length;
  render([secondBet], true, bet);
  advance(DROP_DURATION + 500);
  expect(complete).toHaveBeenCalledTimes(2);
  expect(complete).toHaveBeenLastCalledWith(secondBet);
  expect(container.querySelector('[data-ball-id="second"] circle')).toHaveAttribute('cx', '626');
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(requests);
});

it('uses new sound callbacks without restarting a ball and skips a backlog after a delayed frame', () => {
  render([bet]);
  advance(0);
  advance(200);
  expect(peg).toHaveBeenCalledWith(0);
  const updatedPeg = jest.fn();
  const requests = (window.requestAnimationFrame as jest.Mock).mock.calls.length;
  act(() => root.render(<Board animate bets={[bet]} lastBet={null} onComplete={complete} onPeg={updatedPeg} />));
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(requests);
  advance(DROP_DURATION - 100);
  expect(updatedPeg).toHaveBeenCalledTimes(1);
  advance(DROP_DURATION);
  expect(updatedPeg).toHaveBeenCalledTimes(1);
  expect(complete).toHaveBeenCalledTimes(1);
});

it('finishes reduced-motion drops once and renders recovered receipts without cues', () => {
  render([bet], false);
  expect(complete).toHaveBeenCalledTimes(1);
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  expect(peg).not.toHaveBeenCalled();
  render([], false, bet);
  expect(complete).toHaveBeenCalledTimes(1);
  expect(peg).not.toHaveBeenCalled();
});

it('cancels every currently scheduled ball frame on unmount', () => {
  render([bet, secondBet]);
  advance(0);
  advance(200);
  const scheduled = [...frames.keys()];
  act(() => root.render(<div />));
  scheduled.forEach((id) => expect(window.cancelAnimationFrame).toHaveBeenCalledWith(id));
  expect(frames.size).toBe(0);
});
