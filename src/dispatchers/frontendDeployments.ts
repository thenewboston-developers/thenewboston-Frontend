import {getFrontendDeploymentStatus} from 'api/frontendDeployments';
import {DEPLOYMENT_TIMESTAMP_KEY} from 'constants/localStorage';
import {
  setCheckingForUpdate,
  setCurrentDeployment,
  setPollingEnabled,
  setUpdateAvailable,
} from 'store/frontendDeployments';
import {AppDispatch} from 'types';
import {FrontendDeployment} from 'types/frontendDeployment';

export const checkForDeploymentUpdate = () => async (dispatch: AppDispatch) => {
  dispatch(setCheckingForUpdate(true));

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
      }
    }

    return deployment;
  } catch (error) {
    // Failed to check deployment status
    // Enable polling as fallback when there's an error
    dispatch(setPollingEnabled(true));
    throw error;
  } finally {
    dispatch(setCheckingForUpdate(false));
  }
};

export const handleDeploymentUpdate = (deployment: FrontendDeployment) => (dispatch: AppDispatch) => {
  const storedTimestamp = localStorage.getItem(DEPLOYMENT_TIMESTAMP_KEY);

  if (!storedTimestamp || deployment.created_date > storedTimestamp) {
    // Store the new timestamp
    localStorage.setItem(DEPLOYMENT_TIMESTAMP_KEY, deployment.created_date);
    dispatch(setCurrentDeployment(deployment));
    dispatch(setUpdateAvailable(true));
  }
};

export const dismissUpdateNotification = () => (dispatch: AppDispatch) => {
  dispatch(setUpdateAvailable(false));
};

export const enablePolling = () => (dispatch: AppDispatch) => {
  dispatch(setPollingEnabled(true));
};
