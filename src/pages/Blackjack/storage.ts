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
