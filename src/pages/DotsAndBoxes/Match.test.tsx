import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getDotsAndBoxesMatch, performDotsAndBoxesAction} from 'api/dotsAndBoxes';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import useArcadeSounds from 'hooks/useArcadeSounds';
import {DotsAndBoxesMatch, DotsAndBoxesOwner} from 'types/dotsAndBoxes';
import {isCurrentGuestGame} from 'utils/guestGames';

import Match from './Match';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/dotsAndBoxes', () => ({getDotsAndBoxesMatch: jest.fn(), performDotsAndBoxesAction: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('hooks/useArcadeSounds', () => ({__esModule: true, default: jest.fn()}));
jest.mock('utils/guestGames', () => ({isCurrentGuestGame: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({matchId: mockMatchId}),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let match: DotsAndBoxesMatch;
let root: Root;
let selfId: number;
let mockMatchId = '1';
const dispatch = jest.fn(() => Promise.resolve());
const playSound = jest.fn();
const toggleSound = jest.fn();

const button = (label: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll('button')).find((element) => element.textContent === label);
  if (!found) throw new Error(`Button not found: ${label}`);
  return found;
};

const line = (label: string) => container.querySelector(`button[aria-label^="Line ${label}:"]`) as HTMLButtonElement;

const heading = () => container.querySelector('[aria-live="polite"] strong')?.textContent;

const renderMatch = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Match />
      </MemoryRouter>,
    );
  });
};

/** The match after more lines were drawn: [line, owner] pairs in order, plus any other changes. */
const withLines = (drawn: [number, DotsAndBoxesOwner][], changes: Partial<DotsAndBoxesMatch> = {}) => {
  const lines = [...match.lines];
  drawn.forEach(([number, owner]) => {
    lines[number] = owner;
  });
  return {
    ...match,
    lines,
    moves: [...match.moves, ...drawn.map(([number]) => number)],
    server_time: new Date(Date.now() + 1000).toISOString(),
    version: match.version + drawn.length,
    ...changes,
  };
};

beforeEach(() => {
  (useArcadeSounds as jest.Mock).mockReturnValue({playSound, soundEnabled: false, toggleSound});
  Object.defineProperty(document, 'hidden', {configurable: true, value: false});
  Object.defineProperty(window, 'matchMedia', {configurable: true, value: () => ({matches: false})});
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
    blue: {id: 11, username: 'Alice', avatar: null},
    red: {id: 12, username: 'Bob', avatar: null},
    your_side: 'blue',
    computer_name: null,
    status: 'active',
    stake_amount: 10,
    prize_pool_total: 20,
    version: 4,
    board_size: 3,
    time_limit_seconds: 900,
    clock_blue_ms: 900000,
    clock_red_ms: 900000,
    active_side: 'blue',
    turn_started_at: new Date().toISOString(),
    expires_at: null,
    server_time: new Date().toISOString(),
    created_date: new Date().toISOString(),
    finished_at: null,
    winner: null,
    result_reason: '',
    rematch_of: null,
    lines: Array(24).fill(0),
    boxes: Array(9).fill(0),
    moves: [],
    score_blue: 0,
    score_red: 0,
  };
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({dotsAndBoxes: {matchesById: {[match.id]: match}}, self: {id: selfId}}),
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getAllUserWallets as jest.Mock).mockReturnValue(() => Promise.resolve());
  (getDotsAndBoxesMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (performDotsAndBoxesAction as jest.Mock).mockImplementation(() => Promise.resolve({...match, version: 5}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

describe('Dots and Boxes match interaction', () => {
  it('previews a line on the first press and draws it when the same line is pressed again', async () => {
    await renderMatch();
    expect(button('Draw line')).toBeDisabled();
    act(() => line('A1 to B1').click());
    expect(line('A1 to B1')).toHaveAccessibleName('Line A1 to B1: selected, press again to draw');
    expect(container).toHaveTextContent('Line A1 to B1 is selected');
    expect(performDotsAndBoxesAction).not.toHaveBeenCalled();
    await act(async () => line('A1 to B1').click());
    expect(performDotsAndBoxesAction).toHaveBeenCalledWith(match, 'move', {line: 0});
  });

  it('moves the preview to another line, clears it, and draws from the toolbar', async () => {
    await renderMatch();
    act(() => line('A1 to B1').click());
    act(() => line('A1 to A2').click());
    expect(line('A1 to B1')).toHaveAccessibleName('Line A1 to B1: open');
    expect(line('A1 to A2')).toHaveAccessibleName('Line A1 to A2: selected, press again to draw');
    expect(performDotsAndBoxesAction).not.toHaveBeenCalled();
    act(() => button('Clear').click());
    expect(button('Draw line')).toBeDisabled();
    act(() => line('D3 to D4').click());
    await act(async () => button('Draw line').click());
    expect(performDotsAndBoxesAction).toHaveBeenCalledWith(match, 'move', {line: 23});
  });

  it('drops a preview that was made on an older version of the board', async () => {
    await renderMatch();
    act(() => line('A1 to B1').click());
    match = withLines([[5, 2]]);
    await renderMatch();
    expect(line('A1 to B1')).toHaveAccessibleName('Line A1 to B1: open');
    expect(button('Draw line')).toBeDisabled();
  });

  it('prevents moves on the opponent turn and offers no controls to spectators', async () => {
    match.active_side = 'red';
    await renderMatch();
    expect(heading()).toBe('Bob’s turn');
    expect(button('Draw line')).toBeDisabled();
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
    expect(container.textContent).not.toContain('Draw line');
  });

  it('tells the player to draw again after closing a box, and shows both scores', async () => {
    match = withLines(
      [
        [0, 2],
        [3, 2],
        [12, 2],
        [13, 1],
      ],
      {boxes: [1, 0, 0, 0, 0, 0, 0, 0, 0], score_blue: 1},
    );
    await renderMatch();
    expect(heading()).toBe('Box claimed · draw again');
    expect(container.querySelector('[aria-label="Alice: 1 box"]')).toHaveTextContent('1');
    expect(container.querySelector('[aria-label="Bob: 0 boxes"]')).toHaveTextContent('0');
    expect(container.querySelector('[aria-label^="Box A1"]')).toHaveAccessibleName('Box A1: claimed by Alice');
    expect(container).toHaveTextContent('Last line: Alice · B1 to B2');
  });

  it('shows the stake and resulting prize before the invitee accepts', async () => {
    match.status = 'pending';
    match.your_side = 'red';
    selfId = 12;
    match.expires_at = new Date(Date.now() + 300000).toISOString();
    await renderMatch();
    expect(container.textContent).toContain('20 TNB');
    expect(container.textContent).toContain('on a 3 × 3 board');
    expect(container.querySelector('[role="group"]')).toBeNull();
    await act(async () => button('Accept · 10 TNB').click());
    expect(performDotsAndBoxesAction).toHaveBeenCalledWith(match, 'accept', {});
  });

  it('lets the challenger cancel a pending challenge', async () => {
    match.status = 'pending';
    match.expires_at = new Date(Date.now() + 300000).toISOString();
    await renderMatch();
    expect(container.textContent).toContain('Waiting for your opponent');
    await act(async () => button('Cancel challenge').click());
    expect(performDotsAndBoxesAction).toHaveBeenCalledWith(match, 'cancel', {});
  });

  it('asks before resigning', async () => {
    await renderMatch();
    act(() => button('Resign match').click());
    expect(performDotsAndBoxesAction).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Resign and concede this match and your stake?');
    await act(async () => button('Confirm resignation').click());
    expect(performDotsAndBoxesAction).toHaveBeenCalledWith(match, 'resign', {});
  });

  it('does not show a cached participant snapshot to another account', async () => {
    selfId = 99;
    await renderMatch();
    expect(container.querySelector('[role="group"]')).toBeNull();
    expect(container.textContent).not.toContain('Alice');
  });

  it('discards a pending action response after switching accounts', async () => {
    let resolveAction: (data: DotsAndBoxesMatch) => void = () => undefined;
    (performDotsAndBoxesAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    await renderMatch();
    act(() => line('A1 to B1').click());
    act(() => line('A1 to B1').click());
    selfId = 99;
    await renderMatch();
    dispatch.mockClear();
    await act(async () => resolveAction({...match, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(container.querySelector('[role="group"]')).toBeNull();
  });

  it('sends one request when a line is pressed repeatedly while it is being drawn', async () => {
    (performDotsAndBoxesAction as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep the request pending to exercise the action lock.
      }),
    );
    await renderMatch();
    act(() => line('A1 to B1').click());
    act(() => line('A1 to B1').click());
    act(() => line('A1 to B1').click());
    act(() => line('B1 to C1').click());
    expect(performDotsAndBoxesAction).toHaveBeenCalledTimes(1);
    expect(button('Drawing…')).toBeDisabled();
  });

  it('stops polling terminal matches and refreshes the wallet after settlement', async () => {
    jest.useFakeTimers();
    match.status = 'finished';
    match.winner = 'blue';
    match.result_reason = 'completed';
    match.score_blue = 6;
    match.score_red = 3;
    await renderMatch();
    await act(async () => {
      jest.advanceTimersByTime(10000);
    });
    expect(getDotsAndBoxesMatch).toHaveBeenCalledTimes(1);
    expect(getAllUserWallets).toHaveBeenCalled();
    expect(container.textContent).toContain('Alice wins 6–3');
    expect(container.textContent).toContain('20 TNB prize paid to Alice.');
    expect(container.textContent).not.toContain('Resign match');
  });

  it('reports a draw with both stakes refunded', async () => {
    match.status = 'finished';
    match.board_size = 4;
    match.lines = Array(40).fill(1);
    match.boxes = Array(16).fill(1);
    match.result_reason = 'completed';
    match.score_blue = 8;
    match.score_red = 8;
    await renderMatch();
    expect(container.textContent).toContain('Draw 8–8 · stakes refunded');
    expect(container.textContent).toContain('Both players’ stakes have been refunded.');
  });

  it('names the winner without a box score when the match ended on time or by resignation', async () => {
    match.status = 'finished';
    match.winner = 'red';
    match.result_reason = 'timeout';
    await renderMatch();
    expect(container.textContent).toContain('Bob wins the match');
    expect(container.textContent).toContain('Player clock expired');
  });
});

describe('replaying an opponent’s lines', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Blue and red have drawn three sides of the top-left box, and it is red’s turn.
    match = withLines(
      [
        [0, 1],
        [5, 2],
        [3, 1],
        [9, 2],
        [12, 1],
      ],
      {active_side: 'red'},
    );
  });

  it('opens a match on its current board without replaying it', async () => {
    await renderMatch();
    expect(line('A1 to B1')).toHaveAccessibleName('Line A1 to B1: drawn by Alice');
    expect(line('C2 to D2')).toHaveAccessibleName('Line C2 to D2: drawn by Bob');
    expect(heading()).toBe('Bob’s turn');
  });

  it('draws new lines one at a time and gives the turn back only when all are shown', async () => {
    await renderMatch();
    // Bob closes the top-left box with B1–B2, then draws B1–C1, which passes the turn.
    match = withLines(
      [
        [13, 2],
        [1, 2],
      ],
      {active_side: 'blue', boxes: [2, 0, 0, 0, 0, 0, 0, 0, 0], score_red: 1},
    );
    await renderMatch();
    expect(heading()).toBe('Bob is drawing…');
    expect(line('B1 to B2')).toHaveAccessibleName('Line B1 to B2: open');
    expect(container.querySelector('[aria-label^="Box A1"]')).toHaveAccessibleName('Box A1: unclaimed');
    expect(container.querySelector('[aria-label="Bob: 0 boxes"]')).not.toBeNull();
    expect(line('C1 to D1')).toBeDisabled();
    await act(async () => {
      jest.advanceTimersByTime(450);
    });
    expect(line('B1 to B2')).toHaveAccessibleName('Line B1 to B2: drawn by Bob');
    expect(container.querySelector('[aria-label^="Box A1"]')).toHaveAccessibleName('Box A1: claimed by Bob');
    expect(container.querySelector('[aria-label="Bob: 1 box"]')).not.toBeNull();
    expect(line('B1 to C1')).toHaveAccessibleName('Line B1 to C1: open');
    expect(heading()).toBe('Bob is drawing…');
    await act(async () => {
      jest.advanceTimersByTime(450);
    });
    expect(line('B1 to C1')).toHaveAccessibleName('Line B1 to C1: drawn by Bob');
    expect(heading()).toBe('Your turn');
    expect(line('C1 to D1')).toBeEnabled();
  });

  it('shows the player’s own line at once', async () => {
    match = {...match, active_side: 'blue'};
    await renderMatch();
    match = withLines([[1, 1]], {active_side: 'red'});
    await renderMatch();
    expect(line('B1 to C1')).toHaveAccessibleName('Line B1 to C1: drawn by Alice');
    expect(heading()).toBe('Bob’s turn');
  });

  it('announces the result only after the last line is drawn', async () => {
    await renderMatch();
    match = withLines([[13, 2]], {
      boxes: [2, 0, 0, 0, 0, 0, 0, 0, 0],
      result_reason: 'completed',
      score_red: 1,
      status: 'finished',
      winner: 'red',
    });
    await renderMatch();
    expect(container.textContent).not.toContain('Bob wins');
    expect(heading()).toBe('Bob is drawing…');
    await act(async () => {
      jest.advanceTimersByTime(450);
    });
    expect(container.textContent).toContain('Bob wins 1–0');
    expect(container.querySelector('[aria-live="polite"] strong')).toBeNull();
  });

  it('replays every line for a spectator', async () => {
    match = {...match, your_side: null};
    selfId = 99;
    await renderMatch();
    match = withLines([[13, 2]], {boxes: [2, 0, 0, 0, 0, 0, 0, 0, 0], score_red: 1});
    await renderMatch();
    expect(line('B1 to B2')).toHaveAccessibleName('Line B1 to B2: open');
    await act(async () => {
      jest.advanceTimersByTime(450);
    });
    expect(line('B1 to B2')).toHaveAccessibleName('Line B1 to B2: drawn by Bob');
  });
});

describe('polling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('checks a human match every two seconds', async () => {
    match.active_side = 'red';
    await renderMatch();
    expect(getDotsAndBoxesMatch).toHaveBeenCalledTimes(1);
    await act(async () => {
      jest.advanceTimersByTime(1900);
    });
    expect(getDotsAndBoxesMatch).toHaveBeenCalledTimes(1);
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    expect(getDotsAndBoxesMatch).toHaveBeenCalledTimes(2);
  });

  it('checks again sooner while the computer is drawing', async () => {
    match = {...match, active_side: 'red', computer_name: 'Computer', mode: 'computer', red: null, stake_amount: 0};
    await renderMatch();
    expect(heading()).toBe('Computer’s turn');
    await act(async () => {
      jest.advanceTimersByTime(750);
    });
    expect(getDotsAndBoxesMatch).toHaveBeenCalledTimes(2);
  });

  it('looks for the computer’s answer shortly after the player’s line', async () => {
    match = {...match, computer_name: 'Computer', mode: 'computer', red: null, stake_amount: 0, prize_pool_total: 0};
    await renderMatch();
    (performDotsAndBoxesAction as jest.Mock).mockImplementation(() =>
      Promise.resolve(withLines([[0, 1]], {active_side: 'red'})),
    );
    act(() => line('A1 to B1').click());
    await act(async () => line('A1 to B1').click());
    expect(getDotsAndBoxesMatch).toHaveBeenCalledTimes(1);
    await act(async () => {
      jest.advanceTimersByTime(750);
    });
    expect(getDotsAndBoxesMatch).toHaveBeenCalledTimes(2);
  });
});

it('lets a guest draw a line without requesting a wallet', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  selfId = 0;
  match.guest_mode = true;
  match.mode = 'computer';
  match.blue = {id: 0, username: 'Guest', avatar: null};
  match.red = null;
  match.computer_name = 'Computer';
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  await renderMatch();
  act(() => line('A1 to B1').click());
  await act(async () => line('A1 to B1').click());
  expect(performDotsAndBoxesAction).toHaveBeenCalledWith(match, 'move', {line: 0});
  expect(getAllUserWallets).not.toHaveBeenCalled();
});

it('invites a winning guest to create an account and lets them play again', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
  selfId = 0;
  match.guest_mode = true;
  match.mode = 'computer';
  match.blue = {id: 0, username: 'Guest', avatar: null};
  match.red = null;
  match.computer_name = 'Computer';
  match.status = 'finished';
  match.winner = 'blue';
  match.result_reason = 'completed';
  match.score_blue = 5;
  match.score_red = 4;
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  match.computer_reward = {status: 'guest', amount: 10, currency: 'TNB'};
  await renderMatch();
  expect(container).toHaveTextContent('Guest wins 5–4');
  expect(container).toHaveTextContent('this win would have earned you 10 coins');
  expect(container.querySelector('a[href="/create-account?next=%2Fgames"]')).not.toBeNull();
  await act(async () => button('Play again').click());
  expect(performDotsAndBoxesAction).toHaveBeenCalledWith(match, 'rematch', {});
  expect(getAllUserWallets).not.toHaveBeenCalled();
});

it('shows a signed-in winner the reward paid for beating the computer', async () => {
  match.mode = 'computer';
  match.red = null;
  match.computer_name = 'Computer';
  match.status = 'finished';
  match.winner = 'blue';
  match.result_reason = 'completed';
  match.stake_amount = 0;
  match.prize_pool_total = 0;
  match.computer_reward = {status: 'paid', amount: 10, currency: 'TNB'};
  await renderMatch();
  expect(container).toHaveTextContent('+10 TNB game reward');
});

it('does not reveal a cached board owned by another guest session', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockReturnValue(false);
  match.guest_mode = true;
  match.mode = 'computer';
  await renderMatch();
  expect(container.querySelector('[role="group"]')).toBeNull();
  expect(container).not.toHaveTextContent('Draw line');
});

it('preserves signed-out spectator access without participant controls', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  match.your_side = null;
  await renderMatch();
  expect(container.querySelector('[role="group"]')).not.toBeNull();
  expect(container).toHaveTextContent('You are watching this match');
  expect(container).not.toHaveTextContent('Draw line');
});

describe('Dots and Boxes sounds', () => {
  it('stays silent on hydration and selection, then sounds only a committed visible line', async () => {
    await renderMatch();
    act(() => line('A1 to B1').click());
    expect(playSound).not.toHaveBeenCalled();
    match = withLines([[0, 1]], {active_side: 'red'});
    await renderMatch();
    expect(playSound.mock.calls).toEqual([['move']]);
    match = {...match, server_time: new Date(Date.now() + 2000).toISOString()};
    await renderMatch();
    expect(playSound).toHaveBeenCalledTimes(1);
  });

  it('plays the claim cue when the opponent box is shown without celebrating their win', async () => {
    jest.useFakeTimers();
    match = withLines(
      [
        [0, 1],
        [3, 1],
        [12, 1],
      ],
      {active_side: 'red'},
    );
    await renderMatch();
    expect(playSound).not.toHaveBeenCalled();
    match = withLines([[13, 2]], {
      boxes: [2, 0, 0, 0, 0, 0, 0, 0, 0],
      score_red: 1,
      status: 'finished',
      winner: 'red',
      result_reason: 'completed',
    });
    await renderMatch();
    expect(playSound).not.toHaveBeenCalled();
    await act(async () => jest.advanceTimersByTime(450));
    expect(playSound.mock.calls).toEqual([['claim']]);
    await renderMatch();
    expect(playSound).toHaveBeenCalledTimes(1);
  });

  it('does not celebrate a historical result or replay it after enabling sounds', async () => {
    match = {...match, status: 'finished', winner: 'blue'};
    await renderMatch();
    expect(playSound).not.toHaveBeenCalled();
    act(() => (container.querySelector('[aria-label="Game sound"]') as HTMLButtonElement).click());
    expect(toggleSound).toHaveBeenCalledTimes(1);
    (useArcadeSounds as jest.Mock).mockReturnValue({playSound, soundEnabled: true, toggleSound});
    await renderMatch();
    expect(container.querySelector('[aria-label="Game sound"]')).toHaveAttribute('aria-pressed', 'true');
    expect(playSound).not.toHaveBeenCalled();
  });

  it('skips hidden replay and does not sound missed lines when returning to the tab', async () => {
    jest.useFakeTimers();
    await renderMatch();
    Object.defineProperty(document, 'hidden', {configurable: true, value: true});
    match = withLines(
      [
        [0, 2],
        [1, 2],
      ],
      {active_side: 'blue'},
    );
    await renderMatch();
    Object.defineProperty(document, 'hidden', {configurable: true, value: false});
    await act(async () => jest.advanceTimersByTime(1000));
    await renderMatch();
    expect(playSound).not.toHaveBeenCalled();
  });

  it('gives one immediate board cue for a live update under reduced motion', async () => {
    await renderMatch();
    Object.defineProperty(window, 'matchMedia', {configurable: true, value: () => ({matches: true})});
    match = withLines(
      [
        [0, 2],
        [1, 2],
      ],
      {active_side: 'blue'},
    );
    await renderMatch();
    expect(line('A1 to B1')).toHaveAccessibleName('Line A1 to B1: drawn by Bob');
    expect(playSound.mock.calls).toEqual([['move']]);
  });

  it('uses the shared optional sound control to turn audio on and back off', async () => {
    (useArcadeSounds as jest.Mock).mockImplementation(jest.requireActual('hooks/useArcadeSounds').default);
    localStorage.clear();
    await renderMatch();
    const toggle = container.querySelector('[aria-label="Game sound"]') as HTMLButtonElement;
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await act(async () => toggle.click());
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await act(async () => toggle.click());
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    localStorage.clear();
  });
});

it.each([false, true])('celebrates only the current player’s live victory (guest: %s)', async (guest) => {
  if (guest) {
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (isCurrentGuestGame as jest.Mock).mockReturnValue(true);
    selfId = 0;
    match = {...match, guest_mode: true, mode: 'computer', blue: {id: 0, username: 'Guest', avatar: null}, red: null};
  }
  await renderMatch();
  match = {...match, status: 'finished', winner: 'blue', version: match.version + 1};
  await renderMatch();
  expect(playSound).toHaveBeenCalledWith('win', 0);
});

it('does not play a personal victory sound for spectators', async () => {
  match = {...match, your_side: null};
  await renderMatch();
  match = {...match, status: 'finished', winner: 'blue', version: match.version + 1};
  await renderMatch();
  expect(playSound).not.toHaveBeenCalledWith('win', expect.anything());
});

it('does not narrate catch-up moves after a failed poll', async () => {
  jest.useFakeTimers();
  await renderMatch();
  (getDotsAndBoxesMatch as jest.Mock).mockRejectedValueOnce(new Error('Disconnected'));
  await act(async () => jest.advanceTimersByTime(2000));
  match = withLines(
    [
      [0, 2],
      [1, 2],
    ],
    {active_side: 'blue'},
  );
  await act(async () => jest.advanceTimersByTime(2000));
  await renderMatch();
  await act(async () => jest.advanceTimersByTime(1000));
  expect(playSound).not.toHaveBeenCalled();
  match = withLines([[2, 1]], {active_side: 'red'});
  await renderMatch();
  expect(playSound).toHaveBeenCalledWith('move');
});
