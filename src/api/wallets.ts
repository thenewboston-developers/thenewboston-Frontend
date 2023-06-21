import axios from 'axios';

import {Wallet} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/wallets`;

export const getWallets = async (): Promise<Wallet[]> => {
  try {
    const response = await axios.get<Wallet[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
