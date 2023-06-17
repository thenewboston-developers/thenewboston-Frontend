import {RootState} from 'types';

export const getAuthentication = (state: RootState) => state.authentication;
export const getCores = (state: RootState) => state.cores;
export const getSelf = (state: RootState) => state.self;
