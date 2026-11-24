import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {Shot} from 'types/battleship';

import Board from './Board';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
const onSelect = jest.fn();

const render = (shots: Shot[]) => {
  act(() => root.render(<Board label="Target waters" onSelect={onSelect} shots={shots} />));
};

beforeEach(() => {
  jest.useFakeTimers();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it('does not replay historical shots when opening a board', () => {
  render([{row: 0, column: 0, result: 'hit'}]);
  expect(container.querySelector('[data-shot-effect]')).toBeNull();
  expect(container.querySelector('[aria-label="A1: hit"]')).toBeDisabled();
});

it.each(['hit', 'miss', 'sunk'] as const)(
  'animates and announces a new %s once, with no replay on polling',
  (result) => {
    render([]);
    const shot = {row: 1, column: 2, result};
    render([shot]);
    expect(container.querySelector(`[data-shot-effect="${result}"]`)).not.toBeNull();
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('B3');
    act(() => jest.advanceTimersByTime(1500));
    expect(container.querySelector('[data-shot-effect]')).toBeNull();
    render([{...shot}]);
    expect(container.querySelector('[data-shot-effect]')).toBeNull();
    expect(container.querySelector('[aria-label="B3: ' + result + '"]')).toBeDisabled();
  },
);

it('keeps targets as native labeled buttons for keyboard and touch activation', () => {
  render([]);
  const target = container.querySelector('[aria-label="C4: water"]') as HTMLButtonElement;
  expect(target.tagName).toBe('BUTTON');
  expect(target.type).toBe('button');
  act(() => target.click());
  expect(onSelect).toHaveBeenCalledWith({row: 2, column: 3});
});
