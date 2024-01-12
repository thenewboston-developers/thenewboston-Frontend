import axios from 'axios';

import {Message, CreateMessageRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/messages`;

export const createMessage = async (data: CreateMessageRequest): Promise<Message> => {
  try {
    const response = await axios.post<Message>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
