import {RootState} from 'types';

export const getAddresses = (state: RootState) => state.addresses;
export const getAssetPairs = (state: RootState) => state.assetPairs;
export const getAuthentication = (state: RootState) => state.authentication;
export const getCartProducts = (state: RootState) => state.cartProducts;
export const getCores = (state: RootState) => state.cores;
export const getExchangeOrders = (state: RootState) => state.exchangeOrders;
export const getManager = (state: RootState) => state.manager;
export const getProducts = (state: RootState) => state.products;
export const getSelf = (state: RootState) => state.self;
export const getTrades = (state: RootState) => state.trades;
export const getWallets = (state: RootState) => state.wallets;
export const getWires = (state: RootState) => state.wires;
