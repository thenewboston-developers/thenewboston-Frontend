import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getBattleshipMatch, performBattleshipAction} from 'api/battleship';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {BattleshipMatch} from 'types/battleship';

import Match from './Match';
import {randomFleet} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/battleship', () => ({getBattleshipMatch: jest.fn(), performBattleshipAction: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({matchId: mockMatchId}),
}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let match: BattleshipMatch;
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
  mockMatchId = '1';
  dispatch.mockImplementation(() => Promise.resolve());
  match = {
    id: 1,
    mode: 'human',
    difficulty: 'normal',
    host: {id: 11, username: 'Alice', avatar: null},
    guest: {id: 12, username: 'Bob', avatar: null},
    your_side: 'host',
    computer_name: null,
    status: 'active',
    phase: 'battle',
    stake_amount: 10,
    prize_pool_total: 20,
    version: 4,
    time_limit_seconds: 900,
    clock_host_ms: 900000,
    clock_guest_ms: 900000,
    active_side: 'host',
    turn_started_at: new Date().toISOString(),
    placement_deadline: new Date(Date.now() + 300000).toISOString(),
    expires_at: null,
    server_time: new Date().toISOString(),
    created_date: new Date().toISOString(),
    finished_at: null,
    winner: null,
    result_reason: '',
    rematch_of: null,
    host_ready: true,
    guest_ready: true,
    board: {ships: randomFleet(), shots: [], incoming_shots: [], opponent_sunk_ships: []},
    last_shot: null,
  };
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({battleship: {matchesById: {[match.id]: match}}, self: {id: selfId}}),
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getAllUserWallets as jest.Mock).mockReturnValue(() => Promise.resolve());
  (getBattleshipMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (performBattleshipAction as jest.Mock).mockImplementation(() => Promise.resolve({...match, version: 5}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

describe('Battleship match interaction', () => {
  it('requires explicit confirmation before firing and does not expose ships on the target board', async () => {
    await renderMatch();
    expect(button('Select a target')).toBeDisabled();
    const target = container.querySelector('[role="group"][aria-label="Target waters"]')!;
    expect(target.querySelectorAll('[aria-label*="ship"]')).toHaveLength(0);
    act(() => (target.querySelector('[aria-label="B3: water"]') as HTMLButtonElement).click());
    expect(performBattleshipAction).not.toHaveBeenCalled();
    await act(async () => button('Fire at B3').click());
    expect(performBattleshipAction).toHaveBeenCalledWith(match, 'fire', {row: 1, column: 2});
  });

  it('disables repeat targets and prevents attacking on the opponent’s turn', async () => {
    match.board.shots = [{row: 0, column: 0, result: 'miss'}];
    await renderMatch();
    expect(container.querySelector('[aria-label="A1: miss"]')).toBeDisabled();
    match = {...match, active_side: 'guest'};
    await renderMatch();
    const target = container.querySelector('[role="group"][aria-label="Target waters"]')!;
    expect(Array.from(target.querySelectorAll('button')).every((element) => element.disabled)).toBe(true);
  });

  it('requires all five ships before locking and sends the selected fleet', async () => {
    match.phase = 'placing';
    match.host_ready = false;
    match.board.ships = [];
    await renderMatch();
    expect(button('Lock fleet & get ready')).toBeDisabled();
    act(() => button('Randomize fleet').click());
    expect(button('Lock fleet & get ready')).toBeEnabled();
    await act(async () => button('Lock fleet & get ready').click());
    const [snapshot, action, payload] = (performBattleshipAction as jest.Mock).mock.calls[0];
    expect(snapshot).toBe(match);
    expect(action).toBe('place');
    expect(payload.ships).toHaveLength(5);
  });

  it('allows manual placement with rotation and rejects overlaps', async () => {
    match.phase = 'placing';
    match.host_ready = false;
    match.board.ships = [];
    await renderMatch();
    act(() => (container.querySelector('[aria-label="A1: water"]') as HTMLButtonElement).click());
    expect(button('Carrier · 5 ✓')).toBeInTheDocument();
    act(() => (container.querySelector('[aria-label="A1: ship"]') as HTMLButtonElement).click());
    expect(container.querySelector('[role="alert"]')).toHaveTextContent('overlaps');
    act(() => button('Rotate · Horizontal →').click());
    act(() => (container.querySelector('[aria-label="B1: water"]') as HTMLButtonElement).click());
    expect(button('Battleship · 4 ✓')).toBeInTheDocument();
  });

  it('shows the stake and resulting prize before the invitee accepts', async () => {
    match.status = 'pending';
    match.phase = 'placing';
    match.your_side = 'guest';
    selfId = 12;
    match.expires_at = new Date(Date.now() + 300000).toISOString();
    await renderMatch();
    expect(container.textContent).toContain('20 TNB');
    await act(async () => button('Accept · 10 TNB').click());
    expect(performBattleshipAction).toHaveBeenCalledWith(match, 'accept', {});
  });

  it('does not show a cached private fleet to another account', async () => {
    selfId = 99;
    await renderMatch();
    expect(container.querySelector('[role="group"]')).toBeNull();
    expect(container.textContent).not.toContain('Alice');
  });

  it('discards a pending action response after switching accounts', async () => {
    let resolveAction: (data: BattleshipMatch) => void = () => undefined;
    (performBattleshipAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    await renderMatch();
    act(() => (container.querySelector('[aria-label="A1: water"]') as HTMLButtonElement).click());
    act(() => button('Fire at A1').click());
    selfId = 99;
    await renderMatch();
    dispatch.mockClear();
    await act(async () => resolveAction({...match, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(container.querySelector('[role="group"]')).toBeNull();
  });

  it('releases the previous match action lock when navigating to another board', async () => {
    let resolveAction: (data: BattleshipMatch) => void = () => undefined;
    (performBattleshipAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      }),
    );
    await renderMatch();
    act(() => (container.querySelector('[aria-label="A1: water"]') as HTMLButtonElement).click());
    act(() => button('Fire at A1').click());
    const previous = match;
    match = {...match, id: 2};
    mockMatchId = '2';
    await renderMatch();
    act(() => (container.querySelector('[aria-label="A2: water"]') as HTMLButtonElement).click());
    expect(button('Fire at A2')).toBeEnabled();
    dispatch.mockClear();
    await act(async () => resolveAction({...previous, version: 5}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(button('Fire at A2')).toBeEnabled();
  });

  it.each([4, 5])(
    'ignores a delayed version %i poll after a newer action snapshot, including clock effects',
    async (staleVersion) => {
      jest.useFakeTimers();
      const initialTime = Date.now();
      match.server_time = new Date(initialTime).toISOString();
      match.turn_started_at = new Date(initialTime).toISOString();
      await renderMatch();
      let resolvePoll: (data: BattleshipMatch) => void = () => undefined;
      (getBattleshipMatch as jest.Mock).mockImplementationOnce(
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
      (performBattleshipAction as jest.Mock).mockImplementationOnce(() => {
        match = {...match, version: 5, active_side: 'guest', server_time: new Date(Date.now()).toISOString()};
        return Promise.resolve(match);
      });
      act(() => (container.querySelector('[aria-label="A1: water"]') as HTMLButtonElement).click());
      await act(async () => button('Fire at A1').click());
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
    match.phase = 'finished';
    match.winner = 'host';
    match.result_reason = 'fleet_sunk';
    await renderMatch();
    await act(async () => {
      jest.advanceTimersByTime(10000);
    });
    expect(getBattleshipMatch).toHaveBeenCalledTimes(1);
    expect(getAllUserWallets).toHaveBeenCalled();
    expect(container.textContent).toContain('20 TNB prize paid to Alice.');
  });
});
