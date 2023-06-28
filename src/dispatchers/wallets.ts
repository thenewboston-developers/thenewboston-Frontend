import {
  createWallet as _createWallet,
  getWalletBalance as _getWalletBalance,
  getWallets as _getWallets,
} from 'api/wallets';
import {setWallet, setWallets} from 'store/wallets';
import {AppDispatch, CreateWalletRequest} from 'types';

export const createWallet = (data: CreateWalletRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createWallet(data);
  dispatch(setWallet(responseData));
};

export const getWalletBalance = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getWalletBalance(walletId);
  dispatch(setWallet(responseData));
};

export const getWallets = () => async (dispatch: AppDispatch) => {
  const responseData = await _getWallets();
  dispatch(setWallets(responseData));
};
