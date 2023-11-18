import axios from 'axios';

import {CreateFollowerRequest, FollowerReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/followers`;

export const createFollower = async (data: CreateFollowerRequest): Promise<FollowerReadSerializer> => {
  try {
    const response = await axios.post<FollowerReadSerializer>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFollower = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface GetFollowersParams {
  follower?: number;
  following?: number;
}

export const getFollowers = async (params?: GetFollowersParams): Promise<FollowerReadSerializer[]> => {
  try {
    const response = await axios.get<FollowerReadSerializer[]>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
