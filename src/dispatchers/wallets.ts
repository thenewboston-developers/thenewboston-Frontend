import {
  createWallet as _createWallet,
  createWalletDeposit as _createWalletDeposit,
  createWalletWithdraw as _createWalletWithdraw,
  getWalletDepositBalance as _getWalletDepositBalance,
  getWallets as _getWallets,
} from 'api/wallets';
import {setTransfer} from 'store/transfers';
import {setWallet, setWallets} from 'store/wallets';
import {AppDispatch, CreateWalletRequest, WithdrawRequest} from 'types';

export const createWallet = (data: CreateWalletRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createWallet(data);
  dispatch(setWallet(responseData));
};

export const createWalletDeposit = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _createWalletDeposit(walletId);
  const {transfer, wallet} = responseData;
  dispatch(setTransfer(transfer));
  dispatch(setWallet(wallet));
};

export const createWalletWithdraw = (walletId: number, data: WithdrawRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createWalletWithdraw(walletId, data);
  const {transfer, wallet} = responseData;
  dispatch(setTransfer(transfer));
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
