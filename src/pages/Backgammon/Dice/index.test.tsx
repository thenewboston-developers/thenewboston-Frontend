import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import Dice from './index';

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

it('shows a pending roll without inventing a result', () => {
  act(() => root.render(<Dice dice={[]} rolling />));
  expect(container.querySelector('[aria-label="Rolling dice"]')).toHaveAttribute('aria-busy', 'true');
  expect(container.querySelectorAll('[aria-label="Rolling die"]')).toHaveLength(2);
  expect(container.querySelector('[aria-label="Die 0"]')).toBeNull();
});

it('keeps the server result and tracks each of the four uses of doubles', () => {
  act(() => root.render(<Dice dice={[4, 4]} moves={[{from: 12, to: 8, die: 4}]} />));
  expect(container.querySelectorAll('[role="img"]')).toHaveLength(4);
  expect(container.querySelectorAll('[aria-label="Die 4, used"]')).toHaveLength(1);
  expect(container.querySelectorAll('[aria-label="Die 4"]')).toHaveLength(3);
});

it('labels completed opponent dice separately from the current player turn', () => {
  act(() => root.render(<Dice animate dice={[3, 6]} label="Computer’s last roll" rollKey="turn-1-5" />));
  expect(container.textContent).toContain('Computer’s last roll');
  expect(container.querySelector('[aria-label="Die 3"]')).toHaveAttribute('data-rolling', 'true');
  expect(container.querySelector('[aria-label="Die 6"]')).toBeInTheDocument();
});
