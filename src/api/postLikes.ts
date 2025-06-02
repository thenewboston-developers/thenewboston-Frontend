import axios from 'axios';

import {PaginatedResponse, PostLike} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/post-likes`;

export interface GetPostLikesParams {
  post: number;
  page?: number;
  page_size?: number;
}

export const getPostLikes = async (params: GetPostLikesParams): Promise<PaginatedResponse<PostLike>> => {
  try {
    const response = await axios.get<PaginatedResponse<PostLike>>(BASE_URL, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
