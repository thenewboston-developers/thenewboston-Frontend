import axios from 'axios';
import {LoginRequest, LoginResponse} from 'types';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${process.env.REACT_APP_API_URL}/api/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
