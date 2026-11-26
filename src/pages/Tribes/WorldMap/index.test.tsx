import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {TribesState} from 'types/tribes';

import WorldMap from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const tribe = {
  color: '#43654b',
  emblem: '🐺',
  id: 1,
  members: [],
  name: 'Iron Wolves',
} as unknown as TribesState['tribes'][0];
const state = {
  catalog: {defenses: {barricade: 30}, units: {catapult: {damage: 80, range: 2}}},
  jobs: [],
  plots: [
    {buildings: ['workshop'], id: 1, price: 0, terrain: 'plains', tribe_id: 1, x: 0, y: 0},
    {buildings: [], id: 2, price: 40, terrain: 'forest', tribe_id: null, x: 1, y: 0},
    {buildings: [], id: 3, price: 60, terrain: 'iron_deposit', tribe_id: null, x: 0, y: 1},
    {buildings: [], id: 4, price: 50, terrain: 'coal_deposit', tribe_id: null, x: 2, y: 0},
  ],
  season: {id: 1},
  tribes: [tribe],
  units: [{controller_id: 7, id: 10, item: 'catapult', plot_id: 1, quantity: 2, tribe_id: 1, valid_target_ids: []}],
} as unknown as TribesState;
const plot = (id: number) => container.querySelector(`[data-plot="${id}"]`) as HTMLButtonElement;
const press = async (element: HTMLElement, key: string) =>
  act(async () => element.dispatchEvent(new KeyboardEvent('keydown', {bubbles: true, key})));

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('names every plot for assistive technology and reports the chosen plot', async () => {
  const handleSelect = jest.fn();
  await act(async () => root.render(<WorldMap onSelect={handleSelect} selectedId={1} state={state} tribe={tribe} />));
  expect(plot(1)).toHaveAttribute('aria-label', 'Plains (1, 1) · Iron Wolves · 0 TNB');
  expect(plot(2)).toHaveAttribute('aria-label', 'Forest (2, 1) · Unowned · 40 TNB');
  expect(plot(1)).toHaveAttribute('aria-pressed', 'true');
  await act(async () => plot(2).click());
  expect(handleSelect).toHaveBeenCalledWith(2);
});

it('keeps one plot in the tab order and moves between neighbors with the arrow keys', async () => {
  await act(async () => root.render(<WorldMap selectedId={1} state={state} tribe={tribe} />));
  expect(
    Array.from(container.querySelectorAll('[data-plot]')).filter((entry) => entry.getAttribute('tabindex') === '0'),
  ).toHaveLength(1);
  await act(async () => plot(1).focus());
  await press(plot(1), 'ArrowRight');
  expect(document.activeElement).toBe(plot(2));
  await press(plot(2), 'ArrowRight');
  expect(document.activeElement).toBe(plot(4));
  await press(plot(4), 'ArrowDown');
  expect(document.activeElement).toBe(plot(4));
  await press(plot(4), 'ArrowLeft');
  await press(plot(2), 'ArrowLeft');
  await press(plot(1), 'ArrowDown');
  expect(document.activeElement).toBe(plot(3));
});

it('offers land next to the tribe for expansion and shows the reach of a weapon', async () => {
  await act(async () =>
    root.render(<WorldMap canExpand ranges={[{plotId: 1, radius: 2}]} selectedId={1} state={state} tribe={tribe} />),
  );
  // Plots 2 and 3 touch the tribe's land; plot 4 is two steps away
  expect(container.querySelectorAll('.hint')).toHaveLength(2);
  expect(container.querySelector('path[stroke-dasharray="9 7"]')).not.toBeNull();
  expect(container.querySelector('svg')).toHaveTextContent('160');
});
