import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {DotsAndBoxesOwner} from 'types/dotsAndBoxes';

import Board from './Board';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
const names = {blue: 'Alice', red: 'Bob'};
const onPlay = jest.fn();

const emptyLines = (): DotsAndBoxesOwner[] => Array(24).fill(0);
const emptyBoxes = (): DotsAndBoxesOwner[] => Array(9).fill(0);
const line = (label: string) => container.querySelector(`button[aria-label^="Line ${label}:"]`) as HTMLButtonElement;

const renderBoard = (props: Partial<Parameters<typeof Board>[0]> = {}) => {
  act(() => {
    root.render(
      <Board boxes={emptyBoxes()} lines={emptyLines()} names={names} onPlay={onPlay} side="blue" size={3} {...props} />,
    );
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it.each([
  [3, 24, 9, 16],
  [4, 40, 16, 25],
  [5, 60, 25, 36],
])('draws a board %i boxes wide with %i lines, %i boxes and %i dots', (size, lines, boxes, dots) => {
  renderBoard({boxes: Array(boxes).fill(0), lines: Array(lines).fill(0), size});
  const buttons = Array.from(container.querySelectorAll('button[aria-label^="Line "]'));
  expect(buttons).toHaveLength(lines);
  expect(new Set(buttons.map((button) => button.getAttribute('aria-label'))).size).toBe(lines);
  expect(container.querySelectorAll('[aria-label^="Box "]')).toHaveLength(boxes);
  expect(container.querySelectorAll('[role="group"] > span[aria-hidden="true"]')).toHaveLength(dots);
});

it('reports the line number the server expects when a line is pressed', () => {
  renderBoard();
  act(() => line('A1 to B1').click());
  act(() => line('C4 to D4').click());
  act(() => line('A1 to A2').click());
  act(() => line('D3 to D4').click());
  expect(onPlay.mock.calls.map(([number]) => number)).toEqual([0, 11, 12, 23]);
});

it('names who drew a line and who claimed a box, and locks drawn lines', () => {
  const lines = emptyLines();
  [0, 3, 12].forEach((number) => {
    lines[number] = 1;
  });
  lines[13] = 2;
  const boxes = emptyBoxes();
  boxes[0] = 2;
  renderBoard({boxes, lines});
  expect(line('A1 to B1')).toHaveAccessibleName('Line A1 to B1: drawn by Alice');
  expect(line('B1 to B2')).toHaveAccessibleName('Line B1 to B2: drawn by Bob');
  expect(line('A1 to B1')).toBeDisabled();
  expect(line('B1 to C1')).toBeEnabled();
  const box = container.querySelector('[aria-label^="Box A1"]');
  expect(box).toHaveAccessibleName('Box A1: claimed by Bob');
  expect(box).toHaveTextContent('B');
  expect(container.querySelector('[aria-label^="Box B1"]')).toHaveAccessibleName('Box B1: unclaimed');
});

it('marks an in-flight line and locks the board until the server responds', () => {
  renderBoard({pending: 4});
  expect(line('B2 to C2')).toHaveAccessibleName('Line B2 to C2: drawing…');
  expect(line('B2 to C2')).toHaveAttribute('aria-busy', 'true');
  expect(line('A1 to B1')).toHaveAttribute('aria-busy', 'false');
  expect(Array.from(container.querySelectorAll('button')).every((button) => button.disabled)).toBe(true);
  act(() => line('A1 to B1').click());
  expect(onPlay).not.toHaveBeenCalled();
});

it('locks every line when it is not the viewer’s turn', () => {
  renderBoard({disabled: true});
  expect(Array.from(container.querySelectorAll('button')).every((button) => button.disabled)).toBe(true);
});
