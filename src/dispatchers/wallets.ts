import {getWallets as _getWallets} from 'api/wallets';
import {setWallets} from 'store/wallets';
import {AppDispatch} from 'types';

export const getWallets = () => async (dispatch: AppDispatch) => {
  const responseData = await _getWallets();
  dispatch(setWallets(responseData));
};
