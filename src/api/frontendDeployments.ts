import axios from 'axios';

import {FrontendDeployment} from 'types';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/frontend-deployments`;

export const getFrontendDeploymentStatus = async (): Promise<FrontendDeployment | null> => {
  try {
    const response = await axios.get<FrontendDeployment | null>(`${BASE_URL}/status`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
