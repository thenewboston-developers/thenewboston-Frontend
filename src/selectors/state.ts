import {RootState} from 'types';

export const getAssetPairs = (state: RootState) => state.assetPairs;
export const getAuthentication = (state: RootState) => state.authentication;
export const getCores = (state: RootState) => state.cores;
export const getManager = (state: RootState) => state.manager;
export const getOrders = (state: RootState) => state.orders;
export const getSelf = (state: RootState) => state.self;
export const getTrades = (state: RootState) => state.trades;
export const getTransfers = (state: RootState) => state.transfers;
export const getWallets = (state: RootState) => state.wallets;
