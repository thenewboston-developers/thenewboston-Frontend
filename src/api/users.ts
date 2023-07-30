import axios from 'axios';

import {CreateUserRequest, CreateUserResponse, UserReadSerializer} from 'types';
import {authorizationFormHeaders} from 'utils/authentication';

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

export const updateUser = async (id: number, data: FormData): Promise<UserReadSerializer> => {
  try {
    const response = await axios.patch<UserReadSerializer>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
