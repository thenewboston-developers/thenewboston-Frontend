import axios from 'axios';

import {authorizationHeaders} from 'utils/authentication';

interface GuestSession {
  session_id: string;
  token: string;
  expires_at: string;
}

const STORAGE_KEY = 'tnb-guest-games';
let storageUnavailable = false;
let memorySession: GuestSession | null = null;
let pendingSession: Promise<GuestSession> | null = null;

const readSession = (): GuestSession | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        memorySession = JSON.parse(saved) as GuestSession;
      } catch {
        memorySession = null;
      }
    } else if (!storageUnavailable) memorySession = null;
  } catch {
    // Guest play also works when browser storage is unavailable, until this tab closes.
  }
  const expiry = memorySession ? Date.parse(memorySession.expires_at) : NaN;
  if (!memorySession?.token || !memorySession.session_id || !Number.isFinite(expiry) || expiry <= Date.now())
    return null;
  return memorySession;
};

export const hasGuestGameSession = (): boolean => !!readSession();

export const isCurrentGuestGame = (match: {guest_mode?: boolean; guest_session_id?: string | null}): boolean => {
  const session = readSession();
  return !!match.guest_mode && !!session && match.guest_session_id === session.session_id;
};

/** Keep the guest capability scoped to game requests; never add it to global axios defaults. */
export const gameHeaders = async (createSession = false) => {
  const authenticated = authorizationHeaders();
  if (authenticated.headers.Authorization) return authenticated;
  let session = readSession();
  if (!session && createSession) {
    if (!pendingSession) {
      pendingSession = axios
        .post<GuestSession>(`${process.env.REACT_APP_API_URL}/api/guest-games/session`, {})
        .then(({data}) => {
          memorySession = data;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            storageUnavailable = false;
          } catch {
            storageUnavailable = true;
            // Keep the in-memory capability if persistent storage is blocked.
          }
          return data;
        })
        .finally(() => {
          pendingSession = null;
        });
    }
    session = await pendingSession;
  }
  return {headers: session ? {'X-Guest-Token': session.token} : {}};
};
