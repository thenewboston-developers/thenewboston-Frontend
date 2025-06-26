import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {checkForDeploymentUpdate} from 'dispatchers/frontendDeployments';
import {getFrontendDeployments} from 'selectors/state';
import {AppDispatch} from 'types';

const useDeploymentPolling = () => {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const {isPollingEnabled, pollingInterval} = useSelector(getFrontendDeployments);

  useEffect(() => {
    if (isPollingEnabled && pollingInterval > 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        dispatch(checkForDeploymentUpdate());
      }, pollingInterval);

      dispatch(checkForDeploymentUpdate());

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [dispatch, isPollingEnabled, pollingInterval]);

  return null;
};

export default useDeploymentPolling;
