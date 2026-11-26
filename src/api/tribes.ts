import axios from 'axios';

import {TribesActionData, TribesSeason, TribesState} from 'types/tribes';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/tribes`;

export const getTribesSeasons = async (signal?: AbortSignal, before?: number): Promise<TribesSeason[]> => {
  const response = await axios.get(`${BASE_URL}/seasons`, {
    ...authorizationHeaders(),
    params: before ? {before} : {},
    signal,
  });
  return response.data;
};

export const getTribesState = async (seasonId?: number, signal?: AbortSignal): Promise<TribesState> => {
  const response = await axios.get(`${BASE_URL}/state`, {
    ...authorizationHeaders(),
    params: seasonId ? {season_id: seasonId} : {},
    signal,
  });
  return response.data;
};

export const performTribesAction = async (payload: TribesActionData): Promise<TribesState> => {
  const response = await axios.post(`${BASE_URL}/actions`, payload, authorizationHeaders());
  return response.data;
};

// The picture becomes the emblem of the tribe the signed-in player founded in that season
export const uploadTribeEmblem = async (seasonId: number, image: File): Promise<TribesState> => {
  const data = new FormData();
  data.append('season_id', String(seasonId));
  data.append('image', image);
  const response = await axios.post(`${BASE_URL}/emblem`, data, authorizationHeaders());
  return response.data;
};

export const getTribesActivity = async (
  seasonId: number,
  before: number,
  signal?: AbortSignal,
): Promise<{results: TribesState['activity']; next_before: number | null}> => {
  const response = await axios.get(`${BASE_URL}/activity`, {
    ...authorizationHeaders(),
    params: {season_id: seasonId, before},
    signal,
  });
  return response.data;
};

export const getTribesMessages = async (
  seasonId: number,
  before: number,
  signal?: AbortSignal,
): Promise<{results: TribesState['messages']; next_before: number | null}> => {
  const response = await axios.get(`${BASE_URL}/messages`, {
    ...authorizationHeaders(),
    params: {season_id: seasonId, before},
    signal,
  });
  return response.data;
};
