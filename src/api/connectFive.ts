import axios from 'axios';

import {ConnectFiveMoveType, ConnectFiveSpecialType} from 'enums';
import {
  ConnectFiveChallenge,
  ConnectFiveChallengePaginatedResponse,
  ConnectFiveLeaderboardPaginatedResponse,
  ConnectFiveMatch,
  ConnectFiveMatchPaginatedResponse,
  ConnectFiveRematchStatus,
} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/connect-five`;

export const acceptConnectFiveChallenge = async (challengeId: number): Promise<ConnectFiveMatch> => {
  try {
    const response = await axios.post<ConnectFiveMatch>(
      `${BASE_URL}/challenges/${challengeId}/accept`,
      {},
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelConnectFiveChallenge = async (challengeId: number): Promise<ConnectFiveChallenge> => {
  try {
    const response = await axios.post<ConnectFiveChallenge>(
      `${BASE_URL}/challenges/${challengeId}/cancel`,
      {},
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const declineConnectFiveChallenge = async (challengeId: number): Promise<ConnectFiveChallenge> => {
  try {
    const response = await axios.post<ConnectFiveChallenge>(
      `${BASE_URL}/challenges/${challengeId}/decline`,
      {},
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createConnectFiveChallenge = async (data: {
  max_spend_amount: number;
  opponent_id: number;
  stake_amount: number;
  time_limit_seconds: number;
}): Promise<ConnectFiveChallenge> => {
  try {
    const response = await axios.post<ConnectFiveChallenge>(`${BASE_URL}/challenges`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConnectFiveChallenge = async (
  challengeId: number,
  params?: {mine?: string},
): Promise<ConnectFiveChallenge> => {
  try {
    const response = await axios.get<ConnectFiveChallenge>(`${BASE_URL}/challenges/${challengeId}`, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConnectFiveChallenges = async (params?: {
  mine?: string;
  status?: string;
  url?: string;
}): Promise<ConnectFiveChallengePaginatedResponse> => {
  try {
    const requestUrl = params?.url || `${BASE_URL}/challenges`;
    const response = await axios.get<ConnectFiveChallengePaginatedResponse>(requestUrl, {
      ...authorizationHeaders(),
      params: params?.url
        ? undefined
        : {
            mine: params?.mine,
            status: params?.status,
          },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConnectFiveMatch = async (matchId: number, params?: {mine?: string}): Promise<ConnectFiveMatch> => {
  try {
    const response = await axios.get<ConnectFiveMatch>(`${BASE_URL}/matches/${matchId}`, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConnectFiveMatches = async (params?: {
  mine?: string;
  status?: string;
  url?: string;
}): Promise<ConnectFiveMatchPaginatedResponse> => {
  try {
    const requestUrl = params?.url || `${BASE_URL}/matches`;
    const response = await axios.get<ConnectFiveMatchPaginatedResponse>(requestUrl, {
      ...authorizationHeaders(),
      params: params?.url
        ? undefined
        : {
            mine: params?.mine,
            status: params?.status,
          },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConnectFiveLeaderboard = async (params?: {
  page?: number;
  url?: string;
}): Promise<ConnectFiveLeaderboardPaginatedResponse> => {
  try {
    const requestUrl = params?.url || `${BASE_URL}/leaderboard`;
    const response = await axios.get<ConnectFiveLeaderboardPaginatedResponse>(requestUrl, {
      ...authorizationHeaders(),
      params: params?.url
        ? undefined
        : {
            page: params?.page,
          },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConnectFiveRematchStatus = async (matchId: number): Promise<ConnectFiveRematchStatus> => {
  try {
    const response = await axios.get<ConnectFiveRematchStatus>(
      `${BASE_URL}/matches/${matchId}/rematch-status`,
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const purchaseConnectFiveSpecial = async (
  matchId: number,
  data: {quantity?: number; special_type: ConnectFiveSpecialType},
): Promise<ConnectFiveMatch> => {
  try {
    const response = await axios.post<ConnectFiveMatch>(
      `${BASE_URL}/matches/${matchId}/purchase`,
      data,
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resignConnectFiveMatch = async (matchId: number): Promise<ConnectFiveMatch> => {
  try {
    const response = await axios.post<ConnectFiveMatch>(
      `${BASE_URL}/matches/${matchId}/resign`,
      {},
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitConnectFiveMove = async (
  matchId: number,
  data: {move_type: ConnectFiveMoveType; x: number; y: number},
): Promise<ConnectFiveMatch> => {
  try {
    const response = await axios.post<ConnectFiveMatch>(
      `${BASE_URL}/matches/${matchId}/move`,
      data,
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestConnectFiveRematch = async (matchId: number): Promise<ConnectFiveChallenge> => {
  try {
    const response = await axios.post<ConnectFiveChallenge>(
      `${BASE_URL}/matches/${matchId}/rematch`,
      {},
      authorizationHeaders(),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
