import axios from 'axios';

import {CreateMintRequest, GetMintsParams, Mint, PaginatedResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/mints`;

export const createMint = async (data: CreateMintRequest): Promise<Mint> => {
  try {
    const response = await axios.post<Mint>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMints = async (params: GetMintsParams): Promise<PaginatedResponse<Mint>> => {
  try {
    const response = await axios.get<PaginatedResponse<Mint>>(BASE_URL, {
      ...authorizationHeaders(),
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
