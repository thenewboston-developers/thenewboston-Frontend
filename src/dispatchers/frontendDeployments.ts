import {getFrontendDeploymentStatus} from 'api/frontendDeployments';
import {DEPLOYMENT_TIMESTAMP} from 'constants/localStorage';
import {setCurrentDeployment, setPollingEnabled, setUpdateAvailable} from 'store/frontendDeployments';
import {AppDispatch} from 'types';
import {FrontendDeployment} from 'types/frontendDeployment';

export const checkForDeploymentUpdate = () => async (dispatch: AppDispatch) => {
  try {
    const deployment = await getFrontendDeploymentStatus();
    dispatch(setCurrentDeployment(deployment));

    if (deployment) {
      const storedTimestamp = localStorage.getItem(DEPLOYMENT_TIMESTAMP);

      if (!storedTimestamp) {
        localStorage.setItem(DEPLOYMENT_TIMESTAMP, deployment.created_date);
      } else if (deployment.created_date > storedTimestamp) {
        dispatch(setUpdateAvailable(true));
      } else {
        dispatch(setUpdateAvailable(false));
      }
    }

    return deployment;
  } catch (error) {
    dispatch(setPollingEnabled(true));
    throw error;
  }
};

export const handleDeploymentUpdate = (deployment: FrontendDeployment) => (dispatch: AppDispatch) => {
  const storedTimestamp = localStorage.getItem(DEPLOYMENT_TIMESTAMP);

  if (!storedTimestamp || deployment.created_date > storedTimestamp) {
    dispatch(setCurrentDeployment(deployment));
    dispatch(setUpdateAvailable(true));
  } else {
    dispatch(setCurrentDeployment(deployment));
    dispatch(setUpdateAvailable(false));
  }
};
