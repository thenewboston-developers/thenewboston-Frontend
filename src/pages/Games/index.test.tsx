import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import Games from './index';

jest.mock('components/GameFund', () => () => <section>Board-game reward fund</section>);
jest.mock('utils/analytics', () => ({captureAnalyticsEvent: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;

beforeEach(async () => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Games />
      </MemoryRouter>,
    ),
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('uses thumbnail cards and canonical game links in a separately labeled TNB wager section', () => {
  const casino = container.querySelector('[aria-labelledby="casino-games-heading"]')!;
  expect(casino).toHaveTextContent('6 games · TNB wagers');
  const videoPoker = casino.querySelector('a[href="/video-poker/home"]')!;
  expect(videoPoker.querySelector('img')).toHaveAttribute('src', 'video-poker-thumbnail.webp');
  expect(videoPoker).toHaveTextContent('JACKS OR BETTER');
  expect(videoPoker).toHaveAttribute('data-ph-capture-attribute-click_target', 'video_poker');
  const letItRide = casino.querySelector('a[href="/let-it-ride/home"]')!;
  expect(letItRide.querySelector('img')).toHaveAttribute('src', 'let-it-ride-thumbnail.webp');
  expect(letItRide).toHaveTextContent('UP TO 100 TO 1');
  expect(letItRide).toHaveAttribute('data-ph-capture-attribute-click_target', 'let_it_ride');
  const blackjack = casino.querySelector('a[href="/blackjack/home"]')!;
  expect(blackjack.querySelector('img')).toHaveAttribute('src', 'blackjack-thumbnail.webp');
  expect(blackjack).toHaveTextContent('BLACKJACK PAYS 3:2');
  const plinko = casino.querySelector('a[href="/plinko/home"]')!;
  expect(plinko.querySelector('img')).toHaveAttribute('src', 'plinko-thumbnail.webp');
  expect(plinko).toHaveTextContent('UP TO 50× TOTAL RETURN');
  const slots = casino.querySelector('a[href="/slots/home"]')!;
  const roulette = casino.querySelector('a[href="/roulette/home"]')!;
  expect(slots.querySelector('img')).toHaveAttribute('src', 'slots-thumbnail.webp');
  expect(roulette.querySelector('img')).toHaveAttribute('src', 'roulette-thumbnail.webp');
  expect(slots.querySelector('img')).toHaveAttribute('width', '900');
  expect(roulette.querySelector('img')).toHaveAttribute('height', '600');
  expect(slots).toHaveTextContent('UP TO 100× TOTAL RETURN');
  expect(slots).toHaveTextContent('TNB wagers');
  expect(roulette).toHaveTextContent('TNB wagers');
  expect(casino).not.toHaveTextContent('Free');
  expect(casino).not.toHaveTextContent('Multiplayer');
});

it('preserves free board-game cards and keeps the reward fund distinct', () => {
  const boards = container.querySelector('[aria-labelledby="featured-game-heading"]')!;
  expect(boards).toHaveTextContent('8 games · Free to play');
  expect(boards.querySelectorAll('a')).toHaveLength(8);
  expect(boards.querySelector('a[href="/hex/home"]')).not.toBeNull();
  expect(container).toHaveTextContent('Board-game reward fund');
});

it('offers Tribes as weekly multiplayer with an actual TNB economy', () => {
  const section = container.querySelector('[aria-labelledby="tribes-game-heading"]')!;
  const card = section.querySelector('a[href="/tribes/home"]')!;
  expect(card).toHaveTextContent('7-day seasons');
  expect(card).toHaveTextContent('Uses your app wallet');
  expect(card).not.toHaveTextContent('vs. Computer');
  expect(card).not.toHaveTextContent('Free');
});
