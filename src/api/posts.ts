import axios from 'axios';

import {PostReadSerializer, PaginatedResponse} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/posts`;

export const createPost = async (data: FormData): Promise<PostReadSerializer> => {
  try {
    const response = await axios.post<PostReadSerializer>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface GetPostsParams {
  owner?: number;
}

export const getPosts = async (
  params?: GetPostsParams,
  url: string = BASE_URL,
): Promise<PaginatedResponse<PostReadSerializer>> => {
  try {
    const response = await axios.get<PaginatedResponse<PostReadSerializer>>(url, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePost = async (id: number, data: FormData): Promise<PostReadSerializer> => {
  try {
    const response = await axios.patch<PostReadSerializer>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
