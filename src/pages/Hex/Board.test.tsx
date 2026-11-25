import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {HexStone} from 'types/hex';

import Board from './Board';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const SIZE = 7;
let board: HexStone[];
let container: HTMLDivElement;
let root: Root;
const onSelect = jest.fn();

const cell = (label: string): SVGGElement => {
  const found = container.querySelector<SVGGElement>(`[aria-label="${label}"]`);
  if (!found) throw new Error(`Cell not found: ${label}`);
  return found;
};

const click = (element: Element) =>
  act(() => {
    element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

const press = (element: Element, key: string) =>
  act(() => {
    element.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, cancelable: true, key}));
  });

const renderBoard = (props: Partial<Parameters<typeof Board>[0]> = {}) =>
  act(() => root.render(<Board board={board} onSelect={onSelect} size={SIZE} {...props} />));

beforeEach(() => {
  board = Array(SIZE * SIZE).fill(0);
  board[24] = 1;
  board[25] = 2;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('Hex board', () => {
  it('names every cell with its stone and offers only empty cells', () => {
    renderBoard();
    expect(container.querySelectorAll('[data-cell]')).toHaveLength(SIZE * SIZE);
    expect(container.querySelector('[role="group"]')).toHaveAttribute(
      'aria-label',
      'Hex board, 7 by 7. Red joins row 1 to row 7. Blue joins column a to column g.',
    );
    expect(cell('a1: empty')).toHaveAttribute('aria-disabled', 'false');
    expect(cell('d4: red stone')).toHaveAttribute('aria-disabled', 'true');
    expect(cell('e4: blue stone')).toHaveAttribute('aria-disabled', 'true');
    click(cell('a1: empty'));
    click(cell('d4: red stone'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(0);
  });

  it('describes the stone being previewed, the last move and the winning chain', () => {
    renderBoard({lastMove: 25, preview: {cell: 10, side: 'red'}, winningPath: [24]});
    expect(cell('d2: your red stone, not placed yet, press again to place it')).toHaveAttribute('aria-pressed', 'true');
    expect(cell('e4: blue stone, last move')).toBeInTheDocument();
    expect(cell('d4: red stone, winning chain')).toBeInTheDocument();
    expect(container).toHaveTextContent('Gold line: the winning chain');
    click(cell('d2: your red stone, not placed yet, press again to place it'));
    expect(onSelect).toHaveBeenCalledWith(10);
  });

  it('takes no stones while it is not the player’s turn but can still be read with the keyboard', () => {
    renderBoard({disabled: true});
    click(cell('a1: empty'));
    press(cell('a1: empty'), 'Enter');
    press(cell('a1: empty'), ' ');
    expect(onSelect).not.toHaveBeenCalled();
    expect(container.querySelectorAll('[aria-disabled="false"]')).toHaveLength(0);
    // Focus stays on the board between turns and after the game, so the position can be read cell by cell.
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    act(() => cell('d4: red stone').focus());
    press(cell('d4: red stone'), 'ArrowRight');
    expect(document.activeElement).toBe(cell('e4: blue stone'));
    renderBoard({disabled: false});
    expect(document.activeElement).toBe(cell('e4: blue stone'));
  });

  it('keeps a Tab stop when a smaller board replaces a larger one', () => {
    act(() => root.render(<Board board={Array(169).fill(0)} onSelect={onSelect} size={13} />));
    act(() => cell('m13: empty').focus());
    expect(cell('m13: empty')).toHaveAttribute('tabindex', '0');
    renderBoard();
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(cell('d4: red stone')).toHaveAttribute('tabindex', '0');
  });

  it('has one Tab stop and moves between cells with the arrow keys', () => {
    renderBoard();
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(cell('d4: red stone')).toHaveAttribute('tabindex', '0');
    act(() => cell('d4: red stone').focus());
    press(cell('d4: red stone'), 'ArrowLeft');
    expect(document.activeElement).toBe(cell('c4: empty'));
    press(cell('c4: empty'), 'ArrowUp');
    expect(document.activeElement).toBe(cell('c3: empty'));
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(cell('c3: empty')).toHaveAttribute('tabindex', '0');
    press(cell('c3: empty'), 'Enter');
    expect(onSelect).toHaveBeenCalledWith(2 * SIZE + 2);
    press(cell('c3: empty'), ' ');
    expect(onSelect).toHaveBeenCalledTimes(2);
    // A taken cell can be walked over but not played.
    press(cell('d4: red stone'), 'Enter');
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('keeps the edges of the side to move lit and dims the other side', () => {
    const opacities = () =>
      Array.from(container.querySelectorAll('svg[aria-label^="Hex board"] > polygon')).map(
        (band) => getComputedStyle(band).opacity,
      );
    renderBoard();
    expect(opacities()).toEqual(['1', '1', '1', '1']);
    renderBoard({activeSide: 'blue'});
    // The red edges are drawn first, then the blue ones.
    expect(opacities()).toEqual(['0.6', '0.6', '1', '1']);
    renderBoard({activeSide: 'red'});
    expect(opacities()).toEqual(['1', '1', '0.6', '0.6']);
  });

  it('stands the board upright on narrow screens without changing the cells', () => {
    renderBoard();
    const [, , wideWidth, wideHeight] = container.querySelector('svg')!.getAttribute('viewBox')!.split(' ').map(Number);
    renderBoard({portrait: true});
    const [, , width, height] = container.querySelector('svg')!.getAttribute('viewBox')!.split(' ').map(Number);
    expect(wideWidth).toBeGreaterThan(wideHeight);
    expect([width, height]).toEqual([wideHeight, wideWidth]);
    expect(cell('d4: red stone')).toBeInTheDocument();
    // Rows run across an upright board, so the right arrow leads to the next row.
    act(() => cell('d4: red stone').focus());
    press(cell('d4: red stone'), 'ArrowRight');
    expect(document.activeElement).toBe(cell('d5: empty'));
  });
});
