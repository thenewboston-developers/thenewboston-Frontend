import axios from 'axios';

import {PaginatedResponse, PostReadSerializer} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

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
  url: string,
  params?: GetPostsParams,
): Promise<PaginatedResponse<PostReadSerializer>> => {
  try {
    const apiURL = getApiUrl(BASE_URL, url);
    const response = await axios.get<PaginatedResponse<PostReadSerializer>>(apiURL, {
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
