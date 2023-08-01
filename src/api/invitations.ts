import axios from 'axios';

import {Invitation, CreateInvitationRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/invitations`;

export const createInvitation = async (data: CreateInvitationRequest): Promise<Invitation> => {
  try {
    const response = await axios.post<Invitation>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteInvitation = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getInvitations = async (): Promise<Invitation[]> => {
  try {
    const response = await axios.get<Invitation[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateInvitation = async (id: number, data: CreateInvitationRequest): Promise<Invitation> => {
  try {
    const response = await axios.patch<Invitation>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
