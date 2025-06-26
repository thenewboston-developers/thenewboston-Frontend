import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {FRONTEND_DEPLOYMENTS} from 'constants/store';
import {FrontendDeployment} from 'types';

export interface FrontendDeploymentsState {
  currentDeployment: FrontendDeployment | null;
  isPollingEnabled: boolean;
  lastCheckedAt: string | null;
  pollingInterval: number;
  updateAvailable: boolean;
}

const initialState: FrontendDeploymentsState = {
  currentDeployment: null,
  isPollingEnabled: false,
  lastCheckedAt: null,
  pollingInterval: 60000,
  updateAvailable: false,
};

const frontendDeployments = createSlice({
  initialState,
  name: FRONTEND_DEPLOYMENTS,
  reducers: {
    setCurrentDeployment: (state: FrontendDeploymentsState, {payload}: PayloadAction<FrontendDeployment | null>) => {
      state.currentDeployment = payload;
      state.lastCheckedAt = new Date().toISOString();
    },
    setPollingEnabled: (state: FrontendDeploymentsState, {payload}: PayloadAction<boolean>) => {
      state.isPollingEnabled = payload;
    },
    setUpdateAvailable: (state: FrontendDeploymentsState, {payload}: PayloadAction<boolean>) => {
      state.updateAvailable = payload;
    },
  },
});

export const {setCurrentDeployment, setPollingEnabled, setUpdateAvailable} = frontendDeployments.actions;

export default frontendDeployments.reducer;
