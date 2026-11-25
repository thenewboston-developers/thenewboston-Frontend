import {PlaceCasinoBet} from 'types/casino';

const GAME_NAMES: Record<string, string> = {
  blackjack: 'Blackjack',
  let_it_ride: 'Let It Ride',
  plinko: 'Plinko',
  roulette: 'Roulette',
  slots: 'Slots',
  video_poker: 'Video Poker',
};

// Games whose hand stays open between requests: no other wager is accepted until that hand is finished
export const INTERACTIVE_CASINO_GAMES: string[] = ['blackjack', 'let_it_ride', 'video_poker'];

export interface CasinoGameLink {
  name: string;
  path: string;
}

export interface PendingCasinoBet {
  payload: PlaceCasinoBet;
  serverSeedHash: string;
}

const pendingKey = (userId: number) => `casino.pending.bet:${userId}`;
const commitmentKey = (userId: number) => `casino.commitments:${userId}`;

export const getObservedCasinoCommitment = (userId: number, requestId: string): string | undefined => {
  const saved = JSON.parse(localStorage.getItem(commitmentKey(userId)) || '{}') as Record<string, string>;
  return saved[requestId];
};

export const clearPendingCasinoBet = (userId: number, requestId: string) => {
  const saved = localStorage.getItem(pendingKey(userId));
  if (saved && (JSON.parse(saved) as PendingCasinoBet).payload.request_id === requestId) {
    localStorage.removeItem(pendingKey(userId));
  }
};

export const readPendingCasinoBet = (userId: number): PendingCasinoBet | null => {
  const stored = localStorage.getItem(pendingKey(userId));
  if (!stored) return null;
  const pending = JSON.parse(stored) as PendingCasinoBet;
  if (!pending.payload?.request_id || !pending.payload?.commitment_id || !pending.serverSeedHash) {
    throw new Error('The saved bet could not be read. Check your bet history before placing another wager.');
  }
  return pending;
};

export const savePendingCasinoBet = (userId: number, pending: PendingCasinoBet) => {
  // Persist before sending: a reload or uncertain network response must never create a second wager.
  localStorage.setItem(pendingKey(userId), JSON.stringify(pending));
  const saved = JSON.parse(localStorage.getItem(commitmentKey(userId)) || '{}') as Record<string, string>;
  // Retain recent independently observed commitments after clearing a settled pending request.
  const recent = Object.fromEntries(Object.entries(saved).slice(-99));
  recent[pending.payload.request_id] = pending.serverSeedHash;
  localStorage.setItem(commitmentKey(userId), JSON.stringify(recent));
};

// The display name of a casino game and the page it is played on
export const getCasinoGameLink = (game: string): CasinoGameLink => ({
  name: GAME_NAMES[game] ?? game,
  path: `/${game.replace(/_/g, '-')}/home`,
});

export const casinoErrorMessage = (error: unknown, fallback: string) => {
  const body = (error as {response?: {data?: unknown}})?.response?.data;
  // A gateway or server failure answers with a page of HTML, not with the casino's own error: say the fallback
  const data = body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : undefined;
  if (typeof data?.detail === 'string') return data.detail;
  if (typeof data?.message === 'string') return data.message;
  if (typeof (data?.detail as {message?: string})?.message === 'string')
    return (data?.detail as {message: string}).message;
  const details = data
    ? Object.entries(data)
        .filter(([key]) => !['code', 'fund', 'max_bet'].includes(key))
        .flatMap(([, value]) => value)
        .filter((value) => typeof value === 'string')
        .join(' ')
    : '';
  return details || fallback;
};

export const isDefiniteCasinoRejection = (error: unknown) => {
  const response = (error as {response?: {data?: {code?: string}; status?: number}})?.response;
  // Auth/proxy failures on retries cannot prove that the first request never committed.
  return (
    [400, 409].includes(response?.status ?? 0) &&
    [
      'bet_limit',
      'casino_closed',
      'casino_unfunded',
      'commitment_unavailable',
      'currency_unavailable',
      'funds_reserved',
      'fund_limit',
      'game_closed',
      'game_in_progress',
      'insufficient_balance',
      'rules_changed',
      'wallet_unavailable',
      'wallet_limit',
    ].includes(response?.data?.code ?? '')
  );
};
