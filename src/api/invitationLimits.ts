import axios from 'axios';
import {InvitationLimit} from 'types';

import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/invitation_limits`;

export const getInvitationLimit = async (id: number): Promise<InvitationLimit> => {
  try {
    const response = await axios.get<InvitationLimit>(`${BASE_URL}/${id}`, authorizationHeaders());
    return response.data;
  } catch (error) {
    throw error;
  }
};
