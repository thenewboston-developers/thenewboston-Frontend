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
jest.mock('hooks/useArcadeSounds', () => () => ({
  playSound: mockPlaySound,
  soundEnabled: false,
  toggleSound: jest.fn(),
  unlockSound: jest.fn(),
}));
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
const mockPlaySound = jest.fn();

const button = (label: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll('button')).find((element) => element.textContent === label);
  if (!found) throw new Error(`Button not found: ${label}`);
  return found;
};

const cell = (label: string): HTMLButtonElement => {
  const found = container.querySelector(`[aria-label="${label}"]`);
  if (!found) throw new Error(`Square not found: ${label}`);
  return found as HTMLButtonElement;
};

const cellName = (index: number): string => `${String.fromCharCode(97 + (index % 8))}${8 - Math.floor(index / 8)}`;

const click = (label: string) => act(() => cell(label).click());

// An action that is still in flight
const neverSettles = () => new Promise(() => {});

const pointer = (type: string, target: Element, clientX: number, clientY: number, pointerType: string) => {
  const event = new MouseEvent(type, {bubbles: true, button: 0, cancelable: true, clientX, clientY});
  Object.defineProperties(event, {pointerId: {value: 1}, pointerType: {value: pointerType}});
  target.dispatchEvent(event);
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

it.each(['human', 'computer', 'guest'])('sounds fresh Checkers moves once for %s play', async (mode) => {
  jest.useFakeTimers();
  if (mode !== 'human') {
    match.mode = 'computer';
    match.black = null;
  }
  if (mode === 'guest') {
    match.guest_mode = true;
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  }
  await renderMatch();
  expect(container.querySelector('[aria-label="Game sound"]')).toHaveAttribute('aria-pressed', 'false');
  expect(mockPlaySound).not.toHaveBeenCalled();
  match = {...match, version: 5, last_move: {side: 'white', path: [40, 33], captured: []}};
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound.mock.calls).toEqual([['move', 0]]);
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).toHaveBeenCalledTimes(1);
});

it('sounds a capture, promotion and live win without replaying a finished Checkers board', async () => {
  jest.useFakeTimers();
  match.board = Array(64).fill(0);
  match.board[17] = 1;
  match.board[10] = -1;
  await renderMatch();
  const board = [...match.board];
  board[17] = 0;
  board[10] = 0;
  board[3] = 2;
  match = {
    ...match,
    board,
    version: 5,
    last_move: {side: 'white', path: [17, 3], captured: [10]},
    status: 'finished',
    winner: 'white',
  };
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound.mock.calls).toEqual([
    ['capture', 0],
    ['promote', 160],
    ['win', 320],
  ]);
  await renderMatch();
  expect(mockPlaySound).toHaveBeenCalledTimes(3);
});

it('does not sound Checkers history after a failed poll reconnects', async () => {
  jest.useFakeTimers();
  await renderMatch();
  (getCheckersMatch as jest.Mock).mockRejectedValueOnce(new Error('Offline'));
  await act(async () => jest.advanceTimersByTime(2000));
  match = {...match, version: 5, last_move: {side: 'white', path: [40, 33], captured: []}};
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).not.toHaveBeenCalled();
});

describe('Checkers match interaction', () => {
  it('plays a simple move as soon as its landing is chosen, without a confirmation step', async () => {
    (performCheckersAction as jest.Mock).mockReturnValue(neverSettles());
    await renderMatch();
    expect(container.textContent).not.toContain('Confirm move');
    click('a3: white man');
    expect(container.querySelector('[aria-label="a3: white man, selected"]')).toBeInTheDocument();
    expect(performCheckersAction).not.toHaveBeenCalled();
    await act(async () => cell('b4: empty, legal destination').click());
    expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [40, 33]});
    expect(container.querySelector('[aria-label="b4: white man, selected"]')).toBeInTheDocument();
    expect(container.textContent).toContain('Playing your move');
  });

  it('deselects a piece when it is clicked again', async () => {
    await renderMatch();
    click('a3: white man');
    click('a3: white man, selected');
    expect(container.querySelector('[aria-label="a3: white man"]')).toBeInTheDocument();
    expect(container.querySelector('[aria-label="b4: empty, legal destination"]')).toBeNull();
  });

  it('waits for the complete mandatory multi-jump chain and lets the player undo a jump', async () => {
    match.board = Array(64).fill(0);
    match.board[42] = 1;
    match.board[35] = -1;
    match.board[21] = -1;
    match.legal_moves = [[42, 28, 14]];
    await renderMatch();
    expect(container.textContent).toContain('Capture required');
    click('c3: white man');
    click('e5: empty, legal destination');
    expect(performCheckersAction).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Keep jumping');
    expect(container.querySelector('[aria-label="d4: empty"]')).toBeInTheDocument();
    act(() => button('Undo jump').click());
    expect(container.querySelector('[aria-label="c3: white man, selected"]')).toBeInTheDocument();
    click('e5: empty, legal destination');
    await act(async () => cell('g7: empty, legal destination').click());
    expect(performCheckersAction).toHaveBeenCalledTimes(1);
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
    for (const label of [
      'c3: white king',
      'a5: empty, legal destination',
      'c7: empty, legal destination',
      'e5: empty, legal destination',
    ]) {
      click(label);
    }
    expect(performCheckersAction).not.toHaveBeenCalled();
    await act(async () => cell('c3: empty, legal destination').click());
    expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [42, 24, 10, 28, 42]});
  });

  it('returns the piece and explains the problem when the server rejects a move', async () => {
    (performCheckersAction as jest.Mock).mockRejectedValue(new Error('rejected'));
    await renderMatch();
    click('a3: white man');
    await act(async () => cell('b4: empty, legal destination').click());
    expect(container.querySelector('[role="alert"]')).toHaveTextContent('We could not reach the game');
    expect(container.querySelector('[aria-label="a3: white man"]')).toBeInTheDocument();
    expect(container.querySelector('[aria-label="b4: empty"]')).toBeInTheDocument();
  });

  describe('dragging with a mouse', () => {
    beforeEach(() => {
      // The board's piece layer measures 400 by 400 px, so every square is 50 px
      jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        bottom: 400,
        height: 400,
        left: 0,
        right: 400,
        top: 0,
        width: 400,
        x: 0,
        y: 0,
        toJSON: () => undefined,
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    const center = (index: number): [number, number] => [(index % 8) * 50 + 25, Math.floor(index / 8) * 50 + 25];

    // `from` and `to` are positions on screen; `square` names the square pressed when the board is flipped
    const drag = async (from: number, to: number, pointerType = 'mouse', square = from) => {
      const start = container.querySelector(`[aria-label^="${cellName(square)}:"]`)!;
      const end = container.querySelector('[role="group"]')!;
      act(() => {
        pointer('pointerdown', start, ...center(from), pointerType);
      });
      act(() => {
        pointer('pointermove', start, center(from)[0] + 10, center(from)[1] - 10, pointerType);
      });
      act(() => {
        pointer('pointermove', end, ...center(to), pointerType);
      });
      await act(async () => {
        pointer('pointerup', end, ...center(to), pointerType);
      });
    };

    it('plays a piece dropped on a legal landing', async () => {
      await renderMatch();
      await drag(40, 33);
      expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [40, 33]});
    });

    it('returns a piece dropped on an illegal square and keeps it selected', async () => {
      await renderMatch();
      await drag(40, 32);
      expect(performCheckersAction).not.toHaveBeenCalled();
      expect(container.querySelector('[aria-label="a3: white man, selected"]')).toBeInTheDocument();
    });

    it('plays a whole jump chain when the piece is dropped on its final landing', async () => {
      match.board = Array(64).fill(0);
      match.board[42] = 1;
      match.board[35] = -1;
      match.board[21] = -1;
      match.legal_moves = [[42, 28, 14]];
      await renderMatch();
      await drag(42, 14);
      expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [42, 28, 14]});
    });

    it('continues a jump chain by dragging the same piece again', async () => {
      match.board = Array(64).fill(0);
      match.board[42] = 1;
      match.board[35] = -1;
      match.board[21] = -1;
      match.legal_moves = [[42, 28, 14]];
      await renderMatch();
      await drag(42, 28);
      expect(performCheckersAction).not.toHaveBeenCalled();
      expect(container.querySelector('[aria-label="e5: white man, selected"]')).toBeInTheDocument();
      await drag(28, 14);
      expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [42, 28, 14]});
    });

    it('maps drops on the flipped board when playing the charcoal pieces', async () => {
      selfId = 12;
      match.your_side = 'black';
      match.active_side = 'black';
      match.legal_moves = [
        [21, 28],
        [21, 30],
      ];
      await renderMatch();
      // Charcoal sits at the bottom, so f6 (square 21) is drawn where c3 would be
      await drag(63 - 21, 63 - 28, 'mouse', 21);
      expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [21, 28]});
    });

    it('does not drag with touch, so a finger can still scroll the page', async () => {
      await renderMatch();
      await drag(40, 33, 'touch');
      expect(performCheckersAction).not.toHaveBeenCalled();
    });

    it('does not let pieces be dragged on the opponent turn', async () => {
      match.active_side = 'black';
      await renderMatch();
      await drag(40, 33);
      expect(performCheckersAction).not.toHaveBeenCalled();
    });
  });

  it('prevents moves on the opponent turn and offers no controls to spectators', async () => {
    match.active_side = 'black';
    await renderMatch();
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
    click('a3: white man');
    click('b4: empty, legal destination');
    selfId = 99;
    await renderMatch();
    dispatch.mockClear();
    await act(async () => resolveAction({...match, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(container.querySelector('[role="group"]')).toBeNull();
  });

  it('releases the previous match action lock when navigating to another board', async () => {
    let resolveAction: (data: CheckersMatch) => void = () => undefined;
    (performCheckersAction as jest.Mock).mockReturnValueOnce(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    (performCheckersAction as jest.Mock).mockReturnValueOnce(neverSettles());
    await renderMatch();
    click('a3: white man');
    click('b4: empty, legal destination');
    const previous = match;
    match = {...match, id: 2};
    mockMatchId = '2';
    await renderMatch();
    click('a3: white man');
    click('b4: empty, legal destination');
    expect(performCheckersAction).toHaveBeenCalledTimes(2);
    expect(performCheckersAction).toHaveBeenLastCalledWith(match, 'move', {path: [40, 33]});
    dispatch.mockClear();
    await act(async () => resolveAction({...previous, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
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
      click('a3: white man');
      await act(async () => cell('b4: empty, legal destination').click());
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
  click('a3: white man');
  await act(async () => cell('b4: empty, legal destination').click());
  expect(performCheckersAction).toHaveBeenCalledWith(match, 'move', {path: [40, 33]});
  expect(getAllUserWallets).not.toHaveBeenCalled();
});

it('checks for the computer reply sooner after a move against the computer', async () => {
  jest.useFakeTimers();
  match.mode = 'computer';
  match.black = null;
  match.computer_name = 'Computer';
  (performCheckersAction as jest.Mock).mockImplementation(() =>
    Promise.resolve({...match, version: 5, active_side: 'black'}),
  );
  await renderMatch();
  expect(getCheckersMatch).toHaveBeenCalledTimes(1);
  click('a3: white man');
  await act(async () => cell('b4: empty, legal destination').click());
  await act(async () => {
    jest.advanceTimersByTime(700);
  });
  expect(getCheckersMatch).toHaveBeenCalledTimes(2);
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

it.each([
  [11, 'win'],
  [12, 'loss'],
  [99, 'complete'],
] as const)('presents a finished result for viewer %s as %s', async (viewerId, outcome) => {
  selfId = viewerId;
  match.your_side = viewerId === 11 ? 'white' : 'black';
  if (viewerId === 99) match.your_side = null;
  match.status = 'finished';
  match.winner = 'white';
  await renderMatch();
  const result = container.querySelector('[data-outcome]');
  expect(result).toHaveAttribute('data-outcome', outcome);
  expect(result).toHaveTextContent('20 TNB prize paid to Alice');
  expect(result?.textContent?.includes('Offer rematch')).toBe(outcome !== 'complete');
});

it('presents a draw with the existing stake refund information', async () => {
  match.status = 'finished';
  match.winner = null;
  await renderMatch();
  const result = container.querySelector('[data-outcome]');
  expect(result).toHaveAttribute('data-outcome', 'draw');
  expect(result).toHaveTextContent(/refund|returned/);
});
