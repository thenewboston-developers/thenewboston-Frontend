import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getConnectFiveMatch} from 'api/connectFive';
import {useIsAuthenticated} from 'hooks';
import useArcadeSounds, {getArcadeSoundStorageKey} from 'hooks/useArcadeSounds';
import {ConnectFiveMatch} from 'types';

import HumanMatch from './HumanMatch';

jest.mock('api/connectFive', () => ({getConnectFiveMatch: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('hooks/useArcadeSounds', () => ({
  __esModule: true,
  ...jest.requireActual('hooks/useArcadeSounds'),
  default: jest.fn(),
}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({...jest.requireActual('react-router-dom'), useParams: () => ({matchId: '1'})}));
jest.mock('utils/toasts', () => ({displayErrorToast: jest.fn()}));
jest.mock('./Board', () => () => <div>Match board</div>);
jest.mock('./PieceToolbar', () => () => null);
jest.mock('./PlayerInfo', () => () => null);
jest.mock('./ResignModal', () => () => null);
jest.mock('./ResultModal', () => () => null);
jest.mock('./Sidebar', () => () => null);

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const initialMatch = {
  id: 1,
  mode: 'human',
  version: 0,
  status: 'active',
  turn_number: 1,
  challenge: null,
  players: [],
  player_a: {id: 11, username: 'Alice'},
  player_b: {id: 12, username: 'Bob'},
  active_player: {id: 11},
  board_state: Array.from({length: 15}, () => Array(15).fill(0)),
  server_time: new Date().toISOString(),
  turn_started_at: new Date().toISOString(),
  clock_a_remaining_ms: 900000,
  clock_b_remaining_ms: 900000,
} as unknown as ConnectFiveMatch;
let match: ConnectFiveMatch;

beforeEach(() => {
  match = {...initialMatch};
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useArcadeSounds as jest.Mock).mockImplementation(jest.requireActual('hooks/useArcadeSounds').default);
  localStorage.clear();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({
      connectFive: {matchesById: {1: match}, challengesById: {}},
      self: {id: 11},
    }),
  );
  (getConnectFiveMatch as jest.Mock).mockResolvedValue(match);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('shows the same persistent default-off control in a human match', async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <HumanMatch />
      </MemoryRouter>,
    ),
  );
  expect(container).toHaveTextContent('Match board');
  const toggle = container.querySelector('button[aria-label="Game sound"]') as HTMLButtonElement;
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  act(() => toggle.click());
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(localStorage.getItem(getArcadeSoundStorageKey('connect_five'))).toBe('true');
  act(() => toggle.click());
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  expect(localStorage.getItem(getArcadeSoundStorageKey('connect_five'))).toBe('false');
});

it('does not play a personal win cue for a signed-out viewer with a stale cached user ID', async () => {
  const playSound = jest.fn();
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  (useArcadeSounds as jest.Mock).mockReturnValue({
    playSound,
    soundEnabled: true,
    toggleSound: jest.fn(),
    unlockSound: jest.fn(),
  });
  const render = () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <HumanMatch />
      </MemoryRouter>,
    );
  await act(async () => render());
  match = {...match, status: 'finished_resign', winner: 11};
  await act(async () => render());
  expect(playSound).not.toHaveBeenCalled();
});
