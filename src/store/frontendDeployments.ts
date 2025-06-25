import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {FRONTEND_DEPLOYMENTS} from 'constants/store';
import {FrontendDeployment} from 'types';

export interface FrontendDeploymentsState {
  currentDeployment: FrontendDeployment | null;
  isCheckingForUpdate: boolean;
  isPollingEnabled: boolean;
  lastCheckedAt: string | null;
  pollingInterval: number;
  updateAvailable: boolean;
}

const initialState: FrontendDeploymentsState = {
  currentDeployment: null,
  isCheckingForUpdate: false,
  isPollingEnabled: false,
  lastCheckedAt: null,
  pollingInterval: 60000, // 1 minute default
  updateAvailable: false,
};

const frontendDeployments = createSlice({
  initialState,
  name: FRONTEND_DEPLOYMENTS,
  reducers: {
    resetFrontendDeployments: () => initialState,
    setCheckingForUpdate: (state: FrontendDeploymentsState, {payload}: PayloadAction<boolean>) => {
      state.isCheckingForUpdate = payload;
    },
    setCurrentDeployment: (state: FrontendDeploymentsState, {payload}: PayloadAction<FrontendDeployment | null>) => {
      state.currentDeployment = payload;
      state.lastCheckedAt = new Date().toISOString();
    },
    setPollingEnabled: (state: FrontendDeploymentsState, {payload}: PayloadAction<boolean>) => {
      state.isPollingEnabled = payload;
    },
    setPollingInterval: (state: FrontendDeploymentsState, {payload}: PayloadAction<number>) => {
      state.pollingInterval = payload;
    },
    setUpdateAvailable: (state: FrontendDeploymentsState, {payload}: PayloadAction<boolean>) => {
      state.updateAvailable = payload;
    },
  },
});

export const {
  resetFrontendDeployments,
  setCheckingForUpdate,
  setCurrentDeployment,
  setPollingEnabled,
  setPollingInterval,
  setUpdateAvailable,
} = frontendDeployments.actions;

export default frontendDeployments.reducer;
