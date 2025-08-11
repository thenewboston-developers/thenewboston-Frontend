import {
  createWallet as _createWallet,
  createWalletDeposit as _createWalletDeposit,
  createWalletWithdraw as _createWalletWithdraw,
  getWallet as _getWallet,
  getWalletDepositBalance as _getWalletDepositBalance,
  getWallets as _getWallets,
} from 'api/wallets';
import {setIsLoadingWallets, setPaginatedWallets, setWallet, setWallets} from 'store/wallets';
import {setWire} from 'store/wires';
import {AppDispatch, CreateWalletRequest, Wallet, WithdrawRequest} from 'types';

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

export const getWallet = (walletId: number) => async (dispatch: AppDispatch) => {
  const responseData = await _getWallet(walletId);
  dispatch(setWallet(responseData));
};

export const getWallets =
  (page: number = 1, pageSize: number = 10) =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoadingWallets(true));
    try {
      const responseData = await _getWallets({page, page_size: pageSize});
      dispatch(setPaginatedWallets({data: responseData, page}));
    } finally {
      dispatch(setIsLoadingWallets(false));
    }
  };
