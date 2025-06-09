import axios from 'axios';

import {TransfersResponse} from 'types/transfers';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/transfers`;

export const getTransfers = async (currencyId: number, next?: string | null): Promise<TransfersResponse> => {
  try {
    const url = next || `${BASE_URL}?currency=${currencyId}`;
    const response = await axios.get<TransfersResponse>(url, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
