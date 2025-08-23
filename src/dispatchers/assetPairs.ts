import {getAssetPairs as _getAssetPairs} from 'api/assetPairs';
import {setAssetPairs} from 'store/assetPairs';
import {AppDispatch} from 'types';

export const getAssetPairs = (params?: {page?: number; page_size?: number}) => async (dispatch: AppDispatch) => {
  const responseData = await _getAssetPairs(params);
  dispatch(setAssetPairs(responseData.results));
  return responseData;
};
