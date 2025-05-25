import axios from 'axios';

import {Comment, CreateCommentRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/comments`;

export const createComment = async (data: CreateCommentRequest): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};

export const updateComment = async (id: number, data: Partial<CreateCommentRequest>): Promise<Comment> => {
  try {
    const response = await axios.patch<Comment>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
