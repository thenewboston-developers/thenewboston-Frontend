import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {checkForDeploymentUpdate} from 'dispatchers/frontendDeployments';
import {AppDispatch} from 'types';

interface FrontendDeploymentsState {
  isPollingEnabled: boolean;
  pollingInterval: number;
}

const useDeploymentPolling = () => {
  const dispatch = useDispatch<AppDispatch>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {isPollingEnabled, pollingInterval} = useSelector(
    (state: {frontendDeployments: FrontendDeploymentsState}) => state.frontendDeployments,
  );

  useEffect(() => {
    if (isPollingEnabled && pollingInterval > 0) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up new interval
      intervalRef.current = setInterval(() => {
        dispatch(checkForDeploymentUpdate());
      }, pollingInterval);

      // Run immediately on mount
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
