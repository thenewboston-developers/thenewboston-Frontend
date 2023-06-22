import {getAssetPairs as _getAssetPairs} from 'api/assetPairs';
import {setAssetPairs} from 'store/assetPairs';
import {AppDispatch} from 'types';

export const getAssetPairs = () => async (dispatch: AppDispatch) => {
  const responseData = await _getAssetPairs();
  dispatch(setAssetPairs(responseData));
};
