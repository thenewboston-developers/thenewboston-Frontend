import {RootState} from 'types';

export const getAuthentication = (state: RootState) => state.authentication;
export const getCores = (state: RootState) => state.cores;
export const getManager = (state: RootState) => state.manager;
export const getSelf = (state: RootState) => state.self;
export const getWallets = (state: RootState) => state.wallets;
