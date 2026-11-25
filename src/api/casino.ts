import axios from 'axios';

import {CasinoBet, CasinoCommitment, CasinoFundMovement, CasinoSummary, PlaceCasinoBet} from 'types/casino';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/casino`;
const config = () => ({...authorizationHeaders(), timeout: 15000});

export const getCasino = async (signal?: AbortSignal): Promise<CasinoSummary> => {
  const response = await axios.get<CasinoSummary>(BASE_URL, {...config(), signal});
  return response.data;
};

export const createCasinoCommitment = async (): Promise<CasinoCommitment> => {
  const response = await axios.post<CasinoCommitment>(`${BASE_URL}/commitments`, {}, config());
  return response.data;
};

export const placeCasinoBet = async (data: PlaceCasinoBet): Promise<CasinoBet> => {
  const response = await axios.post<CasinoBet>(`${BASE_URL}/bets`, data, config());
  return response.data;
};

export const getCasinoBet = async (requestId: string): Promise<CasinoBet> => {
  const response = await axios.get<CasinoBet>(`${BASE_URL}/bets/${encodeURIComponent(requestId)}`, config());
  return response.data;
};

export const getCasinoBets = async (): Promise<CasinoBet[]> => {
  const response = await axios.get<CasinoBet[]>(`${BASE_URL}/bets`, config());
  return response.data;
};

export const moveCasinoFunds = async (
  kind: 'deposits' | 'withdrawals',
  data: {amount: number; request_id: string},
): Promise<CasinoFundMovement> => {
  const response = await axios.post<CasinoFundMovement>(`${BASE_URL}/fund/${kind}`, data, config());
  return response.data;
};
