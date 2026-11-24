import {useCallback, useEffect, useState} from 'react';

import {getGameEarnings} from 'api/gameEarnings';
import {GameEarningsPage, RewardGame} from 'types/gameEarnings';

export const GAME_EARNINGS_PAGE_SIZE = 10;

/**
 * Loads one page of a game's TNB earnings leaderboard. A response that arrives after the page, the game or the
 * component has changed is dropped.
 */
const useGameEarnings = (game: RewardGame) => {
  const [data, setData] = useState<GameEarningsPage | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
  const retry = useCallback(() => setRetryCount((count) => count + 1), []);
  const totalPages = data ? Math.ceil(data.count / GAME_EARNINGS_PAGE_SIZE) : 0;

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    getGameEarnings(game, page, GAME_EARNINGS_PAGE_SIZE, controller.signal)
      .then((response) => {
        if (!controller.signal.aborted) setData(response);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [game, page, retryCount]);

  return {data, error, loading, page, retry, setPage, totalPages};
};

export default useGameEarnings;
