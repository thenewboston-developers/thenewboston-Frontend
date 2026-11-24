import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getCheckersMatch, performCheckersAction} from 'api/checkers';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {CheckersMatch} from 'types/checkers';
import {isCurrentGuestGame} from 'utils/guestGames';

import Match from './Match';
import {INITIAL_BOARD} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/checkers', () => ({getCheckersMatch: jest.fn(), performCheckersAction: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('utils/guestGames', () => ({isCurrentGuestGame: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({matchId: mockMatchId}),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let match: CheckersMatch;
let root: Root;
let selfId: number;
let mockMatchId = '1';
const dispatch = jest.fn(() => Promise.resolve());

const button = (label: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll('button')).find((element) => element.textContent === label);
  if (!found) throw new Error(`Button not found: ${label}`);
  return found;
};

const renderMatch = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Match />
      </MemoryRouter>,
    );
  });
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  selfId = 11;
  (isCurrentGuestGame as jest.Mock).mockReturnValue(false);
  mockMatchId = '1';
  dispatch.mockImplementation(() => Promise.resolve());
  match = {
    id: 1,
    mode: 'human',
    difficulty: 'normal',
    white: {id: 11, username: 'Alice', avatar: null},
    black: {id: 12, username: 'Bob', avatar: null},
    your_side: 'white',
    computer_name: null,
    status: 'active',
    stake_amount: 10,
    prize_pool_total: 20,
    version: 4,
    time_limit_seconds: 900,
    clock_white_ms: 900000,
    clock_black_ms: 900000,
    active_side: 'white',
    turn_started_at: new Date().toISOString(),
    expires_at: null,
    server_time: new Date().toISOString(),
    created_date: new Date().toISOString(),
    finished_at: null,
    winner: null,
    result_reason: '',
    rematch_of: null,
    board: [...INITIAL_BOARD],
    legal_moves: [
      [40, 33],
      [42, 33],
      [42, 35],
    ],
    last_move: null,
  };
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({checkers: {matchesById: {[match.id]: match}}, self: {id: selfId}}),
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getAllUserWallets as jest.Mock).mockReturnValue(() => Promise.resolve());
  (getCheckersMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (performCheckersAction as jest.Mock).mockImplementation(() => Promise.resolve({...match, version: 5}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

describe('Checkers match interaction', () => {
  it('previews a legal move and requires confirmation before committing it', async () => {
    await renderMatch();
    expect(button('Confirm move')).toBeDisabled();
    act(() => (container.querySelector('[aria-label="a3: white man"]') as HTMLButtonElement).click());
    act(() => (container.querySelector('[aria-label="b4: empty, legal destination"]') as HTMLButtonElement).click());
    expect(container.querySelector('[aria-label="b4: white man, selected"]')).toBeInTheDocument();
    expect(performCheckersAction).not.toHaveBeenCalled();
    await act(async () => button('Confirm move').click());
    expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [40, 33]});
  });

  it('requires the complete mandatory multi-jump chain and lets the player undo a preview step', async () => {
    match.board = Array(64).fill(0);
    match.board[42] = 1;
    match.board[35] = -1;
    match.board[21] = -1;
    match.legal_moves = [[42, 28, 14]];
    await renderMatch();
    expect(container.textContent).toContain('Capture required');
    act(() => (container.querySelector('[aria-label="c3: white man"]') as HTMLButtonElement).click());
    act(() => (container.querySelector('[aria-label="e5: empty, legal destination"]') as HTMLButtonElement).click());
    expect(button('Confirm move')).toBeDisabled();
    expect(container.textContent).toContain('Keep jumping');
    expect(container.querySelector('[aria-label="d4: empty"]')).toBeInTheDocument();
    act(() => (container.querySelector('[aria-label="g7: empty, legal destination"]') as HTMLButtonElement).click());
    expect(button('Confirm move')).toBeEnabled();
    act(() => button('Undo').click());
    expect(button('Confirm move')).toBeDisabled();
    act(() => (container.querySelector('[aria-label="g7: empty, legal destination"]') as HTMLButtonElement).click());
    await act(async () => button('Confirm move').click());
    expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [42, 28, 14]});
  });

  it('allows a king to finish a capture loop on its original square', async () => {
    match.board = Array(64).fill(0);
    match.board[42] = 2;
    [33, 17, 19, 35].forEach((index) => {
      match.board[index] = -1;
    });
    match.legal_moves = [[42, 24, 10, 28, 42]];
    await renderMatch();
    const renderedContainer = container;
    for (const label of [
      'c3: white king',
      'a5: empty, legal destination',
      'c7: empty, legal destination',
      'e5: empty, legal destination',
      'c3: empty, legal destination',
    ]) {
      act(() => (renderedContainer.querySelector(`[aria-label="${label}"]`) as HTMLButtonElement).click());
    }
    expect(button('Confirm move')).toBeEnabled();
    await act(async () => button('Confirm move').click());
    expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [42, 24, 10, 28, 42]});
  });

  it('prevents moves on the opponent turn and offers no controls to spectators', async () => {
    match.active_side = 'black';
    await renderMatch();
    expect(button('Confirm move')).toBeDisabled();
    expect(
      Array.from(container.querySelectorAll('[role="group"] button')).every(
        (element) => (element as HTMLButtonElement).disabled,
      ),
    ).toBe(true);
    match.your_side = null;
    selfId = 99;
    await renderMatch();
    expect(container.querySelector('[role="group"]')).toBeInTheDocument();
    expect(container.textContent).toContain('You are watching this match');
    expect(container.textContent).not.toContain('Resign match');
    expect(container.textContent).not.toContain('Confirm move');
  });

  it('shows the stake and resulting prize before the invitee accepts', async () => {
    match.status = 'pending';
    match.your_side = 'black';
    selfId = 12;
    match.expires_at = new Date(Date.now() + 300000).toISOString();
    await renderMatch();
    expect(container.textContent).toContain('20 TNB');
    await act(async () => button('Accept · 10 TNB').click());
    expect(performCheckersAction).toHaveBeenCalledWith(match, 'accept', {});
  });

  it('does not show a cached participant snapshot to another account', async () => {
    selfId = 99;
    await renderMatch();
    expect(container.querySelector('[role="group"]')).toBeNull();
    expect(container.textContent).not.toContain('Alice');
  });

  it('discards a pending action response after switching accounts', async () => {
    let resolveAction: (data: CheckersMatch) => void = () => undefined;
    (performCheckersAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    await renderMatch();
    act(() => (container.querySelector('[aria-label="a3: white man"]') as HTMLButtonElement).click());
    act(() => (container.querySelector('[aria-label="b4: empty, legal destination"]') as HTMLButtonElement).click());
    act(() => button('Confirm move').click());
    selfId = 99;
    await renderMatch();
    dispatch.mockClear();
    await act(async () => resolveAction({...match, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(container.querySelector('[role="group"]')).toBeNull();
  });

  it('releases the previous match action lock when navigating to another board', async () => {
    let resolveAction: (data: CheckersMatch) => void = () => undefined;
    (performCheckersAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    await renderMatch();
    act(() => (container.querySelector('[aria-label="a3: white man"]') as HTMLButtonElement).click());
    act(() => (container.querySelector('[aria-label="b4: empty, legal destination"]') as HTMLButtonElement).click());
    act(() => button('Confirm move').click());
    const previous = match;
    match = {...match, id: 2};
    mockMatchId = '2';
    await renderMatch();
    act(() => (container.querySelector('[aria-label="a3: white man"]') as HTMLButtonElement).click());
    act(() => (container.querySelector('[aria-label="b4: empty, legal destination"]') as HTMLButtonElement).click());
    expect(button('Confirm move')).toBeEnabled();
    dispatch.mockClear();
    await act(async () => resolveAction({...previous, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(button('Confirm move')).toBeEnabled();
  });

  it.each([4, 5])(
    'ignores a delayed version %i poll after a newer action snapshot, including clock effects',
    async (staleVersion) => {
      jest.useFakeTimers();
      const initialTime = Date.now();
      match.server_time = new Date(initialTime).toISOString();
      match.turn_started_at = new Date(initialTime).toISOString();
      await renderMatch();
      let resolvePoll: (data: CheckersMatch) => void = () => undefined;
      (getCheckersMatch as jest.Mock).mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolvePoll = resolve;
          }),
      );
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
      const stale = {...match, version: staleVersion, server_time: new Date(Date.now()).toISOString()};
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
      (performCheckersAction as jest.Mock).mockImplementationOnce(() => {
        match = {...match, version: 5, active_side: 'black', server_time: new Date(Date.now()).toISOString()};
        return Promise.resolve(match);
      });
      act(() => (container.querySelector('[aria-label="a3: white man"]') as HTMLButtonElement).click());
      act(() => (container.querySelector('[aria-label="b4: empty, legal destination"]') as HTMLButtonElement).click());
      await act(async () => button('Confirm move').click());
      expect(container.querySelector('[aria-label="Bob clock"]')).toHaveTextContent('14:56');
      dispatch.mockClear();
      await act(async () => resolvePoll(stale));
      expect(dispatch).not.toHaveBeenCalled();
      expect(container.querySelector('[aria-label="Bob clock"]')).toHaveTextContent('14:56');
    },
  );

  it('stops polling terminal matches and refreshes the wallet after settlement', async () => {
    jest.useFakeTimers();
    match.status = 'finished';
    match.winner = 'white';
    match.result_reason = 'no_moves';
    await renderMatch();
    await act(async () => {
      jest.advanceTimersByTime(10000);
    });
    expect(getCheckersMatch).toHaveBeenCalledTimes(1);
    expect(getAllUserWallets).toHaveBeenCalled();
    expect(container.textContent).toContain('20 TNB prize paid to Alice.');
  });
});

it('lets a guest complete a legal move without requesting a wallet', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  selfId = 0;
  match.guest_mode = true;
  match.mode = 'computer';
  match.white = {id: 0, username: 'Guest', avatar: null};
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  await renderMatch();
  act(() => (container.querySelector('[aria-label="a3: white man"]') as HTMLButtonElement).click());
  act(() => (container.querySelector('[aria-label="b4: empty, legal destination"]') as HTMLButtonElement).click());
  await act(async () => button('Confirm move').click());
  expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [40, 33]});
  expect(getAllUserWallets).not.toHaveBeenCalled();
});

it('invites a winning guest to create an account and lets them play again', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  selfId = 0;
  match.guest_mode = true;
  match.mode = 'computer';
  match.white = {id: 0, username: 'Guest', avatar: null};
  match.status = 'finished';
  match.winner = 'white';
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  match.computer_reward = {status: 'guest', amount: 10, currency: 'TNB'};
  await renderMatch();
  expect(container).toHaveTextContent('this win would have earned you 10 coins');
  expect(container.querySelector('a[href="/create-account?next=%2Fgames"]')).not.toBeNull();
  await act(async () => button('Play again').click());
  expect(performCheckersAction).toHaveBeenCalledWith(match, 'rematch', {});
  expect(getAllUserWallets).not.toHaveBeenCalled();
});

it('does not reveal a cached board owned by another guest session', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(false);
  match.guest_mode = true;
  match.mode = 'computer';
  await renderMatch();
  expect(container.querySelector('[role="group"]')).toBeNull();
  expect(container).not.toHaveTextContent('Confirm move');
});

it('preserves signed-out spectator access without participant controls', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  match.your_side = null;
  await renderMatch();
  expect(container.querySelector('[role="group"]')).not.toBeNull();
  expect(container).toHaveTextContent('You are watching this match');
  expect(container).not.toHaveTextContent('Confirm move');
});
