import {BlackjackActionRequest} from 'types/casino';

export interface PendingBlackjackAction {
  payload: BlackjackActionRequest;
  requestId: string;
}

const key = (userId: number) => `casino.pending.blackjack.action:${userId}`;

export const clearPendingBlackjackAction = (userId: number, requestId: string) => {
  const saved = readPendingBlackjackAction(userId);
  if (saved?.requestId === requestId) localStorage.removeItem(key(userId));
};

export const readPendingBlackjackAction = (userId: number): PendingBlackjackAction | null => {
  const raw = localStorage.getItem(key(userId));
  if (!raw) return null;
  const saved = JSON.parse(raw) as PendingBlackjackAction;
  if (
    !saved.requestId ||
    !saved.payload?.action_id ||
    !['hit', 'stand', 'double'].includes(saved.payload.action) ||
    !Number.isSafeInteger(saved.payload.expected_revision) ||
    saved.payload.expected_revision < 0
  )
    throw new Error('The saved action could not be read.');
  return saved;
};

export const savePendingBlackjackAction = (userId: number, pending: PendingBlackjackAction) => {
  localStorage.setItem(key(userId), JSON.stringify(pending));
};

const FAST_DEAL_KEY = 'thenewboston.blackjack.fastDeal';
const WAGER_KEY = 'thenewboston.blackjack.wager';

// Table preferences are conveniences: without storage they simply last for the visit
export const readFastDeal = (): boolean => {
  try {
    return window.localStorage.getItem(FAST_DEAL_KEY) === 'true';
  } catch {
    return false;
  }
};

// The wager the player last dealt with, so the circle is set up the way they left it
export const readLastWager = (fallback: number): number => {
  try {
    const saved = Number(window.localStorage.getItem(WAGER_KEY));
    return Number.isSafeInteger(saved) && saved > 0 && saved % 2 === 0 ? saved : fallback;
  } catch {
    return fallback;
  }
};

export const saveFastDeal = (fastDeal: boolean) => {
  try {
    window.localStorage.setItem(FAST_DEAL_KEY, String(fastDeal));
  } catch {
    // The preference simply lasts for this visit
  }
};

export const saveLastWager = (amount: number) => {
  try {
    window.localStorage.setItem(WAGER_KEY, String(amount));
  } catch {
    // The table opens with its usual wager next time
  }
};
