import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import {ConnectFiveMatch} from 'types';

import ResultModal from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let modal: HTMLDivElement;
let root: Root;
let match: ConnectFiveMatch;
let selfId: number;
const onRematchAccept = jest.fn();
const onRematchRequest = jest.fn();

const renderResult = async (requestedByOpponent = false) => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <ResultModal
          canRequestRematch
          isOpen
          isRematchSubmitting={false}
          match={match}
          onClose={jest.fn()}
          onRematchAccept={onRematchAccept}
          onRematchCancel={jest.fn()}
          onRematchDecline={jest.fn()}
          onRematchRequest={onRematchRequest}
          rematchAction={null}
          rematchViewState={requestedByOpponent ? 'requestedByOpponent' : 'idle'}
          resultOutcomeLabel={null}
          resultTnbDelta={20}
          selfId={selfId}
          showInsufficientFunds={false}
          tnbDeltaTarget={selfId === 99 ? null : 20}
        />
      </MemoryRouter>,
    );
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  modal = document.createElement('div');
  modal.id = 'modal-root';
  document.body.appendChild(modal);
  root = createRoot(container);
  selfId = 11;
  match = {
    id: 1,
    mode: 'human',
    player_a: {id: 11, username: 'Alice'},
    player_b: {id: 12, username: 'Bob'},
    player_a_elo_before: 1200,
    player_a_elo_after: 1216,
    player_b_elo_before: 1200,
    player_b_elo_after: 1184,
    status: 'finished_connect5',
    winner: 11,
  } as ConnectFiveMatch;
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  modal.remove();
});

it.each([
  [11, 'win'],
  [12, 'loss'],
  [99, 'complete'],
] as const)('presents the correct human result for viewer %s', async (viewer, outcome) => {
  selfId = viewer;
  await renderResult();
  expect(modal.querySelector('[data-outcome]')).toHaveAttribute('data-outcome', outcome);
  expect(modal).toHaveTextContent('Five in a row');
  expect(modal.textContent?.includes('Your ELO')).toBe(viewer !== 99);
  expect(modal.textContent?.includes('Rematch')).toBe(viewer !== 99);
  expect(modal.textContent?.includes('+20 TNB')).toBe(viewer !== 99);
  expect(modal.textContent?.includes('1216')).toBe(viewer === 11);
  expect(modal.textContent?.includes('1184')).toBe(viewer === 12);
  expect(modal.textContent?.includes('You won!')).toBe(viewer === 11);
});

it('labels a full-board draw without victory graphics', async () => {
  match.status = 'finished_full_board';
  match.winner = null;
  await renderResult();
  expect(modal.querySelector('[data-outcome]')).toHaveAttribute('data-outcome', 'draw');
  expect(modal).toHaveTextContent('The board is full');
  expect(modal).toHaveTextContent('It’s a draw');
});

it('keeps accepting a rematch available from the result dialog', async () => {
  await renderResult(true);
  expect(modal).toHaveTextContent('Opponent wants a rematch');
  const accept = Array.from(modal.querySelectorAll('button')).find((button) => button.textContent === 'Accept');
  expect(accept).toBeEnabled();
  act(() => accept?.click());
  expect(onRematchAccept).toHaveBeenCalledTimes(1);
});
