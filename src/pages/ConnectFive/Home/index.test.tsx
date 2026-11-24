import {act, ReactNode} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {
  getConnectFiveChallenges,
  getConnectFiveEloSnapshots,
  getConnectFiveLeaderboard,
  getConnectFiveMatches,
} from 'api/connectFive';
import {useIsAuthenticated} from 'hooks';

import Home from './index';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/connectFive', () => ({
  getConnectFiveChallenges: jest.fn(),
  getConnectFiveEloSnapshots: jest.fn(),
  getConnectFiveLeaderboard: jest.fn(),
  getConnectFiveMatches: jest.fn(),
}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('./TopEarners', () => () => <div>Top earners</div>);
jest.mock('components/AuthButtons', () => () => <div>Sign in</div>);
jest.mock('components/UserSearchInput', () => () => <div>Find a member</div>);
jest.mock('utils/toasts', () => ({displayErrorToast: jest.fn()}));
jest.mock(
  './ComputerSetup',
  () =>
    ({children}: {children: (controls: {isCreating: boolean; onPlay: () => void; panel: ReactNode}) => ReactNode}) =>
      children({isCreating: false, onPlay: () => undefined, panel: <div>Computer setup</div>}),
);

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let completedMatches: object[];
let container: HTMLDivElement;
let root: Root;
let selfId: number;
const dispatch = jest.fn();
const privateMatch = {
  id: 99,
  mode: 'computer',
  status: 'active',
  player_a: {id: 11, username: 'Alice'},
  player_b: null,
  created_date: new Date(),
  difficulty: 'normal',
};
const finishedMatch = (id: number, overrides: object) => ({
  ...privateMatch,
  created_date: new Date(2026, 10, id),
  id,
  status: 'finished_connect5',
  winner: null,
  winner_side: null,
  ...overrides,
});
const emptyPage = {results: [], count: 0, next: null, previous: null};
const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Home />
      </MemoryRouter>,
    ),
  );
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  completedMatches = [];
  selfId = 11;
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({
      self: {id: selfId, username: 'Member', avatar: null},
      connectFive: {
        activeMatches: [privateMatch],
        completedMatches,
        incomingChallenges: [],
        outgoingChallenges: [],
      },
    }),
  );
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (getConnectFiveChallenges as jest.Mock).mockResolvedValue(emptyPage);
  (getConnectFiveEloSnapshots as jest.Mock).mockResolvedValue([]);
  (getConnectFiveLeaderboard as jest.Mock).mockResolvedValue(emptyPage);
  (getConnectFiveMatches as jest.Mock).mockResolvedValue(emptyPage);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('discards deferred private matches from an old viewer and filters cached matches for the current account', async () => {
  let resolveOld: (value: unknown) => void = () => undefined;
  (getConnectFiveMatches as jest.Mock).mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolveOld = resolve;
      }),
  );
  await render();
  selfId = 22;
  await render();
  expect(container.querySelector('[aria-label="Open match 99"]')).toBeNull();
  dispatch.mockClear();
  await act(async () => resolveOld({...emptyPage, results: [privateMatch]}));
  expect(dispatch).not.toHaveBeenCalled();
  expect(container.querySelector('[aria-label="Open match 99"]')).toBeNull();
});

it('puts the challenge form next to the computer panel and explains the stake as it is typed', async () => {
  await render();
  const deck = container.querySelector('#challenge-player')!.closest('section')!.parentElement!;
  expect(deck).toHaveTextContent('Computer setup');
  expect(container.querySelector('#challenge-time-600')).toBeChecked();
  expect(container).toHaveTextContent('Set the stake to 0 for a friendly match');

  const stake = container.querySelector('#challenge-stakeAmount') as HTMLInputElement;
  const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
  await act(async () => {
    valueSetter.call(stake, '1500');
    stake.dispatchEvent(new Event('input', {bubbles: true}));
  });
  expect(container).toHaveTextContent('1,500 TNB locks when you send, and your opponent matches it to accept.');
});

it("shows a member's last five finished games as stones, oldest first", async () => {
  completedMatches = [
    finishedMatch(1, {status: 'cancelled'}),
    finishedMatch(2, {winner_side: 'b'}),
    finishedMatch(3, {winner: 11, winner_side: 'a'}),
    finishedMatch(4, {mode: 'human', player_b: {id: 30, username: 'Bob'}, winner: 30}),
  ];
  await render();
  const stones = Array.from(
    container.querySelectorAll('[aria-label="Last five games, oldest first"] [role="listitem"]'),
  );
  expect(stones.map((stone) => stone.getAttribute('aria-label'))).toEqual([
    'Lost',
    'Won',
    'Lost',
    'Not played',
    'Not played',
  ]);
});

it('leaves the match history uncounted, since it only holds the first page of matches', async () => {
  completedMatches = [finishedMatch(1, {winner_side: 'b'}), finishedMatch(2, {winner: 11, winner_side: 'a'})];
  await render();
  const history = container.querySelector('[aria-labelledby="match-history-heading"]')!;
  expect(history.querySelector('#match-history-heading')!.parentElement).toHaveTextContent(/^Match history$/);
  expect(history.querySelectorAll('[aria-label^="Open match"]')).toHaveLength(2);
});

it('invites visitors to create an account next to the computer panel', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  await render();
  expect(container.querySelector('#challenge-player')).toHaveTextContent('Challenge a player');
  expect(container).toHaveTextContent('Sign in');
  expect(container).toHaveTextContent('Find your opponent');
  expect(container.querySelector('#challenge-stakeAmount')).toBeNull();
  expect(container.querySelector('#player-record-title')).toBeNull();
});
