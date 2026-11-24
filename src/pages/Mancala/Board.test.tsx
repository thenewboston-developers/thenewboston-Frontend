import {act, ComponentProps} from 'react';
import {createRoot, Root} from 'react-dom/client';

import Board from './Board';
import {INITIAL_BOARD, SowingFrame} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

const render = (props: Partial<ComponentProps<typeof Board>> = {}) =>
  act(() => root.render(<Board board={INITIAL_BOARD} names={{host: 'Alice', guest: 'Bob'}} {...props} />));

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function bounds(this: HTMLElement) {
    const index = Number(this.dataset.pitIndex ?? 0);
    return {
      bottom: 100,
      height: 80,
      left: index * 50,
      right: index * 50 + 80,
      top: 20,
      width: 80,
      x: index * 50,
      y: 20,
      toJSON: () => ({}),
    };
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

it('keeps a guest’s playable pits on the near row and plays once on activation', () => {
  const onPlay = jest.fn();
  render({canPlay: true, onPlay, viewerSide: 'guest'});
  const buttons = Array.from(container.querySelectorAll('button'));
  expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual(
    Array.from({length: 6}, (_, index) => `Your pit ${index + 1}: 4 stones`),
  );
  act(() => buttons[2].click());
  expect(onPlay).toHaveBeenCalledTimes(1);
  expect(onPlay).toHaveBeenCalledWith(2);
  expect(container.querySelector('[data-pit-index="9"]')).toBeTruthy();
});

it('does not claim ownership or offer playable controls to a spectator', () => {
  render({activeSide: 'guest', canPlay: true});
  expect(container.querySelectorAll('button')).toHaveLength(0);
  expect(container.textContent).not.toContain('Your store');
  expect(container.textContent).toContain('Store on the right');
  expect(container.querySelector('[aria-label="Bob’s store: 0 stones"]')).toBeTruthy();
});

it('blocks empty pits and pending moves while preserving accessible counts', () => {
  const onPlay = jest.fn();
  render({board: [0, ...INITIAL_BOARD.slice(1)], canPlay: true, onPlay, viewerSide: 'host'});
  const empty = container.querySelector('button[aria-label="Your pit 1: 0 stones"]') as HTMLButtonElement;
  expect(empty).toBeDisabled();
  act(() => empty.click());
  render({canPlay: false, onPlay, pendingPit: 2, viewerSide: 'host'});
  expect(container.querySelectorAll('button:disabled')).toHaveLength(6);
  expect(container.querySelector('[aria-busy="true"]')).toHaveAttribute('aria-label', 'Your pit 3: 4 stones');
  expect(onPlay).not.toHaveBeenCalled();
});

it('renders a flight for the presented drop and clears it when the frame ends', () => {
  const frame: SowingFrame = {
    board: [0, 5, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0],
    duration: 240,
    hand: 3,
    kind: 'drop',
    marked: [1],
    side: 'host',
    source: 0,
    transfers: [{from: 0, to: 1, stones: 1}],
    version: 2,
  };
  render({board: frame.board, frame, viewerSide: 'host'});
  expect(container.querySelectorAll('[data-flight-from="0"][data-flight-to="1"]')).toHaveLength(1);
  expect(container.querySelector('[data-flight-from]')).toHaveAttribute('aria-hidden', 'true');
  expect(container.textContent).toContain('3 stones in hand');
  render({board: frame.board, viewerSide: 'host'});
  expect(container.querySelector('[data-flight-from]')).toBeNull();
});

it('routes capture flights to the correct store with the guest viewing the board', () => {
  const frame: SowingFrame = {
    board: [4, 4, 4, 4, 0, 4, 0, 0, 0, 4, 4, 4, 4, 8],
    duration: 700,
    hand: 0,
    kind: 'capture',
    marked: [8, 4],
    side: 'guest',
    source: 7,
    transfers: [
      {from: 8, to: 13, stones: 1},
      {from: 4, to: 13, stones: 7},
    ],
    version: 2,
  };
  render({board: frame.board, frame, viewerSide: 'guest'});
  expect(container.querySelectorAll('[data-flight-to="13"]')).toHaveLength(5);
  expect(container.querySelector('[aria-label="Your store: 8 stones"]')).toBeTruthy();
  expect(container.textContent).toContain('Capture!');
});
