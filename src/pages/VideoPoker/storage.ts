import {CasinoActionRequest} from 'types/casino';

export interface PendingVideoPokerDraw {
  payload: CasinoActionRequest;
  requestId: string;
}

const key = (userId: number) => `casino.pending.video-poker.action:${userId}`;

export const readPendingVideoPokerDraw = (userId: number): PendingVideoPokerDraw | null => {
  const raw = localStorage.getItem(key(userId));
  if (!raw) return null;
  const saved = JSON.parse(raw) as PendingVideoPokerDraw;
  if (
    !saved.requestId ||
    !saved.payload?.action_id ||
    !/^draw:[01]{5}$/.test(saved.payload.action) ||
    saved.payload.expected_revision !== 0
  )
    throw new Error('The saved draw could not be read.');
  return saved;
};

export const clearPendingVideoPokerDraw = (userId: number, requestId: string) => {
  const saved = readPendingVideoPokerDraw(userId);
  if (saved?.requestId === requestId) localStorage.removeItem(key(userId));
};

export const savePendingVideoPokerDraw = (userId: number, pending: PendingVideoPokerDraw) => {
  // Persist before sending: a reload or an uncertain response must repeat this exact draw, never a different one.
  localStorage.setItem(key(userId), JSON.stringify(pending));
};
