import axios from 'axios';

import {UserReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const searchUsers = async (query: string): Promise<UserReadSerializer[]> => {
  try {
    const response = await axios.get<UserReadSerializer[]>(`${BASE_URL}/search`, {
      ...authorizationHeaders(),
      params: {q: query},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
