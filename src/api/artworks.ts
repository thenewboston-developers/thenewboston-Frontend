import axios from 'axios';

import {Artwork, CreateArtworkRequest, EditArtworkRequest, PaginatedResponse} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {getApiUrl} from 'utils/urls';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/artworks`;

export const createArtwork = async (data: CreateArtworkRequest): Promise<Artwork> => {
  try {
    const response = await axios.post<Artwork>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteArtwork = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getArtwork = async (id: number): Promise<Artwork> => {
  try {
    const response = await axios.get<Artwork>(`${BASE_URL}/${id}`, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface GetArtworksParams {
  owner?: number;
  price_amount_isnull?: boolean;
  price_core_isnull?: boolean;
}

export const getArtworks = async (url: string, params?: GetArtworksParams): Promise<PaginatedResponse<Artwork>> => {
  try {
    const apiURL = getApiUrl(BASE_URL, url);
    const response = await axios.get<PaginatedResponse<Artwork>>(apiURL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateArtwork = async (id: number, data: EditArtworkRequest): Promise<Artwork> => {
  try {
    const response = await axios.patch<Artwork>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
