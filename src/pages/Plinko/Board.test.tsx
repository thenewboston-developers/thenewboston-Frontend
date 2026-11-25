import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {CasinoBet} from 'types/casino';

import Board from './Board';
import {DROP_DURATION, POCKET_Y} from './utils';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
let frame: FrameRequestCallback;
let frameId: number;
const complete = jest.fn();
const bet = {
  game: 'plinko',
  rules_version: 1,
  status: 'settled',
  result: {draw: 0, path: Array(12).fill(0), slot: 0, multiplier: 50},
} as CasinoBet;

beforeEach(() => {
  jest.clearAllMocks();
  frameId = 0;
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frame = callback;
    frameId += 1;
    return frameId;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

it('keeps its in-progress trajectory through a parent refresh and only reveals after landing', () => {
  act(() => root.render(<Board animate bet={bet} dropping onComplete={complete} />));
  act(() => frame(100));
  act(() => frame(100 + DROP_DURATION / 2));
  const ball = container.querySelector('circle[fill="url(#plinko-ball)"]')!;
  const halfway = ball.getAttribute('cy');
  expect(complete).not.toHaveBeenCalled();
  expect(container.querySelector('[data-selected="true"]')).toBeNull();
  const requests = (window.requestAnimationFrame as jest.Mock).mock.calls.length;
  act(() => root.render(<Board animate bet={bet} dropping onComplete={complete} />));
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(requests);
  expect(ball).toHaveAttribute('cy', halfway);
  act(() => frame(100 + DROP_DURATION));
  expect(ball).toHaveAttribute('cx', '74');
  expect(ball).toHaveAttribute('cy', String(POCKET_Y - 9));
  expect(complete).toHaveBeenCalledTimes(1);
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(requests);
});

it('finishes immediately for reduced motion and cancels an animation on unmount', () => {
  act(() => root.render(<Board animate={false} bet={bet} dropping onComplete={complete} />));
  expect(complete).toHaveBeenCalledTimes(1);
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  act(() => root.render(<Board animate bet={bet} dropping onComplete={complete} />));
  act(() => frame(100));
  act(() => frame(200));
  const lastScheduledFrame = frameId;
  act(() => root.render(<div />));
  expect(window.cancelAnimationFrame).toHaveBeenCalledWith(lastScheduledFrame);
});
