import {
  createWallet as _createWallet,
  createWalletDeposit as _createWalletDeposit,
  getWalletDepositBalance as _getWalletDepositBalance,
  getWallets as _getWallets,
} from 'api/wallets';
import {setBlock} from 'store/blocks';
import {setWallet, setWallets} from 'store/wallets';
import {AppDispatch, CreateWalletRequest} from 'types';

export const createWallet = (data: CreateWalletRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createWallet(data);
  dispatch(setWallet(responseData));
};

export const createWalletDeposit = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _createWalletDeposit(walletId);
  const {block, wallet} = responseData;
  dispatch(setBlock(block));
  dispatch(setWallet(wallet));
};

export const getWalletDepositBalance = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getWalletDepositBalance(walletId);
  dispatch(setWallet(responseData));
};

export const getWallets = () => async (dispatch: AppDispatch) => {
  const responseData = await _getWallets();
  dispatch(setWallets(responseData));
};
