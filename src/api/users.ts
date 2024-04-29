import axios from 'axios';

import {CreateUserRequest, CreateUserResponse, UserStatsReadSerializer} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/users`;

export const createUser = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
  try {
    const response = await axios.post<CreateUserResponse>(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (id: number): Promise<UserStatsReadSerializer> => {
  try {
    const response = await axios.get<UserStatsReadSerializer>(`${BASE_URL}/${id}`, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id: number, data: FormData): Promise<UserStatsReadSerializer> => {
  try {
    const response = await axios.patch<UserStatsReadSerializer>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
