import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {ReversiLastMove} from 'types/reversi';

import Board from './Board';
import {INITIAL_BOARD} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

const square = (name: string): HTMLButtonElement => {
  const found = container.querySelector<HTMLButtonElement>(`button[aria-label^="${name}:"]`);
  if (!found) throw new Error(`Square not found: ${name}`);
  return found;
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

describe('reversi board', () => {
  it('describes every square and only enables the legal moves', () => {
    const onSelect = jest.fn();
    act(() =>
      root.render(
        <Board
          board={INITIAL_BOARD}
          legalMoves={[
            [2, 3],
            [3, 2],
          ]}
          onSelect={onSelect}
          turn="black"
        />,
      ),
    );
    expect(container.querySelectorAll('button')).toHaveLength(64);
    expect(square('d4')).toHaveAccessibleName('d4: White disk');
    expect(square('e4')).toHaveAccessibleName('e4: Black disk');
    expect(square('d3')).toHaveAccessibleName('d3: empty, legal move');
    expect(square('a1')).toHaveAccessibleName('a1: empty');
    expect(square('d3')).toBeEnabled();
    expect(square('a1')).toBeDisabled();
    expect(square('d4')).toBeDisabled();
    act(() => square('d3').click());
    expect(onSelect).toHaveBeenCalledWith(2, 3);
    act(() => square('a1').click());
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('offers no moves to someone who cannot play', () => {
    act(() => root.render(<Board board={INITIAL_BOARD} legalMoves={[[2, 3]]} turn="black" />));
    expect(container.querySelectorAll('button:not([disabled])')).toHaveLength(0);
    expect(square('d3')).toHaveAccessibleName('d3: empty');
  });

  it('marks the last move', () => {
    const lastMove: ReversiLastMove = {column: 3, flipped: [[3, 3]], passed: null, row: 2, side: 'black'};
    const board = ['........', '........', '...b....', '...bb...', '...bw...', '........', '........', '........'];
    act(() => root.render(<Board board={board} lastMove={lastMove} />));
    expect(square('d3')).toHaveAccessibleName('d3: Black disk, last move');
  });
});
