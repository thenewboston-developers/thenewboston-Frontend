import {getFrontendDeploymentStatus} from 'api/frontendDeployments';
import {DEPLOYMENT_TIMESTAMP} from 'constants/localStorage';
import {setCurrentDeployment, setPollingEnabled, setUpdateAvailable} from 'store/frontendDeployments';
import {AppDispatch} from 'types';

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
    // The check runs in the background and polling repeats it. A request that fails, as it does while the API
    // restarts during a backend deployment, is not an error for the visitor or for Sentry.
    dispatch(setPollingEnabled(true));
    return null;
  }
};
