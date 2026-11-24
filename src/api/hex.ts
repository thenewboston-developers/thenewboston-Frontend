import axios from 'axios';

import {CreateHexMatch, HexAction, HexActionData, HexMatch, HexPage} from 'types/hex';
import {authorizationHeaders} from 'utils/authentication';
import {gameHeaders} from 'utils/guestGames';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/hex/matches`;

export const createHexMatch = async (data: CreateHexMatch): Promise<HexMatch> => {
  const response = await axios.post<HexMatch>(BASE_URL, data, await gameHeaders(data.mode === 'computer'));
  return response.data;
};

export const getHexMatch = async (id: number, signal?: AbortSignal): Promise<HexMatch> => {
  const response = await axios.get<HexMatch>(`${BASE_URL}/${id}`, {...(await gameHeaders()), signal});
  return response.data;
};

export const getHexMatches = async (
  params: {mine?: '1' | 'exclude'; page?: number; page_size?: number; status?: string},
  signal?: AbortSignal,
): Promise<HexPage> => {
  const response = await axios.get<HexPage>(BASE_URL, {...authorizationHeaders(), params, signal});
  return response.data;
};

export const performHexAction = async (
  match: HexMatch,
  action: HexAction,
  data: HexActionData = {},
): Promise<HexMatch> => {
  const response = await axios.post<HexMatch>(
    `${BASE_URL}/${match.id}/${action}`,
    {...data, expected_version: match.version},
    await gameHeaders(),
  );
  return response.data;
};
