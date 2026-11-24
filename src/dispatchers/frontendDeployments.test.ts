import {configureStore} from '@reduxjs/toolkit';

import {getFrontendDeploymentStatus} from 'api/frontendDeployments';
import {DEPLOYMENT_TIMESTAMP} from 'constants/localStorage';
import frontendDeploymentsReducer from 'store/frontendDeployments';
import {AppDispatch, FrontendDeployment} from 'types';

import {checkForDeploymentUpdate} from './frontendDeployments';

jest.mock('api/frontendDeployments', () => ({
  getFrontendDeploymentStatus: jest.fn(),
}));

const deployment: FrontendDeployment = {created_date: '2026-11-23T23:00:00.000001Z', deployed_by: 1, id: 14};

const createTestStore = () => configureStore({reducer: {frontendDeployments: frontendDeploymentsReducer}});

const check = (store: ReturnType<typeof createTestStore>) =>
  (store.dispatch as AppDispatch)(checkForDeploymentUpdate());

beforeEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});

describe('checkForDeploymentUpdate', () => {
  it('does not reject when the API is unreachable and leaves the retry to polling', async () => {
    (getFrontendDeploymentStatus as jest.Mock).mockRejectedValue(new Error('Network Error'));
    const store = createTestStore();

    await expect(check(store)).resolves.toBeNull();

    expect(store.getState().frontendDeployments).toMatchObject({
      currentDeployment: null,
      isPollingEnabled: true,
      updateAvailable: false,
    });
  });

  it('announces an update when the deployment is newer than the one this browser has seen', async () => {
    (getFrontendDeploymentStatus as jest.Mock).mockResolvedValue(deployment);
    localStorage.setItem(DEPLOYMENT_TIMESTAMP, '2026-11-20T00:00:00.000001Z');
    const store = createTestStore();

    await expect(check(store)).resolves.toEqual(deployment);

    expect(store.getState().frontendDeployments).toMatchObject({
      currentDeployment: deployment,
      isPollingEnabled: false,
      updateAvailable: true,
    });
  });

  it('remembers the first deployment it sees without announcing an update', async () => {
    (getFrontendDeploymentStatus as jest.Mock).mockResolvedValue(deployment);
    const store = createTestStore();

    await check(store);

    expect(localStorage.getItem(DEPLOYMENT_TIMESTAMP)).toBe(deployment.created_date);
    expect(store.getState().frontendDeployments.updateAvailable).toBe(false);
  });
});
