import axios from 'axios';

import {
  CreateDotsAndBoxesMatch,
  DotsAndBoxesAction,
  DotsAndBoxesActionData,
  DotsAndBoxesMatch,
  DotsAndBoxesPage,
} from 'types/dotsAndBoxes';
import {authorizationHeaders} from 'utils/authentication';
import {gameHeaders} from 'utils/guestGames';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/dots-and-boxes/matches`;

export const createDotsAndBoxesMatch = async (data: CreateDotsAndBoxesMatch): Promise<DotsAndBoxesMatch> => {
  const response = await axios.post<DotsAndBoxesMatch>(BASE_URL, data, await gameHeaders(data.mode === 'computer'));
  return response.data;
};

export const getDotsAndBoxesMatch = async (id: number, signal?: AbortSignal): Promise<DotsAndBoxesMatch> => {
  const response = await axios.get<DotsAndBoxesMatch>(`${BASE_URL}/${id}`, {...(await gameHeaders()), signal});
  return response.data;
};

export const getDotsAndBoxesMatches = async (
  params: {mine?: '1' | 'exclude'; page?: number; page_size?: number; status?: string},
  signal?: AbortSignal,
): Promise<DotsAndBoxesPage> => {
  const response = await axios.get<DotsAndBoxesPage>(BASE_URL, {...authorizationHeaders(), params, signal});
  return response.data;
};

export const performDotsAndBoxesAction = async (
  match: DotsAndBoxesMatch,
  action: DotsAndBoxesAction,
  data: DotsAndBoxesActionData = {},
): Promise<DotsAndBoxesMatch> => {
  const response = await axios.post<DotsAndBoxesMatch>(
    `${BASE_URL}/${match.id}/${action}`,
    {...data, expected_version: match.version},
    await gameHeaders(),
  );
  return response.data;
};
