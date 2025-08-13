import {
  createWallet as _createWallet,
  createWalletDeposit as _createWalletDeposit,
  createWalletWithdraw as _createWalletWithdraw,
  getWalletDepositBalance as _getWalletDepositBalance,
  getWallets as _getWallets,
} from 'api/wallets';
import {setIsLoadingWallets, setWallet, setWallets} from 'store/wallets';
import {setWire} from 'store/wires';
import {AppDispatch, CreateWalletRequest, Wallet, WithdrawRequest} from 'types';

export const createWallet = (data: CreateWalletRequest) => async (dispatch: AppDispatch) => {
  const responseData = await _createWallet(data);
  dispatch(setWallet(responseData));
  return responseData;
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

export const getAllUserWallets = () => async (dispatch: AppDispatch) => {
  dispatch(setIsLoadingWallets(true));
  try {
    const allWallets: Wallet[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      // eslint-disable-next-line no-await-in-loop
      const response = await _getWallets({page, page_size: 100});
      allWallets.push(...response.results);
      hasMore = !!response.next;
      page += 1;
    }

    dispatch(setWallets(allWallets));
  } finally {
    dispatch(setIsLoadingWallets(false));
  }
};

export const getWalletDepositBalance = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getWalletDepositBalance(walletId);
  dispatch(setWallet(responseData));
};
