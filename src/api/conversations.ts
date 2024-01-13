import axios from 'axios';

import {Conversation, CreateConversationRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/conversations`;

export const createConversation = async (data: CreateConversationRequest): Promise<Conversation> => {
  try {
    const response = await axios.post<Conversation>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteConversation = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface GetConversationsParams {
  owner?: number;
}

export const getConversations = async (params?: GetConversationsParams): Promise<Conversation[]> => {
  try {
    const response = await axios.get<Conversation[]>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
