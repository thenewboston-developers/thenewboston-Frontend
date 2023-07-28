import {
  createAddress as _createAddress,
  deleteAddress as _deleteAddress,
  getAddresses as _getAddresses,
  updateAddress as _updateAddress,
} from 'api/addresses';
import {setAddress, setAddresses, unsetAddress} from 'store/addresses';
import {AppDispatch, CreateAddressRequest} from 'types';

export const createAddress = (data: CreateAddressRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createAddress(data);
  dispatch(setAddress(responseData));
};

export const deleteAddress = (id: number) => async (dispatch: AppDispatch) => {
  await _deleteAddress(id);
  dispatch(unsetAddress(id));
};

export const getAddresses = () => async (dispatch: AppDispatch) => {
  const responseData = await _getAddresses();
  dispatch(setAddresses(responseData));
};

export const updateAddress = (id: number, data: CreateAddressRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _updateAddress(id, data);
  dispatch(setAddress(responseData));
};
