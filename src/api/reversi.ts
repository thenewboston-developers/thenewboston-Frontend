import axios from 'axios';

import {CreateReversiMatch, ReversiAction, ReversiMatch, ReversiPage} from 'types/reversi';
import {authorizationHeaders} from 'utils/authentication';
import {gameHeaders} from 'utils/guestGames';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/reversi/matches`;

export const createReversiMatch = async (data: CreateReversiMatch): Promise<ReversiMatch> => {
  const response = await axios.post<ReversiMatch>(BASE_URL, data, await gameHeaders(data.mode === 'computer'));
  return response.data;
};

export const getReversiMatch = async (id: number, signal?: AbortSignal): Promise<ReversiMatch> => {
  const response = await axios.get<ReversiMatch>(`${BASE_URL}/${id}`, {...(await gameHeaders()), signal});
  return response.data;
};

export const getReversiMatches = async (
  params: {mine?: string; page?: number; page_size?: number; status?: string},
  signal?: AbortSignal,
): Promise<ReversiPage> => {
  const response = await axios.get<ReversiPage>(BASE_URL, {...authorizationHeaders(), params, signal});
  return response.data;
};

export const performReversiAction = async (
  match: ReversiMatch,
  action: ReversiAction,
  data: {column?: number; row?: number} = {},
): Promise<ReversiMatch> => {
  const response = await axios.post<ReversiMatch>(
    `${BASE_URL}/${match.id}/${action}`,
    {...data, expected_version: match.version},
    await gameHeaders(),
  );
  return response.data;
};
