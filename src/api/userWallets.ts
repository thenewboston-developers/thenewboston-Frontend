import axios from 'axios';

import {UserWallet} from 'types';
import {authorizationHeaders} from 'utils/authentication';

export const getUserWallets = async (
  userId: number,
  params?: {page?: number; page_size?: number},
): Promise<UserWallet[]> => {
  try {
    const response = await axios.get<UserWallet[]>(`${process.env.REACT_APP_API_URL}/api/user-wallets/${userId}`, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
