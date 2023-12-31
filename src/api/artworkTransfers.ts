import axios from 'axios';

import {ArtworkTransfer, CreateArtworkTransferRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/artwork_transfers`;

export const createArtworkTransfer = async (data: CreateArtworkTransferRequest): Promise<ArtworkTransfer> => {
  try {
    const response = await axios.post<ArtworkTransfer>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface GetArtworkTransfersParams {
  artwork?: number;
}

export const getArtworkTransfers = async (params?: GetArtworkTransfersParams): Promise<ArtworkTransfer[]> => {
  try {
    const response = await axios.get<ArtworkTransfer[]>(BASE_URL, {
      params,
      ...authorizationHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
