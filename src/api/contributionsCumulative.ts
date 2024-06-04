import axios from 'axios';
import {ContributionsCumulative} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/contributions/cumulative`;

export const getContributionsCumulative = async (): Promise<ContributionsCumulative> => {
  try {
    const response = await axios.get<ContributionsCumulative>(BASE_URL, {
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Cumulative Contributions:', error);
    throw error;
  }
};
