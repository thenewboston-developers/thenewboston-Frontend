import axios from 'axios';

import {CreateMancalaMatch, MancalaAction, MancalaMatch, MancalaPage} from 'types/mancala';
import {authorizationHeaders} from 'utils/authentication';
import {gameHeaders} from 'utils/guestGames';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/mancala/matches`;

export const createMancalaMatch = async (data: CreateMancalaMatch): Promise<MancalaMatch> => {
  // Only a computer game may start a guest session for a signed-out visitor
  const response = await axios.post<MancalaMatch>(BASE_URL, data, await gameHeaders(data.mode === 'computer'));
  return response.data;
};

export const getMancalaMatch = async (id: number, signal?: AbortSignal): Promise<MancalaMatch> => {
  const response = await axios.get<MancalaMatch>(`${BASE_URL}/${id}`, {...(await gameHeaders()), signal});
  return response.data;
};

export const getMancalaMatches = async (
  params: {mine?: string; page?: number; page_size?: number; status?: string},
  signal?: AbortSignal,
): Promise<MancalaPage> => {
  const response = await axios.get<MancalaPage>(BASE_URL, {...authorizationHeaders(), params, signal});
  return response.data;
};

export const performMancalaAction = async (
  match: MancalaMatch,
  action: MancalaAction,
  data: {pit?: number} = {},
): Promise<MancalaMatch> => {
  const response = await axios.post<MancalaMatch>(
    `${BASE_URL}/${match.id}/${action}`,
    {...data, expected_version: match.version},
    await gameHeaders(),
  );
  return response.data;
};
