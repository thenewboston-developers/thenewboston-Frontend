import axios from 'axios';

import {Wire} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/wires`;

export const getWires = async (): Promise<Wire[]> => {
  try {
    const response = await axios.get<Wire[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
