import axios from 'axios';

import {CreateOpenAIImageRequest, CreateOpenAIImageResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/openai_images`;

export const createOpenAIImage = async (data: CreateOpenAIImageRequest): Promise<CreateOpenAIImageResponse> => {
  try {
    const response = await axios.post<CreateOpenAIImageResponse>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
