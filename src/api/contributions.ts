import axios from 'axios';

import {Contribution} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/contributions`;

export const getContributions = async (): Promise<Contribution[]> => {
  try {
    const response = await axios.get<Contribution[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
