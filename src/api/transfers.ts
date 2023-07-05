import axios from 'axios';

import {Transfer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/transfers`;

export const getTransfers = async (): Promise<Transfer[]> => {
  try {
    const response = await axios.get<Transfer[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
