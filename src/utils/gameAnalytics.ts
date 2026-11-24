import {captureAnalyticsEvent, getAnalyticsHeaders} from 'utils/analytics';

const GAME_NAMES = [
  'backgammon',
  'battleship',
  'checkers',
  'connect_five',
  'dots_and_boxes',
  'hex',
  'mancala',
  'reversi',
];
const ATTRIBUTION_KEY = 'tnb-game-attribution';
const ATTRIBUTION_LIFETIME = 30 * 60 * 1000;
const SOURCES = ['games_hub', 'game_lobby', 'game_match', 'guest_reward', 'game_fund'];

export type GameAnalyticsSource = 'games_hub' | 'game_lobby' | 'game_match' | 'guest_reward' | 'game_fund';
type Properties = Record<string, string | number | boolean | null>;
interface Attribution {
  distinctId: string;
  expiresAt: number;
  game?: string;
  matchId?: number;
  rewardOfferSeen?: boolean;
  rewardSignupClicked?: boolean;
  source: GameAnalyticsSource;
}

let memoryAttribution: Attribution | null = null;

export const captureGamePage = (pathname: string, authenticated: boolean): void => {
  const context = getGameFromPath(pathname);
  const authState = authenticated ? 'authenticated' : 'guest';
  if (pathname === '/games') {
    if (!authenticated) {
      clearGameAttribution();
      saveAttribution({source: 'games_hub'});
    }
    captureAnalyticsEvent('games_viewed', {auth_state: authState});
  } else if (context) {
    if (!authenticated) {
      const previous = readAttribution();
      const sameMatch = context.matchId && previous?.game === context.game && previous.matchId === context.matchId;
      saveAttribution({
        ...context,
        matchId: context.matchId,
        rewardOfferSeen: !!sameMatch && previous?.rewardOfferSeen,
        rewardSignupClicked: false,
      });
    }
    captureAnalyticsEvent(context.source === 'game_lobby' ? 'game_lobby_viewed' : 'game_match_viewed', {
      auth_state: authState,
      game: context.game,
      ...(context.matchId ? {match_id: context.matchId} : {}),
    });
  }
};

export const captureGameRewardOffer = (properties: Properties, source: GameAnalyticsSource): void => {
  const context = getGameFromPath(window.location.pathname);
  const previous = readAttribution();
  // Connect Five renders the same result in the board and a dialog; they are one offer, not two wins.
  if (
    source === 'guest_reward' &&
    context?.matchId &&
    previous?.rewardOfferSeen &&
    previous.game === context.game &&
    previous.matchId === context.matchId
  )
    return;
  if (properties.auth_state === 'guest')
    saveAttribution({
      game: context?.game,
      matchId: context?.matchId,
      rewardOfferSeen: true,
      rewardSignupClicked: false,
      source,
    });
  captureAnalyticsEvent('game_reward_offer_viewed', {
    ...properties,
    ...(context ? {game: context.game, ...(context.matchId ? {match_id: context.matchId} : {})} : {}),
    source,
  });
};

export const captureGameSignupClick = (source?: GameAnalyticsSource): void => {
  const context = getGameFromPath(window.location.pathname);
  const previous = readAttribution();
  const resolvedSource = source || context?.source || previous?.source;
  if (!resolvedSource) return;
  saveAttribution({
    ...context,
    rewardSignupClicked: source === 'guest_reward' || previous?.rewardSignupClicked,
    source: resolvedSource,
  });
  captureAnalyticsEvent('game_signup_clicked', {
    auth_state: 'guest',
    game: context?.game || previous?.game || null,
    match_id: context?.matchId || previous?.matchId || null,
    source: resolvedSource,
    reward_offer_seen: previous?.rewardOfferSeen === true,
    reward_signup_clicked: source === 'guest_reward',
  });
};

/** Counts intent only. The server records actual starts and outcomes after a committed state transition. */
export const captureGameStartRequest = (endpoint: string, data: unknown): void => {
  const game = endpoint.split('/')[1]?.replace(/-/g, '_');
  const connectFiveChallenge = endpoint === '/connect-five/challenges';
  if (!GAME_NAMES.includes(game) || (!connectFiveChallenge && !/^\/[a-z-]+\/matches(?:\/computer)?$/.test(endpoint)))
    return;
  const request = data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  let {mode} = request;
  if (connectFiveChallenge) mode = 'human';
  else if (endpoint.endsWith('/computer')) mode = 'computer';
  if (mode !== 'computer' && mode !== 'human') return;
  captureAnalyticsEvent(mode === 'computer' ? 'game_start_requested' : 'game_challenge_requested', {
    game,
    mode,
    ...(typeof request.difficulty === 'string' && ['easy', 'normal', 'hard'].includes(request.difficulty)
      ? {difficulty: request.difficulty}
      : {}),
  });
};

export const clearGameAttribution = (): void => {
  memoryAttribution = null;
  try {
    sessionStorage.removeItem(ATTRIBUTION_KEY);
  } catch {
    // Analytics storage must not affect authentication or play.
  }
};

export const getGameAttributionHeaders = (): Record<string, string> => {
  const value = readAttribution();
  if (!value) return {};
  return {
    'X-POSTHOG-GAME-SOURCE': value.source,
    ...(value.game ? {'X-POSTHOG-GAME': value.game} : {}),
    ...(value.matchId ? {'X-POSTHOG-GAME-MATCH-ID': String(value.matchId)} : {}),
    ...(value.rewardOfferSeen === true ? {'X-POSTHOG-REWARD-OFFER-SEEN': '1'} : {}),
    ...(value.rewardSignupClicked === true ? {'X-POSTHOG-REWARD-SIGNUP-CLICKED': '1'} : {}),
  };
};

export const getGameFromPath = (
  pathname: string,
): {game: string; matchId?: number; source: GameAnalyticsSource} | null => {
  const match = /^\/([a-z-]+)\/(home|matches\/(\d+))\/?$/.exec(pathname);
  if (!match) return null;
  const game = match[1].replace(/-/g, '_');
  if (!GAME_NAMES.includes(game)) return null;
  return {game, ...(match[3] ? {matchId: Number(match[3])} : {}), source: match[3] ? 'game_match' : 'game_lobby'};
};

const readAttribution = (): Attribution | null => {
  const distinctId = getAnalyticsHeaders()['X-POSTHOG-DISTINCT-ID'];
  if (!distinctId) {
    clearGameAttribution();
    return null;
  }
  try {
    const saved = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (saved) memoryAttribution = JSON.parse(saved);
  } catch {
    // The in-memory copy still supports attribution while storage is blocked.
  }
  const value = memoryAttribution;
  if (
    !value ||
    value.distinctId !== distinctId ||
    !Number.isFinite(value.expiresAt) ||
    value.expiresAt <= Date.now() ||
    value.expiresAt > Date.now() + ATTRIBUTION_LIFETIME ||
    !SOURCES.includes(value.source) ||
    (value.game !== undefined && !GAME_NAMES.includes(value.game)) ||
    (value.matchId !== undefined && (!Number.isSafeInteger(value.matchId) || value.matchId < 1))
  ) {
    clearGameAttribution();
    return null;
  }
  return value;
};

const saveAttribution = (values: Omit<Partial<Attribution>, 'distinctId' | 'expiresAt'>): void => {
  const distinctId = getAnalyticsHeaders()['X-POSTHOG-DISTINCT-ID'];
  if (!distinctId) return;
  const previous = readAttribution();
  memoryAttribution = {
    ...previous,
    ...values,
    distinctId,
    expiresAt: Date.now() + ATTRIBUTION_LIFETIME,
    source: values.source || previous?.source || 'games_hub',
  };
  try {
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(memoryAttribution));
  } catch {
    // A blocked storage API only limits attribution to this page load.
  }
};
