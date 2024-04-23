import axios from 'axios';

import {LectureReadSerializer, PaginatedResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/lectures`;

export interface GetLecturesParams {
  course_id?: string;
}

export const getLectures = async (
  url: string,
  params?: GetLecturesParams,
): Promise<PaginatedResponse<LectureReadSerializer>> => {
  try {
    const apiURL = getApiUrl(BASE_URL, url);
    const response = await axios.get<PaginatedResponse<LectureReadSerializer>>(apiURL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
