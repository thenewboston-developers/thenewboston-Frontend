import axios from 'axios';

import {PostImage} from 'types';
import {authorizationFormHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/post-images`;

export const createPostImage = async (file: File): Promise<PostImage> => {
  try {
    const data = new FormData();
    data.append('image', file);

    const response = await axios.post<PostImage>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
