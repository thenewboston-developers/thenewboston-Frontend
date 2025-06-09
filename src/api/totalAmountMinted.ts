import axios from 'axios';

import {TotalAmountMintedResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/total-amount-minted`;

export const getTotalAmountMinted = async (currencyId: number): Promise<TotalAmountMintedResponse> => {
  try {
    const response = await axios.get<TotalAmountMintedResponse>(BASE_URL, {
      ...authorizationHeaders(),
      params: {currency: currencyId},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
