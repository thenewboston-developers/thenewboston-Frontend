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
