import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getMancalaMatch, performMancalaAction} from 'api/mancala';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {MancalaMatch, MancalaRecentMove} from 'types/mancala';
import {hasGuestGameSession, isCurrentGuestGame} from 'utils/guestGames';

import Match from './Match';

const mockNavigate = jest.fn();

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/mancala', () => ({getMancalaMatch: jest.fn(), performMancalaAction: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('utils/guestGames', () => ({hasGuestGameSession: jest.fn(), isCurrentGuestGame: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({matchId: '1'}),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let match: MancalaMatch;
let root: Root;
let selfId: number | null;
const dispatch = jest.fn(() => Promise.resolve());
const guestMove: MancalaRecentMove = {
  board: [4, 4, 4, 4, 4, 4, 0, 4, 4, 0, 5, 5, 5, 1],
  captured: 0,
  extra_turn: true,
  last: 13,
  pit: 2,
  side: 'guest',
  stones: 4,
  swept: null,
  version: 5,
};

const button = (text: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll('button')).find((element) => element.textContent === text);
  if (!found) throw new Error(`Button not found: ${text}`);
  return found;
};

const pit = (label: string) => container.querySelector(`[aria-label^="${label}"]`) as HTMLButtonElement | null;

const renderMatch = async () => {
  await act(async () => {
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
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
  (hasGuestGameSession as jest.Mock).mockReturnValue(false);
  (isCurrentGuestGame as jest.Mock).mockImplementation(() => hasGuestGameSession());
  dispatch.mockImplementation(() => Promise.resolve());
  match = {
    active_side: 'host',
    board: [4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 4, 4, 4, 4],
    clock_guest_ms: 600000,
    clock_host_ms: 600000,
    computer_name: null,
    computer_reward: null,
    created_date: new Date().toISOString(),
    difficulty: 'normal',
    expires_at: null,
    finished_at: null,
    guest: {avatar: null, id: 12, username: 'Bob'},
    host: {avatar: null, id: 11, username: 'Alice'},
    id: 1,
    last_move: null,
    mode: 'human',
    prize_pool_total: 20,
    recent_moves: [],
    rematch_of: null,
    result_reason: '',
    server_time: new Date().toISOString(),
    stake_amount: 10,
    status: 'active',
    time_limit_seconds: 600,
    turn_started_at: new Date().toISOString(),
    version: 4,
    winner: null,
    your_side: 'host',
  };
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({mancala: {matchesById: {[match.id]: match}}, self: {id: selfId}}),
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getAllUserWallets as jest.Mock).mockReturnValue(() => Promise.resolve());
  (getMancalaMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (performMancalaAction as jest.Mock).mockImplementation(() => Promise.resolve({...match, version: 5}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

describe('mancala match interaction', () => {
  it('plays a pit with one press and refuses empty pits', async () => {
    await renderMatch();
    expect(container.textContent).toContain('Your turn');
    expect(pit('Your pit 4: 0 stones')).toBeDisabled();
    expect(pit('Bob’s pit 1: 4 stones')?.tagName).toBe('DIV');
    await act(async () => pit('Your pit 3: 4 stones')!.click());
    expect(performMancalaAction).toHaveBeenCalledTimes(1);
    expect(performMancalaAction).toHaveBeenCalledWith(match, 'move', {pit: 2});
  });

  it('ignores a second press while the first move is on its way', async () => {
    (performMancalaAction as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Keep the move pending to exercise the action lock.
      }),
    );
    await renderMatch();
    await act(async () => pit('Your pit 1')!.click());
    await act(async () => pit('Your pit 2')?.click());
    expect(performMancalaAction).toHaveBeenCalledTimes(1);
    expect(pit('Your pit 2')).toBeDisabled();
  });

  it('shows the invited player their own row along the bottom and waits for the opponent', async () => {
    selfId = 12;
    await renderMatch();
    expect(container.textContent).toContain('Alice’s turn');
    expect(container.textContent).toContain('Waiting for Alice to move.');
    const labels = Array.from(container.querySelectorAll('[aria-label*=" pit "]')).map((element) =>
      element.getAttribute('aria-label'),
    );
    // The far row is read right to left, the near row left to right
    expect(labels.slice(0, 2)).toEqual(['Alice’s pit 6: 4 stones', 'Alice’s pit 5: 4 stones']);
    expect(labels.slice(6, 8)).toEqual(['Your pit 1: 4 stones', 'Your pit 2: 4 stones']);
    const ownPits = Array.from(container.querySelectorAll<HTMLButtonElement>('button[aria-label^="Your pit"]'));
    expect(ownPits).toHaveLength(6);
    expect(ownPits.every((element) => element.disabled)).toBe(true);
  });

  it('never offers game actions to a spectator or a signed-out visitor', async () => {
    // What a cached snapshot says about an earlier viewer is never trusted
    selfId = 99;
    await renderMatch();
    expect(container.textContent).toContain('Spectating');
    expect(container.querySelectorAll('button[aria-label*=" pit "]')).toHaveLength(0);
    expect(container.textContent).not.toContain('Resign match');
    selfId = 11;
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    await renderMatch();
    expect(container.textContent).toContain('Sign in to play');
    expect(container.querySelectorAll('button[aria-label*=" pit "]')).toHaveLength(0);
    expect(container.textContent).not.toContain('Resign match');
  });

  it('keeps the board locked while a new move is being shown, then hands the turn over', async () => {
    jest.useFakeTimers();
    match = {...match, active_side: 'guest', board: [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]};
    await renderMatch();
    match = {...match, active_side: 'guest', board: guestMove.board, last_move: guestMove, version: 5};
    match.recent_moves = [guestMove];
    await renderMatch();
    expect(container.textContent).toContain('Bob is sowing');
    expect(container.textContent).not.toContain('Bob sowed 4 from pit 3');
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    expect(container.textContent).toContain('Bob plays again');
    expect(container.textContent).toContain('Bob sowed 4 from pit 3 · plays again');
    expect(container.querySelector('[aria-label="Bob’s store: 1 stones"]')).toBeInTheDocument();
  });

  it('asks for confirmation before resigning', async () => {
    await renderMatch();
    act(() => button('Resign match').click());
    expect(performMancalaAction).not.toHaveBeenCalled();
    expect(container.textContent).toContain('Your opponent wins the 20 TNB prize.');
    await act(async () => button('Concede match').click());
    expect(performMancalaAction).toHaveBeenCalledWith(match, 'resign', {});
  });

  it('explains the stake before the invited player accepts', async () => {
    selfId = 12;
    match = {...match, active_side: null, prize_pool_total: 10, status: 'pending'};
    match.expires_at = new Date(Date.now() + 300000).toISOString();
    await renderMatch();
    expect(container.textContent).toContain('A challenge from Alice');
    expect(container.textContent).toContain('Accepting locks your stake');
    expect(container.querySelector('[aria-label="Mancala board"]')).toBeNull();
    await act(async () => button('Accept · 10 TNB').click());
    expect(performMancalaAction).toHaveBeenCalledWith(match, 'accept', {});
  });

  it('lets only the challenger cancel a pending challenge', async () => {
    match = {...match, active_side: null, prize_pool_total: 10, status: 'pending'};
    await renderMatch();
    expect(container.textContent).toContain('Your stake is locked.');
    expect(Array.from(container.querySelectorAll('button')).map((element) => element.textContent)).toEqual([
      'Cancel challenge',
    ]);
  });

  it('reports the prize, refreshes the wallet and stops polling once the match is over', async () => {
    jest.useFakeTimers();
    match = {...match, active_side: null, result_reason: 'stones', status: 'finished', winner: 'guest'};
    match.board = [0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 28];
    await renderMatch();
    expect(container.textContent).toContain('Bob wins');
    expect(container.textContent).toContain('Most stones · 20–28');
    expect(container.textContent).toContain('20 TNB prize paid to Bob.');
    expect(getAllUserWallets).toHaveBeenCalled();
    await act(async () => {
      jest.advanceTimersByTime(10000);
    });
    expect(getMancalaMatch).toHaveBeenCalledTimes(1);
  });

  it('returns both stakes on a draw and opens the rematch that was created', async () => {
    match = {...match, active_side: null, result_reason: 'draw', status: 'finished', winner: null};
    match.board = [0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 24];
    (performMancalaAction as jest.Mock).mockResolvedValue({...match, id: 9, status: 'pending', version: 1});
    await renderMatch();
    expect(container.textContent).toContain('It’s a draw');
    expect(container.textContent).toContain('Both stakes of 10 TNB were returned.');
    await act(async () => button('Offer rematch').click());
    expect(performMancalaAction).toHaveBeenCalledWith(match, 'rematch', {});
    expect(mockNavigate).toHaveBeenCalledWith('/mancala/matches/9');
  });

  it('shows the game fund reward only to the player of a computer match', async () => {
    match = {...match, active_side: null, guest: null, mode: 'computer', prize_pool_total: 0, stake_amount: 0};
    match = {...match, result_reason: 'stones', status: 'finished', winner: 'host'};
    match.computer_reward = {amount: 10, currency: 'TNB', status: 'paid'};
    await renderMatch();
    expect(container.textContent).toContain('Alice wins');
    expect(container.textContent).toContain('+10 TNB game reward');
    expect(button('Play again')).toBeEnabled();
    selfId = 99;
    await renderMatch();
    expect(container.textContent).not.toContain('game reward');
  });

  it('refreshes the board after a rejected move and explains what happened', async () => {
    (performMancalaAction as jest.Mock).mockRejectedValue(new Error('Conflict'));
    await renderMatch();
    await act(async () => pit('Your pit 1')!.click());
    expect(container.querySelector('[role="alert"]')).toHaveTextContent('We could not reach the game');
    expect(getMancalaMatch).toHaveBeenCalledTimes(2);
  });
});

describe('guest play', () => {
  beforeEach(() => {
    selfId = null;
    (useIsAuthenticated as jest.Mock).mockReturnValue(false);
    (hasGuestGameSession as jest.Mock).mockReturnValue(true);
    match = {...match, guest: null, guest_mode: true, guest_session_id: 'session', mode: 'computer'};
    match = {...match, host: {avatar: null, id: 0, username: 'Guest'}, prize_pool_total: 0, stake_amount: 0};
  });

  it('lets the guest who started the game play it and never requests a wallet', async () => {
    await renderMatch();
    expect(container.textContent).toContain('Guest vs. Computer');
    expect(container.textContent).not.toContain('You’re watching this match');
    await act(async () => pit('Your pit 1')!.click());
    expect(performMancalaAction).toHaveBeenCalledWith(match, 'move', {pit: 0});
    expect(getAllUserWallets).not.toHaveBeenCalled();
  });

  it('invites a winning guest to sign up without refreshing a wallet', async () => {
    match = {...match, active_side: null, result_reason: 'stones', status: 'finished', winner: 'host'};
    match.computer_reward = {amount: 10, currency: 'TNB', status: 'guest'};
    await renderMatch();
    expect(container.textContent).toContain('Guest wins');
    expect(container.textContent).toContain('this win would have earned you 10 coins');
    expect(container.querySelector('a[href="/create-account?next=%2Fgames"]')).not.toBeNull();
    expect(getAllUserWallets).not.toHaveBeenCalled();
  });

  it('does not show a cached board from another guest session', async () => {
    (isCurrentGuestGame as jest.Mock).mockReturnValue(false);
    await renderMatch();
    expect(container.querySelector('[aria-label="Mancala board"]')).toBeNull();
    expect(container.textContent).not.toContain('Guest vs. Computer');
  });

  it('does not show a cached guest board to a signed-in account', async () => {
    selfId = 11;
    (useIsAuthenticated as jest.Mock).mockReturnValue(true);
    await renderMatch();
    expect(container.querySelector('[aria-label="Mancala board"]')).toBeNull();
    expect(container.textContent).not.toContain('Guest vs. Computer');
  });

  it('lets a guest watch a member match without offering controls', async () => {
    match = {...match, guest: {avatar: null, id: 12, username: 'Bob'}, guest_mode: false, mode: 'human'};
    match = {...match, guest_session_id: null, host: {avatar: null, id: 11, username: 'Alice'}};
    await renderMatch();
    expect(container.textContent).toContain('Spectating');
    expect(container.querySelector('[aria-label="Mancala board"]')).not.toBeNull();
    expect(container.querySelectorAll('button[aria-label*=" pit "]')).toHaveLength(0);
  });
});
