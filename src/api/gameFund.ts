import axios from 'axios';

import {GameFund, GameFundDeposit} from 'types/gameFund';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/game-fund`;

export const getGameFund = async (signal?: AbortSignal): Promise<GameFund> => {
  const response = await axios.get<GameFund>(BASE_URL, {signal});
  return response.data;
};

export const depositGameFund = async (data: {amount: number; request_id: string}): Promise<GameFundDeposit> => {
  const response = await axios.post<GameFundDeposit>(`${BASE_URL}/deposits`, data, authorizationHeaders());
  return response.data;
};
