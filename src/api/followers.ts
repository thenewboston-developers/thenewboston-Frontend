import axios from 'axios';
import {CreateFollowerRequest, FollowerReadSerializer, PaginatedResponse} from 'types';

import {authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/followers`;

export const createFollower = async (data: CreateFollowerRequest): Promise<FollowerReadSerializer> => {
  try {
    const response = await axios.post<FollowerReadSerializer>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFollower = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};

export interface GetFollowersParams {
  follower?: number;
  following?: number;
}

export const getFollowers = async (
  url: string,
  params?: GetFollowersParams,
): Promise<PaginatedResponse<FollowerReadSerializer>> => {
  try {
    const apiURL = getApiUrl(BASE_URL, url);
    const response = await axios.get<PaginatedResponse<FollowerReadSerializer>>(apiURL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
