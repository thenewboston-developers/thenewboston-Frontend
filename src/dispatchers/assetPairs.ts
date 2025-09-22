import {getAssetPairById as _getAssetPairById, getAssetPairs as _getAssetPairs} from 'api/assetPairs';
import {setAssetPair, setAssetPairs} from 'store/assetPairs';
import {AppDispatch} from 'types';

export const getAssetPairById = (id: number) => async (dispatch: AppDispatch) => {
  const assetPair = await _getAssetPairById(id);
  dispatch(setAssetPair(assetPair));
  return assetPair;
};

export const getAssetPairs = (params?: {page?: number; page_size?: number}) => async (dispatch: AppDispatch) => {
  const responseData = await _getAssetPairs(params);
  dispatch(setAssetPairs(responseData.results));
  return responseData;
};
