import axios from 'axios';

import {IaReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/ia`;

export const getIa = async (): Promise<IaReadSerializer> => {
  try {
    const response = await axios.get<IaReadSerializer>(`${BASE_URL}`, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
