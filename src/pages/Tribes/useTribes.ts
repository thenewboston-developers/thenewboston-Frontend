import {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';

import {getTribesSeasons, getTribesState, performTribesAction, uploadTribeEmblem} from 'api/tribes';
import {TribesActionData, TribesSeason, TribesState} from 'types/tribes';
import {isCancellationError} from 'utils/errors';
import {extractErrorMessage} from 'utils/forms';

const pendingKey = (userId: number) => `tribes:pending:${userId}`;
const readPending = (userId: number | null): TribesActionData | null => {
  if (!userId) return null;
  try {
    const value = JSON.parse(localStorage.getItem(pendingKey(userId)) || 'null');
    if (
      value &&
      !Array.isArray(value) &&
      typeof value === 'object' &&
      typeof value.action === 'string' &&
      value.action.length > 0 &&
      Number.isSafeInteger(value.season_id) &&
      value.season_id > 0 &&
      typeof value.request_id === 'string' &&
      /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(value.request_id) &&
      Object.values(value).every((field) => field === null || typeof field === 'string' || typeof field === 'number')
    )
      return value;
  } catch {
    // A malformed entry cannot be submitted as a payment request. New requests
    // still require a successful durable write before being sent to the API.
  }
  return null;
};

const removePending = (userId: number, payload: TribesActionData) => {
  try {
    if (readPending(userId)?.request_id === payload.request_id) localStorage.removeItem(pendingKey(userId));
  } catch {
    // Keeping a settled receipt is safe: replay returns the original action.
  }
};

export const errorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data === 'object') {
      const message =
        extractErrorMessage(data) ||
        extractErrorMessage(data.detail) ||
        Object.entries(data)
          .filter(([key]) => key !== 'code')
          .map(([, value]) => extractErrorMessage(value))
          .find(Boolean);
      if (message) return message;
    }
    if (error.response?.status === 401) return 'Your session expired. Sign in again to continue.';
    if (!error.response) return 'The connection was interrupted. Check your connection and try again.';
  }
  return 'We could not complete this request. Please try again.';
};

export const useTribes = (userId: number | null, seasonId?: number) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());
  const [pending, setPending] = useState<TribesActionData | null>(() => readPending(userId));
  const [readError, setReadError] = useState('');
  const [seasons, setSeasons] = useState<TribesSeason[]>([]);
  const [state, setState] = useState<TribesState | null>(null);
  // True once an attempt at the pending action has ended without an answer (or it was left over from an earlier
  // visit). While the first attempt is still on its way there is nothing to warn about yet.
  const [unconfirmed, setUnconfirmed] = useState(() => !!readPending(userId));
  const account = useRef(userId);
  const accountMatches = account.current === userId;
  const generation = useRef(0);
  const inflight = useRef<{generation: number; requestId: string} | null>(null);
  const offset = useRef(0);
  const readSequence = useRef(0);

  const refresh = useCallback(
    async (signal?: AbortSignal) => {
      if (inflight.current?.generation === generation.current) return;
      const version = generation.current;
      readSequence.current += 1;
      const sequence = readSequence.current;
      try {
        const [snapshot, history] = await Promise.all([getTribesState(seasonId, signal), getTribesSeasons(signal)]);
        if (version !== generation.current || sequence !== readSequence.current || signal?.aborted) return;
        offset.current = new Date(snapshot.server_time).getTime() - Date.now();
        setNow(Date.now() + offset.current);
        setState(snapshot);
        setSeasons(history);
        setReadError('');
        setLoading(false);
      } catch (failure) {
        if (version === generation.current && sequence === readSequence.current && !isCancellationError(failure)) {
          setReadError(errorMessage(failure));
          setLoading(false);
        }
      }
    },
    [seasonId],
  );

  const send = useCallback(
    async (payload: TribesActionData): Promise<boolean> => {
      if (!userId || account.current !== userId || inflight.current?.generation === generation.current) return false;
      const version = generation.current;
      const request = {generation: version, requestId: String(payload.request_id)};
      inflight.current = request;
      readSequence.current += 1; // Reads begun before a mutation must never overwrite its result.
      setBusy(true);
      setError('');
      setReadError('');
      setPending(payload);
      try {
        const saved = readPending(userId);
        if (saved && saved.request_id !== payload.request_id) {
          setPending(saved);
          setUnconfirmed(true);
          setError('An earlier action still needs a receipt. Retry it before starting another action.');
          setBusy(false);
          inflight.current = null;
          return false;
        }
        localStorage.setItem(pendingKey(userId), JSON.stringify(payload));
      } catch {
        setError('Your browser cannot save a transaction receipt. Enable local storage before continuing.');
        setPending(null);
        setUnconfirmed(false);
        setBusy(false);
        inflight.current = null;
        return false;
      }
      try {
        const snapshot = await performTribesAction(payload);
        removePending(userId, payload);
        if (version !== generation.current || account.current !== userId) return false;
        setPending(null);
        setUnconfirmed(false);
        if (snapshot.season.id === (seasonId ?? state?.season.id)) setState(snapshot);
        return true;
      } catch (failure) {
        // Authentication, throttling, and network/server failures cannot prove that
        // an earlier attempt failed. The Tribes-specific 403 marker confirms the
        // authenticated actor's receipt was checked before gameplay was rejected.
        const definitive =
          axios.isAxiosError(failure) &&
          ([400, 404, 409, 422].includes(failure.response?.status ?? 0) ||
            (failure.response?.status === 403 && failure.response?.data?.code === 'tribes_action_forbidden'));
        if (definitive) removePending(userId, payload);
        if (version === generation.current && account.current === userId) {
          setError(errorMessage(failure));
          if (definitive) setPending(null);
          setUnconfirmed(!definitive);
        }
        return false;
      } finally {
        if (inflight.current === request) inflight.current = null;
        if (version === generation.current) {
          setBusy(false);
          refresh();
        }
      }
    },
    [refresh, seasonId, state?.season.id, userId],
  );

  const act = useCallback(
    async (action: string, data: TribesActionData = {}): Promise<boolean> => {
      if (!state || pending || !userId) return false;
      return send({...data, action, request_id: crypto.randomUUID(), season_id: state.season.id});
    },
    [pending, send, state, userId],
  );

  // An emblem is a file, so it travels on its own request instead of through the receipted actions. Sending the
  // same picture twice is harmless, which is why it needs no saved receipt.
  const uploadEmblem = useCallback(
    async (image: File): Promise<boolean> => {
      if (!state || !userId || account.current !== userId || inflight.current?.generation === generation.current)
        return false;
      const version = generation.current;
      const request = {generation: version, requestId: `emblem:${crypto.randomUUID()}`};
      inflight.current = request;
      readSequence.current += 1; // Reads begun before the upload must never overwrite its result.
      setBusy(true);
      setError('');
      setReadError('');
      try {
        const snapshot = await uploadTribeEmblem(state.season.id, image);
        if (version !== generation.current || account.current !== userId) return false;
        if (snapshot.season.id === (seasonId ?? state.season.id)) setState(snapshot);
        return true;
      } catch (failure) {
        if (version === generation.current && account.current === userId) setError(errorMessage(failure));
        return false;
      } finally {
        if (inflight.current === request) inflight.current = null;
        if (version === generation.current) {
          setBusy(false);
          refresh();
        }
      }
    },
    [refresh, seasonId, state, userId],
  );

  useEffect(() => {
    account.current = userId;
    generation.current += 1;
    const controller = new AbortController();
    setState(null);
    setSeasons([]);
    setLoading(true);
    setError('');
    setReadError('');
    setBusy(false);
    setPending(readPending(userId));
    setUnconfirmed(!!readPending(userId));
    refresh(controller.signal);
    const timer = window.setInterval(() => {
      refresh(controller.signal);
    }, 15000);
    return () => {
      generation.current += 1;
      controller.abort();
      window.clearInterval(timer);
    };
  }, [refresh, userId]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now() + offset.current), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return {
    act,
    busy: accountMatches && (busy || !!pending),
    error: accountMatches ? error || readError : '',
    loading: !accountMatches || loading,
    now,
    pending: accountMatches ? pending : null,
    refresh,
    retry: () => (accountMatches && pending ? send(pending) : Promise.resolve(false)),
    retrying: accountMatches && busy,
    seasons: accountMatches ? seasons : [],
    state: accountMatches ? state : null,
    unconfirmed: accountMatches && unconfirmed && !!pending,
    uploadEmblem,
  };
};
