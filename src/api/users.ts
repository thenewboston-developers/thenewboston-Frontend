import axios from 'axios';

import {CreateUserRequest, CreateUserResponse, UserReadSerializer} from 'types';
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

export const getUser = async (id: number): Promise<UserReadSerializer> => {
  try {
    const response = await axios.get<UserReadSerializer>(`${BASE_URL}/${id}`, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (id: number, data: FormData): Promise<UserReadSerializer> => {
  try {
    const response = await axios.patch<UserReadSerializer>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const filterUserList = async (username: string): Promise<UserReadSerializer> => {
  try {
    const response = await axios.patch<UserReadSerializer>(`${BASE_URL}/list/${username}`, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
