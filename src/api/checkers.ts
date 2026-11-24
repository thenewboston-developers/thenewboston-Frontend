import axios from 'axios';

import {CheckersAction, CheckersActionData, CheckersMatch, CheckersPage, CreateCheckersMatch} from 'types/checkers';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/checkers/matches`;

export const createCheckersMatch = async (data: CreateCheckersMatch): Promise<CheckersMatch> => {
  const response = await axios.post<CheckersMatch>(BASE_URL, data, authorizationHeaders());
  return response.data;
};

export const getCheckersMatch = async (id: number, signal?: AbortSignal): Promise<CheckersMatch> => {
  const response = await axios.get<CheckersMatch>(`${BASE_URL}/${id}`, {...authorizationHeaders(), signal});
  return response.data;
};

export const getCheckersMatches = async (
  params: {mine?: '1' | 'exclude'; page?: number; page_size?: number; status?: string},
  signal?: AbortSignal,
): Promise<CheckersPage> => {
  const response = await axios.get<CheckersPage>(BASE_URL, {...authorizationHeaders(), params, signal});
  return response.data;
};

export const performCheckersAction = async (
  match: CheckersMatch,
  action: CheckersAction,
  data: CheckersActionData = {},
): Promise<CheckersMatch> => {
  const response = await axios.post<CheckersMatch>(
    `${BASE_URL}/${match.id}/${action}`,
    {...data, expected_version: match.version},
    authorizationHeaders(),
  );
  return response.data;
};
