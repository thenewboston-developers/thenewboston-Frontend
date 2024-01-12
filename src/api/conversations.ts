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
