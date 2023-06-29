import axios from 'axios';

import {CreateWalletRequest, DepositResponse, Wallet, WithdrawRequest, WithdrawResponse} from 'types';
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

export const createWalletDeposit = async (walletId: number): Promise<DepositResponse> => {
  try {
    const response = await axios.post<DepositResponse>(`${BASE_URL}/${walletId}/deposit`, {}, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createWalletWithdraw = async (walletId: number, data: WithdrawRequest): Promise<WithdrawResponse> => {
  try {
    const response = await axios.post<WithdrawResponse>(
      `${BASE_URL}/${walletId}/withdraw`,
      data,
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWalletDepositBalance = async (walletId: number): Promise<Wallet> => {
  try {
    const response = await axios.get<Wallet>(`${BASE_URL}/${walletId}/deposit_balance`, authorizationHeaders());
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
