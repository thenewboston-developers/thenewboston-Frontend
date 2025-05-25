import {
  createWallet as _createWallet,
  createWalletDeposit as _createWalletDeposit,
  createWalletWithdraw as _createWalletWithdraw,
  getDefaultWallet as _getDefaultWallet,
  getWalletDepositBalance as _getWalletDepositBalance,
  getWallets as _getWallets,
} from 'api/wallets';
import {setWallet, setWallets} from 'store/wallets';
import {setWire} from 'store/wires';
import {AppDispatch, CreateWalletRequest, WithdrawRequest} from 'types';

export const createWallet = (data: CreateWalletRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createWallet(data);
  dispatch(setWallet(responseData));
};

export const createWalletDeposit = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _createWalletDeposit(walletId);
  const {wallet, wire} = responseData;
  dispatch(setWallet(wallet));
  dispatch(setWire(wire));
};

export const createWalletWithdraw = (walletId: number, data: WithdrawRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createWalletWithdraw(walletId, data);
  const {wallet, wire} = responseData;
  dispatch(setWallet(wallet));
  dispatch(setWire(wire));
};

export const getWalletDepositBalance = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getWalletDepositBalance(walletId);
  dispatch(setWallet(responseData));
};

export const getWallets = () => async (dispatch: AppDispatch) => {
  const responseData = await _getWallets();
  dispatch(setWallets(responseData));
};

export const getDefaultWallet = () => async (dispatch: AppDispatch) => {
  const responseData = await _getDefaultWallet();
  dispatch(setWallet(responseData));
};
