import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getHexMatch, performHexAction} from 'api/hex';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated, useWindowSize} from 'hooks';
import {HexMatch} from 'types/hex';
import {isCurrentGuestGame} from 'utils/guestGames';

import Match from './Match';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/hex', () => ({getHexMatch: jest.fn(), performHexAction: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn(), useWindowSize: jest.fn()}));
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
  useNavigate: () => mockNavigate,
  useParams: () => ({matchId: mockMatchId}),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const SIZE = 11;
const CENTRE = 5 * SIZE + 5;
let container: HTMLDivElement;
let match: HexMatch;
let root: Root;
let selfId: number;
let mockMatchId = '1';
const dispatch = jest.fn(() => Promise.resolve());
const mockPlaySound = jest.fn();
const mockNavigate = jest.fn();

const button = (label: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll('button')).find((element) => element.textContent === label);
  if (!found) throw new Error(`Button not found: ${label}`);
  return found;
};

const cell = (label: string): SVGGElement => {
  const found = container.querySelector<SVGGElement>(`[aria-label="${label}"]`);
  if (!found) throw new Error(`Cell not found: ${label}`);
  return found;
};

const pressCell = (label: string) =>
  act(() => {
    cell(label).dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

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
    red: {id: 11, username: 'Alice', avatar: null},
    blue: {id: 12, username: 'Bob', avatar: null},
    your_side: 'red',
    computer_name: null,
    status: 'active',
    stake_amount: 10,
    prize_pool_total: 20,
    version: 4,
    board_size: SIZE,
    time_limit_seconds: 900,
    clock_red_ms: 900000,
    clock_blue_ms: 900000,
    active_side: 'red',
    turn_started_at: new Date().toISOString(),
    expires_at: null,
    server_time: new Date().toISOString(),
    created_date: new Date().toISOString(),
    finished_at: null,
    winner: null,
    result_reason: '',
    rematch_of: null,
    board: Array(SIZE * SIZE).fill(0),
    move_count: 2,
    last_move: {side: 'blue', cell: CENTRE + 1, swap: false},
    can_swap: false,
    winning_path: null,
  };
  match.board[CENTRE - 1] = 1;
  match.board[CENTRE + 1] = 2;
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useWindowSize as jest.Mock).mockReturnValue({height: 768, width: 1024});
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({hex: {matchesById: {[match.id]: match}}, self: {id: selfId}}),
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getAllUserWallets as jest.Mock).mockReturnValue(() => Promise.resolve());
  (getHexMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (performHexAction as jest.Mock).mockImplementation(() => Promise.resolve({...match, version: 5}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it.each(['human', 'computer', 'guest'])('sounds live Hex placements and a win once for %s play', async (mode) => {
  jest.useFakeTimers();
  if (mode !== 'human') {
    match.mode = 'computer';
    match.blue = null;
  }
  if (mode === 'guest') {
    match.guest_mode = true;
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  }
  await renderMatch();
  expect(container.querySelector('[aria-label="Game sound"]')).toHaveAttribute('aria-pressed', 'false');
  expect(mockPlaySound).not.toHaveBeenCalled();
  match = {...match, version: 5, move_count: 3, last_move: {side: 'red', cell: CENTRE, swap: false}};
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound.mock.calls).toEqual([['move', 0]]);
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).toHaveBeenCalledTimes(1);
  match = {...match, version: 6, status: 'finished', winner: 'red'};
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).toHaveBeenLastCalledWith('win', 0);
  expect(mockPlaySound).toHaveBeenCalledTimes(2);
});

it('gives a live opening swap its own cue', async () => {
  jest.useFakeTimers();
  match.move_count = 1;
  match.last_move = {side: 'red', cell: 1, swap: false};
  await renderMatch();
  match = {...match, version: 5, move_count: 2, last_move: {side: 'blue', cell: SIZE, swap: true, from: 1}};
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound.mock.calls).toEqual([['swap', 0]]);
});

it('does not sound Hex history after a failed poll reconnects', async () => {
  jest.useFakeTimers();
  await renderMatch();
  (getHexMatch as jest.Mock).mockRejectedValueOnce(new Error('Offline'));
  await act(async () => jest.advanceTimersByTime(2000));
  match = {...match, version: 5, move_count: 3, last_move: {side: 'red', cell: CENTRE, swap: false}};
  await act(async () => jest.advanceTimersByTime(2000));
  expect(mockPlaySound).not.toHaveBeenCalled();
});

describe('Hex match interaction', () => {
  it('previews a stone and requires confirmation before committing it', async () => {
    await renderMatch();
    expect(button('Confirm move')).toBeDisabled();
    expect(container).toHaveTextContent('Your turn · Red');
    expect(container).toHaveTextContent('Join the two red edges before Bob joins the blue ones');
    pressCell('f6: empty');
    expect(cell('f6: your red stone, not placed yet, press again to place it')).toBeInTheDocument();
    expect(container).toHaveTextContent('Your stone is on f6');
    expect(performHexAction).not.toHaveBeenCalled();
    await act(async () => button('Confirm move').click());
    expect(performHexAction).toHaveBeenCalledWith(match, 'move', {cell: CENTRE});
  });

  it('places the stone when the previewed cell is pressed a second time', async () => {
    await renderMatch();
    pressCell('f6: empty');
    await act(async () => {
      cell('f6: your red stone, not placed yet, press again to place it').dispatchEvent(
        new MouseEvent('click', {bubbles: true}),
      );
    });
    expect(performHexAction).toHaveBeenCalledTimes(1);
    expect(performHexAction).toHaveBeenCalledWith(match, 'move', {cell: CENTRE});
  });

  it('lets the player move the preview or reset it, and never offers a taken cell', async () => {
    await renderMatch();
    pressCell('f6: empty');
    pressCell('a1: empty');
    expect(cell('f6: empty')).toBeInTheDocument();
    expect(cell('a1: your red stone, not placed yet, press again to place it')).toBeInTheDocument();
    act(() => button('Reset').click());
    expect(cell('a1: empty')).toBeInTheDocument();
    expect(button('Confirm move')).toBeDisabled();
    pressCell('e6: red stone');
    pressCell('g6: blue stone, last move');
    expect(button('Confirm move')).toBeDisabled();
    expect(performHexAction).not.toHaveBeenCalled();
  });

  it('prevents moves on the opponent turn and offers no controls to spectators', async () => {
    match.active_side = 'blue';
    await renderMatch();
    expect(button('Confirm move')).toBeDisabled();
    expect(container).toHaveTextContent('Bob’s turn');
    pressCell('f6: empty');
    expect(container.querySelectorAll('[aria-disabled="false"]')).toHaveLength(0);
    expect(cell('f6: empty')).toBeInTheDocument();
    match.your_side = null;
    selfId = 99;
    await renderMatch();
    expect(container.querySelector('[role="group"]')).toBeInTheDocument();
    expect(container.textContent).toContain('You are watching this match');
    expect(container.textContent).not.toContain('Resign match');
    expect(container.textContent).not.toContain('Confirm move');
  });

  it('offers Blue the swap only as the reply to the opening and asks before swapping', async () => {
    match.your_side = 'blue';
    match.active_side = 'blue';
    selfId = 12;
    match.board = Array(SIZE * SIZE).fill(0);
    match.board[2 * SIZE + 7] = 1;
    match.move_count = 1;
    match.last_move = {side: 'red', cell: 2 * SIZE + 7, swap: false};
    match.can_swap = true;
    await renderMatch();
    expect(container).toHaveTextContent('take over the opening stone on h3');
    expect(container).toHaveTextContent('It becomes your blue stone on c8, and Alice moves next');
    const labels = () => Array.from(container.querySelectorAll('button')).map((element) => element.textContent);
    const position = labels().indexOf('Swap the opening');
    const width = button('Swap the opening').style.minWidth;
    expect(width).toBe('190px');
    act(() => button('Swap the opening').click());
    expect(performHexAction).not.toHaveBeenCalled();
    // Cancel takes the place of the button that was pressed and is as wide, so a second press in the
    // same spot lands on Cancel; the confirmation only starts after it.
    expect(labels()[position]).toBe('Cancel');
    expect(button('Cancel').style.minWidth).toBe(width);
    expect(labels()[position + 1]).toBe('Confirm swap');
    act(() => button('Cancel').click());
    expect(labels()[position]).toBe('Swap the opening');
    act(() => button('Swap the opening').click());
    await act(async () => button('Confirm swap').click());
    expect(performHexAction).toHaveBeenCalledTimes(1);
    expect(performHexAction).toHaveBeenCalledWith(match, 'swap', {});
  });

  it('hides the swap when the server does not allow it and explains a swap that was made', async () => {
    match.board = Array(SIZE * SIZE).fill(0);
    match.board[7 * SIZE + 2] = 2;
    match.last_move = {side: 'blue', cell: 7 * SIZE + 2, swap: true, from: 2 * SIZE + 7};
    await renderMatch();
    expect(container).not.toHaveTextContent('Swap the opening');
    expect(container).toHaveTextContent('Bob swapped the opening: the stone on h3 is now Blue’s, on c8.');
  });

  it('shows the stake, board and resulting prize before the invitee accepts', async () => {
    match.status = 'pending';
    match.your_side = 'blue';
    selfId = 12;
    match.expires_at = new Date(Date.now() + 300000).toISOString();
    await renderMatch();
    expect(container.textContent).toContain('20 TNB');
    expect(container.textContent).toContain('on a 11 × 11 board');
    expect(container.textContent).toContain('Bob is Blue and may swap the opening stone');
    expect(container.querySelector('[role="group"]')).toBeNull();
    await act(async () => button('Accept · 10 TNB').click());
    expect(performHexAction).toHaveBeenCalledWith(match, 'accept', {});
  });

  it('asks before resigning', async () => {
    await renderMatch();
    act(() => button('Resign match').click());
    expect(performHexAction).not.toHaveBeenCalled();
    expect(container).toHaveTextContent('Resign and concede this match and your stake?');
    await act(async () => button('Confirm resignation').click());
    expect(performHexAction).toHaveBeenCalledWith(match, 'resign', {});
  });

  it('does not show a cached participant snapshot to another account', async () => {
    selfId = 99;
    await renderMatch();
    expect(container.querySelector('[role="group"]')).toBeNull();
    expect(container.textContent).not.toContain('Alice');
  });

  it('discards a pending action response after switching accounts', async () => {
    let resolveAction: (data: HexMatch) => void = () => undefined;
    (performHexAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    await renderMatch();
    pressCell('f6: empty');
    act(() => button('Confirm move').click());
    selfId = 99;
    await renderMatch();
    dispatch.mockClear();
    await act(async () => resolveAction({...match, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(container.querySelector('[role="group"]')).toBeNull();
  });

  it('releases the previous match action lock when navigating to another board', async () => {
    let resolveAction: (data: HexMatch) => void = () => undefined;
    (performHexAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    await renderMatch();
    pressCell('f6: empty');
    act(() => button('Confirm move').click());
    const previous = match;
    match = {...match, id: 2};
    mockMatchId = '2';
    await renderMatch();
    pressCell('f6: empty');
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
      let resolvePoll: (data: HexMatch) => void = () => undefined;
      (getHexMatch as jest.Mock).mockImplementationOnce(
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
      (performHexAction as jest.Mock).mockImplementationOnce(() => {
        match = {...match, version: 5, active_side: 'blue', server_time: new Date(Date.now()).toISOString()};
        return Promise.resolve(match);
      });
      pressCell('f6: empty');
      await act(async () => button('Confirm move').click());
      expect(container.querySelector('[aria-label="Bob clock"]')).toHaveTextContent('14:56');
      dispatch.mockClear();
      await act(async () => resolvePoll(stale));
      expect(dispatch).not.toHaveBeenCalled();
      expect(container.querySelector('[aria-label="Bob clock"]')).toHaveTextContent('14:56');
    },
  );

  it('stops polling terminal matches, marks the winning chain and refreshes the wallet', async () => {
    jest.useFakeTimers();
    match.status = 'finished';
    match.winner = 'red';
    match.result_reason = 'connection';
    match.board = Array(SIZE * SIZE).fill(0);
    match.winning_path = Array.from({length: SIZE}, (_, row) => row * SIZE + 3);
    match.winning_path.forEach((index) => {
      match.board[index] = 1;
    });
    match.last_move = {side: 'red', cell: 3, swap: false};
    await renderMatch();
    await act(async () => {
      jest.advanceTimersByTime(10000);
    });
    expect(getHexMatch).toHaveBeenCalledTimes(1);
    expect(getAllUserWallets).toHaveBeenCalled();
    expect(container.textContent).toContain('Alice wins the match');
    expect(container.textContent).toContain('Both edges joined by an unbroken chain');
    expect(container.textContent).toContain('20 TNB prize paid to Alice.');
    expect(container.querySelectorAll('[aria-label*="winning chain"]')).toHaveLength(SIZE);
    expect(container.querySelector('polyline')).not.toBeNull();
    expect(container.textContent).not.toContain('Resign match');
    const finished = match;
    (performHexAction as jest.Mock).mockResolvedValueOnce({...match, id: 2, status: 'pending', version: 1});
    await act(async () => button('Offer rematch').click());
    expect(performHexAction).toHaveBeenCalledWith(finished, 'rematch', {});
    expect(mockNavigate).toHaveBeenCalledWith('/hex/matches/2');
  });

  it('stands the board upright on a narrow screen held upright, and sends the same cell', async () => {
    (useWindowSize as jest.Mock).mockReturnValue({height: 812, width: 375});
    await renderMatch();
    const [, , width, height] = container
      .querySelector('svg[aria-label^="Hex board"]')!
      .getAttribute('viewBox')!
      .split(' ')
      .map(Number);
    expect(height).toBeGreaterThan(width);
    pressCell('f6: empty');
    await act(async () => button('Confirm move').click());
    expect(performHexAction).toHaveBeenCalledWith(match, 'move', {cell: CENTRE});
  });

  it('keeps the board wide on a phone held sideways, where an upright board would not fit', async () => {
    (useWindowSize as jest.Mock).mockReturnValue({height: 375, width: 667});
    await renderMatch();
    const [, , width, height] = container
      .querySelector('svg[aria-label^="Hex board"]')!
      .getAttribute('viewBox')!
      .split(' ')
      .map(Number);
    expect(width).toBeGreaterThan(height);
  });

  it('gives each match its own board, so keyboard focus from one match never carries over', async () => {
    await renderMatch();
    const first = container.querySelector('svg[aria-label^="Hex board"]');
    match = {...match, id: 2, board_size: 7, board: Array(49).fill(0), last_move: null};
    mockMatchId = '2';
    await renderMatch();
    expect(container.querySelector('svg[aria-label^="Hex board"]')).not.toBe(first);
    expect(container.querySelectorAll('[data-cell]')).toHaveLength(49);
    expect(container.querySelectorAll('[data-cell][tabindex="0"]')).toHaveLength(1);
  });

  it('numbers the last move and does not call a swap a stone', async () => {
    await renderMatch();
    expect(container).toHaveTextContent('Last move: Bob · g6 · move 2');
  });
});

it('lets a guest place a stone without requesting a wallet', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  selfId = 0;
  match.guest_mode = true;
  match.mode = 'computer';
  match.red = {id: 0, username: 'Guest', avatar: null};
  match.blue = null;
  match.computer_name = 'Computer';
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  await renderMatch();
  expect(container).toHaveTextContent('Blue · normal computer');
  pressCell('f6: empty');
  await act(async () => button('Confirm move').click());
  expect(performHexAction).toHaveBeenCalledWith(match, 'move', {cell: CENTRE});
  expect(getAllUserWallets).not.toHaveBeenCalled();
});

it('invites a winning guest to create an account and lets them play again', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  selfId = 0;
  match.guest_mode = true;
  match.mode = 'computer';
  match.red = {id: 0, username: 'Guest', avatar: null};
  match.blue = null;
  match.computer_name = 'Computer';
  match.status = 'finished';
  match.winner = 'red';
  match.result_reason = 'connection';
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  match.computer_reward = {status: 'guest', amount: 10, currency: 'TNB'};
  await renderMatch();
  expect(container).toHaveTextContent('Guest wins the match');
  expect(container).toHaveTextContent('this win would have earned you 10 coins');
  expect(container.querySelector('a[href="/create-account?next=%2Fgames"]')).not.toBeNull();
  await act(async () => button('Play again').click());
  expect(performHexAction).toHaveBeenCalledWith(match, 'rematch', {});
  expect(getAllUserWallets).not.toHaveBeenCalled();
});

it('shows a paid computer reward to the signed-in winner only', async () => {
  match.mode = 'computer';
  match.blue = null;
  match.computer_name = 'Computer';
  match.status = 'finished';
  match.winner = 'red';
  match.result_reason = 'connection';
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  match.computer_reward = {status: 'paid', amount: 10, currency: 'TNB'};
  await renderMatch();
  expect(container).toHaveTextContent('+10 TNB game reward');
  expect(container).not.toHaveTextContent('prize paid');
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
  match.your_side = viewerId === 11 ? 'red' : 'blue';
  if (viewerId === 99) match.your_side = null;
  match.status = 'finished';
  match.winner = 'red';
  await renderMatch();
  const result = container.querySelector('[data-outcome]');
  expect(result).toHaveAttribute('data-outcome', outcome);
  expect(result).toHaveTextContent('20 TNB prize paid to Alice');
  expect(result?.textContent?.includes('Offer rematch')).toBe(outcome !== 'complete');
});
