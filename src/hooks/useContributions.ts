import {useEffect, useState, useMemo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppDispatch} from 'types';
import {UserIdFilterValues} from 'enums';
import {displayErrorToast} from 'utils/toasts';
import {
  getContributions as _getContributions,
  resetContributions as _resetContributions,
} from 'dispatchers/contributions';
import {getContributions} from 'selectors/state';

const useContributions = (selfContributions = false) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const {items, hasMore, isLoading} = useSelector(getContributions);
  const dispatch = useDispatch<AppDispatch>();

  const apiParams = useMemo(() => {
    if (selfContributions) {
      return {user_id: UserIdFilterValues.SELF};
    } else {
      return {};
    }
  }, [selfContributions]);

  useEffect(() => {
    async function fetchContributions() {
      try {
        setIsInitialLoading(true);
        await dispatch(_resetContributions());
        await dispatch(_getContributions(apiParams));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching contributions');
      } finally {
        setIsInitialLoading(false);
      }
    }

    fetchContributions();
  }, [apiParams, dispatch]);

  const fetchMoreContributions = useCallback(async () => {
    if (!isLoading) {
      await dispatch(_getContributions());
    }
  }, [dispatch, isLoading]);

  return {fetchMoreContributions, hasMore, isInitialLoading, isLoading, items};
};

export default useContributions;
