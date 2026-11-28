import axios from 'axios';

import {TransferDirection, TransfersResponse} from 'types/transfers';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/transfers`;

export const getTransfers = async (params: {
  currency: number;
  direction?: TransferDirection;
  page?: number;
}): Promise<TransfersResponse> => {
  try {
    const response = await axios.get<TransfersResponse>(BASE_URL, {...authorizationHeaders(), params});
    return response.data;
  } catch (error) {
    throw error;
  }
};
