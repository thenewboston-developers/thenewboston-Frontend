import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {AppDispatch} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {getUserStats as getUserStatsState} from 'selectors/state';
import {getUserStats} from 'dispatchers/userStats';

interface UserStats {
  default_wallet_balance?: number;
  followers_count?: number;
  following_count?: number;
}

export const useUserStats = (id: number | null) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUserStats = async () => {
      if (id) {
        try {
          await dispatch(getUserStats(id));
        } catch (error) {
          console.error('Failed to fetch user stats:', error);
          displayErrorToast('Error fetching user stats');
        }
      }
    };

    fetchUserStats();
  }, [id, dispatch]);

  const userStats = useSelector(getUserStatsState);
  const stats: UserStats = id ? userStats[id] || {} : {};
  return stats;
};
