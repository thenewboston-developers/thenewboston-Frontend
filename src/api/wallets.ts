import axios from 'axios';

import {CreateWalletRequest, Wallet} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/wallets`;

export const createWallet = async (data: CreateWalletRequest): Promise<Wallet> => {
  try {
    const response = await axios.post<Wallet>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWalletBalance = async (walletId: number): Promise<Wallet> => {
  try {
    const response = await axios.get<Wallet>(`${BASE_URL}/${walletId}/balance`, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWallets = async (): Promise<Wallet[]> => {
  try {
    const response = await axios.get<Wallet[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
