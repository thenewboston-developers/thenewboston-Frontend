import {getFrontendDeploymentStatus} from 'api/frontendDeployments';
import {DEPLOYMENT_TIMESTAMP_KEY} from 'constants/localStorage';
import {setCurrentDeployment, setPollingEnabled, setUpdateAvailable} from 'store/frontendDeployments';
import {AppDispatch} from 'types';
import {FrontendDeployment} from 'types/frontendDeployment';

export const checkForDeploymentUpdate = () => async (dispatch: AppDispatch) => {
  try {
    const deployment = await getFrontendDeploymentStatus();
    dispatch(setCurrentDeployment(deployment));

    if (deployment) {
      const storedTimestamp = localStorage.getItem(DEPLOYMENT_TIMESTAMP_KEY);

      if (storedTimestamp && deployment.created_date > storedTimestamp) {
        dispatch(setUpdateAvailable(true));
      } else if (!storedTimestamp) {
        // First time checking, store the timestamp
        localStorage.setItem(DEPLOYMENT_TIMESTAMP_KEY, deployment.created_date);
      } else {
        // Timestamps match or stored is newer - ensure updateAvailable is false
        dispatch(setUpdateAvailable(false));
      }
    }

    return deployment;
  } catch (error) {
    // Failed to check deployment status
    // Enable polling as fallback when there's an error
    dispatch(setPollingEnabled(true));
    throw error;
  }
};

export const handleDeploymentUpdate = (deployment: FrontendDeployment) => (dispatch: AppDispatch) => {
  const storedTimestamp = localStorage.getItem(DEPLOYMENT_TIMESTAMP_KEY);

  if (!storedTimestamp || deployment.created_date > storedTimestamp) {
    // Don't update localStorage here - only update when user actually refreshes
    dispatch(setCurrentDeployment(deployment));
    dispatch(setUpdateAvailable(true));
  } else {
    // Deployment is not newer than stored - ensure updateAvailable is false
    dispatch(setCurrentDeployment(deployment));
    dispatch(setUpdateAvailable(false));
  }
};

export const dismissUpdateNotification = () => (dispatch: AppDispatch) => {
  dispatch(setUpdateAvailable(false));
};

export const enablePolling = () => (dispatch: AppDispatch) => {
  dispatch(setPollingEnabled(true));
};
