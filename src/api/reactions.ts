import axios from 'axios';
import {PostReactionCreateRequest} from 'types';

import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/post_reaction/`;

export const createPostReaction = async (data: PostReactionCreateRequest): Promise<PostReactionCreateRequest> => {
  try {
    await axios.post<void>(BASE_URL, data, authorizationHeaders());
    return data;
  } catch (error) {
    throw error;
  }
};
