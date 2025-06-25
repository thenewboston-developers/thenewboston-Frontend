import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {checkForDeploymentUpdate, enablePolling} from 'dispatchers/frontendDeployments';
import {AppDispatch} from 'types';

const useInitialDeploymentCheck = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeDeploymentCheck = async () => {
      try {
        await dispatch(checkForDeploymentUpdate());
      } catch (error) {
        // If initial check fails, enable polling as fallback
        // Initial deployment check failed, enabling polling
        dispatch(enablePolling());
      }
    };

    initializeDeploymentCheck();
  }, [dispatch]);
};

export default useInitialDeploymentCheck;
