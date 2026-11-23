import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {getBackgammonMatch, performBackgammonAction} from 'api/backgammon';
import {getAllUserWallets} from 'dispatchers/wallets';
import {useIsAuthenticated} from 'hooks';
import {BackgammonMatch, BackgammonMove} from 'types/backgammon';

import Match from './Match';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));
jest.mock('api/backgammon', () => ({getBackgammonMatch: jest.fn(), performBackgammonAction: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to play</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: jest.fn()}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({...jest.requireActual('react-router-dom'), useParams: () => ({matchId: '1'})}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let match: BackgammonMatch;
let root: Root;
let selfId: number;
const first: BackgammonMove = {from: 5, to: 2, die: 3};
const second: BackgammonMove = {from: 2, to: 0, die: 2};
const dispatch = jest.fn(() => Promise.resolve());

const button = (text: string): HTMLButtonElement => {
  const found = Array.from(container.querySelectorAll('button')).find((element) => element.textContent === text);
  if (!found) throw new Error(`Button not found: ${text}`);
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
  dispatch.mockImplementation(() => Promise.resolve());
  match = {
    id: 1,
    mode: 'human',
    difficulty: 'normal',
    white: {id: 11, username: 'Alice', avatar: null},
    black: {id: 12, username: 'Bob', avatar: null},
    computer_name: null,
    status: 'active',
    phase: 'moving',
    stake_amount: 10,
    prize_pool_total: 20,
    target_score: 3,
    scores: {white: 0, black: 0},
    game_number: 1,
    board: {points: Array(24).fill(0), bar: {white: 0, black: 0}, off: {white: 0, black: 0}},
    active_side: 'white',
    dice: [3, 2],
    cube_value: 1,
    cube_owner: null,
    double_offered_by: null,
    is_crawford: false,
    crawford_used: false,
    version: 4,
    clock_white_ms: 900000,
    clock_black_ms: 900000,
    clock_side: 'white',
    turn_started_at: new Date().toISOString(),
    server_time: new Date().toISOString(),
    next_game_at: null,
    expires_at: null,
    winner: null,
    game_winner: null,
    result_points: 0,
    result_reason: '',
    legal_turns: [[first, second]],
    can_double: false,
    created_date: new Date().toISOString(),
    finished_at: null,
    time_limit_seconds: 900,
  };
  match.board.points[5] = 1;
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({backgammon: {matchesById: {1: match}}, self: {id: selfId}}),
  );
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (getAllUserWallets as jest.Mock).mockReturnValue(() => Promise.resolve());
  (getBackgammonMatch as jest.Mock).mockImplementation(() => Promise.resolve(match));
  (performBackgammonAction as jest.Mock).mockImplementation(() => Promise.resolve({...match, version: 5}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

describe('backgammon match interaction', () => {
  it('stops polling after a terminal match result', async () => {
    jest.useFakeTimers();
    match.status = 'finished';
    match.phase = 'finished';
    match.winner = 'white';
    await renderMatch();
    await act(async () => {
      jest.advanceTimersByTime(10000);
    });
    expect(getBackgammonMatch).toHaveBeenCalledTimes(1);
  });
  it('requires the entire legal sequence before confirmation and supports undo', async () => {
    await renderMatch();
    expect(button('Confirm turn')).toBeDisabled();
    act(() => button('6 → 3 · die 3').click());
    expect(button('Confirm turn')).toBeDisabled();
    expect(performBackgammonAction).not.toHaveBeenCalled();
    act(() => button('3 → 1 · die 2').click());
    expect(button('Confirm turn')).toBeEnabled();
    act(() => button('Undo move').click());
    expect(button('Confirm turn')).toBeDisabled();
    act(() => button('3 → 1 · die 2').click());
    await act(async () => button('Confirm turn').click());
    expect(performBackgammonAction).toHaveBeenCalledWith(match, 'move', {moves: [first, second]});
    expect(match.board.points[5]).toBe(1);
  });

  it('never offers game actions to a spectator', async () => {
    selfId = 99;
    match.legal_turns = [];
    await renderMatch();
    expect(container.textContent).toContain('Spectating');
    expect(container.querySelectorAll('svg [role="button"]')).toHaveLength(0);
    expect(Array.from(container.querySelectorAll('button')).map((element) => element.textContent)).not.toContain(
      'Confirm turn',
    );
    expect(container.textContent).not.toContain('Resign match');
  });

  it('shows a forced pass only when the server gives an empty legal sequence', async () => {
    match.legal_turns = [[]];
    await renderMatch();
    expect(button('Pass turn')).toBeEnabled();
    await act(async () => button('Pass turn').click());
    expect(performBackgammonAction).toHaveBeenCalledWith(match, 'move', {moves: []});
  });

  it('explains the fixed stake before accepting a challenge', async () => {
    selfId = 12;
    match.status = 'pending';
    match.phase = 'finished';
    await renderMatch();
    expect(container.textContent).toContain('Accepting locks your stake');
    expect(container.textContent).toContain('The cube changes points only');
    await act(async () => button('Accept · 10 TNB').click());
    expect(performBackgammonAction).toHaveBeenCalledWith(match, 'accept', {});
  });
});
