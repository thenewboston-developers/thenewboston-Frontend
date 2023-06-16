import axios from 'axios';

import {CreateUserRequest, CreateUserResponse} from 'types';

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
