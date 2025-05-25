import axios from 'axios';

import {UserStatsSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/user`;

export const getUserStats = async (id: number): Promise<UserStatsSerializer> => {
  try {
    const url = `${BASE_URL}/${id}/stats`;
    const response = await axios.get<UserStatsSerializer>(url, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
