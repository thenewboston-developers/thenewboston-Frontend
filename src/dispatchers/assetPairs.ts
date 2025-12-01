import {getAssetPair as _getAssetPair, getAssetPairs as _getAssetPairs} from 'api/assetPairs';
import {setAssetPairs} from 'store/assetPairs';
import {AppDispatch} from 'types';

export const getAssetPair = (assetPairId: number | string) => async (dispatch: AppDispatch) => {
  const responseData = await _getAssetPair(assetPairId);
  dispatch(setAssetPairs([responseData]));
  return responseData;
};

export const getAssetPairs = (params?: {page?: number; page_size?: number}) => async (dispatch: AppDispatch) => {
  const responseData = await _getAssetPairs(params);
  dispatch(setAssetPairs(responseData.results));
  return responseData;
};
