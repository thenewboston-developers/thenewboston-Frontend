import axios from 'axios';
import {TopContribution} from 'types/topContributions';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/contributions/top`;

export const getTopContributions = async (filterType: string): Promise<TopContribution[]> => {
  try {
    const response = await axios.get<TopContribution[]>(`${BASE_URL}?type=${filterType}`, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
