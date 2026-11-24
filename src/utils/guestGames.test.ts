import axios from 'axios';

import {authorizationHeaders} from 'utils/authentication';

import {gameHeaders, hasGuestGameSession, isCurrentGuestGame} from './guestGames';

jest.mock('axios', () => ({post: jest.fn()}));
jest.mock('utils/authentication', () => ({authorizationHeaders: jest.fn()}));

const savedSession = (token = 'guest-capability') => ({
  token,
  session_id: `session-${token}`,
  expires_at: new Date(Date.now() + 60000).toISOString(),
});

beforeEach(() => {
  localStorage.setItem('tnb-guest-games', JSON.stringify({token: 'expired', expires_at: '2000-01-01'}));
  (authorizationHeaders as jest.Mock).mockReturnValue({headers: {}});
});

afterEach(() => localStorage.clear());

it('creates one guest capability for concurrent game creations and reuses it for later moves', async () => {
  let resolveSession: (value: unknown) => void = () => undefined;
  (axios.post as jest.Mock).mockReturnValue(
    new Promise((resolve) => {
      resolveSession = resolve;
    }),
  );
  const first = gameHeaders(true);
  const second = gameHeaders(true);
  expect(axios.post).toHaveBeenCalledTimes(1);
  resolveSession({data: savedSession()});
  expect(await first).toEqual({headers: {'X-Guest-Token': 'guest-capability'}});
  expect(await second).toEqual(await gameHeaders());
  expect(hasGuestGameSession()).toBe(true);
});

it('never creates an anonymous session just to view a match', async () => {
  expect(await gameHeaders()).toEqual({headers: {}});
  expect(axios.post).not.toHaveBeenCalled();
  expect(hasGuestGameSession()).toBe(false);
});

it('sends account authorization without a guest capability after signing in', async () => {
  localStorage.setItem('tnb-guest-games', JSON.stringify(savedSession()));
  (authorizationHeaders as jest.Mock).mockReturnValue({headers: {Authorization: 'Bearer account-token'}});
  expect(await gameHeaders(true)).toEqual({headers: {Authorization: 'Bearer account-token'}});
  expect(axios.post).not.toHaveBeenCalled();
});

it('does not silently replace an expired session on a match action', async () => {
  expect(await gameHeaders()).toEqual({headers: {}});
  expect(axios.post).not.toHaveBeenCalled();
});

it('only allows a cached guest board from the current session', () => {
  localStorage.setItem('tnb-guest-games', JSON.stringify(savedSession('first')));
  const match = {guest_mode: true, guest_session_id: 'session-first'};
  expect(isCurrentGuestGame(match)).toBe(true);
  localStorage.setItem('tnb-guest-games', JSON.stringify(savedSession('second')));
  expect(isCurrentGuestGame(match)).toBe(false);
  expect(isCurrentGuestGame({guest_mode: true})).toBe(false);
});

it('forgets the capability after browser storage is deliberately cleared', () => {
  localStorage.setItem('tnb-guest-games', JSON.stringify(savedSession()));
  expect(hasGuestGameSession()).toBe(true);
  localStorage.removeItem('tnb-guest-games');
  expect(hasGuestGameSession()).toBe(false);
});
