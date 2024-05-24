import axios from 'axios';

import {Contribution} from 'types';
import {UserIdFilterValues} from 'enums';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/contributions`;

export interface GetContributionsParams {
  user_id?: UserIdFilterValues;
}

export const getContributions = async (params: GetContributionsParams): Promise<Contribution[]> => {
  try {
    const response = await axios.get<Contribution[]>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
