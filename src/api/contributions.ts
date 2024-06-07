import axios from 'axios';

import {authorizationHeaders} from 'utils/authentication';
import {Contribution, CreateContributionRequest, PaginatedResponse} from 'types';
import {getApiUrl} from 'utils/urls';
import {UserIdFilterValues} from 'enums';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/contributions`;

export const createContribution = async (data: CreateContributionRequest): Promise<Contribution> => {
  try {
    const response = await axios.post<Contribution>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
