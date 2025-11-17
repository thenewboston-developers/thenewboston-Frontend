import axios from 'axios';

import {Bonsai, BonsaiStatus, PaginatedResponse} from 'types';
import {BonsaiResponse} from 'types/api/bonsais';
import {authorizationFormHeaders, authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/bonsais`;

const normalizeBonsai = (bonsai: BonsaiResponse): Bonsai => ({
  ...bonsai,
  price_amount: typeof bonsai.price_amount === 'string' ? parseFloat(bonsai.price_amount) : bonsai.price_amount,
});

type BonsaiListResponse = PaginatedResponse<BonsaiResponse>;

export interface GetBonsaisParams {
  page?: number;
  page_size?: number;
  status?: BonsaiStatus;
}

export const getBonsais = async (params?: GetBonsaisParams): Promise<PaginatedResponse<Bonsai>> => {
  try {
    const response = await axios.get<BonsaiListResponse>(BASE_URL, {params});
    return {
      ...response.data,
      results: response.data.results.map(normalizeBonsai),
    };
  } catch (error) {
    throw error;
  }
};

export const getBonsai = async (slug: string): Promise<Bonsai> => {
  try {
    const response = await axios.get<BonsaiResponse>(`${BASE_URL}/${slug}`);
    return normalizeBonsai(response.data);
  } catch (error) {
    throw error;
  }
};

export const createBonsai = async (data: FormData): Promise<Bonsai> => {
  try {
    const response = await axios.post<BonsaiResponse>(BASE_URL, data, authorizationFormHeaders());
    return normalizeBonsai(response.data);
  } catch (error) {
    throw error;
  }
};

export const updateBonsai = async (id: number, data: FormData): Promise<Bonsai> => {
  try {
    const response = await axios.patch<BonsaiResponse>(`${BASE_URL}/${id}`, data, authorizationFormHeaders());
    return normalizeBonsai(response.data);
  } catch (error) {
    throw error;
  }
};

export const deleteBonsai = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};
