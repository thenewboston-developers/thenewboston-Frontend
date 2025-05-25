import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  createMint as _createMint,
  CreateMintRequest,
  getMint as _getMint,
  getMints as _getMints,
  GetMintsParams,
} from 'api/mints';
import {setMint, setMints} from 'store/mints';
import {AppDispatch} from 'types';

export const createMint = createAsyncThunk<any, CreateMintRequest, {dispatch: AppDispatch}>(
  'mints/createMint',
  async (data, {dispatch}) => {
    const responseData = await _createMint(data);
    dispatch(setMint(responseData));
    return responseData;
  },
);

export const getMints = createAsyncThunk<any, GetMintsParams, {dispatch: AppDispatch}>(
  'mints/getMints',
  async (params, {dispatch}) => {
    const responseData = await _getMints(params);
    dispatch(setMints(responseData.results));
    return responseData;
  },
);

export const getMint = createAsyncThunk<any, string, {dispatch: AppDispatch}>(
  'mints/getMint',
  async (id, {dispatch}) => {
    const responseData = await _getMint(id);
    dispatch(setMint(responseData));
    return responseData;
  },
);
