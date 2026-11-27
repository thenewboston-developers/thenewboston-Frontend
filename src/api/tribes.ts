import axios from 'axios';

import {TribesActionData, TribesState, TribesTournament} from 'types/tribes';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/tribes`;

export const getTribesTournaments = async (signal?: AbortSignal, before?: number): Promise<TribesTournament[]> => {
  const response = await axios.get(`${BASE_URL}/tournaments`, {
    ...authorizationHeaders(),
    params: before ? {before} : {},
    signal,
  });
  return response.data;
};

export const getTribesState = async (tournamentId: number, signal?: AbortSignal): Promise<TribesState> => {
  const response = await axios.get(`${BASE_URL}/state`, {
    ...authorizationHeaders(),
    params: {tournament_id: tournamentId},
    signal,
  });
  return response.data;
};

export const performTribesAction = async (payload: TribesActionData): Promise<TribesState> => {
  const response = await axios.post(`${BASE_URL}/actions`, payload, authorizationHeaders());
  return response.data;
};

// The picture becomes the emblem of the tribe the signed-in player captains in that tournament
export const uploadTribeEmblem = async (tournamentId: number, image: File): Promise<TribesState> => {
  const data = new FormData();
  data.append('tournament_id', String(tournamentId));
  data.append('image', image);
  const response = await axios.post(`${BASE_URL}/emblem`, data, authorizationHeaders());
  return response.data;
};

export const getTribesActivity = async (
  tournamentId: number,
  before: number,
  signal?: AbortSignal,
): Promise<{results: TribesState['activity']; next_before: number | null}> => {
  const response = await axios.get(`${BASE_URL}/activity`, {
    ...authorizationHeaders(),
    params: {tournament_id: tournamentId, before},
    signal,
  });
  return response.data;
};

export const getTribesMessages = async (
  tournamentId: number,
  before: number,
  signal?: AbortSignal,
): Promise<{results: TribesState['messages']; next_before: number | null}> => {
  const response = await axios.get(`${BASE_URL}/messages`, {
    ...authorizationHeaders(),
    params: {tournament_id: tournamentId, before},
    signal,
  });
  return response.data;
};
