import axios from 'axios';

import {
  BattleshipAction,
  BattleshipActionData,
  BattleshipMatch,
  BattleshipPage,
  CreateBattleshipMatch,
} from 'types/battleship';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/battleship/matches`;

export const createBattleshipMatch = async (data: CreateBattleshipMatch): Promise<BattleshipMatch> => {
  const response = await axios.post<BattleshipMatch>(BASE_URL, data, authorizationHeaders());
  return response.data;
};

export const getBattleshipMatch = async (id: number, signal?: AbortSignal): Promise<BattleshipMatch> => {
  const response = await axios.get<BattleshipMatch>(`${BASE_URL}/${id}`, {...authorizationHeaders(), signal});
  return response.data;
};

export const getBattleshipMatches = async (
  params: {page?: number; page_size?: number; status?: string},
  signal?: AbortSignal,
): Promise<BattleshipPage> => {
  const response = await axios.get<BattleshipPage>(BASE_URL, {...authorizationHeaders(), params, signal});
  return response.data;
};

export const performBattleshipAction = async (
  match: BattleshipMatch,
  action: BattleshipAction,
  data: BattleshipActionData = {},
): Promise<BattleshipMatch> => {
  const response = await axios.post<BattleshipMatch>(
    `${BASE_URL}/${match.id}/${action}`,
    {...data, expected_version: match.version},
    authorizationHeaders(),
  );
  return response.data;
};
