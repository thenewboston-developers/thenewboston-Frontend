import axios from 'axios';

import {CreateMessageRequest, Message} from 'types';
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

export const deleteMessage = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateMessage = async (id: number, data: Partial<CreateMessageRequest>): Promise<Message> => {
  try {
    const response = await axios.patch<Message>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
