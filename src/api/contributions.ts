import axios from 'axios';

import {Contribution, PaginatedResponse} from 'types';
import {UserIdFilterValues} from 'enums';
import {authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/contributions`;

export interface GetContributionsParams {
  user_id?: UserIdFilterValues;
}

export const getContributions = async (
  url: string,
  params?: GetContributionsParams,
): Promise<PaginatedResponse<Contribution>> => {
  try {
    const apiURL = getApiUrl(BASE_URL, url);
    const response = await axios.get<PaginatedResponse<Contribution>>(apiURL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
