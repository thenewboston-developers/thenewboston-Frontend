import {createMint as _createMint, getMints as _getMints} from 'api/mints';
import {setMint, setMints} from 'store/mints';
import {AppDispatch, CreateMintRequest, GetMintsParams} from 'types';

export const createMint = (data: CreateMintRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createMint(data);
  dispatch(setMint(responseData));
  return responseData;
};

export const getMints = (params: GetMintsParams) => async (dispatch: AppDispatch) => {
  const responseData = await _getMints(params);
  dispatch(setMints(responseData.results));
  return responseData;
};
