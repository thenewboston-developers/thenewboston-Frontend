import axios from 'axios';

import {PublicationStatus} from 'enums';
import {LectureReadSerializer, PaginatedResponse} from 'types';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/lectures`;

export const createLecture = async (data: FormData): Promise<LectureReadSerializer> => {
  try {
    const response = await axios.post<LectureReadSerializer>(BASE_URL, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLecture = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface GetLecturesParams {
  course_id?: string;
  instructor_id?: number | null;
  publication_status?: PublicationStatus;
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
    console.log('lectures:', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateLecture = async (id: number, data: FormData): Promise<LectureReadSerializer> => {
  try {
    const response = await axios.patch<LectureReadSerializer>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
