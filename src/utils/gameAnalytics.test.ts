import {captureAnalyticsEvent, getAnalyticsHeaders} from 'utils/analytics';

import {
  captureGamePage,
  captureGameRewardOffer,
  captureGameSignupClick,
  captureGameStartRequest,
  clearGameAttribution,
  getGameAttributionHeaders,
  getGameFromPath,
} from './gameAnalytics';

jest.mock('utils/analytics', () => ({captureAnalyticsEvent: jest.fn(), getAnalyticsHeaders: jest.fn()}));

beforeEach(() => {
  clearGameAttribution();
  window.history.replaceState({}, '', '/');
  (getAnalyticsHeaders as jest.Mock).mockReturnValue({'X-POSTHOG-DISTINCT-ID': 'anonymous'});
});

afterEach(() => jest.restoreAllMocks());

it.each(['backgammon', 'battleship', 'checkers', 'connect-five', 'dots-and-boxes', 'hex', 'mancala', 'reversi'])(
  'tracks %s with a normalized game and integer match ID',
  (game) => {
    const pathname = `/${game}/matches/27`;
    captureGamePage(pathname, false);
    expect(getGameFromPath(pathname)).toEqual({game: game.replace(/-/g, '_'), matchId: 27, source: 'game_match'});
    expect(captureAnalyticsEvent).toHaveBeenCalledWith('game_match_viewed', {
      auth_state: 'guest',
      game: game.replace(/-/g, '_'),
      match_id: 27,
    });
  },
);

it('carries a visible guest-win offer into signup without recording a payout', () => {
  window.history.replaceState({}, '', '/checkers/matches/27');
  captureGamePage(window.location.pathname, false);
  captureGameRewardOffer({auth_state: 'guest', reward_amount: 10, reward_status: 'guest'}, 'guest_reward');
  captureGameSignupClick('guest_reward');
  window.history.replaceState({}, '', '/create-account?next=%2Fgames');
  expect(getGameAttributionHeaders()).toEqual({
    'X-POSTHOG-GAME': 'checkers',
    'X-POSTHOG-GAME-MATCH-ID': '27',
    'X-POSTHOG-GAME-SOURCE': 'guest_reward',
    'X-POSTHOG-REWARD-OFFER-SEEN': '1',
    'X-POSTHOG-REWARD-SIGNUP-CLICKED': '1',
  });
  expect((captureAnalyticsEvent as jest.Mock).mock.calls.map(([event]) => event)).not.toContain('game_reward_paid');
});

it('deduplicates the same guest reward shown by multiple result components', () => {
  window.history.replaceState({}, '', '/connect-five/matches/27');
  captureGamePage(window.location.pathname, false);
  captureGameRewardOffer({auth_state: 'guest', reward_amount: 10}, 'guest_reward');
  captureGameRewardOffer({auth_state: 'guest', reward_amount: 10}, 'guest_reward');
  expect(
    (captureAnalyticsEvent as jest.Mock).mock.calls.filter(([event]) => event === 'game_reward_offer_viewed'),
  ).toHaveLength(1);
});

it('does not combine an old match or reward offer with another game or the hub', () => {
  window.history.replaceState({}, '', '/checkers/matches/27');
  captureGamePage(window.location.pathname, false);
  captureGameRewardOffer({auth_state: 'guest'}, 'guest_reward');
  captureGamePage('/backgammon/home', false);
  expect(getGameAttributionHeaders()).toEqual({'X-POSTHOG-GAME': 'backgammon', 'X-POSTHOG-GAME-SOURCE': 'game_lobby'});
  captureGamePage('/games', false);
  expect(getGameAttributionHeaders()).toEqual({'X-POSTHOG-GAME-SOURCE': 'games_hub'});
});

it('expires attribution after 30 minutes and discards it on identity changes', () => {
  jest.spyOn(Date, 'now').mockReturnValue(1000000);
  captureGamePage('/checkers/home', false);
  (Date.now as jest.Mock).mockReturnValue(1000000 + 30 * 60 * 1000);
  expect(getGameAttributionHeaders()).toEqual({});
  captureGamePage('/checkers/home', false);
  (getAnalyticsHeaders as jest.Mock).mockReturnValue({'X-POSTHOG-DISTINCT-ID': 'different-account'});
  expect(getGameAttributionHeaders()).toEqual({});
});

it('does not retain or forward attribution after privacy opt-out', () => {
  captureGamePage('/checkers/home', false);
  (getAnalyticsHeaders as jest.Mock).mockReturnValue({'X-POSTHOG-OPT-OUT': '1'});
  expect(getGameAttributionHeaders()).toEqual({});
  (getAnalyticsHeaders as jest.Mock).mockReturnValue({'X-POSTHOG-DISTINCT-ID': 'anonymous'});
  expect(getGameAttributionHeaders()).toEqual({});
});

it('continues safely when browser storage is blocked', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  expect(() => captureGamePage('/hex/home', false)).not.toThrow();
  expect(getGameAttributionHeaders()).toEqual({'X-POSTHOG-GAME': 'hex', 'X-POSTHOG-GAME-SOURCE': 'game_lobby'});
});

it('records only safe start intent properties, never credentials or authoritative starts', () => {
  captureGameStartRequest('/checkers/matches', {
    mode: 'computer',
    difficulty: 'hard',
    password: 'secret',
    guest_token: 'secret',
    opponent_id: 9,
  });
  expect(captureAnalyticsEvent).toHaveBeenCalledWith('game_start_requested', {
    game: 'checkers',
    mode: 'computer',
    difficulty: 'hard',
  });
  captureGameStartRequest('/connect-five/matches/computer', {});
  expect(captureAnalyticsEvent).toHaveBeenLastCalledWith('game_start_requested', {
    game: 'connect_five',
    mode: 'computer',
  });
  captureGameStartRequest('/connect-five/challenges', {opponent_id: 9, stake_amount: 100});
  expect(captureAnalyticsEvent).toHaveBeenLastCalledWith('game_challenge_requested', {
    game: 'connect_five',
    mode: 'human',
  });
  captureGameStartRequest('/unknown/matches', {mode: 'computer'});
  expect(captureAnalyticsEvent).toHaveBeenCalledTimes(3);
});
