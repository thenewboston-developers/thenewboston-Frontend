import axios from 'axios';

import {GetPostsParams, PaginatedResponse, PostLike, PostReadSerializer} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/posts`;

export const createPost = async (data: FormData): Promise<PostReadSerializer> => {
  try {
    const response = await axios.post<PostReadSerializer>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (
  url: string,
  params?: GetPostsParams,
): Promise<PaginatedResponse<PostReadSerializer>> => {
  try {
    // If we have a full URL (pagination), we need to preserve any params
    if (url && params) {
      // Parse existing URL to get its params
      const urlObj = new URL(url);

      // Add our params to the URL's search params
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.set(key, String(value));
        }
      });

      const response = await axios.get<PaginatedResponse<PostReadSerializer>>(
        urlObj.toString(),
        authorizationHeaders(),
      );
      return response.data;
    }

    // Standard request without pagination URL
    const apiURL = url || BASE_URL;
    const response = await axios.get<PaginatedResponse<PostReadSerializer>>(apiURL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (id: number, data: FormData): Promise<PostReadSerializer> => {
  try {
    const response = await axios.patch<PostReadSerializer>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (postId: number): Promise<PostLike> => {
  try {
    const response = await axios.post<PostLike>(`${BASE_URL}/${postId}/like`, {}, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unlikePost = async (postId: number): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/${postId}/unlike`, {}, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};
