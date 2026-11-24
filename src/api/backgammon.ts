import axios from 'axios';

import {
  BackgammonAction,
  BackgammonMatch,
  BackgammonMove,
  BackgammonPage,
  CreateBackgammonMatch,
} from 'types/backgammon';
import {authorizationHeaders} from 'utils/authentication';
import {gameHeaders} from 'utils/guestGames';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/backgammon/matches`;

export const createBackgammonMatch = async (data: CreateBackgammonMatch): Promise<BackgammonMatch> => {
  const response = await axios.post<BackgammonMatch>(BASE_URL, data, await gameHeaders(data.mode === 'computer'));
  return response.data;
};

export const getBackgammonMatch = async (id: number, signal?: AbortSignal): Promise<BackgammonMatch> => {
  const response = await axios.get<BackgammonMatch>(`${BASE_URL}/${id}`, {...(await gameHeaders()), signal});
  return response.data;
};

export const getBackgammonMatches = async (
  params: {mine?: string; page?: number; page_size?: number; status?: string},
  signal?: AbortSignal,
): Promise<BackgammonPage> => {
  const response = await axios.get<BackgammonPage>(BASE_URL, {...authorizationHeaders(), params, signal});
  return response.data;
};

export const performBackgammonAction = async (
  match: BackgammonMatch,
  action: BackgammonAction,
  data: {accept?: boolean; moves?: BackgammonMove[]} = {},
): Promise<BackgammonMatch> => {
  const response = await axios.post<BackgammonMatch>(
    `${BASE_URL}/${match.id}/${action}`,
    {...data, expected_version: match.version},
    await gameHeaders(),
  );
  return response.data;
};
