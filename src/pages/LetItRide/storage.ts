import {LetItRideActionRequest} from 'types/casino';

export interface PendingLetItRideAction {
  payload: LetItRideActionRequest;
  requestId: string;
}

const key = (userId: number) => `casino.pending.let_it_ride.action:${userId}`;

export const readPendingLetItRideAction = (userId: number): PendingLetItRideAction | null => {
  const raw = localStorage.getItem(key(userId));
  if (!raw) return null;
  const saved = JSON.parse(raw) as PendingLetItRideAction;
  if (
    !saved.requestId ||
    !saved.payload?.action_id ||
    !['ride', 'pull'].includes(saved.payload.action) ||
    !Number.isSafeInteger(saved.payload.expected_revision) ||
    saved.payload.expected_revision < 0
  )
    throw new Error('The saved decision could not be read.');
  return saved;
};

export const clearPendingLetItRideAction = (userId: number, requestId: string) => {
  const saved = readPendingLetItRideAction(userId);
  if (saved?.requestId === requestId) localStorage.removeItem(key(userId));
};

// Saved before it is sent: a reload or an uncertain response must repeat the same decision, never make a new one
export const savePendingLetItRideAction = (userId: number, pending: PendingLetItRideAction) => {
  localStorage.setItem(key(userId), JSON.stringify(pending));
};
