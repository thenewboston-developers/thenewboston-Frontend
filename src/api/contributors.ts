import axios from 'axios';
import {Contributors} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/contributions/top_contributors`;

export const getTopContributors = async (): Promise<Contributors> => {
  try {
    const response = await axios.get<Contributors>(BASE_URL, {
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top contributors:', error);
    throw error;
  }
};
