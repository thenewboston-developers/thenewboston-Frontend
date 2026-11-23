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
  it('keeps every checker in the same DOM position when different pieces move or undo', () => {
    const initial: BackgammonBoard = {
      points: Array(24).fill(0),
      bar: {white: 0, black: 0},
      off: {white: 12, black: 13},
    };
    initial.points[12] = 3;
    initial.points[18] = -2;
    act(() => {
      root.render(<Board board={initial} />);
    });
    const checkers = Array.from(container.querySelectorAll('[data-checker-id]'));
    const ids = checkers.map((checker) => checker.getAttribute('data-checker-id'));
    const localMove = {...initial, points: [...initial.points]};
    localMove.points[12] = 2;
    localMove.points[6] = 1;
    const opponentMove = {...localMove, points: [...localMove.points]};
    opponentMove.points[18] = -1;
    opponentMove.points[22] = -1;

    [localMove, opponentMove, initial].forEach((snapshot) => {
      act(() => {
        root.render(<Board board={snapshot} />);
      });
      const updated = Array.from(container.querySelectorAll('[data-checker-id]'));
      expect(updated.map((checker) => checker.getAttribute('data-checker-id'))).toEqual(ids);
      updated.forEach((checker, index) => expect(checker).toBe(checkers[index]));
    });
  });

  it('retargets the same checker element for movement and undo instead of replacing it', () => {
    const initial = {...board, points: [...board.points]};
    initial.points[0] = 0;
    initial.points[5] = 1;
    act(() => {
      root.render(<Board board={initial} />);
    });
    const checker = container.querySelector('[data-checker-location="5"]')!;
    const id = checker.getAttribute('data-checker-id');
    expect(checker).toHaveStyle({transform: 'translate(501px, 559px)'});
    expect(window.getComputedStyle(checker).transition).toBe('none');

    act(() => {
      root.render(<Board board={board} />);
    });
    const moved = container.querySelector(`[data-checker-id="${id}"]`)!;
    expect(moved).toBe(checker);
    expect(moved).toHaveStyle({transform: 'translate(821px, 559px)'});
    expect(window.getComputedStyle(moved).transition).toContain('transform 420ms');

    act(() => {
      root.render(<Board board={initial} />);
    });
    expect(container.querySelector(`[data-checker-id="${id}"]`)).toBe(checker);
    expect(checker).toHaveStyle({transform: 'translate(501px, 559px)'});
    expect(container.querySelectorAll('[data-checker-id]')).toHaveLength(15);
  });

  it('keeps decorative boards still and snaps perspective changes', () => {
    act(() => {
      root.render(<Board board={board} decorative />);
    });
    const next = {...board, points: [...board.points]};
    next.points[0] = 0;
    next.points[2] = 1;
    act(() => {
      root.render(<Board board={next} decorative />);
    });
    const checker = container.querySelector('[data-checker-location="2"]')!;
    expect(window.getComputedStyle(checker).transition).toBe('none');
    act(() => {
      root.render(<Board board={next} perspective="black" />);
    });
    expect(window.getComputedStyle(checker).transition).toBe('none');
    expect(checker).toHaveStyle({transform: 'translate(693px, 81px)'});
  });

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
