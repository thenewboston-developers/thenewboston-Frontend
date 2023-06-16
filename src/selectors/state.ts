import {RootState} from 'types';

export const getAuthentication = (state: RootState) => state.authentication;
export const getSelf = (state: RootState) => state.self;
