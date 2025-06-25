import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {checkForDeploymentUpdate, enablePolling} from 'dispatchers/frontendDeployments';
import {AppDispatch} from 'types';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({children}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check for deployment updates on app initialization
        await dispatch(checkForDeploymentUpdate());
      } catch (error) {
        // If initial check fails, enable polling as fallback
        // Initial deployment check failed, enabling polling
        dispatch(enablePolling());
      }
    };

    initializeApp();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
