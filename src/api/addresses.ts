import axios from 'axios';

import {Address, CreateAddressRequest} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/addresses`;

export const createAddress = async (data: CreateAddressRequest): Promise<Address> => {
  try {
    const response = await axios.post<Address>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAddress = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAddresses = async (): Promise<Address[]> => {
  try {
    const response = await axios.get<Address[]>(BASE_URL, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateAddress = async (id: number, data: CreateAddressRequest): Promise<Address> => {
  try {
    const response = await axios.patch<Address>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
