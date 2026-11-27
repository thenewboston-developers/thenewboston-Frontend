import {useCallback, useEffect, useRef, useState} from 'react';

import {getTribesTournaments} from 'api/tribes';
import {TribesTournament} from 'types/tribes';
import {isCancellationError} from 'utils/errors';

import {errorMessage} from './useTribes';

export const useTournaments = (userId: number | null) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [more, setMore] = useState(false);
  const [tournaments, setTournaments] = useState<TribesTournament[]>([]);
  const account = useRef(userId);
  const controller = useRef<AbortController | null>(null);
  const pages = useRef(1);
  const extending = useRef(false);
  const sequence = useRef(0);
  const scopeMatches = account.current === userId;

  const refresh = useCallback(async (signal?: AbortSignal) => {
    sequence.current += 1;
    const version = sequence.current;
    try {
      const entries: TribesTournament[] = [];
      let before: number | undefined;
      let hasMore = false;
      for (let pageIndex = 0; pageIndex < pages.current; pageIndex += 1) {
        // Each page needs the cursor returned by the previous page.
        // eslint-disable-next-line no-await-in-loop
        const page = await getTribesTournaments(signal, before);
        if (signal?.aborted || version !== sequence.current) return;
        entries.push(...page);
        hasMore = page.length === 100;
        if (!hasMore) break;
        before = Math.min(...page.map((entry) => entry.id));
      }
      setTournaments(Array.from(new Map(entries.map((entry) => [entry.id, entry])).values()));
      setMore(hasMore);
      setError('');
    } catch (failure) {
      if (!signal?.aborted && version === sequence.current && !isCancellationError(failure))
        setError(errorMessage(failure));
    } finally {
      if (!signal?.aborted && version === sequence.current) {
        setLoading(false);
        setLoadingMore(false);
        extending.current = false;
      }
    }
  }, []);

  const loadMore = async () => {
    if (!scopeMatches || extending.current || !more) return;
    extending.current = true;
    pages.current += 1;
    setLoadingMore(true);
    await refresh(controller.current?.signal);
  };

  useEffect(() => {
    account.current = userId;
    sequence.current += 1;
    const request = new AbortController();
    controller.current = request;
    pages.current = 1;
    extending.current = false;
    setTournaments([]);
    setLoading(true);
    setLoadingMore(false);
    setMore(false);
    setError('');
    refresh(request.signal);
    const timer = window.setInterval(() => refresh(request.signal), 15000);
    return () => {
      sequence.current += 1;
      request.abort();
      window.clearInterval(timer);
    };
  }, [refresh, userId]);

  return {
    error: scopeMatches ? error : '',
    loading: !scopeMatches || loading,
    loadingMore: scopeMatches && loadingMore,
    loadMore,
    more: scopeMatches && more,
    refresh: () => refresh(controller.current?.signal),
    tournaments: scopeMatches ? tournaments : [],
  };
};
