import axios from 'axios';

import {Bonsai, BonsaiPayload, BonsaiStatus} from 'types';
import {BonsaiHighlightPayload, BonsaiImagePayload, BonsaiResponse} from 'types/api/bonsais';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/bonsais`;

const normalizeBonsai = (bonsai: BonsaiResponse): Bonsai => ({
  ...bonsai,
  price_amount: typeof bonsai.price_amount === 'string' ? parseFloat(bonsai.price_amount) : bonsai.price_amount,
});

export const getBonsais = async (params?: {status?: BonsaiStatus}): Promise<Bonsai[]> => {
  try {
    const response = await axios.get<BonsaiResponse[]>(BASE_URL, {params});
    return response.data.map(normalizeBonsai);
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

export const createBonsai = async (data: BonsaiPayload): Promise<Bonsai> => {
  try {
    const response = await axios.post<BonsaiResponse>(BASE_URL, data, authorizationHeaders());
    return normalizeBonsai(response.data);
  } catch (error) {
    throw error;
  }
};

export const updateBonsai = async (
  slug: string,
  data: Partial<BonsaiPayload> & {
    highlights?: BonsaiHighlightPayload[];
    images?: BonsaiImagePayload[];
  },
): Promise<Bonsai> => {
  try {
    const response = await axios.patch<BonsaiResponse>(`${BASE_URL}/${slug}`, data, authorizationHeaders());
    return normalizeBonsai(response.data);
  } catch (error) {
    throw error;
  }
};

export const deleteBonsai = async (slug: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${slug}`, authorizationHeaders());
  } catch (error) {
    throw error;
  }
};
