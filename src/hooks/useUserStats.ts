import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getUserStats} from 'dispatchers/userStats';
import {getUserStats as getUserStatsState} from 'selectors/state';
import {AppDispatch} from 'types';
import {displayErrorToast} from 'utils/toasts';

interface UserStats {
  default_wallet_balance?: number;
  followers_count?: number;
  following_count?: number;
}

export const useUserStats = (id: number | null) => {
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleRefetch = () => {
    setIsRefetching((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          await dispatch(getUserStats(id));
        } catch (error) {
          console.error('Failed to fetch user stats:', error);
          displayErrorToast('Error fetching user stats');
        }
      }
    })();
  }, [isRefetching, id, dispatch]);

  const userStats = useSelector(getUserStatsState);
  const stats: UserStats = id ? userStats[id] || {} : {};
  return {handleRefetch, stats};
};
