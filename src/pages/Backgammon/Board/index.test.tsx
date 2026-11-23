import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {BackgammonBoard} from 'types/backgammon';

import Board from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const board: BackgammonBoard = {
  points: [1, ...Array(23).fill(0)],
  bar: {white: 0, black: 0},
  off: {white: 14, black: 0},
};

describe('backgammon board controls', () => {
  it('makes only legal sources and destinations keyboard interactive', () => {
    const onSelect = jest.fn();
    act(() => {
      root.render(<Board board={board} nextMoves={[{from: 0, to: 'off', die: 1}]} onSelect={onSelect} selected={0} />);
    });
    const buttons = Array.from(container.querySelectorAll('[role="button"]'));
    expect(buttons).toHaveLength(2);
    const off = buttons.find((button) => button.getAttribute('aria-label')?.includes('bear off here'))!;
    expect(off).toHaveAttribute('tabindex', '0');
    act(() => {
      off.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
    });
    expect(onSelect).toHaveBeenCalledWith('off');
  });

  it('renders a spectator board without interactive controls', () => {
    act(() => {
      root.render(<Board board={board} />);
    });
    expect(container.querySelectorAll('[role="button"]')).toHaveLength(0);
    expect(container.querySelector('svg')).toHaveAttribute('aria-label', 'Backgammon board, white perspective');
  });

  it('rotates the board so black bears off on the bottom right', () => {
    const blackBoard = {points: [...Array(23).fill(0), -1], bar: {white: 0, black: 0}, off: {white: 0, black: 14}};
    act(() => {
      root.render(<Board board={blackBoard} perspective="black" />);
    });
    const point = container.querySelector('[aria-label="Point 24: 1 black checker"]')!;
    expect(point.querySelector('path')).toHaveAttribute('d', 'M792,588 h58 L821,354 Z');
    const off = container.querySelector('[aria-label="black borne off: 14 of 15"]')!;
    expect(off.querySelector('rect')).toHaveAttribute('y', '348');
  });
});
