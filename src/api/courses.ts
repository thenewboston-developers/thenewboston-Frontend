import axios from 'axios';

import {PaginatedResponse, CourseReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/courses`;

export const getCourses = async (url: string): Promise<PaginatedResponse<CourseReadSerializer>> => {
  try {
    const apiURL = getApiUrl(BASE_URL, url);
    const response = await axios.get<PaginatedResponse<CourseReadSerializer>>(apiURL, {
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
