import axios from 'axios';

import {CourseReadSerializer, PaginatedResponse} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/courses`;

export const createCourse = async (data: FormData): Promise<CourseReadSerializer> => {
  try {
    const response = await axios.post<CourseReadSerializer>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCourse = async (id: number, data: FormData): Promise<CourseReadSerializer> => {
  try {
    const response = await axios.patch<CourseReadSerializer>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface GetCoursesParams {
  instructor_id?: number | null;
}

export const getCourses = async (
  url: string,
  params?: GetCoursesParams,
): Promise<PaginatedResponse<CourseReadSerializer>> => {
  try {
    const apiURL = getApiUrl(BASE_URL, url);
    const response = await axios.get<PaginatedResponse<CourseReadSerializer>>(apiURL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
