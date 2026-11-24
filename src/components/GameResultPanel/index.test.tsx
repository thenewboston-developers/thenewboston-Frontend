import {act} from 'react';
import {createRoot} from 'react-dom/client';

import GameResultPanel, {GameResultActions, GameResultOutcome, getGameResultOutcome} from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

it.each([
  ['host', 'host', 'win'],
  ['guest', 'host', 'loss'],
  [null, 'host', 'draw'],
  ['host', null, 'complete'],
  [null, undefined, 'complete'],
  [0, 0, 'win'],
])('classifies winner %s for viewer %s as %s', (winner, viewer, outcome) => {
  expect(getGameResultOutcome(winner, viewer)).toBe(outcome);
});

it.each<GameResultOutcome>(['win', 'loss', 'draw', 'complete'])(
  'announces the %s result without changing the original title, reason, or actions',
  (outcome) => {
    const container = document.createElement('div');
    const onReplay = jest.fn();
    const root = createRoot(container);
    act(() =>
      root.render(
        <GameResultPanel description="All five ships sunk" game="Battleship" outcome={outcome} title="Alice wins">
          <p>20 TNB prize paid to Alice.</p>
          <GameResultActions>
            <button onClick={onReplay} type="button">
              Play again
            </button>
          </GameResultActions>
        </GameResultPanel>,
      ),
    );
    const heading = container.querySelector('h2')!;
    expect(container.querySelector('section')).toHaveAttribute('aria-labelledby', heading.id);
    expect(heading).toHaveTextContent('Alice wins');
    expect(container.querySelector('[role="status"]')).toHaveTextContent('All five ships sunk');
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(container).toHaveTextContent('20 TNB prize paid to Alice.');
    expect(container.textContent?.includes('Victory')).toBe(outcome === 'win');
    act(() => container.querySelector('button')!.click());
    expect(onReplay).toHaveBeenCalledTimes(1);
    act(() => root.unmount());
  },
);

it('shows named scores and the declared winner, including a win with fewer points after resignation', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() =>
    root.render(
      <GameResultPanel
        outcome="loss"
        scoreLabel="Boxes claimed"
        scores={[
          {label: 'You', value: 13},
          {label: 'Computer', value: 3, winner: true},
        ]}
        title="Computer wins the match"
      >
        <p>Match ended by resignation.</p>
      </GameResultPanel>,
    ),
  );
  const scoreboard = container.querySelector('[aria-label="Boxes claimed"]')!;
  expect(scoreboard).toHaveTextContent('You13ComputerWinner3');
  expect(scoreboard.querySelector('[aria-hidden="true"]')).toHaveTextContent('');
  expect(container).not.toHaveTextContent('Victory');
  act(() => root.unmount());
});

it('handles a scoreless draw without inventing a winner or an invalid score share', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() =>
    root.render(
      <GameResultPanel
        outcome="draw"
        scores={[
          {label: 'Blue', value: 0},
          {label: 'Red', value: 0},
        ]}
        title="Draw"
      >
        <p>Stakes refunded.</p>
      </GameResultPanel>,
    ),
  );
  expect(container.querySelector('[aria-label="Final score"]')).toHaveTextContent('Blue0Red0');
  expect(container).not.toHaveTextContent('Winner');
  expect(container.querySelector('[style]')).toHaveStyle({width: '50%'});
  act(() => root.unmount());
});

it('shows a game’s own artwork in place of the default crest', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  act(() =>
    root.render(
      <GameResultPanel artwork={<svg aria-hidden="true" data-testid="naval-crest" />} outcome="win" title="Alice wins">
        <p>Fleet sunk.</p>
      </GameResultPanel>,
    ),
  );
  expect(container.querySelectorAll('svg')).toHaveLength(1);
  expect(container.querySelector('[data-testid="naval-crest"]')).not.toBeNull();
  act(() => root.unmount());
});
